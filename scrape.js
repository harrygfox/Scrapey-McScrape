'use strict';
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

(module.exports = () => {
  //users can pass the number of pages they want scraped via their npm scripts
  //the number of pages can be accessed by process.argv[2]
  //if no number of pages specified then default to 1
  const maxPage = Number(process.argv[2]) || 1;
  //creates a range array e.g. for 3 => [1,2,3]
  const pagesArray = Array(maxPage).fill().map((elem, i) => i + 1);

  pagesArray.forEach(pageNo => {
    const url = `http://www.wegottickets.com/searchresults/page/${pageNo}/all`;

    console.log(`Scraping ${pageNo} of ${maxPage}`);

    request(url, (error, response, html) => {
      if(!error && response.statusCode === 200){
        getEventInfo(html, (eventData) => {
          outputEventData('data', eventData);
        });
      } else {
        return error;
      }
    })

  })
})();

const getEventInfo = (html, callback) => {
  const $ = cheerio.load(html);
  $('.content.block-group.chatterbox-margin').each(function(i, elem){
    // this = elem
    const eventTitle = $(this).find('h2 .event_link').text();
    const eventUrl = $(this).find('h2 .event_link').attr('href');
    const eventId = eventUrl.split('/').pop();
    const cityAndVenueArray = $(this).find('.block.diptych.chatterbox-margin .venue-details h4').eq(0).text().split(':');
    const city = cityAndVenueArray[0];
    const venue = cityAndVenueArray[1];
    const date = $(this).find('.block.diptych.chatterbox-margin .venue-details h4').eq(1).text();
    const totalPrice = $(this).find('.block.diptych.text-right .searchResultsPrice strong').text();

    const eventDetailsObj = {
      eventTitle,
      eventUrl,
      eventId,
      city,
      venue,
      date,
      totalPrice
    }
     callback(eventDetailsObj);
  })
}

const outputEventData = (folder, eventData) => {
  fs.writeFile(`./${folder}/event-${eventData.eventId}.json`, JSON.stringify(eventData, null, 2), (error) => {
    if(error){
      console.log('error', error);
    }
  });
}

//exporting to test the functions
module.exports = { getEventInfo, outputEventData };
