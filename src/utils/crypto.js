export function encryptPassword(password) {
  const secret = process.env.REACT_APP_SECRET_KEY || '';
  if (!secret) {
    // If no secret provided, return plain password (fallback)
    return btoa(password);
  }
  return btoa(password + secret);
}
