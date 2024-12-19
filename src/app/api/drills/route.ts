import pool from "@/app/lib/db";
import { NextResponse } from "next/server";
import { drill } from "@/app/lib/types";


export async function GET(){
    try{
        const data = await pool.query<drill>('SELECT * FROM trainings');
        return NextResponse.json({data:data.rows},{status:200});
    }
    catch(error){
        return NextResponse.json(
            {details: (error as Error).message},{status:500}
        );
    }
}