/*

---------------------------------------------------------------
> 🪄 prototype functions
---------------------------------------------------------------

*/

// Adiciona um método à classe String para remover o último caractere.
String.prototype.popLastCharacter = function () {
	return this.replace(/.$/, '');  // Substitui o último caractere (.) por uma string vazia
};

// Adiciona um método à classe String para converter para camelCase.
String.prototype.toCamelCase = function () {
	return this.toLowerCase()          // Converte para minúsculas
		.replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); }) // Coloca a primeira letra de cada palavra em maiúscula
		.replace(/\s/g, '')               // Remove espaços em branco
		.replace(/^(.)/, function ($1) { return $1.toLowerCase(); });  // Converte a primeira letra para minúscula
};

// Adiciona um método à classe String para converter para Title Case.
String.prototype.toTitleCase = function () {
	return this.toLowerCase()          // Converte para minúsculas
		.replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); }) // Coloca a primeira letra de cada palavra em maiúscula
		.replace(/^(.)/, function ($1) { return $1.toUpperCase(); });  // Mantém a primeira letra em maiúscula
};

// Adiciona um método à classe String para remover espaços em branco no início e no fim (trim).
if (!String.prototype.trim) { // Verifica se o método trim já existe
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/gm, ''); // Remove espaços em branco no início e no fim (globalmente e em múltiplas linhas)
	};
}

// Remove ou substitui a maioria dos caracteres especiais em uma string
String.prototype.replaceSpecialCharacters = function () {

	// Substitui caracteres acentuados por seus equivalentes sem acento
	return this.replace(/À|Á|Â|Ã|Ä|\u00C0|\u00C1|\u00C2|\u00C3|\u00C4/g, 'A')
		.replace(/à|á|â|ã|ä|\u00E0|\u00E1|\u00E2|\u00E3|\u00E4/g, 'a')
		.replace(/È|É|Ê|Ë|\u00C8|\u00C9|\u00CA|\u00CB/g, 'E')
		.replace(/è|é|ê|ë|&|\u00E8|\u00E9|\u00EA|\u00EB/g, 'e')
		.replace(/Ì|Í|Î|Ï|\u00CC|\u00CD|\u00CE|\u00CF/g, 'I')
		.replace(/ì|í|î|ï|\u00EC|\u00ED|\u00EE|\u00EF/g, 'i')
		.replace(/Ò|Ó|Ô|Õ|Ö|\u00D2|\u00D3|\u00D4|\u00D5|\u00D6/g, 'O')
		.replace(/ò|ó|ô|õ|ö|\u00F2|\u00F3|\u00F4|\u00F5|\u00F6/g, 'o')
		.replace(/Ù|Ú|Û|Ü|\u00D9|\u00DA|\u00DB|\u00DC/g, 'U')
		.replace(/ù|ú|û|ü|\u00F9|\u00FA|\u00FB|\u00FC/g, 'u')
		.replace(/Ç|\u00C7/g, 'C')
		.replace(/ç|\u00E7/g, 'c')
		.replace(/\n|\r/g, ' ') // Substitui quebras de linha
		.replace(/\||-|\_|:/g, ' ')
		.replace(/[^\w\s—]/ig, '') // Remove todos os caracteres que não são letras, números, espaços, hífens ou travessões
		.replace(/\s{2,}/g, ' ') // Substitui múltiplos espaços em branco por um único espaço
		.trim(); // Remove espaços em branco no início e no fim da string
};

// Adiciona um método à classe String para abreviar datas em português.
String.prototype.toShortDate = function () {
	return this
		// Remove caracteres especiais (acentos, etc.)
		.replaceSpecialCharacters()


		.replace(/SEGUNDA/g, 'SEG') // Abrevia os dias da semana
		.replace(/TERCA/g, 'TER')
		.replace(/QUARTA/g, 'QUA')
		.replace(/QUINTA/g, 'QUI')
		.replace(/SEXTA/g, 'SEX')
		.replace(/SABADO/g, 'SAB')
		.replace(/DOMINGO/g, 'DOM')
		.replace(/DE /g, '') // Remove a preposição "DE"
		.replace(/JANEIRO/g, 'JAN') // Abrevia os meses do ano
		.replace(/FEVEREIRO/g, 'FEV')
		.replace(/MARCO/g, 'MAR')
		.replace(/ABRIL/g, 'ABR')
		.replace(/MAIO/g, 'MAI')
		.replace(/JUNHO/g, 'JUN')
		.replace(/JULHO/g, 'JUL')
		.replace(/AGOSTO/g, 'AGO')
		.replace(/SETEMBRO/g, 'SET')
		.replace(/OUTUBRO/g, 'OUT')
		.replace(/NOVEMBRO/g, 'NOV')
		.replace(/DEZEMBRO/g, 'DEZ');
};

// Redimensiona uma imagem para caber nas dimensões do seu container, mantendo a proporção.
Image.prototype.onDraw = function () {
	// Verifica se a imagem existe
	if (!this.image) return;

	// Obtém o tamanho do container (this) e da imagem (this.image)
	var WH = this.size;
	var wh = this.image.size;

	// Calcula o fator de escala (k) para ajustar a imagem proporcionalmente
	var k = Math.min(WH[0] / wh[0], WH[1] / wh[1]);

	// Redimensiona a imagem proporcionalmente
	wh = [k * wh[0], k * wh[1]];

	// Calcula a posição (x, y) para centralizar a imagem no container
	var xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2];

	// Desenha a imagem redimensionada e centralizada no container
	this.graphics.drawImage(this.image, xy[0], xy[1], wh[0], wh[1]);

	// Libera as variáveis para evitar vazamento de memória (opcional)
	WH = wh = xy = null;
};

// Polyfill para Array.isArray (verifica se um objeto é um array)
if (typeof Array.isArray === 'undefined') {
	Array.isArray = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};
}

// Polyfill para Array.prototype.indexOf (encontra o índice de um elemento em um array)
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (element, startPoint = 0) {
		if (this == null) {
			throw new TypeError('"this" é nulo ou não definido'); // Lança um erro se o contexto (this) for inválido
		}

		var length = this.length >>> 0; // Converte o comprimento do array para um número inteiro sem sinal

		if (length === 0) {
			return -1; // Retorna -1 se o array estiver vazio
		}

		var n = startPoint | 0; // Converte o ponto de início para um número inteiro

		if (n >= length) {
			return -1; // Retorna -1 se o ponto de início for maior ou igual ao comprimento do array
		}

		// Ajusta o ponto de início se for negativo
		n = Math.max(n >= 0 ? n : length - Math.abs(n), 0);

		// Procura pelo elemento a partir do ponto de início
		for (; n < length; n++) {
			if (n in this && this[n] === element) {
				return n; // Retorna o índice do elemento se for encontrado
			}
		}

		return -1; // Retorna -1 se o elemento não for encontrado
	};
}

// Polyfill para Array.prototype.pop (remove e retorna o último elemento de um array)
if (!Array.prototype.pop) {
	Array.prototype.pop = function () {
		if (this.length === 0) { // Se o array estiver vazio
			return undefined;      // Retorna undefined
		}

		var lastIndex = this.length - 1;   // Índice do último elemento
		var lastElement = this[lastIndex]; // Obtém o último elemento
		this.length = lastIndex;           // Reduz o comprimento do array (remove o último elemento)
		return lastElement;                // Retorna o último elemento removido
	};
}
