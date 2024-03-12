/*

---------------------------- info ----------------------------

  title:   PROMO utilities script

  notes:   a collection of tools designed to
  speedup the motion graphics team workflow

  copy the .jsxbin file ('release' folder)
  to 'ScriptUI Panels' folder

  author:  Jean-Marc Billard
  version: 0.8-b
  date:    xx-xx-2024

--------------------------------------------------------------

*/

function PROMO_UTL(thisObj) {

	// current script version...
	var vStr = 'v0.8-b';

	#include 'source/globals.js'; // global variables...
	#include 'source/layout/main ui.js'; // → UI definition file

	// writes on the 'info' window panel...
	clearOutput();
	write(aboutStr);

	var PROMO_WINDOW = PROMO_UI(thisObj);

	// checks network access...
	if (!netAccess()) {
		// no network access...
		alert('por favor, marque a opção ' + netConfigName + ' nas preferencias');

		// opens AE preferences...
		app.executeCommand(3131); // → scripting preferences

		if (!netAccess()) {
			// no network access...
			alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
		}
	}
	// checks if the ui is running as floating window or as a panel...
	if (PROMO_WINDOW.toString() != '[object Panel]') {
		PROMO_WINDOW.show(); // → show UI
	}
	return PROMO_WINDOW;
}

// finally runs everything... ヽ(✿ﾟ▽ﾟ)ノ
PROMO_UTL(this);
