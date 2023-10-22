import menuFile from "../menus/index.json" assert {type: "json"};

export default async function renderMenu(menuName=""){

	if((menuName in menuFile.menus) == false) return false;

	let pathToMenu = menuFile.menus[menuName];

	let { default: generateCurrentMenu } = await import(`../menus/${pathToMenu}`);
	let CurrentMenuData = await generateCurrentMenu();
	await CurrentMenuData.render();

}