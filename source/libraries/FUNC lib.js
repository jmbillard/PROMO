/*

---------------------------------------------------------------
# general functions
---------------------------------------------------------------

*/

#include 'functions/color lib.js'; // global variables...
#include 'functions/ctrl anim lib.js'; // global variables...
#include 'functions/file system lib.js'; // global variables...
#include 'functions/layers lib.js'; // global variables...
#include 'functions/math num lib.js'; // global variables...
#include 'functions/string lib.js'; // global variables...
#include 'functions/treeView lib.js'; // global variables...
#include 'functions/metadata lib.js'; // global variables...

function wipAlert() {
  alert(wip);
}

function executeCommandID(command) {
  app.executeCommand(app.findMenuCommandId(command));
}


// gets the current value for the network permission preference...
function netAccess() {
  return app.preferences.getPrefAsLong(prefSection, prefName);
}

// shape templates...
#include 'shape templates/guides.jsxinc'; // → UI definition file
// tools...
#include 'tools/counter.jsxinc'; // → UI definition file
#include 'tools/typewriter.jsxinc'; // → UI definition file
#include 'tools/words.jsxinc'; // → UI definition file


// apply fill effect on multiple layers...
function batchFill(fillName, aColor) {

  var aItem = app.project.activeItem;
  var selLayers = (aItem != null) ? aItem.selectedLayers : [];
  // error...
  if (selLayers.length == 0) {
    showTabErr('layer not selected');
    return;
  }

  app.beginUndoGroup('fill');

  for (i = 0; i < selLayers.length; i++) {
    var palletFill = selLayers[i]
      .property('ADBE Effect Parade')
      .addProperty('ADBE Fill');
    palletFill.name = fillName;
    palletFill
      .property('Color')
      .setValue(aColor);
  }
  app.endUndoGroup();
}

/*

---------------------------------------------------------------
> string functions
---------------------------------------------------------------

*/

// breaks text based on a character limit...
function lineBreak(selLayer, inputLimit) {

  inputLimit = Math.floor(inputLimit);

  if (!(selLayer instanceof TextLayer)) return;

  var srcTxt = selLayer
    .property('ADBE Text Properties')
    .property('ADBE Text Document');
  var txt = textContent(selLayer)
    .replace(/\s/g, ' ');
  var txt2 = '';
  var wordsArray = txt.split(/\s/);

  for (var i = 0; i < wordsArray.length; i++) {
    var letterCount = wordsArray[i].length;

    if (letterCount >= inputLimit) {
      inputLimit = letterCount + 1;
    }
  }
  while (txt.length > inputLimit) {

    for (var t = inputLimit; t > 0; t--) {

      if (txt[t] != ' ') continue;

      txt2 += txt
        .substring(0, t) + '\n';
      txt = txt
        .substring(t + 1, txt.length)
        .trim();
      break;
    }
  }
  srcTxt.setValue(txt2 + txt);
}

/*

---------------------------------------------------------------
> 🗃️ project organization and renaming
---------------------------------------------------------------

*/

// moves every project item to root folder...
function deleteProjectFolders() {

  for (i = app.project.numItems; i >= 1; i--) {
    var rFolder = app.project.rootFolder; // project root folder...
    var aItem = app.project.item(i);

    // is not project folder...
    if (!(aItem instanceof FolderItem)) continue;

    // is project folder...
    while (aItem.numItems > 0) {
      aItem.item(1).parentFolder = rFolder;
    }
  }
  deleteEmptyProjectFolders();
}

function getComps() {

  var compArray = [];

  for (var i = 1; i <= app.project.numItems; i++) {
    var comp = app.project.item(i);

    if (!(comp instanceof CompItem)) continue; // is not comp...
    // item is comp...
    compArray.push(comp);
  }
  return compArray;
}

