/* eslint-disable no-with */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
/*

---------------------------------------------------------------
> 🪟 UI dialogs
---------------------------------------------------------------

*/

//  linter settings:
//  jshint -W061
//  jshint -W043
//  jshint -W083

// organization tags UI...
function tagDialog() {
	// Ui definition...
	// window...
	var wTag = new Window('palette', 'org. tags...');
	wTag.spacing = 8;
	wTag.alignChildren = 'left';

	var subCustomGrp = wTag.add('group');
	var tagCustomBtn = subCustomGrp.add('iconbutton', iconTogSize, solTogIcon.light, { style: 'toolbutton' });
	var tagCustomTxt = subCustomGrp.add('edittext');
	tagCustomTxt.size = [60, 24];
	tagCustomBtn.helpTip = 'custom tag';

	for (var tagGrpName in tagsObj) {
		var tagGrp = tagsObj[tagGrpName];

		var divider1 = wTag.add('panel');
		divider1.alignment = 'fill';

		var mainGrp = wTag.add('group');
		mainGrp.orientation = 'column';
		mainGrp.spacing = 2;
		mainGrp.alignChildren = 'left';

		for (var m = 0; m < tagGrp.length; m++) {
			var tag = tagGrp[m][0];
			var ico = tagGrp[m][1];

			var subGrp = mainGrp.add('group');
			var tagBtn = subGrp.add('iconbutton', iconTogSize, ico.light, { style: 'toolbutton', name: tag });
			var tagTxt = subGrp.add('statictext', undefined, tag);
			tagBtn.helpTip = '\'' + tag + '\' comp comment tag';

			//---------------------------------------------------------

			tagBtn.onClick = function () {

				if (app.project.selection.length == 0) return;

				for (var i = 0; i < app.project.selection.length; i++) {
					if (app.project.selection[i] instanceof CompItem || app.project.selection[i] instanceof FootageItem) {
						app.project.selection[i].comment = this.properties.name;
					}
				}
			};

			// //---------------------------------------------------------

			// tagBtn.addEventListener('click', function (c) {
			// 	if (c.button == 2) {

			// 		if (app.project.selection.length == 0) return;

			// 		for (var i = 0; i < app.project.selection.length; i++) {
			// 			app.project.selection[i].comment = '';
			// 		}
			// 	}
			// });

			// //---------------------------------------------------------

			if (tagGrpName == 'promoTags') setTxtColor(tagTxt, mainColors[4]);
			if (tagGrpName == 'multiTags') setTxtColor(tagTxt, mainColors[9]);

			// //---------------------------------------------------------

			// if (tagGrpName == 'promoTags') {
			// 	setTxtColor(tagTxt, mainColors[10]);

			// 	tagBtn.onClick = function () {

			// 		if (app.project.selection.length == 0) return;

			// 		for (var i = 0; i < app.project.selection.length; i++) {
			// 			if (!(app.project.selection[i] instanceof CompItem)) continue;
			// 			app.project.selection[i].comment = this.properties.name;
			// 		}
			// 	};
			// }

			// //---------------------------------------------------------

			// if (tagGrpName == 'promoTags') {
			// 	setTxtColor(tagTxt, mainColors[10]);

			// 	tagBtn.onClick = function () {

			// 		if (app.project.selection.length == 0) return;

			// 		for (var i = 0; i < app.project.selection.length; i++) {
			// 			if (!(app.project.selection[i] instanceof CompItem)) continue;

			// 			app.project.selection[i].comment = this.properties.name;
			// 		}
			// 	};
			// }
		}
	}

	//---------------------------------------------------------

	tagCustomTxt.onEnterKey = function () {
		if (app.project.selection.length == 0) return;

		for (var i = 0; i < app.project.selection.length; i++) {
			if (app.project.selection[i] instanceof CompItem || app.project.selection[i] instanceof FootageItem) {
				app.project.selection[i].comment = this.text.toUpperCase();
				this.text = this.text.toUpperCase();
			}
		}
	};
	tagCustomBtn.onClick = function () {
		if (app.project.selection.length == 0) return;

		for (var i = 0; i < app.project.selection.length; i++) {
			if (app.project.selection[i] instanceof CompItem || app.project.selection[i] instanceof FootageItem) {
				app.project.selection[i].comment = tagCustomTxt.text.toUpperCase();
				tagCustomTxt.text = tagCustomTxt.text.toUpperCase();
			}
		}
	};

	wTag.show();
}
