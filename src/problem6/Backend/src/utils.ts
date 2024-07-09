import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
const jwt = require('jsonwebtoken')

interface User {
  userId: string;
  username: string;
  tokens: string;
  score: number; 
}

const users: { [key: string]: User } = {};
const scores: { [key: string]: number } = {};

export const updateScore = (req: Request, res: Response) => {
    const userId =req.body.userId
    if(scores[userId]===undefined)
    {
        scores[userId]=0;
    }
    scores[userId] += 1;

    if (users[userId]) {
      users[userId].score = scores[userId];
    }
    const top10Scores = getTop10();


    const io = req.app.get('io') as Server;
    io.emit('updateScores', top10Scores);

    res.status(200).send('Score updated');
};
export const login = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
  
      const user: User={
        userId:uuidv4(),
        username:"",
        tokens:"",
        score: 0 
      }

      user.username=name;
      const token=await jwt.sign(user, process.env.SECRET_KEY)
      user.tokens=token;
      users[user.userId] = user;


      return res.status(200).json({ message: 'Login successful',data:user });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getTop10Scores = (req: Request, res: Response) => {
  const top10Scores = getTop10();
  res.status(200).json({ scores: top10Scores });
};

const getTop10 = () => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([userId, score]) => {
      const user = users[userId];
      return { userId, score, username: user ? user.username : 'Unknown' };
    });
};
