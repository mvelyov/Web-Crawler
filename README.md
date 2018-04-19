# Web-Crawler Project

Node.js and databases Teamwork assignment

Create a web crawler gathering and aggregating information from at least two different web sites.

The crawler should support the following operations: 

•	npm run update (Gathers the information and stores it in MariaDB/MySQL instance)

•	npm run statistics COMMAND:params (At least 3 commands for information aggregation) 


Example --->

Order by price

npm run statistics order-by-price 

o	Filter by RAM, screen size, or OS

npm run statistics filter:ram:gt:4GB

npm run statistics filter:screen-suze:lt:5

o	Search for a specific requirement

i.e. 4G, gorilla glass, etc...

npm run statistics search:4g

npm run statistics search:gorilla




Technical Requirements --->

•	No UI required, only CLI interface

•	Parse HTML pages, DO NOT use APIs

•	Use as much ES2015 as possible

–	async-await, promises, generators (if possible), etc..

•	Zero ESLint errors/warnings

–	Use the .eslintrc file from demos

•	Use MariaDB as data storage

–	With schemas, fulfulling the good practices

•	Use Sequelize ORM

•	Do not use loop constructs

–	for(var i = 0; …. ), for(const el of …), for(const key in …)

–	while(….)


