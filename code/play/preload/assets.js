import { innerScreen } from "../main.js";

export function loadAssets(){
	if(document.querySelectorAll("div#assets").length == 0){
		let assetDIV = document.createElement("div");
		assetDIV.setAttribute("style", "display:none;");
		assetDIV.setAttribute("id", "assets");
		document.body.appendChild(assetDIV);
	}
}

export async function image(img="",
DestinationXPos=0, DestinationYPos=0, DestinationWidth=0, DestinationHeight=0,
SourceXPos=0, SourceYPos=0, SourceWidth=16, SourceHeight=16, filters={
	alpha: 1,
	brightness: 1
}){

	let context = innerScreen.getContext("2d");
	context.globalAlpha = 1;
	context.globalAlpha = filters?.alpha;
	context.filter = `brightness(${ ( (filters?.brightness || 0) * 100) }%)`;
	context.drawImage(
		CacheImage(img),
		SourceXPos, SourceYPos, SourceWidth, SourceHeight,
		DestinationXPos, DestinationYPos, DestinationWidth, DestinationHeight,
	);
	context.globalAlpha = 1;
}

function CacheImage(img=""){
	let imageIsLoaded = document.querySelector(`div#assets>img[src="${img}"]`);
	if(imageIsLoaded == null){
		let assetDIV = document.getElementById("assets");
		let loadingImage = document.createElement("img");
		loadingImage.src = img;
		assetDIV.appendChild(loadingImage);
		return(loadingImage);
	}else{
		return(imageIsLoaded);
	}
}