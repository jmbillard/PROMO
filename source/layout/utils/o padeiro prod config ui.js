/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function PAD_CONFIG_Dialog(prodArray) {

	function addProdLine(prodObj) {

		var nameTxt = prodObj.name;
		var iconFile = new File(prodObj.icon);
		var pathTxt = limitNameSize(prodObj.templatesPath, 40);

		if (!iconFile.exists) {
			iconFile = File.decode(solTogIcon.dark);
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
		prodIconBtn.helpTip = 'selecione o icone que aparecerá no menu';
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
			iconFile = File.openDialog( 'selecione o ícone', "*.png", false );

			if (iconFile != null) {
				prodIconBtn.image = iconFile;
				this.properties.prodIcon = iconFile.fullName;
			}
			this.parent.layout.layout(true);
		}

		prodPathLab.addEventListener('mousedown', function () {

			var newTemplatesPath = Folder.selectDialog('selecione a pasta de templates'); // Abre a janela de seleção de pastas

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

	var prodMainGrp = PAD_CONFIG_w.add('group', undefined, { name: 'prodMainGrp' });
	prodMainGrp.orientation = 'column';
	prodMainGrp.alignChildren = ['left', 'center'];
	prodMainGrp.spacing = 10;

	for (var p = 0; p < prodArray.length; p++) {
		addProdLine(prodArray[p]);
	}

	// ===========

	var BtnGrp = PAD_CONFIG_w.add('group', undefined, { name: 'BtnGrp' });
	BtnGrp.orientation = 'row';
	BtnGrp.alignChildren = ['right', 'center'];
	BtnGrp.spacing = 20;
	BtnGrp.margins = [0, 15, 0, 0];

	var prodNewBtn = BtnGrp.add('button', undefined, 'nova produção', { name: 'prodNewBtn' });
	prodNewBtn.helpTip = 'criar nova produção';

	var prodSaveBtn = BtnGrp.add('button', undefined, 'salvar', { name: 'prodSaveBtn' });
	prodSaveBtn.helpTip = 'salvar configuração';

	setBgColor(PAD_CONFIG_w, '#515D9E'); // Cor de fundo da janela

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

				var tempObj = {
					name: subGrp.children[0].text,
					icon: subGrp.children[1].properties.prodIcon,
					templatesPath: subGrp.children[2].properties.prodPath
				}

				tempArray.push(tempObj);
			}

			saveProdData(sortProdData(tempArray))
			alert(relax + 'lista salva!');
			PAD_CONFIG_w.close();

		} catch (err) {
			alert(lol + err.message);
		}
	}

	PAD_CONFIG_w.show();
}