/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function padProdFoldersDialog(prodArray) {
	// Altera a cor de um texto estático.
	function setTxtColor(sTxt, hex) {
		var color = hexToRGB(hex);         // Converte a cor hexadecimal em RGB.
		var pType = sTxt.graphics.PenType.SOLID_COLOR; // Define o tipo da caneta como cor sólida.
		sTxt.graphics.foregroundColor = sTxt.graphics.newPen(pType, color, 1); // Cria uma nova caneta com a cor e a aplica ao texto.
	}

	function addProductionLine(prodObj) {

		var nameTxt = prodObj.name;
		var pathTxt = prodObj.templatesPath;
		var iconImg = prodObj.icon;

		var prodGrp = prodMainGrp.add('group', undefined);
		prodGrp.orientation = 'column';
		prodGrp.alignChildren = ['left', 'center'];
		prodGrp.spacing = 10;

		var prodDataGrp = prodGrp.add('group', undefined);
		prodDataGrp.orientation = 'row';
		prodDataGrp.alignChildren = ['left', 'center'];
		prodDataGrp.spacing = 10;

		var newDiv = prodMainGrp.add("customButton", [0, 0, 1, 1]);
		newDiv.alignment = ['fill', 'center'];
		setUiCtrlColor(newDiv, divColor);
		newDiv.onDraw = customDraw;

		var prodNameTxt = prodDataGrp.add('edittext', undefined, nameTxt);
		prodNameTxt.helpTip = 'nome que aparecerá no menu';
		prodNameTxt.preferredSize = [130, 24];

		var prodIconBtn = prodDataGrp.add('iconbutton', undefined, undefined, { style: 'toolbutton', prodIcon: prodObj.icon });
		try {
			prodIconBtn.image = eval(iconImg);

		} catch (err) {
			prodIconBtn.image = defaultProdData.PRODUCTIONS[0].icon;
		}
		prodIconBtn.helpTip = 'ícone que aparecerá no menu';
		prodIconBtn.preferredSize = [36, 36];

		var prodPathLab = prodDataGrp.add('statictext', undefined, pathTxt, { prodPath: prodObj.templatesPath, truncate: 'middle' });
		prodPathLab.helpTip = 'caminho da pasta de templates:\n\n' + prodObj.templatesPath;
		prodPathLab.preferredSize = [230, 24];
		setTxtHighlight(prodPathLab, normalColor, highlightColor); // Cor de destaque do texto

		var deleteBtn = prodDataGrp.add('iconbutton', undefined, closeIcon.dark, { style: 'toolbutton' });
		deleteBtn.helpTip = 'deletar produção';
		deleteBtn.preferredSize = [36, 36];

		// ==========

		prodIconBtn.onClick = function () {

			var newIconFile = File.openDialog('selecione o ícone', "*.png", false);

			if (newIconFile != null) {
				this.properties.prodIcon = fileToBinary(newIconFile);
				this.image = newIconFile;
			}
			this.parent.layout.layout(true);
		};

		prodPathLab.addEventListener('mousedown', function () {

			var newTemplatesFolder = new Folder(this.properties.prodPath)
			var newTemplatesPath = newTemplatesFolder.selectDlg('selecione a pasta de templates'); // Abre a janela de seleção de pastas

			if (newTemplatesPath == null) return; // Se a janela foi cancelada, não faz nada

			this.properties.prodPath = newTemplatesPath.fullName;
			this.text = newTemplatesPath.fullName;
			this.helpTip = 'caminho da pasta de templates:\n\n' + newTemplatesPath.fullName;
		});

		deleteBtn.onClick = function () {

			prodMainGrp.remove(this.parent.parent);
			prodMainGrp.layout.layout(true);
			PAD_CONFIG_w.layout.layout(true);
		};
	};

	// window...
	var PAD_CONFIG_w = new Window('dialog', 'LISTA DE PRODUÇÕES');
	PAD_CONFIG_w.orientation = 'column';
	PAD_CONFIG_w.alignChildren = ['center', 'top'];
	PAD_CONFIG_w.spacing = 10;
	PAD_CONFIG_w.margins = 16;

	// ===========

	// Cria um grupo para o cabeçalho da árvore de templates
	var headerGrp = PAD_CONFIG_w.add('group');
	headerGrp.alignment = 'fill';      // Ocupa todo o espaço disponível
	headerGrp.orientation = 'stack';   // Empilha os elementos verticalmente

	// Cria um grupo para o botão de informações
	var labGrp = headerGrp.add('group');
	labGrp.alignment = 'left'; // Alinhamento à esquerda

	// Cria um grupo para o botão de informações
	var infoGrp = headerGrp.add('group');
	infoGrp.alignment = 'right'; // Alinhamento à direita

	// Rótulo de preview
	var listLabTxt = labGrp.add('statictext', undefined, 'PRODUÇÕES:'); // Adiciona um texto estático
	setTxtColor(listLabTxt, monoColors[2]);   // Define a cor do texto

	// Cria o botão de informações
	var infoBtn = infoGrp.add('iconbutton', undefined, infoIcon.light, { style: 'toolbutton' });
	infoBtn.helpTip = 'ajuda | DOCS'; // Define a dica da ferramenta

	var prodMainGrp = PAD_CONFIG_w.add('group', undefined);
	prodMainGrp.orientation = 'column';
	prodMainGrp.spacing = 10;

	for (var u = 0; u < prodArray.length; u++) {

		try {
			addProductionLine(prodArray[u]);
		} catch (err) {
			prodArray[u].icon = defPadObj.PRODUCTIONS[0].icon;
			addProductionLine(prodArray[u]);
		}
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

	// var prodImportBtn = bGrp1.add('statictext', [0, 0, 100, 30], 'importar');
	// prodImportBtn.text = 'importar';
	var prodImportBtn = bGrp1.add('button', undefined, 'importar');
	prodImportBtn.helpTip = lClick + 'importar uma lista de produções';
	// prodImportBtn.onDraw = customBtnDraw();

	var prodExportBtn = bGrp1.add('button', undefined, 'exportar');
	prodExportBtn.helpTip = lClick + 'exportar a lista completa de produções';

	var prodNewBtn = bGrp2.add('button', undefined, 'nova produção');
	prodNewBtn.helpTip = lClick + 'criar nova produção';

	var prodSaveBtn = bGrp2.add('button', undefined, 'salvar');
	prodSaveBtn.helpTip = lClick + 'salvar configuração';

	setBgColor(PAD_CONFIG_w, bgColor); // Cor de fundo da janela

	infoBtn.onClick = function () {

		var siteUrl = 'https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-adicionando-pastas-de-produ%C3%A7%C3%A3o'; // Define o URL do site de documentação.
		openWebSite(siteUrl); // Abre o site de documentação em um navegador web.
	};

	prodImportBtn.onClick = function () {
		tempConfigFile = File.openDialog('selecione o ícone', "*.json", false);

		if (tempConfigFile != null && tempConfigFile instanceof File) {
			var tempArray = updateProdData(tempConfigFile);

			while (prodMainGrp.children.length > 0) {
				prodMainGrp.remove(prodMainGrp.children[0]);
			}

			for (var j = 0; j < tempArray.length; j++) {
				addProductionLine(tempArray[j]);
			}
			prodMainGrp.layout.layout(true);
			PAD_CONFIG_w.layout.layout(true);
		}
	};

	prodExportBtn.onClick = function () {

		var tempConfigFile = File.saveDialog('salvar configuração', "*.json");

		if (tempConfigFile != null) {

			try {

				var tempArray = [];

				for (var u = 0; u < prodMainGrp.children.length; u++) {
					var subGrp = prodMainGrp.children[u].children[0];

					var tempObj = {
						name: subGrp.children[0].text,
						icon: subGrp.children[1].properties.prodIcon,
						templatesPath: subGrp.children[2].properties.prodPath
					}

					tempArray.push(tempObj);
				}

				var tempConfigContent = JSON.stringify(sortProdData(tempArray), null, '\t');
				writeFileContent(tempConfigFile, tempConfigContent);

				PAD_CONFIG_w.close();

			} catch (err) {
				alert(lol + '#PAD_014 - ' + err.message);
			}
		}
	};

	prodNewBtn.onClick = function () {

		try {
			addProductionLine(defaultProdData.PRODUCTIONS[0]);

		} catch (err) {
			alert(lol + '#PAD_013 - ' + err.message);
		}

		prodMainGrp.layout.layout(true);
		PAD_CONFIG_w.layout.layout(true);

	};

	prodSaveBtn.onClick = function () {

		try {

			var tempArray = [];

			for (var u = 0; u < prodMainGrp.children.length; u++) {
				var subGrp = prodMainGrp.children[u].children[0];

				var tempObj = {
					name: subGrp.children[0].text,
					icon: subGrp.children[1].properties.prodIcon,
					templatesPath: subGrp.children[2].properties.prodPath
				}

				tempArray.push(tempObj);
			}

			saveProdData(sortProdData(tempArray));
			PAD_CONFIG_w.close();

		} catch (err) {
			alert(lol + '#PAD_016 - ' + err.message);
		}
	};

	PAD_CONFIG_w.show();
}