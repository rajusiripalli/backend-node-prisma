import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email: rawEmail, password } = req.body;
  const email = rawEmail?.trim().toLowerCase();

  if (!name?.trim() || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exists with that email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExists) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //verify password
  const isPasswordValid = await bcrypt.compare(password, userExists.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //generate JWT token
  const token = generateToken(userExists.id, res);

  return res.status(200).json({
    status: "success",
    data: {
      user: {
        id: userExists.id,
        email: userExists.email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export { register, login, logout};
