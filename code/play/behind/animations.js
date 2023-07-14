var frame = 0

export default function(arrayOfFrames=[""]){
	let currentAnimationFrame = frame % arrayOfFrames.length;

	return(arrayOfFrames[currentAnimationFrame]);
}

setInterval(() => {
	frame += 1;
}, 250);