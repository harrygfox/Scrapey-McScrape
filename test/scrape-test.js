const test = require('tape');
const getEventInfo = require('../scrape').getEventInfo;
const outputEventData = require('../scrape').outputEventData;
const dummyEventHtml = require('./dummy-event-html');
const fs = require('fs');

const eventJson = {
    city: 'DERBY',
    date: 'Mon 26th Dec, 2016, 8:00pm',
    eventId: '362764',
    eventTitle: 'ARE YOU EXPERIENCED?',
    eventUrl: 'http://www.wegottickets.com/event/362764',
    totalPrice: '£11.00',
    venue: ' The Flowerpot'
}

test('scrape-test.js: getEventInfo correct scrapes the dummy html', (t) => {
  getEventInfo(dummyEventHtml, (actualEventData) => {
    t.deepEqual(actualEventData, eventJson,'the getEventInfo function correct scrapes the html');
    t.end();
  })
});

test('scrape-test.js: outputEventData outputs the correct data in the event .json file', (t) => {
  const expectedFilePath = './test/test-data/event-362764.json';

  outputEventData('test/test-data', eventJson);
  fs.readFile(expectedFilePath, 'utf8', (error, data) => {
    t.ok(!error, 'the event file appears to have been created');
    t.deepEqual(JSON.parse(data), eventJson, 'the data in the created json file is correct')
    //deletes the file after the test
    fs.unlinkSync(expectedFilePath);
    t.end();
  })
})
