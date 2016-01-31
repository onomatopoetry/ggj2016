var gametes = gametes || {};

gametes.WinScreen = function() {};

gametes.WinScreen.prototype = {
	preload: function() {
		this.game.load.image('winBaby', 'assets/win_baby.png');
	},
	create: function() {
		this.game.stage.backgroundColor = "#91E0FA";

		var style = { font: "bold 32px Arial", boundsAlignH: "center", boundsAlignV: "middle" },
			winText = "You are a beautiful baby! Congratulations!\nClick to play again."

	    text = this.game.add.text(0, 0, winText, style);
	    text.setTextBounds(0, 0, this.game.width, 100);

	    this.game.add.sprite((this.game.world.width - this.game.cache.getImage('winBaby').width)/2, 120, 'winBaby');

	    this.game.input.onDown.add(this.restart, this);
	},
	restart: function() {
		this.state.start('Game');
	}
}