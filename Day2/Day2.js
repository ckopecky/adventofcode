const fs = require('fs/promises');

// forward 5 adds 5 to your horizontal position, a total of 5.
// down 5 adds 5 to your depth, resulting in a value of 5.
// forward 8 adds 8 to your horizontal position, a total of 13.
// up 3 decreases your depth by 3, resulting in a value of 2.
// down 8 adds 8 to your depth, resulting in a value of 10.
// forward 2 adds 2 to your horizontal position, a total of 15.

//Part II
// down X increases your aim by X units.
// up X decreases your aim by X units.
// forward X does two things: *********going forward adds depth**********
// It increases your horizontal position by X units.
// It increases your depth by your aim multiplied by X.


let getInputs = () => {    
    let arr;
    return new Promise((resolve, reject) => {
        fs.readFile('./input.txt', { encoding: 'utf-8' })
            .then((data) => {
                arr = data.split('\n').map(str => {
                    let dirNum = str.split(' ');
                    let direction = dirNum[0];
                    let value = Number(dirNum[1]);

                    switch(direction){
                        case 'forward':
                            return (
                                { direction, value }
                            )
                            break;
                        case 'up':  // we are decreasing depth here...so we use negative
                            return (
                                { direction, value: (value * -1) }
                            )
                        case 'down':
                            return (
                                { direction, value }
                            )
                        default:
                            return (
                                { direction, value }
                            )
                    }
                });
                return resolve(arr);
        })
        .catch(reject)
    });     
};

// horizontal ?? && depth ?? is what we are looking for

const getLocationCoordinates = (arr) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    arr.forEach(object => {
        if(object.direction === 'forward') {
            horizontal += object.value;
            depth += aim * object.value;
        } else {
            aim += object.value;
        }
    })

    return (
        { horizontal, depth, aim }
    )


}


getInputs().then(data => {
    const resp = getLocationCoordinates(data);
    console.log(resp.horizontal * resp.depth);
}).catch(err => err.message);