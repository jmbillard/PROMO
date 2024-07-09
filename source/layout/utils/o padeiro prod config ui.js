/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function PAD_CONFIG_Dialog(prodArray) {

	function addProdLine(prodObj) {

		var nameTxt = prodObj.name;
		var iconFile = File(iconsFolder.fullName + '/' + prodObj.icon);
		var pathTxt = limitNameSize(prodObj.templatesPath, 35);

		if (!iconFile.exists || iconFile instanceof Folder) {
			iconFile = File.decode(defaultProdData.PRODUCTIONS[0].icon);
			prodObj.icon = '';
		}

		var prodGrp = prodMainGrp.add('group', undefined);
		prodGrp.orientation = 'column';
		prodGrp.alignChildren = ['left', 'center'];
		prodGrp.spacing = 10;

		// ==========

		var prodDataGrp = prodGrp.add('group', undefined);
		prodDataGrp.orientation = 'row';
		prodDataGrp.alignChildren = ['left', 'center'];
		prodDataGrp.spacing = 10;

		var div = prodGrp.add('panel');
		div.alignment = 'fill';

		var prodNameTxt = prodDataGrp.add('edittext', undefined, nameTxt);
		prodNameTxt.helpTip = 'nome que aparecerá no menu';
		prodNameTxt.preferredSize = [130, 24];

		var prodIconBtn = prodDataGrp.add('iconbutton', undefined, iconFile, { style: 'toolbutton', prodIcon: prodObj.icon });
		prodIconBtn.helpTip = 'ícone que aparecerá no menu';
		prodIconBtn.preferredSize = [36, 36];

		var prodPathLab = prodDataGrp.add('statictext', undefined, pathTxt, { prodPath: prodObj.templatesPath });
		prodPathLab.helpTip = 'caminho da pasta de templates:\n\n' + prodObj.templatesPath;
		prodPathLab.preferredSize = [230, 24];
		setTxtHighlight(prodPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

		var deleteBtn = prodDataGrp.add('iconbutton', undefined, closeIcon.dark, { style: 'toolbutton' });
		deleteBtn.helpTip = 'deletar produção';
		deleteBtn.preferredSize = [36, 36];

		// ==========

		prodIconBtn.onClick = function () {
			// var newIconFile = new File(iconsFolder.fullName + '/' + this.properties.prodIcon);
			iconFile = iconFile.openDlg('selecione o ícone', "*.png", false);

			if (iconFile != null) {
				prodIconBtn.image = iconFile;
				this.properties.prodIcon = iconFile.fileName;
			}
			this.parent.layout.layout(true);
		}

		prodPathLab.addEventListener('mousedown', function () {

			var newTemplatesFolder = new Folder(this.properties.prodPath)
			var newTemplatesPath = newTemplatesFolder.selectDlg('selecione a pasta de templates'); // Abre a janela de seleção de pastas

			if (newTemplatesPath == null) return; // Se a janela foi cancelada, não faz nada

			this.properties.prodPath = newTemplatesPath.fullName;
			this.text = limitNameSize(newTemplatesPath.fullName, 40);
			this.helpTip = 'caminho da pasta de templates:\n\n' + newTemplatesPath.fullName;
		});

		deleteBtn.onClick = function () {

			prodMainGrp.remove(this.parent.parent);
			prodMainGrp.layout.layout(true);
			PAD_CONFIG_w.layout.layout(true);
		}
	}

	// ===========

	// window...
	var PAD_CONFIG_w = new Window('dialog', 'LISTA DE PRODUÇÕES');
	PAD_CONFIG_w.orientation = 'column';
	PAD_CONFIG_w.alignChildren = ['center', 'top'];
	PAD_CONFIG_w.spacing = 10;
	PAD_CONFIG_w.margins = 16;

	// ===========

	var prodMainGrp = PAD_CONFIG_w.add('group', undefined);
	prodMainGrp.orientation = 'column';
	prodMainGrp.alignChildren = ['left', 'center'];
	prodMainGrp.spacing = 10;

	for (var p = 0; p < prodArray.length; p++) {
		addProdLine(prodArray[p]);
	}

	// ===========

	// Criação do grupo de botões principal
	var BtnGrp = PAD_CONFIG_w.add('group', undefined);
	BtnGrp.orientation = 'stack';
	BtnGrp.alignment = 'fill'
	BtnGrp.margins = [0, 15, 0, 0]; // Margens do grupo de botões (15 pixels em cima)

	// Grupo dos botões à esquerda
	var bGrp1 = BtnGrp.add('group');
	bGrp1.alignment = 'left'; // Alinha o subgrupo à esquerda

	// Grupo do botão à direita
	var bGrp2 = BtnGrp.add('group');
	bGrp2.alignment = 'right'; // Alinha o subgrupo à direita

	var prodImportBtn = bGrp1.add('button', undefined, 'importar');
	prodImportBtn.helpTip = '◖ → importar uma lista de produções';

	var prodExportBtn = bGrp1.add('button', undefined, 'exportar');
	prodExportBtn.helpTip = '◖ → exportar a lista completa de produções';

	var prodNewBtn = bGrp2.add('button', undefined, 'nova produção');
	prodNewBtn.helpTip = '◖ → criar nova produção';

	var prodSaveBtn = bGrp2.add('button', undefined, 'salvar');
	prodSaveBtn.helpTip = '◖ → salvar configuração';

	setBgColor(PAD_CONFIG_w, '#515D9E'); // Cor de fundo da janela

	prodImportBtn.onClick = function () {
		tempConfigFile = File.openDialog('selecione o ícone', "*.json", false);

		if (tempConfigFile != null && tempConfigFile instanceof File) {
			var tempArray = updateProdData(tempConfigFile);

			while (prodMainGrp.children.length > 0) {
				prodMainGrp.remove(prodMainGrp.children[0]);
			}

			for (var j = 0; j < tempArray.length; j++) {
				addProdLine(tempArray[j]);
			}
			prodMainGrp.layout.layout(true);
			PAD_CONFIG_w.layout.layout(true);
		}
	}

	prodExportBtn.onClick = function () {

		var tempConfigFile = File.saveDialog('salvar configuração', "*.json");

		if (tempConfigFile != null) {

			try {

				var tempArray = [];

				for (var u = 0; u < prodMainGrp.children.length; u++) {
					var subGrp = prodMainGrp.children[u].children[0];
					var tempIconPath = subGrp.children[1].properties.prodIcon;
					var tempIconFile = File(iconsFolder.fullName + '/' + tempIconPath);

					if (tempIconFile.exists && tempIconFile instanceof File && tempIconPath != '') {
						try {
							copyFile(tempIconFile.fullName, tempConfigFile.path + '/icons'); // copia o ícone

						} catch (err) {
							alert(lol + err.message);
						}
					}

					var tempObj = {
						name: subGrp.children[0].text,
						icon: tempIconPath,
						templatesPath: subGrp.children[2].properties.prodPath
					}

					tempArray.push(tempObj);
				}

				var tempConfigContent = JSON.stringify(sortProdData(tempArray), null, '\t');
				writeFileContent(tempConfigFile, tempConfigContent);

				PAD_CONFIG_w.close();

			} catch (err) {
				alert(lol + err.message);
			}
		}
	}

	prodNewBtn.onClick = function () {

		addProdLine(defaultProdData.PRODUCTIONS[0]);

		prodMainGrp.layout.layout(true);
		PAD_CONFIG_w.layout.layout(true);
	}

	prodSaveBtn.onClick = function () {

		try {

			var tempArray = [];

			for (var u = 0; u < prodMainGrp.children.length; u++) {
				var subGrp = prodMainGrp.children[u].children[0];
				var tempIconPath = subGrp.children[1].properties.prodIcon;
				var tempIconFile = File(tempIconPath);

				if (tempIconFile.exists && tempIconFile instanceof File) {
					try {
						copyFile(tempIconPath, iconsFolder.fullName); // copia o ícone
						tempIconPath = iconsFolder.fullName + '/' + tempIconPath.split('/').pop();

					} catch (err) {
						alert(lol + err.message);
					}
				}

				var tempObj = {
					name: subGrp.children[0].text,
					icon: tempIconPath,
					templatesPath: subGrp.children[2].properties.prodPath
				}

				tempArray.push(tempObj);
			}

			saveProdData(sortProdData(tempArray));
			PAD_CONFIG_w.close();

		} catch (err) {
			alert(lol + err.message);
		}
	}

	PAD_CONFIG_w.show();
}