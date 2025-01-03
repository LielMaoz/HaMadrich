import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/app/lib/auth';
import pool from '@/app/lib/db';
import { UserAuthData } from '@/app/lib/types';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'חובה למלא את כל השדות' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'פורמט דואר אלקטרוני לא תקין' },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if ((existingUser.rowCount as number) > 0) {
      return NextResponse.json(
        {
          error:
            'הדואר האלקטרוני שהזנת כבר קיים במערכת. אנא השתמש בדואר אלקטרוני אחר.',
        },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Insert user into database
    const query = `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING email, first_name, last_name;
    `;
    const user = await pool.query<UserAuthData>(query, [
      email,
      passwordHash,
      firstName,
      lastName,
    ]);

    // Respond with the created user
    return NextResponse.json({ user: user.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'שגיאה בשרת. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    );
  }
}