// get all compositions | templates...
function getCompsAndTemplates() {

  var compArray = getComps();

  for (var i = 0; i < compArray.length; i++) {
    try {
      var comp = compArray[i];
      // essential graphics template name
      var templateName = comp.motionGraphicsTemplateName;
      // alert(comp.name);

      // item is end page template...
      if (templateName == 'end page') {
        comp.comment = 'export'; // → export tag
        continue;
      }
      // item is not end page template...
      for (var l = 1; l <= comp.numLayers; l++) {
        var service = comp.layer(l)
          .property('ADBE Effect Parade')
          .property('servico');
        var epService = comp.layer(l)
          .property('ADBE Effect Parade')
          .property('servico end page');

        if (service != undefined || epService != undefined) {
          // has a layer with date and time information...
          comp.comment = 'export';  // → export tag
          break;
        }
        if (!(comp.layer(l).source instanceof CompItem)) break; // layer is not comp...

        // layer is comp...
        var preComp = comp.layer(l).source;
        // essential graphics template name...
        templateName = preComp.motionGraphicsTemplateName;

        try {
          epService = preComp.layer('ctrl_comp')
            .property('ADBE Effect Parade')
            .property('servico end page'); // effect named 'servico end page'...

          if (epService != undefined) {
            // precomp is end page...
            comp.comment = 'export'; // → export tag
            break;
          }
        } catch (err) { }
        // has a end page precomp layer...
        if (templateName == 'end page') {
          comp.comment = 'export'; // → export tag
        }
      }
    } catch (err) { };
  }
  return compArray;
}

function getFootage() {

  var footage = {
    stillArray: [],
    videoArray: [],
    sonoArray: [],
    solidArray: [],
    missingArray: [],
    missingNames: []
  };

  for (i = app.project.numItems; i >= 1; i--) {
    try {
      var aItem = app.project.item(i);

      if (!(aItem instanceof FootageItem)) continue;

      if (aItem.footageMissing) {
        footage.missingNames.push(aItem.name);
        footage.missingArray.push(aItem);
        continue;
      }
      if (aItem.mainSource instanceof SolidSource) {
        footage.solidArray.push(aItem);
        continue;
      }
      if (!(aItem.mainSource instanceof FileSource)) continue;

      if (aItem.mainSource.isStill) {
        footage.stillArray.push(aItem);
        continue;
      }
      if (aItem.hasVideo) {
        footage.videoArray.push(aItem);
        continue;
      }
      footage.sonoArray.push(aItem);
    } catch (err) { };
  }
  return footage;
}

// creates the project folder structure...
function projectTemplateFolders(projectMode) {

  var rndFolder; // render folder...
  var ftgFolder; // footage folder...
  var imgFolder; // images folder...
  var snoFolder; // sounds folder...
  var solFolder; // solids folder...
  var compsFolder; // precomps folder...
  var astFolder; // assets folder...
  var edtFolder; // editable assets folder...

  switch (projectMode) {
    // legacy 'PROMO' template...
    case (0):
      rndFolder = app.project.items.addFolder('01 COMPS');
      edtFolder = rndFolder;//app.project.items.addFolder('_EDITAR');
      compsFolder = app.project.items.addFolder('02 PRECOMPS');
      astFolder = app.project.items.addFolder('03 ARQUIVOS');
      // compsFolder.parentFolder = astFolder;
      epFolder = rndFolder;
      ftgFolder = app.project.items.addFolder('VIDEOS');
      ftgFolder.parentFolder = astFolder;
      imgFolder = app.project.items.addFolder('IMAGENS');
      imgFolder.parentFolder = astFolder;
      snoFolder = app.project.items.addFolder('AUDIO');
      snoFolder.parentFolder = astFolder;
      solFolder = app.project.items.addFolder('SOLIDOS');
      solFolder.parentFolder = astFolder;

      break;

    // custom 'PROMO' template...
    case (1):
      edtFolder = app.project.items.addFolder('---- edit ----');
      rndFolder = app.project.items.addFolder('---- render ----');
      epFolder = app.project.items.addFolder('end pages');
      epFolder.parentFolder = rndFolder;
      astFolder = app.project.items.addFolder('assets');
      ftgFolder = app.project.items.addFolder('footage');
      ftgFolder.parentFolder = astFolder;
      imgFolder = app.project.items.addFolder('images');
      imgFolder.parentFolder = ftgFolder;
      snoFolder = app.project.items.addFolder('sounds');
      snoFolder.parentFolder = ftgFolder;
      compsFolder = app.project.items.addFolder('precomps');
      compsFolder.parentFolder = astFolder;
      solFolder = app.project.items.addFolder('solids');
  }

  return [
    rndFolder,
    ftgFolder,
    imgFolder,
    snoFolder,
    solFolder,
    compsFolder,
    edtFolder,
    epFolder
  ];
}

