import { google } from "googleapis";
import { authenticateGoogle } from "../authGoogle";
import { NextRequest, NextResponse } from "next/server";


async function findFileInDrive(fileName:string){
    const auth = authenticateGoogle();
    const drive = google.drive({version:'v3',auth:auth});
    const res = await drive.files.list({
        fields:'files(id,name)',
        q:`name = "${fileName}" and trashed=false`,
    });
    const files = res.data.files||[];
    if(files?.length===0){
        console.log("file not found");
        return "";
    }
    const fileId = files[0];
    console.log(fileId);
    return fileId.id;
}

async function deleteFileFromDrive(fileId:string) {
    console.log(fileId);
    const auth = authenticateGoogle();
    const drive = google.drive({version:'v3',auth:auth});
    const body_value = {
        'trashed': true
      };
      
      const response = await drive.files.update({
            fileId: fileId,
            requestBody: body_value,
          });
          return response;
}

/*The idea was to  send params with the link we sent the id of the picture and than delete*/
export async function DELETE(req:NextRequest){
    const ress = req.nextUrl.searchParams;
    const fileId = ress.get("fileId");
    if(fileId===""){
        return NextResponse.json({status:400});
    }
    const res =await deleteFileFromDrive(fileId as string);
    return NextResponse.json(res,{status:200});
}