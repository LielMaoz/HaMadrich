import pool from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { FirstAidContent } from '@/app/lib/types';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  if (!id || id === '') {
    try {
      const data = await pool.query<FirstAidContent>('SELECT * FROM firstaid');
      return NextResponse.json({ data: data.rows }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { details: (error as Error).message },
        { status: 500 }
      );
    }
  } else {
    try {
      const data = await pool.query<FirstAidContent>(
        `SELECT * FROM firstaid WHERE id=${id}`
      );
      if (data.rowCount === 0) {
        return NextResponse.json({ status: 404 });
      }
      return NextResponse.json({ data: data.rows }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { details: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
