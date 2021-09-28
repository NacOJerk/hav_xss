const express = require("express");
const puppeteer = require('puppeteer');
const path = require("path");
const app = express();


cookie = {
    name: 'FlAg',
    value: 'CtF{C00ci3sAr3W3ird}',
    url: '',
    path: '/'
  };  

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
        
        let alerted = "Better luck next time";
        page.on('dialog', async dialog => {

            alerted = dialog.message();
            console.log(alerted);
            await dialog.accept();

        });
        cookie['url'] = url;
        await page.setCookie(cookie);
        await page.goto(url);
        //await delay(5000);
        await browser.close();
        res.send(alerted);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.listen(8082, () => {
    console.log("server started on port 8082");
});

