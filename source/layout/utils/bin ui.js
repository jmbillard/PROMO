/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/*

---------------------------- info ----------------------------

  title:   bin

  notes:   a multi purpose tool to for development
		   1. binary converter;
		   2. layer definition;
		   3. expression string formatter;

  copy this file to 'ScriptUI Panels' folder

  author:  Jean-Marc Billard
  version: 2.0
  date:    xx-xx-2022

--------------------------------------------------------------

*/

//  linter settings:
//  jshint -W061
//  jshint -W043
//  jscs:disable maximumLineLength


/* cSpell:disable */
var evalIcon = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1F\x00\x00\x00\x1F\b\x06\x00\x00\x00\x1F\u00AE\x169\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00CEIDATH\u0089\u00ED\u0096\r\r\u00C3 \x10\u0085\u00DF\u009B\x02$TB% a\x12&a\x12*\u00A1\x12*a\x12*a\x12&\u00A1\x0EXH !\f\u00D6\u00B5\u0094\u0092,w\u00C9K\u00E8\x0F\u00F9\u00EE\u00B8;r4\u00C6\u00A0\u0095]\u009A\u0091\x05.p\u00817\u0085\u0093T$\x1FN}5\u00BA\u00BD\u00E1b\x01x\u00DAO\u0081F\x00*\u00F5o\u0089rp\x0F^\u00A2\u00F5\u00FDL\u00B8\x020D\u00A7\u00F0\x02\u00A0\u00AB\u00C3\u0083\u00E7\x0E\u00C0\x1C91\u0097\u00A6\u00E2\'x\u00F0^\u00BB\u00C8\u00BD\x03\u00B7\x12\u00F8\u00D6V\u00EB\\*\u00AAV{|\u00EC:\u00D5\x01\u00B5\x0B\u00CEF:%r\u00DD\u009F\u00DDj6\u00D7\u00D7#\u00A0k\u00F0)r`8\x12\u00EA\u0095\u009D\u00E1H\u008Eni\u00C1\u00CBZ\u00ED\u0090\u00FC:\f\x1Ac\u00F8\u00B1\'\x07\u00DFjM\u00E1{L\u0086\t\u0081\x0B\u00FC\u00CF\u00E1\x00\u00DE\u00B7X\u00C9\u0096>o\u00F1g\x00\x00\x00\x00IEND\u00AEB`\u0082';
var exportIcon = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1F\x00\x00\x00\x1F\b\x06\x00\x00\x00\x1F\u00AE\x169\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00kIDATH\u0089\u00ED\u0096Q\n\u00C0 \fC\u009B\u00E1\u00FD\u00AF\u009C}m\u008C:\u00EB\x14f\x07\u00CB\u00FB,\u00C2\u00C3X\u0082 iYlif\u00C9%\u0097|\x15\u00A5\u00E5\x01p\u00B6\x0FI\u00F8\u0099\u00E7\u00EE\u00CC1\u00FB\u00E4\u00CDS\u00EB\u00B5\x19\u00FB\u0095\u00A7O\u00D0\u008B\u00D9\u00A3\u00D8+F\u00B6v\x16\u00C5\x1E\x12mvT<\u00D6y2\u00C5^1\u00DB\u00ED#\u00FC7v\u00FDd$\u0097\u00FC}\u00CCl\x07H+:1\u0093\u00A1\x15`\x00\x00\x00\x00IEND\u00AEB`\u0082';
var pickIcon = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1F\x00\x00\x00\x1F\b\x06\x00\x00\x00\x1F\u00AE\x169\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\bIDATH\u0089\u00EDV\u00D1\r\u0083 \x14\u00BC\u00EB\x04\u008E\u00E2(t\x03Fq\x04Ga\x04\u00BB\u0081#8\u0082\x1B\u00BC\u00C6\u00F6\x11\u0089UA\x1BK?x\u00C9\u008B\x06\u00CEwp\u00DEC)"\u00C8\x15\u00B7l\u00CC\u0085\u00BC\u0090\u00C7\u0082\u00A4%\u00E9H\x0E$Es\u00D01{\u0098}j\u00B5X\x02\u00A8\x01\u00F4\x13<\u0092\x13\u00A6N\u00A9\u00F9\u00AA\u009B@l\x03\u00C2\x11@\x13\x12\u00E8\u00C2\x1A\u009D\u00F38\u00FB5\u00B9\x16\u00F6\x05\x1D\u0080j\x07[)\u00C6\u00E3\u00A3\n\u00C4\u00C8\u00BD\u00D4.Y\u00CAy\x01\u00FDi\u00F2@\u00EEqo\u00C7\x1B\n\u008C)\u00F2\u00EF\u00B9\u00DD\u00E8\u00B5\x15\u00911\u009C iHv\u009A&\u009CSl\u00BB\u00A8q\u00CC\u00ED\x00\u0086\u00B5w\u00A7\x05\u0097\u00AE7\x1B^\x19\u00CE\u00CA.\u00EF\u00B5}\u008Cw\u0098\u00DB\u00CA{\u00A2K}>U\u00F6\u00EB#\u00A7\u00EC{;\u00EF\u00D7L#"S+\u00DD\x01<4\u00EF:\x16\u0086Y\u00D48l\u00B8\u00CB[\u00ED?\x0F\x19\u00C9}\u00BCJ\u00CE\x0F\u00CB\u0082\u00E0\u00F7\u009F\u00D4\x15\x15\\\u00D0\u0086\u00A2\u00F7.u\u00B7a\u0096\u00FF\u00F6B^\u00C8\u00AF\x0F\x00O\u00E8m\u00FB\u00CE\u0083\u00A1W|\x00\x00\x00\x00IEND\u00AEB`\u0082';
var spacer = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00-\b\x06\x00\x00\x00\u009EpZI\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x003IDATH\u0089\u00ED\u00D6\u00B1\r\x000\f\x02A\u00F0\u00FE;\x13y\x05\u00E4.\u008FDy\r\x15N\u00A2&S)`\tmg\u00CB\u00AA@ \x10\b\u00BC\u0082|\u0080\u009F\u00A1\u00A4\x07\u0081u\bW\u00C1$\u0089E\x00\x00\x00\x00IEND\u00AEB`\u0082';
/* cSpell:enable */

