
/*
 
---------------------------------------------------------------
> 🔗 links tab
---------------------------------------------------------------
 
*/

currentGrp = tabsGrp.shortcuts;

// Grupo para os links de sites
var linksSubGrp1 = currentGrp.add('group');

// Texto para o grupo de links de sites
var linkTxt1 = linksSubGrp1.add('statictext', undefined, 'sites:', { name: 'label' , truncate: 'end'});
linkTxt1.maximumSize.width = 30;

// Botão para abrir o OneDrive Globo
var oneDriveBtn = linksSubGrp1.add('iconbutton', iconSize, oneDriveIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
oneDriveBtn.helpTip = 'OneDrive globo';

// Botão para abrir o Trello de testes
var trelloBtn = linksSubGrp1.add('iconbutton', iconSize, trelloIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
trelloBtn.helpTip = 'trello teste board';

// Painel para separar os grupos
currentGrp.add('panel');
 
// Grupo para os links de pastas
var linksSubGrp2 = currentGrp.add('group');

// Texto para o grupo de links de pastas
var linkTxt2 = linksSubGrp2.add('statictext', undefined, 'folders:', { name: 'label' , truncate: 'end'});
linkTxt2.maximumSize.width = 40;

// Botão para abrir a pasta de projetos RJ
var projRJBtn = linksSubGrp2.add('iconbutton', iconSize, projRJFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projRJBtn.helpTip = 'pasta de projetos RJ';
projRJBtn.enabled = !homeOffice;

// Botão para abrir a pasta de output RJ
var outRJBtn = linksSubGrp2.add('iconbutton', iconSize, outRJFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
outRJBtn.helpTip = 'pasta de output RJ';
outRJBtn.enabled = !homeOffice;

// Botão para abrir a pasta de projetos SP
var projSPBtn = linksSubGrp2.add('iconbutton', iconSize, projSPFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projSPBtn.helpTip = 'pasta de projetos SP';
projSPBtn.enabled = !homeOffice;

// Botão para abrir a pasta de output SP
var outSPBtn = linksSubGrp2.add('iconbutton', iconSize, outSPFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
outSPBtn.helpTip = 'pasta de output SP';
outSPBtn.enabled = !homeOffice;

// Botão para abrir a pasta de export dos editores
var inFtgBtn = linksSubGrp2.add('iconbutton', iconSize, inFtgFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
inFtgBtn.helpTip = 'pasta de export dos editores';
outSPBtn.enabled = !homeOffice;

/*
  
---------------------------------------------------------------
> 🔗 links tab events
---------------------------------------------------------------

*/

oneDriveBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var site = 'https://tvglobocorp-my.sharepoint.com/';

	openWebSite(site);
};

//---------------------------------------------------------

trelloBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var site = 'https://trello.com/b/pV4FOa2J/fluxo-design-promo';

	openWebSite(site);
};

//---------------------------------------------------------

//---------------------------------------------------------

outRJBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var fld = new Folder(outRJ);
	if (!fld.exists) {
		showTabErr('esta pasta não foi encontrada...');
		return;
	}
	openFolder(outRJ);
};

//---------------------------------------------------------

projRJBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var fld = new Folder(projRJ);
	if (!fld.exists) {
		showTabErr('esta pasta não foi encontrada...');
		return;
	}
	openFolder(projRJ);
};

//---------------------------------------------------------

outSPBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var fld = new Folder(outSP);
	if (!fld.exists) {
		showTabErr('esta pasta não foi encontrada...');
		return;
	}
	openFolder(outSP);
};

//---------------------------------------------------------

projSPBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var fld = new Folder(projSP);
	if (!fld.exists) {
		showTabErr('esta pasta não foi encontrada...');
		return;
	}
	openFolder(projSP);
};

inFtgBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var fld = new Folder(inFtg);
	if (!fld.exists) {
		showTabErr('esta pasta não foi encontrada...');
		return;
	}
	openFolder(inFtg);
};