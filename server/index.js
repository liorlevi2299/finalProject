const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

const mysqlDB = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2299lior',
  database: 'micmarkdb',
});
// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.post('/api/insert_comment', (req, res) => {
  const comment_text = req.body.comment_text;
  const author = req.body.author;
  const postId = req.body.postId;
  // const date = req.body.date;
  const insert =
    'INSERT INTO comments (post_id, text_comment, author, date) VALUES (?,?,?, NOW())';
  mysqlDB.query(insert, [postId, comment_text, author], (err, result) => {
    console.log('did query!');
    console.log(result);
    console.log(err);
  });
});

app.post('/api/insert_posts', (req, res) => {
  // const uploadDate = req.body.uploadDate;
  const captionText = req.body.captionText;
  const imageLink = req.body.imageLink;
  const author = global.username;
  // console.log(global.globalUsername);
  // global.globalUsername = 'lior';
  // console.log(global.globalUsername);

  const insert =
    'INSERT INTO posts (upload_date, caption_text, image_link, author) VALUES (NOW(),?,?,?)';
  mysqlDB.query(insert, [captionText, imageLink, author], (err, result) => {
    console.log('did query!');
    console.log(result);
    console.log(err);
  });
});
app.get('/api/select_comments', (req, res) => {
  console.log('server' + req.query.postId);
  const post_id = req.query.postId;
  // const post_id = 1;
  const select_comments = 'SELECT * FROM comments WHERE post_id=?';
  mysqlDB.query(select_comments, [post_id], (err, result) => {
    console.log('did query!');
    console.log(result);
    console.log(err);
    res.send(result); // sending what we got from the query to the frontend.
  });
});
app.post('/api/insert_womandata', (req, res) => {
  const name = req.body.name;
  console.log(name);
  const weight = req.body.weight;
  const week = req.body.week;
  const height = req.body.height;
  const dueDate = req.body.dueDate;
  // const dueDate = null;

  // const selectDate = 'SELECT YEAR(?)';
  // mysqlDB.query(selectDate, [dueDate], (err, result) => {
  //   console.log('did query!');
  //   const obj = JSON.stringify(result);
  //   console.log('result is: ' + obj);
  //   console.log('error is: ' + err);
  // });
  console.log('hello');
  const sqlInsert =
    'INSERT INTO womendata (Name, Weight, Week, Height, DueDate) VALUES (?,?,?,?,?)';
  mysqlDB.query(
    sqlInsert,
    [name, weight, week, height, dueDate],
    (err, result) => {
      console.log('did query!');
      console.log(result);
      console.log(err);
    },
  );
});

app.listen(3001, () => {
  console.log('running on port 3001');
});

// app.get('/', (req, res) => {
//   const sqlInsert =
//     "INSERT INTO womendata (Name, Weight, Week, Height, DueDate) VALUES ('woman1', 70, 12, 165, '2022-06-30' );";
//   mysqlDB.query(sqlInsert, (err, result) => {
//     console.log(err);

//     res.send('hello lior');
//   });
// });
