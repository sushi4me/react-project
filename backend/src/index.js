import express from 'express';

const PORT = 5000;

const app = express();

app.get('/', (req, res) => res.status(200).send('Root!'));
app.get('/test', (req, res) => res.status(200).send('OK'));

app.listen(PORT, () => {
  console.log(`--> Listening on ${PORT}`);
});
