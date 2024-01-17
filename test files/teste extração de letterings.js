
function readFileContent(file) {
	var fileContent;

	file.open('r');
	fileContent = file.read();
	file.close();

	return fileContent.toString();
}

var htmlFile = new File("~/Desktop/Vt Upfront(Fut Nacional).htm");


var htmlCntent = readFileContent(htmlFile)

var uContent = htmlCntent
	.replace(/[\n\r]|&nbsp;|&#8239;/g, '')
	.match(/<u(.*?)\/u>/g)
	.toString()
	.split(/<\/u>/);

var finalWords = [];

for (var w = 0; w < wordsArray.length; w++) {
	var newWord =  wordsArray[w].replace(/<(.*?)>|^\,/g, '').trim();

	if (newWord != '') finalWords.push(newWord);
}

alert(finalWords.join('\n\n'));