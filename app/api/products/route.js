import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  return new Promise((resolve) => {
    db.query('SELECT * FROM products', (err, result) => {
      if (err) {
        console.error(err);
        resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(result.rows));
      }
    });
  });
}
