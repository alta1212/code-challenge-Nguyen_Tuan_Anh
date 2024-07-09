import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import router from './router/routes'
import { Server, Socket } from 'socket.io';
import cors from 'cors';
const app = express()
app.use(cors());
require('dotenv').config()
const server= http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: '*',
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(verifyToken)
app.use('/api',router)
app.set('io', io);
const PORT=process.env.PORT || 3005;

io.on('connection', (socket:Socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});