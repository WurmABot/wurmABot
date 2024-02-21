// saveLearnedContent.js
const fs = require('fs').promises;

async function saveLearnedContent(learnedContent, learnedContentFile) {
    try {
        await fs.writeFile(learnedContentFile, JSON.stringify(Array.from(learnedContent)), 'utf8');
        console.log('Learned content saved to file.');
        return true;
        
    } catch (error) {
        console.error('Error saving learned content:', error);
        return false;
    }
  
}

module.exports = saveLearnedContent;
