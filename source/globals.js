/*

---------------------------------------------------------------
# main variables
---------------------------------------------------------------

*/

// Determina o sistema operacional atual: 'Win' para Windows, 'Mac' para macOS.
var appOs = $.os.indexOf('Win') >= 0 ? 'Win' : 'Mac';

// Versão do After Effects
var appV = parseInt(app.buildName.substring(0, 2));
var appFullV = app.buildName.split(/x/i)[0];

// Preferências de acesso à rede para scripts no After Effects
var prefSection = 'Main Pref Section';                   // Seção de preferências
var prefName = 'Pref_SCRIPTING_FILE_NETWORK_SECURITY';   // Nome da preferência
var netConfigName = '"Allow Scripts to Write Files and Access Network"'; // Descrição da configuração

// --------------------- Rede GLOBO ---------------------

// Endereços de rede da GLOBO
var servidorSP = '//10.193.48.13/promo_ber/BACKUP';
var servidorRJ = '//10.228.183.165/VFX/imagem/drive_l';

// var mamAdd = '//10.181.53.152';
// var nAdd = '//10.197.18.172/arte';

// Caminhos de rede para projetos, saída e footage
var projRJ = servidorRJ + '/Fileserver_3';
var projSP = servidorSP + '/artes';
var outRJ = '//10.228.183.174/edit_in_place/PROMO/cdesign_output/C# ABERTA & INTER/ARTE RJ';
var outSP = servidorSP + '/artes/ARTES PARA EDICAO';
var inFtg = '//10.228.183.137/EDIT_IN_PLACE/PROMO/edit_output';

// Caminho da pasta de templates "O Padeiro"
var templatesPath;
var templatesFolder
// var templatesArchPath = projRJ + '/INSTITUCIONAL/_adm-designers/TEMPLATES/TEMPLATES PADEIRO';
// var templatesLocalPath = 'O:/REDE - PROMO/templates/TEMPLATES PADEIRO';


// --------------------- Preferências do Script ---------------------

// Caminhos para as preferências do script, pastas temporárias e fontes
var AEPreferencesPath = Folder.userData.toString() + '/Adobe/After Effects/' + appFullV;
var scriptPreferencesPath = Folder.userData.toString() + '/PROMO script';
var tempPath = scriptPreferencesPath + '/temp';
var tempFolder;
// var fontsLocalPath = scriptPreferencesPath + '/fonts';


// --------------------- Bibliotecas ---------------------

// Inclusão de bibliotecas externas
#include 'libraries/JSON lib.js';
#include 'libraries/FUNC lib.js';
#include 'libraries/PROT lib.js';
#include 'libraries/EXPS lib.js';
#include 'libraries/ICON lib.js';


// --------------------- Repositório GitHub ---------------------

// URLs do repositório do GitHub
var repoURL = 'https://github.com/jmbillard/PROMO';
var codeURL = 'https://raw.githubusercontent.com/jmbillard/PROMO/main/';
var docsURL = repoURL + '/blob/main/docs';
var readme = '';

// Array de URLs para download de código
var codeURLArray = [
	codeURL + 'release/PROMO.jsxbin'
];


// --------------------- Strings e Mensagens ---------------------

// Emojis e mensagens (opcional)
var lol = 'Σ(っ °Д °;)っ        ';
var relax = 'ヽ(✿ﾟ▽ﾟ)ノ        ';

// --------------------- Arrays de Dados ---------------------

// Arrays para meses, dias da semana e cores
var shortMonthArray = [
	'JAN',
	'FEV',
	'MAR',
	'ABR',
	'MAI',
	'JUN',
	'JUL',
	'AGO',
	'SET',
	'OUT',
	'NOV',
	'DEZ'
];

var fullMonthArray = [
	'JANEIRO',
	'FEVEREIRO',
	'MARÇO',
	'ABRIL',
	'MAIO',
	'JUNHO',
	'JULHO',
	'AGOSTO',
	'SETEMBRO',
	'OUTUBRO',
	'NOVEMBRO',
	'DEZEMBRO'
];

var shortWeekArray = [
	'DOM',
	'SEG',
	'TER',
	'QUA',
	'QUI',
	'SEX',
	'SÁB',
	'HJE',
	'AMN'
];

var fullWeekArray = [
	'DOMINGO',
	'SEGUNDA',
	'TERÇA',
	'QUARTA',
	'QUINTA',
	'SEXTA',
	'SÁBADO',
	'HOJE',
	'AMANHÃ'
];

var separator = ' - ';

