/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function PAD_CONFIG_Dialog(prodArray) {

	alert('rodou!');

	function addProdLine(p) {

		var nameTxt = 'nome...';
		var iconFile = File.decode(solTogIcon.dark);
		var pathTxt = 'clique aqui para selecionar a pasta...';

		if (p != null) {

			nameTxt = prodArray[p].name;
			iconFile = new File(prodArray[p].icon);

			if (!iconFile.exists) iconFile = File.decode(solTogIcon.dark);
			pathTxt = limitNameSize(prodArray[p].templatesPath, 40);
		}

		var prodGrp = prodMainGrp.add('group', undefined, { name: 'prodGrp' + p });
		prodGrp.orientation = 'column';
		prodGrp.alignChildren = ['left', 'center'];
		prodGrp.spacing = 10;

		// ==========

		var prodDataGrp = prodGrp.add('group', undefined, { name: 'prodBtnGrp' + p });
		prodDataGrp.orientation = 'row';
		prodDataGrp.alignChildren = ['left', 'center'];
		prodDataGrp.spacing = 10;

		var div = prodGrp.add('panel');
		div.alignment = 'fill';

		// ==========

		var nameGrp = prodDataGrp.add('group', undefined, { name: 'nameGrp' + p });
		nameGrp.orientation = 'row';
		nameGrp.spacing = 2;

		var prodNameLab = nameGrp.add('statictext', undefined, 'nome:', { name: 'prodNameLab' + p });
		setTxtColor(prodNameLab, '#000000');

		var prodNameTxt = nameGrp.add('edittext', undefined, nameTxt, { name: 'prodNameTxt' + p });
		prodNameTxt.helpTip = 'nome que aparecerá no menu';
		prodNameTxt.preferredSize = [130, 24];

		// ==========

		var iconGrp = prodDataGrp.add('group', undefined, { name: 'iconGrp' + p });
		iconGrp.orientation = 'row';
		iconGrp.spacing = 2;

		var prodIconLab = iconGrp.add('statictext', undefined, 'ícone:', { name: 'prodIconLab' + p });
		setTxtColor(prodIconLab, '#000000');

		var prodIconBtn = iconGrp.add('iconbutton', undefined, iconFile, { name: 'prodIconBtn' + p, style: 'toolbutton' });
		prodIconBtn.helpTip = 'selecione o icone que aparecerá no menu';
		prodIconBtn.preferredSize = [36, 36];

		// ==========

		var prodPathLab = prodDataGrp.add('statictext', undefined, pathTxt, { name: 'prodPathLab' + p });
		prodPathLab.helpTip = 'caminho da pasta de templates';
		prodPathLab.preferredSize = [230, 24];
		setTxtHighlight(prodPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

		var deleteBtn = prodDataGrp.add('iconbutton', undefined, closeIcon.dark, { name: 'deleteBtn' + p, style: 'toolbutton' });
		deleteBtn.helpTip = 'deletar produção';
		deleteBtn.preferredSize = [36, 36];

		prodIconBtn.onClick = function () {
			iconFile = File.openDialog( 'selecione o ícone', "*.png", false );
			prodIconBtn.image = iconFile;
			this.parent.layout.layout(true);
		}

		deleteBtn.onClick = function () {
			prodMainGrp.remove(this.parent.parent);
			prodMainGrp.layout.layout(true);
			PAD_CONFIG_w.layout.layout(true);
		}

	}

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

		addProdLine(p)
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

		addProdLine(null);

		prodMainGrp.layout.layout(true);
		PAD_CONFIG_w.layout.layout(true);
	}

	PAD_CONFIG_w.show();

	return prodArray;
}