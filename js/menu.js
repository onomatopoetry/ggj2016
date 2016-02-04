var gametes = gametes || {};

gametes.Menu = function() {};

gametes.Menu.prototype = {
	preload: function () {
		this.game.load.spritesheet('sperm', 'assets/sperm.png', 19, 55);
		this.game.load.spritesheet('egg', 'assets/egg.png', 77, 90);
	},
	create: function() {
		this.game.stage.backgroundColor = "#EEEEEE";

		var headerStyle = { font: "bold 72px Arial", fill: "#76B7CC", boundsAlignH: "center", boundsAlignV: "middle" },
			headerText = this.game.add.text(0, 0, "<3 Bundle of Love <3", headerStyle);

		headerText.setTextBounds(0, 20, this.game.width, 100);

		var style = { font: "bold 22px Arial", boundsAlignV: "middle" },
			eggInstructions = "Player 1 uses the WASD keys to change which side of the egg is open to\n" +
							"sperm. The three blue-ish sides are shielded, and the egg is looking at its\n" +
							"open side. Let player 2 in to win.";
			eggInstructionText = this.game.add.text(240, 150, eggInstructions, style),

			spermInstructions = "Player 2 has to figure out which sperm they are, and then use the right and\n" +
								"left arrow keys to guide that sperm into the open side of the egg.";

			spermInstructionText = this.game.add.text(240, 320, spermInstructions, style);

		var eggSprite = this.game.add.sprite(70, 150, 'egg'),
			spermSprite = this.game.add.sprite(100, 330, 'sperm');

		eggSprite.animations.add('loop', null, 1, true);
		eggSprite.animations.play('loop');

		spermSprite.animations.add('loop', null, 10, true);
		spermSprite.animations.play('loop');

		var playBtn = this.game.add.group(),
			btnBackground = this.game.add.graphics(this.game.world.centerX, this.game.world.height - 100);
			btnTextStyle = { font: "bold 60px Arial", fill:"#FFF", boundsAlignH: "center"},
			btnText = this.game.add.text(this.game.world.centerX - 150, this.game.world.height - 130, "PLAY", btnTextStyle);

		btnText.setTextBounds(0, 0, 300, 60);

		btnBackground.beginFill(0x76B7CC);
		btnBackground.drawRoundedRect(-150, -30, 300, 60);

		playBtn.add(btnBackground);
		playBtn.add(btnText);

		this.game.input.onDown.add(this.begin, this);
	},
	begin: function() {
		this.game.input.onDown.remove(this.begin);
		this.state.start('Game');
	}
}