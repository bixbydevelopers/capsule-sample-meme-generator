var http = require('http');

const baseURL = 'https://bixby-memegen.herokuapp.com';

module.exports.function = function findMemeTemplates (searchTerm) {
  let options = {
    format: 'json',
    headers: {
      'accept': 'application/json'
    },
    cacheTime: 0
  };
  
  let response = http.getUrl(baseURL + '/api/search/', options);
  
  memeTemplates = response.map(function(item) {
    var template = item.template;
    
    return {
      name: template.name,
      descriptionUrl: template.description,
      keywords: template.keywords,
      blankUrl: template.blank,
      exampleUrl: template.example.replace(/'/g, '%27') // Internal issue: UI-2941, layouts don't like single quotes.
    }
  });

  if (searchTerm) {
    memeTemplates = memeTemplates.filter(meme => {
      let inKeywords = meme.keywords.filter(keyword => keyword.includes(searchTerm));
      let inName = meme.name.includes(searchTerm);
      return inKeywords || inName;
    });
  }
  return memeTemplates;
}
