const express = require('express');
const app = express();

app.use(express.static('./dist/todolist.json'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: 'dist/todolist.json/'
  });
});

app.listen(process.env.PORT || 8080);
