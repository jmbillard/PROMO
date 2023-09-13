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

// var insertUserIdBtn = projSubGrp1.add('iconbutton', iconSize, addIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
// insertUserIdBtn.helpTip = 'insert user with ' + projIdContent;

// var projNameTxt = projSubGrp1.add('edittext', undefined, '');
// projNameTxt.maximumSize.width = 100;
// projNameTxt.minimumSize.width = vMin;
// projNameTxt.helpTip = 'project name';
// projNameTxt.enabled = false;
// projNameTxt.visible = false;
//---------------------------------------------------------

// currentGrp.add('panel');

var renameItemBtn = projSubGrp1.add('iconbutton', iconSize, applyIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
renameItemBtn.helpTip = '◖ → rename selected comps\n◗ → rename all comps\n\nALL CAPS and removes special characters';

var projOrgBtn = projSubGrp1.add('iconbutton', iconSize, projOrgIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projOrgBtn.helpTip = '◖ → create AE project folders\n⦶ → organization tags\n◗ → organize project';

//---------------------------------------------------------

// currentGrp.add('panel');
 

// // end page presets UI button...
// var endPagePresetBtn = currentGrp.add('iconbutton', iconSize, endPagePresetIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
// endPagePresetBtn.helpTip = 'end page JSON presets';
// endPagePresetBtn.enabled = false;

//---------------------------------------------------------

currentGrp.add('panel');
 
var projSubGrp2 = currentGrp.add('group');

var projFoldersTogBtn = projSubGrp2.add('iconbutton', iconTogSize, fldTogIcon[iconTheme], { name: 'btn', style: 'toolbutton', toggle: 1 });
projFoldersTogBtn.helpTip = '⦿ → create _DEFAULT project system folders';

var collectFontsTogBtn = projSubGrp2.add('iconbutton', iconTogSize, txtTogIcon[iconTheme], { name: 'btn', style: 'toolbutton', toggle: 1 });
collectFontsTogBtn.helpTip = '⦿ → collect fonts';

var saveBtn = projSubGrp2.add('iconbutton', iconSize, saveIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
saveBtn.helpTip = '◖ → save project';

//---------------------------------------------------------

currentGrp.add('panel');
 
var projSubGrp3 = currentGrp.add('group');

var fldProjBtn2 = projSubGrp3.add('iconbutton', iconSize, projFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
fldProjBtn2.helpTip = '◖ → open current project folder';

/*

---------------------------------------------------------------
> 🗃️ project tab events
---------------------------------------------------------------

*/

projIdTxt.onChange = projIdTxt.onEnterKey = function () {
	this.text = projId = this.text
		.replaceSpecialCharacters()
		.toUpperCase();

	if (projIdTxt.text != projIdContent) setXMPdata('identifier', projId);
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

		setXMPdata('creator', system.userName);
		setXMPdata('date', dateStr);

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

	setXMPdata('creator', system.userName);
	setXMPdata('date', dateStr);

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
	projectTemplateFolders(projectMode); // project folder structure...
}

projOrgBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		if (app.project.numItems == 0) return;

		var progressWindow = progressDialog('organize project...');
		var enterBtn = progressWindow.children[2].children[0];
		var cancelBtn = progressWindow.children[2].children[1];
		app.beginUndoGroup('organize project');

		progressWindow.onShow = enterBtn.onClick = progressWindow.onEnterKey = function () {
			deleteProjectFolders();
			populateProjectFolders(progressWindow);
			deleteEmptyProjectFolders();

			app.endUndoGroup();
			progressWindow.close();
		};

		cancelBtn.onClick = function () {
			progressWindow.close();
			app.endUndoGroup();

			alert('escaping...');
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

saveBtn.onClick = function () {
	var dateStr = system
		.callSystem('cmd.exe /c date /t')
		.trim();

	setXMPdata('creator', system.userName);
	setXMPdata('date', dateStr);

	if (app.project.numItems == 0) return;

	var escape = false;
	var selectedFolder = Folder.selectDialog();

	if (selectedFolder == null) return;

	var saveFolder = new Folder(decodeURI(selectedFolder.fullName) + '/' + projId);
	if (!saveFolder.exists) saveFolder.create();

	var savePath = decodeURI(saveFolder.fullName);

	if (projFoldersTogBtn.value) {
		var pathArray = [
			savePath + '/01 PROJETOS',
			savePath + '/02 ARQUIVOS/FONT',
			savePath + '/02 ARQUIVOS/IMAGENS',
			savePath + '/02 ARQUIVOS/VIDEOS',
			savePath + '/03 BOARDS',
			savePath + '/04 REFs',
			savePath + '/05 SAIDA',
			savePath + '/06 EXTERNOS'
		];
		for (var i = 0; i < pathArray.length; i++) {
			var path = pathArray[i];
			createPathFolders(path);
		}
	}
	if (escape) return;

	if (collectFontsTogBtn.value) fontCollect(savePath);

	var projFolder = new Folder(savePath + '/01 PROJETOS/');
	if (!projFolder.exists) projFolder.create();

	projFile = new File(savePath + '/01 PROJETOS/' + projId);
	app.project.save(projFile);
	
	openFolder(savePath);
	setClipboard(savePath.replace(/^~\//, '').replace(/\//g, '\\'));

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
