const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const punycode = require("punycode");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI =
  "mongodb+srv://vamshi1:abcd123@cluster0.kmujw7z.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB without deprecated options
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// POST endpoint to submit user data
app.post("/submit", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("User saved to database");
  } catch (error) {
    res.status(500).send("Error saving user");
  }
});

// GET endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
