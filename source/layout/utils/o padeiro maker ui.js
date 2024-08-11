/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function PadMakerDialog() {

	defaultConfigObj = {
		configName: 'NOME DA CONFIGURAÇÃO',
		exemple: 'informação 1\ninformação 2',
		tip: 'coloque aqui as instruções de preenchimento deste template.\nex:\
\ndigite o texto em 1 ou 2 linhas.\
\nuse a quebra de linha para separar "informação" 1 e "informação 2".\
\nuse 1 linha vazia para criar mais de 1 versão do mesmo template selecionado.',

		compName: 'COMP TEMPLATE',
		prefix: 'TARJA',
		refTime: 2,
		separator: '\n',
		textCase: 'lowerCase',
		inputLayers: [],

		outputPath: [
			'~/Desktop'
		],
		importPath: '~/Desktop',
		alpha: true
	};

	function addLayers() {
		var aItem = app.project.activeItem;

		if (aItem == null) return;

		var selLayers = aItem.selectedLayers;

		if (selLayers.length == 0) return;

		for (i = 0; i < selLayers.length; i++) {
			var selLayer = selLayers[i];

			if (selLayer.comment == 'TEMPLATE LAYER') continue;

			var layerGrp = layersMainGrp.add('group', undefined);
			layerGrp.orientation = 'row';
			layerGrp.alignChildren = ['left', 'center'];
			layerGrp.spacing = 10;
			layerGrp.margins = 0;

			var layerLab = layerGrp.add('statictext', undefined, selLayer.index + '   ' + selLayer.name, { selectedLayer: selLayer, truncate: 'end' });
			layerLab.preferredSize.width = 95;
			setTxtHighlight(layerLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

			var layerDrop_array = ['nome'];
			if (selLayer instanceof TextLayer) layerDrop_array.push('conteúdo');
			var layerDrop = layerGrp.add('dropdownlist', undefined, layerDrop_array);
			layerDrop.selection = selLayer instanceof TextLayer ? 1 : 0;
			layerDrop.preferredSize.width = 90;

			var excludeLayerBtn = layerGrp.add('iconbutton', undefined, closeIcon.light, { style: 'toolbutton', selectedLayer: selLayer });
			excludeLayerBtn.helpTip = 'excluir layer';
			excludeLayerBtn.preferredSize = [24, 24];

			layerLab.addEventListener('mousedown', function () {
				try {
					this.properties.selectedLayer.selected = !this.properties.selectedLayer.selected;
				} catch (err) { }
			});

			excludeLayerBtn.onClick = function () {
				try {
					this.properties.selectedLayer.comment = '';

				} catch (err) {
					alert(lol + '#PAD_024 - ' + err.message); // Exibe uma mensagem de erro
				}
				this.parent.parent.remove(this.parent);

				PAD_MAKER_w.layout.layout(true);
				layoutMainGrp3.layout.layout(true);
				layersMainGrp.layout.layout(true);

				separatorTxt.enabled = (layersMainGrp.children.length > 1);
				separatorLab.enabled = (layersMainGrp.children.length > 1);
			}

			selLayer.comment = 'TEMPLATE LAYER';
		}
	}

	function addOutputFolder() {

		var outputGrp = outputMainGrp.add('group', undefined);
		outputGrp.orientation = 'row';
		outputGrp.alignChildren = ['left', 'center'];
		outputGrp.spacing = 10;

		var outputPathLab = outputGrp.add('statictext', [0, 0, 190, 24], 'caminho da pasta...', { outputPath: '~/Desktop', truncate: 'middle' });
		outputPathLab.helpTip = 'caminho da pasta:';
		setTxtHighlight(outputPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

		var excludeOutputBtn = outputGrp.add('iconbutton', undefined, closeIcon.light, { style: 'toolbutton' });
		excludeOutputBtn.helpTip = 'excluir caminho';
		excludeOutputBtn.preferredSize = [24, 24];

		outputPathLab.addEventListener('mousedown', function () {

			var newOutputFolder = new Folder(this.properties.outputPath)
			var newOutputPath = newOutputFolder.selectDlg('selecione a pasta de output'); // Abre a janela de seleção de pastas

			if (newOutputPath == null) return; // Se a janela foi cancelada, não faz nada

			this.properties.outputPath = newOutputPath.fullName;
			this.text = newOutputPath.fullName;
			this.helpTip = 'caminho da pasta de output:\n\n' + newOutputPath.fullName;
		});

		excludeOutputBtn.onClick = function () {

			if (this.parent.parent.children.length <= 2) return;

			this.parent.parent.remove(this.parent);
			outputMainGrp.layout.layout(true);
			PAD_MAKER_w.layout.layout(true);
		}
	}

	function getTemplateLayers() {

		var templateLayersArray = [];

		for (var i = 0; i < layersMainGrp.children.length; i++) {

			try {
				var layerGrp = layersMainGrp.children[i];
				var methodArray = ['layerName', 'textContent'];
				var m = layerGrp.children[1].selection.index;
				var selectedLayer = layerGrp.children[2].properties.selectedLayer;

				templateLayersArray.push([selectedLayer, methodArray[m]]);

			} catch (err) { }
		}

		return templateLayersArray;
	}

	var tempPreviewFile;
	var tempItem = app.project.activeItem;
	var compName = tempItem !== null ? tempItem.name.replaceSpecialCharacters() : 'NOVO ITEM';

	// ==============

	var PAD_MAKER_w = new Window('palette', 'NOVO TEMPLATE');
	PAD_MAKER_w.orientation = 'row';
	PAD_MAKER_w.alignChildren = ['center', 'top'];

	// ==============

	var layoutMainGrp2 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp2.orientation = 'column';
	layoutMainGrp2.alignChildren = ['left', 'top'];
	layoutMainGrp2.spacing = 10;
	layoutMainGrp2.margins = 0;

	// Cria um grupo para o cabeçalho da árvore de templates
	var headerGrp = layoutMainGrp2.add('group');
	headerGrp.alignment = 'fill';      // Ocupa todo o espaço disponível
	headerGrp.orientation = 'stack';   // Empilha os elementos verticalmente

	// Cria um grupo para o botão de informações
	var labGrp = headerGrp.add('group');
	labGrp.alignment = 'left'; // Alinhamento à esquerda

	// Cria um grupo para o botão de informações
	var infoGrp = headerGrp.add('group');
	infoGrp.alignment = 'right'; // Alinhamento à direita

	// Rótulo de preview
	var labMain2 = labGrp.add('statictext', undefined, 'GUIA BÁSICO:'); // Adiciona um texto estático
	setTxtColor(labMain2, monoColors[2]);   // Define a cor do texto

	// Cria o botão de informações
	var infoBtn = infoGrp.add('iconbutton', undefined, infoIcon.light, { style: 'toolbutton' });
	infoBtn.helpTip = 'ajuda | DOCS'; // Define a dica da ferramenta

	
	var tipsGrp = layoutMainGrp2.add('group', undefined);
	tipsGrp.orientation = 'column';
	tipsGrp.alignChildren = ['left', 'center'];
	tipsGrp.spacing = 10;
	tipsGrp.margins = 0;

	var instructionsTxt = 'limpe o projeto!\nremova tudo o que não for necessário para a comp principal.\n\
preencha o os dados do formulário.\n\
posicione a agulha da timeline em um frame de referencia, e capture a imagem de preview do template.\n\
edite os parâmetros do projeto.\n\
selecione os layers editáveis do template, esses layers receberão o texto das informações preenchidas no input.\n\
caso o texto esteja em uma pre-comp, adicione a propriedade "source text" ao painel "essential graphics" e use um layer de texto na comp principal para controlar o texto.\n\
adicione as pastas de mídia e outputs necessários.\n\
em caso de dúvidas, problemas ou sugestões, mande uma mensagem pelo teams...\n\n' + relax + '\njean.billard';
	var tipsLab = tipsGrp.add('statictext', undefined, instructionsTxt, { multiline: true });
	setTxtColor(tipsLab, mainColors[1]);

	// ==============

	var div = PAD_MAKER_w.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var layoutMainGrp1 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp1.orientation = 'column';
	layoutMainGrp1.alignChildren = ['left', 'top'];
	layoutMainGrp1.spacing = 10;
	layoutMainGrp1.margins = 0;

	var div = PAD_MAKER_w.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var layoutMainGrp3 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp3.orientation = 'column';
	layoutMainGrp3.alignChildren = ['left', 'top'];
	layoutMainGrp3.spacing = 10;
	layoutMainGrp3.margins = 0;

	var div = PAD_MAKER_w.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var layoutMainGrp4 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp4.orientation = 'column';
	layoutMainGrp4.alignChildren = ['left', 'top'];
	layoutMainGrp4.spacing = 10;
	layoutMainGrp4.margins = 0;

	var labMain1 = layoutMainGrp1.add('statictext', undefined, 'FORMULÁRIO:');
	setTxtColor(labMain1, monoColors[2]);

	var formMainGrp = layoutMainGrp1.add('group', undefined);
	formMainGrp.orientation = 'column';
	formMainGrp.alignChildren = ['left', 'center'];
	formMainGrp.spacing = 20;
	formMainGrp.margins = 0;

	// ==============

	var inputGrp1 = formMainGrp.add('group', undefined);
	inputGrp1.orientation = 'column';
	inputGrp1.alignChildren = ['left', 'center'];
	inputGrp1.spacing = 2;
	inputGrp1.margins = 0;

	var statictext1 = inputGrp1.add('statictext', undefined, 'nome da configuração:');

	var edittext1 = inputGrp1.add('edittext', [0, 0, 230, 24], defaultConfigObj.configName);
	edittext1.helpTip = 'identificador da configuração.';

	var inputGrp3 = formMainGrp.add('group', undefined);
	inputGrp3.orientation = 'column';
	inputGrp3.alignChildren = ['left', 'center'];
	inputGrp3.spacing = 2;
	inputGrp3.margins = 0;

	var statictext3 = inputGrp3.add('statictext', undefined, 'dicas:');

	var edittext3 = inputGrp3.add('edittext', [0, 0, 230, 260], defaultConfigObj.tip, { multiline: true });
	edittext3.helpTip = 'as dicas para ajudar no preenchimento.';

	var inputGrp5 = formMainGrp.add('group', undefined);
	inputGrp5.orientation = 'column';
	inputGrp5.alignChildren = ['left', 'center'];
	inputGrp5.spacing = 2;
	inputGrp5.margins = 0;

	var statictext5 = inputGrp5.add('statictext', undefined, undefined);
	statictext5.text = 'exemplo de preenchimento:';

	var edittext5 = inputGrp5.add('edittext', [0, 0, 230, 100], defaultConfigObj.exemple, { multiline: true });
	edittext5.helpTip = 'apenas um exemplo.';

	// ==============

	var labMain3 = layoutMainGrp3.add('statictext', undefined, 'PREVIEW:');
	setTxtColor(labMain3, monoColors[2]);

	var previewGrp = layoutMainGrp3.add('group', undefined);
	previewGrp.orientation = 'column';
	previewGrp.alignChildren = ['left', 'center'];
	previewGrp.spacing = 10;
	previewGrp.margins = 0;

	var previewImg = previewGrp.add('image', [0, 0, 230, 130], no_preview); // Adiciona um elemento de imagem ao grupo de preview. 'no_preview'

	var btnGrp1 = layoutMainGrp3.add('group', undefined);
	btnGrp1.orientation = 'row';
	btnGrp1.spacing = 10;
	btnGrp1.margins = 0;

	var captureBtn = btnGrp1.add('button', [0, 0, 230, 24], 'capturar', { comp: app.project.activeItem, ref_time: app.project.activeItem.time });
	captureBtn.helpTip = 'captura o frame de preview,\na comp principal e o\ntempo de referência';

	var div = layoutMainGrp3.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var labMain4 = layoutMainGrp3.add('statictext', undefined, 'PROJETO:');
	setTxtColor(labMain4, monoColors[2]);

	var projGrp = layoutMainGrp3.add('group', undefined);
	projGrp.orientation = 'column';
	projGrp.alignChildren = ['left', 'center'];
	projGrp.spacing = 10;
	projGrp.margins = 0;

	// ==============

	var alphaGrp = projGrp.add('group', undefined);
	alphaGrp.orientation = 'row';
	alphaGrp.alignChildren = ['left', 'center'];
	alphaGrp.spacing = 10;
	alphaGrp.margins = 0;

	var alphaLab = alphaGrp.add('statictext', undefined, 'alerta canal alpha:');
	alphaLab.preferredSize.width = 130;

	var alphaCkb = alphaGrp.add('checkbox', undefined, undefined);
	alphaCkb.value = true;
	alphaCkb.preferredSize.width = 90;

	// ==============

	var projGeneralGrp = projGrp.add('group', undefined);
	projGeneralGrp.orientation = 'column';
	projGeneralGrp.alignChildren = ['left', 'center'];
	projGeneralGrp.spacing = 15;
	projGeneralGrp.margins = 0;

	// ==============

	var textCaseGrp = projGeneralGrp.add('group', undefined);
	textCaseGrp.orientation = 'row';
	textCaseGrp.alignChildren = ['left', 'center'];
	textCaseGrp.spacing = 10;
	textCaseGrp.margins = 0;

	var caseLab = textCaseGrp.add('statictext', undefined, 'caixa de texto:');
	caseLab.preferredSize.width = 130;

	var caseDrop_array = ['ALTA', 'baixa', 'Título', 'LiVrE'];
	var caseDrop = textCaseGrp.add('dropdownlist', undefined, caseDrop_array);
	caseDrop.selection = 0;
	caseDrop.preferredSize.width = 90;

	var prefixGrp = projGeneralGrp.add('group', undefined);
	prefixGrp.alignChildren = ['left', 'center'];
	prefixGrp.spacing = 10;
	prefixGrp.margins = 0;

	var prefixLab = prefixGrp.add('statictext', undefined, 'prefixo:');
	prefixLab.preferredSize.width = 130;

	var prefixTxt = prefixGrp.add('edittext', [0, 0, 90, 24], defaultConfigObj.prefix);
	prefixTxt.helpTip = 'prefixo que será inserido no nome final de todas as versões desse template.';

	var separatorGrp = projGeneralGrp.add('group', undefined);
	separatorGrp.alignChildren = ['left', 'center'];
	separatorGrp.spacing = 10;
	separatorGrp.margins = 0;

	var separatorLab = separatorGrp.add('statictext', undefined, 'separador:');
	separatorLab.preferredSize.width = 130;

	var separatorTxt = separatorGrp.add('edittext', [0, 0, 90, 24], defaultConfigObj.separator.replace(/\n|\r/g, '\\n'));
	separatorTxt.helpTip = 'separador de informações\n\nuse "\\n" para colocar cada linha de texto em um layer diferente';

	// ==============

	var div = projGeneralGrp.add('panel', undefined, undefined);
	div.alignment = 'fill';

	// ==============

	var layersMainGrp = projGeneralGrp.add('group', undefined);
	layersMainGrp.orientation = 'column';
	layersMainGrp.alignChildren = ['left', 'center'];
	layersMainGrp.spacing = 10;
	layersMainGrp.margins = 0;

	// ==============

	var btnGrp4 = layoutMainGrp3.add('group', undefined);
	btnGrp4.orientation = 'row';
	btnGrp4.spacing = 10;
	btnGrp4.margins = 0;

	var selectLayersBtn = btnGrp4.add('button', [0, 0, 230, 24], 'selecionar layers');

	// ==============

	var labMain5 = layoutMainGrp4.add('statictext', undefined, 'CAMINHOS:');
	setTxtColor(labMain5, monoColors[2]);

	var importMainGrp = layoutMainGrp4.add('group', undefined);
	importMainGrp.orientation = 'column';
	importMainGrp.alignChildren = ['left', 'center'];
	importMainGrp.spacing = 2;
	importMainGrp.margins = 0;

	var importLab = importMainGrp.add('statictext', undefined, 'pasta de mídias: (opcional)');

	var importGrp = importMainGrp.add('group', undefined);
	importGrp.orientation = 'row';
	importGrp.alignChildren = ['left', 'center'];
	importGrp.spacing = 10;

	var importPathLab = importGrp.add('statictext', [0, 0, 190, 24], 'caminho da pasta...', { importPath: defaultConfigObj.importPath, truncate: 'middle' });
	importPathLab.helpTip = 'caminho da pasta:';
	setTxtHighlight(importPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

	// ==============

	var outputMainGrp = layoutMainGrp4.add('group', undefined);
	outputMainGrp.orientation = 'column';
	outputMainGrp.alignChildren = ['left', 'center'];
	outputMainGrp.spacing = 2;
	outputMainGrp.margins = 0;

	var outputLab = outputMainGrp.add('statictext', undefined, 'pastas de output:');

	var btnGrp2 = layoutMainGrp4.add('group', undefined);
	btnGrp2.orientation = 'row';
	btnGrp2.spacing = 10;
	btnGrp2.margins = 0;

	var newOutputBtn = btnGrp2.add('button', [0, 0, 230, 24], 'novo output');

	var div = layoutMainGrp4.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var btnGrp3 = layoutMainGrp4.add('group', undefined);
	btnGrp3.orientation = 'row';
	btnGrp3.spacing = 10;
	btnGrp3.margins = 0;

	var testBtn = btnGrp3.add('button', [0, 0, 110, 24], 'testar');
	testBtn.helpTip = 'testar preenchimento com o exemplo';

	var makeBtn = btnGrp3.add('button', [0, 0, 110, 24], 'criar');
	makeBtn.helpTip = 'salvar template';

	// setBgColor(PAD_MAKER_w, '#515D9E'); // Cor de fundo da janela

	// ==============

	PAD_MAKER_w.onClose = function () {

		var templateLayers = getTemplateLayers();

		for (var i = 0; i < templateLayers.length; i++) {
			templateLayers[i][0].comment = '';
		}

		try {
			tempPreviewFile.remove();

		} catch (err) { }
	};

	PAD_MAKER_w.onShow = function () {

		var tempItem = app.project.activeItem;

		if (tempItem == null) return;

		var tempPreviewName = tempItem.name.toUpperCase()
			.replaceSpecialCharacters()
			.replace(/\s+/g, '_') + '_preview.png';

		captureBtn.properties.comp = tempItem;
		captureBtn.properties.ref_time = tempItem.time;

		try {
			tempPreviewFile = new File('~/Desktop/' + tempPreviewName);
			tempItem.saveFrameToPng(tempItem.time, tempPreviewFile);

			$.sleep(500);
			previewImg.image = tempPreviewFile;

		} catch (err) {
			alert(lol + '#PAD_026 - ' + err.message); // Exibe uma mensagem de erro
		}

		addLayers();
		addOutputFolder();

		separatorTxt.enabled = (layersMainGrp.children.length > 1);
		separatorLab.enabled = (layersMainGrp.children.length > 1);

		layersMainGrp.layout.layout(true);
		outputMainGrp.layout.layout(true);
		layoutMainGrp3.layout.layout(true);
		layoutMainGrp4.layout.layout(true);
		PAD_MAKER_w.layout.layout(true);
	};

	captureBtn.onClick = function () {

		var tempItem = app.project.activeItem;

		if (tempItem == null) return;

		var tempPreviewName = tempItem.name.toUpperCase()
			.replaceSpecialCharacters()
			.replace(/\s+/g, '_') + '_preview.png';

		this.properties.comp = tempItem;
		this.properties.ref_time = tempItem.time;

		try {
			tempPreviewFile = new File('~/Desktop/' + tempPreviewName);
			tempPreviewFile.remove();

		} catch (err) {
			alert(lol + '#PAD_025 - ' + err.message); // Exibe uma mensagem de erro
		}

		try {
			tempPreviewFile = new File('~/Desktop/' + tempPreviewName);
			tempItem.saveFrameToPng(tempItem.time, tempPreviewFile);

			$.sleep(300);
			previewImg.image = tempPreviewFile;

		} catch (err) {
			alert(lol + '#PAD_023 - ' + err.message); // Exibe uma mensagem de erro
		}
		previewGrp.layout.layout(true);
		layoutMainGrp3.layout.layout(true);
		PAD_MAKER_w.layout.layout(true);
	}

	selectLayersBtn.onClick = function () {

		addLayers();

		separatorTxt.enabled = (layersMainGrp.children.length > 1);
		separatorLab.enabled = (layersMainGrp.children.length > 1);

		layersMainGrp.layout.layout(true);
		layoutMainGrp3.layout.layout(true);
		PAD_MAKER_w.layout.layout(true);
	}

	importPathLab.addEventListener('mousedown', function () {

		var newImportFolder = new Folder(this.properties.importPath)
		var newImportPath = newImportFolder.selectDlg('selecione a pasta de mídias'); // Abre a janela de seleção de pastas

		if (newImportPath == null) return; // Se a janela foi cancelada, não faz nada

		this.properties.importPath = newImportPath.fullName;
		this.text = newImportPath.fullName;
		this.helpTip = 'caminho da pasta de mídias:\n\n' + newImportPath.fullName;
	});

	testBtn.onClick = function () {

		var inputTxt = edittext5.text.split(/\n{2,}/)[0];
		var txtCase = caseDrop.selection.index;
		var templateLayers = getTemplateLayers();

		var separador = separatorTxt.text.replace(/\\n|\\r/g, '\n');
		if (separatorTxt.text == '' || templateLayers.length < 2) separador = '---';

		if (txtCase == 0) inputTxt = edittext5.text = inputTxt.toUpperCase(); // Converte para MAIÚSCULAS
		if (txtCase == 1) inputTxt = edittext5.text = inputTxt.toLowerCase(); // Converte para minúsculas
		if (txtCase == 2) inputTxt = edittext5.text = inputTxt.toTitleCase(); // Converte para 'Title Case'

		var inputArray = inputTxt.split(separador);

		if (templateLayers.length == 0) return;

		app.beginUndoGroup('PADEIRO -testar preenchimento');

		for (var i = 0; i < templateLayers.length; i++) {

			var selectedLayer = templateLayers[i][0];
			var method = templateLayers[i][1];
			selectedLayer.enabled = i < inputArray.length;

			if (i > inputArray.length - 1) return;

			if (method == 'textContent') {
				selectedLayer.property('ADBE Text Properties') // Obtém a propriedade de texto
					.property('ADBE Text Document')            // Obtém o documento de texto
					.setValue(inputArray[i].trim());
			}
			if (method == 'layerName') {
				selectedLayer.name = inputArray[i].trim();
			}
		}
		captureBtn.notify();
		app.endUndoGroup();
	}

	newOutputBtn.onClick = function () {

		addOutputFolder();

		outputMainGrp.layout.layout(true);
		layoutMainGrp4.layout.layout(true);
		PAD_MAKER_w.layout.layout(true);
	}

	makeBtn.onClick = function () {

		var templateLayers = getTemplateLayers();

		for (var i = 0; i < templateLayers.length; i++) {
			templateLayers[i][0].comment = '';
		}

		captureBtn.properties.comp.comment = 'TEMPLATE';

		defaultConfigObj.configName = edittext1.text;
		defaultConfigObj.exemple = edittext5.text;
		defaultConfigObj.tip = edittext3.text;
		defaultConfigObj.compName = captureBtn.properties.comp.name;
		defaultConfigObj.prefix = prefixTxt.text;
		defaultConfigObj.refTime = captureBtn.properties.ref_time;

		defaultConfigObj.separator = separatorTxt.text.replace(/\\n|\\r/g, '\n');
		if (separatorTxt.text == '' || templateLayers.length < 2) defaultConfigObj.separator = '---';

		defaultConfigObj.textCase = ['upperCase', 'lowerCase', 'titleCase', 'freeCase'][caseDrop.selection.index];
		defaultConfigObj.inputLayers = [];

		for (var i = 0; i < layersMainGrp.children.length; i++) {

			try {
				var layerGrp = layersMainGrp.children[i];
				var methodArray = ['layerName', 'textContent'];
				var m = layerGrp.children[1].selection.index;
				var selectedLayer = layerGrp.children[2].properties.selectedLayer;

				defaultConfigObj.inputLayers.push({ layerIndex: selectedLayer.index, method: methodArray[m] });

			} catch (err) { }
		}

		defaultConfigObj.outputPath = [];

		for (var o = 0; o < outputMainGrp.children.length; o++) {

			try {
				var outputGrp = outputMainGrp.children[o];
				var outputPath = outputGrp.children[0].properties.outputPath;
				defaultConfigObj.outputPath.push(outputPath);

			} catch (err) { }
		}

		defaultConfigObj.importPath = importPathLab.properties.importPath;
		defaultConfigObj.alpha = alphaCkb.value;

		var isSaved = app.project.saveWithDialog();

		if (!isSaved) return;

		var currentProj = app.project.file;
		var currentTemplateFolder = currentProj.parent;
		var currentProjBase = decodeURI(currentProj.fullName).replace(/\.ae[pt]/, '');

		try {

			var configContent = JSON.stringify(defaultConfigObj, null, '\t');
			var templateImg = new File(currentProjBase + '_preview.png');

			tempPreviewFile.copy(templateImg);
			saveTextFile(configContent, currentProjBase + '_config.json');
			fontCollect(decodeURI(currentTemplateFolder.fullName) + '/FONTS'); // caminho final do collect

			tempPreviewFile.remove();

			openFolder(decodeURI(currentTemplateFolder.fullName));

		} catch (err) {
			alert(lol + '#PAD_028 - ' + err.message); // Exibe uma mensagem de erro
		}
	}

	PAD_MAKER_w.show();
}