// formats the expression value from a property...
function expCode(exp) {

	return exp.trim().replace(/\\/g, '\\\\')
		.replace(/'|"/g, '\\\'')
		.replace(/\t|[ ]{2}/g, '\\t')
		.split(/\r*\n+/)
		.join('\\\n');
}

// formats the object property key names and values...
function objCode(obj) {
	var valName = '';
	var objValue = '';
	switch (obj.toString()) {
		case '[object Shape]':
			valName = 'shp';

			for (var o in obj) {

				if (obj.hasOwnProperty(o)) {
					var keyVal = obj[o];
					var keyName = o.toString();
					var keyStrVal = keyVal.toString();

					if (keyStrVal != '') {

						if (Array.isArray(keyVal)) {
							keyStrVal = '[';

							for (var v = 0; v < keyVal.length; v++) {
								var kv = keyVal[v];

								if (Array.isArray(kv)) {
									keyStrVal += '[';

									for (var d = 0; d < kv.length; d++) {
										keyStrVal += kv[d].toFixed(2) + ',';
									}
									keyStrVal = keyStrVal.popLastCharacter() + '],';
								}
							}
							keyStrVal = keyStrVal.popLastCharacter() + ']';
						}
						objValue += '\t' + valName + '.' + keyName + '= ' + keyStrVal + ';\n';
					}
				}
			}
			objValue = '\n\t' + valName + ' = new Shape();\n' + objValue;
			break;

		default:
			valName = 'textDoc';
			var textDoc = obj;
			var textContent = textDoc.text.replace(/\n|\r/g, '\\n');
			objValue += '\ttextDoc.text = \'' + textContent + '\';\
\ttextDoc.font = \'' + textDoc.font + '\';\
\ttextDoc.fontSize = ' + textDoc.fontSize + ';\
\ttextDoc.applyStroke = ' + textDoc.applyStroke.toString() + ';\
\ttextDoc.applyFill = ' + textDoc.applyFill.toString() + ';\n';

			if (textDoc.applyFill) {
				objValue += '\ttextDoc.fillColor = [' + textDoc.fillColor.toString() + '];\n';
			}
			if (textDoc.applyStroke) {
				objValue += '\ttextDoc.strokeColor = [' + textDoc.strokeColor.toString() + '];\n';
			}
			objValue += '\ttextDoc.strokeWidth = ' + textDoc.strokeWidth + ';\
\ttextDoc.strokeOverFill = ' + textDoc.strokeOverFill.toString() + ';\
\ttextDoc.tracking = ' + textDoc.tracking + ';\
\ttextDoc.leading = ' + textDoc.leading + ';\
\ttextDoc.justification = ' + textDoc.justification + ';\n';
			break;
	}
	return [objValue + '\n', valName];
}

