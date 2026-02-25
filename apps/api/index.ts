import prismaClient from "@repo/db";
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is up");
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prismaClient.user.create({
            data: {
                email,
                password,
            },
        });
        res.json({
            message: "User created successfully",
            userId: user.id
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
        message: "User signed in successfully",
        token
    });
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});