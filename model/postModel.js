const db = require('../database/db');

class post {
    constructor(title, body) {
        this.title    =   title,
        this.body     =   body
    }

    find() {
        let sql = `SELECT * FROM posts ORDER BY id DESC;`;
        return db.execute(sql)
    }
}

module.exports = post;