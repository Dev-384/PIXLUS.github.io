import { Menu } from "../../MenuCreator/menu.js";
import { Background, Image, Button, Text } from "../../MenuCreator/elements.js";

import { UI_options, innerScreen } from "../../play/main.js";
import Settings from "../../../options/index.json" assert {type: "json"};
import PackageJSON from "../../../package.json" assert {type: "json"};

import getFrame from "../../play/behind/animations.js";

import reloadWorlds from "../../worlds/reload.js";

const menu = new Menu;

menu.addElement(
	(new Background)
		.setSource("code/assets/blocks/images/Tiles/dirt.png")
		.setTileSize(32, 32)
)

const image = new Image;
image.setSource(`code/assets/player/images/idle/left/${getFrame([0,1,2,3])}.png`);
let imageSize = innerScreen.height * 0.75;
image.moveTo(innerScreen.width - imageSize, innerScreen.height / 2 - imageSize / 2);
image.setSize(imageSize, imageSize);
menu.addElement(image);

let buttonSize = 16;

const playButton = new Button;
playButton.moveTo(buttonSize * 1.5, buttonSize * 1.5);
playButton.setSize(buttonSize * 3.25, buttonSize);
playButton.setOutlineSize(buttonSize / 16);
playButton.setClickEvent( function(){
	UI_options.currentMenu = "";
} );
menu.addElement(playButton);

const text = new Text;
text.setContent("Play");
text.moveTo(buttonSize, buttonSize);
text.setSize(buttonSize);
menu.addElement(text);


const quitButton = new Button;
quitButton.moveTo(buttonSize * 1.5, buttonSize * 3);
quitButton.setSize(buttonSize * 3.25, buttonSize);
quitButton.setOutlineSize(buttonSize / 16);
quitButton.setClickEvent( function(){
	window.location.href = "../";
} );
menu.addElement(quitButton);

const quitText = new Text;
quitText.setContent("Quit");
quitText.moveTo(buttonSize, buttonSize * 2.5);
quitText.setSize(buttonSize);
menu.addElement(quitText);

let versionText = new Text;
versionText.setContent(PackageJSON.version);
versionText.moveTo(-5, innerScreen.height - buttonSize * 3.5);

let resetButton = new Button;
resetButton.moveTo(8, innerScreen.height - buttonSize * 1.5);
resetButton.setSize(150, buttonSize);
resetButton.setOutlineSize(buttonSize / buttonSize);
resetButton.setClickEvent( function(){
	reloadWorlds(true);
} );

let resetText = new Text;
resetText.setContent("Reset Worlds");
resetText.moveTo(0, innerScreen.height - buttonSize * 2);

if(Settings.advanced.show_version == true){
	menu.addElement(versionText);
	menu.addElement(resetButton);
	menu.addElement(resetText);
}

export default async function(){
	image.setSource(`code/assets/player/images/idle/left/${getFrame([0,1,2,3])}.png`);
	image.moveTo(innerScreen.width - imageSize, innerScreen.height / 2 - imageSize / 2);
	image.setSize(imageSize, imageSize);
	versionText.moveTo(-5, innerScreen.height - buttonSize * 3.5);
	resetButton.moveTo(8, innerScreen.height - buttonSize * 1.5);
	resetText.moveTo(0, innerScreen.height - buttonSize * 2);
	return(menu);
}