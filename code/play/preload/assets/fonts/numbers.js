import text from "../../../../assets/UI/ui.json" assert {type: "json"};

export default function(assetDIV=HTMLDivElement){

	let fontNumbers = text.fonts.numbers;

	let fontLetterAssets = document.createElement("div");
	fontLetterAssets.setAttribute("id", "font-numbers");
	assetDIV.appendChild(fontLetterAssets);

	for(let i = 0; i < Object.keys(fontNumbers).length; i++){
		let imageData = fontNumbers[Object.keys(fontNumbers)[i]].img;

		let imageElement = document.createElement("img");
		imageElement.setAttribute("src", `../../code/assets/UI/images/fonts/${imageData.source}`);
		fontLetterAssets.appendChild(imageElement);

	}

}