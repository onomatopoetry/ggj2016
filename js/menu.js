var gametes = gametes || {};

gametes.Menu = function() {};

gametes.Menu.prototype = {
	preload: function () {
		this.game.load.spritesheet('sperm', 'assets/sperm.png', 19, 55);
		this.game.load.spritesheet('egg', 'assets/egg.png', 77, 90);
	},
	create: function() {
		//TODO make an actual menu if there's time.
		this.state.start('Game');
	}
}