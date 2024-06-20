/*

---------------------------------------------------------------
> 🗃️ project tab
---------------------------------------------------------------

*/

// Grupo de subgrupos do projeto
currentGrp = tabsGrp.project;

// Subgrupo para o nome do projeto
// var projSubGrp1 = currentGrp.add('group');

// // Campo de texto para nome do projeto
// var projIdContent = 'PROJ ID';
// var projIdTxt = projSubGrp1.add('edittext', undefined, projIdContent);
// projIdTxt.maximumSize.width = 100;  // Largura máxima do campo de texto
// projIdTxt.minimumSize.width = vMin; // Largura mínima do campo de texto
// projIdTxt.helpTip = projIdContent;  // Dica de ajuda para o campo de texto

// // Botão para criar a estrutura de pastas no AE e no sistema
// var projFoldersBtn = projSubGrp1.add('iconbutton', iconSize, projOrgIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
// projFoldersBtn.helpTip = '◗ → criar estrutura de pastas no AE\n' +
// 	'◖ → criar estrutura de pastas no sistema\n' +
// 	'abre a janela de seleção de pastas no drive L para escolher onde criar a estrutura do projeto no sistema.';

// // Separador
// currentGrp.add('panel');

// Subgrupo para renomear composições
var projSubGrp2 = currentGrp.add('group');

// Botão para renomear composições selecionadas
var renameItemBtn = projSubGrp2.add('iconbutton', iconSize, renameIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
renameItemBtn.helpTip = '◖ → renomear composições selecionadas\n' +
	'◗ → renomear TODAS as saídas\n' +
	'remove caracteres especiais,\n' +
	'transforma tudo para maiúsculas.';

// Botão para organizar projeto
var projOrgBtn = projSubGrp2.add('iconbutton', iconSize, AEFoldersIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
projOrgBtn.helpTip = '◖ → organização automática de projetos\n' +
	'organiza o projeto usando as tags de organização.\n' +
	'◗ → tags de organização\n' +
	'abre a janela de tags para aplicar';

// Separador
currentGrp.add('panel');

// Subgrupo para coletar fontes
var projSubGrp3 = currentGrp.add('group');

// Botão para coletar fontes usadas no projeto
var collectFontsBtn = projSubGrp3.add('iconbutton', iconSize, fontCollectIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
collectFontsBtn.helpTip = '◖ → coletar fontes usadas no projeto\n' +
	'copia todas as fontes usadas no projeto\n' +
	'para a pasta de fontes';

// Separador
projSubGrp3.add('panel');

// Botão para abrir a pasta do projeto
var fldProjBtn2 = projSubGrp3.add('iconbutton', iconSize, aepFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
fldProjBtn2.helpTip = '◖ → abrir pasta do projeto';

// Botão para abrir a pasta do último item da fila de render
var fldProjBtn3 = projSubGrp3.add('iconbutton', iconSize, outFolderIcon[iconTheme], { name: 'btn', style: 'toolbutton' });
fldProjBtn2.helpTip = '◖ → abrir pasta do último item da fila de render.\n' +
	'◗ → abrir pasta do penúltimo item da fila de render.';


// Obtém os rótulos estáticos dos elementos da guia menu
getStaticTextLabels(tabsGrp.menu, []);

/*

---------------------------------------------------------------
> 🗃️ project tab events
---------------------------------------------------------------

*/

// projIdTxt.onChange = projIdTxt.onEnterKey = function () {
// 	this.text = projId = this.text
// 		.replaceSpecialCharacters()
// 		.toUpperCase();

// 	if (projIdTxt.text != projIdContent) setXMPData('identifier', projId);
// 	if (this.text.trim() == '') this.text = projIdContent;
// };

// projIdTxt.addEventListener('focus', function () {
// 	this.text = this.text == projIdContent ? '' : this.text;
// });

// projIdTxt.addEventListener('blur', function () {
// 	this.text = this.text == '' ? projIdContent : this.text;
// });

//---------------------------------------------------------

renameItemBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		var numItems = app.project.renderQueue.numItems;
		// error...
		if (numItems == 0) {
			showTabErr('fila de render vazia');
			return;
		}

		app.beginUndoGroup('renomear outputs');

		renameOutputs(); // renomeia todas as saídas

		app.endUndoGroup();
	}
});

renameItemBtn.onClick = function () {
	// error...
	if (app.project.numItems == 0) {
		showTabErr('projeto vazio');
		return;
	}
	app.beginUndoGroup('renomear comps');

	var dateStr = system
		.callSystem('cmd.exe /c date /t')
		.trim();

	setXMPData('creator', system.userName);
	setXMPData('date', dateStr);

	var compArray = app.project.selection;

	renamePromoComps(compArray);

	app.endUndoGroup();
};

//---------------------------------------------------------

projOrgBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		// Verifica se há itens no projeto.
		if (app.project.numItems == 0) return; // Encerra a função se não houver itens.

		tagDialog();
	}
});

