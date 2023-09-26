/* eslint-disable no-with */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*
 
---------------------------------------------------------------
> 🔗 links tab
---------------------------------------------------------------
 
*/

currentGrp = tabsGrp.shortcuts;

var linksSubGrp1 = currentGrp.add('group');

var linkTxt1 = linksSubGrp1.add('statictext', undefined, 'sites:', { name: 'label' , truncate: 'end'});
linkTxt1.maximumSize.width = 30;

var oneDriveBtn = linksSubGrp1.add('iconbutton', iconSize, oneDriveIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
oneDriveBtn.helpTip = 'OneDrive globo';

//---------------------------------------------------------

// var linksSubGrp3 = currentGrp.add('group');
var trelloBtn = linksSubGrp1.add('iconbutton', iconSize, trelloIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
trelloBtn.helpTip = 'trello teste board';
// trelloBtn.enabled = false;

//---------------------------------------------------------

currentGrp.add('panel');
 
var linksSubGrp2 = currentGrp.add('group');

var linkTxt2 = linksSubGrp2.add('statictext', undefined, 'folders:', { name: 'label' , truncate: 'end'});
linkTxt2.maximumSize.width = 40;

var projRJBtn = linksSubGrp2.add('iconbutton', iconSize, projRJFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projRJBtn.helpTip = 'projects RJ';
projRJBtn.enabled = !homeOffice;

var outRJBtn = linksSubGrp2.add('iconbutton', iconSize, outRJFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
outRJBtn.helpTip = 'output RJ';
outRJBtn.enabled = !homeOffice;

//---------------------------------------------------------

var projSPBtn = linksSubGrp2.add('iconbutton', iconSize, projSPFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projSPBtn.helpTip = 'projects SP';
projSPBtn.enabled = !homeOffice;

var outSPBtn = linksSubGrp2.add('iconbutton', iconSize, outSPFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
outSPBtn.helpTip = 'output SP';
outSPBtn.enabled = !homeOffice;

//---------------------------------------------------------

var inFtgBtn = linksSubGrp2.add('iconbutton', iconSize, inFtgFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
inFtgBtn.helpTip = 'editors export folder';
outSPBtn.enabled = !homeOffice;


/*
  
---------------------------------------------------------------
> 🔗 links tab events
---------------------------------------------------------------

*/

oneDriveBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var site = 'https://tvglobocorp-my.sharepoint.com/';

	openWebSite(site);
};

//---------------------------------------------------------

trelloBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var site = 'https://trello.com/b/wGakrIDP/board-de-teste';

	openWebSite(site);
};

//---------------------------------------------------------

//---------------------------------------------------------

outRJBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var fld = new Folder(outRJ);
	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(outRJ);
};

//---------------------------------------------------------

projRJBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var fld = new Folder(projRJ);
	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(projRJ);
};

//---------------------------------------------------------

outSPBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var fld = new Folder(outSP);
	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(outSP);
};

//---------------------------------------------------------

projSPBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var fld = new Folder(projSP);
	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(projSP);
};

inFtgBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' not checked');
		return;
	}
	var fld = new Folder(inFtg);
	if (!fld.exists) {
		showTabErr('this folder is not accessible...');
		return;
	}
	openFolder(inFtg);
};