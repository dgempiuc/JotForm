var fileSys = require('fs');

export let posts = [];
// split line by line
var lines = fileSys.readFileSync('posts.txt').toString().split("\r\n");
var line;
// assign them "posts" object.
for(line in lines)
	posts.push(lines[line]);