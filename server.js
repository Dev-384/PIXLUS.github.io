console.clear();

// The localhost port the web page will be on
// Example: http://localhost:3000/
const port = require("./package.json").port;


// These are only for customizing the text colour in the terminal
const style = {
	clear: "\x1b[0m",
	red: "\x1b[31m",
	yellow: "\x1b[33m"
}

// This is Express JS
const express = require("express");

// This is for saving files
const fs = require("fs");
const { exec } = require("child_process");

// My own components
const stylized = require("./server/stylized.js");
const gameOptions = require("./options/index.json");

// Declare a new server
const ServerApp = express();

// When there is a request for a file at path "*", return that file, relative to THIS file
ServerApp.get("*", (req, res) => {
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
var server = ServerApp.listen(port, () => {

	stylized.log({
		title: "PIXLUS",
		value: `V${require("./package.json").version}`,
		style: stylized.background.Green + stylized.text.Black
	});
	
	stylized.log({
		title: "Server Online",
		value: `Veiw the server at: (http://localhost:${port}/)`,
		style: stylized.background.Cyan + stylized.text.Black
	});

	stylized.log({
		title: "  !Warning!  ",
		value: `Closing this terminal will end the server`,
		style: stylized.background.Red + stylized.text.Black
	});

	let start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
	if(gameOptions.advanced.OpenGameOnStart == true) require('child_process').exec(`${start} http://localhost:${port}`);

	exec("npm run app")
});

server.on("request", (e) => {
	// server.log({
	// 	title: "Server Report",
	// 	value: `The server has been connected to`
	// });
});

server.on("error", () => {
	console.log("Serverside Error");
});

server.on("clientError", () => {
	console.log("Clientside Error");
});