function adaptFileDir(pathToFile="", currentDirectory=""){

    let pathLength = currentDirectory.split("/");

    pathLength.shift();
    pathLength.shift();
    pathLength.shift();
    pathLength.pop();
    pathLength = pathLength.length;

    for(let i = 0; i < pathLength; i ++){
        pathToFile = pathToFile.replace("../", "")
    }

    return(pathToFile);
}


export function writeFile(path="", content="", adaptiveDir=true){

	if(adaptiveDir){
		path = adaptFileDir(path, window.location.href);
	}

	content = content
		.replaceAll("\n", "\\n")
		.replaceAll("\t", "\\t");;

	let hostName = window.location.href.split("/")[2];

	let iframe = document.createElement("iframe");
	iframe.id = "server_request";
	iframe.style.display = "none";
	iframe.style.visibility = "hidden";
	iframe.src = `http://${hostName}/server.write?path=${path}&content=${content}`;

	iframe.onload = () => {
		iframe.remove();
	}

	document.body.appendChild(iframe);
}

export function readFile(path="", callback=function(fileContent={
	path: "",
	content: ""
}){}){

	let hostName = window.location.href.split("/")[2];

	let iframe = document.createElement("iframe");
	iframe.id = "server_request";
	iframe.style.display = "none";
	iframe.style.visibility = "hidden";
	iframe.src = `http://${hostName}/server.read?path=${path}`;

	iframe.onload = () => {
		callback(JSON.parse(iframe.contentDocument.body.innerText));
		iframe.remove();
	}

	document.body.appendChild(iframe);
}