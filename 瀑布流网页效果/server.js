var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var MT = {
    txt: "text/plain",
		css: "text/css",
		js: "application/x-javascript",
		html: "text/html",
		json: "text/plain",
		svg: "image/svg+xml"
}

var server = http.createServer(function(req, res) {
	var url_obj = url.parse(req.url, true);
	var query = url_obj.query;
	var pathName = url_obj.pathname;
	var method = req.method.toLowerCase();


	fs.readFile("." + pathName, function(err, data) {
		if (err) {
			res.setHeader("content-type", "text/plain;charset=utf-8");
	    res.end("�望�xxxxxxx")
			return;
		}
		var extName = pathName.split(".").pop();
		res.setHeader("content-type", MT[extName] + ";charset=utf-8");
		res.end(data);
	})
})

server.listen(3000);