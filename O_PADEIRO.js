// Script: O PADEIRO script de utilidades

function O_PADEIRO_UTL(thisObj) {
	var vStr = '';

	#include 'source/globals.js';                   // Inclui variáveis globais (usadas em todo o script)
	#include 'source/layout/main ui functions.js';  // Inclui funções para criar a interface do usuário
	#include 'source/libraries/JSON lib.js';        // Inclui funções para trabalhar com dados JSON
	#include 'source/libraries/FUNC lib.js';        // Inclui funções utilitárias gerais
	#include 'source/libraries/PROT lib.js';        // Inclui funções que estendem objetos JavaScript (prototype)
	#include 'source/libraries/EXPS lib.js';        // Inclui uma biblioteca de expressões para animações
	#include 'source/libraries/ICON lib.js';        // Inclui ícones codificados para a interface

	// utilidades com interface
	#include 'source/layout/Utils/o padeiro templates ui.js'; // Sistema de templates
	#include 'source/layout/Utils/o padeiro folders ui.js';   // Busca em layers de texto
	#include 'source/layout/Utils/o padeiro maker ui.js';     // Busca em layers de texto
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
		try {
			var configContent = readFileContent(configFile);            // Lê o conteúdo do arquivo de configuração JSON
			var prodData = JSON.parse(configContent);                   // Analisa o conteúdo JSON e o armazena no objeto 'templateData'
			return sortProdData(prodData.PRODUCTIONS);

		} catch (err) {

			padConfigDialog(defaultProdData.PRODUCTIONS); // Chama a janela de configuração.

			var configContent = readFileContent(configFile);            // Lê o conteúdo do arquivo de configuração JSON
			var prodData = JSON.parse(configContent);                   // Analisa o conteúdo JSON e o armazena no objeto 'templateData'
			return sortProdData(prodData.PRODUCTIONS);
		}
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
		}
	}

	function O_PADEIRO_UI() {

		var PAD_prodArray = updateProdData(new File(scriptMainPath + 'O_PADEIRO_config.json')); // dados das produções
		templatesPath = PAD_prodArray[0].templatesPath;
		templatesFolder = new Folder(PAD_prodArray[0].templatesPath); // pasta de templates.

		var PAD_w = {}; // Objeto que representa a janela da interface

		// Cria a janela da interface (ou usa um painel existente)
		if (thisObj instanceof Panel) {
			PAD_w = thisObj;
		} else {
			PAD_w = new Window('palette', 'O PADEIRO'); // Cria uma nova janela
		}

		// Configurações da janela
		PAD_w.margins = 5;      // Margens internas
		PAD_w.orientation = 'stack'; // Layout vertical

		// Grupos de elementos na interface
		var mainGrp = PAD_w.add('group'); // Grupo principal
		mainGrp.spacing = 10; // Espaçamento entre elementos do grupo

		var btnGrp1 = mainGrp.add('group'); // Grupo de botões superior
		btnGrp1.alignment = 'center'; // Alinhamento central
		btnGrp1.spacing = 2; // Espaçamento entre botões

		// Botões da interface
		var PAD_launchBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Abrir O Padeiro"
		PAD_launchBtn.helpTip = 'O PADEIRO:\n\n◖ → abrir interface de templates\n\n◗ → criar novo template'; // Dica de ajuda
		PAD_launchBtn.enabled = templatesFolder.exists; // Habilita / Desabilita o botão "Abrir O Padeiro".

		var PAD_fontBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_FONT_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Instalar Fontes"
		PAD_fontBtn.helpTip = 'RESOLVER FONTES:\n\n◖ → instalar as fontes usadas no template\n\n◗ → fazer o collect das fontes usadas no projeto'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp2 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp2.alignment = 'center';
		btnGrp2.spacing = 2;

		var PAD_outputFolderBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_OUTPUTFOLDER_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Abrir Pasta de Saída"
		PAD_outputFolderBtn.helpTip = 'ABRIR PASTAS:\n\n◖ → abir a pasta do último item da fila de render\n\n◗ → abir a pasta do projeto (caso esteja salvo)'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp3 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp3.alignment = 'center';
		btnGrp3.spacing = 2;

		var PAD_renameBtn = btnGrp3.add('iconbutton', undefined, O_PADEIRO_RENAME_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_renameBtn.helpTip = 'RENOMEAR:\n\n◖ → renomear comps selecionadas\n\n◗ → renomear TODAS as saídas de render'; // Dica de ajuda

		var PAD_orgBtn = btnGrp3.add('iconbutton', undefined, O_PADEIRO_ORG_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_orgBtn.helpTip = 'ORGANIZAR:\n\nselecione as comps que serão\nRENDERIZADAS primeiro!\n\n◖ → organizar o projeto\n\n◗ → criar estrutura de pastas do projeto'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp4 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp4.alignment = 'center';
		btnGrp4.spacing = 2;

		var PAD_findBtn = btnGrp4.add('iconbutton', undefined, O_PADEIRO_FIND_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_findBtn.helpTip = 'BUSCA:\n\n◖ → abrir a BUSCA em layers de texto'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp5 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp5.alignment = 'center';
		btnGrp5.spacing = 2;

		var PAD_sheetBtn = btnGrp5.add('iconbutton', undefined, O_PADEIRO_SHEET_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_sheetBtn.helpTip = 'APONTAMENTO:\n\n◖ → abrir a planilha do apontamento de projetos no navegador'; // Dica de ajuda


		// Rótulo da versão
		var PAD_vLab = PAD_w.add('statictext', undefined, 'v' + PAD_v, { name: 'label', truncate: 'end' });
		PAD_vLab.alignment = 'right';
		PAD_vLab.helpTip = 'ajuda | DOCS';

		var prodGrp = PAD_w.add('group'); // Grupo de botões superior
		prodGrp.spacing = 4; // Espaçamento entre botões

		var iconGrp = prodGrp.add('group');
		iconGrp.orientation = 'stack'; // Layout vertical
		populateMainIcons(PAD_prodArray, iconGrp);

		var prodDrop = prodGrp.add('dropdownlist', undefined, getProdNames(PAD_prodArray));
		prodDrop.selection = 0; // Seleciona a produção padrão.
		prodDrop.preferredSize = [130, 24];
		prodDrop.minimumSize = [50, 24];
		prodDrop.helpTip = "PRODUÇÃO SELECIONADA"; // Dica de ajuda

		PAD_w.layout.layout(true); // Aplica o layout

		// Estilização da interface
		setTxtHighlight(PAD_vLab, '#000000', '#FF7B79'); // Cor de destaque do texto
		setBgColor(PAD_w, '#515D9E'); // Cor de fundo da janela

		PAD_w.onShow = PAD_w.onResizing = function () { // Define uma função a ser executada quando a janela é exibida ou redimensionada.

			// Verifica se a largura da janela é maior que a altura.
			// Se sim, os elementos serão dispostos horizontalmente ("row").
			// Se não, os elementos serão dispostos verticalmente ("column").
			var grpLayout = PAD_w.size.width > PAD_w.size.height ? 'row' : 'column';

			// Define o alinhamento do rótulo de versão.
			// Se a janela for mais larga, o rótulo será alinhado à direita.
			// Se a janela for mais alta, o rótulo será alinhado embaixo.
			var labLayout = PAD_w.size.width > PAD_w.size.height ? 'right' : 'bottom';
			var prodLayout = PAD_w.size.width > PAD_w.size.height ? 'left' : 'top';

			// Define as margens do grupo principal de elementos.
			// Se a janela for mais larga, a margem direita será maior para acomodar o rótulo de versão.
			// Se a janela for mais alta, a margem inferior será maior para acomodar o rótulo de versão.
			var mainMargins = PAD_w.size.width > PAD_w.size.height ? [180, 0, 40, 0] : [0, 55, 0, 20];

			if (grpLayout == 'column' && PAD_w.size.width < 150) {
				prodDrop.size.width = PAD_w.size.width - 16;
			}

			// Aplica o layout calculado aos grupos de elementos.
			mainGrp.orientation = grpLayout;
			prodGrp.orientation = grpLayout;
			btnGrp1.orientation = grpLayout;
			btnGrp2.orientation = grpLayout;
			btnGrp3.orientation = grpLayout;
			btnGrp4.orientation = grpLayout;

			// Aplica o alinhamento calculado ao rótulo de versão.
			PAD_vLab.alignment = labLayout;
			prodGrp.alignment = prodLayout;

			// Aplica as margens calculadas ao grupo principal.
			mainGrp.margins = mainMargins;

			getTabDividers(mainGrp);

			// Atualiza o layout de todos os elementos na janela para que as alterações sejam visíveis.
			btnGrp1.layout.layout(true);
			btnGrp2.layout.layout(true);
			PAD_w.layout.layout(true);
			PAD_w.layout.resize();
		};

		// Adiciona um "ouvinte" de evento ao rótulo de versão (PAD_vLab).
		PAD_vLab.addEventListener('mousedown', function () {
			// Este ouvinte será acionado quando o usuário clicar (mousedown) no rótulo.
			var siteUrl = 'https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-o-padeiro-script'; // Define o URL do site de documentação.
			openWebSite(siteUrl); // Abre o site de documentação em um navegador web.
		});

		iconGrp.addEventListener('click', function (c) {

			// Verifica se aconteceu um clique duplo (detail == 2).
			if (c.detail == 2) {

				padConfigDialog(PAD_prodArray); // Chama a janela de configuração.
				prodDrop.removeAll(); // Limpa a lista de produções do menu.

				// atualiza os dados das produções.
				PAD_prodArray = updateProdData(new File(scriptMainPath + 'O_PADEIRO_config.json'));

				// Popula a lista de produções do menu
				populateDropdownList(getProdNames(PAD_prodArray), prodDrop);
				populateMainIcons(PAD_prodArray, this);

				prodDrop.selection = 0; // Seleciona a primeira produção.
				this.layout.layout(true);
			}
		});

		prodDrop.onChange = function () {

			var i = this.selection.index;
			changeIcon(i, iconGrp);

			templatesPath = PAD_prodArray[i].templatesPath;
			templatesFolder = new Folder(PAD_prodArray[i].templatesPath); // pasta de templates.
			PAD_launchBtn.enabled = templatesFolder.exists; // Habilita / Desabilita o botão "Abrir O Padeiro".

			// Se a pasta de templates não existir.
			if (!templatesFolder.exists) alert(lol + '#PAD_002 - a pasta de templates não foi localizada...');

		};

		// Define a função a ser executada quando o botão "Abrir O Padeiro" for clicado.
		PAD_launchBtn.onClick = function () {

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
		PAD_launchBtn.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				if (app.project.numItems == 0) return;

				var aItem = app.project.activeItem;

				if (aItem == null) return;

				PadMakerDialog();
			}
		});

		PAD_fontBtn.onClick = function () { // Define a função a ser executada quando o botão "Instalar Fontes" for clicado.

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
		PAD_fontBtn.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				// Verifica se há itens no projeto.
				if (app.project.numItems == 0) return;

				var savePath = Folder.selectDialog(); // Abre a janela de seleção de pastas

				if (savePath == null) return; // Se a janela foi cancelada, não faz nada

				var currentProjPath = decodeURI(savePath.fullName) + '/FONTS'; // caminho final do collect
				var fontsPath = fontCollect(currentProjPath);

				openFolder(fontsPath);
			}
		});

		// Define a função a ser executada quando o botão "Abrir Pasta de Saída" for clicado.
		PAD_outputFolderBtn.onClick = function () {

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
		PAD_outputFolderBtn.addEventListener('click', function (c) {
			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

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
			}
		});

		// Define a função a ser executada quando o botão "Renomear Comps" for clicado.
		PAD_renameBtn.onClick = function () {

			// Verifica se há itens no projeto.
			if (app.project.numItems == 0) return; // Encerra a função se não houver itens.

			// Inicia um grupo de desfazer para que a operação de renomeação possa ser desfeita.
			app.beginUndoGroup('renomear comps');

			// Chama a função renamePromoComps para renomear as composições selecionadas.
			renamePromoComps(app.project.selection);

			// Finaliza o grupo de desfazer.
			app.endUndoGroup();
		};

		PAD_renameBtn.addEventListener('click', function (c) {

			if (c.button == 2) {
				app.beginUndoGroup('renomear outputs');

				renameOutputs(); // renomeia todas as saídas

				app.endUndoGroup();
			}
		});

		PAD_orgBtn.onClick = function () {

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

		PAD_findBtn.onClick = function () {

			findDialog();
		};

		PAD_orgBtn.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				app.beginUndoGroup('criar pastas do projeto');

				projectTemplateFolders(projectMode); // cria a estrutura de pastas do projeto

				app.endUndoGroup();
			}
		});


		PAD_sheetBtn.onClick = function () {

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
	if (O_PADEIRO_WINDOW.toString() != '[object Panel]') {
		// Se for uma janela flutuante, exibe a janela.
		O_PADEIRO_WINDOW.show();
	}

	// Retorna o objeto da janela (O_PADEIRO_WINDOW).
	return O_PADEIRO_WINDOW;
}

// Executo tudo... ヽ(✿ﾟ▽ﾟ)ノ
O_PADEIRO_UTL(this);
