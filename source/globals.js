/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
# main variables
---------------------------------------------------------------

*/

// current OS... 'Win' or 'Mac'...
var appOs = $.os.indexOf('Win') >= 0 ? 'Win' : 'Mac';

// app version
var appV = parseInt(app.buildName.substring(0, 2));

// app script network access preferences...
var prefSection = 'Main Pref Section';
var prefName = 'Pref_SCRIPTING_FILE_NETWORK_SECURITY';
var netConfigName = '"Allow Scripts to Write Files and Access Network"';


// GLOBO network
// GLOBO addresses
var servidorSP = '//10.193.48.13/promo_ber/BACKUP';
var servidorRJ = '//10.228.183.165/VFX/imagem/drive_l';

var mamAdd = '//10.181.53.152';
var nAdd = '//10.197.18.172/arte';

// network paths...
var projRJ = servidorRJ + '/Fileserver_3';
var projSP = servidorSP + '/artes';
var outRJ = '//10.228.183.174/edit_in_place/PROMO/cdesign_output/C# ABERTA & INTER/ARTE RJ';
var outSP = servidorSP + '/artes/ARTES PARA EDICAO';
var inFtg = '//10.228.183.137/EDIT_IN_PLACE/PROMO/edit_output';


var hnPath = mamAdd + '/arte_ilhasjorn/UPLOAD_MAM/Hardnews_MAM'; // MAM hard news
var utiPath = nAdd + '/UTILIDADES'; // art utilities and assets...
var promoInsPath = utiPath + '/FERRAMENTAS/SCRIPTS/SCRIPTS AFX/BARRA UTILIDADES PROMO PARA INSTALAR'; // promo toolbar install path...
var arcPath = nAdd + '/arquivamento/GLOBONEWS/On Air 2022'; // archive path...
var promoArcPath = arcPath + '/Promo'; // promo archive path...
var templatesArchPath = promoArcPath + '/templates';
var fontsArchPath = promoArcPath + '/fonts';


// preferences folder path...
var scriptPreferencesPath = Folder.userData.toString() + '/PROMO script'; // → ~/AppData/Roaming/PROMO script
var tempPath = scriptPreferencesPath + '/temp'; // → '~/AppData/Roaming/PROMO script/temp'
var templatesLocalPath = scriptPreferencesPath + '/templates'; // → '~/AppData/Roaming/PROMO script/templates'
var fontsLocalPath = scriptPreferencesPath + '/fonts';


/* jshint ignore:start */
// libraries...
#include 'libraries/JSON lib.js'; // JSON definition file...
#include 'libraries/FUNC lib.js'; // general functions definition file...
#include 'libraries/PROT lib.js'; // prototype functions definition file...
#include 'libraries/EXPS lib.js'; // expressions library...
#include 'libraries/ICON lib.js'; // images encoded as binary...
/* jshint ignore:end */

// github main repo...
var repoURL = 'https://github.com/jmbillard/PROMO';
var codeURL = 'https://raw.githubusercontent.com/jmbillard/PROMO/main/';
var docsURL = repoURL + '/blob/main/docs';
var readme = '';

var codeURLArray = [
	codeURL + 'release/PROMO.jsxbin'//, // → .jsxbin binary encoded release...
];

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

var monoColors = [
	rgb(132, 134, 149), // '#848695' darker gray...
	rgb(167, 172, 186), // '#A7ACBA' dark gray...
	rgb(224, 225, 231), // '#E0E1E7' light gray...
	rgb(246, 243, 251), // '#F6F3FB' lighter gray...
	rgb(255, 255, 255), // '#FFFFFF' white...
];
var mainColors = [
	rgb(255, 60, 63),   // '#FF3C3F'
	rgb(255, 173, 18),  // '#FFAD12'
	rgb(255, 229, 61),  // '#FFE53D'
	rgb(14, 201, 120),  // '#0EC978'
	rgb(255, 32, 153),  // '#FF2099'
	rgb(140, 50, 255),  // '#8C32FF'
	rgb(0, 61, 255),    // '#003DFF'
	rgb(12, 191, 255)   // '#0CBFFF'
];

