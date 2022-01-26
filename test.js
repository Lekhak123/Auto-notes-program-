import {compare} from './compare.js';
import {save} from "./save.js";
var fs = require('fs');
var pathA = "./temp/png1.PNG";
var pathB = "./temp/png2.PNG"

export const test = async() => {
    let bool = await compare(pathA, pathB);
    console.log(`Test compare results aka bool -> ${bool}`)
    if (bool === undefined) {
        
        var obj = JSON.parse(fs.readFileSync('./compare.json', 'utf8'));
        console.log(`compare result -> ${obj.result}`)
        let saved = await save(obj.result);
        console.log(`Test Saved -> ${saved}`)
        return saved;
    }
}