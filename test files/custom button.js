var win = new Window("palette");
var button = win.add("customButton", [0, 0, 100, 30]);
button.text = "teste";

button.onDraw = function () {
	var g = this.graphics;
	var blueBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0 / 255, 152 / 255, 255 / 255, 1]);
	var blackPen = g.newPen(g.PenType.SOLID_COLOR, [0 / 255, 0 / 255, 0 / 255, 1], 1);
	var textSize = g.measureString(button.text);
	drawRoundedRect(g, blueBrush, this.size.width, this.size.height, 25, 0, 0);
	g.drawString(button.text, blackPen, (this.size.width - textSize.width) / 2, this.size.height / 2 - textSize.height);
}

function drawRoundedRect(g, brush, width, height, cornerRadius, x, y) {
	g.newPath();
	g.ellipsePath(x, y, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(width - x - cornerRadius, y, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(width - x - cornerRadius, height - y - cornerRadius, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.ellipsePath(x, height - y - cornerRadius, cornerRadius, cornerRadius);
	g.fillPath(brush);
	g.newPath();

	var coords = [x, y + (cornerRadius / 2),
		x + (cornerRadius / 2),
		y,
		width - x - (cornerRadius / 2),
		y,
		width - x,
		y + (cornerRadius / 2),
		width - x,
		height - y - (cornerRadius / 2),
		width - x - (cornerRadius / 2),
		height - y,
		x + (cornerRadius / 2),
		height - y,
		x,
		height - y - (cornerRadius / 2)
	];

	for (var i = 0; i <= coords.length - 1; i += 2) {
		if (i === 0) {
			g.moveTo(coords[i], coords[i + 1]);
		} else {
			g.lineTo(coords[i], coords[i + 1]);
		}
	}
	g.fillPath(brush);
}

win.show();