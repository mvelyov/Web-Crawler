'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "operating-systems"
 * createTable "os", deps: []
 * addColumn "brandId" to table "laptops"
 * addColumn "oId" to table "laptops"
 * addColumn "websiteId" to table "laptops"
 *
 **/

var info = {
    "revision": 2,
    "name": "added-associations-from-laptop-table-to-3-tables-brand-operating-system-and-website",
    "created": "2018-03-04T09:32:31.839Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["operating-systems"]
    },
    {
        fn: "createTable",
        params: [
            "os",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "laptops",
            "brandId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "brands",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "laptops",
            "oId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "os",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "laptops",
            "websiteId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "websites",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    }
];

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
