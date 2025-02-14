import pool from '@/app/lib/db';

export async function GET() {
  try {
    const drillsQuery = await pool.query(
      `SELECT id, training_name, weapon_type, drill_type FROM public.trainings`
    );  
    const firstAidQuery = await pool.query(
      `SELECT id, name FROM public.firstaid`
    );
    const professionalContentQuery = await pool.query(
      `SELECT id, name FROM public.professionalcontent`
    );

    const drills = drillsQuery.rows;
    const firstAid = firstAidQuery.rows;
    const professionalContent = professionalContentQuery.rows;

    return new Response(
      JSON.stringify({
        drills,
        firstAid,
        professionalContent,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching drills:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
