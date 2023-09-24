import { text } from "../../play/ui/fonts.js";

export default class Text {
	constructor(){
		this.text = "";
		this.style = {
			size: 16,

			position: {
				X: 0,
				Y: 0
			}
		};
	}
	setContent(text){
		this.text = text;
	}
	setSize(size=0){
		this.style.size = Math.max(size, 16);
	}
	moveTo(X=0, Y=0){
		this.style.position.X = X;
		this.style.position.Y = Y;
	}
	render(){
		text(this.text, this.style.position.X + this.style.size / 2, this.style.position.Y + this.style.size / 2, this.style.size);
	}
}