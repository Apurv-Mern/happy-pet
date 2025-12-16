// // var pokemon = {
// //     firstname: 'Pika',
// //     lastname: 'Chu ',
// //     getPokeName: function () {
// //         var fullname = this.firstname + ' ' + this.lastname;
// //         return fullname;
// //     }
// // };

// // var pokemonName = function (snack, hobby) {
// //     console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
// // };
// // pokemonName.bind(pokemon)('sushi', 'algorithms');
// // pokemonName.call(pokemon, 'sushi', 'algorithms');
// // pokemonName.apply(pokemon, ['sushi', 'algorithms']);

// const primeNumber = (number) => {
//     const prime = []

//     for (let i = 2; i < number; i++) {
//         let isPrime = true

//         for (let j = 2; j < i; j++) {
//             if (i % j === 0) {
//                 console.log(i, j)
//                 isPrime = false
//                 break;
//             }
//         }

//         if (isPrime) {
//             prime.push(i)
//         }

//     }
//     return prime
// }

// console.log(primeNumber(100))


// Promise.reject("Final error")
//     .then((value) => {
//         console.log(value);
//         return value;
//     })
//     .then((value) => {
//         console.log(value);
//     })
//     .catch((error) => {
//         console.log(error);
//     });



// Promise.resolve("Final value")
//     .then((value) => {
//         console.log(value);
//         return value;
//     })
//     .then((value) => {
//         console.log(value);
//     })
// .finally(() => {
//     console.log("Promise.resolve finally executed");
// });


//finalo error
// final value
// final value
// Promise.resolve finally executed





// const arr = [1, 22, 2, 3, 4, 44, 55, 66, 123, 456]
// function counter(arr) {
//     const map = new Map()
//     for (let i of arr) {
//         const len = i.toString().length
//         if (!map.has(len)) {
//             map.set(len, [])
//         }
//         map.get(len).push(i)
//     }
//     return map


// }
// console.log(counter(arr))

const arr = [1, [2, 3, [4, 5]]]
function flatten(arr) {
    let res = []
    for (let i of arr) {
        if (Array.isArray(i)) {
            res.push(...flatten(i))
        } else {
            res.push(i)
        }
    }

    return res
}

console.log(flatten(arr))


const n = [1, 1, 2, 2, 2, 3]

const grouping = (arr) => {
    const map = new Map()
    const map2 = new Map()

    for (let i of arr) {
        map.set(i, (map.get(i) || 0) + 1)
    }

    for (let [key, val] of map) {
        if (!map2.get(val)) {
            map2.set(val, [])
        }

        map2.get(val).push(key)
    }
    return map2
}

console.log(grouping(n))