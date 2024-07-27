/*

---------------------------------------------------------------
> 🪟 UI dialogs
---------------------------------------------------------------

*/
// Declaração da versão do script 'O Padeiro'
var PAD_v = '1.0';

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

	outputPath: '~/Desktop',                // Caminho padrão para salvar os renders dos templates gerados
	importPath: '~/Desktop',                // Caminho padrão para importar novos templates para a pasta do Padeiro
	alpha: true                             // Indica se o template precisa de canal alpha (transparência) para o render
};

// Função para criar a janela de diálogo de configuração do render
function renderTemplateDialog(array, alphaChannel) {
	// Variáveis Locais
	var renderTemplate = ''; // String que armazenará o nome do template de renderização selecionado pelo usuário
	// Mensagem de ajuda, indicando se o template precisa ou não de canal alpha (transparência)
	var txtHelp2Content = alphaChannel ? 'requer canal alpha!' : 'não requer canal alpha';

	// Criação da Janela de Diálogo
	var wPref = new Window('dialog', 'render setup...');   // Cria uma nova janela de diálogo com o título 'render setup...'
	wPref.alignChildren = ['left', 'top'];                 // Alinha todos os elementos da janela à esquerda e ao topo
	wPref.spacing = 10;                                    // Define um espaçamento de 10 pixels entre os elementos da janela

	// Primeiro Texto de Ajuda
	// Adiciona um texto estático à janela com instruções para o usuário
	var helpTxt1 = wPref.add('statictext', undefined, 'selecione o template do render...');
	setTxtColor(helpTxt1, monoColors[2]);                // Define a cor do texto

	// Grupo para a Lista Suspensa
	var renderGrp = wPref.add('group');                   // Cria um grupo para organizar a lista e facilitar o layout

	// Lista Suspensa dos Templates de Renderização
	var renderDrop = renderGrp.add('dropdownlist', undefined, array); // Adiciona uma lista
	renderDrop.preferredSize = [250, 24];              // Define um tamanho preferencial para a lista

	// Divisor Visual
	var divider1 = wPref.add('panel');                    // Divisor visual para separar as seções da janela
	divider1.alignment = 'fill';                          // Faz o divisor ocupar toda a largura da janela

	// Segundo Texto de Ajuda (Canal Alpha)
	var helpTxt2 = wPref.add('statictext', undefined, 'obs: ' + txtHelp2Content); // Indicação sobre a nescidade de canal alpha
	setTxtColor(helpTxt2, mainColors[1]);                // Define a cor do texto

	// Define uma função que será executada quando o usuário alterar a seleção na lista
	renderDrop.onChange = function () {
		renderTemplate = renderDrop.selection.toString(); // Obtém o nome do template selecionado e o converte para uma string
		wPref.close();                                    // Fecha a janela de diálogo após a seleção
	};

	// Exibir a Janela e Retornar o Template Selecionado
	wPref.show();
	return renderTemplate;
}

