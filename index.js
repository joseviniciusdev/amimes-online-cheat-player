const puppeteer = require('puppeteer');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors())

// nodemon para map files 

// read line sync 


async function pageLoad(pageUrl) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const page = await browser.newPage();

    await page.goto(pageUrl);

    // await page.waitForTimeout(6000);

    await page.waitForFunction(
        'document.querySelectorAll(".ad.ad-1").length'
    );

    // await page.screenshot({ path: 'example.png' });

    const urlPLayer = await page.evaluate(() => window.url);

    await browser.close();

    console.log('end process')

    return urlPLayer
}

// 


app.use(express.json());

app.post('/return-player', async (req, res) => {
    // const url = req.query.url;

    const post = req.body;

    const response = await pageLoad(post.url);

    return res.json({
        player: response
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server iniciado')
})
