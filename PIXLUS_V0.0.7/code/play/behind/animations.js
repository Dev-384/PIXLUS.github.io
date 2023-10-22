export var speed = 250;
	
export function Milliseconds(){
	return( performance.now() );
};

export default function getFrame(arg){

	if(Array.isArray(arg)){

		// ( Math.round( Milliseconds() / speed ) % arg.length)
		let actuallFrame = Milliseconds() / speed;
		actuallFrame = Math.floor(actuallFrame);
		actuallFrame = actuallFrame % arg.length;

		return(arg[actuallFrame]);
	}else if(typeof arg == "string"){
		return(arg);
	}
}

export function frameChanged(customSpeed=0){

	let actuallFrame = Milliseconds() / speed;
	actuallFrame = Math.floor(actuallFrame);

	let fakeFrame = (Milliseconds() - 100) / (customSpeed || speed);
	fakeFrame = Math.floor(fakeFrame);

	return(actuallFrame !== fakeFrame);

}