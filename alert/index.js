const express = require("express");
const puppeteer = require('puppeteer');
const path = require("path");
const app = express();


let FLAG = "CtF{AlertsAreCool}";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/xss", (req, res) => {
    res.render("xss", {
        data: req.query.data
    });
});

app.get("/submit", async (req, res) => {
    try {
        let url = req.query.url || 'INVALID';
        if (url == 'INVALID') {
            res.status(404);
            res.send("Nope");
            return;
        }
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'] });
        const page = await browser.newPage();
        let alerted = false;
        page.on('dialog', async dialog => {

            alerted = true;

            await dialog.accept();

        });
        await page.goto(url);
        //await delay(5000);
        await browser.close();
        if (alerted) {
            res.send(FLAG);
        }
        else {
            res.send("Better luck next time");
        }
    } catch (err) {
        console.log(err.message)
        res.send(err.message);
    }
});

app.listen(8081, () => {
    console.log("server started on port 8081");
});

