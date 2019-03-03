var number = 24;
var intervalId;
var buzzer = new Audio("assets/soundfiles/Buzzer.mp3");

var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
var questions = [
    ["What player scored the most points in one game?",
        "LeBron James", "Wilt Chamberlain", "Michael Jordan", "Larry Bird", "B"],
    ["What player has the highest career PPG?",
        "John Wall", "Kobe Bryant", "Michael Jordan", "Bradley Beal", "C"],
    ["What player has the most career personal fouls?",
        "Kareem Abdul-Jabbar", "Karl Malone", "Artis Gilmore", "Robert Parish", "A"],
    ["What player has the highest career 3-pt FG percentage?",
        "Larry Bird", "Bradley Beal", "Steve Kerr ", "Kobe Bryant", "C"]
];
function name(x) {
    return document.getElementById(x);
}
function renderQuestion() {
    test = name("test");
    if (pos == questions.length) {
        resultQuote();
    }
    else {
        showQuestion();
    }
}
function resultQuote() {

    if (correct < 3) {
        test.innerHTML = "<h2>You made " + correct + " of " + questions.length + " shots! </h2>";
        name("test_status").innerHTML = "Damn u suck";
    }
    else {
        test.innerHTML = "<h2>You made " + correct + " of " + questions.length + " shots! </h2>";
        name("test_status").innerHTML = "Way to ball out kid!";
    }
    pos = 0;
    correct = 0;
    stop();
}
function showQuestion() {
    //interdimensional array = super cool
    name("test_status").innerHTML = "Shot " + (pos + 1) + " of " + questions.length;
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    chD = questions[pos][4];
    // same as .append
    test.innerHTML = "<h3>" + question + "</h3>";
    test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='D'> " + chD + "<br><br>";
    test.innerHTML += "<button type='button'  class='btn btn-success buttonStart' onclick='checkAnswer()'>Shoot Your Shot</button>";
}
function checkAnswer() {
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    if (choice == questions[pos][5]) {
        correct++;
    }
    pos++;
    renderQuestion();
}
window.addEventListener("load", renderQuestion, false);

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    number = 24;
}
function decrement() {
    number--;
    renderClock();
    if (number === 0) {
        timeUp();
        $("#disabledButton").hide();
        $("#container").hide();
        $(".buttonStart").show();
        stop();

    }
}
function renderClock() {
    $("#number-countdown").text("Shot Clock: " + number);
}
function stop() {
    clearInterval(intervalId);
}
function timeUp() {
    $("#number-countdown").append("<h2>You Ran Out of Time!</h2>");
    buzzer.play();
    $("#disabledButton").hide();
}
$("#start").on("click", function () {
    $(this).hide();
    $("#countdownContainer").append("<h2 id='number-countdown'></h2>");
    $("#container").append("<h2 id='test_status'></h2>");
    $("#container").append("<div id='test'></div>");

    run();
    renderClock();
    renderQuestion();
})

/* Got super annoyed with this one.. for some reason, timers are hard for me to understand.
I need to review over them. I think the video I watched on youtube to help me set up the
questions form hurt me more than helped. The person didn't use any jQuery so when I wanted to
use it, it was very easy to mix up. "innerhtml" etc. It also made my code super clunky. Orignally I wanted to do it where
everytime you "shoot" an answer the shot clock resets but I was having a lot of trouble pulling that off.
I did learn something new in multidemensional arrays which is cool.

Some things that need to be fixed are.
1. adding a reset button when the timeUp function is called and actually getting that to reset elements.
2. When restarting the game jump back to position 0 in the array.
3. Some styling issue with my jumbotrons.
4. Hiding and showing elements when certain buttons are pressed.
5. Disabling buttons when certain elements are pressed.
*/