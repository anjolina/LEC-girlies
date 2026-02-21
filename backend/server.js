const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static(path.join(__dirname, "public"))); // <-- fixed path

// image upload setup
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

let items = []; // temporary database

// upload API
app.post("/upload-item", upload.array("images"), (req, res) => {
  const { category, size, description, price } = req.body;

  const newItem = {
    id: Date.now(),
    category,
    size,
    description,
    price,
    images: req.files.map((file) => file.filename),
  };

  items.push(newItem);

  res.json({
    message: "Item uploaded successfully",
    item: newItem,
  });
});

// get items for marketplace
app.get("/items", (req, res) => {
  res.json(items);
});

// serve index.html on home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});