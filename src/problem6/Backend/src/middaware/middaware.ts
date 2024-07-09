import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY || 'keynnn123@', (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    if (typeof decoded === 'object' && decoded !== null) {
      req.body.userId = decoded.userId;
      req.body.username = decoded.username;
    } else {
      console.error('Invalid token format:', decoded);
      return res.status(401).send('Unauthorized');
    }

    next();
  });
};
