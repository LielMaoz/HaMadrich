import { drive_v3, google } from "googleapis";
import { NextResponse } from "next/server";
import { authenticateGoogle, listFilesInDrive } from "../authGoogle";
import mime from "mime";
import fs from "fs";
import { Readable } from "stream";
import { error } from "console";

const uploadFileToDrive = async(file:File)=>{
    const auth = authenticateGoogle();
    const drive = google.drive({version:"v3",auth});

    var mimeType = mime.getType(file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer())


    const requestBody={
        name:file.name,
        parents:[process.env.GOOGLE_DRIVE_ID||'1i9PAl8ZIlS1kCFiDgJsvv47pXYFBidSQ'],
    }

    const media ={
        mimeType:mimeType!,
        body:Readable.from(fileBuffer),
    }

    const newFile = await drive.files.create({
        requestBody,
        media:media,
    })
    console.log("upload success file id : ",newFile.data.id);
    const link = await getWebLink(newFile.data.id||"",drive);
    return link;
}

async function getWebLink(fileId:string, drive:drive_v3.Drive){
    await drive.permissions.create({ //need to make the equivalant when we deleting picture.
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
          
      const fileLink = `https://drive.google.com/thumbnail?id=${fileId}`;
      return fileLink;
    };

/*returns the weblink to the picture in the drive can be visible on website img = {weblink}
* https://dev.to/temmietope/embedding-a-google-drive-image-in-html-3mm9 = article src the first comment
*/
export async function POST(req:Request){
    const res = (await req.formData())
    const file = res.get("file") as File;
    console.log(file);
    if(!file || file.size===0){
        return NextResponse.json({
            message:"Missing file to upload"
        },
        {
            status:400
        }
    );
    }
    const x = await uploadFileToDrive(file);
    return NextResponse.json(x,{status:200});
}