var renameRefArray = [
	RODAPE = {
		prefix : 'RDP',
		comment: 'RODAPE',
		regExpStr: ['RODAP[EÉ](S)*', 'RDP(S)*']
	},
	CARTAO = {
		prefix : 'CRT',
		comment: 'CARTAO',
		regExpStr: ['CART[ÃA]O','CART[ÕO]ES', 'CRT(S)*']
	},
	LETTERING = {
		prefix : 'LETT',
		comment: 'LETTERING',
		regExpStr: ['LETTERING(S)*', 'LETT(S)*']
	},
	CONFRONTO = {
		prefix : 'CONFRONTO',
		comment: 'CONFRONTO',
		regExpStr: ['CONFRONTO(S)*']
	},
	TARJA = {
		prefix : 'TARJA',
		comment: 'TARJA',
		regExpStr: ['TARJA(S)*', 'TRJ(S)*']
	},
	PASSAGEM = {
		prefix : 'PASSAGEM',
		comment: 'PASSAGEM',
		regExpStr: ['PASSAGEM(S)*', 'TRANSI[CÇ][ÃA]O', 'TRANSI[CÇ][ÕO]ES', 'LAPADA(S)*']
	},
	ASSINATURA = {
		prefix : 'ASSINA',
		comment: 'ASSINATURA',
		regExpStr: ['ASSINATURA(S)*', 'ASSINA(S)*', 'ASS']
	},
	REFERENCIA = {
		prefix : 'REF',
		comment: 'REFERENCIA',
		regExpStr: ['REFERENCIA(S)*', 'PREVIEW(S)*', '(REF|PREV)(S)*']
	}
]

// Padrões de abreviações e palavras para renomeação
// var wordsPrefixValArray = [
// 	['DPS', 'DEPOIS'],
// 	['AMN', 'AMANHA'],
// 	['HJ', 'HOJE']
// ];

var monoColors = [
	'#848695',
	'#A7ACBA',
	'#E0E1E7',
	'#F6F3FB',
	'#FFFFFF'
];

var mainColors = [
	'#FF3C3F',
	'#FFAD12',
	'#FFE53D',
	'#0EC978',
	'#FF2099',
	'#8C32FF',
	'#003DFF',
	'#0CBFFF'
];

// Arrays para armazenar cores da ui e nomes de grupos
var grpNames = [];
var tabColors = [];
var labelColors = [];

// Objeto para armazenar as preferências carregadas do arquivo JSON
var JSONPrefsObj = {};

// Define os valores padrão das preferências do usuário.
var defPrefsObj = {
	color: {
		menu: {
			light: '#3E50B4',
			dark:  '#8FF7A7'
		},
		controls: {
			light: '#BF3A48',
			dark:  '#DA6877'
		},
		animation: {
			light: '#CB6259',
			dark:  '#B7B5E4 '
		},
		tools: {
			light: '#6EA57D',
			dark:  '#E2EE96'
		},
		effects: {
			light: '#D68A69',
			dark:  '#ACCDEC'
		},
		text: {
			light: '#C2B6A3',
			dark:  '#F4E76E'
		},
		brand: {
			light: '#3F3F58',
			dark:  '#BBBBBD'
		},
		project: {
			light: '#00B5C2',
			dark:  '#7CC6FE'
		},
		shortcuts: {
			light: '#CD4548',
			dark:  '#FFB398'
		},
		app: {
			light: '#6639B6',
			dark:  '#FFAFB7'
		},
		dev: {
			light: '#202020',
			dark:  '#F4FAFF'
		},
	},
	labels: [
		'#F44336',
		'#E81D62',
		'#9B26AF',
		'#6639B6',
		'#3E50B4',
		'#02A8F3',
		'#00BBD3',
		'#009587',
		'#8AC249',
		'#CCDB38',
		'#FEEA3A',
		'#FE9700',
		'#FF5722',
		'#785447',
		'#9D9D9D',
		'#5F7C8A'
	],
	folders: {             // Caminho padrão para a pasta do projeto
		projPath: '~/Desktop',
	},
	selection: {           // Preferências de seleção (tipos de camadas null e adjustment, modo de projeto)
		nullType: 0,       // Tipo de camada null padrão (0: shape layer, 1: null layer)
		adjType: 0,        // Tipo de camada de ajuste padrão (0: shape layer, 1: adjustment layer)
		projectMode: 0     // Modo de projeto padrão (0: legado, 1: customizado)
	},
	ignoreMissing: false,  // Ignorar arquivos ausentes (padrão: não)
	devMode: false,        // Modo de desenvolvedor (padrão: não)
	homeOffice: false,     // Modo home office (padrão: não)
	showLabels: true,      // Mostrar rótulos nas camadas (padrão: sim)
	saveAsV22: true,       // Salvar projetos em formato After Effects 2022 (padrão: sim)
	iconTheme: 'dark'      // Tema de ícones (padrão: escuro)
};

