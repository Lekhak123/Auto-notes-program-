const puppeteer = require('puppeteer');
const fs = require('fs');
import {compare} from './compare.js';
import {save} from "./save.js";
import {test} from "./test.js";
const config = require("./compare.json")
var pathA = "./temp/png1.PNG";
var pathB = "./temp/png2.PNG"
const edgePaths = require("edge-paths");
const EDGE_PATH = edgePaths.getEdgePath();
import {site,username,password} from "./config.json";
const launch = async() => {
    const browser = await puppeteer.launch({
        executablePath: EDGE_PATH,
        headless: false,
        args: [
            '--disable-features=site-per-process', '--mute-audio', '--no-sandbox'
        ],
        slowMo: 250
    }).catch((e) => {
        console.log(`browser launch error ${e}`)
    })
    const page = await browser.newPage()

    await page.setViewport({width: 1366, height: 768});
    await page.goto(`${site}`, ["networkidle0", "domcontentloaded"]);
    console.log(`Use this to login into teams
    Username -> ${username}
    Password -> ${password}`)

    if (fs.existsSync(pathA)) {
        await page.screenshot({path: pathB, fullPage: true, captureBeyondViewport: false});

    }
    let bool = await compare(pathA, pathB);

    if (bool === undefined) {
        let saved = await save(config.result);

        console.log(`Initial Saved -> ${saved}`)
      

            setInterval(async() => {
                if (fs.existsSync(pathA)) {
                    await page.screenshot({path: pathB, });

                    let result = await test();
                    if (result === true) {
                        await page.screenshot({path: pathB, });
                    }
                }

            }, 5000)
        
    }

};

launch()
