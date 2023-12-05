const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000; 


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const formData = [];

app.post('/api/register', (req, res) => {
    const { fullname, username, email, number, gender } = req.body;
    const data = { fullname, username, email, number, gender };
    formData.push(data);
    res.json({ message: 'Form submitted successfully' });
});

app.get('/api/register', (req, res) => {
    res.json(formData);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
