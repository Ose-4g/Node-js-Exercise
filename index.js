

const utils = require('./utilities.js')
const prompt = require('prompt')





prompt.start()

prompt.get(['TERM'], function (err, result) 
{
    if(result.TERM.toLowerCase()==='leaderboard')
    {
        utils.findTopJoke()
    }
    else
    {
        utils.searchJokeByTerm(result.TERM)
    }
})









