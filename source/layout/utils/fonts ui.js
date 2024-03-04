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

// install fonts UI...
function fontsDialog() {
	// UI definition...
	var wFonts = new Window('dialog', 'font options...');
	// treeview...
	var tree = wFonts.add('treeview', [0, 0, 250, 380]);

	// creates all the 'treeview nodes'...
	buildFontTree(fontsFolder, tree);

	//---------------------------------------------------------

	// buttons group...
	var bGrp = wFonts.add('group');
	bGrp.orientation = 'stack';
	bGrp.alignment = 'fill';
	// left buttons group...
	var bGrp1 = bGrp.add('group');
	bGrp1.alignment = 'left';
	bGrp1.spacing = 2;
	// right buttons group...
	var bGrp2 = bGrp.add('group');
	bGrp2.alignment = 'right';
	// left buttons...
	var downloadBtn = bGrp1.add('iconbutton', iconSize, downloadIcon.light, { style: 'toolbutton' });
	downloadBtn.helpTip = '◖ → downloads the latest templates';
	var refreshBtn = bGrp1.add('iconbutton', iconSize, refreshIcon.light, { style: 'toolbutton' }); //bGroup.add('button', undefined, 'refresh');
	refreshBtn.helpTip = '◖ → refresh list content';
	var openFldBtn = bGrp1.add('iconbutton', iconSize, folderIcon.light, { style: 'toolbutton' }); //bGroup.add('button', undefined, 'refresh');
	openFldBtn.helpTip = '◖ → open fonts folder';
	// right buttons...
	var installBtn = bGrp2.add('button', undefined, 'install');
	installBtn.helpTip = '◖ → install selected fonts';
	installBtn.enabled = false; // → disable install button

	//---------------------------------------------------------

	tree.onChange = function () {
		// node folders should not be selectable...
		if (tree.selection != null && tree.selection.type == 'node') {
			tree.selection = null; // → clear selection
		}
		installBtn.enabled = tree.selection != null; // → enable | disable install button
	};

	//---------------------------------------------------------

	// expands every node from the start...
	wFonts.onShow = function () {
		expandNodes(tree);
	};

	//---------------------------------------------------------

	// font installation...
	installBtn.onClick = function () {
		var fontFamilyName = tree.selection.toString();
		var fontFamilyPath = fontsPath + '/' + fontFamilyName;
		var fontFamilyFolder = new Folder(fontFamilyPath);
		// checks if there is a system folder correspondent to the selection...
		if (!fontFamilyFolder.exists) {
			return;
		}
		// install the selected font family on Windows...
		if (appOs == 'Win') {
			installFonts(fontFamilyPath.toString());
		}
	};

	//---------------------------------------------------------

	// download and merge/overwrite files on the preferences font folder...
	downloadBtn.onClick = function () {
		// alert...
		if (!netAccess()) {
			alert('no network...  ' + lol);
			return;
		}
		var url = repoURL + '/raw/main/downloads/fonts.zip';
		var zipPath = tempPath + '/fonts.zip';
		var fontsLocalFolder = new Folder(fontsLocalPath);

		removeFolder(fontsLocalFolder); // → delete previous fonts folder
		fontsLocalFolder.create(); // → delete previous templates folder

		if (!tempFolder.exists) tempFolder.create();

		getURLContent([url], [tempPath]);
		unzipContent(zipPath, fontsLocalPath);
		removeFolder(tempFolder); // → delete temp folder

		// HO preference
		if (!homeOffice) {
			removeFolder(fontsFolder); // → delete previous templates folder
			fontsFolder.create(); // → delete previous templates folder
			copyFolderContent(fontsLocalPath, fontsPath);
		}
		buildFontTree(fontsFolder, tree);
		expandNodes(tree);
	};

	//---------------------------------------------------------

	refreshBtn.onClick = function () {
		// alert...
		if (!netAccess()) {
			alert('no access...  ' + lol);
			return;
		}
		buildFontTree(fontsFolder, tree);
		expandNodes(tree);
	};

	//---------------------------------------------------------

	openFldBtn.onClick = function () {
		// alert...
		if (!netAccess()) {
			alert('no access...  ' + lol);
			return;
		}
		if (!fontsFolder.exists) {
			fontsFolder.create();
		}
		openFolder(fontsPath);
	};

	wFonts.show();
}
