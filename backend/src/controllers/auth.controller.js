import bcrypt from "bcryptjs";
import { generateToken } from "../lib/tokens.js";
import cloudinary from "../lib/cloudinary.js";
import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || name.trim().length == 0) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email || email.trim().length == 0) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!password || password.trim().length == 0) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const dbUser = await User.findOne({ email });

    if (dbUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || email.trim().length == 0) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!password || password.trim().length == 0) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatching) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(existingUser._id, res);

    return res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      profilePic: existingUser.profilePic,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userID = req.user._id;
    if (!userID) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture not chosen" });
    }

    const uploadedImage = await cloudinary.uploader.upload(profilePic, {
      folder: "Chatterbox/profile-pics",
    });

    const secured_url = cloudinary.url(uploadedImage.public_id, {
      transformation: [
        {
          fetch_format: "auto",
          width: "300",
          quality: "auto",
        },
      ],
    });

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        profilePic: secured_url,
      },
      { new: true }
    );

    return res.status(204).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
