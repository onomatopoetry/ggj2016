var gametes = gametes || {};

gametes.WinScreen = function() {};

gametes.WinScreen.prototype = {
	create: function() {
		this.game.stage.backgroundColor = "#91E0FA";

		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" },
			winText = "You are a beautiful baby! Congratulations!\nClick to try again."

	    //  The Text is positioned at 0, 100
	    text = this.game.add.text(0, 0, winText, style);
	    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	    text.setTextBounds(0, 100, this.game.width, 100);

	    this.game.input.onDown.add(this.restart, this);
	},
	restart: function() {
		this.state.start('Game');
	}
}