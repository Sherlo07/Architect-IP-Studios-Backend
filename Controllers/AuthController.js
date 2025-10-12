import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
  

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log("🔄 Registration attempt for:", email);

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("❌ User already exists:", email);
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword 
    });

    // Save to database
    const savedUser = await newUser.save();
    console.log("✅ User registered successfully:", {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt
    });

    res.status(201).json({ 
      message: "Registered Successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("🔄 Login attempt for:", email);

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    console.log("✅ Login successful for:", {
      id: user._id,
      name: user.name,
      email: user.email
    });

    res.status(200).json({ 
      message: "Login successful", 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
