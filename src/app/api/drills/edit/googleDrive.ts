import { drive_v3, google } from 'googleapis';
import { authenticateGoogle } from '@/app/api/google-drive/authGoogle';
import mime from 'mime';
import { Readable } from 'stream';

export const uploadFileToDrive = async (file: File) => {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: 'v3', auth });

  const mimeType = mime.getType(file.name);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const requestBody = {
    name: file.name,
    parents: [
      process.env.GOOGLE_DRIVE_ID || '1i9PAl8ZIlS1kCFiDgJsvv47pXYFBidSQ',
    ],
  };

  const media = {
    mimeType: mimeType!,
    body: Readable.from(fileBuffer),
  };

  const newFile = await drive.files.create({
    requestBody,
    media: media,
  });
  console.log('upload success file id : ', newFile.data.id);
  const link = await getWebLink(newFile.data.id || '', drive);
  return link;
};

export async function getWebLink(fileId: string, drive: drive_v3.Drive) {
  await drive.permissions.create({
    //need to make the equivalant when we deleting picture.
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  const fileLink = `https://drive.google.com/thumbnail?id=${fileId}`;
  return fileLink;
}
