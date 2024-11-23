import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from  'pg';

// הגדרת טיפוס עבור רשומת משתמש
interface User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  permission: 'admin' | 'regular';
}

// יצירת אובייקט הלקוח של PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// פונקציית ה-API של Next.js עם טיפוסי פרמטרים
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect(); // חיבור למסד הנתונים
    
    const result = await client.query<User>('SELECT * FROM users'); // שאילתה עם טיפוס מוגדר
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: (error as Error).message });
  } finally {
    await client.end(); // סגירת החיבור
  }
}
