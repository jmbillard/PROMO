/*

---------------------------------------------------------------
> 🚶 anim tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.animation;
var animSubGrp1 = currentGrp.add('group');

// copy keyframe influences...
var copyInfBtn = animSubGrp1.add('iconbutton', iconSize, copyInfluenceIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
copyInfBtn.helpTip = '◖ → copiar influencia do keyframe\n\
copia a influencia e velocidade\
de UM keyframe selecionado';

var keyStatsGrp = animSubGrp1.add('group', undefined, { name: 'keyStatsGrp' });
keyStatsGrp.orientation = 'stack';

// keyframe images...
for (var kf = 0; kf < keyImgs.length; kf++) {
	var keyImg = keyStatsGrp.add('image', undefined, keyImgs[kf], { name: 'keyImg' + kf });
	keyImg.helpTip = 'sem dados de keyframe';

	// only the first keyframe image is visible...
	if (kf > 0) keyImg.visible = false;
}

// paste keyframe influences...
var pasteInfBtn = animSubGrp1.add('iconbutton', iconSize, pasteInfluenceIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
pasteInfBtn.helpTip = '◖ → colar influencia no keyframe\n\
cola a influencia e velocidade\
em todos os keyframe selecionados';

//---------------------------------------------------------

currentGrp.add('panel');


var lockTrmBtn = currentGrp.add('iconbutton', iconSize, lockPropIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
lockTrmBtn.helpTip = '◖ → bloquear propriedades de transformação\n\
bloqueia todas as propriedades de transformação\
não animadas e sem expressões';


//---------------------------------------------------------

currentGrp.add('panel');


var animSubGrp3 = currentGrp.add('group');

var layerRandBtn = animSubGrp3.add('iconbutton', iconSize, randomizeLayerTimesIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
layerRandBtn.helpTip = '◖ → randomizar layers na timeline\n\
move os layers selecionados um número\
aleatório de frames na time line.\n\
seu comportamento será alterado pelo valor abaixo.';


var layerRandTxt = animSubGrp3.add('edittext', undefined, '30');
layerRandTxt.minimumSize.width = vMin;

var layerSeqBtn = animSubGrp3.add('iconbutton', iconSize, sequenceLayerTimesIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
layerSeqBtn.helpTip = '◖ → sequenciar layers na timeline\n\
sequencia os layers selecionados usando\
um valor  na time line.\n\
seu comportamento será alterado pelo valor acima.';

//---------------------------------------------------------

// currentGrp.add('panel');


// // tools button...
// var toolBtn = currentGrp.add('iconbutton', iconSize, rigToolsIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
// toolBtn.helpTip = 'rigs and tools';

/*

---------------------------------------------------------------
> 🚶 animation tab events
---------------------------------------------------------------

*/