function populateFootageItemFolders(itemArray, folder) {

  var subFoldersObj = {};

  // var progressLabel = progressWindow.children[0];
  // var progressBar = progressWindow.children[1];

  // progressBar.maxvalue = itemArray.length - 1;

  for (var s = 0; s < itemArray.length; s++) {
    var aItem = itemArray[s];
    var itemComment = aItem.comment;

    // progressBar.value = s;
    // progressLabel.text = 'organizing: ' + aItem.name;
    // progressWindow.update();

    if (itemComment == '') {
      aItem.parentFolder = folder;
      continue;
    }

    var set = itemComment.split(':')[0];
    var subFolderName = set.replaceSpecialCharacters();
    var subFolderObjName = subFolderName.replace(/\s/g, '_');

    if (subFoldersObj.hasOwnProperty(subFolderObjName)) {
      aItem.parentFolder = subFoldersObj[subFolderObjName];
      continue;
    }
    var subFolder = app.project.items.addFolder(subFolderName);
    subFolder.parentFolder = folder; // subfolder...
    aItem.parentFolder = subFolder; // subfolder...

    subFoldersObj[subFolderObjName] = subFolder;
  }
}

function populateCompItemFolders(comps, folders) {

  var rndFolder = folders[0]; // render comps folder...
  var compsFolder = folders[5]; // comps folder...

  var subFoldersObj = {};

  for (var c = 0; c < comps.length; c++) {
    var comp = comps[c];
    var subFolderName;
    var subFolderObjName;
    var subFolder;

    if (comp.comment.match(/EXPORT|LOGO GLOBO/)) {
      comp.parentFolder = rndFolder; // → render folder
      continue;
    }
    if (comp.comment.match(/CARTAO|CARTELA|VINHETA|RDP|TARJA|LETT|SERVICO|ASSINATURA|REFERENCIA|PASSAGEM/)) {
      comp.parentFolder = rndFolder; // → render folder

      subFolderName = comp.comment;
      subFolderObjName = subFolderName.replace(/\s/g, '_');

      if (subFoldersObj.hasOwnProperty(subFolderObjName)) {
        comp.parentFolder = subFoldersObj[subFolderObjName];
        continue;
      }
      subFolder = app.project.items.addFolder(subFolderName);
      subFolder.parentFolder = rndFolder; // subfolder...
      comp.parentFolder = subFolder; // subfolder...

      subFoldersObj[subFolderObjName] = subFolder;

      continue;
    }
    comp.parentFolder = compsFolder; // → comps folder

    if (comp.comment.trim() == '') continue;

    subFolderName = comp.comment;
    subFolderObjName = subFolderName.replace(/\s/g, '_');

    if (subFoldersObj.hasOwnProperty(subFolderObjName)) {
      comp.parentFolder = subFoldersObj[subFolderObjName];
      continue;
    }
    subFolder = app.project.items.addFolder(subFolderName);
    subFolder.parentFolder = compsFolder; // subfolder...
    comp.parentFolder = subFolder; // subfolder...

    subFoldersObj[subFolderObjName] = subFolder;
  }
}

