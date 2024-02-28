/* eslint-disable no-with */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
> 🪟 UI dialogs
---------------------------------------------------------------

*/

var vStr = '';

function O_PADEIRO_UTL(thisObj) {

	#include 'source/globals.js'; // global variables...
	#include 'source/layout/main ui functions.js'; // ui and layout functions...
	#include 'source/libraries/JSON lib.js'; // JSON definition file...
	#include 'source/libraries/FUNC lib.js'; // general functions definition file...
	#include 'source/libraries/PROT lib.js'; // prototype functions definition file...
	#include 'source/libraries/EXPS lib.js'; // expressions library...
	#include 'source/libraries/ICON lib.js'; // images encoded as binary...

	function O_PADEIRO_UI() {

		#include 'source/layout/Utils/o padeiro ui.js'; // o padeiro script...

		// defines the window object...
		var PAD_w = {};

		if (thisObj instanceof Panel) {
			PAD_w = thisObj;
	
		} else {
			PAD_w = new Window('palette', 'O PADEIRO', undefined);
		}
	
		PAD_w.spacing = 0;
		PAD_w.margins = 0;
		PAD_w.orientation = 'fill';

		var PAD_menuSubGrp1 = PAD_w.add('group');

		// import templates UI button...
		var PAD_importAetSubGrp = PAD_menuSubGrp1.add('group');
		var PAD_importAetBtn = PAD_importAetSubGrp.add('iconbutton', iconSize, templatesIcon['light'], { name: 'btn', style: 'toolbutton' });
		var PAD_importAetLab = PAD_importAetSubGrp.add('statictext', undefined, 'o padeiro', { name: 'label' , truncate: 'end'});
		PAD_importAetBtn.helpTip = 'o padeiro launcher';
		PAD_w.layout.layout(true);


		setTxtColor(PAD_importAetLab, rgb(255, 255, 255));
		setBgColor(PAD_w, rgb(81, 93, 158));

		PAD_importAetBtn.onClick = function () {
			// error...
			if (!netAccess()) {
			  showTabErr(netConfigName + ' not checked');
			  return;
			}
		
			padeiroTemplateDialog(); // → templates ui
		};
		return PAD_w;
	}

	var O_PADEIRO_WINDOW = O_PADEIRO_UI(thisObj);

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
	if (O_PADEIRO_WINDOW.toString() != '[object Panel]') {
		O_PADEIRO_WINDOW.show(); // → show UI
	}
	return O_PADEIRO_WINDOW;
}

// finally runs everything... ヽ(✿ﾟ▽ﾟ)ノ
O_PADEIRO_UTL(this);
