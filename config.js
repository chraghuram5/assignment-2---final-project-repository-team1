const dotenv = require('dotenv');
const path = require('path');
var CryptoJS = require("crypto-js");

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

var bytes  = CryptoJS.AES.decrypt(process.env.apiKey, 'one-news-app');
var apiKey = bytes.toString(CryptoJS.enc.Utf8);

console.log(process.env.NODE_ENV);

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV : process.env.NODE_ENV || 'development',
    apiKey : apiKey || '459f6dffd625423485f6ba2c77bea075',
    dbFileName : process.env.dbFileName || 'test.sqlite'
}