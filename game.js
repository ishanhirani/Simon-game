let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let flag = 0;
let level = 0;

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//2nd step
function nextSequence() {

    userClickedPattern = [];

    //random number generator between 0-3
    let randomnumber = Math.floor(Math.random() * (4));
    let randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);

    //console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("#level_title").text(`LEVEL ${level}`);


}

//3rd step
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); //imp
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);

});

//1st step
$(document).keypress(function() {
    if (flag === 0) {
        flag = 1;
        nextSequence();
    }
});

//4th step
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);


        $("#level_title").text("Game Over, Press Any Key to Restart");
        gamePattern = [];
        userClickedPattern = [];
        flag = 0;
        level = 0;

    }

}