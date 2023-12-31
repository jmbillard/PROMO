/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------- info ----------------------------

  title:   PROMO utilities script

  notes:   a collection of tools designed to
  speedup the motion graphics team workflow

  copy the .jsxbin file ('release' folder)
  to 'ScriptUI Panels' folder

  author:  Jean-Marc Billard
  version: 0.4-b
  date:    xx-xx-2023

--------------------------------------------------------------

*/

function PROMO_UTL(thisObj) {

	// current script version...
	var vStr = 'v0.4-b';

	/* jshint ignore:start */
	#include 'source/globals.js'; // global variables...
	#include 'source/layout/main ui.js'; // → UI definition file
	/* jshint ignore:end */

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
			alert('sem acesso a rede...  Σ(っ °Д °;)っ\na funcionalidade será limitada');
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
