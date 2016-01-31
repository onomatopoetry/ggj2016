var gametes = gametes || {};

gametes.LoseScreen = function() {};

gametes.LoseScreen.prototype = {
	preload: function() {
		this.game.load.image('loseBaby', 'assets/lose_baby.png');
	},
	create: function() {
		this.game.stage.backgroundColor = "#AFFA91";

		var style = { font: "bold 32px Arial", boundsAlignH: "center", boundsAlignV: "middle" },
			loseText = "You've made a truly disgusting child. Better Luck next time.\nClick to try again."

	    text = this.game.add.text(0, 0, loseText, style);
	    text.setTextBounds(0, 20, this.game.width, 100);

	    this.game.add.sprite((this.game.world.width - this.game.cache.getImage('loseBaby').width)/2, 120, 'loseBaby');

	    this.game.input.onDown.add(this.restart, this);
	},
	restart: function() {
		this.state.start('Game');
	}
}