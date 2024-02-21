// Simple method that returns a random emoji from list
function getRandomEmoji() {
  const emojiList = [
    "😭",
    "😄",
    "😌",
    "🤓",
    "😎",
    "😤",
    "🤖",
    "😶‍🌫️",
    "🌏",
    "📸",
    "💿",
    "👋",
    "🌊",
    "✨",
  ];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function keywordFromAnswer(answer) {
answer=answer.toLowerCase();
console.log("[info] 1. KeyWordToAnswer:"+answer);
  
var match = answer.match(/\b\w{3,}\b/);
console.log("[info] 2. KeyWordToAnswer:"+match);
//mindestens 3 Buchstaben lange wörter..
const banned_words3 = ["your", "the", "you", "are", "and", "but", "not", "that", "with", "from", "have", "this", "was", "like","isnt", "arent" ,"wasnt", "were", "where", "when", "what", "why", "who", "what", "how", "which", "when"];

var wordsList=new Array();
banned_words3.forEach(function(word) {
  if (match!=word) {
    wordsList.push(match);
 }
  else {
  
  }
 });
console.log('[info] 2. KeyWordToAnswer:'+wordsList);
if (wordsList.length>0) {
  wordsList.reverse();
  return wordsList[0];
}
  else{ 
    return wordsList[0];
  }
}
module.exports={
  capitalize,keywordFromAnswer,getRandomEmoji
}
