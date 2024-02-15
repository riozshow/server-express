const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();

const upload = multer();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }));

app.use('/user', (req, res) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('index', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  const { author, sender, title, message } = req.body;

  const imgSrc = Buffer.from(req.file.buffer).toString('base64');

  if (author && sender && title && message) {
    res.render('contact', {
      isSent: true,
      filename: req.file.originalname,
      imgSrc,
    });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
