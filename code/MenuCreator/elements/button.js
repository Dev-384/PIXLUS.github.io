import { KeyPressed, MousePositions, cancleKeyPress, keysPressed } from "../../play/behind/keyboard.js";
import { innerScreen } from "../../play/main.js";

export default class Button {
	constructor(){
		this.isClicked = false;
		this.onclick = () => {};
		this.onhover = () => {};
		this.style = {
			size: 0,

			width: 100,
			height: 100,

			outlineSize: 1,
			insetSize: 1,

			position: {
				X: 0,
				Y: 0
			}
		};
	}
	setSize(width=100, height=100){
		this.style.width = width;
		this.style.height = height;
	}
	setOutlineSize(size=16){
		this.style.outlineSize = size;
	}
	setClickEvent(callback=()=>{alert("Button has been clicked!")}){
		this.onclick = callback;
	}
	setEvent(event="", callback=()=>{alert("Button has been clicked!")}){
		this["on"+event] = callback;
	}
	moveTo(X=0, Y=0){
		this.style.position.X = X;
		this.style.position.Y = Y;
	}
	render(){
		let context = innerScreen.getContext("2d");

		context.fillStyle = "#333333";
		context.fillRect(this.style.position.X - this.style.outlineSize, this.style.position.Y, this.style.width + this.style.outlineSize * 2, this.style.height);
		context.fillRect(this.style.position.X, this.style.position.Y - this.style.outlineSize, this.style.width, this.style.height + this.style.outlineSize * 2);

		if(
			MousePositions.X >= this.style.position.X &&
			MousePositions.Y >= this.style.position.Y &&
			MousePositions.X <= this.style.position.X + this.style.width &&
			MousePositions.Y <= this.style.position.Y + this.style.height
		){

			context.fillStyle = "#f2f2f0";
			context.fillRect(this.style.position.X, this.style.position.Y, this.style.width, this.style.height);

			this?.onhover();

			if(KeyPressed("MouseClick")){
				cancleKeyPress("mouseclick");
				this?.onclick();
			}
		}else{
			context.fillStyle = "#7a8ba1";
			context.fillRect(this.style.position.X, this.style.position.Y, this.style.width, this.style.height);
		}
		context.fillStyle = "#00000080";
		context.fillRect(this.style.position.X, this.style.position.Y + this.style.height - this.style.insetSize, this.style.width, this.style.insetSize);
		context.fillRect(this.style.position.X + this.style.width - this.style.insetSize, this.style.position.Y, this.style.insetSize, this.style.height);
	}
}

Array.prototype.removeAll = (item) => {
	let NewArray = Array.prototype.filter(function(x) {
		return x !== item;
	});
	return(NewArray);
}