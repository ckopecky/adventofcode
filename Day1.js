const { count } = require('console');
const fs = require('fs/promises');
const { argv } = require('process')


    
let getDepthInputs = () => {    
    let arr;
    return new Promise((resolve, reject) => {
        fs.readFile('./depthInput.txt', { encoding: 'utf-8' })
            .then((data) => {
                arr = data.split('\n').map(str => {
                    return Number(str);
                });
                return resolve(arr);
        })
        .catch(reject)
    });     
};

let countIncDepths = (arr, blockSize = 1) => {
    let increasingDepthCount = 0;
    for(let i = blockSize; i < arr.length; i+= 1) {
        let curr = arr[i];
        let prev = arr[i - blockSize];
         if(curr - prev > 0) {
             increasingDepthCount += 1;
         }
    }
    return increasingDepthCount;
}

getDepthInputs().then(data => {
    const responseOne = countIncDepths(data, 1); // 1195
    const responseThree = countIncDepths(data, 3); // 1235
    console.log([{responseOne}, {responseThree}])
}).catch(err => err.message);








