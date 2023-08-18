const express = require("express");
const app = express();
const PORT = 3306;   //8080
const mysql = require("mysql2");
const cors = require("cors"); 



// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Arshan@123",
//   database: "blog",
// });

// const connection = mysql.createConnection({
//   host: "db4free.net",
//   user: "testingblog",
//   password: "arshan@123",
//   database: "system456",
//   multipleStatements: true                      //online database
// });   

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
  }
});


app.use(express.json());

app.use(express.static("public"));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Simple Blog"); 
});



app.route("/api/posts")
  .get((req, res) => {
    
    const query = "SELECT * FROM posts";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching blog posts:", err);
        res.status(500).json({ error: "Failed to fetch blog posts." });
      } else {

        console.log("Fetched blog posts:", results); 
        res.json(results);
      }
    });
  })
  .post((req, res) => {
    const { Title, Content } = req.body;

    
    const query = "INSERT INTO posts (Title, Content) VALUES (?, ?)";
    connection.query(query, [Title, Content], (err, results) => {
      if (err) {
        console.error("Error saving blog post:", err);
        res.status(500).json({ error: "Failed to save blog post." });
      } else {
        console.log("Blog post saved successfully!");
        res.status(201).json({ message: "Blog post saved successfully!" });
      }
    });
    console.log(req.body);
  });


app.options("/api/posts", cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
