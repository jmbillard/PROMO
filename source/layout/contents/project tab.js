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

var projFoldersBtn = projSubGrp1.add('iconbutton', iconSize, projOrgIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projFoldersBtn.helpTip = '◖ → criar estrutura de pastas no sistema\n\
abre a janela de seleção de pastas no\
drive L para escolher onde criar a\
estrutura do projeto no sistema.\n\
◗ → criar estrutura de pastas no AE';

//---------------------------------------------------------

currentGrp.add('panel');

var projSubGrp2 = currentGrp.add('group');

// var renameItemSubGrp = projSubGrp2.add('group');
var renameItemBtn = projSubGrp2.add('iconbutton', iconSize, renameIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
renameItemBtn.helpTip = '◖ → renomear comps selecionadas\
◗ → renomear TODAS as comps\n\
remove caracteres especiais,\
formata horários e transforma\
tudo para caixa alta.\
usa o nome da comp para aplicar\
tags de organização predeterminadas.';
// var renameItemLab = renameItemSubGrp.add('statictext', undefined, 'rename comps', { name: 'label' , truncate: 'end'});

// var projOrgSubGrp = projSubGrp2.add('group');
var projOrgBtn = projSubGrp2.add('iconbutton', iconSize, AEFoldersIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projOrgBtn.helpTip = '◖ → organização automática de projetos\n\
organiza o projeto usando as tags de organização.\n\
◗ → tags de organização\
abre a janela de tags para aplicar';
// var renameItemLab = projOrgSubGrp.add('statictext', undefined, 'organize proj.', { name: 'label' , truncate: 'end'});

//---------------------------------------------------------

currentGrp.add('panel');

var projSubGrp3 = currentGrp.add('group');

var collectFontsBtn = projSubGrp3.add('iconbutton', iconSize, fontCollectIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
collectFontsBtn.helpTip = '◖ → coletar fontes usadas no projeto\n\
copia todas as fontes usadas no projeto\
para a pasta de fontes';

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

	renamePromoComps(compArray);

	app.endUndoGroup();
};

//---------------------------------------------------------

projOrgBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		if (app.project.numItems == 0) return;

		tagDialog();
	}
});

projOrgBtn.onClick = function () {
	app.beginUndoGroup('create project folders');

	deleteProjectFolders();
	populateProjectFolders();
	deleteEmptyProjectFolders();

	app.endUndoGroup();
};

projFoldersBtn.addEventListener('click', function (c) {
	if (c.button == 2) {

		projectTemplateFolders(projectMode); // project folder structure...
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

	var fontsPath = fontCollect(currentProjPath);

	openFolder(fontsPath);
};

projFoldersBtn.onClick = function () {
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
	var fld = new Folder(currentProjPath);

	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(decodeURI(fld.fullName));
};
