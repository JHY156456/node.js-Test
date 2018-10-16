// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/m09.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);
/*
// print (to the console) names of thesis students
$('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody>tr>td').each(function(i, elem) {
    if(i==0||i==3||i==6||i==9)
    console.log(i+"번쨰 Address/Location : "+$(elem).text());
});

*/
// write the project titles to a text file
var thesisTitles = ''; // this variable will hold the lines of text

var flag = 1;
$('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody>tr>td').each(function(i, elem) {
    if (i == 0 || i == 3 || i == 6 || i == 9) {
        thesisTitles += flag + "번째 주소 : " + ($(elem).text()) + '\n';
        flag++;
    }
});
var hours = '';
$('body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody>tr>td').each(function(i, elem) {
    if (i == 1 || i == 4 || i == 7 || i == 10) {
        hours += flag + "번째 주소 : " + ($(elem).text()) + '\n';
        flag++;
    }
});
var address1 = new Object();
var address2 = new Object();
var address3 = [];
var address4 = [];


var Split = thesisTitles.split(/\r\n|\r|\n/);
var realaddress1 = Split[3].split(',')[0].replace(/^\s*|\s*$/g, '');
var realaddress2 = Split[21].split(',')[0].replace(/^\s*|\s*$/g, '');
var realaddress3 = Split[39].split(',')[0].replace(/^\s*|\s*$/g, '');
var realaddress4 = Split[57].split(',')[0].replace(/^\s*|\s*$/g, '');
address1.location = realaddress1;
address2.location = realaddress2;

var splitHours = hours.split(/\r\n|\r|\n/);

var hello = splitHours[2].replace(/^\s*|\s*$/g, '').split(" ");

address1.day = hello[0];
address1.time = hello[3];
address1.types = hello[12];


var hello = splitHours[9].replace(/^\s*|\s*$/g, '').split(" ");
address2.day = hello[0];
address2.time = hello[3];
address2.types = hello[12];

for (var i = 1; i <= 9; i++) {
    var hihi;
    var goaddress3 = new Object();
    if (i == 8 || i == 9) {
        hihi = splitHours[((i + 3) * 4) + 3].replace(/^\s*|\s*$/g, '').split(" ");
        goaddress3.location = Split[57].split(',')[0].replace(/^\s*|\s*$/g, '');
    }
    else {
        hihi = splitHours[(i + 3) * 4].replace(/^\s*|\s*$/g, '').split(" ");
        goaddress3.location = Split[39].split(',')[0].replace(/^\s*|\s*$/g, '');
    }
    goaddress3.day = hihi[0];
    goaddress3.time = hihi[3];
    if (hihi[10] == "B") {
        goaddress3.type = "Beginners,Wheelchair";
    }
    else if (hihi[10] == "OD") {
        goaddress3.type = "Open,Discussion,Wheelchair";
    }
    else if (hihi[10] == "C") {
        goaddress3.type = "Closed,Wheelchair";
    }
    else if (hihi[10] == "T") {
        goaddress3.type = "Tradition,Wheelchair";
    }
    if (i == 8 || i == 9) {
        address4.push(goaddress3)
    }
    else {
        address3.push(goaddress3);
    }

}
console.log(address1);
console.log(address2);
console.log(address3);
console.log(address4);
/*
var apiKey = "885ee0b1d97e4ce6b045614289a62613"; 

var meetingsData = [];
var addresses = [realaddress1,realaddress2,realaddress3,realaddress4];
var wantData = [];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            console.log(tamuGeo['FeatureMatchingResultType']);
            meetingsData.push(tamuGeo);
        }
    });
    setTimeout(callback, 3000);
}, function() {
    fs.writeFileSync('first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});*/