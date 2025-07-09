const { MongoClient } = require("mongodb");
const express = require("express");

let db;
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const allAnimals = await db.collection("animals").find().toArray();
  console.log(allAnimals);
  res.render("home", { allAnimals });
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

async function start() {
  const client = new MongoClient(
    "mongodb://root:root@localhost:27017/AmazingMernApp?authSource=admin"
  );

  await client.connect();
  console.log("✅ Connected to MongoDB");

  db = client.db("AmazingMernApp"); // ✅ explicitly select the correct DB

  app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
  });
}

start(); // ✅ Call the function to actually run the app
