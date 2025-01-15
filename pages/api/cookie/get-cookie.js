// pages/api/cookie/get-cookie.js
import { parse } from 'cookie';

export default function handler(req, res) {
  // Parse the cookies from the request headers
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token || null; // Get the token cookie

  return res.status(200).json({ token });
}
