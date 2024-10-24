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

//  linter settings:
//  jshint -W061
//  jshint -W043

function progressDialog (text) {

	var progW = new Window('dialog', '    (。_。)?', undefined, { closeButton: false });
	progW.margins = 24;
	progW.spacing = 4;

	//---------------------------------------------------------

	var progLabelTxt = progW.add('statictext', undefined, text);
	progLabelTxt.size = [430, 24];
	// setFgColor(progLabelTxt, sTxtColor.light);

	var progPb = progW.add('progressbar', [0, 0, 430, 5], 0);
  
	var btnGrp = progW.add('group');
	var okBtn = btnGrp.add('button', [0, 0, 0, 0], '', { name: 'ok' });
	var cancelBtn = btnGrp.add('button', [0, 0, 0, 0], '', { name: 'cancel' });
	var keyLabelTxt = progW.add('statictext', undefined, '"ENTER" to proceed                                                                                   "ESC" to cancel');

	setBgColor(progW, '#FFFFFF');
	setFgColor(progLabelTxt, rgb(20, 20, 20));
	return progW;
}
