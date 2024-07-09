/*

---------------------------------------------------------------
> 🪟 UI dialog
---------------------------------------------------------------

*/

/*
# UI 1
0. salve o projeto!
1. abra a comp do template que será salvo (ela precisa ter 'TEMPLATE' no nome)
2. posicione a agulha da timeline em um frame de referencia (essa será a imagem de preview)
3. selecione os layers de texto que serão editáveis no template (na ordem que deverão ser preenchidos)
4. clique no botão capturar...
	- incluir: comentário 'TEMPLATE'
	- extrair: nome da comp TEMPLATE, tempo de referencia, indices e nome dos layers selecionados...

// ==========

# UI 2
1. nome da configuração (ex: 'CONVERSA COM BIAL TARJA RODAPÉ CONVIDADO')
2. prefixo da arte (ex: 'RDP')
3. dicas de preenchimento (ex: 'digite o texto em 1, 2 ou 3 linhas para nome e informação.')
4. separador de informação (ex: '---')
5. exemplos de preenchimento (ex: 'CÁSSIO\nGABUS MENDES\n---\nATOR')

6. seletor de caixa de texto (ex: 'upperCase', 'lowerCase', 'titleCase')
7. seletor de método de preenchimento (ex: 'textContent', 'layerName')
8. navegar até a pasta de mídia...
9. navegar até os outputs (múltiplos outputs)
10. checkbox de alpha (transparência)

11. gerar template (navegar a té a pasta raiz da produção e criar o arquivo .aet, a imagem de preview e o arquivo de configuração)

// ==========

exemplo:
{
	"configName": "CONVERSA COM BIAL TARJA CONVIDADO",
	"exemple": "PAULINHO\nDA VIOLA\n---\nMÚSICO",
	"tip": "digite o texto em 1, 2 ou 3 linhas para nome e informação.\n\nuse 1 linha com '---' para separar nome e informação.\n\nuse 1 linha vazia para separar mais de 1 versão do mesmo template selecionado.\n\nuse os controles nos efeitos do layer 'ctrl'.",

	"compName": "CRT - CONVIDADO TEMPLATE",
	"prefix": "CRT",
	"refTime": 2,
	"separator": "---",
	"textCase": "upperCase",
	"inputLayers": [
		{"layerIndex": 4, "method": "textContent"},
		{"layerIndex": 5, "method": "textContent"}
	],

	"outputPath": [
		"//10.193.48.13/promo_ber/BACKUP/artes/ARTES PARA EDICAO/CONVERSA COM BIAL/CONVIDADOS"
	],
	"alpha": true
}

// ==========
function PAD_CONFIG_Dialog(prodArray) {


/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
*/

// WIN
// ===
var win = new Window("palette", "NOVO TEMPLATE"); 
    win.orientation = "row"; 
    win.alignChildren = ["center","top"]; 
    win.spacing = 10; 
    win.margins = 16; 

// LAYOUTMAINGRP1
// ==============
var layoutMainGrp1 = win.add("group", undefined, {name: "layoutMainGrp1"}); 
    layoutMainGrp1.orientation = "column"; 
    layoutMainGrp1.alignChildren = ["left","top"]; 
    layoutMainGrp1.spacing = 10; 
    layoutMainGrp1.margins = 0; 

var labMain1 = layoutMainGrp1.add("statictext", undefined, undefined, {name: "labMain1"}); 
    labMain1.text = "ETAPA 1:"; 

// FORMMAINGRP
// ===========
var formMainGrp = layoutMainGrp1.add("group", undefined, {name: "formMainGrp"}); 
    formMainGrp.orientation = "column"; 
    formMainGrp.alignChildren = ["left","center"]; 
    formMainGrp.spacing = 20; 
    formMainGrp.margins = 0; 

// INPUTGRP1
// =========
var inputGrp1 = formMainGrp.add("group", undefined, {name: "inputGrp1"}); 
    inputGrp1.orientation = "column"; 
    inputGrp1.alignChildren = ["left","center"]; 
    inputGrp1.spacing = 2; 
    inputGrp1.margins = 0; 

var statictext1 = inputGrp1.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "nome da configuração:"; 

var edittext1 = inputGrp1.add('edittext {properties: {name: "edittext1"}}'); 
    edittext1.text = "+VC TARJA RODAPÉ CONVIDADO"; 
    edittext1.preferredSize.width = 200; 
    edittext1.preferredSize.height = 24; 

// INPUTGRP2
// =========
var inputGrp2 = formMainGrp.add("group", undefined, {name: "inputGrp2"}); 
    inputGrp2.orientation = "column"; 
    inputGrp2.alignChildren = ["left","center"]; 
    inputGrp2.spacing = 2; 
    inputGrp2.margins = 0; 

