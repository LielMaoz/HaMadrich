import { NextRequest } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  if (!query) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  try {
    const result = await pool.query(
      `SELECT id, training_name, drill_type, weapon_type 
       FROM public.trainings 
       WHERE "training_name" ILIKE $1 
       LIMIT 10`,
      [`%${query}%`]
    );  

    return new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}