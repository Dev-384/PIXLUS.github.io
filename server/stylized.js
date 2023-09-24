module.exports = {

	reset: "\x1b[0m",

	text: {
		Black: "\x1b[30m",
		Red: "\x1b[31m",
		Green: "\x1b[32m",
		Yellow: "\x1b[33m",
		Blue: "\x1b[34m",
		Magenta: "\x1b[35m",
		Cyan: "\x1b[36m",
		White: "\x1b[37m",
		Gray: "\x1b[90m"
	},
	background: {
		Black: "\x1b[40m",
		Red: "\x1b[41m",
		Green: "\x1b[42m",
		Yellow: "\x1b[43m",
		Blue: "\x1b[44m",
		Magenta: "\x1b[45m",
		Cyan: "\x1b[46m",
		White: "\x1b[47m",
		Gray: "\x1b[100m"
	},

	tabs: (tabs=[""], style="") => {

		let styles = require("./stylized");
	
		style = style || styles.background.Cyan+styles.text.Black;
		style = style.replaceAll(" ", "");

		let terminalWidth = process.stdout.columns;

		let line1 = `╭─`;
		let line2 = `│ `;
		let line3 = `╰─`;
		
		for(let i = 0; i < tabs.length; i++){
			let currentTab = tabs[i];
			line1 += "─".repeat(currentTab.length);
			line2 += currentTab;
			line3 += "─".repeat(currentTab.length);
			if(i !== tabs.length - 1){
				line1 += "─┬─";
				line2 += " │ ";
				line3 += "─┴─";
			}
		}
		line1 += "─╮";
		line2 += " │";
		line3 += "─╯";

		let repeatSpace = Math.max( terminalWidth - line1.length - 1, 0 );
		
		console.log(style + line1 + " ".repeat(repeatSpace) );
		console.log(style + line2 + " ".repeat(repeatSpace) );
		console.log(style + line3 + " ".repeat(repeatSpace) + "\x1b[0m");
	},

	log: (content = {title:"",value:"",style:""}) => {
		
		let styles = require("./stylized");
		styles.tabs([
			content.title,
			content.value
		], content.style);
	}
}