// esse script só pode ser executado pelo padeiro... 

for (var t = 0; t < createdTemplatesArray.length; t++) {
	var nameContent = createdTemplatesArray[t].layer(2).name.split(/\s+X\s+/i);

	try {
		createdTemplatesArray[t].layer(2).name = nameContent[0];
		createdTemplatesArray[t].layer(3).name = nameContent[1];

	} catch (err) { }
}
renamePromoComps(createdTemplatesArray);

var outputPathArray = templateData.outputPath;
// Redefine o arquivo de saída para cada módulo de saída.
for (var t = 0; t < createdOutputModuleArray.length; t++) {
	var o = t % outputPathArray.length;

	var comp = createdTemplatesArray[t];
	var pathIncrement = textContent(comp.layer(7)).replaceSpecialCharacters();
	var newPath = outputPathArray[o] + '/' + pathIncrement;

	createPathFolders(newPath);

	var newOutputFile = new File(newPath +'/[compName].[fileextension]'); // -> PATROCINADORES FUT 2024_11-06 a 16-06
	createdOutputModuleArray[t].file = newOutputFile;
}
