/*

---------------------------------------------------------------
> 🌳 tree view functions
---------------------------------------------------------------

*/

// Função para remover pastas vazias da árvore de diretórios (recursivamente)
function cleanHierarchy(nodeTree) {
	// Obtém todos os subitens (arquivos ou pastas) do nó atual
	var branches = nodeTree.items;

	// Percorre os subitens em ordem reversa para remover com segurança enquanto iteramos
	for (var i = branches.length - 1; i >= 0; i--) {
		// Se o subitem não for uma pasta ("node"), ignora e passa para o próximo
		if (branches[i].type !== 'node') continue;

		// Chama a função recursivamente para limpar as subpastas
		var wasEmpty = cleanHierarchy(branches[i]);

		// Se o subitem era uma pasta e agora está vazio (ou já estava), remove-o
		if (wasEmpty) {
			nodeTree.remove(branches[i]);
		}
	}

	// Retorna se o nó atual ficou vazio após a limpeza (exceto se for a raiz)
	return nodeTree.items.length === 0 && nodeTree.parent !== null;
}

// Otimiza a hierarquia da árvore, combinando pastas com apenas uma subpasta
function optimizeHierarchy(nodeTree) {
	var branches = nodeTree.items;

	for (var i = branches.length - 1; i >= 0; i--) {
		// Pula itens que não são pastas
		if (branches[i].type !== 'node') continue;

		// Se a pasta tiver mais de um item, chama a função recursivamente para otimizar as subpastas
		if (branches[i].items.length > 1) {
			optimizeHierarchy(branches[i]);
		} else {
			// Se a pasta tiver apenas uma subpasta, combina os nomes e move os itens
			if (branches[i].items.length === 1 && branches[i].items[0].type === 'node') {
				var subfolder = branches[i].items[0];
				branches[i].text += ' / ' + subfolder.text; // Combina os nomes

				while (subfolder.items.length > 0) {
					var item = subfolder.items[0];
					try {
						// Move o item para a pasta pai, preservando o tipo, texto e imagem
						var newItem = branches[i].add(item.type, item.text);
						newItem.image = item.image;
						subfolder.remove(0);
					} catch (error) { }
				}
				nodeTree.remove(subfolder); // Remove a subpasta agora vazia
			}
		}
	}
}

// Cria a hierarquia de arquivos e pastas na árvore da interface do usuário
function createHierarchy(array, node, fileTypes) {
	for (var n = 0; n < array.length; n++) {
		var nodeName = array[n].displayName; // Nome do item atual

		// Verifica se o item atual é uma pasta (Folder)
		if (array[n] instanceof Folder) {
			var subArray = array[n].getFiles(); // Obtém os arquivos e subpastas da pasta atual

			// Se a pasta possui conteúdo (arquivos ou subpastas)
			if (subArray.length > 0) {
				var nodeItem = node.add('node', nodeName); // Adiciona um nó de pasta na árvore
				// nodeItem.image = fldTogIcon.light;  // Opcional: define o ícone da pasta (descomente se necessário)

				// Chama recursivamente a função para processar o conteúdo da pasta
				createHierarchy(subArray, nodeItem, fileTypes);
			}
		} else { // Se o item atual não for uma pasta (é um arquivo)
			try {
				// Filtra os arquivos com base nas extensões permitidas em fileTypes
				if (fileTypes.indexOf(getFileExt(nodeName)) >= 0) {
					var templateItem = node.add('item', nodeName); // Adiciona um nó de arquivo na árvore
					templateItem.image = templateListIcon.light;  // Define o ícone do arquivo
				}
			} catch (error) { }
		}
	}
}

// refreshes the main 'tree view' node...
// Constrói a árvore de arquivos e pastas na interface do usuário
function buildTree(folder, tree, fileTypes) {
	// Remove todos os itens da árvore (limpa a árvore)
	tree.remove(tree.items[0]);

	// Obtém todos os arquivos e pastas dentro da pasta especificada
	var folderContentArray = folder.getFiles();

	// Adiciona a pasta raiz (folder) como um novo nó na árvore
	var folderNode = tree.add('node', folder.displayName);

	// Chama a função createHierarchy para popular a árvore recursivamente,
	// começando pela pasta raiz e filtrando pelos tipos de arquivo permitidos
	createHierarchy(folderContentArray, folderNode, fileTypes);

	// Remove pastas vazias da árvore (limpa a hierarquia)
	cleanHierarchy(tree);

	// A linha abaixo é opcional e pode ser utilizada para otimizar a hierarquia,
	// combinando pastas com apenas um único item
	optimizeHierarchy(tree);
}

