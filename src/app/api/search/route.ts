import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/app/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { query } = req.query;
  if (!query || typeof query !== 'string') return res.status(400).json({ error: 'Missing query' });

  try {
    const result = await pool.query(
        'SELECT * FROM trainings WHERE "training_name" ILIKE $1 LIMIT 10', 
        [`%${query}%`]
      );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
