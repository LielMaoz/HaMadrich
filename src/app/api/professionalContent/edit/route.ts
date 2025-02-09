import pool from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { deleteFileFromDrive, uploadFileToDrive } from '../../googleDrive';
import { revalidateTag } from 'next/cache';

async function doesContentExist(name: string, id?: string) {
  let query = `
    select id from professionalcontent 
    where name=$1
  `;

  const params: string[] = [name];

  if (id) {
    query += ` and id!=$2`;
    params.push(id);
  }

  const res = await pool.query(query, params);
  if (res.rows[0]) {
    throw new Error('Content already exists');
  }
}

export async function POST(req: NextRequest) {
  const contentInfo = await req.formData();
  const name = contentInfo.get('name') as string;
  let previewURL: string | null = null;
  try {
    await doesContentExist(name);

    const previewImg = (contentInfo.get('preview_img') as File) || null;
    if (previewImg) {
      previewURL = await uploadFileToDrive(previewImg);
    }
    const query = `
        insert into professionalcontent (name, description, prvimg, link1description, link1, link2description, link2,
                                         link3description, link3, link4description, link4, link5description, link5, visible) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
        returning id, name, description, prvimg, link1description, link1, link2description, link2,
                  link3description, link3, link4description, link4, link5description, link5, visible
        `;

    const values = [
      name,
      contentInfo.get('description'),
      previewURL,
      contentInfo.get('link1description'),
      contentInfo.get('link1'),
      contentInfo.get('link2description'),
      contentInfo.get('link2'),
      contentInfo.get('link3description'),
      contentInfo.get('link3'),
      contentInfo.get('link4description'),
      contentInfo.get('link4'),
      contentInfo.get('link5description'),
      contentInfo.get('link5'),
      contentInfo.get('visible'),
    ];
    const newContent = await pool.query(query, values);
    const Content = newContent.rows[0];

    revalidateTag('professionalContent');

    return NextResponse.json(
      { message: 'Content created successfully', Content },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    // Delete files stored in drive if exists

    if (previewURL !== null) {
      await deleteImg(previewURL);
    }
    if ((error as Error).message === 'Content already exists') {
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
    const content = await pool.query(
      `
      delete from professionalcontent where id=$1 returning prvimg;`,
      [id]
    );

    if (content.rowCount === 0) {
      return NextResponse.json({ error: 'content not found' }, { status: 404 });
    }

    const { prvimg: previewImg } = content.rows[0];

    if (previewImg) {
      await deleteImg(previewImg);
    }

    revalidateTag('professionalcontent');

    return NextResponse.json(
      { message: 'content deleted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const contentInfo = await req.formData();
  const id = contentInfo.get('id') as string;

  try {
    const name = contentInfo.get('name') as string;
    await doesContentExist(name, id);

    const oldContentImg = await pool.query(
      `
        select prvimg from professionalcontent where id=$1;`,
      [id]
    );

    if (oldContentImg.rowCount === 0) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const { prvimg: oldPreviewImgURL } = oldContentImg.rows[0];

    const previewImg = (contentInfo.get('preview_img') as File) || null;
    let previewURL = null;
    if (previewImg) {
      previewURL = await uploadFileToDrive(previewImg);
    }

    const query = `
        update professionalcontent set 
            name = $1, 
            description = $2,
            prvimg = COALESCE($3, $16),
            link1description = $4, 
            link1 = $5, 
            link2description = $6, 
            link2 = $7,
            link3description = $8, 
            link3 = $9, 
            link4description = $10, 
            link4 = $11, 
            link5description = $12, 
            link5 = $13, 
            visible = $14
        where id=$15
        
        returning id, name, description, prvimg, link1description, link1, link2description, link2,
                  link3description, link3, link4description, link4, link5description, link5, visible
        `;

    const values = [
      name,
      contentInfo.get('description'),
      previewURL,
      contentInfo.get('link1description'),
      contentInfo.get('link1'),
      contentInfo.get('link2description'),
      contentInfo.get('link2'),
      contentInfo.get('link3description'),
      contentInfo.get('link3'),
      contentInfo.get('link4description'),
      contentInfo.get('link4'),
      contentInfo.get('link5description'),
      contentInfo.get('link5'),
      contentInfo.get('visible'),
      id,
      oldPreviewImgURL,
    ];

    const updatedContent = await pool.query(query, values);
    const newContent = updatedContent.rows[0];

    if (previewURL && oldPreviewImgURL) {
      await deleteImg(oldPreviewImgURL);
    }

    revalidateTag('professionalContent');

    return NextResponse.json(
      { message: 'Content updated successfully', newContent },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error deleting file' });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const updatedContent = await req.json();
    const name = updatedContent.name;
    const id = updatedContent.id;
    console.log(updatedContent);
    await doesContentExist(name, id);
    const query = `
          update professionalcontent set 
            name = $1, 
            description = $2,
            link1description = $3, 
            link1 = $4, 
            link2description = $5, 
            link2 = $6,
            link3description = $7, 
            link3 = $8, 
            link4description = $9, 
            link4 = $10, 
            link5description = $11, 
            link5 = $12, 
            visible = $13
          where id=$14
          returning id, name, description, link1description, link1, link2description, link2,
                    link3description, link3, link4description, link4, link5description, link5, visible
          `;

    const values = [
      name,
      updatedContent.description,
      updatedContent.link1description,
      updatedContent.link1,
      updatedContent.link2description,
      updatedContent.link2,
      updatedContent.link3description,
      updatedContent.link3,
      updatedContent.link4description,
      updatedContent.link4,
      updatedContent.link5description,
      updatedContent.link5,
      updatedContent.visible,
      id,
    ];
    const newContent = await pool.query(query, values);

    revalidateTag('professionalContent');

    return NextResponse.json(
      { message: 'Content updated successfully', newContent },
      { status: 200 }
    );
  } catch (error) {
    if ((error as Error).message === 'Content already exists') {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Error updating content' });
  }
}
