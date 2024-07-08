import app from './app';
import { exec } from 'child_process';

const PORT = process.env.PORT || 3000;
const JSON_SERVER_PORT = 3001;

exec(`npx json-server --watch db.json --port ${JSON_SERVER_PORT}`, (err, out) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(out)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
