/*

---------------------------------------------------------------
> script main ui
---------------------------------------------------------------

*/

function PROMO_UI() {

  #include 'utils/input ui.js'; // import templates ui file...
  #include 'utils/progress ui.js'; // import templates ui file...
  #include 'utils/prefs ui.js'; // import templates ui file...
  #include 'utils/o padeiro templates ui.js'; // import templates ui file...
  #include 'utils/tag ui.js'; // organization tags ui file...
  #include 'utils/fonts ui.js'; // end page presets ui file...
  #include 'utils/find ui.js'; // end page presets ui file...
  #include 'utils/bin ui.js'; // end page presets ui file...

  #include 'main ui functions.js'; // ui and layout functions...

  // defines the window object...
  var w = {};

  if (thisObj instanceof Panel) {
    w = thisObj;

  } else {
    w = new Window('palette', 'PROMO', undefined);
  }

  w.spacing = 0;
  w.margins = 0;
  w.orientation = 'fill';

  /*

  ---------------------------------------------------------------
  > 📁 tabs and groups
  ---------------------------------------------------------------

  */

  // UI main 'root' centered group...
  var mainGrp = w.add('group');
  mainGrp.alignment = 'center';
  mainGrp.orientation = 'stack';

  // left group...
  var leftGrp = w.add('group');
  leftGrp.alignment = 'left';
  leftGrp.orientation = 'stack';

  // right group...
  var rightGrp = w.add('group');
  rightGrp.alignment = 'right';
  rightGrp.orientation = 'stack';

  //---------------------------------------------------------

  // tab menu group...
  var tabsGrp = mainGrp.add('group');
  tabsGrp.alignment = 'center';
  tabsGrp.orientation = 'stack';

  // add, center and hide every tab from the group names 'array' inside the 'root'...
  for (i = 0; i < grpNames.length; i++) {
    var grp = tabsGrp.add('group', undefined, { name: grpNames[i] });
    // grp.alignment = 'fill';
    grp.alignment = 'center';
    grp.visible = false;
  }

  // error tab group...
  var errTabGrp = mainGrp.add('group');
  errTabGrp.visible = false;

  // progress tab group...
  var progressGrp = mainGrp.add('group');
  progressGrp.visible = false;

  // close button group...
  var closeGrp = rightGrp.add('group');
  closeGrp.orientation = 'stack';
  closeGrp.visible = false;

  // preferences button group...
  var prefGrp = rightGrp.add('group');
  prefGrp.orientation = 'stack';
  var prefBtn = prefGrp.add('iconbutton', undefined, prefsIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  prefBtn.helpTip = 'preferências do script';

  /*

  ---------------------------------------------------------------
  > images
  ---------------------------------------------------------------

  */

  // logo image group...
  var imgGrp = leftGrp.add('group');
  imgGrp.spacing = 0;
  var LOGO = imgGrp.add('image', undefined, LOGO_IMG[iconTheme]);
  LOGO.helpTip = aboutStr;
  LOGO.maximumSize.width = 70;

  var infoGrp = imgGrp.add('group');
  infoGrp.orientation = 'stack';

  var aboutTxt = infoGrp.add('statictext', undefined, undefined);
  aboutTxt.justify = 'center';
  aboutTxt.helpTip = aboutStr;
  aboutTxt.characters = 6;
  setCtrlHighlight(aboutTxt, sTxtColor[iconTheme], '#8A8A8A');
  aboutTxt.text = vStr;

  var infoBtn = infoGrp.add('iconbutton', undefined, infoIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  infoBtn.size = [12, 12];
  infoBtn.helpTip = 'ajuda | DOCS';
  infoBtn.visible = false;

  // progress image group...
  var progImgGrp = leftGrp.add('group');
  progImgGrp.helpTip = aboutStr;
  progImgGrp.maximumSize.width = 70;
  progImgGrp.visible = false;

  var progImg = progImgGrp.add('image', undefined, keepCalmIcon);

  /*

  ---------------------------------------------------------------
  > 📟 main menu
  ---------------------------------------------------------------

  */
  var currentGrp = tabsGrp.menu;
  var menuSubGrp1 = currentGrp.add('group');

  var ctrlSubGrp = menuSubGrp1.add('group');
  // control tab button...
  var ctrlBtn = ctrlSubGrp.add('iconbutton', iconSize, controlsIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var ctrlLab = ctrlSubGrp.add('statictext', undefined, 'controles', { name: 'label', truncate: 'end' });
  ctrlBtn.helpTip = 'controles e hierarquia';

  // animation tab button...
  var animSubGrp = menuSubGrp1.add('group');
  var animBtn = animSubGrp.add('iconbutton', iconSize, animationIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var animLab = animSubGrp.add('statictext', undefined, 'animação', { name: 'label', truncate: 'end' });
  animBtn.helpTip = 'ferramentas de animação';

  // effects tab button...
  var fxSubGrp = menuSubGrp1.add('group');
  var fxBtn = fxSubGrp.add('iconbutton', iconSize, effectsIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  // var fxLab = fxSubGrp.add('statictext', undefined, 'effects', { name: 'label' , truncate: 'end'});
  var fxLab = fxSubGrp.add('statictext', undefined, 'adj. layer', { name: 'label', truncate: 'end' });
  fxBtn.helpTip = 'novo adjustment layer (camada de ajuste)';
  // fxBtn.helpTip = 'effects and presets';

  // text tab button...
  var txtSubGrp = menuSubGrp1.add('group');
  var txtBtn = txtSubGrp.add('iconbutton', iconSize, textIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var txtLab = txtSubGrp.add('statictext', undefined, 'texto', { name: 'label', truncate: 'end' });
  txtBtn.helpTip = 'ferramentas de texto';

  // pallet tab button...
  var guideSubGrp = menuSubGrp1.add('group');
  var guideBtn = guideSubGrp.add('iconbutton', iconSize, brandIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var guideLab = guideSubGrp.add('statictext', undefined, 'marca', { name: 'label', truncate: 'end' });
  guideBtn.helpTip = 'cores e marca';

  // project tab button...
  var projSubGrp = menuSubGrp1.add('group');
  var projBtn = projSubGrp.add('iconbutton', iconSize, projectIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var projLab = projSubGrp.add('statictext', undefined, 'projeto', { name: 'label', truncate: 'end' });
  projBtn.helpTip = 'organização de projeto';

  //---------------------------------------------------------

  currentGrp.add('panel');

  var menuSubGrp2 = currentGrp.add('group');

  // links tab button...
  var linksSubGrp = menuSubGrp2.add('group');
  var linksBtn = linksSubGrp.add('iconbutton', iconSize, shortcutsIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var linksLab = linksSubGrp.add('statictext', undefined, 'atalhos', { name: 'label', truncate: 'end' });
  linksBtn.helpTip = 'links e pastas';

  //---------------------------------------------------------

  currentGrp.add('panel');
  var menuSubGrp3 = currentGrp.add('group');

  // import templates UI button...
  var padeiroSubGrp = menuSubGrp3.add('group');
  var padeiroBtn = padeiroSubGrp.add('iconbutton', iconSize, padeiroIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var padeiroLab = padeiroSubGrp.add('statictext', undefined, 'o padeiro', { name: 'label', truncate: 'end' });
  padeiroBtn.helpTip = 'o padeiro';

  // layers tab button...
  var findSubGrp = menuSubGrp3.add('group');
  var findBtn = findSubGrp.add('iconbutton', iconSize, findIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var findLab = findSubGrp.add('statictext', undefined, 'busca', { name: 'label', truncate: 'end' });
  findBtn.helpTip = 'buscar em layers de texto';

  var pngPreviewSubGrp = menuSubGrp3.add('group');
  var pngPreviewBtn = pngPreviewSubGrp.add('iconbutton', iconSize, previewIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var pngPreviewLab = pngPreviewSubGrp.add('statictext', undefined, 'preview', { name: 'label', truncate: 'end' });
  pngPreviewBtn.helpTip = 'salvar preview em .png do frame atual';

  //---------------------------------------------------------

  //currentGrp.add('panel');

  // var menuSubGrp4 = currentGrp.add('group');

  // application tab button...
  // var appSubGrp = menuSubGrp4.add('group');
  // var appBtn = appSubGrp.add('iconbutton', iconSize, appIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  // var appLab = appSubGrp.add('statictext', undefined, 'app utilities', { name: 'label' , truncate: 'end'});
  // appBtn.helpTip = 'setup Media Encoder presets, fonts, etc...';
  // appBtn.enabled = false
  // appLab.enabled = false

  var menuSubGrp5 = currentGrp.add('group');
  // dev tab button...
  var devSubGrp = menuSubGrp5.add('group');
  var devBtn = devSubGrp.add('iconbutton', iconSize, exprTogIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  var devLab = devSubGrp.add('statictext', undefined, 'dev tools', { name: 'label', truncate: 'end' }); devBtn.helpTip = 'dev tools...';
  menuSubGrp5.enabled = devMode;
  menuSubGrp5.visible = devMode;

  /* jshint ignore:start */
  #include 'contents/controls tab.js';
  #include 'contents/animation tab.js';
  #include 'contents/effects tab.js';
  #include 'contents/text tab.js';
  #include 'contents/brand tab.js';
  #include 'contents/project tab.js';
  #include 'contents/shortcuts tab.js';
  #include 'contents/app tab.js';
  #include 'contents/dev tab.js';
  /* jshint ignore:end */

  /*

  ---------------------------------------------------------------
  > error tab
  ---------------------------------------------------------------

  */

  var errTxt = errTabGrp.add('statictext', undefined, '');
  errTxt.justify = 'center';
  setFgColor(errTxt, errTxtColor);

  // close group...
  var closeBtn = closeGrp.add('iconbutton', iconSize, closeIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
  closeBtn.helpTip = 'close';

  var closeErrBtn = closeGrp.add('iconbutton', iconSize, closeErrIcon, { name: 'btn', style: 'toolbutton' });
  closeErrBtn.helpTip = 'close';
  closeErrBtn.visible = false;

  /*

  ---------------------------------------------------------------
  >  progress tab
  ---------------------------------------------------------------

  */

  var progTxt1 = progressGrp.add('statictext', undefined, '');
  progTxt1.justify = 'center';

  setFgColor(progTxt1, sTxtColor.light);

  var progTxt2 = progressGrp.add('statictext', undefined, '');
  progTxt2.justify = 'center';
  setFgColor(progTxt2, sTxtColor.light);

  var mainMenuLabels = getStaticTextLabels(tabsGrp.menu, []);

  // all tabs except preferences...
  var tabs = getTabGroups();

  // all tab subgroups except keyStatsGrp...
  var tabSubGrps = getTabSubGroups();

  // all tab subgroups except keyStatsGrp...
  var tabDividers = getTabDividers(tabsGrp.menu);

  // all tab subgroups except keyStatsGrp...
  var tabLabels = getTabLabels();
  highlighMenuLabels();

  // menu is the current selected and viewed group by default... 
  currentGrp = tabsGrp.menu;
  currentGrp.visible = true;
  bgColor = tabColors[tabs.indexOf(currentGrp)];

  setBgColor(w, bgColor);

  w.layout.layout(true);

  /*
  
  ---------------------------------------------------------------
  > 📟 main menu events
  ---------------------------------------------------------------
  
  */

  //---------------------------------------------------------

  // layouts all the UI
  w.onShow = w.onResizing = function () {
    setLayout();
  };

  //---------------------------------------------------------

  infoBtn.onClick = function () {
    openWebSite(repoURL + readme);
  };

  aboutTxt.addEventListener('mousedown', function () {
    openWebSite(repoURL);
  });

  //---------------------------------------------------------

  ctrlBtn.onClick = function () {
    currentGrp.visible = false;
    currentGrp = tabsGrp.controls;
    readme = '#--seção-controles-';
    openTab();
  };

  //---------------------------------------------------------

  animBtn.onClick = function () {
    currentGrp.visible = false;
    currentGrp = tabsGrp.animation;
    readme = '#--seção-animação-';
    openTab();
  };

  //---------------------------------------------------------

  fxBtn.onClick = function () {
    shpAdjBtn.notify();
    // currentGrp.visible = false;
    // currentGrp = tabsGrp.effects;
    // readme = '#--seção-efeitos-';
    // openTab();
  };

  //---------------------------------------------------------

  txtBtn.onClick = function () {
    currentGrp.visible = false;
    currentGrp = tabsGrp.text;
    readme = '#--seção-texto-';
    openTab();
  };

  //---------------------------------------------------------

  guideBtn.onClick = function () {
    currentGrp.visible = false;
    currentGrp = tabsGrp.brand;
    readme = '#--seção-guias-';
    openTab();
  };

  //---------------------------------------------------------

  projBtn.onClick = function () {
    // projIdContent = 'PROJ ID';

    // projName = getXMPData('title[1]') == '' ? 'proj name' : getXMPData('title[1]');
    // projId = getXMPData('identifier') == '' ? projIdContent : getXMPData('identifier');

    currentGrp.visible = false;
    currentGrp = tabsGrp.project;
    readme = '#--seção-projeto-';
    openTab();
    // projIdTxt.text = projId;
    // projIdTxt.helpTip = projIdContent;

    // insertUserIdBtn.helpTip = 'insert user with ' + projIdContent;

    // projNameTxt.text = projName;
  };

  //---------------------------------------------------------

  // appBtn.onClick = function () {
  //   currentGrp.visible = false;
  //   currentGrp = tabsGrp.app;
  //   readme = '#--seção-programa-';
  //   openTab();
  // };

  //---------------------------------------------------------

  devBtn.onClick = function () {
    currentGrp.visible = false;
    currentGrp = tabsGrp.dev;
    openTab();
  };

  //---------------------------------------------------------

  linksBtn.onClick = function () {
    currentGrp.visible = false;
    currentGrp = tabsGrp.shortcuts;
    readme = '#--seção-links-';
    openTab();
  };

  /*
  
  ---------------------------------------------------------------
  > import templates...
  ---------------------------------------------------------------
  
  */

  padeiroBtn.onClick = function () {
    // error...
    if (!netAccess()) {
      showTabErr(netConfigName + ' não habilitada');
      return;
    }

    padeiroTemplateDialog(); // → templates ui

  };

  /*
  
  ---------------------------------------------------------------
  > find dialog...
  ---------------------------------------------------------------
  
  */

  findBtn.onClick = function () {
    findDialog();
  };

  //---------------------------------------------------------

  pngPreviewBtn.onClick = function () {
    var aItem = app.project.activeItem;
    // error...
    if (aItem == null) {
      showTabErr('selecione uma comp');
      return;
    }
    var saveFolder = Folder.selectDialog();

    if (saveFolder == null) return;

    var savePath = saveFolder.fullName + '/';
    var previewPath = savePath + aItem.name + ' preview.png';
    var previewFile = new File(previewPath);

    aItem.saveFrameToPng(aItem.time, previewFile);
    openFolder(savePath);
  };

  pngPreviewBtn.addEventListener('click', function (c) {
    if (c.button == 2) {
      var aItem = app.project.activeItem;

      if (aItem == null) {
        showTabErr('selecione uma comp');
        return;
      }
      var currentProj = app.project.file;
      var currentProjPath = currentProj != null ? decodeURI(currentProj.path) : projPath;
      var previewPath = currentProjPath + '/' + aItem.name + ' preview.png';

      var previewFld = new Folder(currentProjPath);
      if (!previewFld.exists) previewFld.create();
      var previewFile = new File(previewPath);

      aItem.saveFrameToPng(aItem.time, previewFile);
      openFolder(currentProjPath);
    }
  });

  //---------------------------------------------------------

  prefBtn.onClick = function () {
    prefsDialog();
  };

  /*
  
  ---------------------------------------------------------------
  > ❌ close group events
  ---------------------------------------------------------------
  
  */

  closeBtn.onClick = function () {
    LOGO.visible = true;
    aboutTxt.visible = true;
    infoBtn.visible = false;

    closeBtn.visible = true;
    prefGrp.visible = true;
    closeErrBtn.visible = false;
    tabsGrp.menu.visible = true;

    bgColor = tabColors[0];

    hideTabs();
    setBgColor(w, bgColor);
  };

  //---------------------------------------------------------

  closeErrBtn.onClick = function () {
    LOGO.visible = true;
    closeBtn.visible = true;
    closeErrBtn.visible = false;

    clearOutput();
    hideTabs();
    openTab();
  };

  return w;
}