function populateProjectFolders() {

  var comps = getCompsAndTemplates(); // all project comps and templates...
  var footage = getFootage(); // all project footage...
  var folders = projectTemplateFolders(projectMode); // project folder structure...

  var ftgFolder = folders[1]; // footage folder...
  var imgFolder = folders[2]; // images folder...
  var snoFolder = folders[3]; // sounds folder...
  var solFolder = folders[4]; // solids folder...

  populateFootageItemFolders(footage.videoArray, ftgFolder);
  populateFootageItemFolders(footage.stillArray, imgFolder);
  populateFootageItemFolders(footage.sonoArray, snoFolder);
  populateFootageItemFolders(footage.solidArray, solFolder);
  populateCompItemFolders(comps, folders);

  if (ignoreMissing) {
    var missFolder = app.project.items.addFolder('missing');
    populateFootageItemFolders(footage.missingArray, missFolder);

    return;
  }
  if (footage.missingNames.length > 0) {
    var missingStr = footage.missingNames.join('\n');
    alert('some files are missing...\n' + missingStr);
  }
}

// removes project folders with 0 itens...
function deleteEmptyProjectFolders() {

  for (var i = app.project.numItems; i >= 1; i--) {
    var aItem = app.project.item(i);

    if (!(aItem instanceof FolderItem)) continue;
    if (aItem.numItems == 0) aItem.remove();
  }
}

// rename comps (assinaturas, exports)...
function renamePromoComps(compArray) {

  for (var a = 0; a < compArray.length; a++) {
    var comp = compArray[a];

    if (!(comp instanceof CompItem)) continue; // is not comp...
    // is comp...

    //------------------------------------------------------------------------------

    // template confronto brasileirão
    if (comp.numLayers > 4 && comp.layer(4).name == 'confronto brasileirao') {

      if (comp.layer(4) instanceof TextLayer) {
        var t1 = textContent(comp.layer(4)).split(/\sx\s/)[0].replace(/^\d*\s/, '');
        var t2 = textContent(comp.layer(4)).split(/\sx\s/)[1].replace(/^\d*\s/, '');
        var tName = t1 + ' X ' + t2;

        comp.name = 'CONFRONTO - ' + tName
          .toUpperCase()
          .replaceSpecialCharacters();

        continue;
      }
    }

    //------------------------------------------------------------------------------

    var separator = ' - ';

    var compName = comp.name
      .toUpperCase()
      .replaceSpecialCharacters();

    comp.name = compName;

    //------------------------------------------------------------------------------

    // [compPrefix, compComment, alternative words(optional)]
    var compPrefixValArray = [
      ['CONFRONTO', 'CONFRONTO'],
      ['CRT', 'CARTAO', 'CARTELA', 'CTO', 'CTL', 'CRT'],
      ['VHT', 'VINHETA'],
      ['RDP', 'RODAPE'],
      ['TRJ', 'TARJA', 'TAR'],
      ['ASSINA', 'ASSINATURA', 'ASS'],
      ['PASSAGEM', 'PASSAGEM', 'TRANSICAO', 'LAPADA'],
      ['REF', 'REFERENCIA', 'PREVIEW'],
      ['LETT', 'LETTERING', 'LET']
    ];

    // [abbreviation, word, alternative words(optional)]
    var wordsPrefixValArray = [
      ['DPS', 'DEPOIS'],
      ['AMN', 'AMANHA'],
      ['HJ', 'HOJE']
    ];

    //------------------------------------------------------------------------------

    var compFolderName = comp.parentFolder.name.toUpperCase();

    for (var t = 0; t < compPrefixValArray.length; t++) {

      for (var u = 0; u < compPrefixValArray[t].length; u++) {
        var val = compPrefixValArray[t][u];
        var compComment = compPrefixValArray[t][1];
        var compPrefix = compPrefixValArray[t][0];

        var pattern1 = eval('/' + val + '/g'); // regex pattern...
        var pattern2 = eval('/^' + val + '[\\s-_]+/'); // regex pattern...
        var pattern3 = eval('/[\\s-_]+' + val + '$/'); // regex pattern...

        if (compFolderName.match(pattern1) || compName.match(pattern1)) {
          comp.comment = compComment;

          if (compName.match(pattern2) || compName.match(pattern3)) {
            compName = compName
              .replace(pattern2, '')
              .replace(pattern3, '');
          }
          if (compName != compPrefix && compName != '') comp.name = compPrefix + separator + compName;
          break;
        }
      }
    }

    //------------------------------------------------------------------------------

    var servicoArray = fullWeekArray
      .concat(fullMonthArray)
      .concat(['DPS', 'DEPOIS', 'DIA', 'APOS', 'TEMPORADA']);

    for (var s = 0; s < servicoArray.length; s++) {
      var sWord = servicoArray[s].replaceSpecialCharacters();

      if (compName.match(sWord) || compName.match(/\d{1,2}H/)) {
        comp.comment = 'SERVICO';
        break;
      }
    }

    for (var t = 0; t < wordsPrefixValArray.length; t++) {

      for (var u = 0; u < wordsPrefixValArray[t].length; u++) {
        var val = wordsPrefixValArray[t][u];
        var w = wordsPrefixValArray[t][1];

        var pattern = eval('/' + val + '/g'); // regex pattern...

        if (compName.match(pattern)) {
          comp.comment = 'SERVICO';
          comp.name = compName.replace(pattern, w);
        }
      }
    }

    //------------------------------------------------------------------------------

    if (compName.match(/LOGO[\s_]*GLOBO/) || comp.comment.match(/LOGO[\s_]GLOBO/)) {
      comp.name = 'LOGO GLOBO';
      continue;
    }

    //------------------------------------------------------------------------------

    if (compName.match(/PRE(\s)*COMP(S)*$/) || compFolderName.match(/PRE(\s)*COMP(S)*$/)) {
      comp.comment = '';
      continue;
    }
  }
}

