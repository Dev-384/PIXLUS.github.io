console.clear();

// The localhost port the web page will be on
// Example: http://localhost:300/
const port = 3000;


// These are only for customizing the text colour in the terminal
const style = {
	clear: "\x1b[0m",
	red: "\x1b[31m",
	yellow: "\x1b[33m"
}

// This is Express JS
const express = require("express");

// This is for saving files
const fs = require("fs")

// This is to styleize the console logs
const stylized = require("./server/stylized");

// Declare a new application
const app = express();

// When there is a request for a file at path "*", return that file, relative to THIS file
app.get("*", (req, res) => {
	let url = req.originalUrl;

	// SAVE FILE URL
	// localhost:3000/server.write?path="code/path/to/file"&content="hello world!"

	if(url.includes("server.") == false){
		res.sendFile(__dirname + url);
	}else{
		let queryString = "?" + url.split("?")[1];
		let urlParams = new URLSearchParams(queryString);

		let path = "./" + urlParams.get("path");
		let content = ( urlParams.get("content") || "" )
			.replaceAll("\\n", "\n")
			.replaceAll("\\t", "\t");

		if( url.includes("server.write") ){

			fs.writeFileSync(path, content);

			res.send({
				path: path,
				content: content
			});
		}else if( url.includes("server.read") ){
			res.send({
				path: "PATH",
				content: (fs.existsSync(path)) ? fs.readFileSync(path, "utf-8") : ""
			});
		}
	}
});

// Launching the server, with the port number ${port}
var server = app.listen(port, () => {

	stylized.tabs([
		"PIXLUS",
		`V${require("./package.json").version}`,
		"Server Hosting"
	]);


	stylized.log({
		title: "Server Online",
		value: `Server is running on port (${port})            `,
		style: stylized.text.Black+stylized.background.Green
	});
	stylized.log({
		title: "Server Online",
		value: `Veiw the server at: (http://localhost:${port}/)`,
		style: stylized.text.Black+stylized.background.Green
	});
	stylized.log({
		title: "  !Warning!  ",
		value: `Closing this terminal will end the server   `,
		style: stylized.text.Black+stylized.background.Red
	});
});

server.on("request", (e) => {
	// server.log({
	// 	title: "Server Report",
	// 	value: `The server has been connected to`
	// });
});