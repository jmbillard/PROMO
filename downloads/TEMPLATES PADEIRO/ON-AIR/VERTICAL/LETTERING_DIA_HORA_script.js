// esse script só pode ser executado pelo padeiro... 

renamePromoComps(createdTemplatesArray);

for (var t = 0; t < createdOutputModuleArray.length; t++) {
	outputFile = new File(templateData.outputPath + '/' + createdTemplatesArray[t].name + '.png');
	createdOutputModuleArray[t].file = outputFile;
}
