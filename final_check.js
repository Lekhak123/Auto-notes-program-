const looksSame = require('looks-same');
const fs = require("fs");
const testFolder = './send_image/';
const config = require("./final_check.json");
import {currentTime} from "./time.js";
async function check (file,imageA) {
    if(!(fs.existsSync(imageA))){
        console.log("returned");
        return;
    }

    looksSame(imageA, file, async function(error, {equal}) {
        // equal will be true, if images looks the same
    
             
                if (error) {
                console.log(`File writing error -> ${error}`)
                } 
                console.log(`The image compare result is -> ${equal}`)
                if(equal===true){
                   
                    config.finalcheck = 1;
                    fs.writeFile("./final_check.json", JSON.stringify(config), function writeJSON(err) {
                        if (err) {
                        console.log(`Final check writing error -> ${err}`)
                        } 
                        
                    })
                    if(fs.exists(imageA)){
                        fs.unlink(imageA,function(err){
                            if(err) return console.log(err);
                            console.log('file deleted successfully');
                       });  
                        return;
                    }
                  
                }
             
       
          
    
    
    });
}


export const final_check =async (imageA)=>{
fs.readdirSync(testFolder).forEach(async file => {
    setTimeout(function () {
        

     check(`./send_image/${file}`,imageA);
     
    
      }, 200)

  });
  var obj = JSON.parse(fs.readFileSync('./compare.json', 'utf8'));
  if(obj.final_check !== "1"){
    let current_time = await currentTime();
    fs.rename(imageA, `./final_Image/${current_time}.PNG` , function (err) {
        if (err) {
            console.log(`Final check file rename error -> ${err}`);
            return false;
        } else {
            console.log('Final! Successfully renamed - AKA moved!')
                console.log(`The image passed the check and is moved to final_image`)
                return true;
        }

    })
  } else {
    config.finalcheck = 0;
    fs.writeFile("./final_check.json", JSON.stringify(config), function writeJSON(err) {
        if (err) {
        console.log(`Final check writing error -> ${err}`)
        } 
        
    })
  }
}
