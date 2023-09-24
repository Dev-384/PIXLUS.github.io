import { Menu, Elements } from "../../MenuCreator/menu.js";

import { UI_options, innerScreen } from "../../play/main.js";
import Settings from "../../../options/index.json" assert {type: "json"};
import PackageJSON from "../../../package.json" assert {type: "json"};

import getFrame from "../../play/behind/animations.js";

import reloadWorlds from "../../worlds/reload.js";

export default async function(){
	const menu = new Menu;

	menu.addElement(
		(new Elements.Background)
			.setSource("code/assets/blocks/images/Tiles/dirt.png")
			.setTileSize(32, 32)
	)

	// const background = new Elements.Background;
	// background.setSource("code/assets/blocks/images/Tiles/dirt.png");
	// background.setTileSize(32, 32);
	// menu.addElement(background);

	const image = new Elements.Image;
	image.setSource(`code/assets/player/images/idle/left/${getFrame([0,1,2,3])}.png`);
	let imageSize = innerScreen.height * 0.75;
	image.moveTo(innerScreen.width - imageSize, innerScreen.height / 2 - imageSize / 2);
	image.setSize(imageSize, imageSize);
	menu.addElement(image);

	let buttonSize = 16;

	const playButton = new Elements.Button;
	playButton.moveTo(buttonSize * 1.5, buttonSize * 1.5);
	playButton.setSize(buttonSize * 3.25, buttonSize);
	playButton.setOutlineSize(buttonSize / 16);
	playButton.setClickEvent( function(){
		UI_options.currentMenu = "";
	} );
	menu.addElement(playButton);

	const text = new Elements.Text;
	text.setContent("Play");
	text.moveTo(buttonSize, buttonSize);
	text.setSize(buttonSize);
	menu.addElement(text);


	const quitButton = new Elements.Button;
	quitButton.moveTo(buttonSize * 1.5, buttonSize * 3);
	quitButton.setSize(buttonSize * 3.25, buttonSize);
	quitButton.setOutlineSize(buttonSize / 16);
	quitButton.setClickEvent( function(){
		window.location.href = "../";
	} );
	menu.addElement(quitButton);

	const quitText = new Elements.Text;
	quitText.setContent("Quit");
	quitText.moveTo(buttonSize, buttonSize * 2.5);
	quitText.setSize(buttonSize);
	menu.addElement(quitText);

	if(Settings.advanced.show_version == true){
		let versionText = new Elements.Text;
		versionText.setContent(PackageJSON.version);
		versionText.moveTo(-5, innerScreen.height - buttonSize * 3.5);
		menu.addElement(versionText);


		let resetButton = new Elements.Button;
		resetButton.moveTo(8, innerScreen.height - buttonSize * 1.5);
		resetButton.setSize(150, buttonSize);
		resetButton.setOutlineSize(buttonSize / buttonSize);
		resetButton.setClickEvent( function(){
			reloadWorlds(true);
		} );
		menu.addElement(resetButton);
		let resetText = new Elements.Text;
		resetText.setContent("Reset Worlds");
		resetText.moveTo(0, innerScreen.height - buttonSize * 2);
		menu.addElement(resetText);
	}

	return(menu);
}