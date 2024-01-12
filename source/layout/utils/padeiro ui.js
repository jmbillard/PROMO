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

//
function readFileContent(file) {
	var fileContent;

	file.open('r');
	fileContent = file.read();
	file.close();

	return fileContent.toString();
}

var exJSON = {
	exemplo: 'nome sobrenome',

	name: 'ALTAS HORAS',
	comp: 'RDP - TARJA TEMPLATE',
	type: 'RDP',
	inputs: [
		{layerIndex: 4, method: 'textContent'}
	],

	outputPath: 'local do output',
	projectPath: 'pasta do projeto'
};


var evalIcon = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1F\x00\x00\x00\x1F\b\x06\x00\x00\x00\x1F\u00AE\x169\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00CEIDATH\u0089\u00ED\u0096\r\r\u00C3 \x10\u0085\u00DF\u009B\x02$TB% a\x12&a\x12*\u00A1\x12*a\x12*a\x12&\u00A1\x0EXH !\f\u00D6\u00B5\u0094\u0092,w\u00C9K\u00E8\x0F\u00F9\u00EE\u00B8;r4\u00C6\u00A0\u0095]\u009A\u0091\x05.p\u00817\u0085\u0093T$\x1FN}5\u00BA\u00BD\u00E1b\x01x\u00DAO\u0081F\x00*\u00F5o\u0089rp\x0F^\u00A2\u00F5\u00FDL\u00B8\x020D\u00A7\u00F0\x02\u00A0\u00AB\u00C3\u0083\u00E7\x0E\u00C0\x1C91\u0097\u00A6\u00E2\'x\u00F0^\u00BB\u00C8\u00BD\x03\u00B7\x12\u00F8\u00D6V\u00EB\\*\u00AAV{|\u00EC:\u00D5\x01\u00B5\x0B\u00CEF:%r\u00DD\u009F\u00DDj6\u00D7\u00D7#\u00A0k\u00F0)r`8\x12\u00EA\u0095\u009D\u00E1H\u008Eni\u00C1\u00CBZ\u00ED\u0090\u00FC:\f\x1Ac\u00F8\u00B1\'\x07\u00DFjM\u00E1{L\u0086\t\u0081\x0B\u00FC\u00CF\u00E1\x00\u00DE\u00B7X\u00C9\u0096>o\u00F1g\x00\x00\x00\x00IEND\u00AEB`\u0082';

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
	var progressBarPadeiro = wPadeiro.add('progressbar', [0, 0, 300, 5], 0, 100);
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

		var JSONfile = new File('O:/REDE - PROMO/templates/TEMPLATES PADEIRO/ALTAS HORAS/ALTAS HORAS.json');
		var JSONContent = readFileContent(JSONfile); // → JSON string
		var templateData;
		try {
			// evaluate JSON content...
			templateData = JSON.parse(JSONContent); // → preferencesObject
		} catch (err) {
			// error: invalid JSON content...
			alert('template data failed to load... Σ(っ °Д °;)っ\n' + err.message);
			return;
		}

		if (edtText.text.trim() == '') return;

		var inputList = edtText.text
			.split(/[\n\r]{2,}/);

		progressBarPadeiro.value = 0;
		progressBarPadeiro.maxvalue = inputList.length;

		var templateFile = new File('O:/REDE - PROMO/templates/TEMPLATES PADEIRO/ALTAS HORAS/ALTAS HORAS.aet'); // → template file object
		var IO = new ImportOptions(templateFile); // import options...

		app.project.importFile(IO); // → import template project

		var iNum = app.project.numItems;

		for (var i = 1; i <= iNum; i++) {
			var comp = app.project.item(i);

			if (!(comp instanceof CompItem)) continue;
			if (!comp.comment.match(/^TEMPLATE/)) continue;
			if (comp.name != templateData.template.comp) continue;

			for (var n = 0; n < inputList.length; n++) {
				var templateName = templateData.template.type + ' - ' + inputList[n].replaceSpecialCharacters();

				var template = comp.duplicate();
				template.name = templateName
					.toUpperCase();
				var inputIndexList = templateData.template.input;
				var txtList = inputList[n].split(/[\n\r]-+[\n\r]/);

				for (var l = 0; l < inputIndexList.length; l++) {
					var inputLayer = template.layer(inputIndexList[l]);

					if (!(inputLayer instanceof TextLayer)) continue;

					var txt = txtList[l];
					var text = inputLayer.property('ADBE Text Properties');
					var textDoc = text.property('ADBE Text Document').value;

					textDoc.text = txt;
					text.property('ADBE Text Document').setValue(textDoc);
				}
				template.openInViewer();
				template.time = 2;
				progressBarPadeiro.value++;
			}
			comp.remove();
			break;
		}

		app.endUndoGroup();
	};

	wPadeiro.show();
}

padeiro_ui();
