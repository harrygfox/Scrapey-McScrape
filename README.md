### What?
This node module scrapes WeGotTickets.com and outputs the event data in a .json file:

```json
{
  "eventTitle": "Example event",
  "eventUrl": "http://www.wegottickets.com/event/1",
  "eventId": "1",
  "city": "LONDON",
  "venue": "Hyde Park",
  "date": "Tue 27th Dec, 2016, 10:00am",
  "totalPrice": "£10.00"
}
```

### Dependencies
[Node v6.0.0](https://nodejs.org/en/blog/release/v6.0.0)

```json
"dependencies": {
  "cheerio": "^0.22.0",
  "request": "^2.79.0"
}
```

#### Request
[Request](https://github.com/request/request) is a node module that allows us to easily make a request to fetch the WeGotTickets webpages.

#### Cheerio
[Cheerio](https://github.com/cheeriojs/cheerio) is a node module that provides a jQuery-like interface to interact with a piece of HTML and allows us to easily select the required data from WeGotTickets.


### How?
Assuming you have [Node v6.0.0](https://nodejs.org/en/blog/release/v6.0.0/) or later:

Run ```npm install```

To output the first page of events from  [http://www.wegottickets.com/searchresults/all](http://www.wegottickets.com/searchresults/all), simply run ```npm run scrape```

If you want more than 1 page, just add the number of pages you would like onto the end of the npm script. E.g. to scrape 5 pages, run ```npm run scrape 5```

After these scripts are run, all the event .json data will appear in your data folder as if by magic :crystal_ball: :sparkles:

#### Tests
To run the tests, run ```npm t```
