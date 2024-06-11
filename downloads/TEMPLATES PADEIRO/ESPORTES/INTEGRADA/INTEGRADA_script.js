// esse script só pode ser executado pelo padeiro... 

var exportComp = createdTemplatesArray[0];
var logoArray = app.project.importFileWithDialog();
var iNum = app.project.numItems;
var logoComp;
var date = exportComp.name
	.replace(/[\|\\\/]/g, '-');
exportComp.name = 'PATROCINADORES FUT 2024';

for (var i = 1; i <= iNum; i++) {
	var comp = app.project.item(i);

	if (!(comp instanceof CompItem)) continue;
	if (!comp.comment.match(/^EDITAR/)) continue;
	if (comp.name != "LOGOS") continue;

	logoComp = comp;
}
if (logoComp != undefined) {

	for (var i = 1; i <= 8; i++) {
		var logoLayer = logoComp.layer(i);

		if (i > logoArray.length) {
			logoLayer.enabled = false;

		} else {
			var logoImg = logoArray[i - 1];

			logoLayer.replaceSource(logoImg, false);
		}
	}
	for (var t = 0; t < createdOutputModuleArray.length; t++) {
		outputFile = new File(templateData.outputPath + '/PATROCINADORES FUT 2024_' + date + '.mov');
		createdOutputModuleArray[t].file = outputFile;
	}
	if (logoArray.length == 7) exportComp.workAreaDuration = 14 + 5/30;
	if (logoArray.length == 6) exportComp.workAreaDuration = 12 + 19/30;

	logoComp.openInViewer();
	logoComp.time = 29/30;
}