/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

function PadMakerDialog() {

	var tempPreviewFile;

	// ==============

	var PAD_MAKER_w = new Window('palette', 'NOVO TEMPLATE');
	PAD_MAKER_w.orientation = 'row';
	PAD_MAKER_w.alignChildren = ['center', 'top'];

	// ==============

	var layoutMainGrp1 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp1.orientation = 'column';
	layoutMainGrp1.alignChildren = ['left', 'top'];
	layoutMainGrp1.spacing = 10;
	layoutMainGrp1.margins = 0;

	var labMain1 = layoutMainGrp1.add('statictext', undefined, 'ETAPA 1:');

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

	var edittext1 = inputGrp1.add('edittext', undefined, '+VC TARJA RODAPÉ CONVIDADO');
	edittext1.preferredSize = [200, 24];

	// ==============

	var inputGrp2 = formMainGrp.add('group', undefined);
	inputGrp2.orientation = 'column';
	inputGrp2.alignChildren = ['left', 'center'];
	inputGrp2.spacing = 2;
	inputGrp2.margins = 0;

	var statictext2 = inputGrp2.add('statictext', undefined, 'prefixo:');

	var edittext2 = inputGrp2.add('edittext', undefined, 'RDP');
	edittext2.preferredSize = [200, 24];

	// ==============

	var inputGrp3 = formMainGrp.add('group', undefined);
	inputGrp3.orientation = 'column';
	inputGrp3.alignChildren = ['left', 'center'];
	inputGrp3.spacing = 2;
	inputGrp3.margins = 0;

	var statictext3 = inputGrp3.add('statictext', undefined, 'dicas:');

	var edittext3 = inputGrp3.add('edittext', [0, 0, 200, 200], 'digite o texto em 1, 2 ou 3 linhas para nome e informação.\n\nuse 1 linha vazia para separar mais de 1 versão do mesmo template selecionado.\n\nuse os controles nos efeitos do layer \'ctrl\'.', {multiline: true});

	// ==============

	var inputGrp5 = formMainGrp.add('group', undefined);
	inputGrp5.orientation = 'column';
	inputGrp5.alignChildren = ['left', 'center'];
	inputGrp5.spacing = 2;
	inputGrp5.margins = 0;

	var statictext5 = inputGrp5.add('statictext', undefined, undefined);
	statictext5.text = 'exemplo de preenchimento:';

	var edittext5 = inputGrp5.add('edittext' , [0,0,200,80], 'CÁSSIO\nGABUS MENDES\n---\nATOR', { multiline: true });

	var div = PAD_MAKER_w.add('panel', undefined, undefined);
	div.alignment = 'fill';

	// ==============

	var layoutMainGrp2 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp2.orientation = 'column';
	layoutMainGrp2.alignChildren = ['left', 'top'];
	layoutMainGrp2.spacing = 10;
	layoutMainGrp2.margins = 0;

	var labMain2 = layoutMainGrp2.add('statictext', undefined, 'ETAPA 2:');

	// ==============

	var div = PAD_MAKER_w.add('panel', undefined, undefined);
	div.alignment = 'fill';

	// ==============

	var layoutMainGrp3 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp3.orientation = 'column';
	layoutMainGrp3.alignChildren = ['left', 'top'];
	layoutMainGrp3.spacing = 10;
	layoutMainGrp3.margins = 0;

	var labMain3 = layoutMainGrp3.add('statictext', undefined, 'ETAPA 3:');

	// ==============

	var tipsGrp = layoutMainGrp2.add('group', undefined);
	tipsGrp.orientation = 'column';
	tipsGrp.alignChildren = ['left', 'center'];
	tipsGrp.spacing = 10;
	tipsGrp.margins = 0;

	var instructionsTxt = 'salve o projeto!\n\
abra a comp do template\n(ela precisa ter \'TEMPLATE\' no nome)\n\
posicione a agulha da timeline\nem um frame de referencia\n(essa será a imagem de preview)\n\
selecione os layers de texto que\nserão editáveis no template\n(na ordem que deverão ser preenchidos)\n\
clique no botão capturar...';
	var tipsLab = tipsGrp.add('statictext', undefined, instructionsTxt, { multiline: true });

	var div = layoutMainGrp2.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var previewGrp = layoutMainGrp2.add('group', undefined);
	previewGrp.orientation = 'column';
	previewGrp.alignChildren = ['left', 'center'];
	previewGrp.spacing = 10;
	previewGrp.margins = 0;

	var previewLab = previewGrp.add('statictext', undefined, 'preview:');
	var previewImg = previewGrp.add('image', undefined, no_preview); // Adiciona um elemento de imagem ao grupo de preview. 'no_preview'
	previewImg.size = [1920, 1080] * 0.1;    // Define o tamanho da imagem de preview, aplicando um fator de escala ('previewScale')
	
	var div = layoutMainGrp2.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var btnGrp1 = layoutMainGrp2.add('group', undefined);
	btnGrp1.orientation = 'row';
	btnGrp1.alignChildren = ['left', 'bottom'];
	btnGrp1.spacing = 10;
	btnGrp1.margins = 0;

	var captureBtn = btnGrp1.add('button', undefined, 'capturar');

	// ==============

	var projGrp = layoutMainGrp3.add('group', undefined);
	projGrp.orientation = 'column';
	projGrp.alignChildren = ['center', 'center'];
	projGrp.spacing = 10;
	projGrp.margins = 0;

	// ==============

	var alphaGrp = projGrp.add('group', undefined);
	alphaGrp.orientation = 'row';
	alphaGrp.alignChildren = ['left', 'center'];
	alphaGrp.spacing = 10;
	alphaGrp.margins = 0;

	var alphaLab = alphaGrp.add('statictext', undefined, 'canal alpha:');
	alphaLab.preferredSize.width = 90;

	var alphaCkb = alphaGrp.add('checkbox', undefined, undefined);
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
	caseLab.preferredSize.width = 90;

	var caseDrop_array = ['ALTA', 'baixa', 'Título'];
	var caseDrop = textCaseGrp.add('dropdownlist', undefined, caseDrop_array);
	caseDrop.selection = 0;
	caseDrop.preferredSize.width = 90;

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

	var layerGrp = layersMainGrp.add('group', undefined);
	layerGrp.orientation = 'row';
	layerGrp.alignChildren = ['left', 'center'];
	layerGrp.spacing = 10;
	layerGrp.margins = 0;

	var layerLab = layerGrp.add('statictext', undefined, 'layer 1:');
	layerLab.preferredSize.width = 90;

	var layerDrop_array = ['conteúdo', 'nome'];
	var layerDrop = layerGrp.add('dropdownlist', undefined, layerDrop_array);
	layerDrop.selection = 0;
	layerDrop.preferredSize.width = 90;

	var div = projGeneralGrp.add('panel', undefined, undefined);
	div.alignment = 'fill';

	// ==============

	var importGrp = projGeneralGrp.add('group', undefined);
	importGrp.orientation = 'column';
	importGrp.alignChildren = ['left', 'center'];
	importGrp.spacing = 2;
	importGrp.margins = 0;

	var importLab = importGrp.add('statictext', undefined, 'pasta de mídias:');

	var importPath = importGrp.add('statictext', undefined, 'caminho da pasta...');
	importPath.preferredSize = [150, 24];

	// ==============

	var outputGrp = projGeneralGrp.add('group', undefined);
	outputGrp.orientation = 'column';
	outputGrp.alignChildren = ['left', 'center'];
	outputGrp.spacing = 2;
	outputGrp.margins = 0;

	var outputLab = outputGrp.add('statictext', undefined, 'pastas de output:');

	var outputPath = outputGrp.add('statictext', undefined, 'caminho da pasta...');
	outputPath.preferredSize = [150, 24];

	// ==============

	var div = layoutMainGrp3.add('panel', undefined, undefined);
	div.alignment = 'fill';

	// ==============

	var btnGrp2 = layoutMainGrp3.add('group', undefined);
	btnGrp2.orientation = 'row';
	btnGrp2.alignChildren = ['left', 'bottom'];
	btnGrp2.spacing = 10;
	btnGrp2.margins = 0;

	var newOutputBtn = btnGrp2.add('button', undefined, 'novo output');

	var makeBtn = btnGrp2.add('button', undefined, 'criar');

	PAD_MAKER_w.onShow = function () {

		var tempItem = app.project.activeItem;

		tempPreviewFile = new File('~/Desktop/' + tempItem.name.toUpperCase().replaceSpecialCharacters() + '_preview.png');
		tempItem.saveFrameToPng(tempItem.time, tempPreviewFile);

		previewImg.image = tempPreviewFile;
	};

	PAD_MAKER_w.show();
}

// PadMakerDialog();