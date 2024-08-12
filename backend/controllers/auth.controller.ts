import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

const users = [
  { username: 'player1', password: 'password1' },
  { username: 'player2', password: 'password2' },
];

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
};