// check if layer has effect named 'servico ...'
function hasServiceData(aLayer) {

  if (aLayer == null) return false; // no layer...

  var pattern = /servico|serviço/i; // regex pattern...

  for (var i = 1; i <= fx.numProperties; i++) {
    var fxName = aLayer
      .property('ADBE Effect Parade')
      .property(i).name; // current effect name...

    if (pattern.test(fxName)) return true;  // effect named 'servico' exists...
  }
  return false; // no effect named 'servico name'
}

function getPrefixes() {

  return [
    compPrefix,
    solPrefix,
    adjPrefix,
    nullPrefix,
    txtPrefix,
    shpPrefix,
    ctrlPrefix,
    mattePrefix,
    camPrefix,
    lgtPrefix
  ];
}

/*

---------------------------------------------------------------
> ⚙️ script preferences
---------------------------------------------------------------

*/

// saves the preferences JSON file...
function savePrefs() {

  var scriptFolder = new Folder(scriptPreferencesPath);

  if (!scriptFolder.exists) scriptFolder.create();

  for (var o in JSONPrefsObj) {
    if (!defPrefsObj.hasOwnProperty(o)) delete JSONPrefsObj[o]; // object cleanup...
  }

  var fileContent = JSON.stringify(JSONPrefsObj, null, "\t");
  var filePath = scriptPreferencesPath + '/preferences.json';

  return saveTextFile(fileContent, filePath);
}

function fxObj(fx) {

  var obj = {};
  for (var p = 1; p <= fx.numProperties; p++) {

    try {
      var prop = fx.property(p);
      var keyName = prop.name
        .replaceSpecialCharacters()
        .replace(/\s/g, '_');
      var val = prop.value;

      if (val == undefined) continue;

      if (Array.isArray(val) && val.length > 3) val = rgbToHEX(val);

      obj[keyName] = val;
    } catch (err) { }
  }
  return obj;
}

