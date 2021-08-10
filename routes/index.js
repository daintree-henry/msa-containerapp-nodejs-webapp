var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function (req, res) {
    let data = new Object()
    const itemurl = "http://"+process.env.ItemURL+"/api/items"
    const empurl = "http://"+process.env.EmpURL+"/api/employees"
    console.log(itemurl)
    
    request({uri: itemurl, method: "GET", timeout: 5000}, function (error, response, body) {
        if (!error && response.statusCode < 300) {
            data.items = JSON.parse(body)
        }else{
            data.items = "Server Error"
        }
        request({uri: empurl, method: "GET", timeout: 5000}, function (error, response, body) {
            if (!error && response.statusCode < 300) {
                data.emps = JSON.parse(body)
                res.render('index', {data})
            }else{
                data.emps = "Server Error"
                res.render('index', {data})
            }
        });
    });
});

module.exports = router;
