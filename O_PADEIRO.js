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

	function O_PADEIRO_UI() {

		#include 'source/layout/Utils/o padeiro ui.js'; // Layout da interface
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
		PAD_launchBtn.helpTip = '◖ → abrir O PADEIRO\n\n◗ → abrir a pasta de templates'; // Dica de ajuda

		var PAD_fontBtn = btnGrp1.add('iconbutton', undefined, O_PADEIRO_FONT_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Instalar Fontes"
		PAD_fontBtn.helpTip = '◖ → instalar as fontes usadas no template\n\n◗ → abrir a pasta de fontes usadas no template'; // Dica de ajuda

		mainGrp.add("panel"); // Separador visual

		var btnGrp2 = mainGrp.add('group'); // Grupo de botões inferior
		btnGrp2.alignment = 'center';
		btnGrp2.spacing = 2;

		var PAD_outputFolderBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_OUTPUTFOLDER_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Abrir Pasta de Saída"
		PAD_outputFolderBtn.helpTip = '◖ → abir pasta do último item da fila de render\n\n◗ → abir pasta do penúltimo item da fila de render'; // Dica de ajuda

		btnGrp2.add("panel"); // Separador visual

		var PAD_renameBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_RENAME_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_renameBtn.helpTip = '◖ → renomear comps selecionadas\n\n◗ → renomear TODAS as saídas de render'; // Dica de ajuda

		var PAD_OrgBtn = btnGrp2.add('iconbutton', undefined, O_PADEIRO_ORG_ICON, { name: 'btn', style: 'toolbutton' }); // Botão "Renomear Comps"
		PAD_OrgBtn.helpTip = 'selecione as comps que serão\nRENDERIZADAS primeiro!\n\n◖ → organizar o projeto';//\n\n◗ → renomear TODAS as saídas de render'; // Dica de ajuda

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

			// Aplica o alinhamento calculado ao rótulo de versão.
			PAD_vLab.alignment = labLayout;

			// Aplica as margens calculadas ao grupo principal.
			mainGrp.margins = mainMargins;

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
				if (templatesFolder.exists) {
					openFolder(templatesPath); // Se existir, abre a pasta de templates no sistema operacional.
				} else {
					// Se não existir, exibe um alerta informando que a pasta não foi encontrada.
					alert(lol + '\na pasta de templates não foi localizada...');
				}
			}
		});

		PAD_fontBtn.onClick = function () { // Define a função a ser executada quando o botão "Instalar Fontes" for clicado.

			// Verifica se há acesso à rede.
			if (!netAccess()) {
				alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
				return;
			}

			// Obtém o caminho da pasta do template a partir dos metadados XMP do projeto.
			var folderPath = getXMPData('source');
			var templateFontsPath = folderPath + '/FONTS';

			// Se o caminho da pasta não for encontrado, a função é interrompida.
			if (folderPath == '') return;

			// Cria um objeto "Folder" para a pasta de fontes do template.
			var templateFontsFolder = new Folder(templateFontsPath);

			// Verifica se a pasta de fontes existe.
			if (!templateFontsFolder.exists) return;

			// Se a pasta de fontes existe e o sistema operacional for Windows, instala as fontes.
			if (appOs == 'Win') installWinFonts(templateFontsPath);
		};

		// Adiciona um ouvinte de evento de clique ao botão "Instalar Fontes".
		PAD_fontBtn.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				// Verifica se há acesso à internet, necessário para baixar fontes.
				if (!netAccess()) {
					alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
					return; // Encerra a função se não houver acesso à internet.
				}

				var folderPath = getXMPData('source');  // Obtém o caminho da pasta do template a partir dos metadados XMP.
				var templateFontsPath = folderPath + '/FONTS'; // Adiciona "/FONTS" para obter o caminho da pasta de fontes.
				if (folderPath == '') return; // Encerra se o caminho da pasta não for encontrado.

				// Tenta abrir a pasta de fontes no sistema operacional.
				try {
					openFolder(templateFontsPath);

					// Exibe um alerta se ocorrer algum erro ao abrir a pasta.
				} catch (error) {
					alert(lol + '\n' + error + '...');
				}
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
			if (app.project.renderQueue.numItems < 1) return;

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

				// Verifica se há acesso à internet (necessário para alguns logs ou relatórios?).
				if (!netAccess()) {
					alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
					return; // Encerra a função se não houver acesso à internet.
				}

				// Verifica se há pelo menos dois itens na fila de renderização (para acessar o penúltimo).
				if (app.project.renderQueue.numItems < 2) return;

				// Obtém o PENÚLTIMO item da fila de renderização (índice é numItems - 1).
				var item = app.project.renderQueue.item(app.project.renderQueue.numItems - 1);

				// Obtém o módulo de saída do item (onde o arquivo renderizado será salvo).
				var outputModule = item.outputModule(1);

				// Obtém o caminho completo da pasta de saída, decodificando caracteres especiais.
				var outputPath = decodeURI(outputModule.file.path);

				// Cria um objeto "Folder" para representar a pasta de saída.
				var fld = new Folder(outputPath);

				// Verifica se a pasta de saída existe no sistema de arquivos.
				if (!fld.exists) {
					alert(lol + '\na pasta não foi encontrada...'); // Exibe um erro se a pasta não for acessível.
					return; // Encerra a função se a pasta não existir.
				}

				// Abre a pasta de saída no sistema operacional do usuário.
				openFolder(outputPath);
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

		PAD_OrgBtn.onClick = function () {

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
			alert('sem acesso a rede...  ' + lol + '\na funcionalidade será limitada');
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
