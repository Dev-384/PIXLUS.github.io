@ECHO OFF

:: Clear terminal screen
cls

echo PIXLUS : Startup

:: Check if NodeJS is installed
npm >nul 2>&1 && (
	:: NodeJS is installed
    echo NodeJS is installed


	:: Check if folder node_modues does not exists
	if not exist node_modules\ (
		:: Installing NodeJS dependencies
		echo Installing dependencies
		npm install
	)

	:: Start PIXLUS Server
	echo Starting PIXLUS
	npm run server
) || (
	:: NodeJS has not been installed
    echo NodeJS is being installed
	echo About NodeJS: (https://nodejs.org/about)

	:: Wait for user confirm
	PAUSE

	:: Install NodeJS
	winget install OpenJS.NodeJS

	:: Check if folder node_modues does not exists
	if not exist node_modules\ (
		:: Installing NodeJS dependencies
		echo Installing dependencies
		npm install
	)

	:: Start PIXLUS Server
	echo Starting PIXLUS
	npm run server
)