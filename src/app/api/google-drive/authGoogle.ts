import { google } from "googleapis";

const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY;
const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
const serviceAccountClientId =
  process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_CLIENT_ID;



export const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      private_key: privateKey,
      client_email: clientEmail,
      client_id: serviceAccountClientId,
    },
    scopes: "https://www.googleapis.com/auth/drive",
  });

  return auth;
};

export const listFilesInDrive = async()=>{
  const auth = authenticateGoogle();
  const drive = google.drive({version:'v3',auth:auth});
  const res = await drive.files.list({
      pageSize:10,
      fields:'files(id,name)',
      q:	'mimeType != "application/vnd.google-apps.folder" and trashed=false',
  });
  const files = res.data.files;
  if(files?.length===0){
      console.log("No files found");
      return;
  }
  console.log("Files: ");
  files?.map((file)=>{
      console.log(`${file.name} (${file.id})`);
  })
  return files;
}