//https://coolors.co/8c252f-bf3a48-cb6259-d68a69-c2b6a3-db9437-6ea57d-00b5c2-5f3691-6e489b

// Carrega as preferências do usuário a partir do arquivo 'preferences.json' ou usa os valores padrão.
function loadDefaultPrefs() {
	// Tenta carregar o arquivo de preferências
	var JSONPrefsFile = new File(scriptPreferencesPath + '/preferences.json');

	// Se o arquivo existir, tenta ler seu conteúdo
	if (JSONPrefsFile.exists) {
		var JSONContent = readFileContent(JSONPrefsFile); // Lê o conteúdo do arquivo JSON

		try {
			JSONPrefsObj = JSON.parse(JSONContent); // Converte o conteúdo JSON para um objeto JavaScript

		} catch (err) {
			// Exibe um alerta se houver erro ao carregar o JSON
			alert('Falha ao carregar as preferências... ' + lol + '\n' + err.message);
		}
	}

	// Preenche as preferências com os valores padrão, caso não existam
	for (var o in defPrefsObj) {
		if (!JSONPrefsObj.hasOwnProperty(o)) {
			JSONPrefsObj[o] = defPrefsObj[o];
		}
	}
	iconTheme = JSONPrefsObj.iconTheme; // Define o tema de ícones

	// Cria arrays de nomes de grupos e cores das abas
	for (var t in defPrefsObj.color) {
		if (!JSONPrefsObj.color.hasOwnProperty(t)) {
			JSONPrefsObj.color[t] = defPrefsObj.color[t];
		}
		for (var th in defPrefsObj.color[t]) {
			if (!JSONPrefsObj.color[t].hasOwnProperty(th)) {
				JSONPrefsObj.color[t] = defPrefsObj.color[t];
				break;
			}
		}
		grpNames.push(t.toString());
		tabColors.push(JSONPrefsObj.color[t][iconTheme]);
	}

	// Carrega as cores dos rótulos, usando as cores padrão se houver erro
	for (var l = 0; l < defPrefsObj.labels.length; l++) {
		try {
			labelColors.push(hexToRgb(JSONPrefsObj.labels[l]));
		} catch (err) {
			labelColors.push(hexToRgb(defPrefsObj.labels[l]));
		}
	}

	// Define as preferências de seleção (nullType, adjType, projectMode)
	for (var s in defPrefsObj.selection) {
		if (!JSONPrefsObj.selection.hasOwnProperty(s)) {
			JSONPrefsObj.selection[s] = defPrefsObj.selection[s];
		}
	}

	// Define variáveis globais com base nas preferências carregadas
	projectMode = JSONPrefsObj.selection.projectMode;
	projPath = JSONPrefsObj.folders.projPath;
	nullType = JSONPrefsObj.selection.nullType;
	adjType = JSONPrefsObj.selection.adjType;

	ignoreMissing = JSONPrefsObj.ignoreMissing;        // Ignora footage ausente
	homeOffice = JSONPrefsObj.homeOffice;              // Modo home office
	saveAsV22 = JSONPrefsObj.saveAsV22;                // Salvar como After Effects 2022
	devMode = JSONPrefsObj.devMode;                    // Modo de desenvolvedor
	showLabels = JSONPrefsObj.showLabels;              // Mostrar rótulos na interface
}

// Chama a função para carregar as preferências ao iniciar o script
loadDefaultPrefs();

// Carrega preferências estáticas (prefixos, cores, etc.).
function loadStaticPrefs() {
	// Prefixos para itens de projeto
	compPrefix = 'comp_';   // Prefixo para composições
	solPrefix = 'sol_';     // Prefixo para sólidos

	// Prefixos para camadas
	nullPrefix = 'null_';   // Prefixo para camadas null
	adjPrefix = 'adj_';     // Prefixo para camadas de ajuste
	txtPrefix = 'txt_';     // Prefixo para camadas de texto
	shpPrefix = 'shp_';     // Prefixo para camadas de forma
	camPrefix = 'cam_';     // Prefixo para camadas de câmera
	lgtPrefix = 'lgt_';     // Prefixo para camadas de luz
	ctrlPrefix = 'ctrl_';   // Prefixo para camadas de controle
	mattePrefix = 'matte_'; // Prefixo para camadas de matte

	// Cor para grupos de erro
	errGrpColor = '#141414';

	// Cores estáticas de texto (UI)
	sTxtColor = {
		light: '#EAEAEA',  // Cor clara para temas claros
		dark: '#2D2D2D',   // Cor escura para temas escuros
	};

	// Cor de texto para erros
	errTxtColor = '#8C3333';
}

// Carrega as preferências estáticas ao iniciar o script
loadStaticPrefs();

