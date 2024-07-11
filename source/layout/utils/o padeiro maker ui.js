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

	var layoutMainGrp2 = PAD_MAKER_w.add('group', undefined);
	layoutMainGrp2.orientation = 'column';
	layoutMainGrp2.alignChildren = ['left', 'top'];
	layoutMainGrp2.spacing = 10;
	layoutMainGrp2.margins = 0;

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

	var edittext1 = inputGrp1.add('edittext', undefined, '+VC TARJA RODAPÉ CONVIDADO');
	edittext1.preferredSize = [200, 24];
	edittext1.helpTip = 'identificador da configuração.';

	var inputGrp2 = formMainGrp.add('group', undefined);
	inputGrp2.orientation = 'column';
	inputGrp2.alignChildren = ['left', 'center'];
	inputGrp2.spacing = 2;
	inputGrp2.margins = 0;

	var statictext2 = inputGrp2.add('statictext', undefined, 'prefixo:');

	var edittext2 = inputGrp2.add('edittext', undefined, 'TARJA');
	edittext2.preferredSize = [200, 24];
	edittext2.helpTip = 'prefixo que será inserido no nome final de todas as versões desse template.';

	var inputGrp3 = formMainGrp.add('group', undefined);
	inputGrp3.orientation = 'column';
	inputGrp3.alignChildren = ['left', 'center'];
	inputGrp3.spacing = 2;
	inputGrp3.margins = 0;

	var statictext3 = inputGrp3.add('statictext', undefined, 'dicas:');

	var edittext3 = inputGrp3.add('edittext', [0, 0, 200, 200], 'digite o texto em 1 ou 2 linhas para nome e informação.\n\nuse 1 linha com \'---\' para separar nome e informação.\n\nuse 1 linha vazia para separar mais de 1 versão do mesmo template selecionado.\n\nuse os controles nos efeitos do layer \'ctrl\'.', { multiline: true });
	edittext3.helpTip = 'as dicas para ajudar no preenchimento.';

	var inputGrp5 = formMainGrp.add('group', undefined);
	inputGrp5.orientation = 'column';
	inputGrp5.alignChildren = ['left', 'center'];
	inputGrp5.spacing = 2;
	inputGrp5.margins = 0;

	var statictext5 = inputGrp5.add('statictext', undefined, undefined);
	statictext5.text = 'exemplo de preenchimento:';

	var edittext5 = inputGrp5.add('edittext', [0, 0, 200, 80], 'CÁSSIO\nGABUS MENDES\n---\nATOR', { multiline: true });
	edittext5.helpTip = 'apenas um exemplo.';

	// ==============

	var labMain2 = layoutMainGrp2.add('statictext', undefined, 'GUIA BÁSICO:');
	setTxtColor(labMain2, monoColors[2]);

	var tipsGrp = layoutMainGrp2.add('group', undefined);
	tipsGrp.orientation = 'column';
	tipsGrp.alignChildren = ['left', 'center'];
	tipsGrp.spacing = 10;
	tipsGrp.margins = 0;

	var instructionsTxt = 'limpe o projeto!\nremova tudo o que não for necessário para a comp principal.\n\
renomeie a comp principal, ela precisa ter \'TEMPLATE\' no final do nome.\n\
posicione a agulha da timeline em um frame de referencia, essa será a imagem de preview do template.\n\
selecione os layers editáveis do template, esses layers receberão o texto das informações preenchidas no input.\n\
adicione as pastas de mídia e outputs necessários.\n\
em caso de dúvidas ou problemas, é só me mandar mensagem pelo teams...\n\n' + relax + '\njean.billard';
	var tipsLab = tipsGrp.add('statictext', undefined, instructionsTxt, { multiline: true });
	setTxtColor(tipsLab, mainColors[1]);

	// var div = layoutMainGrp2.add('panel', undefined, undefined);
	// div.alignment = 'fill';

	// ==============

	var labMain3 = layoutMainGrp3.add('statictext', undefined, 'PREVIEW:');
	setTxtColor(labMain3, monoColors[2]);

	var previewGrp = layoutMainGrp3.add('group', undefined);
	previewGrp.orientation = 'column';
	previewGrp.alignChildren = ['left', 'center'];
	previewGrp.spacing = 10;
	previewGrp.margins = 0;

	// var previewLab = previewGrp.add('statictext', undefined, 'preview:');
	var previewImg = previewGrp.add('image', undefined, no_preview); // Adiciona um elemento de imagem ao grupo de preview. 'no_preview'
	previewImg.size = [1920, 1080] * 0.1;    // Define o tamanho da imagem de preview, aplicando um fator de escala ('previewScale')

	var btnGrp1 = layoutMainGrp3.add('group', undefined);
	btnGrp1.orientation = 'row';
	btnGrp1.alignChildren = ['left', 'bottom'];
	btnGrp1.spacing = 10;
	btnGrp1.margins = 0;

	var captureBtn = btnGrp1.add('button', undefined, 'capturar');

	var div = layoutMainGrp3.add('panel', undefined, undefined);
	div.alignment = 'fill';
	
	var labMain4 = layoutMainGrp3.add('statictext', undefined, 'PROJETO:');
	setTxtColor(labMain4, monoColors[2]);

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

	var labMain5 = layoutMainGrp4.add('statictext', undefined, 'CAMINHOS:');
	setTxtColor(labMain5, monoColors[2]);

	var importMainGrp = layoutMainGrp4.add('group', undefined);
	importMainGrp.orientation = 'column';
	importMainGrp.alignChildren = ['left', 'center'];
	importMainGrp.spacing = 2;
	importMainGrp.margins = 0;

	var importLab = importMainGrp.add('statictext', undefined, 'pastas de mídias:');

	var importGrp = importMainGrp.add('group', undefined);
	importGrp.orientation = 'row';
	importGrp.alignChildren = ['left', 'center'];
	importGrp.spacing = 10;

	var importPathLab = importGrp.add('statictext', undefined, 'caminho da pasta...', { importPath: '' });
	importPathLab.helpTip = 'caminho da pasta:';
	importPathLab.preferredSize = [150, 24];
	setTxtHighlight(importPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

	// ==============

	var outputMainGrp = layoutMainGrp4.add('group', undefined);
	outputMainGrp.orientation = 'column';
	outputMainGrp.alignChildren = ['left', 'center'];
	outputMainGrp.spacing = 2;
	outputMainGrp.margins = 0;

	var outputLab = outputMainGrp.add('statictext', undefined, 'pastas de output:');

	var outputGrp = outputMainGrp.add('group', undefined);
	outputGrp.orientation = 'row';
	outputGrp.alignChildren = ['left', 'center'];
	outputGrp.spacing = 10;

	var outputPathLab = outputGrp.add('statictext', undefined, 'caminho da pasta...', { outputPath: '' });
	outputPathLab.helpTip = 'caminho da pasta:';
	outputPathLab.preferredSize = [150, 24];
	setTxtHighlight(outputPathLab, '#FFD88E', '#FF7B79'); // Cor de destaque do texto

	var deleteBtn = outputGrp.add('iconbutton', undefined, closeIcon.light, { style: 'toolbutton' });
	deleteBtn.helpTip = 'deletar caminho';
	deleteBtn.preferredSize = [24, 24];

	var div = layoutMainGrp4.add('panel', undefined, undefined);
	div.alignment = 'fill';

	var btnGrp2 = layoutMainGrp4.add('group', undefined);
	btnGrp2.orientation = 'row';
	btnGrp2.alignChildren = ['left', 'bottom'];
	btnGrp2.spacing = 10;
	btnGrp2.margins = 0;

	var newOutputBtn = btnGrp2.add('button', undefined, 'novo output');

	var makeBtn = btnGrp2.add('button', undefined, 'criar');


	// ==============
	PAD_MAKER_w.onShow = function () {

		var tempItem = app.project.activeItem;

		tempPreviewFile = new File('~/Desktop/' + tempItem.name.toUpperCase().replaceSpecialCharacters() + '_preview.png');
		tempItem.saveFrameToPng(tempItem.time, tempPreviewFile);

		previewImg.image = tempPreviewFile;
	};

	PAD_MAKER_w.show();
}

// PadMakerDialog();