const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());

const assignments = {};

app.post("/generate", (req, res) => {
    const { names } = req.body;
    if (names.length < 2) return res.status(400).send("Not enough participants.");

    const shuffled = [...names].sort(() => 0.5 - Math.random());
    const santaAssignments = {};
    names.forEach((name, i) => {
        santaAssignments[name] = shuffled[i];
    });

    const linkId = uuidv4();
    assignments[linkId] = { data: santaAssignments, clicked: {} };

    res.json({ link:`https://your-frontend-url.com/view/${linkId}`});
});

app.get("/view/:id", (req, res) => {
    const { id } = req.params;
    const assignment = assignments[id];
    if (!assignment) return res.status(404).send("Not Found.");

    res.json({ participants: Object.keys(assignment.data) });
});

app.post("/reveal/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const assignment = assignments[id];
    if (!assignment || assignment.clicked[name]) return res.status(400).send("Already clicked or not found.");

    assignment.clicked[name] = true;
    res.json({ secretSanta: assignment.data[name] });
});

app.listen(3000, () => console.log("Server running on port 3000"));