var statictext2 = inputGrp2.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "prefixo:"; 

var edittext2 = inputGrp2.add('edittext {properties: {name: "edittext2"}}'); 
    edittext2.text = "RDP"; 
    edittext2.preferredSize.width = 200; 
    edittext2.preferredSize.height = 24; 

// INPUTGRP3
// =========
var inputGrp3 = formMainGrp.add("group", undefined, {name: "inputGrp3"}); 
    inputGrp3.orientation = "column"; 
    inputGrp3.alignChildren = ["left","center"]; 
    inputGrp3.spacing = 2; 
    inputGrp3.margins = 0; 

var statictext3 = inputGrp3.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "dicas:"; 

var edittext3 = inputGrp3.add('edittext {size: [200,80], properties: {name: "edittext3", multiline: true}}'); 
    edittext3.text = "digite o texto em 1, 2 ou 3 \rlinhas para nome e informação."; 

// INPUTGRP4
// =========
var inputGrp4 = formMainGrp.add("group", undefined, {name: "inputGrp4"}); 
    inputGrp4.orientation = "column"; 
    inputGrp4.alignChildren = ["left","center"]; 
    inputGrp4.spacing = 2; 
    inputGrp4.margins = 0; 

var statictext4 = inputGrp4.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "separador:"; 

var edittext4 = inputGrp4.add('edittext {properties: {name: "edittext4"}}'); 
    edittext4.text = "---"; 
    edittext4.preferredSize.width = 200; 
    edittext4.preferredSize.height = 24; 

// INPUTGRP5
// =========
var inputGrp5 = formMainGrp.add("group", undefined, {name: "inputGrp5"}); 
    inputGrp5.orientation = "column"; 
    inputGrp5.alignChildren = ["left","center"]; 
    inputGrp5.spacing = 2; 
    inputGrp5.margins = 0; 

var statictext5 = inputGrp5.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext5.text = "exemplo de preenchimento:"; 

var edittext5 = inputGrp5.add('edittext {size: [200,80], properties: {name: "edittext5", multiline: true}}'); 
    edittext5.text = "digite o texto em 1, 2 ou 3 \rlinhas para nome e informação."; 

// WIN
// ===
var divider1 = win.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

// LAYOUTMAINGRP2
// ==============
var layoutMainGrp2 = win.add("group", undefined, {name: "layoutMainGrp2"}); 
    layoutMainGrp2.orientation = "column"; 
    layoutMainGrp2.alignChildren = ["left","top"]; 
    layoutMainGrp2.spacing = 10; 
    layoutMainGrp2.margins = 0; 

var labMain2 = layoutMainGrp2.add("statictext", undefined, undefined, {name: "labMain2"}); 
    labMain2.text = "ETAPA 2:"; 

// TIPSGRP
// =======
var tipsGrp = layoutMainGrp2.add("group", undefined, {name: "tipsGrp"}); 
    tipsGrp.orientation = "column"; 
    tipsGrp.alignChildren = ["left","center"]; 
    tipsGrp.spacing = 10; 
    tipsGrp.margins = 0; 

var tipsLab = tipsGrp.add("statictext", undefined, undefined, {name: "tipsLab"}); 
    tipsLab.text = "salve o projeto!"; 

var captureBtn = tipsGrp.add("button", undefined, undefined, {name: "captureBtn"}); 
    captureBtn.text = "capturar"; 

// LAYOUTMAINGRP2
// ==============
var divider2 = layoutMainGrp2.add("panel", undefined, undefined, {name: "divider2"}); 
    divider2.alignment = "fill"; 

// PROJGRP
// =======
var projGrp = layoutMainGrp2.add("group", undefined, {name: "projGrp"}); 
    projGrp.orientation = "column"; 
    projGrp.alignChildren = ["center","center"]; 
    projGrp.spacing = 10; 
    projGrp.margins = 0; 

// ALPHAGRP
// ========
var alphaGrp = projGrp.add("group", undefined, {name: "alphaGrp"}); 
    alphaGrp.orientation = "row"; 
    alphaGrp.alignChildren = ["left","center"]; 
    alphaGrp.spacing = 10; 
    alphaGrp.margins = 0; 

var alphaLab = alphaGrp.add("statictext", undefined, undefined, {name: "alphaLab"}); 
    alphaLab.text = "canal alpha:"; 
    alphaLab.preferredSize.width = 90; 

var alphaCkb = alphaGrp.add("checkbox", undefined, undefined, {name: "alphaCkb"}); 
    alphaCkb.preferredSize.width = 90; 

