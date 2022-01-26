const fs = require("fs");
import {currentTime} from "./time.js"
import {final_check} from "./final_check";
export const save = async(bool) => {
    console.log(`Bool -> ${bool}`)
    if (bool === false) {
        let current_time = await currentTime();
        let source_path = "./temp/png1.PNG"

      fs.rename(source_path, `./send_image/${current_time}.PNG`, function (err) {
            if (err) {
                console.log(`Error in moving the file error ${err}`)
                return false;
            } else {
               
                fs.rename("./temp/png2.PNG", `./temp/png1.PNG` , function (err) {
                    if (err) {
                        console.log(`file rename error -> ${err}`);
                        return false;
                    } else {
                        console.log('Successfully renamed - AKA moved!')
                            console.log(`Changed png2 to png 1`)
                            final_check(`./send_image/${current_time}.PNG`);
                            return true;
                    }
            
                })

            }
    
        })

    } else {
        return false;
    }
}