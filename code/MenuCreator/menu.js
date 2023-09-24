import Element from "./elements.js";

export class Menu {
	constructor(){
		this.elements = [];
	}

	addElement(element){
		this.elements.push(element);
	}

	async render(){
		for(let i = 0; i < this.elements.length; i++){
			if("render" in this.elements[i]){
				this.elements[i].render();
			}else{
				console.error("Failed to render unknown element");
			}
		}
	}
}

export const Elements = Element;