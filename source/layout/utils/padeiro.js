// replaces most of the special characters...
String.prototype.replaceSpecialCharacters = function () {

	return this.replace(/À|Á|Â|Ã|Ä|\u00C0|\u00C1|\u00C2|\u00C3|\u00C4/g, 'A')
		.replace(/à|á|â|ã|ä|\u00E0|\u00E1|\u00E2|\u00E3|\u00E4/g, 'a')
		.replace(/È|É|Ê|Ë|\u00C8|\u00C9|\u00CA|\u00CB/g, 'E')
		.replace(/è|é|ê|ë|\u00E8|\u00E9|\u00EA|\u00EB/g, 'e')
		.replace(/Ì|Í|Î|Ï|\u00CC|\u00CD|\u00CE|\u00CF/g, 'I')
		.replace(/ì|í|î|ï|\u00EC|\u00ED|\u00EE|\u00EF/g, 'i')
		.replace(/Ò|Ó|Ô|Õ|Ö|\u00D2|\u00D3|\u00D4|\u00D5|\u00D6/g, 'O')
		.replace(/ò|ó|ô|õ|ö|\u00F2|\u00F3|\u00F4|\u00F5|\u00F6/g, 'o')
		.replace(/Ù|Ú|Û|Ü|\u00D9|\u00DA|\u00DB|\u00DC/g, 'U')
		.replace(/ù|ú|û|ü|\u00F9|\u00FA|\u00FB|\u00FC/g, 'u')
		.replace(/Ç|\u00C7/g, 'C')
		.replace(/ç|\u00E7/g, 'c')
		.replace(/\n|\r/g, ' ') // replaces line breaks...
		.replace(/\||-|\_|:/g, ' ')
		.replace(/\s{2,}/g, ' ') // replaces 2 or more spaces...
		.replace(/[^\w\s—]/ig, '') // replaces any non-word character except space...
		.trim();
};

// -----------------------------------------------------------------------------------------------

function padeiro_ui() {

	var coolBlue = [0.23, 0.74, 1];
	var offWhite = [0.95, 0.95, 0.95];
	var hasData = false;
	var wPadeiro = new Window('palette', 'padeiro...');
	wPadeiro.alignChildren = 'fill';

	// botões e spacers
	var stcTxt = wPadeiro.add('statictext', [0, 0, 300, 15], '', { truncate: 'end' });
	var edtText = wPadeiro.add('edittext', [0, 0, 300, 400], '', { multiline: true });
	var progressBarBin = wPadeiro.add('progressbar', [0, 0, 300, 5], 0, 100);
	var btnGrp = wPadeiro.add('group');
	btnGrp.alignment = 'center';

	var evalBtn = btnGrp.add('iconbutton', undefined, evalIcon, { style: 'toolbutton' });
	evalBtn.helpTip = '◖ → run data';

	var pType = stcTxt.graphics.PenType.SOLID_COLOR;
	var bType = wPadeiro.graphics.BrushType.SOLID_COLOR;

	stcTxt.graphics.foregroundColor = stcTxt.graphics.newPen(pType, coolBlue, 1);
	wPadeiro.graphics.backgroundColor = wPadeiro.graphics.newBrush(bType, offWhite);

	// eventos
	wPadeiro.onShow = function () {
		btnGrp.layout.layout(true);
		evalBtn.enabled = false;
	};

	edtText.onChanging = function () {

		hasData = (edtText.text.trim() != '');
		evalBtn.enabled = hasData;
	};

	evalBtn.onClick = function () {
		app.beginUndoGroup('padeiro...');

		if (edtText.text.trim() == '') return;

		var nameList = edtText.text
			.split(/[\n\r]{2,}/);

		progressBarBin.maxvalue = nameList.length;

		var iNum = app.project.numItems;
		var rdpTemplateName = 'RDP - TARJA';
		
		for (var i = 1; i <= iNum; i++) {
			var comp = app.project.item(i);
			
			if (!(comp instanceof CompItem)) continue;
			if (comp.name != rdpTemplateName) continue;
				
			for (var n = 0; n < nameList.length; n++) {
				var rdpName = nameList[n];
		
				var rdp = comp.duplicate();
				rdp.name = 'RDP - ' + rdpName
					.toUpperCase()
					.replaceSpecialCharacters();
		
				var nameLayer = rdp.layer(4);
		
				if (!(nameLayer instanceof TextLayer)) continue;
		
				var text = nameLayer.property('ADBE Text Properties');
				var textDoc = text.property('ADBE Text Document').value;
				
				textDoc.text = rdpName;
		
				text.property('ADBE Text Document').setValue(textDoc);
				rdp.openInViewer();
				rdp.time = 2;
			}
			// comp.remove();
			break;
		}
		
		app.endUndoGroup();
	};

	wPadeiro.show();
}

padeiro_ui();
