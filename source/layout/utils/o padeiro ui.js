/*

---------------------------------------------------------------
> 🪟 UI dialogs
---------------------------------------------------------------

*/

var PAD_v = '0.5-b';

var defPadObj = {
	configName: 'default config',
	exemple: '',
	tip: '',

	compName: '',
	prefix: '',
	refTime: 0,
	separator: '---',
	textCase: 'upperCase',
	inputLayers: null,
	inputFx: null,

	outputPath: '~/Desktop',
	alpha: true
};

function renderTemplateDialog(array, alphaChannel) {
	var renderTemplate = '';
	var txtHelp2Content = alphaChannel ? 'requer canal alpha!' : 'não requer canal alpha';

	var wPref = new Window('dialog', 'render setup...');
	wPref.alignChildren = ['left', 'top'];
	wPref.spacing = 10;

	var helpTxt1 = wPref.add('statictext', undefined, 'selecione o template do render...');
	setTxtColor(helpTxt1, monoColors[2]);

	var renderGrp = wPref.add('group');

	var renderDrop = renderGrp.add('dropdownlist', undefined, array);
	renderDrop.preferredSize = [250, 24];

	var divider1 = wPref.add('panel');
	divider1.alignment = 'fill';

	var helpTxt2 = wPref.add('statictext', undefined, 'obs: ' + txtHelp2Content);
	setTxtColor(helpTxt2, mainColors[1]);

	renderDrop.onChange = function () {
		renderTemplate = renderDrop.selection.toString();
		wPref.close();
	};

	wPref.show();
	return renderTemplate;
}

