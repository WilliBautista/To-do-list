const express = require('express');
const app = express();

app.use(express.static('./dist/toDoList'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: 'dist/toDoList/'
  });
});

app.listen(process.env.PORT || 8080);
