// Variável global para armazenar a influência copiada
var copiedEase = null;

function createUI() {
	var win = new Window("palette", "Copiar e Colar Influência");
	win.orientation = "column";

	var btnCopy = win.add("button", undefined, "Copiar Influência");
	btnCopy.onClick = function () {
		copyKeyframeEase();
	};

	var btnPaste = win.add("button", undefined, "Colar Influência");
	btnPaste.onClick = function () {
		pasteKeyframeEase();
	};

	win.show();
}

function copyKeyframeEase() {
	var comp = app.project.activeItem;
	if (!comp || !(comp instanceof CompItem)) {
		alert("Por favor, selecione uma composição.");
		return;
	}

	var selectedProperties = comp.selectedProperties;
	if (selectedProperties.length !== 1 || selectedProperties[0].selectedKeys.length !== 1) {
		alert("Por favor, selecione apenas um keyframe.");
		return;
	}

	var sourceKeyframe = selectedProperties[0].selectedKeys[0];
	copiedEase = {
		inTemporalEase: sourceKeyframe.inTemporalEase,
		outTemporalEase: sourceKeyframe.outTemporalEase
	};

	alert("Influência copiada com sucesso!");
}

function pasteKeyframeEase() {
	if (!copiedEase) {
		alert("Nenhuma influência copiada.");
		return;
	}

	// Adicionando um pequeno atraso (100 milissegundos)
	$.sleep(100);

	var comp = app.project.activeItem;
	if (!comp || !(comp instanceof CompItem)) {
		alert("Por favor, selecione uma composição.");
		return;
	}

	var selectedProperties = comp.selectedProperties;
	for (var i = 0; i < selectedProperties.length; i++) {
		var selectedKeys = selectedProperties[i].selectedKeys;
		for (var j = 0; j < selectedKeys.length; j++) {
			var targetKeyframe = selectedKeys[j];
			var targetInEase = mapEaseToPropertyType(copiedEase.inTemporalEase, targetKeyframe.propertyValueType);
			var targetOutEase = mapEaseToPropertyType(copiedEase.outTemporalEase, targetKeyframe.propertyValueType);

			targetKeyframe.inTemporalEase = targetInEase;
			targetKeyframe.outTemporalEase = targetOutEase;
		}
	}

	alert("Influência colada com sucesso!");
}

function mapEaseToPropertyType(ease, propertyValueType) {
	if (propertyValueType === PropertyValueType.TwoD_SPATIAL || propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
		// Mapear para influência espacial
		var newEase = new KeyframeEase(ease.influence, ease.speed);
		newEase.spatialEaseH = [ease.influence, ease.influence];
		newEase.spatialEaseV = [ease.influence, ease.influence];
		if (propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
			newEase.spatialEaseZ = [ease.influence, ease.influence];
		}
		return newEase;
	} else {
		// Manter a influência temporal para outros tipos de propriedades
		return ease;
	}
}

createUI();
