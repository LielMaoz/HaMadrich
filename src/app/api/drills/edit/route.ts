import pool from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { deleteFileFromDrive, uploadFileToDrive } from './googleDrive';

export async function POST(req: NextRequest) {
  const drillInfo = await req.formData();

  const res = await pool.query(
    `select * from trainings where training_name=$1`,
    [drillInfo.get('training_name')]
  );

  if (res.rows[0]) {
    return NextResponse.json(
      { error: 'Drill already exists' },
      { status: 409 }
    );
  }
  const rangeImg = drillInfo.get('range_img') as File;
  if (!rangeImg || rangeImg.size === 0) {
    return NextResponse.json(
      { message: 'Missing file to upload' },
      { status: 400 }
    );
  }
  const previewImg = drillInfo.get('preview_img') as File;
  let previewURL = null;
  const rangeURL = await uploadFileToDrive(rangeImg);
  if (previewImg) {
    previewURL = await uploadFileToDrive(previewImg);
  }

  try {
    const query = `
        insert into trainings (training_name, drill_type, weapon_type, time_to_shoot, target_type, ammo, distance, description,range_img, preview_img, visible) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        returning id, training_name, drill_type, weapon_type, time_to_shoot, target_type, ammo, distance, description, range_img, preview_img, visible
        `;

    const values = [
      drillInfo.get('training_name'),
      drillInfo.get('drill_type'),
      drillInfo.get('weapon_type'),
      drillInfo.get('time_to_shoot'),
      drillInfo.get('target_type'),
      drillInfo.get('ammo'),
      drillInfo.get('distance'),
      drillInfo.get('description'),
      rangeURL,
      previewURL,
      drillInfo.get('visible'),
    ];
    const newDrill = await pool.query(query, values);
    const drill = newDrill.rows[0];
    return NextResponse.json(
      { message: 'Drill created successfully', drill },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

async function deleteImg(img: string) {
  const rangeURL = new URL(img);
  const rangeParams = rangeURL.searchParams;
  const rangeId = rangeParams.get('id');
  if (!rangeId) {
    return NextResponse.json({ error: 'Range ID is missing' }, { status: 400 });
  }
  try {
    await deleteFileFromDrive(rangeId as string);
    return NextResponse.json(
      { message: 'Drill deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error deleting file:' });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = await req.json();
    const drill = await pool.query(
      `
        select id,range_img, preview_img
        from trainings where id = $1;`,
      [id]
    );
    const rangeImg = drill.rows[0]?.range_img;
    if (rangeImg) {
      await deleteImg(rangeImg);
    }
    const previewImg = drill.rows[0]?.preview_img;
    if (previewImg) {
      await deleteImg(previewImg);
    }
    await pool.query(
      `
          DELETE FROM trainings WHERE id = $1;`,
      [id]
    );

    return NextResponse.json(
      { message: 'Drill deleted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}