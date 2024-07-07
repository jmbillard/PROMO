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

	function getPrdNames(prodDataObj) {
		var prdNames = [];

		for (var i = 0; i < prodDataObj.length; i++) {
			prdNames.push(prodDataObj[i].name);
		}
		return prdNames;
	}

	function O_PADEIRO_UI() {

		var configFile = new File('~/PROMO/O_PADEIRO_PROD_config.json'); // Caminho e nome do arquivo de configuração JSON
		var configContent = readFileContent(configFile);            // Lê o conteúdo do arquivo de configuração JSON
		prodData = JSON.parse(configContent);                   // Analisa o conteúdo JSON e o armazena no objeto 'templateData'

		// utilidades com interface
		#include 'source/layout/Utils/o padeiro ui.js'; // Sistema de templates
		#include 'source/layout/Utils/find ui.js'; // Busca em layers de texto
		var PAD_w = {}; // Objeto que representa a janela da interface

		// Cria a janela da interface (ou usa um painel existente)
		if (thisObj instanceof Panel) {
			PAD_w = thisObj;
		} else {
			PAD_w = new Window('palette', 'O PADEIRO PROD'); // Cria uma nova janela
		}

		// Configurações da janela
		PAD_w.margins = 5;      // Margens internas
		PAD_w.orientation = 'stack'; // Layout vertical

		// Grupos de elementos na interface
		var mainGrp = PAD_w.add('group'); // Grupo principal
		mainGrp.spacing = 10; // Espaçamento entre elementos do grupo

		var btnGrp0 = mainGrp.add('group'); // Grupo de botões superior
		btnGrp0.alignment = 'center'; // Alinhamento central
		btnGrp0.spacing = 2; // Espaçamento entre botões
		
		var prodDrop = btnGrp0.add('dropdownlist', undefined, getPrdNames(prodData.PRODUCTIONS));

		// mainGrp.add("panel"); // Separador visual

		var btnGrp1 = mainGrp.add('group'); // Grupo de botões superior
		btnGrp1.alignment = 'center'; // Alinhamento central
		btnGrp1.spacing = 2; // Espaçamento entre botões

		// Botões da interface
		var PAD_launchBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Abrir O Padeiro"
		PAD_launchBtn.helpTip = 'O PADEIRO PROD:\n\n◖ → abrir interface\n\n◗ → abrir a pasta de templates'; // Dica de ajuda

		var PAD_fontBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_FONT_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Instalar Fontes"
		PAD_fontBtn.helpTip = 'RESOLVER FONTES:\n\n◖ → instalar as fontes usadas no template\n\n◗ → fazer o collect das fontes usadas no projeto'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp2 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp2.alignment = 'center';
		btnGrp2.spacing = 2;

		var PAD_outputFolderBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_OUTPUTFOLDER_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Abrir Pasta de Saída"
		PAD_outputFolderBtn.helpTip = 'ABRIR PASTAS:\n\n◖ → abir a pasta do último item da fila de render\n\n◗ → abir a pasta do projeto (caso esteja salvo)'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp4 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp4.alignment = 'center';
		btnGrp4.spacing = 2;

		var PAD_findBtn = btnGrp4.add('iconbutton', undefined, O_PADEIRO_FIND_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_findBtn.helpTip = 'BUSCA:\n\n◖ → abrir a BUSCA em layers de texto'; // Dica de ajuda

		// Rótulo da versão
		var PAD_vLab = PAD_w.add('statictext', undefined, 'v' + PAD_v, { name: 'label', truncate: 'end' });
		PAD_vLab.alignment = 'right';
		PAD_vLab.helpTip = 'ajuda | DOCS';

		PAD_w.layout.layout(true); // Aplica o layout

		// Estilização da interface
		setTxtHighlight(PAD_vLab, '#FFFFFF', '#FF7B79'); // Cor de destaque do texto
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

			// Define as margens do grupo principal de elementos.
			// Se a janela for mais larga, a margem direita será maior para acomodar o rótulo de versão.
			// Se a janela for mais alta, a margem inferior será maior para acomodar o rótulo de versão.
			var mainMargins = PAD_w.size.width > PAD_w.size.height ? [0, 0, 40, 0] : [0, 0, 0, 20];

			// Aplica o layout calculado aos grupos de elementos.
			mainGrp.orientation = grpLayout;
			btnGrp1.orientation = grpLayout;
			btnGrp2.orientation = grpLayout;
			btnGrp4.orientation = grpLayout;

			// Aplica o alinhamento calculado ao rótulo de versão.
			PAD_vLab.alignment = labLayout;

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

		prodDrop.onChange = function () {
			templatesPath = prodData.PRODUCTIONS[this.selection.index].templatesPath; // selected tab color...
			templatesFolder = new Folder(templatesPath);
		};
	
		// Define a função a ser executada quando o botão "Abrir O Padeiro" for clicado.
		PAD_launchBtn.onClick = function () {

			// Verifica se há acesso à internet.
			if (!netAccess()) {
				// Se não houver acesso, exibe um alerta informando que a funcionalidade será limitada e encerra a função.
				alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
				return;
			}

			// Se houver acesso à internet, chama a função padeiroTemplateDialog() para exibir a interface de templates.
			padeiroTemplateDialog();
		};

		// Adiciona um ouvinte de evento de clique ao botão "Abrir O Padeiro". 
		PAD_launchBtn.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {
				// Verifica se a pasta de templates existe.
				if (!templatesFolder.exists) {
					alert(lol + '\na pasta de templates não foi localizada...'); // mensagem de erro.
					return;
				}
				openFolder(templatesPath); // abre a pasta de templates.
			}
		});

		PAD_fontBtn.onClick = function () { // Define a função a ser executada quando o botão "Instalar Fontes" for clicado.

			// Verifica se há acesso à rede.
			if (!netAccess()) {
				alert('sem acesso a rede... ' + lol + '\na funcionalidade será limitada');
				return;
			}

			// Obtém o caminho da pasta do template a partir dos metadados XMP do projeto.
			var folderPath = getXMPData('source');
			var templateFontsPath = folderPath + '/FONTS';

			// Se o caminho da pasta não for encontrado, a função é interrompida.
			if (folderPath == '') {
				alert(lol + '\nesse não foi preenchido pelo padeiro...')
				return;
			}
			// Cria um objeto "Folder" para a pasta de fontes do template.
			var templateFontsFolder = new Folder(templateFontsPath);

			// Verifica se a pasta de fontes existe.
			if (!templateFontsFolder.exists) {
				alert(lol + '\na pasta de fontes não foi localizada...')
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
				alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
				return; // Encerra a função se não houver acesso à internet.
			}

			// Verifica se há itens na fila de renderização.
			if (app.project.renderQueue.numItems < 1) {
				alert(lol + '\na fila de render está vazia...')
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
				alert(lol + '\na pasta não foi encontrada...'); // Exibe um erro se a pasta não for acessível.
				return; // Encerra a função se a pasta não existir.
			}

			// Abre a pasta de saída no sistema operacional do usuário.
			openFolder(outputPath);
		};

		// Adiciona um ouvinte de evento de clique ao botão "Abrir Pasta de Saída".
		PAD_outputFolderBtn.addEventListener('click', function (c) {
			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				// error...
				if (!netAccess()) {
					alert(netConfigName + ' não habilitada');
					return;
				}
				var currentProj = app.project.file;

				if (currentProj == null) {
					alert(lol + '\no projeto atual ainda não foi salvo...');
					return;
				}

				var currentProjPath = decodeURI(currentProj.path);
				var fld = new Folder(currentProjPath);

				if (!fld.exists) {
					alert('a pasta não foi encontrada...');
					return;
				}
				openFolder(decodeURI(fld.fullName));
			}
		});

		PAD_findBtn.onClick = function () {

			findDialog();
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
			alert('sem acesso a rede... ' + lol + '\na funcionalidade será limitada');
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