import pool from '@/app/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, training_name, drill_type, weapon_type 
       FROM public.trainings`
    );  

    return new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error('Error fetching drills:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