//Constrói a árvore de fontes a partir de uma pasta especificada.
function buildFontTree(folder, tree) {
	// Remove o primeiro item da árvore (geralmente o item "Root")
	tree.remove(tree.items[0]);

	// Obtém todos os arquivos e pastas dentro da pasta especificada
	var fontsArray = folder.getFiles();

	// Adiciona a pasta raiz (folder) como um novo nó na árvore
	var folderNode = tree.add('node', folder.displayName);
	folderNode.image = fldTogIcon.light; // Define o ícone da pasta

	// Percorre a lista de arquivos e pastas
	for (var n = 0; n < fontsArray.length; n++) {
		var fName = fontsArray[n].displayName; // Nome do item atual
		var subArray = []; // Lista de subitens (arquivos ou pastas)

		// Se o item atual for um arquivo, pula para o próximo
		if (fontsArray[n] instanceof File) continue;

		// Obtém a lista de subitens (arquivos ou pastas) do item atual
		subArray = fontsArray[n].getFiles();

		// Se o item atual não possui subitens, pula para o próximo
		if (subArray.length == 0) continue;

		// Adiciona o item atual como um novo nó na árvore
		var fontFamilyItem = folderNode.add('item', fName);
		fontFamilyItem.image = fontFamilyIcon; // Define o ícone do item
	}

	// Remove pastas vazias da árvore (limpa a hierarquia)
	cleanHierarchy(tree);
}

