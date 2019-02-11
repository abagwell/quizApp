var questionShown;
var userScore;
var questionPoints;

var questionList = [
	"Which language is used for styling web pages?",
	"Which programming language is not object oriented?",
	"MVC is a _____.",
	"There are _____ main components of object oriented programming?", 
	"Which language is used for web apps?"
];

var choices = [["HTML", "JQuery", "CSS", "XML"], ["Java", "C#", "C++", "C"], ["Language", "Library", "Framework", "All"],
["1", "6", "2", "4"],["PHP", "Python", "Javascript", "All"]]

var answers = ["CSS", "C", "Framework", "4", "All"];


window.onload = loadQuestion();

window.onbeforeunload = function() {

	console.log("triggered")
	sessionStorage.setItem('questionNum', questionShown);
	sessionStorage.setItem('quizScore', userScore);
	sessionStorage.setItem('quizQuestionPoints', questionPoints);
	loadQuestion();
}





function loadQuestion() {

	//check local storage to get current question 

	questionShown = Number(sessionStorage.getItem('questionNum'));
	userScore = Number(sessionStorage.getItem('quizScore'));
	questionPoints = Number(sessionStorage.getItem('quizQuestionPoints'));

	//handles the initial load of the app
	if (typeof questionShown === 'undefined') {

		questionShown = 0;
		userScore = 0;
		questionPoints = 4; 

	}


	let question = document.querySelector("#question");
	question.textContent = questionList[questionShown];
	let buttonList = document.querySelectorAll("button");

	for (choice in choices[questionShown]) {

		buttonList[choice].setAttribute("class", "btn-lg btn-primary btn-block")
		buttonList[choice].textContent = choices[questionShown][choice];
		buttonList[choice].addEventListener('click', checkAnswer, false);
	}

	let footer = document.querySelector("footer");

	if (questionShown > 4) {

		question.textContent = "Your score is " + userScore + " or " + (userScore/20 * 100) + "%";
		footer.textContent = "";
	}

	else {

		footer.textContent = "Question " + (questionShown + 1) +  " out of 5.";
	}


	

}


function checkAnswer() {

	let buttonClicked = window.event.target || window.event.srcElement;
	

	if (answers[questionShown] === buttonClicked.textContent) {

		userScore += questionPoints;
		questionShown++;
		sessionStorage.setItem('questionNum', questionShown);
		sessionStorage.setItem('quizScore', userScore);
		sessionStorage.setItem('quizQuestionPoints', 4);
		loadQuestion();
	}

	else {

		buttonClicked.setAttribute("class", "btn-lg btn-danger btn-block");

		if (questionPoints > 1) {

			questionPoints--;
		}

		else {

			questionPoints = 0; 
		}

		sessionStorage.setItem('quizQuestionPoints', questionPoints);
		
	}

}

function resetQuiz() {

	sessionStorage.setItem('questionNum', 0);
	sessionStorage.setItem('quizScore', 0);
	sessionStorage.setItem('quizQuestionPoints', 4);
	loadQuestion();
	//sessionStorage.clear();

}