function valueCode(prop, varName) {

	var propValue = '';
	var mn = prop.matchName;
	var val = prop.value;

	if (Array.isArray(val)) {
		val = '[' + val.toString() + ']';

	} else {

		if (typeof val == 'object') {
			val = objCode(prop.value)[1];
			propValue += objCode(prop.value)[0];

		} else {
			val = val.toString();
		}
	}
	propValue += '\t' + varName + '.property(\'' + mn + '\').setValue(' + val + ');\n';

	return propValue;
}

function animCode(prop, varName) {

	var anim = '';
	var mn = prop.matchName;
	var val = prop.value;

	anim += '\n\t// ' + prop.parentProperty.name
		.toLowerCase() + ' ' + prop.name
			.toLowerCase() + ' animation...\n';

	for (var k = 1; k <= prop.numKeys; k++) {

		val = prop.keyValue(k);
		var t = prop.keyTime(k);
		var tInTArray = prop.keyInTemporalEase(k);
		var tOutTArray = prop.keyOutTemporalEase(k);
		var kInIType = prop.keyInInterpolationType(k);
		var kOutIType = prop.keyOutInterpolationType(k);
		var easeIn = '';
		var easeOut = '';

		if (Array.isArray(val)) {
			val = '[' + val.toString() + ']';

		} else {

			if (typeof val == 'object') {
				val = objCode(prop.keyValue(k))[1];
				anim += objCode(prop.keyValue(k))[0];

			} else {
				val = val.toString();
			}
		}
		anim += '\t// key ' + k + '...\
\t' + varName + '.property(\'' + mn + '\').setValueAtTime(' + t + ', ' + val + ');\n\n';

		try {
			prop.setTemporalEaseAtKey(k, tInTArray, tOutTArray);
			prop.setInterpolationTypeAtKey(k, kInIType, kOutIType);

			for (var d = 0; d < tOutTArray.length; d++) {
				var inS = tInTArray[d].speed.toFixed(2);
				var outS = tOutTArray[d].speed.toFixed(2);
				var inI = tInTArray[d].influence;
				var outI = tOutTArray[d].influence;

				inI = (inI < 0.1) ? 0.1 : inI.toFixed(2);
				outI = (outI < 0.1) ? 0.1 : outI.toFixed(2);

				anim += '\teaseIn' + (d + 1) + ' = new KeyframeEase(' + inS + ', ' + inI + ');\
\teaseOut' + (d + 1) + ' = new KeyframeEase(' + outS + ', ' + outI + ');\n';

				if (d > 0) {
					easeIn += ', easeIn' + (d + 1);
					easeOut += ', easeOut' + (d + 1);

				} else {
					easeIn += 'easeIn' + (d + 1);
					easeOut += 'easeOut' + (d + 1);
				}
			}
			anim += '\t' + varName + '.property(\'' + mn + '\').setTemporalEaseAtKey(' + k + ', [' + easeIn + '], [' + easeOut + ']);\
\t' + varName + '.property(\'' + mn + '\').setInterpolationTypeAtKey(' + k + ', ' + kInIType + ', ' + kOutIType + ');\n';

		} catch (err) { }

		try {

			if (prop.isSpatial) {
				var kInSArray = prop.keyInSpatialTangent(k).toString();
				var kOutSArray = prop.keyOutSpatialTangent(k).toString();
				var ct = prop.keySpatialContinuous(k).toString();

				anim += '\t' + varName + '.property(\'' + mn + '\').setSpatialTangentsAtKey(' + k + ', [' + kInSArray + '], [' + kOutSArray + ']);\n';
				anim += '\t' + varName + '.property(\'' + mn + '\').setSpatialContinuousAtKey(' + k + ', ' + ct + ');\n';
			}
		} catch (err) { }
	}

	return anim;
}

