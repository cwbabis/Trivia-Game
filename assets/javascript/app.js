    var number = 31;
    var intervalId;
    var buzzer = new Audio("assets/soundfiles/Buzzer.mp3");

    // video tut
    var pos = 0, test, test_status, question, choice, choices, chA, chB, chC,chD, correct = 0;
    var questions = [
        ["What is 10 + 4?",
         "12", "14", "16", "5", "B"],
        ["What is 20 - 9?", 
         "7", "13", "11", "5", "C"],
        ["What is 7 x 3?",
         "21", "24", "25", "5", "A"],
        ["What is 8 / 2?",
         "10", "2", "4", "5", "C"]
    ];
    function _(x) {
        return document.getElementById(x);
    }
    function renderQuestion() {
        test = _("test");
        if (pos >= questions.length) {
            test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct.</h2>";
            _("test_status").innerHTML = "Nicely Done!";
            pos = 0;
            correct = 0;
            stop();
            return false;

        }
        _("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;
        question = questions[pos][0];
        chA = questions[pos][1];
        chB = questions[pos][2];
        chC = questions[pos][3];
        chD = questions[pos][4];
        test.innerHTML = "<h3>" + question + "</h3>";
        test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
        test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
        test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br>";
        test.innerHTML += "<input type='radio' name='choices' value='D'> " + chD + "<br><br>";
        test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
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

        var intervalId = setTimeout(timeUp, 1000 * 31);
    
    function run() {

        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    function decrement() {
        number--;
        //double quotes then single quotes or it gets fucked up.. 
        //took me like and hour to figure out why it wasn't displaying correctly ffs.
        $("#number-countdown").text('Time Remaining: ' + number);
        if (number === 0) {
            stop();
        }
    }
    function stop() {
        clearInterval(intervalId);
    }
    function timeUp() {
        $("#number-countdown").append("<h2>You Ran Out of Time!</h2>");

        buzzer.play();
    }
    run();