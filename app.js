

const prompt = require('prompt-sync')({sigint: true});
const cheerio = require('cheerio');
const fetch = require("node-fetch");


//Get user input for URL
let url = prompt('Enter a url: ');

//Update url to include 'www.' if not already included
if (url.indexOf('www.') < 0) {
  if (url.indexOf('http') < 0) {
    url = "www." + url;
  } else {
    let index = url.indexOf('http:')
    url = url.substring(0, 8) + 'www.' + url.substring(8)
  }
}

//Update url to include 'https://' if not already included
if (url.indexOf('http') < 0) {
  url = "https://" + url;
}

console.log(url)

let counter = 1;

fetch(url)
    .then(function (response) {
        return response.text();
    })
    .then(function (html) {
        // Load the HTML in Cheerio
        const $ = cheerio.load(html);

        // Select all anchor tags from the page
        const links = $("a")

        // Loop over all the anchor tags
        links.each((index, value) => {
            // Find value of href
            let href = $(value).attr("href");

            //Find index of url beginning with 'http' within the href
            let beginURL = href.indexOf('http')

            //Log out the url
            if (beginURL === 0) {
              console.log(counter + '. ' + href + '\n')
            }else if (beginURL > 0) {
              console.log(counter + '. ' + href.substring(beginURL)  + '\n')
            } else {
              var split1 = url.split('//')[1];   // Get the string except the protocol.
              var split2 = split1.split('/')[0]; // Get the domain URL
              console.log(counter + '. ' + 'http://' + split2 + href+ '\n')

            }
            counter++;
        })
    })
    .catch(function (err) {
        console.log('Failed to fetch page: ', err);
    });