// Função para criar a interface de usuário do 'O Padeiro'
function padeiroTemplateDialog() {

	var wWidth;                        // Largura da janela sem a pré-visualização
	var oWidth;                        // Largura da janela com a pré-visualização
	var previewScale = 0.2;            // Fator de escala de preview da imagem
	var fileFilter = ['.aep', '.aet']; // Extensões de arquivo de template permitidas
	var hasData = false;               // Indica se há dados de entrada
	var hasInput = false;              // Indica se o template possui campos de entrada
	var exemple = '';                  // Exemplo de texto de entrada
	var padeiroOutputModuleTemplate;   // Variável para armazenar o template do módulo de saída

	// Variáveis para armazenar os arquivos do template
	var templateFile;
	var previewImgFile;
	var configFile;
	var scriptFile;
	var templateData;
	var tipContent = '...';

	// Cria a janela principal do 'O Padeiro'
	var wPadeiroTemplates = new Window('dialog', 'O PADEIRO ' + PAD_v);

	// Cria o grupo principal que conterá todos os elementos da interface
	var mainGrp = wPadeiroTemplates.add('group');

	// Cria o grupo vertical à esquerda para os elementos de seleção do template
	var vGrp1 = mainGrp.add('group');
	vGrp1.orientation = 'column';        // Orientação vertical
	vGrp1.alignment = ['center', 'top']; // Alinhamento no centro e no topo
	vGrp1.alignChildren = 'left';        // Alinhamento dos elementos filhos à esquerda

	divider = mainGrp.add('panel'); // Divisor visual para separar as seções da janela

	// Cria o grupo vertical à direita para a pré-visualização e entrada de dados
	var vGrp2 = mainGrp.add('group');
	vGrp2.orientation = 'column';        // Orientação vertical
	vGrp2.alignment = ['center', 'top']; // Alinhamento no centro e no topo
	vGrp2.alignChildren = 'left';        // Alinhamento dos elementos filhos à esquerda
	vGrp2.visible = false;               // Inicialmente oculta a pré-visualização

	// Cria um grupo para a árvore de templates
	var treeGrp = vGrp1.add('group');
	treeGrp.orientation = 'column'; // Orientação vertical
	treeGrp.spacing = 5;            // Espaçamento entre os elementos

	// Cria um grupo para o cabeçalho da árvore de templates
	var headerGrp = treeGrp.add('group');
	headerGrp.alignment = 'fill';      // Ocupa todo o espaço disponível
	headerGrp.orientation = 'stack';   // Empilha os elementos verticalmente

	// Cria um grupo para o rótulo e a caixa de pesquisa dos templates
	var templatesGrp = headerGrp.add('group');
	templatesGrp.alignment = 'left'; // Alinhamento à esquerda

	// Cria um grupo para o botão de informações
	var infoGrp = headerGrp.add('group');
	infoGrp.alignment = 'right'; // Alinhamento à direita

	// Cria o rótulo 'busca:'
	var templateLabTxt = templatesGrp.add('statictext', undefined, 'busca:');
	setTxtColor(templateLabTxt, monoColors[2]); // Define a cor do rótulo

	// Cria o botão de informações
	var infoBtn = infoGrp.add('iconbutton', undefined, infoIcon.light, { style: 'toolbutton' });
	infoBtn.helpTip = 'ajuda | DOCS'; // Define a dica da ferramenta

	// Cria a caixa de pesquisa
	var searchBox = treeGrp.add('edittext', [0, 0, 250, 24], '');

	// Cria a árvore de templates
	var templateTree = treeGrp.add('treeview', [0, 0, 250, 464]);
	buildTree(templatesFolder, templateTree, fileFilter); // Constrói a árvore de templates

	//---------------------------------------------------------

	// Criação do grupo de botões principal
	var bGrp = vGrp1.add('group');      // Cria um grupo para organizar os botões dentro do grupo vertical à esquerda (vGrp1)
	bGrp.orientation = 'stack';         // Define a orientação do grupo como 'stack' (empilhamento)
	bGrp.alignment = 'fill';            // Faz o grupo ocupar toda a largura disponível

	// Grupo dos botões à esquerda
	var bGrp1 = bGrp.add('group');      // Cria um subgrupo dentro do grupo principal (bGrp) para os botões que ficarão à esquerda
	bGrp1.alignment = 'left';           // Alinha o subgrupo à esquerda
	bGrp1.spacing = 2;                  // Define um pequeno espaçamento de 2 pixels entre os botões dentro deste subgrupo

	// Grupo do botão à direita
	var bGrp2 = bGrp.add('group');      // Cria outro subgrupo dentro do grupo principal para o botão que ficará à direita
	bGrp2.alignment = 'right';          // Alinha o subgrupo à direita

	// Botões à esquerda
	// Botão 'Importar'
	var importBtn = bGrp1.add('iconbutton', iconSize, downloadIcon.light, { style: 'toolbutton' });
	importBtn.helpTip = '◖ → importar template selecionado'; // Define a dica da ferramenta

	// Botão 'Atualizar'
	var refreshBtn = bGrp1.add('iconbutton', iconSize, refreshIcon.light, { style: 'toolbutton' });
	refreshBtn.helpTip = '◖ → atualizar lista'; // Define a dica da ferramenta

	// Botão 'Abrir Pasta'
	var openFldBtn = bGrp1.add('iconbutton', iconSize, folderIcon.light, { style: 'toolbutton' });
	openFldBtn.helpTip = '◖ → abrir a pasta de templates'; // Define a dica da ferramenta

	// Botões à direita
	// Botão 'Criar'
	var makeBtn = bGrp2.add('button', undefined, 'criar');   // Adiciona um botão de texto com o rótulo 'criar'
	makeBtn.helpTip = '◖ → criar e preencher o template selecionado'; // Define a dica da ferramenta
	makeBtn.enabled = false;                               // O botão 'Criar' começa desabilitado

	//---------------------------------------------------------

	// Criação do Grupo de preview
	var previewGrp = vGrp2.add('group'); // Cria um grupo para organizar à pré-visualização do template
	previewGrp.orientation = 'column';   // Define a orientação do grupo como 'column' (coluna)
	previewGrp.alignChildren = 'left';   // Alinha os elementos filhos do grupo à esquerda.


	// Rótulo de preview
	var previewLabTxt = previewGrp.add('statictext', undefined, 'preview:'); // Adiciona um texto estático 'preview:' ao grupo de preview
	setTxtColor(previewLabTxt, monoColors[2]);   // Define a cor do texto 'preview:'

	// Imagem de preview
	var previewImg = previewGrp.add('image', undefined, no_preview); // Adiciona um elemento de imagem ao grupo de preview. 'no_preview'
	previewImg.size = [1920 * previewScale, 1080 * previewScale];    // Define o tamanho da imagem de preview, aplicando um fator de escala ('previewScale')

	// Divisor de preview
	divider = vGrp2.add('panel');                                    // Divisor visual para separar as seções da janela
	divider.alignment = 'fill';                                      // Faz o divisor ocupar toda a largura disponível


	// Criação do Grupo de Entrada de Dados (inputGrp)
	var inputGrp = vGrp2.add('group');                              // Cria um grupo para conter os elementos relacionados à entrada de dados e dicas
	inputGrp.alignment = ['left', 'top'];                           // Alinha o grupo à esquerda e ao topo

	// Criação de Subgrupos para Organização

	// Subgrupo para a caixa de texto e opções de render
	var txtGrp = inputGrp.add('group');            // Cria um subgrupo para conter a caixa de texto e as opções de renderização
	txtGrp.orientation = 'column';                 // Define a orientação como coluna (elementos dispostos verticalmente)
	txtGrp.alignment = ['left', 'top'];            // Alinha o subgrupo à esquerda e ao topo
	txtGrp.alignChildren = 'left';                 // Alinha os elementos filhos à esquerda

	// Subgrupo para as dicas
	var tipGrp = inputGrp.add('group');            // Cria um subgrupo para conter as dicas
	tipGrp.orientation = 'column';                 // Define a orientação como coluna (elementos dispostos verticalmente)
	tipGrp.alignment = ['left', 'top'];            // Alinha o subgrupo à esquerda e ao topo
	tipGrp.alignChildren = 'left';                 // Alinha os elementos filhos à esquerda

	// Elementos da Caixa de Texto
	var inputLabTxt = txtGrp.add('statictext', undefined, 'input:'); // Adiciona um texto estático 'input:' para identificar a caixa de texto
	setTxtColor(inputLabTxt, monoColors[2]);                         // Define a cor do texto

	// Criação da caixa de texto
	var edtText = txtGrp.add('edittext', [0, 0, 185, 200], '', { multiline: true }); // Cria uma caixa de texto editável (multiline) inicialmente vazia
	edtText.enabled = false;                                         // A caixa de texto começa desabilitada

	// Opções de Renderização
	var renderGrp = txtGrp.add('group');                             // Cria um grupo para as opções de renderização (checkbox)
	renderGrp.spacing = 15;                                          // Define um espaçamento de 15 pixels entre os elementos do grupo

	var renderLabTxt = renderGrp.add('statictext', [0, 0, 150, 18], 'adicionar a fila de render:'); // Adiciona um rótulo para a caixa de seleção de renderização
	setTxtColor(renderLabTxt, monoColors[2]);                       // Define a cor do rótulo.
	renderLabTxt.helpTip = 'adiciona automaticamente os templates\na fila de render, ao clicar no botão \'criar\'.'; // Define a dica da ferramenta

	var renderCkb = renderGrp.add('checkbox', [8, 4, 24, 18]);      // Cria a caixa de seleção (checkbox) para a opção de renderização.
	renderCkb.value = true;                                         // Marca a caixa de seleção por padrão.
	renderCkb.enabled = false;                                      // Desabilita a caixa de seleção inicialmente.

	// Dicas
	var tipLabTxt = tipGrp.add('statictext', undefined, 'dicas:'); // Adiciona o rótulo 'dicas:' ao grupo de dicas.
	setTxtColor(tipLabTxt, monoColors[2]);                         // Define a cor do rótulo.

	var tipContentTxt = tipGrp.add('statictext', [0, 0, 180, 210], tipContent, { multiline: true }); // Cria um texto estático para exibir as dicas.
	setTxtColor(tipContentTxt, mainColors[1]);                    // Define a cor do texto das dicas.

	//---------------------------------------------------------

	// Função executada quando a janela 'O Padeiro' é exibida
	wPadeiroTemplates.onShow = function () {
		// Expandir a raiz da árvore de templates
		templateTree.expanded = true;      // Expande o nível principal da árvore de templates (a raiz).
		var branches = templateTree.items; // Obtém todos os itens (nós e folhas) da árvore de templates.

		// Expandir todas as pastas na árvore de templates
		for (var i = 0; i < branches.length; i++) {
			if (branches[i].type == 'node') {     // Verifica se o item é um nó (pasta), e não uma folha (template).
				branches[i].expanded = true;      // Se for um nó, expande a pasta.
			}
		}

		// Calcula e armazena as dimensões da janela
		oWidth = wPadeiroTemplates.size.width; // Armazena a largura original da janela (com a área de preview)
		wWidth = oWidth - 405;                 // Calcula a largura da janela sem a área de preview

		// Oculta elementos da interface
		vGrp2.visible = false;      // Oculta o grupo que contém a pré-visualização do template e a área de entrada de dados
		divider.visible = false;    // Oculta o divisor que separa a pré-visualização dos outros elementos
		wPadeiroTemplates.size.width = wWidth; // Redimensiona a janela para a largura sem pré-visualização

		// Foco na caixa de pesquisa
		// Define o foco (cursor) na caixa de pesquisa para que o usuário possa começar a digitar imediatamente
		searchBox.active = true;
	};

	//---------------------------------------------------------

	// Função para lidar com a tecla Enter na caixa de pesquisa
	searchBox.onEnterKey = function () {
		templateLabTxt.active = true;  // Define o rótulo 'busca:' como ativo (focado).
		templateTree.active = true;    // Define a árvore de templates como ativa (focada).
	};

	//---------------------------------------------------------

	// Função executada quando o texto na caixa de pesquisa é alterado
	searchBox.onChange = function () {
		if (this.text.trim() == '') return; // Sai da função se a caixa de pesquisa estiver vazia

		// Formatação do texto de pesquisa
		searchBox.text = searchBox.text
			.trim()                      // Remove espaços em branco do início e do fim do texto
			.toUpperCase()               // Converte todo o texto para maiúsculas
			.replaceSpecialCharacters(); // Remove caracteres especiais

		buildTree(templatesFolder, templateTree, fileFilter); // Atualiza a árvore de templates

		var items = findItem(templateTree, [], searchBox.text); // Encontra os itens na árvore que correspondem à pesquisa

		if (items.length == 0) return; // Sai da função se nenhum item for encontrado

		// Expande os nós da árvore para mostrar os resultados da pesquisa
		for (var n = 0; n < items.length; n++) {
			var s = items[n];                        // Obtém o item atual da pesquisa
			if (s.type == 'node') s.expanded = true; // Se o item for um nó (pasta), expande-o

			// Expande os pais do item até chegar à raiz da árvore
			while (s.parent.constructor.name != 'TreeView') {
				s.parent.expanded = true; // Expande o nó pai
				s = s.parent;             // Sobe um nível na árvore
			}
		}

		templateLabTxt.active = true;  // Define o rótulo 'busca:' como ativo (focado)
		templateTree.active = true;    // Define a árvore de templates como ativa (focada)
	};

	//---------------------------------------------------------

	// Função executada quando a seleção na árvore de templates muda (templateTree.onChange)
	templateTree.onChange = function () {
		// Pastas (nós) na árvore não devem ser selecionáveis
		if (templateTree.selection != null && templateTree.selection.type == 'node') {
			templateTree.selection = null; // Limpa a seleção se um nó (pasta) for clicado
		}

		// Caso nenhum template seja selecionado
		if (templateTree.selection == null) {
			wPadeiroTemplates.size.width = wWidth; // Redimensiona a janela para o tamanho menor (sem a pré-visualização)
			vGrp2.visible = false;                 // Oculta a área de preview
			divider.visible = false;               // Oculta o divisor de preview
			return;                                // Encerra a função, pois não há mais nada a fazer
		}

		templateFile = templateTree.selection.file; // arquivo do template

		var templateBase = templateFile.path + '/' + deleteFileExt(templateFile.displayName); // nome do template

		// Criação dos objetos File para os arquivos do template
		previewImgFile = new File(templateBase + '_preview.png');    // arquivo de preview
		configFile = new File(templateBase + '_config.json');     // arquivo de configuração
		scriptFile = new File(templateBase + '_script.js');     // arquivo de script (se houver)

		// Habilita o botão de importar se um template estiver selecionado
		importBtn.enabled = templateTree.selection != null;

		// Verifica se o arquivo de preview existe
		if (previewImgFile.exists) {
			//define a imagem de preview para o arquivo encontrado
			previewImg.image = previewImgFile;

			// Se não existir...
		} else {
			//define a imagem de preview para a imagem padrão 'no_preview'
			previewImg.image = no_preview;
		}

		// Mostra a área de preview e ajusta a janela
		vGrp2.visible = true;       // Torna o grupo de preview visível
		divider.visible = true;     // Torna o divisor de preview visível
		wPadeiroTemplates.size.width = oWidth; // Redimensiona a janela para incluir a área de preview

		// Bloco try...catch para lidar com possíveis erros durante o carregamento e análise da configuração
		try {
			hasInput = false; // Inicializa a variável 'hasInput' como falso
			exemple = lol + '\n\nesse template não pode ser editado pelo padeiro.'; // Mensagem padrão
			tipContent = 'clique no botão importar e edite o template manualmente.'; // Dica padrão

			// Verificação se o arquivo de configuração existe
			if (configFile.exists) {
				exemple = relax + '\n\nesse template não possui inputs.'; // Mensagem padrão para o usuário caso o template não possua inputs
				var JSONContent = readFileContent(configFile);            // Lê o conteúdo do arquivo de configuração JSON
				templateData = JSON.parse(JSONContent);                   // Analisa o conteúdo JSON e o armazena no objeto 'templateData'

				// Verifica se todas as configurações padrão estão presentes no arquivo de configuração
				// Itera sobre as propriedades do objeto de configurações padrão (defPadObj)
				for (var o in defPadObj) {
					// Se a propriedade já existe no templateData
					if (templateData.hasOwnProperty(o)) continue; // Pula para a próxima

					// Se a propriedade não existe
					templateData[o] = defPadObj[o];               // usa o valor padrão
				}

				// Verifica se o template possui camadas de entrada (inputs)
				hasInput = templateData.inputLayers != null;

				// Se houver camadas de entrada, atualiza as mensagens de exemplo e dica
				if (hasInput) {
					exemple = templateData.exemple;
					tipContent = templateData.tip;
				}
			}

			// Atualiza o texto na caixa de entrada de texto e nas dicas com base no resultado da análise da configuração
			if (!hasData) edtText.text = exemple;
			tipContentTxt.text = tipContent;

		} catch (err) { // Em caso de erro durante o carregamento ou análise da configuração, exibe um alerta e sai da função
			alert(lol + '#PAD_017 - esse template não tem um arquivo de configuração válido!');
			return;
		}

		// Atualiza o estado dos elementos da interface com base na presença de campos de entrada (inputs) e dados
		// Habilita o botão 'Criar' se um template for selecionado, houver dados de entrada e o template tiver inputs
		makeBtn.enabled = (templateTree.selection != null && hasData && hasInput);
		inputLabTxt.enabled = hasInput;  // Habilita ou desabilita o rótulo 'input:'
		edtText.enabled = hasInput;      // Habilita ou desabilita a caixa de texto de entrada
		renderCkb.enabled = hasInput;    // Habilita ou desabilita a caixa de seleção 'adicionar à fila de render'
		renderLabTxt.enabled = hasInput; // Habilita ou desabilita o rótulo da caixa de seleção de renderização
	};

	//---------------------------------------------------------

	// Função executada quando um template na árvore é ativado (clicado)
	templateTree.onActivate = function () {
		// Verifica se o texto de entrada (edtText) não está vazio e se é diferente do exemplo padrão
		hasData = (edtText.text.trim() != '' && edtText.text != exemple);

		// Se não houver dados, define o texto de entrada como o exemplo
		if (!hasData) edtText.text = exemple;

		// Habilita o botão 'Criar' se um template for selecionado, houver dados de entrada e o template tiver inputs
		makeBtn.enabled = (templateTree.selection != null && hasData && hasInput);

		// Habilita/desabilita os elementos da interface de acordo com a presença de inputs no template
		inputLabTxt.enabled = hasInput;     // Rótulo 'input:'
		edtText.enabled = hasInput;         // Caixa de texto de entrada
		renderCkb.enabled = hasInput;       // Caixa de seleção 'adicionar à fila de render'
		renderLabTxt.enabled = hasInput;    // Rótulo da caixa de seleção de renderização
	};

	//---------------------------------------------------------

	// Função executada enquanto o usuário está digitando na caixa de texto (edtText)
	edtText.onChanging = function () {
		// A variável 'hasData' se torna 'true' se o texto não estiver vazio e for diferente do exemplo padrão
		hasData = (edtText.text.trim() != '' && edtText.text.trim() != exemple);

		// Habilita o botão 'Criar' se um template for selecionado, houver dados de entrada e o template tiver inputs
		makeBtn.enabled = (templateTree.selection != null && hasData && hasInput);
	};

	//---------------------------------------------------------

	// Função executada quando o botão é clicado
	makeBtn.onClick = function () {

		// Inicialização de variáveis
		var logCount = 0;                     // Contador de templates processados
		var createdTemplatesArray = [];       // Array para armazenar os templates criados
		var createdOutputModuleArray = [];    // Array para armazenar os módulos de saída do render (configurações de exportação)

		// Preparação da Interface
		wPadeiroTemplates.size.height = 10;    // Minimiza a altura da janela principal (simula o fechamento)
		wPadeiroTemplates.text = 'processando os templates...'; // Altera o texto da janela
		mainGrp.visible = false;               // Oculta o grupo principal

		// Verificações Iniciais
		if (edtText.text.trim() == '') return;   // Sai da função se não houver texto de entrada
		if (!templateFile.exists) return;        // Sai da função se o arquivo do template não existir
		if (!configFile.exists) return;          // Sai da função se o arquivo de configuração não existir

		// Bloco try...catch para lidar com possíveis erros durante a importação e configuração do template
		try {
			var IO = new ImportOptions(templateFile); // Opções de importação

			app.project.importFile(IO); // Importa o arquivo do template selecionado para o projeto

			// Ajusta a caixa do texto de entrada (edtText) conforme a configuração no arquivo JSON (templateData)
			if (templateData.textCase == 'upperCase') edtText.text = edtText.text.toUpperCase(); // Converte para MAIÚSCULAS
			if (templateData.textCase == 'lowerCase') edtText.text = edtText.text.toLowerCase(); // Converte para minúsculas
			if (templateData.textCase == 'titleCase') edtText.text = edtText.text.toTitleCase(); // Converte para 'Title Case'

			// Divide o texto de entrada em uma lista de strings
			// usando como separador duas ou mais quebras de linha (\n ou \r)
			var inputList = edtText.text.split(/[\n\r]{2,}/);

			// Define configurações do projeto
			app.project.bitsPerChannel = 8;                  // Define a profundidade de bits por canal para 8 bits (padrão para a maioria dos projetos)
			app.project.expressionEngine = 'javascript-1.0'; // Define o mecanismo de expressão como JavaScript 1.0
			app.project.linearBlending = true;               // Habilita a mistura de cores linear (blending)
			app.project.timeDisplayType = TimeDisplayType.TIMECODE; // Define a exibição de tempo como TimeCode (00:00:00:00)

			// Em caso de erro
		} catch (err) {
			alert(lol + '#PAD_018 - ' + err.message); // Exibe uma mensagem de erro
			return;
		}

		var iNum = app.project.numItems;      // Obtém o número total de itens no projeto
		var folderNotAvailable = false;       // Variável de controle para verificar se a pasta de saída está disponível

		// Loop principal para processar todas as comps no projeto
		for (var i = 1; i <= iNum; i++) {
			var comp = app.project.item(i); // Obtém a composição atual pelo índice (i)

			// Verifica se o item é uma composição, se é um template e se o nome da composição
			// corresponde ao nome definido no arquivo de configuração (templateData.compName)
			if (!(comp instanceof CompItem)) continue; // Pula para a próxima iteração se o item não for uma composição (CompItem)
			if (!comp.comment.match(/^TEMPLATE/)) continue; // Pula se a composição não tiver um comentário que comece com 'TEMPLATE'
			if (comp.name != templateData.compName) continue; // Pula se o nome da composição não for o nome esperado do template

			// Loop para cada linha de texto de entrada (cada item no array inputList)
			for (var n = 0; n < inputList.length; n++) {
				// Define um prefixo , se houver um prefixo definido em templateData
				var prefix = templateData.prefix != '' ? templateData.prefix + ' - ' : '';
				// Gera o nome do template combinando o prefixo (se existir) e o texto da linha atual, removendo caracteres especiais
				var templateName = prefix + inputList[n].replaceSpecialCharacters();
				var t = templateData.refTime; // Obtém o tempo de referência do template (em segundos)

				// Obtém a lista de opções do efeito de entrada (inputFx), se definido; caso contrário, usa um array vazio
				var optionsList = templateData.inputFx != null ? templateData.inputFx.options : [''];

				// Loop para cada opção de efeito de entrada
				for (var f = 0; f < optionsList.length; f++) {
					var template = comp; // A composição original é o template

					// Se houver o prefixo 'ignore' a composição do template não será alterada
					// apenas adicionada ao array de templates criados 
					if (templateData.prefix != 'ignore') {
						template = comp.duplicate(); // Duplica a composição original para criar um novo template
						var inputLayerList = templateData.inputLayers; // Obtém a lista de camadas de entrada (inputLayers) do template

						var txtList = inputList[n].split(/[\n\r]-+[\n\r]/); // Divide o texto da linha atual em um array de strings, usando como separador uma ou mais ocorrências de hífen (-) e quebras de linha (\n ou \r)

						// Se houver um separador personalizado definido, usa-o para dividir o texto
						if (templateData.separator != '') {
							txtList = inputList[n].split(templateData.separator);
						}

						// Se houver um efeito de entrada (inputFx) definido
						if (templateData.inputFx != null) {
							var ctrlLayer = template.layer(templateData.inputFx.layerIndex); // Obtém a camada que controla o efeito de entrada

							// Aplica a opção do efeito de entrada à camada de controle
							ctrlLayer.property('ADBE Effect Parade')        // Acessa o grupo de efeitos da camada
								.property(templateData.inputFx.fxName)      // Acessa o efeito específico
								.property(templateData.inputFx.optionIndex) // Acessa a propriedade que controla as opções do efeito
								.setValue(f + 1);                           // Define o valor da opção do efeito (f + 1 para começar em 1 em vez de 0)
						}

						// Loop para cada camada de entrada (inputLayerList)
						for (var l = 0; l < inputLayerList.length; l++) {
							var inputLayer = template.layer(inputLayerList[l].layerIndex); // Obtém a camada de entrada pelo índice

							// Verifica se há texto suficiente para preencher todas as camadas de entrada
							if (l >= txtList.length) {
								inputLayer.enabled = false; // Desabilita a camada se não houver texto suficiente
								continue;                   // Pula para a próxima iteração do loop
							}

							// Pula para a próxima iteração se o texto estiver vazio
							if (txtList[l] == '') continue;

							// Se o método de entrada for 'getTextLayerContent' (conteúdo de texto)
							if (inputLayerList[l].method == 'getTextLayerContent') {
								if (!(inputLayer instanceof TextLayer)) continue; // Pula se a camada não for uma camada de texto

								txtList[l] = txtList[l].trim(); // Remove espaços em branco do texto
								var getTextLayerContent = txtList[l];   // Obtém o conteúdo do texto
								var text = inputLayer.property('ADBE Text Properties');  // Obtém a propriedade de texto da camada
								var textDoc = text.property('ADBE Text Document').value; // Obtém o documento de texto da camada

								textDoc.text = getTextLayerContent;                                   // Define o novo conteúdo do texto
								text.property('ADBE Text Document').setValue(textDoc);        // Aplica o novo conteúdo
								txtList[l] = txtList[l].replaceSpecialCharacters();           // Remove caracteres especiais do texto
							}

							// Se o método de entrada for 'layerName' (nome da camada)
							if (inputLayerList[l].method == 'layerName') {
								var layerName = txtList[l].trim(); // Remove espaços em branco do nome da camada
								inputLayer.name = layerName;       // Define o novo nome da camada
							}
						}
						// Ajusta o nome do template se não houver prefixo
						if (templateData.prefix == '') {
							// Junta os elementos do array txtList, separando-os por ' - ' e remove as quebras de linha
							templateName = txtList.join(' - ').replace(/[\n\r]/g, ' ');
						}

						// Define o nome final do template
						// Concatena o nome do template (em maiúsculas), a opção de efeito (se houver) e remove espaços extras
						template.name = [templateName.toUpperCase(), optionsList[f]].join(' ').trim();
					}
					createdTemplatesArray.push(template); // Adiciona o template criado ao array de templates criados

					logCount++; // Incrementa o contador de templates processados

					// Adiciona o template a fila de render (se a caixa de seleção estiver marcada)
					if (renderCkb.value) {
						var item = app.project.renderQueue.items.add(template); // Adiciona o template à fila de render
						var outputModule = item.outputModule(1); // Obtém o módulo de saída do item na fila de render

						// Verifica se o template do módulo de saída já foi definido
						if (padeiroOutputModuleTemplate == undefined) {
							var tArray = outputModule.templates; // Array com os templates disponíveis para o módulo de saída
							var tIndex = tArray.length - 1;      // Índice do último template do array

							// Remove templates ocultos do array
							while (tArray[tIndex].toString().match(/^_HIDDEN\s/)) {
								tArray.pop(); // Remove o último elemento do array
								tIndex--;     // Decrementa o índice para verificar o próximo template
							}

							// Ui para escolha de um template de saída
							padeiroOutputModuleTemplate = renderTemplateDialog(tArray, templateData.alpha);
						}

						// Verifica se um template de saída foi selecionado
						if (padeiroOutputModuleTemplate != '') {

							item.applyTemplate('Best Settings');                     // Aplica as melhores configurações de renderização ao item na fila
							var outputPathArray = templateData.outputPath;

							for (var o = 0; o < outputPathArray.length; o++) {

								if (o > 0) item.outputModules.add();

								outputModule = item.outputModule(o + 1);
								// Cria um objeto Folder para a pasta de saída definida em templateData
								var outputFolder = new Folder(outputPathArray[o]);

								// Verifica se a pasta de saída está disponível
								// evita delays em casos de problema na rede
								if (folderNotAvailable || !outputFolder.exists) {
									outputPathArray[o] = defPadObj.outputPath;// se não estiver, usa a pasta padrão definida em defPadObj
									// Define a variável de controle para indicar que a pasta original não está disponível
									// assim pulamos a verificação em caso de problema na rede
									folderNotAvailable = true;
								}

								try {
									// Cria o arquivo de saída do render (nome do template + '.mov')
									var outputFile = new File(outputPathArray[o] + '/' + template.name + '.mov');

									outputModule.file = outputFile;                          // Define o arquivo de saída no módulo de render
									outputModule.applyTemplate(padeiroOutputModuleTemplate); // Aplica o template de saída selecionado ao módulo de render
									createdOutputModuleArray.push(outputModule);             // Adiciona o módulo de saída ao array

									// Em caso de erro (por exemplo, problema ao acessar a pasta)
								} catch (err) {
									alert(lol + '#PAD_019 - ' + err.message); // Exibe um alerta com a mensagem de erro
								}
							}
							// Se nenhum template de saída for selecionado
						} else {
							item.remove(); // Remove o item da fila de render
						}
					}

					template.openInViewer();       // Abre o template criado no visualizador
					template.time = t;             // move a agulha da timeline para o tempo de referência (t)
					template.comment = 'EXPORTAR'; // Adiciona um comentário 'EXPORTAR' ao template para organização automática
				}
			}
			// Se não houver o prefixo 'ignore'
			if (templateData.prefix != 'ignore') comp.remove(); // Remove a composição original do template
			break; // Sai do loop principal, pois o template desejado foi encontrado e processado

		}
		// Configuração da Pasta de Importação e Limpeza de Pastas do Projeto
		var importFolder = new Folder(templateData.importPath); // Opções de importação
		app.project.setDefaultImportFolder(importFolder);       // Define a pasta de importação padrão

		// Organização das Pastas do Projeto
		deleteProjectFolders();      // Exclui todas pastas do projeto.
		populateProjectFolders();    // Organiza o projeto com os templates criados.
		deleteEmptyProjectFolders(); // Exclui pastas vazias do projeto.

		wPadeiroTemplates.close();   // Fecha a janela da interface do 'O Padeiro'.

		// Registro de Dados (Log)
		// os Logs ainda não são 100% confiáveis devido a
		// variação nas configurações do sistema (formatos de data e hora)
		try {
			// Obtém data e hora atual do sistema usando comandos do sistema operacional (Windows)
			var dateStr = system.callSystem('cmd.exe /c date /t').replace(/[a-z]/gi, '').trim(); // Obtém a data e remove caracteres não numéricos
			var timeStr = system.callSystem('cmd.exe /c time /t').replace(/\sAM/i, '').trim();   // Obtém a hora e remove 'AM' se presente

			// Conversão da hora para formato de 24 horas
			// Se a hora for PM (tarde/noite)
			if (timeStr.match(/PM/i)) {
				var timeArray = timeStr.split(/\s/)[0].split(':'); // Divide a hora em horas, minutos e segundos
				var hStr = parseInt(timeArray[0]) + 12;            // Adiciona 12 horas ao valor das horas
				timeStr = hStr + ':' + timeArray[1];               // Reconstrói a string da hora no formato 24 horas
			}

			// Cria um objeto File para o arquivo de log na pasta de templates
			var logFile = new File(templatesPath + '/log padeiro.csv');
			// Cria um registro de log com as informações:
			// configuração usada, número de templates criados, nome do usuário, data e hora
			var logData = [templateData.configName, logCount, system.userName, dateStr, timeStr].join(',');
			saveLogData(logFile, logData); // Salva o registro de log no arquivo

		} catch (err) { } // Ignora qualquer erro que possa ocorrer durante o registro de log

		// Alertas e Metadados
		// Se a pasta de saída original não estava disponível
		if (folderNotAvailable) {
			// Exibe um alerta informando o usuário
			alert(lol + '#PAD_020 - o caminho pré-definido para\no output do render não pode ser acessado!');
		}

		// Adiciona metadados XMP ao projeto indicando o caminho do template original
		setXMPData('source', decodeURI(templateFile.path).toString());

		// Execução de Script Personalizado (se houver)
		// Verifica se existe um arquivo de script associado ao template
		if (scriptFile.exists) {
			try {
				scriptFile.open('r');    // Abre o arquivo de script para leitura
				eval(scriptFile.read()); // Executa o código JavaScript contido no arquivo

				scriptFile.close();   // Fecha o arquivo de script

			} catch (err) {           // Em caso de erro, exibe um alerta
				alert(lol + '#PAD_021 - ' + err.message);
			}
		}
	};

	//---------------------------------------------------------

	// Função executada ao clicar no botão 'Importar' ou ao dar duplo clique em um template na árvore
	// Atribui a mesma função para o evento onClick do botão e onDoubleClick da árvore de templates
	importBtn.onClick = templateTree.onDoubleClick = function () {

		try { // Tentar importar o template
			var IO = new ImportOptions(templateFile); // Opções de importação

			app.project.importFile(IO); // Importa o template selecionado para o projeto atual

			// Organização das Pastas do Projeto
			deleteProjectFolders();      // Exclui todas pastas do projeto.
			populateProjectFolders();    // Organiza o projeto com os templates criados.
			deleteEmptyProjectFolders(); // Exclui pastas vazias do projeto.

			// Adiciona metadados XMP ao projeto indicando o caminho do template original
			setXMPData('source', decodeURI(templateFile.path).toString());

		} catch (err) { // Captura e trata qualquer erro que ocorra durante a importação
			alert(lol + '#PAD_022 - ' + err.message); // Exibe uma mensagem de alerta com a mensagem de erro
			return; // Sai da função para evitar mais processamento em caso de erro
		}

		wPadeiroTemplates.close(); // Fecha a janela da interface do 'O Padeiro'
	};

	//---------------------------------------------------------

	// Função para atualizar a árvore de templates quando o botão 'Atualizar' (refreshBtn) é clicado
	refreshBtn.onClick = function () {
		// Atualiza a árvore de templates chamando a função 'buildTree'
		buildTree(templatesFolder, templateTree, fileFilter);

		// Expande todos os nós da árvore após a atualização
		templateTree.expanded = true;      // Expande o nível principal da árvore
		var branches = templateTree.items; // Obtém todos os itens da árvore

		// Loop para percorrer cada item da árvore
		for (var i = 0; i < branches.length; i++) {
			// Se o item for um nó (pasta)
			if (branches[i].type == 'node') {
				branches[i].expanded = true;   // Expande a pasta.
			}
		}
	};

	//---------------------------------------------------------

	// Função para abrir a pasta de templates quando o botão 'Abrir Pasta' é clicado
	openFldBtn.onClick = function () {
		if (!templatesFolder.exists) {           // Verifica se a pasta de templates ainda não existe
			templatesFolder.create();            // Se não existir, cria a pasta de templates
		}
		openFolder(templatesPath);               // Abre a pasta de templates no sistema operacional do usuário
	};

	// Função para abrir a página de documentação quando o botão 'Informações' é clicado
	infoBtn.onClick = function () {
		// Abre a página de documentação do script 'O Padeiro' no GitHub em um navegador web
		openWebSite('https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-o-padeiro-script');
	};

	// Exibir a janela da interface do usuário
	wPadeiroTemplates.show();  // Mostra a janela principal da interface do usuário 'O Padeiro'
}