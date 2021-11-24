let openDBConnection = require('../config/sqllite3');
const bcrypt = require('bcrypt');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();

class Source {
    constructor(source,id) {
        this.source = source;
        this.id = id;
    }
    getSource() {
        return this.source
    }
    getId() {
        return this.id;
    }
    setSource(source) {
        this.source = source;
    }
    setId(id) {
        this.id = id;
    }
}

module.exports.getAll = async function () {
    try {
        let sourceSql = `SELECT * FROM sources`;
        let sources = await db.all(sourceSql);
        return sources;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.getAllSources = async function(sourceIds){
    try {
        let selectedSources = new Array();
        for (let i = 0; i < sourceIds.length; i++) {
            let sourcesSql = "SELECT * from sources where sourceId=?";
            let source = await db.get(sourcesSql, [sourceIds[i].sourceId]);
            selectedSources.push(source.source);
        }
        return selectedSources;
    }
    catch (err) {
        console.log(err);
    }
}