import { speed } from "./web_fonts.js";

const playButton = document.getElementById("play");
const ground = document.getElementById("ground");

playButton.onclick = goToGame;
ground.onclick = () => {
	if(( window.scrollY +window.innerHeight / 2) <= window.innerHeight){
		ground.scrollIntoView({
			behavior: "smooth",
			alignToTop: true
		});
	}
}

function goToGame(){
	let playButton = document.getElementById("play");

	let title = document.getElementsByClassName("title")[0];
	let letters = title.getElementsByTagName("img");
	let ground = document.getElementById("ground");
	let content = document.getElementsByClassName("content")[0]
	for(let i = 0; i < letters.length; i++){
		let currentLetter = letters[i];
		let currentDelay = (speed / letters.length) * i;
		setTimeout(() => {
			currentLetter.setAttribute("style", `animation: letter-out 0.4s linear forwards; animation-delay: ${currentDelay}ms;`);
			// setTimeout(() => {
			// 	currentLetter.setAttribute("style", "opacity: 0;");
			// }, currentDelay + 400);
		}, 400);
	}
	document.body.setAttribute("style", "overflow: hidden;")
	playButton.setAttribute("style", "transition: opacity 400ms; opacity: 0");
	ground.setAttribute("style", "transition: opacity 400ms; opacity: 0");
	content.setAttribute("style", "transition: opacity 400ms; opacity: 0");
	setTimeout(() => {
		window.location.href = "./play/";
	}, speed + 400);
}