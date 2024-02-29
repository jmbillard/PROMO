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

function O_PADEIRO_UTL(thisObj) {
	var vStr = '';

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
		PAD_w.margins = 10;
		
		var PAD_launchSubGrp = PAD_w.add('group');
		
		// import templates UI button...
		var PAD_launchBtn = PAD_launchSubGrp.add('iconbutton', undefined, O_PADEIRO_ICON, { name: 'btn', style: 'toolbutton' });
		var PAD_launchLab = PAD_launchSubGrp.add('statictext', undefined, 'v' + PAD_v, { name: 'label' , truncate: 'end'});
		PAD_launchBtn.helpTip = 'o padeiro launcher';
		
		PAD_w.layout.layout(true);

		setTxtColor(PAD_launchLab, rgb(255, 255, 255));
		setBgColor(PAD_w, rgb(81, 93, 158));

		PAD_launchBtn.onClick = function () {
			// error...
			if (!netAccess()) {
			  showTabErr(netConfigName + ' não está habilite');
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
		alert('por favor, habilite a opção ' + netConfigName + ' nas preferencias');

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
