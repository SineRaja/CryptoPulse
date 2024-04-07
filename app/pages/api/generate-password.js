import nextConnect from 'next-connect';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const PasswordSchema = new mongoose.Schema({
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let connection = null;
let model = null;

async function getDatabaseConnection() {
  if (connection && mongoose.connection.readyState === 1) return connection;
  
  connection = await mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
}

async function getPasswordModel() {
  if (model) return model;

  await getDatabaseConnection();
  model = mongoose.model('Password', PasswordSchema);
  return model;
}

const handler = nextConnect();

handler.post(async (req, res) => {
  const { length } = req.body;
  const passwordLength = parseInt(length);

  if (!length || isNaN(passwordLength) || passwordLength < 6) {
    return res.status(400).json({ error: 'Invalid length provided. Length should be a number and at least 6 characters.' });
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store hashed password in MongoDB
  const PasswordModel = await getPasswordModel();
  const newPasswordEntry = new PasswordModel({ password: hashedPassword });
  await newPasswordEntry.save();

  res.status(200).json({ password, length: password.length });
});

export default handler;
