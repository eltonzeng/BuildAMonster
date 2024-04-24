let x = 0;
class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_whiteC.png");
        my.sprite.left_arm = this.add.sprite(this.bodyX - 90, this.bodyY, "monsterParts", "arm_whiteA.png");
        my.sprite.left_arm.flipX = true;
        my.sprite.right_arm = this.add.sprite(this.bodyX + 90, this.bodyY, "monsterParts", "arm_whiteA.png");
        my.sprite.left_leg = this.add.sprite(this.bodyX - 50, this.bodyY + 130, "monsterParts", "leg_whiteD.png");
        my.sprite.left_leg.flipX = true;
        my.sprite.right_leg = this.add.sprite(this.bodyX + 50, this.bodyY + 130, "monsterParts", "leg_whiteD.png");
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 60, "monsterParts", "eye_dead.png");
        my.sprite.mouth = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "mouthI.png");
        my.sprite.left_head_accessory = this.add.sprite(this.bodyX - 45, this.bodyY - 93, "monsterParts", "detail_blue_horn_large.png");
        my.sprite.left_head_accessory.flipX = true;
        my.sprite.right_head_accessory = this.add.sprite(this.bodyX + 45, this.bodyY - 93, "monsterParts", "detail_blue_horn_large.png");
        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "mouth_closed_happy.png");

        let F_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);    
        let S_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); 
        
        this.A_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Event input: show fangs
        F_Key.on('down', (key, event) => {                                              
            this.smileType = "Fang";
            my.sprite.smile.visible = false;
            my.sprite.mouth.visible = true;
        });

        // Event input: regular smile
        S_Key.on('down', (key, event) => {                                              
            this.smileType = "Smile";
            my.sprite.mouth.visible = false;
            my.sprite.smile.visible = true;
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        if (this.A_Key.isDown) {
            for(let i in my.sprite) {
                my.sprite[i].x -= 1;
            }
        }
        if (this.D_Key.isDown) {
            for(let i in my.sprite) {
                my.sprite[i].x += 1;
            }
        }
    }
}