// preferences management...
// default values...
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
	folders: {
		artePath:     '//10.181.53.152/arte_ilhasjorn/PARA ARTE/PROMO GNEWS/MXF ARTE',
		magazinePath: '//10.181.53.152/arte_ilhasjorn/UPLOAD_MAM/Magazine',
		projPath:     '~/Desktop',
	},
	selection: {
		nullType:    0,
		adjType:     0,
		projectMode: 0
	},
	// userPrefix: system.userName.substring(0, 3).toUpperCase(),
	ignoreMissing: false,
	devMode:       false,
	homeOffice:    false,
	showLabels:    true,
	saveAsV22:     true,
	iconTheme:    'dark'
};

//https://coolors.co/8c252f-bf3a48-cb6259-d68a69-c2b6a3-db9437-6ea57d-00b5c2-5f3691-6e489b
function loadDefaultPrefs() {

	// ui colors, labels and group names...
	tabColors = [];
	labelColors = [];
	grpNames = [];

	JSONPrefsObj = {};
	// loads all configurable preferences...
	var JSONPrefsFile = new File(scriptPreferencesPath + '/preferences.json');

	// loads the current saved preferences...
	if (JSONPrefsFile.exists) {
		var JSONContent = readFileContent(JSONPrefsFile); // → JSON string

		try {
			// evaluate JSON content...
			JSONPrefsObj = JSON.parse(JSONContent); // → preferencesObject
		} catch (err) {
			// error: invalid JSON content...
			alert('preferences failed to load... Σ(っ °Д °;)っ\n' + err.message);
		}
	}
	// main properties...
	for (var o in defPrefsObj) {
		// check saved preferences...
		if (JSONPrefsObj.hasOwnProperty(o)) continue; // main property exists...
		JSONPrefsObj[o] = defPrefsObj[o]; // use default main property value...
	}
	iconTheme = JSONPrefsObj.iconTheme;

	// tab names and colors...
	for (var t in defPrefsObj.color) {
		// check color preferences...
		if (!JSONPrefsObj.color.hasOwnProperty(t)) { // color is missing...
			JSONPrefsObj.color[t] = defPrefsObj.color[t]; // use default color...
		}
		for (var th in defPrefsObj.color[t]) {

			if (!JSONPrefsObj.color[t].hasOwnProperty(th)) {
				JSONPrefsObj.color[t] = defPrefsObj.color[t]; // use default color...
				break;
			}  
		}
		// populate names array and colors...
		grpNames.push(t.toString());
		tabColors.push(hexToRGB(JSONPrefsObj.color[t][iconTheme]));
	}
	// labels...
	for (var l = 0; l < defPrefsObj.labels.length; l++) {

		try {
			// populate labels array...
			labelColors.push(hexToRGB(JSONPrefsObj.labels[l]));

		} catch (err) {
			// error: missing labels or invalid data...
			labelColors.push(hexToRGB(defPrefsObj.labels[l]));
		}
	}
	for (var s in defPrefsObj.selection) {
		// check selection preferences...
		if (JSONPrefsObj.selection.hasOwnProperty(s)) continue; // dropdown selection exists...
		JSONPrefsObj.selection[s] = defPrefsObj.selection[s]; // use default selection...
	}
	projectMode = JSONPrefsObj.selection.projectMode; // global project model selection...

	// folder paths...
	artePath = JSONPrefsObj.folders.artePath; // global arte path...
	magazinePath = JSONPrefsObj.folders.magazinePath; // global magazine path...
	projPath = JSONPrefsObj.folders.projPath; // global magazine path...

	// selections...
	nullType = JSONPrefsObj.selection.nullType; // global layer type selection...
	adjType = JSONPrefsObj.selection.adjType; // global layer type selection...

	// userPrefix = JSONPrefsObj.userPrefix; //

	ignoreMissing = JSONPrefsObj.ignoreMissing; // ignore missing footage during project organization...

	homeOffice = JSONPrefsObj.homeOffice; // home office mode...
	saveAsV22 = JSONPrefsObj.saveAsV22; // show dev tools

	devMode = JSONPrefsObj.devMode; // show dev tools
	showLabels = JSONPrefsObj.showLabels; // show ui labels on large windows...
}
loadDefaultPrefs();

