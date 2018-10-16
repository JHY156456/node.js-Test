const { Client } = require('pg');
var fs = require('fs');
var async = require("async");


var db_credentials = new Object();
db_credentials.user = 'gusdud0222';
db_credentials.host = 'gusdud0222.c51cwg6egxtj.ap-southeast-1.rds.amazonaws.com';
db_credentials.database = 'gusdud0222';
db_credentials.password = 'vmflsxj1';
db_credentials.port = 5432;


const client = new Client(db_credentials);
client.connect();



var addressesForDb = []
var content = fs.readFileSync('first.json');
var parsedJSON = JSON.parse(content);

for (var i = 0; i < 4; i++) {
    var address = parsedJSON[i].InputAddress.StreetAddress
    var real = new Object();
    real.address = address;
    real.latLong = { lat: parsedJSON[i].OutputGeocodes[0].OutputGeocode.Latitude, lng: parsedJSON[i].OutputGeocodes[0].OutputGeocode.Latitude }
    addressesForDb[i] = real;
}

var thisQuery;


//테이블생성  : 처음에 해야할일
/*
thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
*/

//테이블에 값 넣기 : 2번째 해야할일 ( 테이블을 생성후에 값들을 넣어야함 예를들면 한글에서 표를 만들고 그안에 글을쓰는것)
/*
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
});
*/

//값이 제대로 들어갔는지 확인하기
/*
thisQuery = "SELECT * FROM aalocations;";
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
*/

//테이블 삭제
/*
thisQuery = "DROP TABLE aalocations;"; 
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
*/