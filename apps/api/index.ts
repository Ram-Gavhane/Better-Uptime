import prismaClient from "@repo/db";
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import middleware from "./middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is up");
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({
        where: {
            email,
        },
    });
    if (user) {
        return res.status(400).json({ message: "User associated with this email already exists" });
    }
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

app.post("/add-website", middleware, async (req, res) => {
    const { url } = req.body;
    const userId = req.userId;
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        const response = await prismaClient.website.create({
            data: {
                url,
                userId: userId,
            },
        });
        res.json({
            message: "Website added successfully",
            response
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error });
    }
});

app.get("/get-websites", middleware, async (req, res) => {
    const userId = req.userId;
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const websites = await prismaClient.website.findMany({
        where: {
            userId: userId,
        },
    });
    res.json({
        message: "Websites fetched successfully",
        websites
    });
});

app.get("/website/:id", middleware, async (req, res) => {
    const id = req.params.id as string;
    const website = await prismaClient.website.findUnique({
        where: {
            id
        },
    });
    if (!website) {
        return res.status(404).json({ message: "Website not found" });
    }
    res.json({
        message: "Website fetched successfully",
        website
    });
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});