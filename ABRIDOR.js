var scriptName = 'ABRIDOR';
var scriptVersion = '1.0';

function readFileContent(file) {
	var fileContent;

	file.open('r');
	file.encoding = 'UTF-8'; // → file encoding
	fileContent = file.read();
	file.close();

	return fileContent.toString();
}

function buildComp(structureObj, imagesArray) {

	app.beginUndoGroup('criar comp de abertura');

	if (!structureObj.elements) return;
	if (!structureObj.extended_metadata.page_count) return;

	var pageCount = structureObj.extended_metadata.page_count;
	var textArray = [];

	var compDuration = 60; // em segundos
	var compW = 1920;
	var compH = 1080;
	var compAspect = 1;
	var compFPS = 29.97;
	var comp = app.project.items.addComp('LAYOUT ABERTURA', compW, compH, compAspect, compDuration, compFPS);
	var f = 1;

	var layerDuration = compDuration / pageCount;
	var layerInPoint;
	var layerOutPoint;

	for (var i = 0; i < structureObj.elements.length; i++) {

		var element = structureObj.elements[i];

		if (!element.Text) continue;
		if (element.Path.match(/Figure/i)) continue;

		// alert (element.Text);
		var page = element.Page;
		var bounds = element.Bounds;
		var pageW = structureObj.pages[page].width;
		var pageH = structureObj.pages[page].height;
		var fW = compW / pageW;
		var fH = compH / pageH;
		f = Math.min(fW, fH);

		var currentText = comp.layers.addBoxText([(bounds[2] - bounds[0]) * fW, (bounds[3] - bounds[1]) * fH]);

		var textProp = currentText.property("ADBE Text Properties").property("ADBE Text Document");
		var textDoc = textProp.value;
		textDoc.resetCharStyle();

		var txtProp = {
			text: element.Text,
			fontSize: element.TextSize * f,
			justification: 7413,
			tracking: 0
		};
		if (element.attributes.TextAlign == 'Center') txtProp.justification = 7415;
		if (element.attributes.TextAlign == 'End') txtProp.justification = 7414;
		if (element.attributes.LineHeight != undefined) txtProp.leading = element.attributes.LineHeight * fH;

		for (var p in txtProp) {

			textDoc[p] = txtProp[p];
			textProp.setValue(textDoc);
		}

		try {
			textDoc.font = element.Font.name.replace(/^.+\+/, '');
			textProp.setValue(textDoc);
		} catch (err) {
			textDoc.font = 'ArialMT';
			textProp.setValue(textDoc);
			textDoc.fontSize *= 0.8;
			textProp.setValue(textDoc);
		}

		// transformations...
		var transform = currentText.property('ADBE Transform Group');

		var posX = (bounds[0] + (bounds[2] - bounds[0]) / 2) * fW;
		var posY = (pageH - bounds[1] - (bounds[3] - bounds[1]) / 2) * fH;
		transform.property('ADBE Position').setValue([posX, posY, 0]);

		currentText.moveToEnd();

		layerInPoint = page * layerDuration;
		layerOutPoint = layerInPoint + layerDuration;
		currentText.inPoint = layerInPoint;
		currentText.outPoint = layerOutPoint;
		textArray.push(currentText);
	}

	var refFolder = app.project.items.addFolder('ABERTURA REF'); // Cria uma pasta no projeto.
	// alert(f);

	for (var l = 0; l < imagesArray.length; l++) {

		imagesArray[l].parentFolder = refFolder; // Move o novo logo para a pasta criada anteriormente.
		var refImage = comp.layers.add(imagesArray[l]);
		refImage.moveToEnd();
		f = compW / refImage.width * 100;

		var transform = refImage.property('ADBE Transform Group');
		transform.property('ADBE Scale').setValue([f, f, f]);
		layerInPoint = l * layerDuration;
		layerOutPoint = layerInPoint + layerDuration;

		refImage.inPoint = layerInPoint;
		refImage.outPoint = layerOutPoint;
		refImage.guideLayer = true;
		refImage.locked = true;
	}
	comp.openInViewer();

	app.endUndoGroup();
}

var structureFile = File.openDialog('selecione o arquivo de estrutura', "*.json", false);
var refImagesArray = app.project.importFileWithDialog();

if (structureFile != null) {
	var structureContent = readFileContent(structureFile);
	var structureObj = JSON.parse(structureContent);

	app.project.setDefaultImportFolder(structureFile.parent);

	buildComp(structureObj, refImagesArray);
}