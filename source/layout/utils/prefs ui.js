/* eslint-disable no-with */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
> ⚙️ preferences ui
---------------------------------------------------------------

*/

//  linter settings:
//  jshint -W061
//  jshint -W043
//  jscs:disable maximumLineLength

function prefsDialog() {
	var layerTypeArray = ['shape layer', 'sólido'];
	var projectModeDropArray = ['PROMO'];//, 'custom'];
	var ckbGrpSpacing = 20;
	var btnGrpSpacing = 10;
	var drpGrpSpacing = 2;
	var txtSize = [120, 30];
	var dropSize = [85, 24];

	//---------------------------------------------------------

	var wPref = new Window('dialog', 'preferencias do script...');
	wPref.alignChildren = ['left', 'top'];
	wPref.spacing = 10;

	//

	// var userGrp = wPref.add('group');
	// userGrp.spacing = 2;

	// var userTxt = userGrp.add('statictext', undefined, 'user prefix');
	// userTxt.helpTip = 'user prefix';
	// userTxt.preferredSize = txtSize;

	// var projUserTxt = userGrp.add('edittext', undefined, userPrefix);
	// projUserTxt.preferredSize = dropSize;
	// projUserTxt.helpTip = 'user prefix';

	// //---------------------------------------------------------

	// var divider0 = wPref.add('panel');
	// divider0.alignment = 'fill';

	var layerGrp = wPref.add('group');
	layerGrp.orientation = 'column';
	layerGrp.alignChildren = ['left', 'center'];
	layerGrp.spacing = 2;

	var layerGrpTxt = layerGrp.add('statictext', undefined, 'novos layers:');
	setTxtColor(layerGrpTxt, sTxtColor.light);

	//

	var nullGrp = layerGrp.add('group');
	nullGrp.spacing = drpGrpSpacing;

	var nullTypeTxt = nullGrp.add('statictext', undefined, 'novo null');
	nullTypeTxt.helpTip = 'null type';
	nullTypeTxt.preferredSize = txtSize;

	var nullTypeDrop = nullGrp.add('dropdownlist', undefined, layerTypeArray);
	nullTypeDrop.selection = nullType;
	nullTypeDrop.preferredSize = dropSize;

	//

	var adjGrp = layerGrp.add('group');
	adjGrp.spacing = drpGrpSpacing;

	var adjTypeTxt = adjGrp.add('statictext', undefined, 'adj. layer');
	adjTypeTxt.helpTip = 'adjustment layer type';
	adjTypeTxt.preferredSize = txtSize;

	var adjTypeDrop = adjGrp.add('dropdownlist', undefined, layerTypeArray);
	adjTypeDrop.selection = adjType;
	adjTypeDrop.preferredSize = dropSize;

	//---------------------------------------------------------

	var divider1 = wPref.add('panel');
	divider1.alignment = 'fill';

	var projectGrp = wPref.add('group');
	projectGrp.orientation = 'column';
	projectGrp.alignChildren = ['left', 'center'];
	projectGrp.spacing = 2;

	var projectGrpTxt = projectGrp.add('statictext', undefined, 'projeto:');
	setTxtColor(projectGrpTxt, sTxtColor.light);

	//

	// 	var v22Grp = projectGrp.add('group');
	// 	v22Grp.spacing = ckbGrpSpacing;

	// 	var v22Txt = v22Grp.add('statictext', undefined, 'save as v22.x');
	// 	v22Txt.helpTip = 'save as v22.x window\n\
	// > opens the save as window if the AE version is higher than v22';
	// 	v22Txt.preferredSize = txtSize;

	// 	var v22Ckb = v22Grp.add('checkbox', [8, 4, 24, 18]);
	// 	v22Ckb.value = saveAsV22;

	//

	var missGrp = projectGrp.add('group');
	missGrp.spacing = ckbGrpSpacing;

	var missTxt = missGrp.add('statictext', undefined, 'ignorar missing files');
	missTxt.helpTip = 'ignorar alerta de arquivos faltando';
	missTxt.preferredSize = txtSize;

	var missCkb = missGrp.add('checkbox', [8, 4, 24, 18]);
	missCkb.value = ignoreMissing;

	//

	var projOrgGrp = projectGrp.add('group');
	projOrgGrp.spacing = drpGrpSpacing;

	var projModelTxt = projOrgGrp.add('statictext', undefined, 'organização');
	projModelTxt.helpTip = 'modelo de organização';
	projModelTxt.preferredSize = txtSize;

	var projectModeDrop = projOrgGrp.add('dropdownlist', undefined, projectModeDropArray);
	projectModeDrop.selection = projectMode;
	projectModeDrop.preferredSize = dropSize;

	//

	// var projFldGrp = projectGrp.add('group');
	// projFldGrp.spacing = btnGrpSpacing;

	// var fldProjTxt = projFldGrp.add('statictext', undefined, 'proj. folder');
	// fldProjTxt.helpTip = '\'save project\' button default folder\n(\'PRODUCAO DIA-A-DIA\' on \'hard news\' mode)';
	// fldProjTxt.preferredSize = txtSize;

	// var fldProjBtn = projFldGrp.add('iconbutton', iconSize, projFolderIcon.light, { style: 'toolbutton' });
	// fldProjBtn.helpTip = 'map folder\n\n' + '> \'' + projPath + '\'';

	// var resetFldProjBtn = projFldGrp.add('iconbutton', iconTogSize, resetIcon.light, { style: 'toolbutton' });
	// resetFldProjBtn.helpTip = 'reset \'save project\' default folder';

	//---------------------------------------------------------

	var divider2 = wPref.add('panel');
	divider2.alignment = 'fill';

	var themeGrp = wPref.add('group');
	themeGrp.orientation = 'column';
	themeGrp.alignChildren = ['left', 'center'];
	themeGrp.spacing = 2;

	var themeGrpTxt = themeGrp.add('statictext', undefined, 'ícones:');
	setTxtColor(themeGrpTxt, sTxtColor.light);

	//

	var iconThemeGrp = themeGrp.add('group');
	iconThemeGrp.spacing = 60;
	iconThemeGrp.margins = [0, 8, 0, 4];

	var darkRdo = iconThemeGrp.add('radiobutton', undefined, 'tema dark');
	darkRdo.helpTip = 'tema dos ícones';
	darkRdo.value = darkRdo.text.split(' ')[1] == iconTheme;

	var lightRdo = iconThemeGrp.add('radiobutton', undefined, 'tema light');
	lightRdo.helpTip = 'tema dos ícones';
	lightRdo.value = lightRdo.text.split(' ')[1] == iconTheme;

	//

	var tabColorsGrp = themeGrp.add('group');
	tabColorsGrp.spacing = 2;

	var tabTxt = tabColorsGrp.add('statictext', undefined, 'cores das abas');
	tabTxt.helpTip = 'cores das abas';
	tabTxt.preferredSize = txtSize;

	var colorDrop = tabColorsGrp.add('dropdownlist', undefined, grpNames);
	colorDrop.selection = 0;
	colorDrop.preferredSize = dropSize;

	var tabColorBtn = wPref.add('iconbutton', undefined, undefined, { style: 'toolbutton' });
	tabColorBtn.size = [208, 20];
	setUiCtrlColor(tabColorBtn, tabColors[0]);
	tabColorBtn.onDraw = customDraw;

	//

	var slGrp = wPref.add('group');
	slGrp.spacing = ckbGrpSpacing;

	var slTxt = slGrp.add('statictext', undefined, 'mostrar rótulos');
	slTxt.helpTip = 'mostrar rótulos nos botões do menu principal';
	slTxt.preferredSize = txtSize;

	var slCkb = slGrp.add('checkbox', [8, 4, 24, 18]);
	slCkb.value = showLabels;

	// 	//---------------------------------------------------------

	// 	var divider3 = wPref.add('panel');
	// 	divider3.alignment = 'fill';

	// 	var modeGrp = wPref.add('group');
	// 	modeGrp.orientation = 'column';
	// 	modeGrp.alignChildren = ['left', 'center'];
	// 	modeGrp.spacing = 2;

	// 	var modeGrpTxt = modeGrp.add('statictext', undefined, 'modes:');
	// 	setTxtColor(modeGrpTxt, sTxtColor.light);

	// 	//

	// 	var hoGrp = modeGrp.add('group');
	// 	hoGrp.spacing = ckbGrpSpacing;

	// 	var hoTxt = hoGrp.add('statictext', undefined, 'home office');
	// 	hoTxt.helpTip = 'home office mode\n\
	// > uses yor local machine... all files and\
	// templates will be downloaded and stored \
	// on the script preferences folder\n\
	// > disables most of the links tab folder shortcuts\
	// (\'MAM - magazine\' and \'MAM - para arte\' can be mapped)';
	// 	hoTxt.preferredSize = txtSize;

	// 	var hoCkb = hoGrp.add('checkbox', [8, 4, 24, 18]);
	// 	hoCkb.value = homeOffice;

	// 	//---------------------------------------------------------

	// 	var divider5 = wPref.add('panel');
	// 	divider5.alignment = 'fill';

	// 	var btnGrp = wPref.add('group');
	// 	btnGrp.orientation = 'stack';
	// 	btnGrp.alignment = 'fill';
	// 	// left buttons group...
	// 	var bGrp1 = btnGrp.add('group');
	// 	bGrp1.alignment = 'left';
	// 	bGrp1.spacing = 2;
	// 	// right buttons group...
	// 	var bGrp2 = btnGrp.add('group');
	// 	bGrp2.alignment = 'right';
	// 	bGrp2.spacing = 2;

	// 	//

	// 	var devTogBtn = bGrp1.add('iconbutton', iconTogSize, exprTogIcon.light, { style: 'toolbutton', toggle: 1 });
	// 	devTogBtn.helpTip = 'dev tools';
	// 	devTogBtn.value = devMode;

	// 	var openFldBtn = bGrp1.add('iconbutton', iconSize, folderIcon.light, { style: 'toolbutton' });
	// 	openFldBtn.helpTip = 'open script preferences folder';

	// 	//

	// 	var resetBtn = bGrp2.add('iconbutton', iconSize, resetIcon.light, { style: 'toolbutton' });
	// 	resetBtn.helpTip = 'reset script preferences';

	// 	var updateBtn = bGrp2.add('iconbutton', iconSize, downloadIcon.light, { style: 'toolbutton' });
	// 	updateBtn.helpTip = 'download the latest script version from github';

	var divider3 = wPref.add('panel');
	divider3.alignment = 'fill';

	var setupGrp = wPref.add('group');
	setupGrp.orientation = 'column';
	setupGrp.alignChildren = ['left', 'center'];
	setupGrp.spacing = 2;

	var setupGrpTxt = setupGrp.add('statictext', undefined, 'setup do AE:');
	setTxtColor(setupGrpTxt, sTxtColor.light);

	var setupColorLabelsGrp = setupGrp.add('group');
	setupColorLabelsGrp.spacing = btnGrpSpacing;

	var setupColorLabelsTxt = setupColorLabelsGrp.add('statictext', undefined, 'cores dos labels');
	setupColorLabelsTxt.helpTip = 'configura as as preferências de\ncores dos labels e seus nomes';
	setupColorLabelsTxt.preferredSize = txtSize;

	var setupColorLabelsBtn = setupColorLabelsGrp.add('iconbutton', iconSize, solTogIcon.light, { style: 'toolbutton' });
	setupColorLabelsBtn.helpTip = 'configurar labels';

	var resetSetupColorLabelsBtn = setupColorLabelsGrp.add('iconbutton', iconTogSize, resetIcon.light, { style: 'toolbutton' });
	resetSetupColorLabelsBtn.helpTip = '';
	resetSetupColorLabelsBtn.enabled = false;


	var setupCacheGrp = setupGrp.add('group');
	setupCacheGrp.spacing = btnGrpSpacing;

	var setupCacheTxt = setupCacheGrp.add('statictext', undefined, 'pasta de caches');
	setupCacheTxt.helpTip = 'configura a preferência ddo\ncaminho da pasta de caches';
	setupCacheTxt.preferredSize = txtSize;

	var setupCacheBtn = setupCacheGrp.add('iconbutton', iconSize, solTogIcon.light, { style: 'toolbutton' });
	setupCacheBtn.helpTip = 'configurar pasta de caches';

	var resetSetupCacheBtn = setupCacheGrp.add('iconbutton', iconTogSize, resetIcon.light, { style: 'toolbutton' });
	resetSetupCacheBtn.helpTip = '';
	resetSetupCacheBtn.enabled = false;


	// var setupExportGrp = setupGrp.add('group');
	// setupExportGrp.spacing = btnGrpSpacing;

	// var setupExportTxt = setupExportGrp.add('statictext', undefined, 'templates de saída');
	// setupExportTxt.helpTip = '';
	// setupExportTxt.preferredSize = txtSize;

	// var setupExportBtn = setupExportGrp.add('iconbutton', iconSize, solTogIcon.light, { style: 'toolbutton' });
	// setupExportBtn.helpTip = '';

	// var resetSetupExportBtn = setupExportGrp.add('iconbutton', iconTogSize, resetIcon.light, { style: 'toolbutton' });
	// resetSetupExportBtn.helpTip = '';

	/*

	---------------------------------------------------------------
	> ⚙️ preferences events
	---------------------------------------------------------------

	*/

	lightRdo.onClick = darkRdo.onClick = function () {
		iconTheme = this.text.split(' ')[1];
		JSONPrefsObj.iconTheme = iconTheme;
		savePrefs(); // → save preferences.json
		showTabProg('restart the script  ヽ(✿ﾟ▽ﾟ)ノ');
		wPref.close();
	};

	//---------------------------------------------------------

	// devTogBtn.onClick = function () {
	// 	devMode = this.value;
	// 	JSONPrefsObj.devMode = devMode;
	// 	menuSubGrp5.enabled = menuSubGrp5.visible = devMode;
	// 	setLayout();
	// 	savePrefs(); // → save preferences.json
	// };

	//---------------------------------------------------------

	// resetBtn.onClick = function () {
	// 	JSONPrefsObj = defPrefsObj;
	// 	savePrefs(); // → save preferences.json
	// 	showTabProg('restart the script  ヽ(✿ﾟ▽ﾟ)ノ');
	// 	wPref.close();
	// };

	//---------------------------------------------------------

	// openFldBtn.onClick = function () {
	// 	// alert...
	// 	if (!netAccess()) {
	// 		alert('no access...  ' + lol;);
	// 		return;
	// 	}
	// 	if (!fontsFolder.exists) fontsFolder.create();

	// 	openFolder(scriptPreferencesPath);
	// };

	//---------------------------------------------------------

	// projUserTxt.onEnterKey = projUserTxt.onChange = function () {
	// 	this.text = this.text.toUpperCase();
	// 	userPrefix = this.text;
	// 	JSONPrefsObj.userPrefix = userPrefix;
	// 	savePrefs(); // → save preferences.json
	// 	userTxt.active = true;
	// };

	//---------------------------------------------------------

	nullTypeDrop.onChange = function () {
		nullType = this.selection.index; // selected null type...
		JSONPrefsObj.selection.nullType = nullType; // update preferences object...
		savePrefs(); // → save preferences.json
	};

	//---------------------------------------------------------

	adjTypeDrop.onChange = function () {
		adjType = this.selection.index; // selected adj type...
		JSONPrefsObj.selection.adjType = adjType; // update preferences object...
		savePrefs(); // → save preferences.json
	};

	//---------------------------------------------------------

	projectModeDrop.onChange = function () {
		projectMode = this.selection.index; // selected project model...
		JSONPrefsObj.selection.projectMode = projectMode; // update preferences object...
		savePrefs(); // → save preferences.json
	};

	//---------------------------------------------------------

	colorDrop.onChange = function () {
		var c = tabColors[this.selection.index]; // selected tab color...
		setUiCtrlColor(tabColorBtn, c); // update color preview swatch...
		tabColorBtn.notify('onDraw'); // force ui update...
	};

	//---------------------------------------------------------

	tabColorBtn.onClick = function () {
		var c = tabColors[colorDrop.selection.index]; // selected tab color...
		var binColor = eval(rgbToHex(c)); // color converted HEX...
		var configColor = $.colorPicker(binColor); // → system color picker

		if (configColor != -1) {
			configColor = eval(rgbStr(configColor)); // → [1,1,1]
			tabColors[colorDrop.selection.index] = configColor; // update color array...
			JSONPrefsObj.color[colorDrop.selection][iconTheme] = rgbToHEX(configColor); // update preferences object...

			setUiCtrlColor(this, configColor); // update color preview swatch...
			savePrefs(); // → save preferences.json
			bgColor = tabColors[0];
			setBgColor(w, bgColor);
		}
	};

	//---------------------------------------------------------

	// // configure 'MAM - para arte' path...
	// fldProjBtn.onClick = function () {
	// 	// error...
	// 	if (!netAccess()) {
	// 		alert(netConfigName + ' não habilitada');
	// 		return;
	// 	}
	// 	var saveFolder = Folder.selectDialog();

	// 	if (saveFolder != null) {
	// 		projPath = decodeURI(saveFolder).toString();
	// 		JSONPrefsObj.folders.projPath = projPath;
	// 		savePrefs();
	// 		fldProjBtn.helpTip = 'map folder\n\n' + '> \'' + projPath + '\'';
	// 	}
	// };

	// resetFldProjBtn.onClick = function () {
	// 	// error...
	// 	if (!netAccess()) {
	// 		alert(netConfigName + ' não habilitada');
	// 		return;
	// 	}
	// 	projPath = defPrefsObj.folders.projPath;
	// 	JSONPrefsObj.folders.projPath = projPath;
	// 	fldProjBtn.helpTip = 'map folder\n\n' + '> \'' + projPath + '\'';
	// 	savePrefs();
	// };

	//---------------------------------------------------------

	// right click -> opens the git repo...
	// updateBtn.addEventListener('click', function (c) {
	// 	if (c.button == 2) {
	// 		// error...
	// 		if (!netAccess()) {
	// 			alert(netConfigName + ' não habilitada');
	// 			return;
	// 		}
	// 		openWebSite(repoURL); // → launch internet browser
	// 	}
	// });

	//---------------------------------------------------------

	// updateBtn.onClick = function () {
	// 	// error...
	// 	if (!netAccess()) {
	// 		alert(netConfigName + ' não habilitada');
	// 		return;
	// 	}
	// 	var uiPath = scriptPreferencesPath + '/ScriptUI Panels';
	// 	var pathArray = [];

	// 	for (var i = 0; i < codeURLArray.length; i++) {
	// 		pathArray.push(uiPath);
	// 	}
	// 	var uiFolder = new Folder(uiPath);
	// 	var scriptUIPath = new File($.fileName).path.toString();
	// 	var destPathArray = [
	// 		scriptUIPath, // → Scripts/Script UiPanels
	// 		promoArcPath + '/scripts', // → /arquivamento/GLOBONEWS/On Air 2022/Promo/scripts
	// 		promoInsPath + '/BARRA UTILIDADES PROMO PARA SCRIPT', // → UTILIDADES//FERRAMENTAS/SCRIPTS/SCRIPTS AFX/BARRA UTILIDADES PROMO PARA INSTALAR
	// 	];
	// 	removeFolder(uiFolder); // → delete previous download folder
	// 	uiFolder.create(); // → create new download folder

	// 	getURLContent(codeURLArray, pathArray); // → download files on codeURLArray

	// 	// copy downloaded files...

	// 	if (homeOffice) copyFolderContentContent(uiPath, destPathArray[0]);

	// 	if (!homeOffice) {
	// 		try {
	// 			copyFolderContentContent(uiPath, destPathArray[1]);

	// 		} catch (err) {
	// 			alert('nope... (っ °Д °;)っ \n\n' + err.message);
	// 			copyFolderContentContent(uiPath, destPathArray[0]);
	// 		}
	// 	}
	// 	showTabProg('restart the script  ヽ(✿ﾟ▽ﾟ)ノ');
	// 	wPref.close();
	// };

	//---------------------------------------------------------

	// v22Ckb.onClick = function () {
	// 	saveAsV22 = this.value;
	// 	JSONPrefsObj.saveAsV22 = saveAsV22;

	// 	savePrefs(); // → save preferences.json
	// };

	//---------------------------------------------------------

	// hoCkb.onClick = function () {
	// 	homeOffice = this.value;
	// 	JSONPrefsObj.homeOffice = homeOffice;
	// 	inFtgBtn = !homeOffice;
	// 	outSPBtn = !homeOffice;
	// 	projSPBtn = !homeOffice;
	// 	outRJBtn = !homeOffice;
	// 	projRJBtn = !homeOffice;

	// 	savePrefs(); // → save preferences.json
	// 	updateFolderPaths(); // → update templates and fonts folder
	// };

	//---------------------------------------------------------

	slCkb.onClick = function () {
		showLabels = this.value;
		JSONPrefsObj.showLabels = showLabels;

		setLayout();
		savePrefs(); // → save preferences.json
	};

	//---------------------------------------------------------

	missCkb.onClick = function () {
		ignoreMissing = this.value;
		JSONPrefsObj.ignoreMissing = ignoreMissing;

		savePrefs(); // → save preferences.json
	};

	//---------------------------------------------------------

	// Configura as cores e nomes dos rótulos das camadas nas preferências do After Effects.
	setupColorLabelsBtn.onClick = function () {
		var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;  // Tipo de arquivo de preferências

		app.beginUndoGroup('configurar layer labels'); // Inicia um grupo de desfazer (undo)

		// Itera sobre os 16 rótulos
		for (var i = 1; i <= 16; i++) {
			var color = labelsObj['l' + i].color; // Obtém a cor do rótulo
			var name = labelsObj['l' + i].name;   // Obtém o nome do rótulo

			// Salva a cor do rótulo nas preferências
			var sectionName = 'Label Preference Color Section 5';
			var keyName = 'Label Color ID 2 # ' + i;
			app.preferences.savePrefAsString(sectionName, keyName, color, prefFile);

			// Salva o nome do rótulo nas preferências
			sectionName = 'Label Preference Text Section 7';
			keyName = 'Label Text ID 2 # ' + i;
			app.preferences.savePrefAsString(sectionName, keyName, name, prefFile);
		}

		app.preferences.saveToDisk(); // Salva as preferências no disco
		app.preferences.reload();     // Recarrega as preferências do After Effects

		app.endUndoGroup();  // Finaliza o grupo de desfazer

		// Atualiza a visualização dos rótulos na composição ativa (se houver)
		var aItem = app.project.activeItem;
		if (aItem instanceof CompItem) {
			var st = aItem.workAreaStart;      // Obtém o início da área de trabalho
			aItem.workAreaStart = st;          // Redefine o início da área de trabalho (força a atualização)

			// Itera pelas camadas e as (des)seleciona para forçar a atualização dos rótulos
			for (var l = 1; l <= aItem.numLayers; l++) {
				var aLayer = aItem.layer(l);      // Obtém a camada atual
				var sl = aLayer.selected;         // Obtém o estado de seleção da camada
				aLayer.selected = sl;             // Redefine o estado de seleção (força a atualização)
			}
		}
	};

	// Função executada quando o botão "setupDiskCacheBtn" é clicado.
	setupCacheBtn.onClick = function () {
		// Abre uma caixa de diálogo para o usuário selecionar a pasta de cache
		var newDiskCacheFolder = Folder.selectDialog("Selecione a pasta para o cache de disco:");

		// Verifica se o usuário selecionou uma pasta
		if (newDiskCacheFolder.exists) {
			var prefFile = PREFType.PREF_Type_MACHINE_SPECIFIC;  // Tipo de arquivo de preferências
			var sectionName = 'Disk Cache Controls';
			var keyName = 'Folder 7';
			var cachePath = newDiskCacheFolder.fsName;

			// Salva a pasta de cache nas preferências
			app.preferences.savePrefAsString(sectionName, keyName, cachePath, prefFile);

			app.preferences.saveToDisk(); // Salva as preferências no disco
			app.preferences.reload();     // Recarrega as preferências do After Effects
		}
	};

	// setupExportBtn.onClick = function () {
	// 	// var renderPrefsFilePath = '~/desktop/' + 'Adobe After Effects ' + appFullV + ' Prefs-indep-output.txt';

	// 	// // copyFile(renderPrefsFilePath, AEPreferencesPath);

	// 	// // var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;  // Tipo de arquivo de preferências

	// 	// // var new_data = {
	// 	// // 	"Format": 12,
	// 	// // 	"Channels": 1,
	// 	// // 	"Color": 0,
	// 	// // 	"Include Project Link": true,
	// 	// // 	"Output Audio": 2,
	// 	// // 	"Video Output": true
	// 	// // };

	// 	// var omItem1_settable_str = app.project.renderQueue.item(1).outputModule(1).getSettings( GetSettingsFormat.NUMBER_SETTABLE );

	// 	// saveTextFile(JSON.stringify(omItem1_settable_str, null, "\t"), '~/desktop/output2.txt');
	// 	// // app.project.renderQueue.item(1).outputModule(1).setSettings(new_data);
	// 	// // app.beginUndoGroup('Configuração de Rótulos de Camadas'); // Inicia um grupo de desfazer (undo)

	// 	// // Get object that contains all possible values of all render settings of
	// 	// // render queue item 1 and convert to JSON format.

	// 	// // var rqItem1_spec_str = app.project.renderQueue.item(1).outputModule(1).getSettings(GetSettingsFormat.SPEC);
	// 	// // var rqItem1_spec_str_json = rqItem1_spec_str.toSource();

	// 	// // app.preferences.saveToDisk(); // Salva as preferências no disco
	// 	// // app.preferences.reload();     // Recarrega as preferências do After Effects

	// 	// app.endUndoGroup();  // Finaliza o grupo de desfazer
	// };

	wPref.show();
}