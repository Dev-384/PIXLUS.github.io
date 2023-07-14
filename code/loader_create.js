export var loader = document.createElement("div");

export async function showLoader(message="", delay=1500) {
	loader.setAttribute("class", "loader");
	loader.setAttribute("active", "");
	document.body.appendChild(loader);
	
	let loader_dot = document.createElement("div");
	loader_dot.setAttribute("class", "dot");
	loader.appendChild(loader_dot);
	
	let loader_line = document.createElement("div");
	loader_line.setAttribute("class", "line");
	loader.appendChild(loader_line);
	
	let loader_message = document.createElement("div");
	loader_message.setAttribute("class", "message");
	loader_message.innerHTML = message;
	loader.appendChild(loader_message);
}

export async function hideLoader(){
	loader.removeAttribute("active");
	window.onbeforeunload = () => {}
	setTimeout(() => {
		loader.remove();
	}, 1000);
}