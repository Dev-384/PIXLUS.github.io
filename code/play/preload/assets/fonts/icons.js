import text from "../../../../assets/UI/ui.json" assert {type: "json"};

export default function(assetDIV=HTMLDivElement){

	let fontIcons = text.fonts.icons;

	let fontLetterAssets = document.createElement("div");
	fontLetterAssets.setAttribute("id", "font-icons");
	assetDIV.appendChild(fontLetterAssets);

	saveImage("../../code/assets/PIXLUS-logo-small.png", fontLetterAssets);
	saveImage("../../code/assets/PIXLUS-logo-large.png", fontLetterAssets);

	for(let i = 0; i < Object.keys(fontIcons).length; i++){
		let imageData = fontIcons[Object.keys(fontIcons)[i]].img;

		saveImage(`../../code/assets/UI/images/fonts/${imageData.source}`, fontLetterAssets);

	}

}

function saveImage(source="", div=HTMLDivElement){
	let imageElement = document.createElement("img");
	imageElement.setAttribute("src", source);
	div.appendChild(imageElement);
}