// Constrói a árvore de resultados da busca
function buildFindTree(tree, obj, compArray, progBar) {
	var sKey = obj.sKey;          // Palavra-chave de busca
	var vis = obj.vis;            // Incluir camadas ocultas? (true/false)
	var matchCase = obj.matchCase; // Diferenciar maiúsculas/minúsculas? (true/false)
	var matchAccent = obj.matchAccent; // Diferenciar acentos? (true/false)
	var invert = !obj.invert;      // Inverter a busca (não incluir a palavra-chave)? (true/false)
	var regExp = obj.regExp;       // Usar expressões regulares? (true/false)
	var resultArray = [];          // Array para armazenar as composições encontradas

	// Se não houver palavra-chave, retorna um array vazio e contagem 0
	if (sKey == '') return resultArray;

	// Se a opção de expressão regular estiver marcada, converte a palavra-chave em uma expressão regular
	if (regExp) {
		var pattern = 'new RegExp(/' + sKey + '/);'; // Cria a string da expressão regular
		sKey = eval(pattern); // Avalia a string para criar o objeto RegExp
	}

	// Remove todos os itens da árvore para começar do zero
	while (tree.items.length > 0) {
		tree.remove(tree.items[0]);
	}

	// Inicializa a barra de progresso e a contagem de itens da árvore
	progBar.value = 0;
	count = 0;
	var progInc = 100 / compArray.length; // Calcula o incremento da barra de progresso por composição

	// Itera sobre todas as composições no projeto
	for (i = 0; i < compArray.length; i++) {

		// Itera sobre todas as camadas em cada composição
		for (var l = 1; l <= compArray[i].numLayers; l++) {
			if (!(compArray[i].layer(l) instanceof TextLayer)) continue; // Pula se não for camada de texto

			var compItem; // Variável para armazenar o item da composição na árvore
			var txtLayer = compArray[i].layer(l); // Camada de texto atual
			var doc = txtLayer.property('ADBE Text Properties').property('ADBE Text Document'); // Propriedade de texto da camada
			var txtArray = []; // Array para armazenar o conteúdo do texto em cada keyframe

			// Se a propriedade de texto tiver keyframes
			if (doc.numKeys > 0) {
				for (var k = 1; k <= doc.numKeys; k++) {
					compArray[i].time = doc.keyTime(k); // Define o tempo da composição para o keyframe atual
					txtArray.push(textContent(txtLayer)); // Adiciona o conteúdo do texto ao array
				}
			} else {
				// Se a propriedade de texto tiver uma expressão
				if (doc.expression != '') compArray[i].time = txtLayer.outPoint - 1; // Define o tempo para antes do ponto de saída da camada
				txtArray.push(textContent(txtLayer)); // Adiciona o conteúdo do texto ao array
			}

			// Se não estiver usando expressões regulares, ajusta o texto para comparação
			if (!regExp) {
				for (var m = 0; m < txtArray.length; m++) {
					// Respeita a opção ALL CAPS da camada
					if (doc.value.allCaps) txtArray[m] = txtArray[m].toUpperCase();
					if (!matchCase) txtArray[m] = txtArray[m].toLowerCase(); // Converte para minúsculas se a opção estiver desmarcada
					if (!matchAccent) txtArray[m] = txtArray[m].replaceSpecialCharacters(); // Remove acentos se a opção estiver desmarcada
				}
				sKey = matchCase ? sKey : sKey.toLowerCase(); // Ajusta a palavra-chave para minúsculas se a opção estiver desmarcada
				sKey = matchAccent ? sKey : sKey.replaceSpecialCharacters(); // Remove acentos da palavra-chave se a opção estiver desmarcada
			}

			// Ignora camadas ocultas se a opção estiver desmarcada
			if (vis && txtLayer.enabled == false) continue;

			// Itera sobre o array de textos
			for (var f = 0; f < txtArray.length; f++) {
				var r = txtArray[f].match(sKey) == null ? false : true; // Verifica se há correspondência

				if (r != invert) continue; // Ignora a correspondência se a opção de inverter estiver marcada

				// Adiciona a composição na árvore se ainda não estiver presente
				if (resultArray.indexOf(compArray[i]) < 0) {
					var compName = limitNameSize(compArray[i].name, 45); // Limita o tamanho do nome da composição
					compItem = tree.add('node', compName); // Adiciona o item da composição na árvore
					compItem.image = compTogIcon.light;
					count += 1;
					resultArray.push(compArray[i]);
				}

				// Adiciona a camada de texto na árvore
				var layerName = limitNameSize(txtLayer.name, 35); // Limita o tamanho do nome da camada
				var txtItem = compItem.add('item', '(' + (f + 1) + ')   #' + txtLayer.index + '   ' + layerName);
				txtItem.image = txtLayer.enabled ? eyeOpenIcon : eyeClosedIcon; // Define o ícone da camada (olho aberto ou fechado)
				count += 1;
			}
		}
		progBar.value += progInc; // Incrementa a barra de progresso
	}
	progBar.value = 100; // Define a barra de progresso como 100%
	 // Retorna o array de composições encontradas e a contagem de itens na árvore
	return { 'resultArray': resultArray, 'count': count };
}

// Expande todos os nós de uma 'árvore de exibição' (tree view).
function expandNodes(nodeTree) {
	// Expande o nó atual e chama recursivamente a função para os seus subnós.
	nodeTree.expanded = true;
	
	// Obtém os subnós do nó atual
	var branches = nodeTree.items;

	// Percorre cada subnó
	for (var i = 0; i < branches.length; i++) {
		// Se o subnó for um nó (node), chama a função recursivamente para expandir seus subnós
		if (branches[i].type == 'node') expandNodes(branches[i]);
	}
}


// Função recursiva que percorre uma 'árvore de exibição' (tree view)
// e adiciona os nós que contêm uma determinada string na lista de resultados
function findItem(nodeTree, list, searchTxt) {
	
	// Obtém os subnós do nó atual
	var branches = nodeTree.items;

	// Percorre cada subnó
	for (var i = 0; i < branches.length; i++) {
		
		// Se o subnó for um nó (node), chama a função recursivamente para o seu subnó
		if (branches[i].type == 'node') findItem(branches[i], list, searchTxt);

		// Verifica se o texto do subnó contém a string procurada
		if (branches[i].text.trim().toUpperCase().replaceSpecialCharacters().match(searchTxt)) {
			
			// Adiciona o subnó na lista de resultados
			list.push(branches[i]);
		}
	}
	
	// Retorna a lista de resultados
	return list;
}
