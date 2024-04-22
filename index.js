const express = require('express');
const app = express();
const path = require('path');
const { globalRouter } = require('./routes/globalRouter');

app.use(express.json());
const port = 5000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use("/static", express.static('./static/'));

app.get('/', (req, res) => {
  res.render(__dirname + '/index.ejs');
})

app.get('/About-Us', (req, res) => {
  res.render(__dirname + '/pages/About.ejs');
});

app.get('/Contact', (req, res) => {
  res.render(__dirname + '/pages/Contact.ejs');
});

app.use('/Simulations', globalRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
