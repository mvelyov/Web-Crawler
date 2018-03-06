'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "ram" on table "laptops"
 *
 **/

var info = {
    "revision": 4,
    "name": "changed-ram-type-from-string-to-number",
    "created": "2018-03-06T11:39:24.398Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "laptops",
        "ram",
        {
            "type": Sequelize.INTEGER,
            "allowNull": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
