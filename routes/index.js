var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function (req, res) {
    let data = new Object()
    const itemurl = "http://"+process.env.ItemURL+"/api/items"
    const empurl = "http://"+process.env.EmpURL+"/api/employees"
    console.log(itemurl)
    
    request(itemurl, function (error, response, body) {
        if (!error && response.statusCode < 300) {
            data.items = JSON.parse(body)
        }else{
            data.items = "Server Error"
        }
        request(empurl, function (error, response, body) {
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
