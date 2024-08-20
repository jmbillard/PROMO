var scriptName = 'ABRIDOR';
var scriptVersion = '1.0';

function readFileContent(file) {
	var fileContent;

	file.open('r');
	fileContent = file.read();
	file.close();

	return fileContent.toString();
}

var structureFile = new File('~/Downloads/structuredData.json');
structureFile.encoding = 'UTF-8';
var structureContent = readFileContent(structureFile);
var structureObj = JSON.parse(structureContent);

function buildComps(structureObj) {

	app.beginUndoGroup('criar comps');

	if (!structureObj.elements) return;

	var currentPage = 0;
	var pageArray = [];
	var textArray = [];

	var compW = 1920;
	var compH = 1080;
	var compAspect = 1;
	var compDuration = 6;
	var compFPS = 29.97;

	var comp = app.project.items.addComp('tela ' + currentPage, compW, compH, compAspect, compDuration, compFPS);

	for (var i = 0; i < 10; i++) {

		var element = structureObj.elements[i];

		if (!element.Text) continue;

		var txt = element.Text;
		var page = element.Page;

		if (page != currentPage) {

			currentPage = page;
			comp = app.project.items.addComp('tela ' + currentPage, compW, compH, compAspect, compDuration, compFPS);
		}

		comp.layers.addText(txt);
	}
	// return textArray;
	app.endUndoGroup();

}

buildComps(structureObj);
// alert(testArray.join('\n'));