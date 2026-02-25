import express from "express";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is up");
});

app.post("/signup", (req, res) => {

});

app.post("/signin", (req, res) => {

});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});