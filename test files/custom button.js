function themeButton(parentGroup, params) {
	var newBtn = parentGroup.add('customButton', undefined, "");
	newBtn.width = params.width;
	newBtn.height = params.height;
	newBtn.text = params.text;
	newBtn.color = params.color;

	newBtn.preferredSize.height = newBtn.height;
	newBtn.preferredSize.width = newBtn.width;

	drawThemeButton(newBtn, false);

	newBtn.addEventListener('mouseover', function () {
		drawThemeButton(this, true);
	});

	newBtn.addEventListener('mouseout', function () {
		drawThemeButton(this, false);
	});

	return newBtn;
}

function drawThemeButton(button, hover) {
	var g = button.graphics;
	var fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, [button.color[0] / 255, button.color[1] / 255, button.color[2] / 255, 1]);
	var textSize = g.measureString(button.text);
	var textPen = g.newPen(g.PenType.SOLID_COLOR, [0 / 255, 0 / 255, 0 / 255, 1], 1);

	if (hover) {
		textPen = g.newPen(g.PenType.SOLID_COLOR, [255 / 255, 255 / 255, 255 / 255, 1], 1);
		fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, [button.color[0] / 255, button.color[1] / 255, button.color[2] / 255, 1]);
	}

	button.onDraw = function () {
		drawRoundedRect(g, fillBrush, this.width, this.height, 30, 0, 0);
		g.drawString(button.text, textPen, (this.width - textSize.width) / 2, this.height / 2 - textSize.height);
	}
}

function drawRoundedRect(g, brush, width, height, cornerRadius) {
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
		[0, 0 + (cornerRadius / 2)],
		[(cornerRadius / 2), 0],
		[width - (cornerRadius / 2), 0],
		[width, 0 + (cornerRadius / 2)],
		[width, height - (cornerRadius / 2)],
		[width - (cornerRadius / 2), height],
		[(cornerRadius / 2), height],
		[0, height - (cornerRadius / 2)]
	];

	for (var i = 0; i < coords.length; i++) {

		if (i === 0) {
			g.moveTo(coords[i][0], coords[i][1]);
		} else {
			g.lineTo(coords[i][0], coords[i][1]);
		}
	}
	g.fillPath(brush);
}

var win = new Window("palette");

var blueButton = new themeButton(win, {
	width: 120,
	height: 35,
	text: "My Blue Button",
	color: [0, 152, 255]
});

var greenButton = new themeButton(win, {
	width: 200,
	height: 35,
	text: "My Green Button",
	color: [137, 232, 89]
});

win.show();