import letters from "./letters.js";
import numbers from "./numbers.js";
import icons from "./icons.js";

export default function(assetDIV=HTMLDivElement){
	letters(assetDIV);
	numbers(assetDIV);
	icons(assetDIV);
};