function layerCode(layer) {

	var layerStr = '';
	var lName = layer.name
		.replace(/\\/g, '\\\\')
		.replace(/'/g, '\\\'');

	function getProperties(prop) {

		for (var i = 1; i <= prop.numProperties; i++) {
			var cProp = prop.property(i);
			var D = cProp.propertyDepth - 1;
			var pProp = cProp.parentProperty;
			var pName = pProp.name
				.replace(/^[\d]+/, 'n')
				.toCamelCase()
				//.replace(/[-&|.]+/, '_')
				.replace(/[^a-z0-9_]/ig, '');
			var pName2 = pProp.parentProperty.name
				.replace(/^[\d]+/, 'n')
				.toCamelCase()
				//.replace(/[-&|.]+/, '_')
				.replace(/[^a-z0-9_]/ig, '') + (D - 1);
			var var2 = (pProp.propertyDepth == 1) ? pName : pName + '_' + pName2;
			var varN = cProp.name
				.replace(/\\/g, '\\\\')
				.replace(/'/g, '\\\'');
			var mn = cProp.matchName;
			var exp;
			var var1 = cProp.name.replace(/^[\d]+/, 'n')
				.toCamelCase()
				//.replace(/[-&|.]+/, '_')
				.replace(/[^a-z0-9_]/ig, '') + '_' + pName + D;

			if (cProp.numProperties > 0) {

				if (pProp.canAddProperty(mn)) {

					if (pProp == effects) layerStr += '\t// \'' + cProp.name.toLowerCase() + '\' effect...\n';
					if (pProp == masks) layerStr += '\n\t// \'' + cProp.name.toLowerCase() + '\' mask...\n';

					layerStr += '\t' + var1 + ' = ' + var2 + '.addProperty(\'' + mn + '\');\n';
					try {
						var cPropName = cProp.name;
						cProp.name = cPropName;

						layerStr += '\t' + var1 + '.name = \'' + varN + '\';\n';

					} catch (err) { }

					if (!cProp.enabled) layerStr += var1 + '.enabled = false;\n';

				} else {
					layerStr += '\t' + var1 + ' = ' + var2 + '.property(\'' + mn + '\');\n';
				}
				// effects like 'tint' have a button that breaks the function...
				try {
					getProperties(cProp);
				} catch (err) { }
				
				if (pProp == masks) {
					layerStr += '\t' + var1 + '.maskMode = ' + cProp.maskMode + ';\n';
					if (cProp.inverted) layerStr += '\t' + var1 + '.inverted = true;\n';
					layerStr += '\t' + var1 + '.color = [' + cProp.color.toString() + '];\n';
					layerStr += '\t' + var1 + '.maskFeatherFalloff = ' + cProp.maskFeatherFalloff + ';\n';
					layerStr += '\t' + var1 + '.maskMotionBlur = ' + cProp.maskMotionBlur + ';\n';
					if (cProp.rotoBezier) layerStr += '\t' + var1 + '.rotoBezier = true;\n';
					if (cProp.locked) layerStr += '\t' + var1 + '.locked = true;\n';
				}

			} else {

				if (cProp.isModified) {

					if (pProp.canAddProperty(mn)) {
						layerStr += '\t' + var1 + ' = ' + var2 + '.addProperty(\'' + mn + '\');\n';
					}
					var val = cProp.value;
					exp = cProp.expression;
					try {
						cProp.setValue(val);
						layerStr += valueCode(cProp, var2);

						if (exp != '') {
							layerStr += '\n\t// ' + pProp.name
								.toLowerCase() + ' ' + cProp.name
								.toLowerCase() + ' expression...\
\texp = \'' + expCode(exp) + '\';\
\t' + var2 + '.property(\'' + mn + '\').expression = exp;\n\n';
						}
					} catch (err) { }

					if (cProp.numKeys > 0) {
						layerStr += animCode(cProp, var2);
					}
				}
			}
		}
		return layerStr;
	}
	var transform = layer.property('ADBE Transform Group');
	var effects = layer.property('ADBE Effect Parade');
	var masks = layer.property('ADBE Mask Parade');
	var marker = layer.property('ADBE Marker');

	layerStr += 'function ' + lName
		.replaceSpecialCharacters()
		.toCamelCase()
		.replace(/-/g, '_')
		.replace(/\W/g, '') + '() {\n\n';
	layerStr += '\t// expressions variable...\
\tvar exp;\
\n\t// keyframe ease objects variable...\
\tvar easeIn1;\
\tvar easeIn2;\
\tvar easeIn3;\
\tvar easeOut1;\
\tvar easeOut2;\
\tvar easeOut3;\n';

	switch (true) {

		case layer instanceof ShapeLayer:
			var contents = layer.property('ADBE Root Vectors Group');
			layerStr += '\n\t// shape object variable...\
\tvar shp;\
\n\t// shape layer creation...\
\tvar layer = app.project.activeItem.layers.addShape();\n';

			if (contents.numProperties > 0) {
				layerStr += '\n\t// vector content...\
\tvar contents = layer.property(\'ADBE Root Vectors Group\');\n';
				getProperties(contents);
			}
			break;

		case layer instanceof TextLayer:
			var text = layer.property('ADBE Text Properties');
			layerStr += '\n\t// text layer creation...\
\tvar layer = app.project.activeItem.layers.addText();\
\n\t// text document...\
\tvar text = layer.property(\'ADBE Text Properties\');\
\tvar textDoc = text.property(\'ADBE Text Document\').value;\n';

			getProperties(text);
			break;
	}
	layerStr += '\n\t// transformations...\
\tvar transform = layer.property(\'ADBE Transform Group\');\n';
	getProperties(transform);

	if (masks.numProperties > 0) {
		layerStr += '\n\t// masks...\
\tvar masks = layer.property(\'ADBE Mask Parade\');\n';
		getProperties(masks);
	}
	if (effects.numProperties > 0) {
		layerStr += '\n\t// fx...\
\tvar effects = layer.property(\'ADBE Effect Parade\');\n';
		getProperties(effects);
	}
	var i = 1;

	while (i > 0) {

		try {
			var t = marker.keyTime(i);
			var comment = marker.keyValue(i).comment;
			var l = marker.keyValue(i).label;
			var dur = marker.keyValue(i).duration;
			layerStr += '\n\t// layer marker ' + i + '...\
\tvar t' + i + ' = ' + t + ';\
\tvar marker' + i + ' = new MarkerValue(\'' + comment + '\');\
\tmarker' + i + '.label = ' + l + ';\
\tmarker' + i + '.duration = ' + dur + ';\
\tlayer.property(\'ADBE Marker\').setValueAtTime(t' + i + ', marker' + i + ');\n\n';
			i += 1;

		} catch (err) {
			break;
		}
	}
	layerStr += '\n\t// layer attributes...\
\tlayer.name = \'' + lName + '\';\
\tlayer.label = ' + layer.label + ';\
\tlayer.inPoint = ' + layer.inPoint + ';\
\tlayer.outPoint = ' + layer.outPoint + ';';
	
	if (layer.autoOrient != 4212) layerStr += '\n\tlayer.autoOrient = ' + layer.autoOrient + ';';
	if (layer.comment != '') layerStr += '\n\tlayer.comment = \'' + layer.comment + '\';';
	if (layer.locked) layerStr += '\n\tlayer.locked = true;';
	if (layer.guideLayer) layerStr += '\n\tlayer.guideLayer = true;';
	
	layerStr += '\n\n\treturn layer;\n}\n\n';
	layerStr += lName
		.replaceSpecialCharacters()
		.toCamelCase()
		.replace(/-/g, '_')
		.replace(/\W/g, '') + '();';

	return layerStr;
}