// GROUP1
// ======
var group1 = projGrp.add("group", undefined, {name: "group1"}); 
    group1.orientation = "column"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 15; 
    group1.margins = 0; 

// TEXTCASEGRP
// ===========
var textCaseGrp = group1.add("group", undefined, {name: "textCaseGrp"}); 
    textCaseGrp.orientation = "row"; 
    textCaseGrp.alignChildren = ["left","center"]; 
    textCaseGrp.spacing = 10; 
    textCaseGrp.margins = 0; 

var caseLab = textCaseGrp.add("statictext", undefined, undefined, {name: "caseLab"}); 
    caseLab.text = "caixa de texto:"; 
    caseLab.preferredSize.width = 90; 

var caseDrop_array = ["ALTA","baixa","Título"]; 
var caseDrop = textCaseGrp.add("dropdownlist", undefined, undefined, {name: "caseDrop", items: caseDrop_array}); 
    caseDrop.selection = 0; 
    caseDrop.preferredSize.width = 90; 

// GROUP1
// ======
var divider3 = group1.add("panel", undefined, undefined, {name: "divider3"}); 
    divider3.alignment = "fill"; 

// LAYERSMAINGRP
// =============
var layersMainGrp = group1.add("group", undefined, {name: "layersMainGrp"}); 
    layersMainGrp.orientation = "column"; 
    layersMainGrp.alignChildren = ["left","center"]; 
    layersMainGrp.spacing = 10; 
    layersMainGrp.margins = 0; 

// LAYERGRP
// ========
var layerGrp = layersMainGrp.add("group", undefined, {name: "layerGrp"}); 
    layerGrp.orientation = "row"; 
    layerGrp.alignChildren = ["left","center"]; 
    layerGrp.spacing = 10; 
    layerGrp.margins = 0; 

var layerLab = layerGrp.add("statictext", undefined, undefined, {name: "layerLab"}); 
    layerLab.text = "layer 1:"; 
    layerLab.preferredSize.width = 90; 

var layerDrop_array = ["conteúdo","nome"]; 
var layerDrop = layerGrp.add("dropdownlist", undefined, undefined, {name: "layerDrop", items: layerDrop_array}); 
    layerDrop.selection = 0; 
    layerDrop.preferredSize.width = 90; 

// GROUP1
// ======
var divider4 = group1.add("panel", undefined, undefined, {name: "divider4"}); 
    divider4.alignment = "fill"; 

// IMPORTGRP
// =========
var importGrp = group1.add("group", undefined, {name: "importGrp"}); 
    importGrp.orientation = "column"; 
    importGrp.alignChildren = ["left","center"]; 
    importGrp.spacing = 2; 
    importGrp.margins = 0; 

var importLab = importGrp.add("statictext", undefined, undefined, {name: "importLab"}); 
    importLab.text = "pasta de mídias:"; 

var importPath = importGrp.add("statictext", undefined, undefined, {name: "importPath"}); 
    importPath.text = "caminho da pasta..."; 
    importPath.preferredSize.width = 150; 
    importPath.preferredSize.height = 24; 

// OUTPUTGRP
// =========
var outputGrp = group1.add("group", undefined, {name: "outputGrp"}); 
    outputGrp.orientation = "column"; 
    outputGrp.alignChildren = ["left","center"]; 
    outputGrp.spacing = 2; 
    outputGrp.margins = 0; 

var outputLab = outputGrp.add("statictext", undefined, undefined, {name: "outputLab"}); 
    outputLab.text = "pastas de output:"; 

var outputPath = outputGrp.add("statictext", undefined, undefined, {name: "outputPath"}); 
    outputPath.text = "caminho da pasta..."; 
    outputPath.preferredSize.width = 150; 
    outputPath.preferredSize.height = 24; 

// LAYOUTMAINGRP2
// ==============
var divider5 = layoutMainGrp2.add("panel", undefined, undefined, {name: "divider5"}); 
    divider5.alignment = "fill"; 

// BTNGRP
// ======
var btnGrp = layoutMainGrp2.add("group", undefined, {name: "btnGrp"}); 
    btnGrp.orientation = "row"; 
    btnGrp.alignChildren = ["left","bottom"]; 
    btnGrp.spacing = 10; 
    btnGrp.margins = 0; 

var newOutputBtn = btnGrp.add("button", undefined, undefined, {name: "newOutputBtn"}); 
    newOutputBtn.text = "novo output"; 

var makeBtn = btnGrp.add("button", undefined, undefined, {name: "makeBtn"}); 
    makeBtn.text = "criar"; 

win.show();