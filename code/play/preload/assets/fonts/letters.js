import text from "../../../../assets/UI/ui.json" assert {type: "json"};

export default function(assetDIV=HTMLDivElement){

	let fontLetters = text.fonts.letters;

	let fontLetterAssets = document.createElement("div");
	fontLetterAssets.setAttribute("id", "font-letters");
	assetDIV.appendChild(fontLetterAssets);

	for(let i = 0; i < Object.keys(fontLetters).length; i++){

		let imageData = fontLetters[Object.keys(fontLetters)[i]].img;

		let imageElement = document.createElement("img");
		imageElement.setAttribute("src", `../../code/assets/UI/images/fonts/${imageData.source}`);
		fontLetterAssets.appendChild(imageElement);

	}

}