var canvas;
var score;
var actionForSpace;
var playerObj;
var mainInterval;

var moveDirection   = [];
var enemies         = [];
var stars           = [];
var highscores      = [];
var enemy_count     = 10;

var canvasSettings = {
    background: "#222",
    height:     400,
    width:      500
};

var arrow = {
    left:   37,
    up:     38,
    right:  39,
    down:   40,
    space:  32,
    enter:  13
};



function init() {
    canvas = document.getElementById("dodgerCanvas").getContext("2d");
    score = 0;
    playerObj = new player(canvasSettings.width / 2 - 22, canvasSettings.height - 40);

    createEnemies();
    createStars();
}

function random_StartX() {
    return Math.floor((Math.random() * canvasSettings.width) + 1);
}

function random_StartY() {
    return -1 * Math.floor((Math.random() * 200) + 1);
}

function write_Scrore() {
    canvas.fillStyle = "white";
    canvas.font = "bold 16px Arial";
    canvas.fillText("Score: " + score, 5, 16 + 5);
}

function rect(x, y, w, h) {
    canvas.beginPath();
    canvas.rect(x, y, w, h);
    canvas.closePath();
    canvas.fill();
    canvas.stroke();
}

// Array Remove - By John Resig (MIT Licensed)
// http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

// http://stackoverflow.com/questions/202605/repeat-string-javascript
String.prototype.repeat = function (num) {
    return new Array(num + 1).join(this);
};

function createEnemies() {
    var additional = Math.floor(score / 3000);
    var leftToCreate = (additional + enemy_count) - enemies.length;

    if (leftToCreate > 0) {
        for (var i = enemies.length; i < enemy_count + additional; i++) {
            enemies.push(new enemy(random_StartX(), random_StartY()));
        }
    }
}

function createStars() {
    var leftToCreate = 100 - stars.length;

    if (leftToCreate > 0) {
        for (var i = stars.length; i < 100; i++) {
            stars.push(new star(random_StartX(), random_StartY()));
        }
    }
}

function detectHits(key, x, y) {
    var enemyRect = {
        x:      x,
        y:      y,
        width:  enemies[key].width,
        height: enemies[key].height
    };

    var playerRect = {
        x:      playerObj.x,
        y:      playerObj.y,
        width:  playerObj.width,
        height: playerObj.height
    };

    if (rectOverlap(enemyRect, playerRect)) {
        clearInterval(mainInterval);
        clear();
        var name = prompt("You died.\n\nPlease enter your name", "Forkenator");

        if ( name === null ) {
            name = "Forkenator";
        }

        submitHighscores(name);
    }

}

function rectOverlap(A, B) {
    var xOverlap = valueInRange(A.x, B.x, B.x + B.width) || valueInRange(B.x, A.x, A.x + A.width);
    var yOverlap = valueInRange(A.y, B.y, B.y + B.height) || valueInRange(B.y, A.y, A.y + A.height);

    return xOverlap && yOverlap;
}

function valueInRange(value, min, max) {
    return (value <= max) && (value >= min);
}

function draw_enemies() {
    $.each(enemies, function (key, value) {

        // Update the location of the 'enemies'
        enemies[key].move();
        detectHits(key, enemies[key].x, enemies[key].y);

        if (enemies[key].y > canvasSettings.height) {
            enemies.remove(key);
            createEnemies();
        }

        // Draw!
        canvas.drawImage(enemies[key].image, enemies[key].x, enemies[key].y);

    });
}

function drawStars() {
    $.each(stars, function (key, value) {

        // Update the location of the 'enemies'
        stars[key].move();

        if (stars[key].y > canvasSettings.height) {
            stars.remove(key);
            createStars();
        }

        // Draw!
        canvas.drawImage(stars[key].image, stars[key].x, stars[key].y);

    });
}

function draw() {
    clear();

    score += 2;
    canvas.fillStyle = canvasSettings.background;
    rect(0, 0, canvasSettings.width, canvasSettings.height);

    drawStars();

    canvas.drawImage(playerObj.image, playerObj.x, playerObj.y);

    movePlayer();
    draw_enemies();
    write_Scrore();
}

function movePlayer() {

    // Force player height and width to update
    playerObj.move("update");

    $.each(moveDirection, function (key, value) {
        playerObj.move(value);

        if (playerObj.x < 0) {
            playerObj.x = 0;
        }
        if (playerObj.y < 0) {
            playerObj.y = 0;
        }
        if (playerObj.x > canvasSettings.width - playerObj.width) {
            playerObj.x = canvasSettings.width - playerObj.width;
        }
        if (playerObj.y > canvasSettings.height - playerObj.height) {
            playerObj.y = canvasSettings.height - playerObj.height;
        }
    });
}

function removePlayDirection(direction) {
    $.each(moveDirection, function (key, value) {
        if (value == direction) {
            moveDirection.remove(key);
        }
    });
}

