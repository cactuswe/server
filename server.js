const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

// Web push-nycklar (skapa egna på https://web-push-codelab.glitch.me/)
const publicVapidKey = "DIN_PUBLIC_KEY";
const privateVapidKey = "DIN_PRIVATE_KEY";
webpush.setVapidDetails("mailto:din@email.com", publicVapidKey, privateVapidKey);

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
