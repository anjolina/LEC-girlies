const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static(path.join(__dirname, "public"))); // <-- fixed path

// image upload setup
const storage = multer.diskStorage({
  // ensure uploads directory exists and use absolute path
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
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

// --- Simple signup implementation (stores users in backend/data/users.json)
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const usersFile = path.join(dataDir, "users.json");
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]", { encoding: "utf8" });

function readUsers() {
  try {
    const raw = fs.readFileSync(usersFile, "utf8") || "[]";
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), { encoding: "utf8" });
}

function hashPassword(password, salt) {
  salt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { salt, hash };
}

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  const users = readUsers();
  if (users.find((u) => u.email === email)) return res.status(409).json({ error: "Email already registered" });

  const { salt, hash } = hashPassword(password);
  const user = { id: Date.now(), name: name || "", email, salt, hash, createdAt: new Date().toISOString() };
  users.push(user);
  writeUsers(users);

  return res.status(201).json({ message: "User registered" });
});

// Simple login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { hash } = hashPassword(password, user.salt);
  if (hash !== user.hash) return res.status(401).json({ error: 'Invalid credentials' });

  // return basic user info (no sensitive fields)
  return res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
});