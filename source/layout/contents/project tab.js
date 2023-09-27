/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
> 🗃️ project tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.project;
var projSubGrp1 = currentGrp.add('group');

var projIdContent = 'PROJ ID';
var projIdTxt = projSubGrp1.add('edittext', undefined, projIdContent);
projIdTxt.maximumSize.width = 100;
projIdTxt.minimumSize.width = vMin;
projIdTxt.helpTip = projIdContent;

var saveBtn = projSubGrp1.add('iconbutton', iconSize, projOrgIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
saveBtn.helpTip = '◖ → criar estrutura _DEFAULT de pastas no sistema';

//---------------------------------------------------------

currentGrp.add('panel');

var projSubGrp2 = currentGrp.add('group');

// var renameItemSubGrp = projSubGrp2.add('group');
var renameItemBtn = projSubGrp2.add('iconbutton', iconSize, renameIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
renameItemBtn.helpTip = '◖ → renomear comps selecionadas\n◗ → renomear TODAS as comps';
// var renameItemLab = renameItemSubGrp.add('statictext', undefined, 'rename comps', { name: 'label' , truncate: 'end'});

// var projOrgSubGrp = projSubGrp2.add('group');
var projOrgBtn = projSubGrp2.add('iconbutton', iconSize, AEFoldersIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projOrgBtn.helpTip = '◖ → criar estrutura _DEFAULT de pastas no AE\n⦶ → tags de organização\n◗ → organização automática de projetos';
// var renameItemLab = projOrgSubGrp.add('statictext', undefined, 'organize proj.', { name: 'label' , truncate: 'end'});

//---------------------------------------------------------

currentGrp.add('panel');
 
var projSubGrp3 = currentGrp.add('group');

var collectFontsBtn = projSubGrp3.add('iconbutton', iconSize, fontCollectIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
collectFontsBtn.helpTip = '◖ → coletar fontes usadas no projeto';

var fldProjBtn2 = projSubGrp3.add('iconbutton', iconSize, projFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
fldProjBtn2.helpTip = '◖ → abir pasta do projeto';


getStaticTextLabels(tabsGrp.menu, []);
/*

---------------------------------------------------------------
> 🗃️ project tab events
---------------------------------------------------------------

*/

projIdTxt.onChange = projIdTxt.onEnterKey = function () {
	this.text = projId = this.text
		.replaceSpecialCharacters()
		.toUpperCase();

	if (projIdTxt.text != projIdContent) setXMPData('identifier', projId);
	if (this.text.trim() == '') this.text = projIdContent;
};

projIdTxt.addEventListener('focus', function () {
	this.text = this.text == projIdContent ? '' : this.text;
});

projIdTxt.addEventListener('blur', function () {
	this.text = this.text == '' ? projIdContent : this.text;
});

//---------------------------------------------------------

renameItemBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		// error...
		if (app.project.numItems == 0) {
			showTabErr('empty project');
			return;
		}
		app.beginUndoGroup('rename all comps');

		var dateStr = system
			.callSystem('cmd.exe /c date /t')
			.trim();

		setXMPData('creator', system.userName);
		setXMPData('date', dateStr);

		var compArray = getCompsAndTemplates();
		renamePromoComps(compArray);

		app.endUndoGroup();
	}
});

renameItemBtn.onClick = function () {
	// error...
	if (app.project.numItems == 0) {
		showTabErr('empty project');
		return;
	}
	app.beginUndoGroup('rename comps');

	var dateStr = system
		.callSystem('cmd.exe /c date /t')
		.trim();

	setXMPData('creator', system.userName);
	setXMPData('date', dateStr);

	var compArray = app.project.selection;

	// compArray = compArray.length > 0 ? compArray : getCompsAndTemplates();
	renamePromoComps(compArray);

	app.endUndoGroup();
};

//---------------------------------------------------------

projOrgBtn.addEventListener('click', function (c) {
	if (c.button == 1) {
		if (app.project.numItems == 0) return;
		tagDialog();
	}
});

projOrgBtn.onClick = function () {
	app.beginUndoGroup('create project folders');

	projectTemplateFolders(projectMode); // project folder structure...
	app.endUndoGroup();
};

projOrgBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		if (app.project.numItems == 0) return;

		var progressWindow = progressDialog('');
		var enterBtn = progressWindow.children[2].children[0];
		var cancelBtn = progressWindow.children[2].children[1];
		app.beginUndoGroup('organize project');

		enterBtn.onClick = progressWindow.onEnterKey = progressWindow.onShow = function () {
			deleteProjectFolders();
			populateProjectFolders(progressWindow);
			deleteEmptyProjectFolders();

			app.endUndoGroup();
			progressWindow.close();
		};

		cancelBtn.onClick = function () {
			progressWindow.close();
			app.endUndoGroup();

			executeCommandID('Undo organize project');
		};

		progressWindow.show();
	}
});

//---------------------------------------------------------

saveBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		alert(wip);
	}
});

collectFontsBtn.onClick = function () {
	var dateStr = system
		.callSystem('cmd.exe /c date /t')
		.trim();

	setXMPData('creator', system.userName);
	setXMPData('date', dateStr);

	if (app.project.numItems == 0) return;

	var currentProj = app.project.file;
	var currentProjPath = new Folder(decodeURI(currentProj.path)).path;

	fontCollect(currentProjPath);
	
	openFolder(currentProjPath);
};

saveBtn.onClick = function () {
	var dateStr = system
		.callSystem('cmd.exe /c date /t')
		.trim();

	setXMPData('creator', system.userName);
	setXMPData('date', dateStr);

	var selectedFolder = homeOffice ? Folder.selectDialog() : new Folder(projRJ).selectDlg();

	if (selectedFolder == null) return;

	var saveFolder = new Folder(decodeURI(selectedFolder.fullName) + '/' + projId);
	if (!saveFolder.exists) saveFolder.create();

	var savePath = decodeURI(saveFolder.fullName);

	var pathArray = [
		savePath + '/01 PROJETOS/',
		savePath + '/02 ARQUIVOS/',
		savePath + '/02 ARQUIVOS/FONT/',
		savePath + '/02 ARQUIVOS/IMAGENS/',
		savePath + '/02 ARQUIVOS/VIDEOS/',
		savePath + '/03 BOARDS/',
		savePath + '/04 REFs/',
		savePath + '/05 SAIDA/',
		savePath + '/06 EXTERNOS/'
	];
	for (var i = 0; i < pathArray.length; i++) {
		var path = pathArray[i];
		var nFolder = new Folder(path);
		if (!nFolder.exists) nFolder.create();
	}

	projFile = new File(savePath + '/01 PROJETOS/' + projId);
	app.project.save(projFile);
	
	openFolder(savePath);
	// setClipboard(savePath.replace(/^~\//, '').replace(/\//g, '\\'));

	if (appV > 22 && saveAsV22) {
		executeCommandID('Save a Copy As 22.x...');
	}
};

//---------------------------------------------------------

fldProjBtn2.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var currentProj = app.project.file;
	var currentProjPath = decodeURI(currentProj.path);
	var fld =  new Folder(currentProjPath);

	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(decodeURI(fld.fullName));
};
