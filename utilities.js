const fs = require('fs')

//we're using request even though it is deprecated
const request = require('request')

const BASE_URL = "https://icanhazdadjoke.com/"


let writeToFile = (joke)=>{
    //appends the joke to the end of the file
    fs.appendFileSync('./jokes.txt',joke+"\n")
}



exports.searchJokeByTerm = (term)=>{

    //sends a request to the joke api for a joke term
    request(BASE_URL+ "search?term="+term ,{json:true}, (err, res, body)=>{
        let noOfJokes = body.total_jokes
        if(noOfJokes>0)
        {
            
            index =Math.floor(Math.random()*(noOfJokes))
            const joke = (body.results[index].joke)
            console.log(joke)
            writeToFile(joke)
        }
        else
        {
            console.log("Dear customer, unfortunately we could not find any jokes for your each term")
        }
    })
}



exports.findTopJoke = ()=>
{
    //finds the joke with the highest frequency
    let map = new Map()
    content = fs.readFileSync('./jokes.txt', 'utf8')
    allJokes = content.split("\n")
    allJokes.forEach(element => {
        if(!map.has(element))
        {
            map.set(element,0)
        }
        map.set(element,map.get(element)+1)
    });

    let max = allJokes[0]
    map.forEach((value,key)=>{
        if(value>map.get(max))
        {
            max = key
        }
    })
    console.log(`The joke with highest frequency is \"${max}\"`)
}

