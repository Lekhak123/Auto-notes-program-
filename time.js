
export const currentTime = async()=>{
let ts = Date.now();

var formatted = Math.floor(ts/1000)
console.log(`Time is -> ${formatted}`)
return formatted;
}