function buildFxObj() {

  var aItem = app.project.activeItem;
  var obj = {};

  try {
    var cFx = aItem.layer('ctrl_comp')
      .property('ADBE Effect Parade');

    for (var f = 1; f <= cFx.numProperties; f++) {

      var fx = cFx.property(f);
      var keyName = fx.name
        .replaceSpecialCharacters()
        .replace(/\s+/g, '_');

      obj[keyName] = fxObj(fx);
    }
  } catch (err) { }
  return obj;
}

// populate dropdownlists...
function populateDropdownList(array, dropdown) {

  for (var i = 0; i < array.length; i++) {
    dropdown.add('item', array[i]);
  }
}

function defaultEndPageObj(obj) {

  var defObj = {
    layout_end_page: {
      modelo: 1,
      logo: true,
      titulo: true,
      auto_title_case: true,
      subtitulo: true,
      data_e_horario: true,
      apoio: false,
      foto: false,
      footage: true,
      pattern: true,
      foto_layer: '-------',
      pattern_layer: '-------',
    },
    servico_end_page: {
      titulo: 'Digite O Título Aqui',
      subtitulo: 'SUBTÍTULO',
      formato: 4,
      semana: 8,
      dia: 10,
      mes: 0,
      a_partir_das: false,
      hora: 16,
      min: 0,
    },
    aparencia_end_page: {
      tema: 4,
      logo: '#141414',
      titulo: '#F2F2F2',
      subtitulo: '#F2F2F2',
      apoio: '#F2F2F2',
      horario: '#141414',
      horario_base: '#ECFF8C',
      footage: '#141414',
      pattern: '#141414',
      fundo: '#E53131',
    },
  };
  if (obj.layout_end_page == undefined) obj.layout_end_page = {};

  for (var l in defObj.layout_end_page) {

    if (!obj.layout_end_page.hasOwnProperty(l)) {
      obj.layout_end_page[l] = defObj.layout_end_page[l];

    } else {

      if (typeof defObj.layout_end_page[l] == 'boolean') {
        obj.layout_end_page[l] = Boolean(obj.layout_end_page[l]);
      }
    }
  }

  if (obj.servico_end_page == undefined) { obj.servico_end_page = {}; }

  for (var s in defObj.servico_end_page) {

    if (!obj.servico_end_page.hasOwnProperty(s)) {
      obj.servico_end_page[s] = defObj.servico_end_page[s];
    }
  }

  if (obj.aparencia_end_page == undefined) { obj.aparencia_end_page = {}; }

  for (var a in defObj.layout_end_page) {

    if (!obj.aparencia_end_page.hasOwnProperty(a)) {
      obj.aparencia_end_page[a] = defObj.aparencia_end_page[a];
    }
  }

  return obj;
}

/*

---------------------------------------------------------------
> ⚙️ AE preferences
---------------------------------------------------------------

*/

