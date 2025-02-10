import pool from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { deleteFileFromDrive, uploadFileToDrive } from '../../googleDrive';
import { revalidateTag } from 'next/cache';

async function doesDrillExist(
  name: string,
  drillType: string,
  weapon: string,
  id?: string
) {
  let query = `
    select id from trainings 
    where training_name=$1 and drill_type=$2 and weapon_type=$3
  `;

  const params: string[] = [name, drillType, weapon];

  if (id) {
    query += ` and id!=$4`;
    params.push(id);
  }

  const res = await pool.query(query, params);
  if (res.rows[0]) {
    throw new Error('Drill already exists');
  }
}

export async function POST(req: NextRequest) {
  const drillInfo = await req.formData();

  const name = drillInfo.get('training_name') as string;
  const drillType = drillInfo.get('drill_type') as string;
  const weapon = drillInfo.get('weapon_type') as string;

  let rangeURL: string | null = null;
  let previewURL: string | null = null;
  try {
    await doesDrillExist(name, drillType, weapon);

    const rangeImg = drillInfo.get('range_img') as File;
    if (!rangeImg || rangeImg.size === 0) {
      return NextResponse.json(
        { message: 'Missing file to upload' },
        { status: 400 }
      );
    }
    const previewImg = (drillInfo.get('preview_img') as File) || null;
    rangeURL = await uploadFileToDrive(rangeImg);
    if (previewImg) {
      previewURL = await uploadFileToDrive(previewImg);
    }

    const query = `
        insert into trainings (training_name, drill_type, weapon_type, time_to_shoot, target_type, ammo, distance, description,range_img, preview_img, visible) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        returning id, training_name, drill_type, weapon_type, time_to_shoot, target_type, ammo, distance, description, range_img, preview_img, visible
        `;

    const values = [
      name,
      drillType,
      weapon,
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

    revalidateTag('drills');

    return NextResponse.json(
      { message: 'Drill created successfully', drill },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    // Delete files stored in drive if exists
    if (rangeURL !== null) {
      await deleteImg(rangeURL);
    }
    if (previewURL !== null) {
      await deleteImg(previewURL);
    }
    if ((error as Error).message === 'Drill already exists') {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

async function deleteImg(img: string) {
  const imgURL = new URL(img);
  const imgParams = imgURL.searchParams;
  const imgId = imgParams.get('id');
  if (!imgId) {
    return NextResponse.json({ error: 'Image ID is missing' }, { status: 400 });
  }
  try {
    await deleteFileFromDrive(imgId as string);
    console.log('Delete success file id : ', imgId);
    return NextResponse.json(
      { message: 'Image deleted successfully' },
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
      delete from trainings where id=$1 returning range_img, preview_img;`,
      [id]
    );

    if (drill.rowCount === 0) {
      return NextResponse.json({ error: 'Drill not found' }, { status: 404 });
    }

    const { range_img: rangeImg, preview_img: previewImg } = drill.rows[0];

    if (rangeImg) {
      await deleteImg(rangeImg);
    }
    if (previewImg) {
      await deleteImg(previewImg);
    }

    revalidateTag('drills');

    return NextResponse.json(
      { message: 'Drill deleted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const drillInfo = await req.formData();
  const id = drillInfo.get('id');

  try {
    const name = drillInfo.get('training_name') as string;
    const drillType = drillInfo.get('drill_type') as string;
    const weapon = drillInfo.get('weapon_type') as string;

    const res = await pool.query(
      `select id from trainings where training_name=$1 and drill_type=$2 and weapon_type=$3 and id!=$4`,
      [name, drillType, weapon, id]
    );

    if (res.rows[0]) {
      return NextResponse.json(
        { error: 'Drill already exists' },
        { status: 409 }
      );
    }

    const oldDrillImg = await pool.query(
      `
        select range_img, preview_img from trainings where id=$1;`,
      [id]
    );

    if (oldDrillImg.rowCount === 0) {
      return NextResponse.json({ error: 'Drill not found' }, { status: 404 });
    }

    const { range_img: oldRangeImgURL, preview_img: oldPreviewImgURL } =
      oldDrillImg.rows[0];

    const rangeImg = (drillInfo.get('range_img') as File) || null;
    const previewImg = (drillInfo.get('preview_img') as File) || null;
    let rangeURL = null,
      previewURL = null;
    if (rangeImg) {
      rangeURL = await uploadFileToDrive(rangeImg);
    }
    if (previewImg) {
      previewURL = await uploadFileToDrive(previewImg);
    }

    const query = `
        update trainings set 
            training_name = $1,
            drill_type = $2,
            weapon_type = $3,
            time_to_shoot = $4,
            target_type = $5,
            ammo = $6,
            distance = $7,
            description = $8,
            range_img = COALESCE($9, $13),
            preview_img = COALESCE($10, $14),
            visible = $11
        where id=$12
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
      id,
      oldRangeImgURL,
      oldPreviewImgURL,
    ];
    const updatedDrill = await pool.query(query, values);
    const newDrill = updatedDrill.rows[0];

    if (rangeURL && oldRangeImgURL) {
      await deleteImg(oldRangeImgURL);
    }
    if (previewURL && oldPreviewImgURL) {
      await deleteImg(oldPreviewImgURL);
    }

    revalidateTag('drills');

    return NextResponse.json(
      { message: 'Drill updated successfully', newDrill },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error deleting file' });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedDrill = await req.json();
    const name = updatedDrill.training_name;
    const drillType = updatedDrill.drill_type;
    const weapon = updatedDrill.weapon_type;
    const id = updatedDrill.id;
    await doesDrillExist(name, drillType, weapon, id);
    const query = `
          update trainings set 
              training_name = $1,
              drill_type = $2,
              weapon_type = $3,
              time_to_shoot = $4,
              target_type = $5,
              ammo = $6,
              distance = $7,
              description = $8,
              visible = $9
          where id=$10
          returning id, training_name, drill_type, weapon_type, time_to_shoot, target_type, ammo, distance, description, range_img, preview_img, visible
          `;

    const values = [
      name,
      drillType,
      weapon,
      updatedDrill.time_to_shoot,
      updatedDrill.target_type,
      updatedDrill.ammo,
      updatedDrill.distance,
      updatedDrill.description,
      updatedDrill.visible,
      id,
    ];
    const newDrill = await pool.query(query, values);

    revalidateTag('drills');

    return NextResponse.json(
      { message: 'Drill updated successfully', newDrill },
      { status: 200 }
    );
  } catch (error) {
    if ((error as Error).message === 'Drill already exists') {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Error updating drill' });
  }
}
