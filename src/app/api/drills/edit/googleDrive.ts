import { drive_v3, google } from 'googleapis';
import { Readable } from 'stream';
import mime from 'mime';

const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY;
const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
const serviceAccountClientId =
  process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_CLIENT_ID;

export const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      private_key: privateKey,
      client_email: clientEmail,
      client_id: serviceAccountClientId,
    },
    scopes: 'https://www.googleapis.com/auth/drive',
  });

  return auth;
};

export const listFilesInDrive = async () => {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: 'v3', auth: auth });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'files(id,name)',
    q: 'mimeType != "application/vnd.google-apps.folder" and trashed=false',
  });
  const files = res.data.files;
  if (files?.length === 0) {
    console.log('No files found');
    return;
  }
  console.log('Files: ');
  files?.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
  return files;
};

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

export async function findFileInDrive(fileName: string) {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: 'v3', auth: auth });
  const res = await drive.files.list({
    fields: 'files(id,name)',
    q: `name = "${fileName}" and trashed=false`,
  });
  const files = res.data.files || [];
  if (files?.length === 0) {
    console.log('file not found');
    return '';
  }
  const fileId = files[0];
  console.log(fileId);
  return fileId.id;
}

export async function deleteFileFromDrive(fileId: string) {
  const auth = authenticateGoogle();
  const drive = google.drive({ version: 'v3', auth: auth });
  const body_value = {
    trashed: true,
  };

  const response = await drive.files.update({
    fileId: fileId,
    requestBody: body_value,
  });
  return response;
}
