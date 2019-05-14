const express = require('express');
const uuid = require('uuid/v4');
const mustacheExpress = require('mustache-express');

let submissions = [];

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', express.static('src/static'));

// register the .mustache extension
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'src/templates');

app.get('/api/list', (req, res) => {
  res.json(submissions);
});

app.get('/view/:uuid', (req, res) => {
  const sub = submissions.find(v => v.uuid === req.params.uuid);
  res.render('view', sub);
});

app.get('/submissions', (req, res) => {
  res.render('submissions', {submissions});
});

app.post('/api/submit', (req, res) => {
  if (req.body.title !== undefined && req.body.comment !== undefined &&
      req.body.url !== undefined && req.body.user !== undefined) {
    const newSub = {
      title: req.body.title,
      user: req.body.user,
      comment: req.body.comment,
      url: req.body.url,
      uuid: uuid(),
    };
    submissions.push(newSub);
    res.json({ added: newSub, submissions });
  } else {
    res.status(400).json(req.body);
  }
});

app.listen(port, () => console.log('server started'));
