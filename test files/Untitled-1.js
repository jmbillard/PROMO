function exemplo() {

	// expressions variable...
	var exp;

	// keyframe ease objects variable...
	var easeIn1;
	var easeIn2;
	var easeIn3;
	var easeOut1;
	var easeOut2;
	var easeOut3;

	// text layer creation...
	var layer = app.project.activeItem.layers.addText();

	// text document...
	var text = layer.property('ADBE Text Properties');
	var textDoc = text.property('ADBE Text Document').value;
	textDoc.text = 'super texto!';
	textDoc.font = 'TTHoves-Medium';
	textDoc.fontSize = 112.099998474121;
	textDoc.applyStroke = false;
	textDoc.applyFill = true;
	textDoc.fillColor = [1,1,1];
	textDoc.strokeWidth = 1;
	textDoc.strokeOverFill = true;
	textDoc.tracking = 0;
	textDoc.leading = 77.6999969482422;
	textDoc.justification = 7415;

	text.property('ADBE Text Document').setValue(textDoc);
	pathOptions_text1 = text.property('ADBE Text Path Options');
	moreOptions_text1 = text.property('ADBE Text More Options');
	animators_text1 = text.property('ADBE Text Animators');
	animator1_animators2 = animators_text1.addProperty('ADBE Text Animator');
	animator1_animators2.name = 'Animator 1';
	selectors_animator13 = animator1_animators2.property('ADBE Text Selectors');
	rangeSelector1_selectors4 = selectors_animator13.addProperty('ADBE Text Selector');
	rangeSelector1_selectors4.name = 'Range Selector 1';

	// range selector 1 offset animation...
	// key 1...
	rangeSelector1_selectors4.property('ADBE Text Percent Offset').setValueAtTime(0, 0);

	// key 2...
	rangeSelector1_selectors4.property('ADBE Text Percent Offset').setValueAtTime(1.03436770103437, 100);

	// key 1 ease...
	easeIn1 = new KeyframeEase(0.00, 16.67);
	easeOut1 = new KeyframeEase(96.68, 16.67);
	rangeSelector1_selectors4.property('ADBE Text Percent Offset').setTemporalEaseAtKey(1, [easeIn1], [easeOut1]);
	rangeSelector1_selectors4.property('ADBE Text Percent Offset').setInterpolationTypeAtKey(1, 6612, 6612);

	// key 2 ease...
	easeIn1 = new KeyframeEase(96.68, 16.67);
	easeOut1 = new KeyframeEase(0.00, 16.67);
	rangeSelector1_selectors4.property('ADBE Text Percent Offset').setTemporalEaseAtKey(2, [easeIn1], [easeOut1]);
	rangeSelector1_selectors4.property('ADBE Text Percent Offset').setInterpolationTypeAtKey(2, 6612, 6612);

	advanced_rangeSelector15 = rangeSelector1_selectors4.property('ADBE Text Range Advanced');
	properties_animator13 = animator1_animators2.property('ADBE Text Animator Properties');
	position_properties4 = properties_animator13.addProperty('ADBE Text Position 3D');
	properties_animator13.property('ADBE Text Position 3D').setValue([0,101,0]);

	// transformations...
	var transform = layer.property('ADBE Transform Group');
	transform.property('ADBE Position').setValue([720,759,0]);

	// transform scale animation...
	// key 1...
	transform.property('ADBE Scale').setValueAtTime(1.03436770103437, [100,100,100]);

	// key 2...
	transform.property('ADBE Scale').setValueAtTime(1.46813480146813, [194,194,100]);

	// key 3...
	transform.property('ADBE Scale').setValueAtTime(2.26893560226894, [156,156,100]);

	// key 1 ease...	easeIn1 = new KeyframeEase(0.00, 16.67);
	easeOut1 = new KeyframeEase(216.71, 16.67);
	easeIn2 = new KeyframeEase(0.00, 16.67);
	easeOut2 = new KeyframeEase(216.71, 16.67);
	easeIn3 = new KeyframeEase(0.00, 16.67);
	easeOut3 = new KeyframeEase(1.19, 16.67);
	transform.property('ADBE Scale').setTemporalEaseAtKey(1, [easeIn1, easeIn2, easeIn3], [easeOut1, easeOut2, easeOut3]);
	transform.property('ADBE Scale').setInterpolationTypeAtKey(1, 6612, 6612);

	// key 2 ease...	easeIn1 = new KeyframeEase(0.00, 100.00);
	easeOut1 = new KeyframeEase(0.00, 51.97);
	easeIn2 = new KeyframeEase(-0.00, 100.00);
	easeOut2 = new KeyframeEase(0.00, 51.97);
	easeIn3 = new KeyframeEase(0.00, 33.33);
	easeOut3 = new KeyframeEase(0.00, 33.33);
	transform.property('ADBE Scale').setTemporalEaseAtKey(2, [easeIn1, easeIn2, easeIn3], [easeOut1, easeOut2, easeOut3]);
	transform.property('ADBE Scale').setInterpolationTypeAtKey(2, 6613, 6613);

	// key 3 ease...	easeIn1 = new KeyframeEase(0.00, 73.19);
	easeOut1 = new KeyframeEase(0.00, 16.67);
	easeIn2 = new KeyframeEase(-0.00, 73.19);
	easeOut2 = new KeyframeEase(0.00, 16.67);
	easeIn3 = new KeyframeEase(0.00, 33.33);
	easeOut3 = new KeyframeEase(0.00, 16.67);
	transform.property('ADBE Scale').setTemporalEaseAtKey(3, [easeIn1, easeIn2, easeIn3], [easeOut1, easeOut2, easeOut3]);
	transform.property('ADBE Scale').setInterpolationTypeAtKey(3, 6613, 6613);


	// fx...
	var effects = layer.property('ADBE Effect Parade');
	// '4-color gradient' effect...
	ncolorGradient_effects1 = effects.addProperty('ADBE 4ColorGradient');
	ncolorGradient_effects1.name = '4-Color Gradient';
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0001').setValue([444,610]);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0003').setValue([974,576]);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0005').setValue([464,860]);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0007').setValue([1020,852]);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0009').setValue(12);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0010').setValue(29);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0013').setValue(53);
	ncolorGradient_effects1.property('ADBE 4ColorGradient-0014').setValue(5);
	compositingOptions_ncolorGradient2 = ncolorGradient_effects1.property('ADBE Effect Built In Params');

	// layer attributes...
	layer.name = 'exemplo';
	layer.label = 1;
	layer.inPoint = 0;
	layer.outPoint = 43.9773106439773;

	return layer;
}

exemplo();