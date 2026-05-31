import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  const { name, address, cart, total } = await request.json();

  if (!name || !cart || cart.length === 0) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  return new Promise((resolve) => {
    db.query(
      'INSERT INTO orders (user_name, total, status) VALUES ($1, $2, $3) RETURNING id',
      [name, total, 'PLACED'],
      (err, result) => {
        if (err) {
          console.error('ORDER ERROR:', err);
          resolve(NextResponse.json({ error: 'Order error' }, { status: 500 }));
          return;
        }

        const orderId = result.rows[0].id;
        cart.forEach((item) => {
          db.query(
            'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
            [orderId, item.id, item.quantity]
          );
        });

        resolve(NextResponse.json({ message: 'Order saved successfully' }));
      }
    );
  });
}
