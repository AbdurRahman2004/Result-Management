require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Create a connection for the 'admin' database for student data
const adminDbConnection = mongoose.createConnection(process.env.ADMIN_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a connection for the 'my-login-app' database for user data
const loginDbConnection = mongoose.createConnection(process.env.LOGIN_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

adminDbConnection.on('error', console.error.bind(console, 'Error connecting to MongoDB admin database:'));
adminDbConnection.once('open', () => {
  console.log('Connected to MongoDB admin database');
});

loginDbConnection.on('error', console.error.bind(console, 'Error connecting to MongoDB login database:'));
loginDbConnection.once('open', () => {
  console.log('Connected to MongoDB login database');
});

// Define the Student schema and model using the admin database connection
const studentSchema = new mongoose.Schema({
  rollno: String, // Change this to String if roll numbers are stored as strings
  name: String,
  web_technology: String,
  database_management_system: String,
  maths: String,
  operating_system: String,
  formal_language_automata_theory: String
}, { collection: 'Students' });

const Student = adminDbConnection.model('Student', studentSchema);

// Define the Reevaluation schema and model using the admin database connection
const reevaluationSchema = new mongoose.Schema({
  rollNumber: String,
  subject: String,
  reason: String,
  status: { type: String, default: 'Pending' } // Add a status field for tracking the reevaluation request status
}, { collection: 'Reevaluations' });

const Reevaluation = adminDbConnection.model('Reevaluation', reevaluationSchema);

// Define the User schema and model using the login database connection
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNumber: { type: String, required: true }
});

const User = loginDbConnection.model('User', userSchema);

// Student endpoints
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    if (!students) {
      return res.status(404).json({ message: 'No students found' });
    }
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/students', async (req, res) => {
  const student = new Student({
    rollno: req.body.rollNumber,
    name: req.body.name,
    web_technology: req.body.web_technology,
    database_management_system: req.body.database_management_system,
    maths: req.body.maths,
    operating_system: req.body.operating_system,
    formal_language_automata_theory: req.body.formal_language_automata_theory
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(400).json({ message: 'Error creating student' });
  }
});

// Authentication endpoints
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    // Compare passwords directly
    if (await bcrypt.compare(password, user.password)) {
      // Passwords match, generate token
      const token = jwt.sign({ id: user._id, rollNumber: user.rollNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token, rollNumber: user.rollNumber });
    } else {
      // Passwords don't match
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    // User not found
    res.json({ success: false, message: 'User not found' });
  }
});

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Extract roll number from email
    const emailPattern = /^[a-zA-Z]+\d+[a-zA-Z]+(\d+)@kongu.edu$/;
    const match = email.match(emailPattern);

    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Extract the last number part as the roll number
    const rollNumber = match[1].split('').pop();

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, rollNumber });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch student results based on roll number
app.get('/student-results', async (req, res) => {
  const rollNumber = req.query.rollNumber; 

  try {
    const student = await Student.findOne({ rollno: rollNumber }); // Ensure the query matches the database field
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching student results:', err);
    res.status(500).json({ message: 'Error fetching student results' });
  }
  console.log(`${rollNumber} + 1`);// Ensure roll number is passed as a query parameter
});

// Reevaluation endpoints
app.post('/reevaluation', async (req, res) => {
  const reevaluation = new Reevaluation({
    rollNumber: req.body.rollNumber,
    subject: req.body.subject,
    reason: req.body.reason
  });

  try {
    const newReevaluation = await reevaluation.save();
    res.status(201).json(newReevaluation);
  } catch (err) {
    console.error('Error submitting reevaluation request:', err);
    res.status(400).json({ message: 'Error submitting reevaluation request' });
  }
});

app.get('/reevaluation', async (req, res) => {
  try {
    const reevaluations = await Reevaluation.find();
    if (!reevaluations) {
      return res.status(404).json({ message: 'No reevaluation requests found' });
    }
    res.json(reevaluations);
  } catch (err) {
    console.error('Error fetching reevaluation requests:', err);
    res.status(500).json({ message: 'Error fetching reevaluation requests' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