function loadStaticPrefs() {
	// item prefixes...
	compPrefix = 'comp_';
	solPrefix =  'sol_';

	// layer prefixes...
	nullPrefix =  'null_';
	adjPrefix =   'adj_';
	txtPrefix =   'txt_';
	shpPrefix =   'shp_';
	camPrefix =   'cam_';
	lgtPrefix =   'lgt_';
	ctrlPrefix =  'ctrl_';
	mattePrefix = 'matte_';

	errGrpColor = rgb(20, 20, 20);

	// static text colors (UI)...
	sTxtColor = {
		light: rgb(234, 234, 234),
		dark:  rgb(45, 45, 45),
	};

	errTxtColor = rgb(140, 0, 51);
}
loadStaticPrefs();

// about and 'work in progress' messages...
var aboutStr = 'PROMO script ' + vStr + ' | Jean-Marc Billard';
var wip = 'work in progress... Σ(っ °Д °;)っ';

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
	value:   false,
	spatial: false,
	inEase:  {},
	inType:  {},
	outEase: {},
	outType: {},
};
var easeInInfluence = 0.2;
var easeOutInfluence = 0.2;

function updateFolderPaths() {
	// final paths...
	templatesPath = !homeOffice ? templatesArchPath : templatesLocalPath; // → templates folder object
	fontsPath = !homeOffice ? fontsArchPath : fontsLocalPath; // → templates folder object
	// folders...
	// if (!homeOffice && !Folder(nAdd).exists) {
	// 	alert('drive N: is not available\n\'home office\' mode is recommended!');
	// 	templatesPath = templatesLocalPath; // → templates folder object
	// 	fontsPath = fontsLocalPath; // → templates folder object
	// }
	templatesFolder = new Folder(templatesPath); // → templates folder object
	tempFolder = new Folder(tempPath); // → download folder object
	fontsFolder = new Folder(fontsPath); // → fonts folder object
}
// updateFolderPaths();

var tagsObj = {
	// comments just for comp itens...
	promoTags: [
		['EXPORTAR', ftgTogIcon],
		['LOGO GLOBO', shpTogIcon],
		['TARJA', txtTogIcon],
		['LETTERING', txtTogIcon],
		['CARTAO', txtTogIcon],
		['CARTELA', txtTogIcon],
		['RDP', txtTogIcon],
		['VINHETA', compTogIcon],
		['PASSAGEM', compTogIcon],
		['SERVICO', compTogIcon]
	],
	// comments for footage itens or template names for comp itens...
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

var labelsObj = {
	l1: {
		color: "ÿñ=;",
		name: "red"
	},
	l2: {
		color: "ÿç\u0013c",
		name: "pink"
	},
	l3: {
		color: "ÿš(®",
		name: "purple"
	},
	l4: {
		color: "ÿd<³",
		name: "deep purple"
	},
	l5: {
		color: "ÿ?Q³",
		name: "indigo"
	},
	l6: {
		color: "ÿ)–ï",
		name: "blue"
	},
	l7: {
		color: "ÿ\u001b©ñ",
		name: "light blue"
	},
	l8: {
		color: "ÿ\u001e¼Ó",
		name: "cyan"
	},
	l9: {
		color: "ÿ\u0016–ˆ",
		name: "teal"
	},
	l10: {
		color: "ÿO¯T",
		name: "green"
	},
	l11: {
		color: "ÿŒÃQ",
		name: "light green"
	},
	l12: {
		color: "ÿÌÚG",
		name: "lime"
	},
	l13: {
		color: "ÿýéL",
		name: "yellow"
	},
	l14: {
		color: "ÿû¿+",
		name: "amber"
	},
	l15: {
		color: "ÿý–#",
		name: "orange"
	},
	l16: {
		color: "ÿûS-",
		name: "deep orange"
	}
}