// Função executada quando o botão "copyInfBtn" é clicado.
copyInfBtn.onClick = function () {
	var aItem = app.project.activeItem;                  // Obtém o item ativo (composição)
	var selLayer = aItem ? aItem.selectedLayers[0] : null;    // Obtém a primeira camada selecionada (ou null se não houver)
	var aProp = selLayer ? selLayer.selectedProperties[0] : null; // Obtém a primeira propriedade selecionada da camada (ou null se não houver)
	var keyPreview = keyStatsGrp.keyImg0;

	// Se não houver propriedade selecionada, sai da função
	if (!aProp) return;

	// Verifica se apenas um keyframe está selecionado
	if (aProp.selectedKeys.length !== 1) {
		showTabErr('Selecione apenas 1 keyframe'); // Mostra um alerta de erro
		return;
	}

	var k = aProp.selectedKeys[0];             // Índice do keyframe selecionado
	var kIn = aProp.keyInTemporalEase(k)[0];   // Suavização de entrada do keyframe
	var kOut = aProp.keyOutTemporalEase(k)[0]; // Suavização de saída do keyframe

	// Armazena os dados do keyframe em um objeto global 'keyData'
	keyData.value = true;
	keyData.inType = aProp.keyInInterpolationType(k);
	keyData.outType = aProp.keyOutInterpolationType(k);
	keyData.inEase = aProp.keyInTemporalEase(k);
	keyData.outEase = aProp.keyOutTemporalEase(k);

	// Define as variáveis de influência de suavização
	easeInInfluence = kIn.influence;
	easeOutInfluence = kOut.influence;

	// Esconde todas as imagens de keyframe no grupo 'keyStatsGrp'
	for (var kf = 0; kf < keyStatsGrp.children.length; kf++) {
		keyStatsGrp.children[kf].visible = false;
	}

	// 6614 - hold
	// 6613 - ease
	// 6612 - linear
	// define a imagem de keyframe correta com base nos tipos de interpolação (in/out) do keyframe
	switch (true) {
		// ease - linear
		case keyData.inType == 6613 && keyData.outType == 6612:
			keyPreview = keyStatsGrp.keyImg1;
			break;

		// linear - ease
		case keyData.inType == 6612 && keyData.outType == 6613:
			keyPreview = keyStatsGrp.keyImg2;
			break;

		// ease - ease
		case keyData.inType == 6613 && keyData.outType == 6613:
			keyPreview = keyStatsGrp.keyImg3;
			break;

		// hold - linear
		case keyData.inType == 6614 && keyData.outType == 6612:
			keyPreview = keyStatsGrp.keyImg6;
			break;

		// hold - ease
		case keyData.inType == 6614 && keyData.outType == 6613:
			keyPreview = keyStatsGrp.keyImg9;
			break;

		// linear - hold
		case keyData.inType == 6612 && keyData.outType == 6614:
			keyPreview = keyStatsGrp.keyImg7;
			break;

		// ease - hold
		case keyData.inType == 6613 && keyData.outType == 6614:
			keyPreview = keyStatsGrp.keyImg8;
			break;

		// hold - hold
		case keyData.inType == 6614 && keyData.outType == 6614:
			keyPreview = keyStatsGrp.keyImg5;
			break;

		// linear - linear
		default:
			keyPreview = keyStatsGrp.keyImg4;
			break;
	}

	// Exibe a imagem de keyframe correta
	keyPreview.visible = true;
	keyPreview.helpTip = '';
};

//---------------------------------------------------------

pasteInfBtn.onClick = function () {
	// error...
	if (!keyData.value) {
		showTabErr('no keyframe data');
		return;
	}
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];

	for (var l = 0; l < selLayers.length; l++) {
		applyEase(selLayers[l]);
	}
};

//---------------------------------------------------------

layerRandTxt.onEnterKey = layerRandTxt.onChange = function () {
	var limit = parseInt(this.text.replace(/\D/g, ''));

	this.text = limit;
	this.helpTip = limit + ' frames';
};

//---------------------------------------------------------

lockTrmBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('layer not selected');
		return;
	}
	app.beginUndoGroup('lock transform properties');

	for (i = 0; i < selLayers.length; i++) {
		lockTrmProp(selLayers[i]);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

// randomize layer start times
layerRandBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length < 2) {
		showTabErr('select 2 or more layers');
		return;
	}
	var limit = parseInt(layerRandTxt.text.replace(/\D/g, ''));
	var fDur = aItem.frameDuration;
	var rArray = [];
	var rMax = 0;
	var rMin = 1;

	app.beginUndoGroup('randomize layers');

	for (var j = 0; j < selLayers.length; j++) {
		// generates a random integer between 0 and 1...
		var r = gaussRnd(3);
		rArray.push(r);

		// update the highest and lowest values so far...
		rMax = Math.max(r, rMax);
		rMin = Math.min(r, rMin);
	}
	for (var i = 0; i < selLayers.length; i++) {
		var f = (rArray[i] - rMin) / (rMax - rMin); // normalized value...
		var increment = Math.round(limit * f) * fDur; // final random inclement time...

		selLayers[i].startTime += increment;
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

// sequence layer start times
layerSeqBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length < 2) {
		showTabErr('select 2 or more layers');
		return;
	}
	var fDur = aItem.frameDuration;
	var increment = parseInt(layerRandTxt.text.replace(/\D/g, '')) * fDur;
	var stMin = aItem.duration;

	app.beginUndoGroup('sequence layers');

	for (var j = 0; j < selLayers.length; j++) {
		stMin = Math.min(selLayers[j].inPoint, stMin);
	}
	for (var i = 0; i < selLayers.length; i++) {
		selLayers[i].startTime += (stMin - selLayers[i].inPoint) + (increment * i);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

// toolBtn.onClick = function () {
// 	currentGrp.visible = false;
// 	currentGrp = tabsGrp.tools;
// 	readme = '#--subseção-ferramentas-';
// 	openTab();
// };


/*

---------------------------------------------------------------
> 🔨 tools tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.tools;

// guides rig...
var guidesBtn = currentGrp.add('iconbutton', iconSize, guidesIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
guidesBtn.helpTip = '◖ → columns guide layer rig';

// dynamic arrow rig...
var arrowBtn = currentGrp.add('iconbutton', iconSize, arrowIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
arrowBtn.helpTip = '◖ → simple arrow rig';

//---------------------------------------------------------

currentGrp.add('panel');


// simple counter rig...
var counterBtn = currentGrp.add('iconbutton', iconSize, counterIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
counterBtn.helpTip = '◖ → make counter rig';

//---------------------------------------------------------

var toolsSubGrp1 = currentGrp.add('group');

// text typing rig...
var typeAnimBtn = toolsSubGrp1.add('iconbutton', iconSize, typewriterIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
typeAnimBtn.helpTip = '◖ → typewriter animation';

var wordsBtn = toolsSubGrp1.add('iconbutton', iconSize, wordsIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
wordsBtn.helpTip = '◖ → words animation';

var simpleBoxBtn = toolsSubGrp1.add('iconbutton', iconSize, boxIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
simpleBoxBtn.helpTip = '◖ → simple box bg base';

//---------------------------------------------------------

currentGrp.add('panel');


// wiggle position rig...
var wigBtn = currentGrp.add('iconbutton', iconSize, wigIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
wigBtn.helpTip = '◖ → wig rig';

//---------------------------------------------------------

currentGrp.add('panel');


// simple ik rig...
var ikBtn = currentGrp.add('iconbutton', iconSize, ikIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
ikBtn.helpTip = '◖ → simple ik rig';

/*

---------------------------------------------------------------
> 🔨 tools tab events
---------------------------------------------------------------

*/

arrowBtn.onClick = function () {
	var aItem = app.project.activeItem;

	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	app.beginUndoGroup('arrow rig');

	var expFx = arrow();

	var bodyShape = new Shape();
	bodyShape.vertices = [
		[0, 0],
		[80, 0],
		[80, -250],
		[160, -250],
	];
	bodyShape.inTangents = [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	];
	bodyShape.outTangents = [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	];
	bodyShape.closed = false;

	var headShape = new Shape();
	headShape.vertices = [
		[-10, -10],
		[0, 0],
		[-10, 10],
	];
	headShape.inTangents = [
		[0, 0],
		[0, 0],
		[0, 0],
	];
	headShape.outTangents = [
		[0, 0],
		[0, 0],
		[0, 0],
	];
	headShape.closed = false;

	var shpLayer = shpArrow(bodyShape, headShape);
	addPseudoEffect('arrow', expFx);
	shpLayer.name = 'arrow';
	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

counterBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	var valArray = [];

	app.beginUndoGroup('counter');

	if (selLayers.length == 0) {
		var cLayer = aItem.layers.addText('0');
		selLayers.push(cLayer);
	}

	for (var l = 0; l < selLayers.length; l++) {
		// layer...
		var aLayer = selLayers[l];

		if (!(aLayer instanceof TextLayer)) continue;
		// text document...
		var text = aLayer.property('ADBE Text Properties');
		var textDoc = text.property('ADBE Text Document');
		var textDocVal = textDoc.value;

		valArray.push(textDocVal);
	}
	// the pseudo effect is applied to all selected layers at once (ADOBE limitation);
	addPseudoEffect('counter', toolCounter);

	// textArray index... the textArray length may not match selLayers length...
	var t = 0;
	for (var n = 0; n < selLayers.length; n++) {
		// layer...
		var nLayer = selLayers[n];

		if (!(nLayer instanceof TextLayer)) continue;
		// text document...
		var text2 = nLayer.property('ADBE Text Properties');
		var textDoc2 = text2.property('ADBE Text Document');
		var textDocVal2 = textDoc2.value;

		textDoc2.setValue(valArray[t]);

		selLayers[n].name = txtPrefix + 'counter ' + (valArray.length - t); // → txt_counter 1 ... txtArray.length
		// textArray index increment...
		t += 1;
	}
	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

guidesBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}

	app.beginUndoGroup('column guides');

	var guideLayer = app.project.activeItem.layers.addShape();
	addPseudoEffect('guides', toolGuides);
	guideLayer.name = 'guides';
	guideLayer.guideLayer = true;

	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

wigBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('layer not selected');
		return;
	}
	var wLayer;
	var wProp;
	var w = wig();
	var expFx = w[0];
	var expStr = w[1];

	app.beginUndoGroup('wig rig');

	for (i = 0; i < selLayers.length; i++) {
		wLayer = selLayers[i];
		wProp = wLayer
			.property('ADBE Transform Group')
			.property('ADBE Position');

		addPseudoEffect('wig', expFx);
		wProp.expression = expStr;
	}
	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

ikBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length != 3) {
		showTabErr('select 3 layers in order');
		return;
	}
	app.beginUndoGroup('simple ik');

	var bone1 = selLayers[0];
	var bone2 = selLayers[1];
	var bone3 = selLayers[2];

	bone2.parent = bone1;
	bone3.parent = bone2;

	var bone1Pos = bone1
		.property('ADBE Transform Group')
		.property('ADBE Position').value;
	var bone1Rot = bone1
		.property('ADBE Transform Group')
		.property('ADBE Rotate Z').value;
	var bone3Pos = bone3
		.property('ADBE Transform Group')
		.property('ADBE Position').value;
	var k = ik(bone1.name, bone2.name, bone3.name);
	var expFx = k[0];
	var expStr1 = k[1];
	var expStr2 = k[2];
	var expStr3 = k[3];
	var expStr4 = k[4];

	zeroLayer = aItem.layers.addShape();

	if (nullType == 0) {
		ctrlLayer = shpNull();
	} else {
		ctrlLayer = aItem.layers.addNull();
	}
	zeroLayer.moveBefore(bone3);
	zeroLayer.name = bone2.name + ' end';
	zeroLayer.guideLayer = true;
	zeroLayer.label = 2;
	zeroLayer.parent = bone3.parent;
	zeroLayer
		.property('ADBE Transform Group')
		.property('ADBE Position')
		.setValue(bone3Pos);
	zeroLayer.locked = true;
	zeroLayer.shy = true;

	ctrlLayer.moveBefore(bone3);
	ctrlLayer.name = ctrlPrefix + bone3.name;
	ctrlLayer.guideLayer = true;
	ctrlLayer.label = 1;
	ctrlLayer.parent = bone3.parent;
	ctrlLayer
		.property('ADBE Transform Group')
		.property('ADBE Position')
		.setValue(bone3Pos);
	ctrlLayer.parent = bone1.parent;
	ctrlLayer.parent = null;

	bone3.parent = null;

	addPseudoEffect('simple IK', expFx);
	bone1
		.property('ADBE Transform Group')
		.property('ADBE Rotate Z').expression = expStr1;
	bone2
		.property('ADBE Transform Group')
		.property('ADBE Rotate Z').expression = expStr2;
	bone3
		.property('ADBE Transform Group')
		.property('ADBE Position').expression = expStr3;
	bone3
		.property('ADBE Transform Group')
		.property('ADBE Rotate Z').expression = expStr4;

	if (
		bone1.property('ADBE Transform Group').property('ADBE Rotate Z')
			.value != bone1Rot
	) {
		ctrlLayer
			.property('ADBE Effect Parade')
			.property('simple IK')
			.property('flip orientation')
			.setValue(true);
	}
	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

typeAnimBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	var txtArray = [];

	app.beginUndoGroup('typewriter');

	if (selLayers.length == 0) {
		selLayers.push(aItem.layers.addText('Lettering automático...'));
	}

	for (var l = 0; l < selLayers.length; l++) {
		var content = textContent(selLayers[l]).replace(/[\—\-\_\|]$/, '');

		if (content == '') continue;
		txtArray.push(content);
	}
	// the pseudo effect is applied to all selected layers at once (ADOBE limitation);

	if (txtArray.length == 0) return;
	addPseudoEffect('typewriter', toolTypewriter);

	// textArray index... the textArray length may not match selLayers length...
	var t = 0;
	for (var n = 0; n < selLayers.length; n++) {
		// layer...
		var nLayer = selLayers[n];

		if (!(nLayer instanceof TextLayer)) continue;
		// text document...
		var textDoc2 = nLayer
			.property('ADBE Text Properties')
			.property('ADBE Text Document');
		var textDocVal2 = textDoc2.value;

		textDocVal2.text = txtArray[t];
		textDoc2.setValue(textDocVal2);

		selLayers[n].name =
			txtPrefix + 'lettering ' + (txtArray.length - t); // → txt_lettering 1 ... txtArray.length
		// textArray index increment...
		t += 1;
	}
	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

wordsBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	var txtArray = [];

	app.beginUndoGroup('words');

	if (selLayers.length == 0) {
		selLayers.push(aItem.layers.addText('Lettering automático...'));
	}

	for (var l = 0; l < selLayers.length; l++) {
		var content = textContent(selLayers[l]).replace(/[\—\-\_\|]$/, '');

		if (content == '') continue;
		txtArray.push(content);
	}
	if (txtArray.length == 0) return;
	// the pseudo effect is applied to all selected layers at once (ADOBE limitation);
	addPseudoEffect('words', toolWords);

	// textArray index... the textArray length may not match selLayers length...
	var t = 0;
	for (var n = 0; n < selLayers.length; n++) {
		// layer...
		var nLayer = selLayers[n];

		if (!(nLayer instanceof TextLayer)) continue;
		// text document...
		var textDoc2 = nLayer
			.property('ADBE Text Properties')
			.property('ADBE Text Document');
		var textDocVal2 = textDoc2.value;

		textDocVal2.text = txtArray[t];
		textDoc2.setValue(textDocVal2);

		selLayers[n].name =
			txtPrefix + 'lettering ' + (txtArray.length - t); // → txt_lettering 1 ... txtArray.length
		// textArray index increment...
		t += 1;
	}
	app.endUndoGroup();
	removeFolder(tempFolder);
};

//---------------------------------------------------------

simpleBoxBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	app.beginUndoGroup('simple box');

	var selLayers = aItem != null ? aItem.selectedLayers : [];

	if (selLayers.length == 0) {
		selLayers.push(aItem.layers.addText('Tarja simples...'));
	}

	for (var l = 0; l < selLayers.length; l++) {
		var layer = selLayers[l];
		// fx...
		var effects = layer.property('ADBE Effect Parade');
		// base effect...
		base_effects1 = effects.addProperty('ADBE Simple Choker');
		base_effects1.name = 'base';
		base_effects1.property('ADBE Simple Choker-0001').setValue(2);
		// margin effect...
		margin_effects1 = effects.addProperty('ADBE Minimax');
		margin_effects1.name = 'margin';
		margin_effects1.property('ADBE Minimax-0002').setValue(20);
		margin_effects1.property('ADBE Minimax-0003').setValue(6);
		// colors effect...
		colors_effects1 = effects.addProperty('ADBE Tint');
		colors_effects1.name = 'colors';
		colors_effects1
			.property('ADBE Tint-0001')
			.setValue([35 / 255, 30 / 255, 30 / 255, 1]);
		colors_effects1
			.property('ADBE Tint-0002')
			.setValue([238 / 255, 1, 140 / 255, 1]);
	}
	app.endUndoGroup();
};
