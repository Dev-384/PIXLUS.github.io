import text from "../../../../assets/UI/ui.json" assert {type: "json"};

export default function(assetDIV=HTMLDivElement){

	let fontIcons = text.fonts.icons;

	let fontLetterAssets = document.createElement("div");
	fontLetterAssets.setAttribute("id", "font-icons");
	assetDIV.appendChild(fontLetterAssets);

	for(let i = 0; i < Object.keys(fontIcons).length; i++){
		let imageData = fontIcons[Object.keys(fontIcons)[i]].img;

		let imageElement = document.createElement("img");
		imageElement.setAttribute("src", `../../code/assets/UI/images/fonts/${imageData.source}`);
		fontLetterAssets.appendChild(imageElement);

	}

}