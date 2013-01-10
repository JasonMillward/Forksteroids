function player(x, y) {
    this.image = new Image();
    this.image.src = "./images/player.png";
    this.height = this.image.height;
    this.width = this.image.width;
    this.x = x;
    this.y = y;

    this.move = function (direction) {
        switch (direction) {
            case "up":
                this.y -= 3;
                break;
            case "down":
                this.y += 3;
                break;
            case "left":
                this.x -= 3;
                break;
            case "right":
                this.x += 3;
                break;
            default:
                break;
        }

        if (this.width == 0) {
            this.updatedimensions();
        }

    }

    this.updatedimensions = function () {
        this.height = this.image.height;
        this.width = this.image.width;
    }

}

function enemy(x, y) {
    this.image = new Image();
    this.image.src = "./images/fork.png";

    // Start x position
    this.startx = x;

    // Start y position
    this.y = y;



    // Speed at which the enemy 'falls'
    this.speed = Math.floor((Math.random() * 3) + 1);

    // Random offset for sine wave requency
    this.offset = Math.floor((Math.random() * 100) + 50);
    this.height = this.image.height;
    this.width = this.image.width;

    // Movement function
    this.move = function () {
        this.x = this.startx + (20 * Math.sin((this.y + this.offset) / 100));
        this.y += this.speed;
    };
}

function star(x, y) {
    // Start x position
    this.x = x;

    // Start y position
    this.y = y;

    // Speed at which the enemy 'falls'
    this.speed = Math.floor((Math.random() * 3) + 1);

    // Random offset for sine wave requency
    imageNumber = Math.floor((Math.random() * 2) + 1);

    this.image = new Image();
    this.image.src = "./images/stars/" + imageNumber + ".png";


    // Movement function
    this.move = function () {
        this.y += this.speed;
    };
}
