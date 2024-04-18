/*

---------------------------- info ----------------------------

  title:   O PADEIRO script

  notes:   a collection of tools designed to
  speedup the motion graphics team workflow

  copy the .jsxbin file ('release' folder)
  to 'ScriptUI Panels' folder

  author:  Jean-Marc Billard
  version: 0.7-b
  date:    xx-xx-2024

--------------------------------------------------------------

*/

function O_PADEIRO_UTL(thisObj) {
	var vStr = '';

	#include 'source/globals.js'; // global variables.
	#include 'source/layout/main ui functions.js'; // ui and layout functions.
	#include 'source/libraries/JSON lib.js'; // JSON definition file.
	#include 'source/libraries/FUNC lib.js'; // general functions definition file.
	#include 'source/libraries/PROT lib.js'; // prototype functions definition file.
	#include 'source/libraries/EXPS lib.js'; // expressions library.
	#include 'source/libraries/ICON lib.js'; // images encoded as binary.

	function O_PADEIRO_UI() {

		#include 'source/layout/Utils/o padeiro ui.js'; // o padeiro script.

		// defines the window object.
		var PAD_w = {};

		if (thisObj instanceof Panel) {
			PAD_w = thisObj;

		} else {
			PAD_w = new Window('palette', 'O PADEIRO', undefined);
		}
		PAD_w.margins = 5;
		PAD_w.orientation = 'stack';

		var mainGrp = PAD_w.add('group');
		mainGrp.spacing = 10;

		var btnGrp1 = mainGrp.add('group');
		btnGrp1.alignment = 'center';
		btnGrp1.spacing = 2;

		// UI button...
		var PAD_launchBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_ICON, { name: 'btn', style: 'toolbutton' });
		PAD_launchBtn.helpTip = '◖ → abrir O PADEIRO\n\n◗ → abrir a pasta de templates';

		// UI button...
		var PAD_fontBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_FONT_ICON, { name: 'btn', style: 'toolbutton' });
		PAD_fontBtn.helpTip = '◖ → instalar as fontes usadas no template\n\n◗ → abrir a pasta de fontes usadas no template';

		var div1 = mainGrp.add("panel"); 
		div1.alignment = "fill"; 

		var btnGrp2 = mainGrp.add('group');
		btnGrp2.alignment = 'center';
		btnGrp2.spacing = 2;

		// UI button...
		var PAD_outputFolderBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_OUTPUTFOLDER_ICON, { name: 'btn', style: 'toolbutton' });
		PAD_outputFolderBtn.helpTip = '◖ → abir pasta do último item da fila de render.\n\n◗ → abir pasta do penúltimo item da fila de render.';

		btnGrp2.add("panel"); 

		// UI button...
		var PAD_renameBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_RENAME_ICON, { name: 'btn', style: 'toolbutton' });
		PAD_renameBtn.helpTip = '◖ → renomear comps selecionadas';

		var PAD_vLab = PAD_w.add('statictext', undefined, 'v' + PAD_v, { name: 'label', truncate: 'end' });
		PAD_vLab.alignment = 'right';
		PAD_vLab.helpTip = 'ajuda | DOCS';

		PAD_w.layout.layout(true);

		setTxtHighlight(PAD_vLab, '#FFFFFF', '#FF7B79');
		setBgColor(PAD_w, '#515D9E');

		PAD_w.onShow = PAD_w.onResizing = function () {
			var grpLayout = PAD_w.size.width > PAD_w.size.height ? 'row' : 'column';
			var labLayout = PAD_w.size.width > PAD_w.size.height ? 'right' : 'bottom';
			var mainMargins = PAD_w.size.width > PAD_w.size.height ? [0, 0, 40, 0] : [0, 0, 0, 20];

			mainGrp.orientation = grpLayout;
			btnGrp1.orientation = grpLayout;
			btnGrp2.orientation = grpLayout;

			PAD_vLab.alignment = labLayout;

			mainGrp.margins = mainMargins;

			btnGrp1.layout.layout(true);
			btnGrp2.layout.layout(true);
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

		PAD_fontBtn.onClick = function () {
			// error...
			if (!netAccess()) {
				alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
				return;
			}

			var folderPath = getXMPData('source');
			var templateFontsPath = folderPath + '/FONTS';
			if (folderPath == '') return;

			var templateFontsFolder = new Folder(templateFontsPath);
			// checks if there is a system folder correspondent to the selection...
			if (!templateFontsFolder.exists) return;
			// install the selected font family on Windows...
			if (appOs == 'Win') installWinFonts(templateFontsPath);

		};

		PAD_fontBtn.addEventListener('click', function (c) {
			if (c.button == 2) {
				// error...
				if (!netAccess()) {
					alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
					return;
				}

				var folderPath = getXMPData('source');
				var templateFontsPath = folderPath + '/FONTS';
				if (folderPath == '') return;

				try {
					openFolder(templateFontsPath); // → open template folder
				} catch (error) {
					alert(lol + '\n' + error);
				}
			}
		});

		PAD_outputFolderBtn.onClick = function () {
			// error...
			if (!netAccess()) {
				alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
				return;
			}
			if (app.project.renderQueue.numItems < 1) return;

			var item = app.project.renderQueue.item(app.project.renderQueue.numItems);
			var outputModule = item.outputModule(1);
			var outputPath = decodeURI(outputModule.file.path);
			var fld = new Folder(outputPath);

			if (!fld.exists) {
				showTabErr('this folder is not accessible...');
				return;
			}

			openFolder(outputPath);
		};

		PAD_outputFolderBtn.addEventListener('click', function (c) {
			if (c.button == 2) {
				// error...
				if (!netAccess()) {
					alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
					return;
				}
				if (app.project.renderQueue.numItems < 2) return;

				var item = app.project.renderQueue.item(app.project.renderQueue.numItems - 1);
				var outputModule = item.outputModule(1);
				var outputPath = decodeURI(outputModule.file.path);
				var fld = new Folder(outputPath);

				if (!fld.exists) {
					showTabErr('this folder is not accessible...');
					return;
				}

				openFolder(outputPath);
			}
		});

		PAD_renameBtn.onClick = function () {
			// error...
			if (app.project.numItems == 0) return;
			app.beginUndoGroup('rename comps');
		
			renamePromoComps(app.project.selection);
		
			app.endUndoGroup();
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
