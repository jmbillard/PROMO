/*

---------------------------------------------------------------
> 🪟 UI dialogs
---------------------------------------------------------------

*/

function findDialog() {
	var findW = new Window('palette', 'BUSCA');
	findW.spacing = 5;
	findW.margins = 0;

	//---------------------------------------------------------

	var searchMainGrp = findW.add('group');
	searchMainGrp.orientation = 'column';
	searchMainGrp.alignChildren = ['center', 'top'];

	var inputGrp = searchMainGrp.add('group');
	inputGrp.spacing = 0;
	inputGrp.margins = 8;

	var findEdTxt = inputGrp.add('edittext', [0, 0, 260, 38]);

	var findBtn = inputGrp.add('iconbutton', iconSize, findIcon.light, { style: 'toolbutton' });
	findBtn.helpTip = '◖ → buscar';

	//---------------------------------------------------------

	var optMainGrp = searchMainGrp.add('group');
	optMainGrp.spacing = 30;

	var optGrp5 = optMainGrp.add('group');
	optGrp5.alignChildren = ['center', 'top'];
	optGrp5.spacing = 2;

	var optCkb5 = optGrp5.add('checkbox');
	optCkb5.value = false;

	var optIco5 = optGrp5.add('image', undefined, eyeOpenLabelIcon);
	optCkb5.helpTip = optIco5.helpTip = '⦿ → apenas layers visíveis';

	//---------------------------------------------------------

	var optGrp1 = optMainGrp.add('group');
	optGrp1.alignChildren = ['center', 'top'];
	optGrp1.spacing = 2;

	var optCkb1 = optGrp1.add('checkbox');
	optCkb1.value = false;

	var optTxt1 = optGrp1.add('statictext', undefined, 'Tt');
	optCkb1.helpTip = optTxt1.helpTip = '⦿ → considerar maiúsculas e minúsculas';

	//---------------------------------------------------------

	var optGrp2 = optMainGrp.add('group');
	optGrp2.alignChildren = ['center', 'top'];
	optGrp2.spacing = 2;

	var optCkb2 = optGrp2.add('checkbox');
	optCkb2.value = false;

	var optTxt2 = optGrp2.add('statictext', undefined, 'àê');
	optCkb2.helpTip = optTxt2.helpTip = '⦿ → considerar acentuação';

	//---------------------------------------------------------

	var optGrp4 = optMainGrp.add('group');
	optGrp4.alignChildren = ['center', 'top'];
	optGrp4.spacing = 2;

	var optCkb4 = optGrp4.add('checkbox');
	optCkb4.value = false;

	var optTxt4 = optGrp4.add('statictext', undefined, '!=');
	optCkb4.helpTip = optTxt4.helpTip = '⦿ → apenas textos que NÃO possuem o termo buscado';

	//---------------------------------------------------------

	var infoBtn = optMainGrp.add('iconbutton', undefined, infoIcon.light, { style: 'toolbutton' });
	infoBtn.helpTip = 'ajuda | DOCS';

	var findProgressBar = findW.add('progressbar', [0, 0, 305, 5], undefined);
	findProgressBar.value = 100;

	var resultTree = findW.add('treeview', [0, 0, 320, 0]);
	resultTree.visible = false;

	//---------------------------------------------------------
	findW.onShow = function () {
		findEdTxt.active = true;
	};

	findEdTxt.onEnterKey = findBtn.onClick = function () {
		// starting timer...
		// timer();
		findW.text = 'BUSCANDO...';
		resultTree.visible = false;
		resultTree.size.height = 0;
		findW.layout.layout(true);

		var sKey = findEdTxt.text;
		if (sKey == '' || app.project.numItems == 0) {
			findW.text = 'BUSCAR...';
			return;
		}
		var optObj = {
			sKey: sKey,
			vis: optCkb5.value,
			matchCase: optCkb1.value,
			matchAccent: optCkb2.value,
			invert: optCkb4.value,
		};
		var compsArray = getComps(); // → [all comps]
		buildTxtSearchTree(resultTree, optObj, compsArray, findProgressBar);
		var count = expandNodes(resultTree);

		if (count < 1) {
			findW.text = 'SEM MATCHES... (っ °Д °;)っ';
			return;
		}
		resultTree.visible = true;
		resultTree.size.height = count >= 16 ? 320 : (count * 21) + 5;
		findW.text = 'BUSCA CONCLUÍDA...  (o °▽ °)o☆';
		findW.layout.layout(true);
	};

	//---------------------------------------------------------

	resultTree.onChange = function () {
		var comp = resultTree.selection.comp;
		var t = comp.time;
		var txtLayer;

		if (resultTree.selection.type == 'item') {

			txtLayer = resultTree.selection.txtLayer;

			for (var l = 1; l <= comp.numLayers; l++) {
				comp.layer(l).selected = false;
			}

			t = resultTree.selection.refTime;
			comp.hideShyLayers = !txtLayer.shy;
			txtLayer.selected = true;
		}
		comp.openInViewer();
		comp.time = t;
	};

	//---------------------------------------------------------

	infoBtn.onClick = function () {

		openWebSite('https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#busca');
	};

	findW.show();
}