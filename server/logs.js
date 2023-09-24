const stylized = require("./stylized");
const port = 3000;

console.clear();

stylized.tabs([
	"PIXLUS",
	`V${require("../package.json").version}`,
	"Created by Kenneth"
]);

stylized.log({
	title: "Server Online",
	value: `Server is running on port (${port})`,
	style: stylized.text.Black+stylized.background.Green
});
stylized.log({
	title: "Server Veiw Online",
	value: `Veiw the server at: (http://localhost:${port}/)`,
	style: stylized.text.Black+stylized.background.Green
});
stylized.log({
	title: "Server Warning",
	value: `Closing this terminal will close server`,
	style: stylized.text.Black+stylized.background.Red
});

stylized.tabs([
	"Hello",
	"World",
	"!"
]);