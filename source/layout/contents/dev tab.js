/* eslint-disable no-undef */

/*

---------------------------------------------------------------
> ⚙️ dev tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.dev;

var devGrp1 = currentGrp.add('group');
var binTxt = devGrp1.add('statictext', undefined, 'bin:', { name: 'label' , truncate: 'end'});
binTxt.maximumSize.width = 30;


var binBtn = devGrp1.add('iconbutton', iconSize, binIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
binBtn.helpTip = '◖ → binary converter and layer source code';

//---------------------------------------------------------

var devGrp2 = currentGrp.add('group');
var dTxt = devGrp2.add('statictext', undefined, 'dark:', { name: 'label' , truncate: 'end'});
dTxt.maximumSize.width = 30;

var dBtn = devGrp2.add('iconbutton', iconSize, darkIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
dBtn.helpTip = '◖ → convert .png to dark icon theme';

//---------------------------------------------------------

currentGrp.add('panel');
 

var devGrp3 = currentGrp.add('group');

var zipTxt1 = devGrp3.add('statictext', undefined, 'templates:', { name: 'label' , truncate: 'end'});
zipTxt1.maximumSize.width = 60;

var zipTemplatesBtn = devGrp3.add('iconbutton', iconSize, zipIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
zipTemplatesBtn.helpTip = '◖ → zip the templates folder';

var zipTxt2 = devGrp3.add('statictext', undefined, 'fonts:', { name: 'label' , truncate: 'end'});
zipTxt2.maximumSize.width = 30;

var zipFontsBtn = devGrp3.add('iconbutton', iconSize, zipIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
zipFontsBtn.helpTip = '◖ → zip the fonts folder';


/*

---------------------------------------------------------------
> ⚙️ dev tab events
---------------------------------------------------------------

*/

binBtn.onClick = function () {
	bin_ui();
};

//---------------------------------------------------------

zipTemplatesBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	// dev folder path '[user name]/PROMO'...
	var destPath = Folder.myDocuments.parent.toString() + '/PROMO';
	var devFolder = new Folder(destPath);

	if (templatesFolder.exists) {
		var templatesStr = templatesFolder.getFiles().toString();
		// replaces '[' at the start and ']' at the end...
		templatesStr = templatesStr.replace(/^\[|\]$/, '');
		templatesStr = templatesStr.replace(/,/g, '\', \'');
		templatesStr = decodeURI(templatesStr);

		if (!devFolder.exists) {
			// alternative path 1 'desktop'...
			destPath = Folder.desktop.toString();
		}

		var zipPath = destPath + '/templates.zip';
		zipContent(templatesStr, zipPath);
		openFolder(destPath);
	}
};

//---------------------------------------------------------

dBtn.onClick = function () {
	var iconArray = app.project.importFileWithDialog();
	var folderPath = decodeURI(iconArray[0].file.path);
	for (var i = 0; i < iconArray.length; i++) {
		try {
			var icon = iconArray[i];
			var compN = deleteFileExt(icon.name)
				.replace(/\s*(light)$/i, '');
			var compW = icon.width;
			var compH = icon.height;
  
			var comp = app.project.items.addComp(compN, compW, compH, 1, 1, 1);
			comp.bgColor = hexToRgb(sTxtColor.dark);
			var aLayer = comp.layers.add(icon);
			var effects = aLayer.property('ADBE Effect Parade');
			// fill effect...
			var fill = effects.addProperty('ADBE Fill');
			fill.property('ADBE Fill-0002').setValue(hexToRgb(sTxtColor.dark));
			var dIconFile = new File(folderPath + '/' + compN + ' dark.png');
  
			comp.saveFrameToPng(0, dIconFile);
			comp.remove();
			icon.remove();
  
		} catch (err) {
			alert(err.message);
		}
	}
	openFolder(folderPath);
};

//---------------------------------------------------------

zipFontsBtn.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	// dev folder path '[user name]/PROMO'...
	var destPath = Folder.myDocuments.parent.toString() + '/PROMO';
	var devFolder = new Folder(destPath);

	if (fontsFolder.exists) {
		var fontsStr = fontsFolder.getFiles().toString();
		// replaces '[' at the start and ']' at the end...
		fontsStr = fontsStr.replace(/^\[|\]$/, '');
		fontsStr = fontsStr.replace(/,/g, '\', \'');
		fontsStr = decodeURI(fontsStr);

		if (!devFolder.exists) {
			// alternative path 1 'desktop'...
			destPath = Folder.desktop.toString();
		}

		var zipPath = destPath + '/fonts.zip';
		zipContent(fontsStr, zipPath);
		openFolder(destPath);
	}
};
