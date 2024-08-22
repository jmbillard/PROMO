var scriptName = 'ABRIDOR';
var scriptVersion = '1.0';

function readFileContent(file) {
	var fileContent;

	file.open('r');
	fileContent = file.read();
	file.close();

	return fileContent.toString();
}

function buildComps(structureObj) {

	app.beginUndoGroup('criar comps');

	if (!structureObj.elements) return;

	var currentPage = 0;
	var pageArray = [];
	var textArray = [];

	var compW = structureObj.pages[currentPage].width;
	var compH = structureObj.pages[currentPage].height;
	var compAspect = 1;
	var compDuration = 6;
	var compFPS = 29.97;

	var comp = app.project.items.addComp('tela ' + currentPage, compW, compH, compAspect, compDuration, compFPS);

	for (var i = 0; i < structureObj.elements.length; i++) {

		var element = structureObj.elements[i];

		if (!element.Text) continue;

		var page = element.Page;
		var bounds = element.Bounds;

		if (page != currentPage) {
			currentPage = page;
			comp = app.project.items.addComp('tela ' + currentPage, compW, compH, compAspect, compDuration, compFPS);
		}

		var currentText = comp.layers.addBoxText([bounds[2] - bounds[0], bounds[3] - bounds[1]]);

		var textProp = currentText.property("ADBE Text Properties").property("ADBE Text Document");
		var textDoc = textProp.value;
		textDoc.resetCharStyle();

		var txtProp = {
			text: element.Text,
			fontSize: element.TextSize,
			justification: 7413,
			tracking: 0
		};
		if (element.attributes.TextAlign == 'Center') txtProp.justification = 7415;
		if (element.attributes.TextAlign == 'End') txtProp.justification = 7414;
		if (element.attributes.LineHeight != undefined) txtProp.leading = element.attributes.LineHeight;

		for (var p in txtProp) {
			textDoc[p] = txtProp[p];
			textProp.setValue(textDoc);
		}

		try {
			textDoc.font = element.Font.name.replace(/^.+\+/, '');
			textProp.setValue(textDoc);
		} catch (err) {
			textDoc.font = 'TimesNewRomanPSMT';
			textProp.setValue(textDoc);
		}

		// transformations...
		var transform = currentText.property('ADBE Transform Group');
		var pos = [bounds[0] + (bounds[2] - bounds[0]) / 2, compH - bounds[1] - (bounds[3] - bounds[1]) / 2, 0];
		transform.property('ADBE Position').setValue(pos);

		currentText.moveToEnd();
	}
	app.endUndoGroup();
}

var structureFile = File.openDialog('selecione o arquivo de estrutura', "*.json", false);

if (structureFile != null) {
	structureFile.encoding = 'UTF-8';
	var structureContent = readFileContent(structureFile);
	var structureObj = JSON.parse(structureContent);

	buildComps(structureObj);
}