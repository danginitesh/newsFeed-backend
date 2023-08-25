import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signUp = async (req, res) => {
    const { email, username, password } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const newUser = new User({ email, username, password: hash });
      await newUser.save();
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not Found' });
      }

      const passwordMatched = await bcrypt.compare(password, user.password); 


      if (!passwordMatched || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ email }, "asdfghjkl");
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
}

export {
    login,
    signUp
}
