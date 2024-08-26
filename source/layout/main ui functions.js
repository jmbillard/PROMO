/*

---------------------------------------------------------------
> 📟 ui and layout
---------------------------------------------------------------

*/

//

function themeButton(parentGroup, paramsObj) {
	var newBtn = parentGroup.add('customButton');
	newBtn.width = paramsObj.width;
	newBtn.height = paramsObj.height;
	newBtn.text = paramsObj.text;
	newBtn.buttonColor = divColor;
	newBtn.textColor = normalColor;

	if (paramsObj.buttonColor != undefined) newBtn.buttonColor = paramsObj.buttonColor;
	if (paramsObj.textColor != undefined) newBtn.textColor = paramsObj.textColor;

	newBtn.preferredSize = [newBtn.width, newBtn.height];
	newBtn.minimumSize = [68, 34];

	drawThemeButton(newBtn, false);

	newBtn.addEventListener('mouseover', function () {
		drawThemeButton(this, true);
	});

	newBtn.addEventListener('mouseout', function () {
		drawThemeButton(this, false);
	});

	return newBtn;
}

function drawThemeButton(button, hover) {
	var g = button.graphics;
	var textPen = g.newPen(g.PenType.SOLID_COLOR, hexToRGB(button.textColor), 1);
	var fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, hexToRGB(button.buttonColor));
	var textSize = g.measureString(button.text);

	if (hover) {
		textPen = g.newPen(g.PenType.SOLID_COLOR, [1, 1, 1, 1], 1);
		fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, hexToRGB(highlightColor));
	}

	button.onDraw = function () {
		if (!this.enabled) {
			textPen = g.newPen(g.PenType.SOLID_COLOR, hexToRGB(divColor), 1);
			fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, hexToRGB(bgColor));
		}
		g.newPath();
		g.ellipsePath(0, 0, this.height, this.height);
		g.fillPath(fillBrush);
		g.ellipsePath(this.width - this.height, 0, this.height, this.height);
		g.rectPath(this.height / 2, 0, this.width - this.height, this.height);
		// g.strokePath(textPen);
		g.fillPath(fillBrush);

		g.drawString(this.text, textPen, (this.width - textSize.width) / 2, this.height / 2 - textSize.height);
	}
}

// Cria botões de cor com base em um array de cores.
function createColorButtons(colorArray, colorGrp) {
	for (var c = 0; c < colorArray.length; c++) {
		var hex = colorArray[c];          // Obtém o código hexadecimal da cor.
		var rgb = hexToRGB(hex) * 255;    // Converte para RGB (0-255).

		// Cria um botão com ícone, nomeado com o código hexadecimal e estilo 'toolbutton'.
		var colorBtn = colorGrp.add('iconbutton', undefined, undefined, { name: hex, style: 'toolbutton' });

		colorBtn.size = [20, 20];          // Define o tamanho do botão (20x20 pixels).
		setUiCtrlColor(colorBtn, hex);        // Define a cor de fundo do botão.
		colorBtn.onDraw = customDraw;      // Define a função de desenho personalizado.

		// Define o texto de ajuda (tooltip) com os valores RGB e hexadecimal da cor.
		colorBtn.helpTip = 'R: ' + rgb[0] + '\nG: ' + rgb[1] + '\nB: ' + rgb[2] + '\nHEX: ' + hex;
	}
}

// Função para desenhar o botão personalizado.
function customDraw() {
	with (this) {                                  // Refere-se ao próprio botão (this).
		graphics.drawOSControl();                  // Desenha o contorno padrão do botão.
		graphics.rectPath(0, 0, size[0], size[1]); // Define o caminho de um retângulo no tamanho do botão.
		graphics.fillPath(fillBrush);              // Preenche o retângulo com a cor definida em 'fillBrush'.
	}
}
// Função para desenhar o botão personalizado.
function customBtnDraw() {
	var g = this.graphics;
	var blueBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0 / 255, 152 / 255, 255 / 255, 1]);
	var blackPen = g.newPen(g.PenType.SOLID_COLOR, [0 / 255, 0 / 255, 0 / 255, 1], 1);
	var textSize = g.measureString(this.text);
	// drawRoundedRect(g, blueBrush, this.size.width, this.size.height, 20, 0, 0);
	g.drawString(this.text, blackPen, (this.size.width - textSize.width) / 2, this.size.height / 2 - textSize.height);
}

