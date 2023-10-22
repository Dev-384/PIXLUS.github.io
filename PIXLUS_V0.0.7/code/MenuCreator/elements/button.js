import { KeyPressed, MousePositions, cancleKeyPress } from "../../play/behind/keyboard.js";
import { innerScreen } from "../../play/main.js";

export class Button {
	constructor(){
		this.isClicked = false;
		this.onclick = () => {};
		this.onhover = () => {};
		this.style = {
			size: 0,

			width: 100,
			height: 100,

			outlineColour: "#333333",
			outlineSize: 1,
			insetColour: "#00000080",
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
	render(shiftX=0, shiftY=0){
		let context = innerScreen.getContext("2d");

		context.fillStyle = this.style.outlineColour;
		context.fillRect(
			this.style.position.X - this.style.outlineSize + shiftX,
			this.style.position.Y + shiftY,

			this.style.width + this.style.outlineSize * 2, this.style.height
		);

		context.fillRect(
			this.style.position.X + shiftX,
			this.style.position.Y - this.style.outlineSize + shiftY,
			
			this.style.width, this.style.height + this.style.outlineSize * 2
		);

		if(
			MousePositions.X >= this.style.position.X + shiftX &&
			MousePositions.Y >= this.style.position.Y + shiftY &&
			MousePositions.X <= this.style.position.X + shiftX + this.style.width &&
			MousePositions.Y <= this.style.position.Y + shiftY + this.style.height
		){

			context.fillStyle = "#f2f2f0";
			context.fillRect(
				this.style.position.X + shiftX,
				this.style.position.Y + shiftY,
				
				this.style.width, this.style.height
			);

			this?.onhover();

			if(KeyPressed("MouseClick")){
				cancleKeyPress("mouseclick");
				this?.onclick();
			}
		}else{
			context.fillStyle = "#7a8ba1";
			context.fillRect(
				this.style.position.X + shiftX,
				this.style.position.Y + shiftY,
				
				this.style.width, this.style.height
			);
		}
		context.fillStyle = this.style.insetColour;
		context.fillRect(
			this.style.position.X + shiftX,
			this.style.position.Y + this.style.height - this.style.insetSize + shiftY,

			this.style.width, this.style.insetSize
		);
		context.fillRect(
			this.style.position.X + this.style.width - this.style.insetSize + shiftX,
			this.style.position.Y + shiftY,
			
			this.style.insetSize, this.style.height
		);
	}
}

Array.prototype.removeAll = (item) => {
	let NewArray = Array.prototype.filter(function(x) {
		return x !== item;
	});
	return(NewArray);
}