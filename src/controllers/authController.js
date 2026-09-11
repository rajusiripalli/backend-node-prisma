import bcrypt from "bcryptjs";
import {prisma} from "../config/db.js";
import { Prisma } from "../generated/prisma/client.ts";


const register = async (req, res) => {

        const { name, email: rawEmail, password } = req.body;
        const email = rawEmail?.trim().toLowerCase();

        if (!name?.trim() || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({ message: "User already exists with that email" });
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
    
export { register };