function drawRoundedRect(g, brush, width, height, cornerRadius, x, y) {
	g.newPath();
	g.ellipsePath(x, y, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(width - x - cornerRadius, y, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(width - x - cornerRadius, height - y - cornerRadius, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(x, height - y - cornerRadius, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.newPath();

	var coords = [x, y + (cornerRadius / 2),
		x + (cornerRadius / 2),
		y,
		width - x - (cornerRadius / 2),
		y,
		width - x,
		y + (cornerRadius / 2),
		width - x,
		height - y - (cornerRadius / 2),
		width - x - (cornerRadius / 2),
		height - y,
		x + (cornerRadius / 2),
		height - y,
		x,
		height - y - (cornerRadius / 2)
	];

	for (var i = 0; i <= coords.length - 1; i += 2) {
		if (i === 0) {
			g.moveTo(coords[i], coords[i + 1]);
		} else {
			g.lineTo(coords[i], coords[i + 1]);
		}
	}
	g.fillPath(brush);
}

// Altera a cor de fundo da janela.
function setBgColor(w, hex) {
	var color = hexToRGB(hex);                    // Converte a cor hexadecimal em RGB.
	var bType = w.graphics.BrushType.SOLID_COLOR; // Define o tipo do pincel como cor sólida.
	w.graphics.backgroundColor = w.graphics.newBrush(bType, color); // Aplica o pincel com a nova cor à janela.
}

// Define a cor de um botão.
function setUiCtrlColor(ctrl, hex) {
	var color = hexToRGB(hex);                           // Converte a cor hexadecimal em RGB.
	var bType = ctrl.graphics.BrushType.SOLID_COLOR;        // Define o tipo do pincel como cor sólida.
	ctrl.fillBrush = ctrl.graphics.newBrush(bType, color); // Cria um novo pincel com a cor e o aplica ao botão.
}

// Altera a cor de um texto estático.
function setTxtColor(sTxt, hex) {
	var color = hexToRGB(hex);         // Converte a cor hexadecimal em RGB.
	var pType = sTxt.graphics.PenType.SOLID_COLOR; // Define o tipo da caneta como cor sólida.
	sTxt.graphics.foregroundColor = sTxt.graphics.newPen(pType, color, 1); // Cria uma nova caneta com a cor e a aplica ao texto.
}

// Adiciona efeito de destaque (highlight) ao texto estático quando o mouse passa por cima.
function setTxtHighlight(sTxt, normalColor, highlightColor) {
	setTxtColor(sTxt, normalColor);     // Define a cor normal do texto.

	sTxt.addEventListener('mouseover', function () { // Ao passar o mouse por cima do texto:
		setTxtColor(sTxt, highlightColor); // Muda para a cor de destaque.
	});
	sTxt.addEventListener('mouseout', function () {  // Ao tirar o mouse de cima do texto:
		setTxtColor(sTxt, normalColor);  // Retorna para a cor normal.
	});
}

// Simula o clique de um botão ao clicar em um texto.
function setTxtBtnLink(sTxt, btn) {
	sTxt.addEventListener('mousedown', function () { // Ao clicar no texto:
		btn.notify();        // Notifica o botão associado, como se ele tivesse sido clicado.
	});
}

// Configura o layout da interface.
function setLayout() {
	// Define o layout principal (horizontal 'row' ou vertical 'column') com base no tamanho da janela.
	wLayout = w.size.width > w.size.height ? 'row' : 'column';

	// Calcula um deslocamento horizontal (hOffset) com base no modo de desenvolvimento (devMode) e no tamanho dos ícones.
	var hOffset = devMode ? 0 : iconSize[3] / 2; // Se devMode, hOffset é 0, senão é metade da altura do ícone
	if (w.size.width > 1380) hOffset = hOffset * 4; // Aumenta o deslocamento para telas muito largas
	var hMargin = 90 + hOffset;  // Margem horizontal (esquerda e direita)
	var vMargin = 40 + hOffset;  // Margem vertical (superior e inferior)

	aboutTxt.text = vStr;        // Define o texto da área "Sobre"

	// Ajusta a largura dos rótulos das abas para ocupar quase toda a largura da janela.
	for (var lab = 0; lab < tabLabels.length; lab++) {
		tabLabels[lab].size.width = w.size.width - 24;
	}

	// Configura o layout para orientação horizontal ("row").
	if (wLayout == 'row') {
		ltAlignment = 'left';         // Alinhamento à esquerda para elementos à esquerda.
		rbAlignment = 'right';        // Alinhamento à direita para elementos à direita.

		// [esquerda, superior, direita, inferior]
		mainGrp.margins = [80, 0, 0, 0];                  // Define as margens do grupo principal.
		tabsGrp.menu.margins = [hMargin, 0, hMargin, 0];  // Define as margens do menu de abas.
		leftGrp.margins = [5, 0, 0, 0];                   // Define as margens do grupo à esquerda.

		// Ajusta o tamanho dos botões de cor para o layout horizontal.
		for (var c1 = 1; c1 < colorSubGrp1.children.length; c1++) {
			// Define o tamanho mínimo, máximo e atual de cada botão do primeiro subgrupo de cores (20x20 pixels).
			colorSubGrp1.children[c1].minimumSize = [20, 20];
			colorSubGrp1.children[c1].maximumSize = [20, 20];
			colorSubGrp1.children[c1].size = [20, 20];
		}

		for (var c2 = 1; c2 < colorSubGrp2.children.length; c2++) {
			// Define o tamanho mínimo e máximo de cada botão do segundo subgrupo de cores (10-20 pixels de largura, 20 pixels de altura).
			colorSubGrp2.children[c2].minimumSize = [10, 20];
			colorSubGrp2.children[c2].maximumSize = [20, 20];
			// Calcula a largura de cada botão no segundo subgrupo para preencher o espaço disponível na janela.
			colorSubGrp2.children[c2].size = [(w.size.width - 520) / 22, 20];
		}
		// Configura a aba de erro e de progresso.
		errTxt.visible = true;               // Torna o texto de erro visível.
		errTxt.size.width = 500;             // Define a largura do texto de erro.
		progTxt1.visible = true;             // Torna o primeiro texto de progresso visível.

		// Configura a aba de progresso.
		progTxt1.size.width = 160;           // Define a largura do primeiro texto de progresso.
		progTxt2.visible = true;             // Torna o segundo texto de progresso visível.
		progTxt2.size.width = 160;           // Define a largura do segundo texto de progresso.

		// Define a largura máxima dos rótulos do menu principal para cada item.
		var mainMenuLabelsMaxW = [
			55, // control
			55, // animation
			55, // effects
			35, // text utilities
			40, // brand
			45, // project
			55, // shortcuts
			60, // templates
			40, // text search
			60, // preview
			50  // dev tools
		];

		// Ajusta os rótulos do menu principal para o layout horizontal.
		for (var mlh = 0; mlh < mainMenuLabels.length; mlh++) {
			mainMenuLabels[mlh].maximumSize.width = mainMenuLabelsMaxW[mlh]; // Define a largura máxima do rótulo.
			mainMenuLabels[mlh].size.width = mainMenuLabelsMaxW[mlh];       // Define a largura atual do rótulo.

			// Se a janela for muito estreita ou a opção de mostrar rótulos estiver desativada:
			if (w.size.width < 1100 || !showLabels) {
				mainMenuLabels[mlh].size.width = 0;      // Esconde o rótulo (largura 0).
				mainMenuLabels[mlh].parent.spacing = 0;  // Remove o espaçamento entre os elementos do menu.
			}
		}

		// Se a janela for larga o suficiente:
		if (w.size.width > 1100) {
			tabsGrp.menu.margins = [0, 0, 0, 0];        // Remove as margens do menu de abas.
		}

		// Se a janela for larga e a opção de mostrar rótulos estiver ativada:
		if (w.size.width > 1100 && showLabels) {
			devLab.size.width = devMode ? 50 : 0;        // Define a largura do rótulo de desenvolvimento (devLab).
		}

	} else {
		// Configura o layout para orientação vertical ("column").
		ltAlignment = 'bottom';       // Alinhamento inferior para elementos à esquerda.
		rbAlignment = 'top';          // Alinhamento superior para elementos à direita.

		// [esquerda, superior, direita, inferior]
		mainGrp.margins = [0, 0, 0, iconSize[3] - hOffset - 4];   // Define as margens do grupo principal.
		tabsGrp.menu.margins = [0, vMargin, 0, vMargin];          // Define as margens do menu de abas.
		leftGrp.margins = [0, 0, 0, 5];                           // Define as margens do grupo à esquerda.

		// Ajusta o tamanho dos botões de cor para o layout vertical.
		for (var b1 = 1; b1 < colorSubGrp1.children.length; b1++) {
			// Define o tamanho mínimo (largura vMin) e máximo (largura 80) de cada botão no primeiro subgrupo.
			colorSubGrp1.children[b1].minimumSize = [vMin, 20];
			colorSubGrp1.children[b1].maximumSize = [80, 20];

			// Calcula a largura e altura de cada botão no primeiro subgrupo para preencher a janela verticalmente.
			colorSubGrp1.children[b1].size = [w.size.width - 8, (w.size.height - 402) / 22];
		}

		// Repete o mesmo processo para os botões do segundo subgrupo, com altura mínima de 10 pixels.
		for (var b2 = 1; b2 < colorSubGrp2.children.length; b2++) {
			colorSubGrp2.children[b2].minimumSize = [vMin, 10];
			colorSubGrp2.children[b2].maximumSize = [80, 20];
			colorSubGrp2.children[b2].size = [w.size.width - 8, (w.size.height - 402) / 22];
		}
		// Configura a aba de erro e de progresso para o layout vertical.
		errTxt.visible = false;     // Esconde o texto de erro.
		errTxt.size.width = 0;      // Define a largura do texto de erro para 0.
		progTxt1.visible = false;   // Esconde o primeiro texto de progresso.
		progTxt1.size.width = 0;    // Define a largura do primeiro texto de progresso para 0.
		progTxt2.visible = false;   // Esconde o segundo texto de progresso.
		progTxt2.size.width = 0;    // Define a largura do segundo texto de progresso para 0.

		// Ajusta o tamanho da logo e da imagem de progresso para o layout vertical.
		LOGO.size.width = w.size.width - 8;    // Define a largura da logo para ocupar quase toda a largura da janela.
		progImg.size.width = w.size.width - 8; // Define a largura da imagem de progresso para ocupar quase toda a largura da janela.

		// Ajusta os rótulos do menu principal para o layout vertical.
		for (var mlv = 0; mlv < mainMenuLabels.length; mlv++) {
			mainMenuLabels[mlv].maximumSize.width = 70;         // Define a largura máxima do rótulo.
			mainMenuLabels[mlv].size.width = w.size.width - 60; // Define a largura atual do rótulo para ocupar quase toda a largura da janela.

			// Se a janela for muito estreita ou a opção de mostrar rótulos estiver desativada:
			if (w.size.width < 100 || !showLabels) {
				mainMenuLabels[mlv].size.width = 0;     // Esconde o rótulo.
				mainMenuLabels[mlv].parent.spacing = 0; // Remove o espaçamento entre os elementos do menu.
			}
		}

		// Ajustes adicionais para janelas muito estreitas.
		if (w.size.width < vMin + 8) {
			LOGO.size.width = 0;          // Esconde a logo.
			progImg.size.width = 0;       // Esconde a imagem de progresso.
			aboutTxt.text = '...';        // Reduz o texto "Sobre" para "...".
		}

		// Se a janela for larga o suficiente e mostrar rótulos:
		if (w.size.width > 100 && showLabels) {
			devLab.size.height = devMode ? 12 : 0; // Define a altura do rótulo de desenvolvimento.
		}
	}
	// Ajusta a orientação do grupo de imagens para o layout atual.
	imgGrp.orientation = wLayout;

	// Configura controles na aba de texto.
	limitSld.size.width = w.size.width - 16;     // Define a largura do controle deslizante 'limitSld'.

	// Configura controles na aba de projeto.
	// projIdTxt.size.width = w.size.width - 8;      // Define a largura do campo de texto 'projIdTxt'.
	// projNameTxt.size.width = w.size.width - 8; // Define a largura do campo de texto 'projNameTxt' (comentado).

	// Configura todos os subgrupos de abas.
	for (var s = 0; s < tabSubGrps.length; s++) {
		tabSubGrps[s].orientation = wLayout;    // Define a orientação dos subgrupos de acordo com o layout principal.
		tabSubGrps[s].spacing = 2;              // Define o espaçamento entre elementos nos subgrupos.
	}

	// Configura todas as abas.
	for (var t = 0; t < tabs.length; t++) {
		tabs[t].orientation = wLayout;         // Define a orientação das abas.
		tabs[t].spacing = 8;                   // Define o espaçamento entre elementos nas abas.
	}

	// Define o alinhamento dos grupos esquerdo e direito.
	leftGrp.alignment = ltAlignment;
	rightGrp.alignment = rbAlignment;

	// Configura o botão de desenvolvimento.
	devBtn.size = devMode ? [36, 36] : [0, 0];  // Se em modo de desenvolvimento, define o tamanho do botão, senão o esconde.

	updateLayout(); // Atualiza o layout da interface.
}

// Atualiza o layout da interface.
function updateLayout() {
	w.layout.layout(true);  // Força o relayout de todos os elementos da janela.
	w.layout.resize();      // Redimensiona a janela para acomodar o novo layout.
}

// Esconde todos os grupos de abas, exceto o menu principal.
function hideTabs() {
	// tabs[0] é o menu principal (tabsGrp.menu), que não deve ser escondido.
	for (var t = 1; t < tabs.length; t++) {
		tabs[t].visible = false;             // Esconde todas as outras abas.
	}
	errTabGrp.visible = false;               // Esconde o grupo da aba de erro.
	closeGrp.visible = false;                // Esconde o grupo de fechamento.
}

// Exibe o grupo da aba selecionada.
function openTab() {
	// Mostra o botão de informações se o grupo atual não for o menu principal.
	if (currentGrp != tabsGrp.menu) infoBtn.visible = true;

	aboutTxt.visible = false;          // Esconde o texto "Sobre".
	bgColor = tabColors[tabs.indexOf(currentGrp)]; // Obtém a cor de fundo da aba selecionada.
	currentGrp.visible = true;         // Exibe o grupo da aba selecionada.
	closeGrp.visible = true;           // Exibe o grupo de fechamento da aba.
	imgGrp.visible = true;             // Exibe o grupo de imagens.

	// Esconde elementos desnecessários quando uma aba está aberta.
	tabsGrp.menu.visible = false;      // Esconde o menu principal.
	prefGrp.visible = false;           // Esconde o grupo de preferências.
	closeErrBtn.visible = false;       // Esconde o botão de fechar erro.

	// Lógica específica para o menu principal.
	if (currentGrp == tabsGrp.menu) { // Se o grupo atual for o menu principal:
		closeGrp.visible = false;      // Esconde o grupo de fechamento.
		tabsGrp.menu.visible = true;   // Exibe o menu principal.
		prefGrp.visible = true;        // Exibe o grupo de preferências.
	}

	// Esconde elementos relacionados à barra de progresso.
	progImgGrp.visible = false;
	progressGrp.visible = false;

	setBgColor(w, bgColor);           // Aplica a cor de fundo da aba à janela.
}

// Exibe uma mensagem de erro na interface.
function showTabErr(msg) {
	errTxt.text = "Ops! " + msg;      // Define o texto da mensagem de erro (substituindo 'lol' por 'Ops!').
	closeGrp.visible = true;          // Exibe o grupo de fechamento.
	errTabGrp.visible = true;         // Exibe a aba de erro.
	closeErrBtn.visible = true;       // Exibe o botão de fechar erro.

	// Esconde elementos que não são necessários na aba de erro.
	infoBtn.visible = false;          // Esconde o botão de informações.
	prefGrp.visible = false;          // Esconde o grupo de preferências.
	currentGrp.visible = false;       // Esconde a aba atual.
	tabsGrp.menu.visible = false;     // Esconde o menu principal.
	closeBtn.visible = false;         // Esconde o botão de fechar padrão.
	imgGrp.visible = false;           // Esconde o grupo de imagens.
	progImgGrp.visible = false;       // Esconde o grupo da imagem de progresso.

	setBgColor(w, errGrpColor);       // Define a cor de fundo da janela para a cor de erro.
	clearOutput();                    // Limpa a área de saída (output).
	write(msg);                       // Escreve a mensagem de erro na área de saída.
}

// Exibe uma mensagem de progresso e bloqueia a interação do usuário.
function showTabProg(msg) {
	alert(relax + '   reinicie o script!\nbasta fechar e abrir novamente a barrinha...'); // Exibe um alerta (não bloqueia a interface).

	progTxt1.text = 'AGUARDE';          // Define o primeiro texto de progresso.
	progTxt2.text = msg;                // Define o segundo texto de progresso com a mensagem.
	progressGrp.visible = true;         // Exibe o grupo da barra de progresso.
	progImgGrp.visible = true;          // Exibe o grupo da imagem de progresso.
	progImgGrp.helpTip = msg;           // Define o texto de ajuda da imagem de progresso com a mensagem.

	// Esconde elementos que não são necessários na aba de progresso.
	infoBtn.visible = false;
	closeGrp.visible = false;
	prefGrp.visible = false;
	currentGrp.visible = false;
	tabsGrp.menu.visible = false;
	closeBtn.visible = false;
	closeErrBtn.visible = false;
	imgGrp.visible = false;

	setBgColor(w, errGrpColor);        // Define a cor de fundo da janela para a cor de erro (mesma da mensagem de erro).
	clearOutput();                     // Limpa a área de saída (output).
	write(msg);                        // Escreve a mensagem de progresso na área de saída.
}

// Obtém todos os grupos de abas, exceto o grupo de preferências.
function getTabGroups() {
	var tabsGrpArray = [];          // Array para armazenar os grupos de abas.

	for (var t = 0; t < tabsGrp.children.length; t++) {
		// Adiciona cada grupo de abas (filho de tabsGrp) ao array, exceto o grupo de preferências (possivelmente o primeiro).
		tabsGrpArray.push(tabsGrp.children[t]);
	}

	return tabsGrpArray; // Retorna o array contendo os grupos de abas.
}

// Obtém todos os subgrupos de abas, exceto 'keyStatsGrp'.
function getTabSubGroups() {
	var tabSubGrps = []; // Array para armazenar os subgrupos.

	for (var st = 0; st < tabs.length; st++) {       // Para cada aba...
		for (var g = 0; g < tabs[st].children.length; g++) { // Para cada elemento filho da aba...
			var subGrp = tabs[st].children[g];

			// Verifica se o elemento é um grupo e se não possui propriedades personalizadas.
			if (subGrp.toString() != '[object Group]') continue;
			if (subGrp.properties != undefined) continue;

			tabSubGrps.push(subGrp); // Adiciona o subgrupo ao array.
		}
	}
	return tabSubGrps;
}

// Obtém todos os divisores de abas.
function getTabDividers(grp) {
	var tabDividers = [];

	for (var g = 0; g < grp.children.length; g++) {
		var div = grp.children[g];

		// Verifica se o elemento é um painel.
		if (div.toString() != '[object Panel]') continue;
		div.alignment = 'fill'; // Define o alinhamento do painel para preencher o espaço.
	}
	return tabDividers;
}

// Obtém todos os rótulos de abas.
function getTabLabels() {
	var tabLabels = [];

	for (var st = 1; st < tabs.length; st++) {   // Para cada aba, exceto a primeira...
		var uiLabels = getStaticTextLabels(tabs[st], []); // Obtém os rótulos de texto estático da aba.

		for (var l = 0; l < uiLabels.length; l++) {
			var lab = uiLabels[l];

			// Verifica se o rótulo possui propriedades e se é do tipo 'label'.
			if (lab.properties == undefined) continue;
			if (lab.properties.name != 'label') continue;

			tabLabels.push(lab);   // Adiciona o rótulo ao array.

			// Configura o rótulo.
			lab.justify = 'center';
			lab.helpTip = lab.text;
			lab.minimumSize = [vMin, 12];
		}
	}
	return tabLabels;
}

// Adiciona efeito de destaque aos rótulos do menu principal.
function highlighMenuLabels() {
	var uiLabels = getStaticTextLabels(tabsGrp.menu, []); // Obtém os rótulos de texto estático do menu.

	for (var l = 0; l < uiLabels.length; l++) {  // Para cada rótulo...
		var lab = uiLabels[l];
		// Aplica o efeito de destaque com cores definidas em sTxtColor e '#8A8A8A'.
		setTxtHighlight(lab, sTxtColor[iconTheme], '#8A8A8A');

		// Simula um clique no botão correspondente ao rótulo quando o rótulo é clicado.
		setTxtBtnLink(lab, lab.parent.children[0]);
	}
}

// Função recursiva para obter todos os rótulos de texto estático dentro de um grupo.
function getStaticTextLabels(grp, resultArray) {
	for (var g = 0; g < grp.children.length; g++) { // Para cada elemento filho do grupo...
		var subGrp = grp.children[g];

		// Se for um subgrupo, chama a função recursivamente.
		if (subGrp.toString() == '[object Group]') {
			subGrp.spacing = 4; // Define o espaçamento entre elementos do subgrupo.
			getStaticTextLabels(subGrp, resultArray);
		} else {
			var lab = subGrp;

			// Verifica se o elemento é um rótulo de texto estático com a propriedade 'name' igual a 'label'.
			if (lab.properties == undefined) continue;
			if (lab.properties.name != 'label') continue;

			resultArray.push(lab); // Adiciona o rótulo ao array resultante.

			// Define a cor do texto do rótulo com base no tema de ícones (iconTheme).
			setTxtColor(lab, sTxtColor[iconTheme]);
		}
	}
	return resultArray; // Retorna o array com todos os rótulos encontrados.
}