function bin_ui() {

	var coolBlue = [0.23, 0.74, 1];
	var offWhite = [0.95, 0.95, 0.95];
	var fileArray = [];
	var codeArray = [];
	var nameTxt;
	var codeTxt;
	var aItem;
	var aLayer;
	var hasData = false;
	var wBin = new Window('palette');
	wBin.alignChildren = 'fill';

	// botões e spacers
	var stcTxt = wBin.add('statictext', [0, 0, 600, 15], '', { truncate: 'end' });
	var edtText = wBin.add('edittext', [0, 0, 600, 600], '', { multiline: true });
	var progressBarBin = wBin.add('progressbar', [0, 0, 600, 5], 0, 100);
	var btnGrp = wBin.add('group');
	btnGrp.alignment = 'center';
	var pickBtn = btnGrp.add('iconbutton', undefined, pickIcon, { style: 'toolbutton' });
	pickBtn.helpTip = '◖ → pick files or selected layer';

	btnGrp.add('image', undefined, spacer);

	var exportBtn = btnGrp.add('iconbutton', undefined, exportIcon, { style: 'toolbutton' });
	exportBtn.helpTip = '◖ → export data';

	var evalBtn = btnGrp.add('iconbutton', undefined, evalIcon, { style: 'toolbutton' });
	evalBtn.helpTip = '◖ → run data';

	var radGrp = btnGrp.add('group');
	var expRad01 = radGrp.add('radiobutton', undefined, 'binary');
	expRad01.helpTip = '⦿ → binary converter';
	var expRad02 = radGrp.add('radiobutton', undefined, 'layer def.');
	expRad02.helpTip = '⦿ → get selected layer definition';
	var expRad03 = radGrp.add('radiobutton', undefined, 'exp. string');
	expRad03.helpTip = '⦿ → format selected property expression string';
	var expRad04 = radGrp.add('radiobutton', undefined, 'icon images');
	expRad04.helpTip = '⦿ → light and dark icon objects';

	var pType = stcTxt.graphics.PenType.SOLID_COLOR;
	var bType = wBin.graphics.BrushType.SOLID_COLOR;

	stcTxt.graphics.foregroundColor = stcTxt.graphics.newPen(pType, coolBlue, 1);
	wBin.graphics.backgroundColor = wBin.graphics.newBrush(bType, offWhite);

	// eventos
	wBin.onShow = function () {
		btnGrp.layout.layout(true);
		radGrp.children[0].value = true;
		radGrp.children[0].active = true;
		evalBtn.enabled = false;
		exportBtn.enabled = false;
	};

	edtText.onChanging = function () {

		hasData = (edtText.text.trim() != '');
		exportBtn.enabled = hasData;
		evalBtn.enabled = hasData && expRad02.value;
	};

	pickBtn.onClick = function () {

		nameTxt = '';
		codeTxt = '';

		switch (true) {

			case expRad01.value:
				fileArray = File.openDialog('open files...', undefined, true);
				var fileNameArray = [];

				if (fileArray != null) {
					progressBarBin.maxvalue = fileArray.length - 1;

					for (var i = 0; i < fileArray.length; i++) {
						var fileName = decodeURI(fileArray[i].name);
						fileNameArray.push(fileName);

						fileName = deleteFileExt(fileName)
							.replaceSpecialCharacters();
						fileName = (fileName.split(/\s/).length > 1) ? fileName.toCamelCase() : fileName;
						codeTxt += ['\nvar', fileName, '=', fileToBinary(fileArray[i]) + ';\n'].join(' ');

						codeArray.push(fileToBinary(fileArray[i]));
						progressBarBin.value = i;
						wBin.update();
					}
					nameTxt = fileNameArray.join(' | ');
					stcTxt.helpTip = nameTxt;
					stcTxt.text = 'file: ' + nameTxt;
					edtText.text = codeTxt;
				}
				break;

			case expRad04.value:
				var iconObjNameArray = [];
				var iconObjArray = [];
				fileArray = File.openDialog('open icons...', undefined, true);

				if (fileArray != null) {
					progressBarBin.maxvalue = fileArray.length - 1;

					for (var n = 0; n < fileArray.length; n++) {
						var iconFileName = decodeURI(deleteFileExt(fileArray[n].name));
						var objName = iconFileName.replaceSpecialCharacters()
							.replace(/dark/gi, '')
							.replace(/light/gi, '')
							.toCamelCase();
						var iconObj = {};

						var o = iconObjNameArray.indexOf(objName);

						if (o < 0) {

							if (iconFileName.match(/dark/i)) {
								iconObj.dark = fileToBinary(fileArray[n]);

							} else {
								iconObj.light = fileToBinary(fileArray[n]);
							}
							iconObjNameArray.push(objName);
							iconObjArray.push(iconObj);

						} else {
							if (iconFileName.match(/dark/i)) {
								iconObjArray[o].dark = fileToBinary(fileArray[n]);

							} else {
								iconObjArray[o].light = fileToBinary(fileArray[n]);
							}
							iconObj = iconObjArray[o];
							codeTxt += '\nvar ' + objName + ' = ' + formatObjStr(iconObj) + ';\n';
						}
						progressBarBin.value = i;
						wBin.update();
					}
					edtText.text = codeTxt;
				}
				break;

			case expRad02.value:
				aItem = app.project.activeItem;
				aLayer = aItem.selectedLayers[0];

				stcTxt.text = 'layer: ' + aLayer.name;
				edtText.text = layerCode(aLayer);
				break;

			case expRad03.value:
				aItem = app.project.activeItem;
				aLayer = aItem.selectedLayers[0];
				var aProp = aLayer.selectedProperties[0];
				var exp;
				if (aProp.numProperties == undefined) {
					exp = (aProp.expression == undefined) ? '' : aProp.expression;
					if (exp != '') {
						exp = 'var exp = \'' + expCode(exp) + '\';\n';
						edtText.text = exp;
					}
					stcTxt.text = 'prop: ' + aProp.name;

				} else {
					for (var p = 1; p <= aProp.numProperties; p++) {
						var sProp = aProp.property(p);

						if (aProp.property(p).selected) {
							exp = (sProp.expression == undefined) ? '' : sProp.expression;
							if (exp != '') {
								exp = 'var exp = \'' + expCode(exp) + '\';\n';
								edtText.text = exp;
							}
							stcTxt.text = 'prop: ' + aProp.name;
						}
					}
				}
				break;
		}
		hasData = (edtText.text.trim() != '');
		exportBtn.enabled = hasData;
		evalBtn.enabled = hasData && expRad02.value;
	};

	exportBtn.onClick = function () {
		var fileExpObj;
		progressBarBin.value = 0;
		progressBarBin.maxvalue = 100;

		if (edtText.text != '') {
			var fileTypesArray = ['Script:*.jsx', 'Script include:*.jsxinc', 'Text:*.txt'];
			fileExpObj = File.saveDialog('export...', fileTypesArray);

			if (fileExpObj != null) {
				writeFileContent(fileExpObj, edtText.text);
			}
		}
		progressBarBin.value = 100;
	};

	evalBtn.onClick = function () {
		app.beginUndoGroup('run...');

		if (expRad02.value) {

			if (edtText.text != '') {
				eval(edtText.text);
			}
		}
		app.endUndoGroup();
	};

	expRad01.onClick = expRad02.onClick = expRad03.onClick = function () {
		evalBtn.enabled = expRad02.value && hasData;
	};

	wBin.show();
}
