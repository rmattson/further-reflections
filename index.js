/*
Further reflections, a crude approximation of the theme of the poem
Further Reflections on Parsley by Ogden Nash. Doesn't capture the
interesting change of vowel that Nash does to the adjective to match
the sound of parsley. Maybe that will come in a future version.
*/

const rita = require('rita')
const Twit = require('twit')
const T = new Twit(require('./config.js'))

function generate () {
  let noun = ''
  let adjective = ''
  while (!rita.isRhyme(noun, adjective)) {
    noun = rita.randomWord('nn')
    // Adjective POS: jj
    // Adjective, comparative: jjr
    // Adjective, superlative: jjs
    adjective = rita.randomWord('jj')
  }
  return `${capitalize(noun)} is ${adjective}`
}

function sendTweet () {
  T.post('statuses/update', { status: generate() }, function (err, data, response) {
    if (err !== undefined || err !== null) {
      throw (err)
    }
    console.log(data)
  })
}

function capitalize (word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

console.log(sendTweet())