var table1252 = {
  '€': 128,
  '‚': 130,
  'ƒ': 131,
  '„': 132,
  '…': 133,
  '†': 134,
  '‡': 135,
  'ˆ': 136,
  '‰': 137,
  'Š': 138,
  '‹': 139,
  'Œ': 140,
  'Ž': 142,
  '‘': 145,
  '’': 146,
  '“': 147,
  '”': 148,
  '•': 149,
  '–': 150,
  '—': 151,
  '˜': 152,
  '™': 153,
  'š': 154,
  '›': 155,
  'œ': 156,
  'ž': 158,
  'Ÿ': 159,
  '¡': 161,
  '¢': 162,
  '£': 163,
  '¤': 164,
  '¥': 165,
  '¦': 166,
  '§': 167,
  '¨': 168,
  '©': 169,
  'ª': 170,
  '«': 171,
  '¬': 172,
  '�': 173,
  '®': 174,
  '¯': 175,
  '°': 176,
  '±': 177,
  '²': 178,
  '³': 179,
  '´': 180,
  'µ': 181,
  '¶': 182,
  '·': 183,
  '¸': 184,
  '¹': 185,
  'º': 186,
  '»': 187,
  '¼': 188,
  '½': 189,
  '¾': 190,
  '¿': 191,
  'À': 192,
  'Á': 193,
  'Â': 194,
  'Ã': 195,
  'Ä': 196,
  'Å': 197,
  'Æ': 198,
  'Ç': 199,
  'È': 200,
  'É': 201,
  'Ê': 202,
  'Ë': 203,
  'Ì': 204,
  'Í': 205,
  'Î': 206,
  'Ï': 207,
  'Ð': 208,
  'Ñ': 209,
  'Ò': 210,
  'Ó': 211,
  'Ô': 212,
  'Õ': 213,
  'Ö': 214,
  '×': 215,
  'Ø': 216,
  'Ù': 217,
  'Ú': 218,
  'Û': 219,
  'Ü': 220,
  'Ý': 221,
  'Þ': 222,
  'ß': 223,
  'à': 224,
  'á': 225,
  'â': 226,
  'ã': 227,
  'ä': 228,
  'å': 229,
  'æ': 230,
  'ç': 231,
  'è': 232,
  'é': 233,
  'ê': 234,
  'ë': 235,
  'ì': 236,
  'í': 237,
  'î': 238,
  'ï': 239,
  'ð': 240,
  'ñ': 241,
  'ò': 242,
  'ó': 243,
  'ô': 244,
  'õ': 245,
  'ö': 246,
  '÷': 247,
  'ø': 248,
  'ù': 249,
  'ú': 250,
  'û': 251,
  'ü': 252,
  'ý': 253,
  'þ': 254,
  'ÿ': 255
};

function getLabelColors() {
  try {
    var labelColors = [];
    var sectionName = 'Label Preference Color Section 5';
    var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;

    for (var c = 1; c <= 16; c++) {
      var keyName = 'Label Color ID 2 # ' + c;
      var colorStr = app.preferences.getPrefAsString(sectionName, keyName, prefFile);
      var hex = '#';

      for (var j = 1; j < colorStr.length; j++) {
        var charCode = colorStr.charCodeAt(j);

        if (charCode > 254) {
          charCode = table1252[colorStr[j]];
        }
        var newCode = charCode.toString(16).toUpperCase();
        if (newCode.length == 1) {
          newCode = '0' + newCode;
        }
        hex += newCode;
      }
      labelColors.push(hex);
    }
    return labelColors;

  } catch (err) { }
}

function getLabelColorNames() {
  try {
    var labelColorNames = [];
    var sectionName = 'Label Preference Text Section 7';
    var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;

    for (var c = 1; c <= 16; c++) {
      var keyName = 'Label Text ID 2 # ' + c;
      var colorName = app.preferences.getPrefAsString(sectionName, keyName, prefFile);
      labelColorNames.push(colorName);
    }
    return labelColorNames;

  } catch (err) { }
}

function HEXToAscii(hex) {
  hex = hex.replace('#', '');
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

function asciiToHex(str) {
  var array = [];

  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    array.push(hex);
  }
  return array.join('');
}

function encodeLabelColor(hex) {
  var res = '';
  hex = hex.replace('#', '');

  for (var i = 0; i < hex.length; i += 2) {
    var chars = hex.substr(i, 2);
    //.replace(/^0/, '');
    var charCode = HEXToAscii(chars).charCodeAt(0);

    // if (table1252.hasOwnProperty(HEXToAscii(chars))) {
    //   charCode = table1252[HEXToAscii(chars)];
    // }

    if (charCode < 127 && charCode > 32) {
      chars = '"' + HEXToAscii(chars) + '"';
    }
    res += chars;
  }
  return 'FF' + res.replace(/"{2,}/g, '');
}
