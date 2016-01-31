var gametes = gametes || {};

gametes.LoseScreen = function() {};

gametes.LoseScreen.prototype = {
	create: function() {
		this.game.stage.backgroundColor = "#AFFA91";

		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" },
			loseText = "You've made a truly disgusting child. Better Luck next time.\nClick to try again."

	    //  The Text is positioned at 0, 100
	    text = this.game.add.text(0, 0, loseText, style);
	    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	    text.setTextBounds(0, 100, this.game.width, 100);

	    this.game.input.onDown.add(this.restart, this);
	},
	restart: function() {
		this.state.start('Game');
	}
}