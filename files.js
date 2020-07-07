const express = require('express');
const router = express.Router();

router.get('/getTLCDataRecords', (req, res, next) => {
    const csv=require('csvtojson');
    const converter=csv()
    .fromFile('./list.csv')
    .then((json)=>{
        console.log(json);
        res.json({success: true, data: json});
    })
});

module.exports = router;