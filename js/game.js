

//Sperm class
var Sperm = function (game, x, y, rotation) {

    Phaser.Sprite.call(this, game, x, y, 'sperm');

    //initialize sprite properties and animations.
    this.anchor.x = 0.5;
	this.anchor.y = 0.21;
	this.rotation = rotation;
	this.animations.add('flagellate', [0, 1, 2, 3], 10, true);
	this.animations.play('flagellate');

	//initialize physics properties
	game.physics.arcade.enable(this);
	this.body.setSize(15, 15, 0, -5);
	this.body.maxAngular = 70;

	//sperm properties
	this.turnDirection = 0;

	//Sperm methods
	this.turn = function(direction) {
		this.turnDirection = direction;
	}
};
Sperm.prototype = Object.create(Phaser.Sprite.prototype);
Sperm.prototype.constructor = Sperm;
Sperm.prototype.update = function() {
	var velocity = this.body.angularVelocity;

	//accelerate rotation.
	if(this.turnDirection == 0) {
		//dampen angular velocity when there's no user input.
		this.body.angularAcceleration = -Math.abs(velocity)/velocity * Sperm.angularAcceleration;
	} else {
		this.body.angularAcceleration = this.turnDirection * Sperm.angularAcceleration;
	}

	//every update move the sperm in the direction it's facing.
	this.game.physics.arcade.velocityFromRotation(this.rotation - Math.PI/2, Sperm.speed, this.body.velocity);
}
//sperm constants
Sperm.speed = 40;
Sperm.angularAcceleration = 125;
Sperm.left = -1;
Sperm.right = 1;

//Egg class
var Egg = function (game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'egg');

	//initialize sprite properties and animations.
	this.anchor.set(0.5);
	this.animations.add(Egg.up, [0], 1, false);
	this.animations.add(Egg.right, [1], 1, false);
	this.animations.add(Egg.down, [2], 1, false);
	this.animations.add(Egg.left, [3], 1, false);

	//initialize egg physics
	game.physics.arcade.enable(this);
	this.body.immovable = true;

	//initialize egg variables
	this.unshieldedDirection = Egg.up;

	//Egg methods
	this.shieldDirection = function(direction) {
		this.unshieldedDirection = direction;
		this.animations.play(direction);
	}

};
Egg.prototype = Object.create(Phaser.Sprite.prototype);
Egg.prototype.constructor = Egg;
//egg constants
Egg.up = 'up';
Egg.right = 'right';
Egg.left = 'left';
Egg.down = 'down';
//the percentage of each side of the egg that is touchable when unshielded.
Egg.touchPercentage = 0.75;

var gametes = gametes || {};

gametes.Game = function() {};

gametes.Game.prototype = {
	create: function() {
		this.game.stage.backgroundColor = "#EEEEEE";
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//initialize sperm player
		this.playerSperm = new Sperm(this.game, this.game.world.centerX/2, this.game.world.centerY, Math.PI / 2);
		this.game.add.existing(this.playerSperm);

		//initialize egg player
		this.playerEgg = new Egg(this.game, this.game.world.centerX, this.game.world.centerY);
		this.game.add.existing(this.playerEgg);

		//initialize user input
		this.spermControls = this.game.input.keyboard.createCursorKeys();
		this.eggControls = this.game.input.keyboard.addKeys({
			up: Phaser.KeyCode.W,
			right: Phaser.KeyCode.D,
			down: Phaser.KeyCode.S,
			left: Phaser.KeyCode.A
		});
	},
	update: function() {
		//handle sperm input
		if(this.spermControls.left.isDown) {
			this.playerSperm.turn(Sperm.left);
		} else if(this.spermControls.right.isDown) {
			this.playerSperm.turn(Sperm.right);
		} else {
			this.playerSperm.turn(0);
		}

		//handle egg input
		if(this.eggControls.left.isDown) {
			this.playerEgg.shieldDirection(Egg.left);
		} else if(this.eggControls.up.isDown) {
			this.playerEgg.shieldDirection(Egg.up);
		} else if(this.eggControls.right.isDown) {
			this.playerEgg.shieldDirection(Egg.right);
		} else if(this.eggControls.down.isDown) {	
			this.playerEgg.shieldDirection(Egg.down);
		}

		this.game.physics.arcade.collide(this.playerSperm, this.playerEgg, this.collideSpermAndEgg, null, this);

		this.game.world.wrap(this.playerSperm, 15, false)
	},
	//collision functions
	collideSpermAndEgg: function(sperm, egg) {
		//determine what area of the egg the sperm is hitting.
		var touching = egg.body.touching,
			didEnterEgg = false;

		//did the sperm touch the egg in the middle of it's unshielded side?
		if(touching.up && egg.unshieldedDirection == Egg.up || touching.down && egg.unshieldedDirection == Egg.down) {
			didEnterEgg = egg.body.x + egg.body.width * (1 - Egg.touchPercentage) < sperm.body.x && egg.body.x + egg.body.width * Egg.touchPercentage > sperm.body.right;
		} else if(touching.right && egg.unshieldedDirection == Egg.right || touching.left && egg.unshieldedDirection == Egg.left) {
			didEnterEgg = egg.body.y + egg.body.height * (1 - Egg.touchPercentage) < sperm.body.y && egg.body.y + egg.body.height * Egg.touchPercentage > sperm.body.bottom;
		}

		if(didEnterEgg) {
			//If the player sperm entered the egg, you win! if it's not the player sperm, you lose.
			if(sperm == this.playerSperm) {
				this.state.start('WinScreen');
			} else {
				this.state.start('LoseScreen');
			}
		} else {
			//turn sperm around here.
			//TODO: this is super basic for now, if you have time make it better!
			sperm.rotation += Math.PI;
		}
	},
	//helper functions
	randomRotation: function() {
		//returns a number between 0 and 2pi
		return Math.random() * 2 * Math.PI;
	}
};