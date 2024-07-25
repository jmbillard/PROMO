// esse script só pode ser executado pelo padeiro... 

for (var t = 0; t < createdTemplatesArray.length; t++) {
	var nameContent = createdTemplatesArray[t].layer(2).name.split(/\s+X\s+/i);

	try {
		createdTemplatesArray[t].layer(2).name = nameContent[0];
		createdTemplatesArray[t].layer(3).name = nameContent[1];

	} catch (err) { }
}
renamePromoComps(createdTemplatesArray);