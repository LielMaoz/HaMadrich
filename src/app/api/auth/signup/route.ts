import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { createJwtToken } from '../token';
import { User } from '@/app/lib/types';
import bcrypt from 'bcrypt';

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
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name;
    `;

    const user = await pool.query(query, [
      email,
      passwordHash,
      firstName,
      lastName,
    ]);

    const userData: User = {
      id: user.rows[0].id,
      email: user.rows[0].email,
      permission: user.rows[0].permission,
      firstName: user.rows[0].first_name,
      lastName: user.rows[0].last_name,
    };

    const jwt = await createJwtToken(userData);

    // Return the token in response
    return NextResponse.json({ user: userData, token: jwt }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'שגיאה בשרת. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    );
  }
}
