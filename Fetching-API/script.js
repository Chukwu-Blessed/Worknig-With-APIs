'use strict'
// This is the root url for the Rest API
const baseUrl = "https://hacker-news.firebaseio.com/v0";
// This url makes sure the result is returned in JSON
const newStoriesUrl = `${baseUrl}/topstories.json`;
// This url makes can be modified to get a particular new
const itemUrl = `${baseUrl}/item/`;

// This is a config object for the fetch function
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};


// HTML container to which to append the resulting fetched API
const firstComment = document.querySelector('.comment');

const getComment = function () {
  fetch(itemUrl + "32494485" + ".json", options)
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    const html = `
    <h1>${data.title}</h1>
    <h2>${data.by}</h2>
    <h3>${data.type}</h3>
    <a target="_blank" href="${data.url}">Nocturnal bottleneck</a>
  `

  firstComment.insertAdjacentHTML('afterend', html);
  })
  .catch((err) => console.error(err));
}
getComment();



const topStories = document.querySelector('.top_stories')
// function to gettop stories : not really needed, can be removed
const getTopStories = function () {
  // fetches Api
  fetch(newStoriesUrl, options)
  .then(response => response.json())
  .then(data => {
    // looping through the returned data from the consumed promise
    for(let i = 0; i < 50; i++) {
      let id = data[i];
      fetch(itemUrl + id + ".json", options)
      .then((response) => response.json())
      .then((newData) => {
        console.log(newData);
        const html = `
        <h1>${newData.title}</h1>
        <h2>${newData.by}</h2>
        <h3>${newData.type}</h3>
        <a target="_blank" href="${newData.url}">Click to read ${newData.id}</a>
      `
    
      topStories.insertAdjacentHTML('afterend', html);
      })
      .catch((err) => console.error(err));
    }
  })
}
getTopStories();



// Assignment
/*
Make an app that goes to 
https://catfact.ninja/fact
Let the fetch function go to the API every 5 seconds, get a fact and append it to h1 tag on the html
*/ 

// HTML container to which to append the resulting fetched API
const answer = document.querySelector('.assignment');

// Setinterval timer fetches new quotes every 5seconds and stores the value into the fiveSecInterval variable
const fiveSecInterval = setInterval(() => {
  // fetches new cat quotes from the given URL: returns a promise
  fetch('https://catfact.ninja/fact', options)
  // consumes the first promise and converts the data to a JSON file: also returns a promise
  .then((data) => data.json())
  // consumes the promise from the above then method
  .then((data) => {
    // console.log(data);

    // Html elements to be appended into the HTML File
    const html = `
    <h1>${data.fact}</h1>
  `
  // Appending the HTML tags to the HTML file
  answer.insertAdjacentHTML('afterend', html);
  })

  // catches any errors resulting from the fetch method
  .catch((err) => console.error(err));
}, 5000);
// clearInterval(fiveSecInterval);