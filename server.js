const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

// Web push-nycklar (skapa egna på https://web-push-codelab.glitch.me/)
const publicVapidKey = "BP_MZUvQSXNv66oYHFewNxqYjOMtIOP6n90E7tWw_fzgY2hwiSbVdEOR7GWAeBnhAr7Vz0TB6QHGfqmpVmTtD1Q";
const privateVapidKey = "J-XSTRRtt86bLsGMaq2GPB7rJyL4YRfzFvLQWStfkEQ";
webpush.setVapidDetails("mailto:Noah.kristensson.palm@gmail.com", publicVapidKey, privateVapidKey);

// Lista för push-prenumeranter
let subscribers = [];

// Användare prenumererar på push-notiser
app.post("/subscribe", (req, res) => {
    const subscription = req.body;
    subscribers.push(subscription);
    res.status(201).json({});
});

// Skicka push-notis
app.post("/send-notification", (req, res) => {
    const payload = JSON.stringify({
        title: "💌 Meddelande från din älskling!",
        body: req.body.message
    });

    subscribers.forEach(sub => {
        webpush.sendNotification(sub, payload).catch(err => console.error(err));
    });

    res.status(200).json({ success: true });
});

// Starta servern
app.listen(3000, () => console.log("Server körs på Railway!"));
