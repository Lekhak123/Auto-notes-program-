const looksSame = require('looks-same');
const fs = require("fs");
const config = require("./compare.json");
export const compare = async(imageA, imageB)=>{
console.log(imageA,imageB)

looksSame(imageA, imageB, function(error, {equal}) {
    // equal will be true, if images looks the same

    if(error){
        console.log(`compare error -> ${error}`);
        return false;
    } 
       
        config.result = equal;
        fs.writeFileSync("./compare.json", JSON.stringify(config), function writeJSON(err) {
            if (err) {
            console.log(`File writing error -> ${err}`)
            } 
            console.log(`The image compare result is -> ${equal}`)
            return equal;
        })
    
});


};