// pages/api/cookie/set-cookie.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Set a cookie with a 7-day expiration
    const cookieHeader = serialize('token', 'your-token-value', {
      httpOnly: true,   // Helps prevent access to cookie via JavaScript (security)
      secure:true,
      // secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (HTTPS)
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
      path: '/',        // Cookie available across the entire site
    });

    res.setHeader('Set-Cookie', cookieHeader);
    return res.status(200).json({ message: 'Cookie set successfully' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
