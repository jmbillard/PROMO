var win = new Window("palette");
var button = win.add("customButton", [0, 0, 100, 30]);
button.text = "teste";

button.onDraw = customBtnDraw(button);

function customBtnDraw(btn) {
	var g = btn.graphics;
	var blackPen = g.newPen(g.PenType.SOLID_COLOR, [0 / 255, 0 / 255, 0 / 255, 1], 1);
	var textSize = g.measureString(btn.text);
	drawRoundedRect(btn, btn.size.width, btn.size.height, 25);
	g.drawString(btn.text, blackPen, (btn.size.width - textSize.width) / 2, btn.size.height / 2 - textSize.height);
}

function drawRoundedRect(btn, width, height, cornerRadius, x, y) {
	var g = btn.graphics;
	var brush = g.newBrush(g.BrushType.SOLID_COLOR, [0 / 255, 152 / 255, 255 / 255, 1]);

	g.newPath();
	g.ellipsePath(0, 0, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(width - cornerRadius, 0, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(width - cornerRadius, height - cornerRadius, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(0, height - cornerRadius, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.newPath();

	var coords = [
		[0, cornerRadius / 2],
		[cornerRadius / 2, 0],
		[width - (cornerRadius / 2), 0],
		[width, cornerRadius / 2],
		[width, height - (cornerRadius / 2)],
		[width - (cornerRadius / 2), height],
		[cornerRadius / 2, height],
		[0, height - (cornerRadius / 2)]
	];

	for (var i = 0; i < coords.length; i++) {
		if (i === 0) {
			g.moveTo(coords[i]);
		} else {
			g.lineTo(coords[i]);
		}
	}
	g.fillPath(brush);
}

win.show();