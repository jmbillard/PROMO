/*

---------------------------- info ----------------------------

  title:   O PADEIRO script

  notes:   a collection of tools designed to
  speedup the motion graphics team workflow

  copy the .jsxbin file ('release' folder)
  to 'ScriptUI Panels' folder

  author:  Jean-Marc Billard
  version: 0.8-b
  date:    xx-xx-2024

--------------------------------------------------------------

*/

function O_PADEIRO_UTL(thisObj) {
	// current script version...
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
		PAD_w.margins = 5;
		PAD_w.orientation = 'fill';

		var mainGrp = PAD_w.add('group');
		mainGrp.alignment = 'center';
		mainGrp.orientation = 'stack';

		var btnGrp = mainGrp.add('group');
		btnGrp.alignment = 'center';

		// import templates UI button...
		var PAD_launchBtn = btnGrp.add('iconbutton', undefined, O_PADEIRO_ICON, { name: 'btn', style: 'toolbutton' });
		PAD_launchBtn.helpTip = '◖ → abrir O PADEIRO\n\n◗ → abrir a pasta de templates';

		var PAD_vLab = btnGrp.add('statictext', undefined, 'v' + PAD_v, { name: 'label', truncate: 'end' });
		PAD_vLab.helpTip = 'ajuda | DOCS';

		PAD_w.layout.layout(true);

		setTxtHighlight(PAD_vLab, '#FFFFFF', '#FF7B79');
		setBgColor(PAD_w, '#515D9E');

		PAD_w.onShow = PAD_w.onResizing = function () {
			PAD_w.layout.layout(true);
			PAD_w.layout.resize();
		};

		PAD_vLab.addEventListener('mousedown', function () {
			var siteUrl = 'https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-o-padeiro-script';
			openWebSite(siteUrl);
		});

		PAD_launchBtn.onClick = function () {
			// error...
			if (!netAccess()) {
				alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
				return;
			}

			padeiroTemplateDialog(); // → templates ui
		};

		PAD_launchBtn.addEventListener('click', function (c) {
			if (c.button == 2) {
				if (templatesFolder.exists) {
					openFolder(templatesPath); // → open template folder
				} else {
					alert(lol + '\na pasta de templates não foi localizada...');
				}
			}
		});

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
			alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
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
