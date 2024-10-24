/* eslint-disable no-with */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
> 🔥 fx tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.effects;

var shpAdjBtn = currentGrp.add('iconbutton', iconSize, shpAdjIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
shpAdjBtn.helpTip = '◖ → adjustment layer';

//---------------------------------------------------------

currentGrp.add('panel');
 
var fxSubGrp1 = currentGrp.add('group');

var curBtn = fxSubGrp1.add('iconbutton', iconTogSize, curIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
curBtn.helpTip = 'curves';

var levBtn = fxSubGrp1.add('iconbutton', iconTogSize, levIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
levBtn.helpTip = 'levels';

var lumBtn = fxSubGrp1.add('iconbutton', iconTogSize, lumIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
lumBtn.helpTip = 'lumetri color';

//---------------------------------------------------------

var fxSubGrp2 = currentGrp.add('group');

var gaublurBtn = fxSubGrp2.add('iconbutton', iconTogSize, gaublurIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
gaublurBtn.helpTip = 'gaussian blur';

var comblurBtn = fxSubGrp2.add('iconbutton', iconTogSize, comblurIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
comblurBtn.helpTip = 'compound blur';

var lensblurBtn = fxSubGrp2.add('iconbutton', iconTogSize, lensblurIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
lensblurBtn.helpTip = 'lens blur';

//---------------------------------------------------------

var fxSubGrp3 = currentGrp.add('group');

var fillBtn = fxSubGrp3.add('iconbutton', iconTogSize, fillIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
fillBtn.helpTip = 'fill';

//---------------------------------------------------------

var fxSubGrp4 = currentGrp.add('group');

var glassBtn = fxSubGrp4.add('iconbutton', iconTogSize, glassIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
glassBtn.helpTip = '3d glasses';

//---------------------------------------------------------

var fxSubGrp5 = currentGrp.add('group');

var fracBtn = fxSubGrp5.add('iconbutton', iconTogSize, fracIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
fracBtn.helpTip = 'fractal noise';

var grainBtn = fxSubGrp5.add('iconbutton', iconTogSize, grainIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
grainBtn.helpTip = 'add grain';

/*

---------------------------------------------------------------
> 🔥 fx tab events
---------------------------------------------------------------

*/

shpAdjBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayer = aItem != null ? aItem.selectedLayers[0] : null;
	var adjLayer;

	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('selecione a comp');
		return;
	}
	app.beginUndoGroup('criar adj layer');

	var adjC = rgb(255, 255, 255);
	var adjW = aItem.width;
	var adjH = aItem.height;

	if (adjType == 0) {
		adjLayer = shpAdjustment(aItem);
	} else {
		adjLayer = aItem.layers.addSolid(adjC, '', adjW, adjH, 1.0);
	}
	if (selLayer != null) {
		adjLayer.moveBefore(selLayer);
		adjLayer.inPoint = selLayer.inPoint;
		adjLayer.outPoint = selLayer.outPoint;
	}
	adjLayer.name = adjPrefix;
	adjLayer.adjustmentLayer = true;
	adjLayer.label = 5;

	if (adjLayer instanceof AVLayer) {
		var expStr = scaleToCompSize();
		adjLayer.property('ADBE Transform Group')
			.property('ADBE Scale').expression = expStr;
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

curBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE CurvesCustom';

	app.beginUndoGroup('curves');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

levBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Pro Levels2';

	app.beginUndoGroup('levels');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

lumBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Lumetri';

	app.beginUndoGroup('lumetri color');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

gaublurBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Gaussian Blur 2';

	app.beginUndoGroup('gaussian blur');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

comblurBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Compound Blur';

	app.beginUndoGroup('compound blur');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

lensblurBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Camera Lens Blur';

	app.beginUndoGroup('lens blur');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

fillBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Fill';

	app.beginUndoGroup('fill');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
		effect.property(3).setValue(randomColor(labelColors)); // color
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

fracBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE Fractal Noise';

	app.beginUndoGroup('fractal noise');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

grainBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'VISINF Grain Implant';

	app.beginUndoGroup('add grain');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
	}
	app.endUndoGroup();
};

//---------------------------------------------------------

glassBtn.onClick = function () {
	var aItem = app.project.activeItem;
	var selLayers = aItem != null ? aItem.selectedLayers : [];
	// error...
	if (selLayers.length == 0) {
		showTabErr('selecione um layer');
		return;
	}
	var fxName = 'ADBE 3D Glasses2';

	app.beginUndoGroup('3d glasses');

	for (i = 0; i < selLayers.length; i++) {
		var effect = selLayers[i].property('ADBE Effect Parade').addProperty(fxName);
		effect.property(1).setValue(selLayers[i].index); // left view
		effect.property(2).setValue(selLayers[i].index); // right view
		effect.property(7).setValue(12); // 3d view
	}
	app.endUndoGroup();
};
