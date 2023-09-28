/* eslint-disable no-with */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
> color, guides and branding tab
---------------------------------------------------------------

*/

currentGrp = tabsGrp.brand;

// ui color buttons...

var colorSubGrp1 = currentGrp.add('group');
var colors1Txt = colorSubGrp1.add('statictext', undefined, 'mono:', { name: 'label' , truncate: 'end'});
colors1Txt.maximumSize.width = 35;

//---------------------------------------------------------


var colorSubGrp2 = currentGrp.add('group');
var colors2Txt = colorSubGrp2.add('statictext', undefined, 'main:', { name: 'label' , truncate: 'end'});
colors2Txt.maximumSize.width = 30;


// mono colors...
createColorButtons(monoColors, colorSubGrp1);
// main colors...
createColorButtons(mainColors, colorSubGrp2);

//---------------------------------------------------------

var shpPalletBtn = currentGrp.add('iconbutton', iconSize, palletIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
shpPalletBtn.helpTip = '◖ → criar layer guia de cores';

var LOGO_GLOBOBtn = currentGrp.add('iconbutton', iconSize, logoGloboIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
LOGO_GLOBOBtn.helpTip = '◖ → logo GLOBO animado\n\
cria a animação de zoom out\
do LOGO GLOBO como shape layer.';

/*

  ---------------------------------------------------------------
  > color, guides and branding events
  ---------------------------------------------------------------

*/

for (var i = 1; i < colorSubGrp1.children.length; i++) {
	colorSubGrp1.children[i].onClick = function () {
		var hex = this.properties.name;

		batchFill(hex, hexToRGB(hex));
	};
}

for (var j = 1; j < colorSubGrp2.children.length; j++) {
	colorSubGrp2.children[j].onClick = function () {
		var hex = this.properties.name;

		batchFill(hex, hexToRGB(hex));
	};
}

//---------------------------------------------------------

shpPalletBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	app.beginUndoGroup('pallet');

	var palletLayer = colorPallet();

	palletLayer.name = 'pallet';
	palletLayer.guideLayer = true;
	palletLayer.locked = true;
	palletLayer.property('ADBE Transform Group')
		.property('ADBE Position')
		.expression('[0,0]');

	app.endUndoGroup();
};

//---------------------------------------------------------

LOGO_GLOBOBtn.onClick = function () {
	var aItem = app.project.activeItem;
	// error...
	if (!(aItem instanceof CompItem)) {
		showTabErr('comp not selected');
		return;
	}
	app.beginUndoGroup('logo GLOBO');

	LOGO_GLOBO();

	app.endUndoGroup();
};