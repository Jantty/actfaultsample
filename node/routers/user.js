var express = require('express');
var pg = require('pg');
var router = express.Router();
var pgConfig = "postgres://postgres:123456@localhost:5432/activefault";

//获取用户信息接口
router.get('/get', function (req, res) {
    var client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('select * from "user" where name = $1', ['jantty'], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
                res.send({
                    status: 'fail',
                    msg: 'query error'
                })
            } else {
                console.log('query success, data is: ' + rst);
                // console.log(JSON.parse(JSON.stringify(rst)));
                res.send({
                    status: 'success',
                    data: rst.rows
                })
            }
            client.end();
        })
    })
});

//用户注册接口
router.post('/insert', function (req, res) {
    var client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('INSERT INTO "user" (name, password, phone, email) VALUES ($1, $2, $3, $4);',
            ['tst02', 'webgis', null, null], function (isErr, rst) {
                if (isErr) {
                    // console.log('query error:' + isErr.message);
                    res.send({
                        status: 'fail',
                        msg: 'insert error'
                    })
                } else {
                    console.log('insert success, data is: ' + rst);
                    // console.log(JSON.parse(JSON.stringify(rst)));
                    res.send({
                        status: 'success',
                        data: []
                    })
                }
                client.end();
            })
    })
});

module.exports = router;