function addPlayDirection(direction) {
    var exists = false;

    $.each(moveDirection, function (key, value) {
        if (value == direction) {
            exists = true;
        }
    });

    if (exists !== true) {
        moveDirection.push(direction);
    }
}

function clear() {
    canvas.clearRect(0, 0, canvasSettings.width, canvasSettings.height);
}

function fadeIntro() {
    var text = "Forksteroids";
    var alpha = 0.0;
    interval = setInterval(function () {
        clear();
        canvas.fillStyle = "rgba(174, 174, 174, " + alpha + ")";
        canvas.font = "bold 30pt Arial";
        alpha = alpha + 0.02;

        canvas.fillText(text, canvasSettings.width / 2, canvasSettings.height / 2);

        if (alpha > 1) {
            clearInterval(interval);
            alpha = 0.0;
            interval = setInterval(function () {
                clear();
                canvas.fillStyle = "rgba(174, 174, 147, 1)";
                canvas.font = "bold 30pt Arial";
                canvas.fillText("Forksteroids", canvasSettings.width / 2, canvasSettings.height / 2);

                canvas.fillStyle = "rgba(82, 93, 136, " + alpha + ")";
                canvas.font = "10pt Arial";
                alpha = alpha + 0.02;

                canvas.fillText("A jCode project", canvasSettings.width / 2 + 3, canvasSettings.height / 2 + 15);

                if (alpha > 1) {
                    clearInterval(interval);
                    mainInterval = setInterval(displayOptions, 10);
                }
            }, 50);
        }
    }, 50);
}

function displayOptions() {
    clear();
    drawStars();
    actionForSpace = "startMenu";

    canvas.fillStyle = "rgba(174, 174, 147, 1)";
    canvas.font = "bold 30pt Arial";
    canvas.fillText("Forksteroids", canvasSettings.width / 2, canvasSettings.height / 2);

    canvas.fillStyle = "rgba(82, 93, 136, 1)";
    canvas.font = "10pt Arial";
    canvas.fillText("A jCode project", canvasSettings.width / 2 + 3, canvasSettings.height / 2 + 15);

    canvas.fillStyle = "rgba(201, 201, 201, 0.9)";
    canvas.font = "12pt Arial";

    canvas.fillText("[Space] start game", canvasSettings.width / 2 + 3, canvasSettings.height / 2 + 45);

    canvas.font = "8pt Arial";
    canvas.fillText("Use the arrow keys to move", canvasSettings.width / 2 + 3, canvasSettings.height / 2 + 60);


    canvas.font = "bold 10pt Arial";
    canvas.fillText("High Scores", 20, canvasSettings.height / 2 - 20);


    canvas.font = "8pt COURIER";

    var startPos = canvasSettings.height / 2 - 5;

    $.each(highscores, function (bb) {
        var scoreString = "";
        var rep = 16 - highscores[bb].name.length;

        scoreString += highscores[bb].id + ". ";
        scoreString += highscores[bb].name;
        scoreString += " ".repeat(rep);
        scoreString += highscores[bb].score;

        canvas.fillText(scoreString, 20, startPos);

        startPos += 10;
    });

}

function getHighscores() {
    var xhr = $.ajax({
        type: 'GET',
        url: 'php/json.php',
        data: 'highscores',
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            $.each(response, function (bb) {
                var score = {
                    id: bb + 1,
                    time: response[bb].dateTime,
                    name: response[bb].name,
                    score: response[bb].score
                };

                highscores.push(score);
            });
        }
    });
}

function submitHighscores(user) {
    var xhr = $.ajax({
        type: 'GET',
        url: 'php/json.php',
        data: 'user=' + user + "&score=" + score,
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            document.location.reload(true);
        }
    });
}

function spacebarPressed() {
    switch (actionForSpace) {
        case "startMenu":
            clearInterval(mainInterval);
            clear();
            mainInterval = setInterval(draw, 10);
            break;

        default:
            // Nothing
            break;
    }

    actionForSpace = "";
}

$(document).ready(function () {
    init();
    getHighscores();
    fadeIntro();

    $(document).keydown(function (e) {
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case arrow.left:
                addPlayDirection("left");
                break;
            case arrow.up:
                addPlayDirection("up");
                break;
            case arrow.right:
                addPlayDirection("right");
                break;
            case arrow.down:
                addPlayDirection("down");
                break;
        }
    });
    $(document).keyup(function (e) {
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case arrow.left:
                removePlayDirection("left");
                break;
            case arrow.up:
                removePlayDirection("up");
                break;
            case arrow.right:
                removePlayDirection("right");
                break;
            case arrow.down:
                removePlayDirection("down");
                break;
            case arrow.space:
                spacebarPressed();
                break;
        }
    });
});