// import templates UI...
function padeiroTemplateDialog() {

	var wWidth; // window width without image preview...
	var oWidth; // window width with image preview...
	var previewScale = 0.2; // preview image scale factor...
	var fileFilter = ['.aep', '.aet']; // template files extensions...
	var hasData = false;
	var hasInput = false;
	var exemple = '';
	var padeiroOutputModuleTemplate;

	var templateFile; // → template file object
	var previewImgFile; // → preview image object
	var configFile; // → info file object
	var templateData;
	var tipContent = '...';

	//---------------------------------------------------------

	var wPadeiroTemplates = new Window('dialog', 'O PADEIRO ' + PAD_v);
	// main group...
	var mainGrp = wPadeiroTemplates.add('group');
	// left vertical group...
	var vGrp1 = mainGrp.add('group');
	vGrp1.orientation = 'column';
	vGrp1.alignment = ['center', 'top'];
	vGrp1.alignChildren = 'left';

	//---------------------------------------------------------

	divider = mainGrp.add('panel');

	// preview vertical group...
	var vGrp2 = mainGrp.add('group');
	vGrp2.orientation = 'column';
	vGrp2.alignment = ['center', 'top'];
	vGrp2.alignChildren = 'left';
	vGrp2.visible = false;

	var treeGrp = vGrp1.add('group');
	treeGrp.orientation = 'column';
	treeGrp.spacing = 5;

	var headerGrp = treeGrp.add('group');
	headerGrp.alignment = 'fill';
	headerGrp.orientation = 'stack';

	var templatesGrp = headerGrp.add('group');
	templatesGrp.alignment = 'left';

	var infoGrp = headerGrp.add('group');
	infoGrp.alignment = 'right';

	var templateLabTxt = templatesGrp.add('statictext', undefined, 'busca:');
	setTxtColor(templateLabTxt, monoColors[2]);

	var infoBtn = infoGrp.add('iconbutton', undefined, infoIcon.light, { style: 'toolbutton' });
	infoBtn.helpTip = 'ajuda | DOCS';

	var searchBox = treeGrp.add('edittext', [0, 0, 250, 24], '');

	var templateTree = treeGrp.add('treeview', [0, 0, 250, 464]);
	buildTree(templatesFolder, templateTree, fileFilter);

	//---------------------------------------------------------

	// buttons group...
	var bGrp = vGrp1.add('group');
	bGrp.orientation = 'stack';
	bGrp.alignment = 'fill';
	// left buttons group...
	var bGrp1 = bGrp.add('group');
	bGrp1.alignment = 'left';
	bGrp1.spacing = 2;
	// right buttons group...
	var bGrp2 = bGrp.add('group');
	bGrp2.alignment = 'right';
	// left buttons...
	var importBtn = bGrp1.add('iconbutton', iconSize, downloadIcon.light, { style: 'toolbutton' });
	importBtn.helpTip = '◖ → importar template selecionado';
	var refreshBtn = bGrp1.add('iconbutton', iconSize, refreshIcon.light, { style: 'toolbutton' });
	refreshBtn.helpTip = '◖ → atualizar lista';
	var openFldBtn = bGrp1.add('iconbutton', iconSize, folderIcon.light, { style: 'toolbutton' });
	openFldBtn.helpTip = '◖ → abrir a pasta de templates';
	// right buttons...
	var makeBtn = bGrp2.add('button', undefined, 'criar');
	makeBtn.helpTip = '◖ → criar e preencher o template selecionado';
	makeBtn.enabled = false;

	//---------------------------------------------------------

	// preview...
	var previewGrp = vGrp2.add('group');
	previewGrp.orientation = 'column';
	previewGrp.alignChildren = 'left';

	var previewLabTxt = previewGrp.add('statictext', undefined, 'preview:');
	setTxtColor(previewLabTxt, monoColors[2]);

	var previewImg = previewGrp.add('image', undefined, no_preview);
	previewImg.size = [1920 * previewScale, 1080 * previewScale];

	divider = vGrp2.add('panel');
	divider.alignment = 'fill';

	var inputGrp = vGrp2.add('group');
	inputGrp.alignment = ['left', 'top'];

	var txtGrp = inputGrp.add('group');
	txtGrp.orientation = 'column';
	txtGrp.alignment = ['left', 'top'];
	txtGrp.alignChildren = 'left';

	var tipGrp = inputGrp.add('group');
	tipGrp.orientation = 'column';
	tipGrp.alignment = ['left', 'top'];
	tipGrp.alignChildren = 'left';

	var inputLabTxt = txtGrp.add('statictext', undefined, 'input:');
	setTxtColor(inputLabTxt, monoColors[2]);
	var edtText = txtGrp.add('edittext', [0, 0, 185, 200], '', { multiline: true });
	edtText.enabled = false;

	var renderGrp = txtGrp.add('group');
	renderGrp.spacing = 15;

	var renderLabTxt = renderGrp.add('statictext', [0, 0, 150, 18], 'adicionar a fila de render:');
	setTxtColor(renderLabTxt, monoColors[2]);
	renderLabTxt.helpTip = 'adiciona automaticamente os templates\na fila de render, ao clicar no botão \'criar\'.';

	var renderCkb = renderGrp.add('checkbox', [8, 4, 24, 18]);
	renderCkb.value = true;
	renderCkb.enabled = false;

	var tipLabTxt = tipGrp.add('statictext', undefined, 'dicas:');
	setTxtColor(tipLabTxt, monoColors[2]);
	var tipContentTxt = tipGrp.add('statictext', [0, 0, 180, 210], tipContent, { multiline: true });
	setTxtColor(tipContentTxt, mainColors[1]);

	//---------------------------------------------------------

	wPadeiroTemplates.onShow = function () {
		// expandNodes(templateTree); // expand all tree folder nodes...
		templateTree.expanded = true;
		var branches = templateTree.items;

		for (var i = 0; i < branches.length; i++) {
			if (branches[i].type == 'node') {
				branches[i].expanded = true;
			}
		}
		oWidth = wPadeiroTemplates.size.width; // window width with image preview...
		wWidth = oWidth - 405; // window width without image preview...
		vGrp2.visible = false; // → hide preview
		divider.visible = false; // → hide preview
		wPadeiroTemplates.size.width = wWidth; // → resize window

		searchBox.active = true;
	};

	//---------------------------------------------------------

	searchBox.onEnterKey = function () {
		templateLabTxt.active = true;
		templateTree.active = true;
	};

	//---------------------------------------------------------

	searchBox.onChange = function () {
		if (this.text.trim() == '') return;

		searchBox.text = searchBox.text
			.trim()
			.toUpperCase()
			.replaceSpecialCharacters();

		buildTree(templatesFolder, templateTree, fileFilter); // → update tree

		var items = findItem(templateTree, [], searchBox.text);

		if (items.length == 0) return;

		for (var n = 0; n < items.length; n++) {
			var s = items[n];
			if (s.type == 'node') s.expanded = true;

			while (s.parent.constructor.name != 'TreeView') {
				s.parent.expanded = true;
				s = s.parent;
			}
		}
		templateLabTxt.active = true;
		templateTree.active = true;
	};

	//---------------------------------------------------------

	templateTree.onChange = function () {
		// node folders should not be selectable...
		if (templateTree.selection != null && templateTree.selection.type == 'node') {
			templateTree.selection = null; // → clear selection
		}
		if (templateTree.selection == null) {
			// nothing selected...
			wPadeiroTemplates.size.width = wWidth; // → resize window
			vGrp2.visible = false; // → hide preview
			divider.visible = false; // → hide preview
			return;
		}
		// template selected...
		var s = templateTree.selection; // → selected template
		var templateName = s.text;

		// iterate selection parent + parent + parent... to form selected template file path...
		while (s.parent.parent.constructor.name != 'TreeView') {
			s = s.parent; // current parent...
			templateName = s.text + '/' + templateName; // → 'current parent/.../template name'
		}
		var imgName = templateName.replace(/\.[\w]+$/i, '_preview.png'); // → template preview.png
		var configName = templateName.replace(/\.[\w]+$/i, '_config.json'); // → template info.png

		templateFile = new File(templatesPath + '/' + templateName); // → template file object
		previewImgFile = new File(templatesPath + '/' + imgName); // → preview image object
		configFile = new File(templatesPath + '/' + configName); // → info file object

		importBtn.enabled = templateTree.selection != null; // → enable | disable import button

		if (previewImgFile.exists) {
			previewImg.image = previewImgFile; // → set preview image file
		} else {
			previewImg.image = no_preview; // → set image 'no preview available'
		}
		vGrp2.visible = true; // → show preview
		divider.visible = true; // → show preview
		wPadeiroTemplates.size.width = oWidth; // → resize window

		try {
			hasInput = false;
			exemple = lol + '\n\nesse template não pode ser editado pelo padeiro.';
			var tipContent = 'clique no botão importar e edite o template manualmente.';

			if (configFile.exists) {
				exemple = relax + '\n\nesse template não possui inputs.';
				var JSONContent = readFileContent(configFile); // → JSON string
				templateData = JSON.parse(JSONContent); // → preferencesObject

				for (var o in defPadObj) {
					// check saved preferences...
					if (templateData.hasOwnProperty(o)) continue; // main property exists...
					templateData[o] = defPadObj[o]; // use default main property value...
				}

				hasInput = templateData.inputLayers != null;

				if (hasInput) {
					exemple = templateData.exemple;
					tipContent = templateData.tip;
				}
			}

			if (!hasData) edtText.text = exemple;
			tipContentTxt.text = tipContent;

		} catch (err) {
			alert('esse template não tem um arquivo de configuração válido!\n\nerro: ' + err.message);
			return;
		}

		makeBtn.enabled = (templateTree.selection != null && hasData && hasInput);
		inputLabTxt.enabled = hasInput; // → set preview image file
		edtText.enabled = hasInput; // → set preview image file
		renderCkb.enabled = hasInput; // → set preview image file
		renderLabTxt.enabled = hasInput; // → set preview image file
	};

	templateTree.onActivate = function () {

		hasData = (edtText.text.trim() != '' && edtText.text != exemple);
		if (!hasData) edtText.text = exemple;

		makeBtn.enabled = (templateTree.selection != null && hasData && hasInput);
		inputLabTxt.enabled = hasInput; // → set preview image file
		edtText.enabled = hasInput; // → set preview image file
		renderCkb.enabled = hasInput; // → set preview image file
		renderLabTxt.enabled = hasInput; // → set preview image file
	};

	//---------------------------------------------------------

	edtText.onChanging = function () {

		hasData = (edtText.text.trim() != '' && edtText.text.trim() != exemple);
		makeBtn.enabled = (templateTree.selection != null && hasData && hasInput);
	};

	//---------------------------------------------------------

	makeBtn.onClick = function () {

		wPadeiroTemplates.size.height = 10; // → close window
		wPadeiroTemplates.text = 'processando os templates...'; // → close window
		mainGrp.visible = false;

		if (edtText.text.trim() == '') return;
		if (!templateFile.exists) return;
		if (!configFile.exists) return;

		try {
			var IO = new ImportOptions(templateFile); // import options...

			app.project.importFile(IO); // → import template project

			if (templateData.textCase == 'upperCase') edtText.text = edtText.text.toUpperCase();
			if (templateData.textCase == 'lowerCase') edtText.text = edtText.text.toLowerCase();
			if (templateData.textCase == 'titleCase') edtText.text = edtText.text.toTitleCase();

			var inputList = edtText.text.split(/[\n\r]{2,}/);

			app.project.bitsPerChannel = 8;
			app.project.expressionEngine = 'javascript-1.0';
			app.project.linearBlending = true;
			app.project.timeDisplayType = TimeDisplayType.TIMECODE;

		} catch (err) {
			alert(err.message);
			return;
		}

		var iNum = app.project.numItems;
		var folderNotAvailable = false;

		for (var i = 1; i <= iNum; i++) {
			var comp = app.project.item(i);

			if (!(comp instanceof CompItem)) continue;
			if (!comp.comment.match(/^TEMPLATE/)) continue;
			if (comp.name != templateData.compName) continue;

			for (var n = 0; n < inputList.length; n++) {

				var prefix = templateData.prefix != '' ? templateData.prefix + ' - ' : '';
				var templateName = prefix + inputList[n].replaceSpecialCharacters();
				var t = templateData.refTime;

				var optionsList = templateData.inputFx != null ? templateData.inputFx.options : [''];

				for (var f = 0; f < optionsList.length; f++) {
					var template = comp.duplicate();
					var inputLayerList = templateData.inputLayers;

					var txtList = inputList[n].split(/[\n\r]-+[\n\r]/);

					if (templateData.separator != '') txtList = inputList[n].split(templateData.separator);

					if (templateData.inputFx != null) {
						var ctrlLayer = template.layer(templateData.inputFx.layerIndex);

						ctrlLayer.property('ADBE Effect Parade')
							.property(templateData.inputFx.fxName)
							.property(templateData.inputFx.optionIndex)
							.setValue(f + 1);
					}

					for (var l = 0; l < inputLayerList.length; l++) {
						var inputLayer = template.layer(inputLayerList[l].layerIndex);


						if (l >= txtList.length) {
							inputLayer.enabled = false;
							continue;
						}

						if (txtList[l] == '') continue;

						if (inputLayerList[l].method == 'textContent') {

							if (!(inputLayer instanceof TextLayer)) continue;

							txtList[l] = txtList[l].trim();
							var textContent = txtList[l];
							var text = inputLayer.property('ADBE Text Properties');
							var textDoc = text.property('ADBE Text Document').value;

							textDoc.text = textContent;
							text.property('ADBE Text Document').setValue(textDoc);

							txtList[l] = txtList[l].replaceSpecialCharacters();
						}

						if (inputLayerList[l].method == 'layerName') {

							var layerName = txtList[l].trim();
							inputLayer.name = layerName;
						}
					}
					if (templateData.prefix == '') templateName = txtList.join(' - ').replace(/[\n\r]/g, ' ');

					template.name = [templateName.toUpperCase(), optionsList[f]].join(' ').trim();

					if (renderCkb.value) {
						var item = app.project.renderQueue.items.add(template);
						var outputModule = item.outputModule(1);

						if (padeiroOutputModuleTemplate == undefined) {
							padeiroOutputModuleTemplate = renderTemplateDialog(outputModule.templates, templateData.alpha);
						}

						if (padeiroOutputModuleTemplate != '') {

							var outputFolder = new Folder(templateData.outputPath);

							if (folderNotAvailable || !outputFolder.exists) {
								templateData.outputPath = defPadObj.outputPath;
								folderNotAvailable = true;
							}

							try {
								var outputFile = new File(templateData.outputPath + '/' + template.name + '.mov');

								outputModule.file = outputFile;
								outputModule.applyTemplate(padeiroOutputModuleTemplate);
								item.applyTemplate('Best Settings');

							} catch (err) { alert(err.message); }

						} else { item.remove(); }
					}

					template.openInViewer();
					template.time = t;
					template.comment = 'EXPORTAR';
				}
			}
			comp.remove();
			break;
		}

		deleteProjectFolders();
		populateProjectFolders();
		deleteEmptyProjectFolders();
		wPadeiroTemplates.close(); // → close window

		if (folderNotAvailable) alert(lol + '\n\no caminho pré-definido para\no output do render não pode ser acessado!');
		setXMPData('source', decodeURI(templateFile.path).toString());
	};

	//---------------------------------------------------------

	importBtn.onClick = templateTree.onDoubleClick = function () {

		try {
			var IO = new ImportOptions(templateFile); // import options...

			app.project.importFile(IO); // → import template project

			deleteProjectFolders();
			populateProjectFolders();
			deleteEmptyProjectFolders();

		} catch (err) {
			alert(err.message);
			return;
		}
		wPadeiroTemplates.close(); // → close window
	};

	//---------------------------------------------------------

	refreshBtn.onClick = function () {
		buildTree(templatesFolder, templateTree, fileFilter); // → update tree

		templateTree.expanded = true;
		var branches = templateTree.items;

		for (var i = 0; i < branches.length; i++) {
			if (branches[i].type == 'node') {
				branches[i].expanded = true;
			}
		}
	};

	//---------------------------------------------------------

	openFldBtn.onClick = function () {
		if (!templatesFolder.exists) templatesFolder.create(); // → create template folder

		openFolder(templatesPath); // → open template folder
	};

	infoBtn.onClick = function () {

		openWebSite('https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-o-padeiro-script');
	};

	wPadeiroTemplates.show();
}