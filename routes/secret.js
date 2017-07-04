/**
 * Created by ERMIAS on 7/4/2017.
 */

var express = require('express');
var router = express.Router();
var mongo =require('mongoskin');
var crypto = require('crypto');

    var algorithm = 'aes256';
    var password = 'asaadsaad';
    var secret = null;



var  encrypt = function(req, res, next) {


        var db = mongo.db("mongodb://localhost:27017/W2D1",{native_parser:true});
        db.bind('HOMEWORK7');
        db.HOMEWORK7.findOne({},function(err, doc){
            console.dir(doc.message);
            if(err) console.log(err);
            else{
                var decipher = crypto.createDecipher(algorithm, password);

                var decrypted = decipher.update(doc.message, 'hex', 'utf8') + decipher.final('utf8');

                secret = decrypted;

            }
        });

            db.close();

        res.render('secret',{secret:secret});

        }


/* GET users listing. */
router.get('/', encrypt);


module.exports = router;

