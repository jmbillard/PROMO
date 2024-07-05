/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function PAD_CONFIG_Dialog(prodArray) {

	// Ui definition...
	// window...
	var PAD_CONFIG_w = new Window('dialog', 'PRODUÇÕES');
	PAD_CONFIG_w.orientation = 'column';
	PAD_CONFIG_w.alignChildren = ['center', 'top'];
	PAD_CONFIG_w.spacing = 10;
	PAD_CONFIG_w.margins = 16;

	// PRODMAINGRP
	// ===========
	var prodMainGrp = PAD_CONFIG_w.add('group', undefined, { name: 'prodMainGrp' });
	prodMainGrp.orientation = 'column';
	prodMainGrp.alignChildren = ['left', 'center'];
	prodMainGrp.spacing = 10;

	for (var p = 0; p < prodArray.length; p++) {

		// PRODGRP
		// ========
		var prodGrp = prodMainGrp.add('group', undefined, { name: 'prodGrp' + p });
		prodGrp.orientation = 'column';
		prodGrp.alignChildren = ['left', 'center'];
		prodGrp.spacing = 10;

		if (p > 0) {
			var div = prodGrp.add('panel');
			div.alignment = 'fill';
		}

		var prodPathLab = prodGrp.add('statictext', undefined, limitNameSize(prodArray[p].templatesPath, 35), { name: 'prodPathLab' + p });
		prodPathLab.helpTip = 'caminho da pasta de templates';
		prodPathLab.preferredSize = [230, 24];

		setTxtHighlight(prodPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

		// PRODNAMEGRP
		// ============
		var prodNameGrp = prodGrp.add('group', undefined, { name: 'prodNameGrp' + p });
		prodNameGrp.orientation = 'row';
		prodNameGrp.alignChildren = ['left', 'center'];
		prodNameGrp.spacing = 10;

		var prodNameLab = prodNameGrp.add('statictext', undefined, 'nome:', { name: 'prodNameLab' + p });
		prodNameLab.preferredSize = [40, 24];
		prodNameLab.justify = 'right';
		setTxtColor(prodNameLab, '#000000');

		var prodNameTxt = prodNameGrp.add('edittext', undefined, prodArray[p].name, { name: 'prodNameTxt' + p });
		prodNameTxt.helpTip = 'nome que aparecerá no menu';
		prodNameTxt.preferredSize = [180, 24];

		// PRODBTNGRP
		// ==========
		var prodBtnGrp = prodGrp.add('group', undefined, { name: 'prodBtnGrp' + p });
		prodBtnGrp.orientation = 'row';
		prodBtnGrp.alignChildren = ['left', 'center'];
		prodBtnGrp.spacing = 10;

		var prodIconLab = prodBtnGrp.add('statictext', undefined, 'icone:', { name: 'prodIconLab' + p });
		prodIconLab.preferredSize = [40, 24];
		prodIconLab.justify = 'right';
		setTxtColor(prodIconLab, '#000000');

		var iconFile = new File(prodArray[p].icon);
		var prodIconBtn = prodBtnGrp.add('iconbutton', undefined, iconFile, { name: 'prodIconBtn' + p, style: 'toolbutton' });
		prodIconBtn.helpTip = 'selecione o icone que aparecerá no menu';
		prodIconBtn.preferredSize = [36, 36];

		var prodFolderLab = prodBtnGrp.add('statictext', undefined, 'pasta:', { name: 'prodFolderLab' + p });
		prodFolderLab.preferredSize = [40, 24];
		setTxtColor(prodFolderLab, '#000000');

		var prodFolderBtn = prodBtnGrp.add('iconbutton', undefined, undefined, { name: 'prodFolderBtn' + p, style: 'toolbutton' });
		prodFolderBtn.helpTip = 'selecione a pasta de templates';
		prodFolderBtn.preferredSize = [36, 36];

		var deleteBtn = prodBtnGrp.add('iconbutton', undefined, undefined, { name: 'deleteBtn' + p, style: 'toolbutton' });
		deleteBtn.helpTip = 'deletar produção';
		deleteBtn.preferredSize = [36, 36];
	}

	// ===========

	// BTNGRP
	// ======
	var BtnGrp = PAD_CONFIG_w.add('group', undefined, { name: 'BtnGrp' });
	BtnGrp.orientation = 'row';
	BtnGrp.alignChildren = ['left', 'center'];
	BtnGrp.spacing = 20;
	BtnGrp.margins = [0, 15, 0, 0];

	var prodNewBtn = BtnGrp.add('button', undefined, 'nova produção', { name: 'prodNewBtn' });
	prodNewBtn.helpTip = 'criar nova produção';

	var prodSaveBtn = BtnGrp.add('button', undefined, 'salvar', { name: 'prodSaveBtn' });
	prodSaveBtn.helpTip = 'salvar configuração';

	setBgColor(PAD_CONFIG_w, '#515D9E'); // Cor de fundo da janela

	PAD_CONFIG_w.show();

	return prodArray;
}