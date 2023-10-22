import { innerScreen } from "./main.js";

const assetDIV = document.getElementById("assets");

const ErrorImage = document.createElement("img");
ErrorImage.src = "../../code/assets/img_not_found.png";
assetDIV.appendChild(ErrorImage);

export function loadAssets(){
	if(document.querySelectorAll("div#assets").length == 0){
		let assetDIV = document.createElement("div");
		assetDIV.setAttribute("style", "display:none;");
		assetDIV.setAttribute("id", "assets");
		document.body.appendChild(assetDIV);
	}
}

export function image(
	imgSource="",

	DestinationXPos=0, DestinationYPos=0,
	DestinationWidth=0, DestinationHeight=0,

	CropXPos=0, CropYPos=0,
	CropWidth=16, CropHeight=16,
	
	filters={
		alpha: 1,
		brightness: 1
	}
){

	let context = innerScreen.getContext("2d");
	context.globalAlpha = 1;
	context.globalAlpha = filters?.alpha;

	try {
		context.drawImage(
			CacheImage(imgSource),
			CropXPos, CropYPos, CropWidth, CropHeight,
			DestinationXPos, DestinationYPos, DestinationWidth, DestinationHeight,
		);
	}catch {
		context.drawImage(
			ErrorImage,
			0, 0, ErrorImage.width, ErrorImage.height,
			DestinationXPos, DestinationYPos, DestinationWidth, DestinationHeight,
		);
	}
	context.globalAlpha = 1;
}

function CacheImage(imgSource=""){
	let loadedImage = document.querySelector(`div#assets>img[src="${imgSource}"]`);
	if(loadedImage == null){
		let newlyLoadedImage = document.createElement("img");
		newlyLoadedImage.src = imgSource;
		assetDIV.appendChild(newlyLoadedImage);
		return(newlyLoadedImage);
	}else{
		return(loadedImage);
	}
}