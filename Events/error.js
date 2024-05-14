const client = require("../index");

client.on("error", (err) => {
    console.log("Discord API Error :", err);
});

process.on("warning", (warn) => {
    console.log("Warning :", warn);
});

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);
});
