import app from '../app'; // Menggunakan sintaks import ES6

const port = 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