// about and 'work in progress' messages...
var aboutStr = 'PROMO script ' + vStr + ' | Jean-Marc Billard';
var wip = 'work in progress... ' + lol;

// [ ] same as the influence preview...
// keyframe images...
var keyImgs = [
	keyStat0Icon[iconTheme],
	keyStat1Icon[iconTheme],
	keyStat2Icon[iconTheme],
	keyStat3Icon[iconTheme],
	keyStat4Icon[iconTheme],
	keyStat5Icon[iconTheme],
	keyStat6Icon[iconTheme],
	keyStat7Icon[iconTheme],
	keyStat8Icon[iconTheme],
	keyStat9Icon[iconTheme]
];
// keyframe influence data...
var keyData = {
	value: false,
	spatial: false,
	inEase: {},
	inType: {},
	outEase: {},
	outType: {},
};
var easeInInfluence = 0.2;
var easeOutInfluence = 0.2;

// Atualiza os caminhos das pastas de templates e temporária com base no modo de trabalho (homeOffice).
function updateFolderPaths() {
	// Define o caminho para a pasta de templates, dependendo se está em home office ou não
	// templatesPath = homeOffice ? templatesLocalPath : templatesArchPath;
	// Cria objetos Folder para as pastas de templates e temporária
	// templatesFolder = new Folder(templatesPath);

	tempFolder = new Folder(tempPath);
	if (!tempFolder.exists) tempFolder.create();
}

// Chama a função para atualizar os caminhos das pastas
updateFolderPaths();

// Define tags de organização para composições e footage com ícones correspondentes.
var tagsObj = {
	// Tags para composições (apenas comentários)
	promoTags: [
		['EXPORTAR', ftgTogIcon],
		['LOGO GLOBO', shpTogIcon],
		['TARJA', txtTogIcon],
		['LETTERING', txtTogIcon],
		['CARTAO', txtTogIcon],
		['RODAPE', txtTogIcon],
		['VINHETA', compTogIcon],
		['ASSINATURA', compTogIcon],
		['PASSAGEM', compTogIcon],
		['SERVICO', compTogIcon]
	],
	// Tags para footage (comentários) ou nomes de templates para composições
	multiTags: [
		['BG', imgTogIcon],
		['REF', imgTogIcon],
		['FOTO', imgTogIcon],
		['LOGO', shpTogIcon],
		['ICONE', shpTogIcon],
		['TEXTURA', matteTogIcon],
		['MUSICA', sonoTogIcon],
		['LOC', sonoTogIcon]
	]
};

// minimum width value for UI controls...
var vMin = 36;

var iconSize = [0, 0, 36, 36];
var iconTogSize = [0, 0, 24, 24];

// Define um objeto com as cores e nomes dos rótulos do After Effects (codificados).
var labelsObj = {
	l1: {
		color: "ÿñ=;", // FF F44336 (Vermelho)
		name: "red"
	},
	l2: {
		color: "ÿç\u0013c", // FF E81D62 (Rosa)
		name: "pink"
	},
	l3: {
		color: "ÿš(®", // FF 9B26AF (Roxo)
		name: "purple"
	},
	l4: {
		color: "ÿd<³", // FF 6639B6 (Roxo Escuro)
		name: "deep purple"
	},
	l5: {
		color: "ÿ?Q³", // FF 3E50B4 (Indigo)
		name: "indigo"
	},
	l6: {
		color: "ÿ)–ï", // FF 02A8F3 (Azul)
		name: "blue"
	},
	l7: {
		color: "ÿ\u001b©ñ", // FF 00BBD3 (Azul Claro)
		name: "light blue"
	},
	l8: {
		color: "ÿ\u001e¼Ó", // FF 009587 (Ciano)
		name: "cyan"
	},
	l9: {
		color: "ÿ\u0016–ˆ", // FF 8AC249 (Verde Azulado)
		name: "teal"
	},
	l10: {
		color: "ÿO¯T", // FF CCDB38 (Verde)
		name: "green"
	},
	l11: {
		color: "ÿŒÃQ", // FF FEEA3A (Verde Claro)
		name: "light green"
	},
	l12: {
		color: "ÿÌÚG", // FF FE9700 (Lima)
		name: "lime"
	},
	l13: {
		color: "ÿýéL", // FF FF5722 (Amarelo)
		name: "yellow"
	},
	l14: {
		color: "ÿû¿+", // FF 785447 (Âmbar)
		name: "amber"
	},
	l15: {
		color: "ÿý–#", // FF 9D9D9D (Laranja)
		name: "orange"
	},
	l16: {
		color: "ÿûS-", // FF 5F7C8A (Laranja Escuro)
		name: "deep orange"
	}
};
