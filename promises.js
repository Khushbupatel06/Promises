const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if(delay > 4000) {
            failure('connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}


fakeRequestCallback('books.com/page1',
    function (response){
        console.log("IT WORKED!!!")
        console.log(response)
        fakeRequestCallback('books.com/page2',
            function (response){
                console.log("IT WORKED AGAIN!!!")
                console.log(response)
                fakeRequestCallback('books.com/page3',
                    function (response){
                        console.log("IT WORKED AGAIN (3RD req)!!!")
                        console.log(response)
                    },
                    function (err) {
                        console.log("ERROR (3nd req)!!!", err)
                    })
            },
            function (err) {
                console.log("Error (2nd req)!!!", err)
            })
    }, function (err) {
        console.log("ERROR!!!", err)
    })


fakeRequestPromise ('yelp.com/api/coffee/page1')
    .then(() => {
        console.log("IT WORKED!!!!....(page 1)")
        fakeRequestPromise ('yelp.com/api/coffee/page2')
            .then(() => {
                console.log("IT WORKED!!!!....(page 2)")
                fakeRequestPromise ('yelp.com/api/coffee/page3')
                    .then(() => {
                        console.log("IT WORKED!!!!....(page 3)")
                     })
                    .catch(() => {
                        console.log("OH NO, ERROR!!!! (page 3)")
                    })
            })
            .catch(() => {
                console.log("OH NO, ERROR!!!! (page 2)")
            })
    })
    .catch(() => {
        console.log("OH NO, ERROR!!!! (page 1)")
    })

// ===================================================================
//                     THE MAGIC OF PROMISES
// ===================================================================
fakeRequestPromise ('yelp.com/api/coffee/page1')
    .then ((data) => {
        console.log("IT WORKED..... (Page 1)")
        console.log(data)
        return fakeRequestPromise ('yelp.com/api/coffee/page2')
    })
    .then ((data) => {
        console.log("IT WORKED..... (Page 2)")
        console.log(data)
        return fakeRequestPromise ('yelp.com/api/coffee/page3')
    })
    .then ((data) => {
        console.log("IT WORKED..... (Page 3)")
        console.log(data)
    })
    .catch ((err) => {
        console.log("OH NO, A REQUEST FAILED.....")
        console.log(err)
    })

//     ==============================================================
//                         CREATING PROMISES
//     ==============================================================

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if(rand < 0.5) {
                resolve('Your fake data here');
            }
            reject('Request error!!');
        }, 1000);
    })
}
fakeRequest('/dogs/1')
    .then((data) => {
        console.log("Done with Request!!!")
        console.log("Data is:", data)
    })
    .catch((err) => {
        console.log("Oh no!....", err)
    })

const delayedColorChange = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay)
    })
}
    
delayedColorChange('pink', 1000)
    .then(() => delayedColorChange('teal', 1000))
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => delayedColorChange('blue', 1000))
    .then(() => delayedColorChange('orange', 1000))
    .then(() => delayedColorChange('green', 1000))
    .then(() => delayedColorChange('red', 1000))
    .then(() => delayedColorChange('indigo', 1000))
    .then(() => delayedColorChange('violet', 1000))
    .then(() => delayedColorChange('white', 1000))

