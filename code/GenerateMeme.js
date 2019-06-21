// The blankUrl ends in _.jpg.
const blankUrlEnding = /_.jpg$/;

module.exports.function = function generateMeme (memeTemplate, line1, line2) {
  let url = memeTemplate.blankUrl.replace(blankUrlEnding, '');
  
  url += formatForUrl(line1);
  url += '/';
  
  url += formatForUrl(line2);
  url += '.jpg';
  
  return {
    memeTemplate: memeTemplate,
    line1: stringIsEmpty(line1) ? null : line1,
    line2: stringIsEmpty(line2) ? null : line2,
    pageResultUrl: url + '?share=true',
    imageResultUrl: url.replace(/'/g, '%27')  // Internal issue: UI-2941, layouts don't like single quotes.
  }
}

// For the URL, underscore (_) is a blank line in the generated meme image.
function formatForUrl(input) {
  if (stringIsEmpty(input)) {
    return '_';
  } else {
    return encodeURIComponent(input);
  }
}

function stringIsEmpty(input) {
  return input.trim() == '';
}