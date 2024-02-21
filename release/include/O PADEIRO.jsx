/*

---------------------------- info ----------------------------

  title:   O PADEIRO script

  notes:   a collection of templates and companion script

  author:  Jean-Marc Billard
  version: xxx
  date:    xx-xx-2024

--------------------------------------------------------------

*/
//  jshint -W061

try {
  var scriptFile = new File('//10.228.183.165/VFX/imagem/drive_l/Fileserver_3/INSTITUCIONAL/_adm-designers/SCRIPTS FREE/O_PADEIRO/O_PADEIRO.jsxbin');

  scriptFile.open('r');
  eval(scriptFile.read());

  scriptFile.close();

} catch (err) {
  alert('nope... (っ °Д °;)っ\n\n' + err.message);
}
