import UI_file from "../assets/UI/ui.json" assert {type: "json"};
const fonts = UI_file.fonts;

export const speed = 1000;

let URL = window.location.href;
let Path = URL.split("/");
Path.shift(); // Remove HTTP
Path.shift(); // Remove ""
Path.shift(); // Remove LOCALHOST

reloadTexts();

export default async function reloadTexts(){
	let headers = document.getElementsByTagName("h1");
	let paragraph = document.getElementsByTagName("p");

	for(let index = 0; index < headers.length; index++){
		await replaceText(headers[index]);
	}
	for(let index = 0; index < paragraph.length; index++){
		await replaceText(paragraph[index]);
	}
}

async function replaceText(element=HTMLElement){
	let text = element.innerText.toLowerCase();
	element.innerHTML = "";
	while(text.includes(`"`)){
		text = text.replace(`"`, "«");
		text = text.replace(`"`, "»");
	}
	let lengthOfText = text.length;

	for(let i = 0; i < lengthOfText; i++){
		let currentDelay = (speed / lengthOfText) * i;
		let currentLetter = text[i];

		let source = fonts.icons[" "].img.source;;
		if(currentLetter in fonts.letters){
			source = fonts.letters[currentLetter].img.source;
		}else if(currentLetter in fonts.numbers){
			source = fonts.numbers[currentLetter].img.source;
		}else if(currentLetter in fonts.icons){
			source = fonts.icons[currentLetter].img.source;
		}else if(currentLetter == "\n"){
			let lineBreak = document.createElement("br");
			element.appendChild(lineBreak);
			continue;
		}else if(currentLetter == "\t"){
			continue;
		}else{
			console.error(`Unknown character "${currentLetter}"\n\tCharacter "${currentLetter}" does not exist inside font JSON`, "../".repeat(Path.length-1)+"code/assets/UI/ui.json");
		}
		
		let letterElement = document.createElement("img");
		letterElement.id = "web_fonts_letter";
		letterElement.setAttribute("src", `${"../".repeat(Path.length)}code/assets/UI/images/fonts/${source}`);
		if(element.getAttribute("class")?.includes("title")){
			letterElement.setAttribute("style", `transform-origin: center center; opacity: 0; animation: letter-in 0.4s linear forwards;animation-delay: ${currentDelay}ms;`);
			setTimeout(() => {
				letterElement.removeAttribute("style");
			}, currentDelay + 400)
		}
		element.appendChild(letterElement);
	}
}

window.addEventListener("keydown", (e) => {
    if(e.ctrlKey){
		let key = e.key.toLowerCase();
		if (key == "f") { 
			e.preventDefault();
		}
		if(key == "p"){
			e.preventDefault();
		}
	}
});