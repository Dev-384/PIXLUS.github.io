import { image } from "../../play/image.js";

export class Image {
	constructor(){
		this.img = {};
		this.img.source = "";
		this.img.width = 16;
		this.img.height = 16;
		this.img.X = 0;
		this.img.Y = 0;

		this.img.tileData = {};
		this.img.tileData.X = 0;
		this.img.tileData.Y = 0;
		this.img.tileData.width = 16;
		this.img.tileData.height = 16;
	}
	setSource(source="", sourceX=0, sourceY=0, sourceWidth=16, sourceHeight=16){
		this.img.source = source;

		this.img.tileData.X = sourceX;
		this.img.tileData.Y = sourceY;

		this.img.tileData.width = sourceWidth;
		this.img.tileData.height = sourceHeight;

		return source
	}
	setSize(width=0, height=0){
		this.img.width = width;
		this.img.height = height;

		return {
			width: width,
			height: height
		}
	}
	moveTo(X=0, Y=0){
		this.img.X = X;
		this.img.Y = Y;

		return {
			X: X,
			Y: Y
		}
	}
	render(shiftX=0, shiftY=0){
		image(
			"../../"+this.img.source,

			this.img.X + shiftX, this.img.Y + shiftY,
			this.img.width, this.img.height,

			this.img.tileData.X, this.img.tileData.Y,
			this.img.tileData.width, this.img.tileData.height
		);
	}
}