/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

/*

---------------------------------------------------------------
> 🕹️ ctrl tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.controls;
var ctrlSubGrp1 = currentGrp.add('group');

// copy animation toggle... 
var aniTogBtn = ctrlSubGrp1.add('iconbutton', iconTogSize, aniTogIcon[iconTheme], { name: 'btn', style: 'toolbutton', toggle: 1 });
aniTogBtn.helpTip = '⦿ → copiar animação\n\
> modificador\
transfere a animação das propriedades\
de transformação do layer selecionado\
durante a criação do null pai.';

// copy expressions toggle... 
var exprTogBtn = ctrlSubGrp1.add('iconbutton', iconTogSize, exprTogIcon[iconTheme], { name: 'btn', style: 'toolbutton', toggle: 1 });
exprTogBtn.helpTip = '⦿ → copiar expressões\n\
> modificador\
transfere as expressões das propriedades\
de transformação do layer selecionado\
durante a criação do null pai.';

// create parent null... 
var nullShpBtn = currentGrp.add('iconbutton', iconSize, nullIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
nullShpBtn.helpTip = '◖ → criar null pai\n\
cria um null pai na posição de cada layer selecionado.\
caso não exista um layer selecionado, o null será criado no centro da tela.\
\
seu comportamento será alterado pelos modificadores acima.';

//---------------------------------------------------------

currentGrp.add('panel');
 
var ctrlSubGrp2 = currentGrp.add('group');

// create centered null
var nullCShpBtn = ctrlSubGrp2.add('iconbutton', iconSize, nullCenterIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
nullCShpBtn.helpTip = '◖ → criar null central\n\
cria um único null pai no centro geométrico entre os layers selecionados.\
pelo menos dois layers precisam estar selecionados.';

//---------------------------------------------------------

currentGrp.add('panel');
 
var ctrlSubGrp3 = currentGrp.add('group');

// select hierarchy sub group...
// var hGrp = ctrlSubGrp3.add('group', undefined, { name: 'hGrp' });
// hGrp.orientation = '◖ → column';

// select parent button...
var upHBtn = ctrlSubGrp3.add('iconbutton', iconSize, upIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
upHBtn.helpTip = '◖ → selecionar pai\n\
navega pela hierarquia subindo um nível.';

// select children button...
var dwnHBtn = ctrlSubGrp3.add('iconbutton', iconSize, downIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
dwnHBtn.helpTip = '◖ → select children\n\
navega pela hierarquia descendo um nível.';

/*

---------------------------------------------------------------
> 🕹️ ctrl tab events
---------------------------------------------------------------

*/

upHBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	var upArray = [];
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('selecione a comp');
		return;
	}
	app.beginUndoGroup('selecionar pai');

	if (selLayers.length > 0) {

		for (var i = 0; i < selLayers.length; i++) {

			if (selLayers[i].parent != null) {
				upArray.push(selLayers[i].parent);
			}
		}
		if (upArray.length > 0) {

			for (i = 0; i < selLayers.length; i++) {
				selLayers[i].selected = false;
			}
			for (i = 0; i < upArray.length; i++) {

				if (upArray[i].shy && aItem.hideShyLayers) {
					upArray[i].shy = false;
				}
				upArray[i].selected = true;
			}
		}
	} else {
		try {
			aItem.layer('ctrl_comp').selected = true;
		} catch (err) { }
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

dwnHBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	var dwnArray = [];
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('selecione a comp');
		return;
	}
	app.beginUndoGroup('selecionar filhos');

	if (selLayers.length > 0) {

		for (var i = 0; i < selLayers.length; i++) {

			for (var l = 1; l <= aItem.numLayers; l++) {
				var lParent = aItem.layer(l).parent;

				if (lParent == selLayers[i]) {
					dwnArray.push(aItem.layer(l));
				}
			}
		}
		if (dwnArray.length > 0) {

			for (i = 0; i < selLayers.length; i++) {
				selLayers[i].selected = false;
			}
			for (i = 0; i < dwnArray.length; i++) {

				if (dwnArray[i].shy && aItem.hideShyLayers) {
					dwnArray[i].shy = false;
				}
				dwnArray[i].selected = true;
			}
		}
	} else {
		try {
			aItem.layer('ctrl_comp').selected = true;
		} catch (err) { }
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

nullShpBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('selecione a comp');
		return;
	}
	app.beginUndoGroup('criar null');

	if (selLayers.length == 0) {
		createNull(nullType);
		return;
	}
	for (var l = 0; l < selLayers.length; l++) {
		var selLayer = selLayers[l];
		var nullLayer = createNull(nullType);
		nullLayer.moveBefore(selLayer);

		if (selLayer.hasTrackMatte && appV < 23) {
			nullLayer.moveBefore(aItem.layer(selLayer.index - 1));
		}

		nullLayer.name += deletePrefix(selLayer.name)
			.replaceSpecialCharacters();

		if (nullLayer.name == selLayer.name) nullLayer.name = nameInc(nullLayer.name);

		setHierarchy(selLayer, nullLayer);
		nullLayer.inPoint = selLayer.inPoint;
		nullLayer.outPoint = selLayer.outPoint;

		if (aniTogBtn.value) cloneKeys(selLayer, nullLayer);
		if (exprTogBtn.value) cloneExpressions(selLayer, nullLayer);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

nullCShpBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length < 2) {
		showTabErr('selecione mais de um layer');
		return;
	}
	var lIndex = aItem != null ? aItem.numLayers : 0;

	for (var i = 0; i < selLayers.length; i++) {
		selLayers[i].parent = null;

		if (selLayers[i].index < lIndex) lIndex = i;
	}
	app.beginUndoGroup('criar null central');

	var nullLayer = createNull(nullType);

	nullLayer.name += 'center';
	nullLayer.moveBefore(selLayers[lIndex]);
	nullLayer
		.property('ADBE Transform Group')
		.property('ADBE Position')
		.setValue(findCenter(selLayers));

	for (var s = 0; s < selLayers.length; s++) {
		selLayers[s].parent = nullLayer;
	}
	app.endUndoGroup();
};