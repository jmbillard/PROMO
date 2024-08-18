// Script: O PADEIRO script de utilidades

function O_PADEIRO_UTL(thisObj) {
	var vStr = '';
	// Declaração da versão do script 'O Padeiro'
	var PAD_v = '1.4';
	var scriptName = 'O PADEIRO';

	var bgColor = '#1C1222';
	var divColor = '#3B2648';
	var normalColor = '#9DF7F4';
	var highlightColor = '#FA4180';

	// Objeto que armazena as configurações padrão (default) do Padeiro
	var defPadObj = {
		configName: 'default config',           // Nome da configuração (usado para identificação no log)
		exemple: '',                            // Exemplo de texto de entrada (será mostrado na interface se o template não tiver um exemplo próprio)
		tip: '',                                // Dicas para o usuário sobre como usar o template

		compName: '',                           // Nome da composição principal do template (a composição que será duplicada e manipulada)
		prefix: '',                             // Prefixo que será adicionado ao nome de cada template gerado
		refTime: 0,                             // Tempo de referência para os templates gerados (em segundos)
		separator: '---',                       // Separador usado para dividir múltiplas linhas de texto em uma única entrada
		textCase: 'upperCase',                  // Define o formato do texto de entrada: 'upperCase' (maiúsculas), 'lowerCase' (minúsculas) ou 'titleCase' (título)
		inputLayers: null,                      // Array que define as camadas do template que receberão o texto de entrada (null por padrão)
		inputFx: null,                          // Objeto que define informações sobre efeitos aplicados às camadas de entrada (null por padrão)

		importPath: '~/Downloads',              // Caminho padrão para importar novos footages
		outputPath: [                           // Lista de caminhos para salvar os renders dos templates gerados
			'~/Desktop'
		]
	};

	#include 'source/globals.js';                   // Inclui variáveis globais (usadas em todo o script)
	#include 'source/layout/main ui functions.js';  // Inclui funções para criar a interface do usuário
	#include 'source/libraries/JSON lib.js';        // Inclui funções para trabalhar com dados JSON
	#include 'source/libraries/FUNC lib.js';        // Inclui funções utilitárias gerais
	#include 'source/libraries/PROT lib.js';        // Inclui funções que estendem objetos JavaScript (prototype)
	#include 'source/libraries/EXPS lib.js';        // Inclui uma biblioteca de expressões para animações
	#include 'source/libraries/ICON lib.js';        // Inclui ícones codificados para a interface

	// utilidades com interface
	#include 'source/layout/Utils/o padeiro templates ui.js'; // Sistema de templates
	#include 'source/layout/Utils/o padeiro folders ui.js';   // Lista de pastas de produção
	#include 'source/layout/Utils/o padeiro maker ui.js';     // Editor de templates
	#include 'source/layout/Utils/find ui.js';                // Busca em layers de texto

	// configurações iniciais de uma nova produção
	var defaultProdData = {
		PRODUCTIONS: [
			{
				name: 'nome...',
				icon: solTogIcon.dark,
				templatesPath: 'edite a pasta de templates...'
			}
		]
	}

	// ordena as produções por nome
	function sortProdData(prodDataObj) {
		return prodDataObj.sort(function (a, b) {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;

			return 0;
		});
	}

	// retorna os nomes das produções
	function getProdNames(prodDataObj) {
		var prdNames = [];

		for (var i = 0; i < prodDataObj.length; i++) {
			prdNames.push(prodDataObj[i].name);
		}
		return prdNames;
	}

	// salva os dados das produções
	function saveProdData(prodDataArray) {
		var prodData = { PRODUCTIONS: prodDataArray };
		var configFile = new File(scriptMainPath + 'O_PADEIRO_config.json');
		var configContent = JSON.stringify(prodData, null, '\t');
		writeFileContent(configFile, configContent);
	}

	// atualiza os dados das produções
	function updateProdData(configFile) {

		var prodData;
		if (!configFile.exists) padProdFoldersDialog(defaultProdData.PRODUCTIONS); // Chama a janela de configuração.

		$.sleep(300);

		try {
			var configContent = readFileContent(configFile); // Lê o conteúdo do arquivo de configuração JSON
			prodData = JSON.parse(configContent);            // Analisa o conteúdo JSON e o armazena no objeto 'templateData'
			prodData = sortProdData(prodData.PRODUCTIONS);

		} catch (err) {
			prodData = defaultProdData.PRODUCTIONS;
		}

		return prodData;
	}

	function changeIcon(imageIndex, imagesGrp) {
		for (var i = 0; i < imagesGrp.children.length; i++) {
			imagesGrp.children[i].visible = i == imageIndex;
		}
	}

	function populateMainIcons(prodDataArray, imagesGrp) {

		while (imagesGrp.children.length > 0) {
			imagesGrp.remove(imagesGrp.children[0]);
		}

		for (var i = 0; i < prodDataArray.length; i++) {
			var newIcon = imagesGrp.add('image', undefined, undefined);
			try {
				newIcon.image = eval(prodDataArray[i].icon);
			} catch (err) {
				newIcon.image = defaultProdData.PRODUCTIONS[0].icon;
			}
			newIcon.helpTip = prodDataArray[0].name;
			newIcon.preferredSize = [24, 24];
			newIcon.visible = i == 0;

			newIcon.addEventListener('click', function (c) {

				// Verifica se aconteceu um clique duplo (detail == 2).
				if (c.detail == 2) {

					padProdFoldersDialog(prodDataArray); // Chama a janela de configuração.
					PAD_ui.prodDrop.removeAll(); // Limpa a lista de produções do menu.

					// atualiza os dados das produções.
					prodDataArray = updateProdData(new File(scriptMainPath + 'O_PADEIRO_config.json'));

					// Popula a lista de produções do menu
					populateDropdownList(getProdNames(prodDataArray), imagesGrp.parent.children[1]);
					populateMainIcons(prodDataArray, imagesGrp);

					PAD_ui.prodDrop.selection = 0; // Seleciona a primeira produção.
					imagesGrp.layout.layout(true);
				}
			});
		}
	}

	var PAD_prodArray = updateProdData(new File(scriptMainPath + 'O_PADEIRO_config.json')); // dados das produções
	templatesPath = PAD_prodArray[0].templatesPath;
	templatesFolder = new Folder(PAD_prodArray[0].templatesPath); // pasta de templates.

	var PAD_ui = {
		buttonArray: [],
		sectionGrpArray: [],
		divArray: []
	};

	function PAD_buildUi(window, structureObj, iObj) {

		function PAD_addDiv(sectionGrp, iObj) {
			var newDiv = sectionGrp.add("customButton");
			setUiCtrlColor(newDiv, divColor);
			newDiv.onDraw = customDraw;
			iObj.divArray.push(newDiv);
		}

		function PAD_addImageButton(sectionGrp, uiCtrlProp, iObj) {
			var btn = iObj[uiCtrl] = {};

			if (uiCtrlProp['icon']['hover'] == undefined) uiCtrlProp['icon']['hover'] = uiCtrlProp['icon']['normal'];

			btn['btnGroup'] = sectionGrp.add('group'); // Grupo de botões superior

			btn['iconGroup'] = btn['btnGroup'].add('group'); // Grupo de botões superior
			btn['iconGroup'].orientation = 'stack'; // Alinhamento central

			btn['leftClick'] = btn['iconGroup'].add('button', undefined, '');
			btn['leftClick'].size = [0, 0];
			btn['leftClick'].visible = false;

			btn['rightClick'] = btn['iconGroup'].add('button', undefined, '');
			btn['rightClick'].size = [0, 0];
			btn['rightClick'].visible = false;

			btn['hoverImg'] = btn['iconGroup'].add('image', undefined, uiCtrlProp['icon']['hover']);
			btn['hoverImg'].helpTip = uiCtrlProp['tipTxt']; // Dica de ajuda
			btn['hoverImg'].visible = false;

			btn['normalImg'] = btn['iconGroup'].add('image', undefined, uiCtrlProp['icon']['normal']);
			btn['normalImg'].helpTip = uiCtrlProp['tipTxt']; // Dica de ajuda

			btn['label'] = btn['btnGroup'].add('statictext', undefined, uiCtrlProp['labelTxt'], { truncate: 'end' }); // Texto do botão
			btn['label'].helpTip = uiCtrlProp['tipTxt']; // Dica de ajuda

			setTxtColor(btn['label'], normalColor, highlightColor); // Cor de destaque do texto
			iObj.buttonArray.push(btn);
		}

		var sectionCounter = 0;

		iObj.mainGrp = window.add('group'); // Grupo principal
		iObj.sectionGrpArray.push(iObj.mainGrp);

		for (var sec in structureObj) {
			var section = structureObj[sec];

			if (sectionCounter > 0) PAD_addDiv(iObj.mainGrp, iObj);

			var sectionGrp = iObj.mainGrp.add('group', undefined, { name: 'sectionGrp' }); // Grupo de botões superior
			sectionGrp.alignment = ['center', 'top']; // Alinhamento
			iObj.sectionGrpArray.push(sectionGrp);

			for (var uiCtrl in section) {
				var uiCtrlProp = section[uiCtrl];
				uiCtrlProp.labelTxt = uiCtrl.replace(/_/g, ' ').toLowerCase();
				uiCtrlProp.tipTxt = uiCtrlProp.labelTxt + ':\n\n' + uiCtrlProp['tips'].join('\n\n'); // Dica de ajuda;

				if (uiCtrlProp.type == 'imageButton') PAD_addImageButton(sectionGrp, uiCtrlProp, iObj);
			}
			sectionCounter++;
		}
		// Rótulo da versão
		iObj.infoGrp = window.add('group');
		iObj.infoGrp.spacing = 0;
		iObj.sectionGrpArray.push(iObj.infoGrp);
		iObj.mainLogo = iObj.infoGrp.add('image', undefined, LOGO_IMG.light);
		iObj.mainLogo.preferredSize = [70, 24];
		iObj.mainLogo.minimumSize = [50, 24];

		// iObj.mainLogo = aboutStr;
		iObj.vLab = iObj.infoGrp.add('statictext', undefined, 'v' + PAD_v, { truncate: 'end' });
		iObj.vLab.justify = 'center';
		iObj.vLab.helpTip = 'ajuda | DOCS';

		iObj.prodGrp = window.add('group'); // Grupo de botões superior
		iObj.prodGrp.alignment = ['center', 'top']; // Alinhamento
		iObj.prodGrp.spacing = 4; // Espaçamento entre botões
		iObj.sectionGrpArray.push(iObj.prodGrp);

		iObj.prodIconGrp = iObj.prodGrp.add('group');
		iObj.prodIconGrp.orientation = 'stack'; // Layout vertical
		populateMainIcons(PAD_prodArray, iObj.prodIconGrp);

		iObj.prodDrop = iObj.prodGrp.add('dropdownlist', undefined, getProdNames(PAD_prodArray));
		iObj.prodDrop.selection = 0; // Seleciona a produção padrão.
		iObj.prodDrop.preferredSize = [130, 24];
		iObj.prodDrop.minimumSize = [50, 24];
		iObj.prodDrop.helpTip = "PRODUÇÃO SELECIONADA"; // Dica de ajuda

		window.layout.layout(true); // Aplica o layout

		// Estilização da interface
		setTxtHighlight(iObj.vLab, '#EAEAEA', highlightColor); // Cor de destaque do texto
		setBgColor(window, bgColor); // Cor de fundo da janela

		// Define uma função a ser executada quando a janela é exibida ou redimensionada.
		window.onShow = function () {

			for (var b = 0; b < iObj.buttonArray.length; b++) {

				var btn = iObj.buttonArray[b];
				btn.label.preferredSize = btn.label.size;
			}

			PAD_setLayout(this, iObj);
		};

		window.onResizing = window.onResize = function () {
			PAD_setLayout(this, iObj);
		};

		for (var b = 0; b < iObj.buttonArray.length; b++) {

			var btn = iObj.buttonArray[b];
			// Ao passar o mouse por cima
			btn.btnGroup.addEventListener('mouseover', function () {

				setTxtColor(this.children[1], highlightColor);
				this.children[0].children[3].visible = false;
				this.children[0].children[2].visible = true;
			});

			// Ao tirar o mouse de cima
			btn.btnGroup.addEventListener('mouseout', function () {

				setTxtColor(this.children[1], normalColor);
				this.children[0].children[2].visible = false;
				this.children[0].children[3].visible = true;
			});

			btn.label.addEventListener('click', function (c) {
				if (c.button == 0) this.parent.children[0].children[0].notify();
			});

			btn.label.addEventListener('click', function (c) {
				if (c.button == 2) this.parent.children[0].children[1].notify();
			});

			btn.hoverImg.addEventListener('click', function (c) {
				if (c.button == 0) this.parent.children[0].notify();
			});

			btn.hoverImg.addEventListener('click', function (c) {
				if (c.button == 2) this.parent.children[1].notify();
			});

		}
	}

	function PAD_setLayout(window, iObj) {

		var isRow = window.size.width > window.size.height;
		var grpOrientation = isRow ? 'row' : 'column';
		var btnOrientation = isRow ? 'column' : 'row';
		var mainMargin = isRow ? [180, 0, 50, 0] : [4, 60, 4, 20];

		try {
			for (var s = 0; s < iObj.sectionGrpArray.length; s++) {
				var sectionGrp = iObj.sectionGrpArray[s];
				sectionGrp.orientation = grpOrientation;
				sectionGrp.spacing = window.size.height < 72 ? 24 : 8;
			}
			for (var d = 0; d < iObj.divArray.length; d++) {
				var div = iObj.divArray[d];
				div.size = [1, 1];
				div.alignment = isRow ? ['center', 'fill'] : ['fill', 'center'];
			}
			for (var b = 0; b < iObj.buttonArray.length; b++) {
				var btn = iObj.buttonArray[b];
				btn.btnGroup.orientation = btnOrientation;
				btn.btnGroup.spacing = isRow ? 0 : 8; // Espaçamento entre botões

				btn.normalImg.size = btn.hoverImg.size = [32, 32];

				btn.label.justify = isRow ? 'center' : 'left'; // Alinhamento central
				btn.label.size = [60, 18];

				if (window.size.width < 120) btn.label.size.width = window.size.width - 60;

				if (window.size.width < 88 || window.size.height < 72) {
					btn.btnGroup.spacing = 0;
					btn.label.size = [0, 0];
				}
				if (window.size.height < 44) {
					btn.btnGroup.spacing = 0;
					btn.hoverImg.size = btn.normalImg.size = [0, 0];
					btn.label.size = btn.label.preferredSize;
				}
			}
			iObj.mainGrp.margins = mainMargin;
			iObj.mainGrp.spacing = window.size.height < 44 ? 24 : 16;

			iObj.prodGrp.alignment = isRow ? 'left' : 'top';
			iObj.prodGrp.spacing = 8;

			iObj.infoGrp.alignment = isRow ? 'right' : 'bottom';

			iObj.prodDrop.size.width = window.size.width < 150 ? window.size.width - 16 : 130;
			iObj.mainLogo.size.width = window.size.width < 78 ? window.size.width - 8 : 70;

		} catch (err) { alert(lol + '#PAD_layout - ' + '' + err.message); }

		window.layout.layout(true);
		window.layout.resize();
	}

	var PAD_mainGrpUiStructure = {
		grp1: {
			templates: {
				type: 'imageButton',
				icon: PAD_TEMPLATES_ICON,
				tips: [
					'◖ → preencher templates',
					'◗ → criar novo template'
				]
			},
			fontes: {
				type: 'imageButton',
				icon: PAD_FONTES_ICON,
				tips: [
					'◖ → instalar as fontes usadas no template',
					'◗ → fazer o collect das fontes usadas no projeto'
				]
			}
		},
		grp2: {
			pastas: {
				type: 'imageButton',
				icon: PAD_PASTAS_ICON,
				tips: [
					'◖ → abir a pasta do último item da fila de render',
					'◗ → abir a pasta do projeto (caso esteja salvo)'
				]
			}
		},
		grp3: {
			renomear: {
				type: 'imageButton',
				icon: PAD_RENOMEAR_ICON,
				tips: [
					'◖ → renomear comps selecionadas',
					'◗ → renomear TODAS as saídas de render'
				]
			},
			organizar: {
				type: 'imageButton',
				icon: PAD_ORGANIZAR_ICON,
				tips: [
					'selecione as comps que serão\nRENDERIZADAS primeiro!',
					'◖ → organizar o projeto',
					'◗ → criar estrutura de pastas do projeto'
				]
			}
		},
		grp4: {
			buscar: {
				type: 'imageButton',
				icon: PAD_BUSCAR_ICON,
				tips: [
					'◖ → abrir a BUSCA em layers de texto'
				]
			}
		},
		grp5: {
			atalhos: {
				type: 'imageButton',
				icon: PAD_ATALHOS_ICON,
				tips: [
					'◖ → abrir a planilha do apontamento de projetos no navegador'
				]
			}
		}
	};

	function O_PADEIRO_UI() {

		var PAD_w = {}; // Objeto que representa a janela da interface

		// Cria a janela da interface (ou usa um painel existente)
		if (thisObj instanceof Panel) {
			PAD_w = thisObj;
		} else {
			PAD_w = new Window('palette', scriptName); // Cria uma nova janela
		}

		// Configurações da janela
		PAD_w.margins = 4;      // Margens internas
		PAD_w.orientation = 'stack'; // Layout vertical

		PAD_buildUi(PAD_w, PAD_mainGrpUiStructure, PAD_ui);

		// Adiciona um "ouvinte" de evento ao rótulo de versão (vLab).
		PAD_ui.vLab.addEventListener('mousedown', function () {
			// Este ouvinte será acionado quando o usuário clicar (mousedown) no rótulo.
			var siteUrl = 'https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-o-padeiro-script'; // Define o URL do site de documentação.
			openWebSite(siteUrl); // Abre o site de documentação em um navegador web.
		});

		PAD_ui.prodDrop.onChange = function () {

			var i = this.selection.index;
			changeIcon(i, PAD_ui.prodIconGrp);

			templatesPath = PAD_prodArray[i].templatesPath;
			templatesFolder = new Folder(PAD_prodArray[i].templatesPath); // pasta de templates.
			PAD_launchBtn.enabled = templatesFolder.exists; // Habilita / Desabilita o botão "Abrir O Padeiro".

			// Se a pasta de templates não existir.
			if (!templatesFolder.exists) alert(lol + '#PAD_002 - a pasta de templates não foi localizada...');
		};

		// Define a função a ser executada quando o botão "Abrir O Padeiro" for clicado.
		PAD_ui.templates.leftClick.onClick = function () {

			// Verifica se há acesso à internet.
			if (!netAccess()) {
				// Se não houver acesso, exibe um alerta informando que a funcionalidade será limitada e encerra a função.
				alert(lol + '#PAD_003 - sem acesso a rede...');
				return;
			}

			// Se houver acesso à internet, chama a função padeiroTemplateDialog() para exibir a interface de templates.
			padeiroTemplateDialog();
		};

		// Adiciona um ouvinte de evento de clique ao botão "Abrir O Padeiro". 
		PAD_ui.templates.rightClick.onClick = function () {

			if (app.project.numItems == 0) return;

			var aItem = app.project.activeItem;

			if (aItem == null) return;

			PadMakerDialog();
		};

		PAD_ui.fontes.leftClick.onClick = function () { // Define a função a ser executada quando o botão "Instalar Fontes" for clicado.

			// Verifica se há acesso à rede.
			if (!netAccess()) {
				alert(lol + '#PAD_004 - sem acesso a rede...');
				return;
			}

			// Obtém o caminho da pasta do template a partir dos metadados XMP do projeto.
			var folderPath = getXMPData('source');
			var templateFontsPath = folderPath + '/FONTS';

			// Se o caminho da pasta não for encontrado, a função é interrompida.
			if (folderPath == '') {
				alert(lol + '#PAD_005 - esse não foi preenchido pelo padeiro...')
				return;
			}
			// Cria um objeto "Folder" para a pasta de fontes do template.
			var templateFontsFolder = new Folder(templateFontsPath);

			// Verifica se a pasta de fontes existe.
			if (!templateFontsFolder.exists) {
				alert(lol + '#PAD_006 - a pasta de fontes não foi localizada...')
				return;
			}
			// Se a pasta de fontes existe e o sistema operacional for Windows, instala as fontes.
			if (appOs == 'Win') installWinFonts(templateFontsPath);
		};

		// Adiciona um ouvinte de evento de clique ao botão "Instalar Fontes".
		PAD_ui.fontes.rightClick.onClick = function () {


			// Verifica se há itens no projeto.
			if (app.project.numItems == 0) return;

			var savePath = Folder.selectDialog(); // Abre a janela de seleção de pastas

			if (savePath == null) return; // Se a janela foi cancelada, não faz nada

			var currentProjPath = decodeURI(savePath.fullName) + '/FONTS'; // caminho final do collect
			var fontsPath = fontCollect(currentProjPath);

			openFolder(fontsPath);
		};

		// Define a função a ser executada quando o botão "Abrir Pasta de Saída" for clicado.
		PAD_ui.pastas.leftClick.onClick = function () {

			// Verifica se há acesso à internet.
			if (!netAccess()) {
				alert(lol + '#PAD_007 - sem acesso a rede...');
				return; // Encerra a função se não houver acesso à internet.
			}

			// Verifica se há itens na fila de renderização.
			if (app.project.renderQueue.numItems < 1) {
				alert(lol + '#PAD_008 - a fila de render está vazia...')
				return;
			}
			// Obtém o último item da fila de renderização.
			var item = app.project.renderQueue.item(app.project.renderQueue.numItems);

			// Obtém o módulo de saída do item (onde o arquivo renderizado será salvo).
			var outputModule = item.outputModule(1);

			// Obtém o caminho completo da pasta de saída.
			var outputPath = decodeURI(outputModule.file.path);

			// Cria um objeto "Folder" para representar a pasta de saída.
			var fld = new Folder(outputPath);

			// Verifica se a pasta de saída existe.
			if (!fld.exists) {
				alert(lol + '#PAD_009 - a pasta não foi encontrada...'); // Exibe um erro se a pasta não for acessível.
				return; // Encerra a função se a pasta não existir.
			}

			// Abre a pasta de saída no sistema operacional do usuário.
			openFolder(outputPath);
		};

		// Adiciona um ouvinte de evento de clique ao botão "Abrir Pasta de Saída".
		PAD_ui.pastas.rightClick.onClick = function () {
			// Verifica se o botão clicado foi o botão direito do mouse (código 2).

			// Verifica se há acesso à internet.
			if (!netAccess()) {
				alert(lol + '#PAD_007 - sem acesso a rede...');
				return; // Encerra a função se não houver acesso à internet.
			}
			var currentProj = app.project.file;

			if (currentProj == null) {
				alert(lol + '#PAD_010 - o projeto atual ainda não foi salvo...');
				return;
			}

			var currentProjPath = decodeURI(currentProj.path);
			var fld = new Folder(currentProjPath);

			if (!fld.exists) {
				alert(lol + '#PAD_011 - a pasta não foi encontrada...');
				return;
			}
			openFolder(decodeURI(fld.fullName));
		};

		// Define a função a ser executada quando o botão "Renomear Comps" for clicado.
		PAD_ui.renomear.leftClick.onClick = function () {

			// Verifica se há itens no projeto.
			if (app.project.numItems == 0) return; // Encerra a função se não houver itens.

			// Inicia um grupo de desfazer para que a operação de renomeação possa ser desfeita.
			app.beginUndoGroup('renomear comps');

			// Chama a função renamePromoComps para renomear as composições selecionadas.
			renamePromoComps(app.project.selection);

			// Finaliza o grupo de desfazer.
			app.endUndoGroup();
		};

		PAD_ui.renomear.rightClick.onClick = function () {

			app.beginUndoGroup('renomear outputs');

			renameOutputs(); // renomeia todas as saídas

			app.endUndoGroup();
		};

		PAD_ui.organizar.leftClick.onClick = function () {

			// Verifica se há itens no projeto.
			if (app.project.numItems == 0) return; // Encerra a função se não houver itens.

			// grupo de desfazer
			app.beginUndoGroup('organização automática do projeto');

			// Se houver itens selecionados na janela projeto
			if (app.project.selection.length > 0) {

				// Itera sobre os itens selecionados
				for (var i = 0; i < app.project.selection.length; i++) {
					var aItem = app.project.selection[i]; // item selecionado

					// Se o item selecionado for uma composição sem tag
					if (aItem instanceof CompItem && aItem.comment === '') {
						aItem.comment = 'EXPORTAR'; // Adiciona a tag 'EXPORTAR' como comentário
					}
				}
			}

			deleteProjectFolders(); // Deleta as pastas existentes
			populateProjectFolders(); // Cria as pastas novas e organiza os itens
			deleteEmptyProjectFolders(); // Deleta as pastas vazias

			app.endUndoGroup();
		};

		PAD_ui.buscar.leftClick.onClick = function () {

			findDialog();
		};

		PAD_ui.organizar.rightClick.onClick = function () {

			app.beginUndoGroup('criar pastas do projeto');

			projectTemplateFolders(projectMode); // cria a estrutura de pastas do projeto

			app.endUndoGroup();
		};

		PAD_ui.atalhos.leftClick.onClick = function () {

			if (!netAccess()) {
				alert(lol + '#PAD_007 - sem acesso a rede...');
				return; // Encerra a função se não houver acesso à internet.
			}
			var apontamento = '"https://tvglobocorp.sharepoint.com/:x:/s/Planejamento-DTEN/Planejamento/EbkuFueT_DlFlUyRqlMSnJIBRpRsPPY72NSDqgKq0DvOKg?e=T7sn7i"';

			openWebSite(apontamento);
		};

		// Retorna o objeto da janela (PAD_w) para que ele possa ser exibido ou manipulado posteriormente.
		return PAD_w;
	}

	// Cria a janela da interface chamando a função O_PADEIRO_UI e passando o objeto atual como argumento. O resultado é armazenado na variável O_PADEIRO_WINDOW.
	var O_PADEIRO_WINDOW = O_PADEIRO_UI(thisObj);

	// Verifica se o After Effects tem acesso à internet.
	if (!netAccess()) {
		// Se não houver acesso, exibe um alerta pedindo para habilitar o acesso à rede nas preferências.
		alert('por favor, habilite a opção ' + netConfigName + ' nas preferencias');

		// Abre a janela de preferências do After Effects na seção de scripts.
		app.executeCommand(3131);

		// Verifica novamente se há acesso à rede.
		if (!netAccess()) {
			// Se ainda não houver acesso, exibe outro alerta informando que a funcionalidade será limitada.
			alert(lol + '#PAD_012 - sem acesso a rede...');
		}
	}

	// Verifica se a interface (O_PADEIRO_WINDOW) está sendo executada como uma janela flutuante.
	if (!(O_PADEIRO_WINDOW instanceof Panel)) O_PADEIRO_WINDOW.show();
	// Retorna o objeto da janela (O_PADEIRO_WINDOW).
	return O_PADEIRO_WINDOW;
}

// Executa tudo... ヽ(✿ﾟ▽ﾟ)ノ
O_PADEIRO_UTL(this);