projOrgBtn.onClick = function () {
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

// projFoldersBtn.addEventListener('click', function (c) {
// 	if (c.button == 2) {
// 		var dateStr = system
// 			.callSystem('cmd.exe /c date /t')
// 			.trim();

// 		setXMPData('creator', system.userName);
// 		setXMPData('date', dateStr);

// 		var selectedFolder = homeOffice ? Folder.selectDialog() : new Folder(projRJ).selectDlg();

// 		if (selectedFolder == null) return;

// 		var saveFolder = new Folder(decodeURI(selectedFolder.fullName) + '/' + projId);
// 		if (!saveFolder.exists) saveFolder.create();

// 		var savePath = decodeURI(saveFolder.fullName);

// 		var pathArray = [
// 			savePath + '/01 PROJETOS/',
// 			savePath + '/02 ARQUIVOS/',
// 			savePath + '/02 ARQUIVOS/FONT/',
// 			savePath + '/02 ARQUIVOS/IMAGENS/',
// 			savePath + '/02 ARQUIVOS/VIDEOS/',
// 			savePath + '/03 BOARDS/',
// 			savePath + '/04 REFs/',
// 			savePath + '/05 SAIDA/',
// 			savePath + '/06 EXTERNOS/'
// 		];
// 		for (var i = 0; i < pathArray.length; i++) {
// 			var path = pathArray[i];
// 			var nFolder = new Folder(path);
// 			if (!nFolder.exists) nFolder.create();
// 		}

// 		projFile = new File(savePath + '/01 PROJETOS/' + projId);
// 		app.project.save(projFile);

// 		openFolder(savePath);
// 		// setClipboard(savePath.replace(/^~\//, '').replace(/\//g, '\\'));

// 		// if (appV > 22 && saveAsV22) {
// 		// 	executeCommandID('Save a Copy As 22.x...');
// 		// }
// 	}
// });

// projFoldersBtn.onClick = function () {
// 	projectTemplateFolders(projectMode); // project folder structure...
// };

collectFontsBtn.onClick = function () {

	if (app.project.numItems == 0) return;

	var currentProj = app.project.file;
	var currentProjPath = new Folder(decodeURI(currentProj.path)).path;
	var assetsFolder = new Folder(currentProjPath + '/02 ARQUIVOS/');
	if (!assetsFolder.exists) assetsFolder.create();

	currentProjPath += '/02 ARQUIVOS/FONTS'; // collect folder path...

	var fontsPath = fontCollect(currentProjPath);

	openFolder(fontsPath);
};

collectFontsBtn.addEventListener('click', function (c) {
	if (c.button == 2) {
		// error...
		if (app.project.numItems == 0) {
			showTabErr('projeto vazio');
			return;
		}

		var savePath = Folder.selectDialog(); // Abre a janela de seleção de pastas

		if (savePath == null) return; // Se a janela foi cancelada, não faz nada

		var currentProjPath = decodeURI(savePath.fullName) + '/FONTS'; // caminho final do collect
		var fontsPath = fontCollect(currentProjPath);

		openFolder(fontsPath);
	}
});

//---------------------------------------------------------

fldProjBtn2.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	var currentProj = app.project.file;
	var currentProjPath = decodeURI(currentProj.path);
	var fld = new Folder(currentProjPath);

	if (!fld.exists) {
		showTabErr('a pasta não foi encontrada...');
		return;
	}
	openFolder(decodeURI(fld.fullName));
};

//---------------------------------------------------------

fldProjBtn3.onClick = function () {
	// error...
	if (!netAccess()) {
		showTabErr(netConfigName + ' não habilitada');
		return;
	}
	if (app.project.renderQueue.numItems < 1) return;

	var item = app.project.renderQueue.item(app.project.renderQueue.numItems);
	var outputModule = item.outputModule(1);
	var outputPath = decodeURI(outputModule.file.path);
	var fld = new Folder(outputPath);

	if (!fld.exists) {
		showTabErr('esta pasta não foi encontrada...');
		return;
	}

	openFolder(outputPath);
};

fldProjBtn3.addEventListener('click', function (c) {
	if (c.button == 2) {
		// error...
		if (!netAccess()) {
			showTabErr(netConfigName + ' não habilitada');
			return;
		}
		if (app.project.renderQueue.numItems < 2) return;

		var item = app.project.renderQueue.item(app.project.renderQueue.numItems - 1);
		var outputModule = item.outputModule(1);
		var outputPath = decodeURI(outputModule.file.path);
		var fld = new Folder(outputPath);

		if (!fld.exists) {
			showTabErr('esta pasta não foi encontrada...');
			return;
		}

		openFolder(outputPath);
	}
});
