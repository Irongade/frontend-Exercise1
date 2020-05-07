// *************FOLLOW THE NUMBERS*****************

let count = 0; // keeps track of questions
let pointScored = 0; // keeps track of scored points
const correctAnswers = []; // keeps track of answers

f = 0; // helps in selecting questions

const database = [
  {
    question: "What does CSS stand for?",
    firstOption: "Cascading Style Sheets",
    secondOption: "Computer Style Sheets",
    thirdOption: "Creative Style Sheets",
    fourthOption: "Colorful Style SHeets",
    answer: "a",
  },
  {
    question:
      "______ selector is used to specify a rule that binds to a particular unique element?",
    firstOption: "Name",
    secondOption: "Id",
    thirdOption: "Class",
    fourthOption: "Tag",
    answer: "b",
  },
  {
    question: "How do you insert a comment in a CSS file?",
    firstOption: " /* this is a comment /*",
    secondOption: " /* this is a comment */",
    thirdOption: " // this is a comment",
    fourthOption: " // this is a comment //",
    answer: "b",
  },
  {
    question: `var count = [1,,3] <br> What is your observation of this Javascript code?`,
    firstOption: `The omitted value takes "undefined" `,
    secondOption: "This results in an error",
    thirdOption: "This results in an exception",
    fourthOption: "The omitted value takes an integer value",
    answer: "a",
  },
  {
    question: `if (!a[i]) continue; <br> What happens?`,
    firstOption: "Skips the defined elements",
    secondOption: "Skips the existent elements",
    thirdOption: "Skips the null elements",
    fourthOption: "Skips the defined & existent elements",
    answer: "c",
  },
  {
    question:
      "The method or operator used to identify the array is __________?",
    firstOption: "isarrayType()",
    secondOption: "==",
    thirdOption: "===",
    fourthOption: "typeof",
    answer: "d",
  },
  {
    question: "JavaScript is a _______________ language?",
    firstOption: "Object-Oriented",
    secondOption: "High-level",
    thirdOption: "Assembly-language",
    fourthOption: "Object-Based",
    answer: "d",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    firstOption: " <style>",
    secondOption: " <script>",
    thirdOption: " <css>",
    fourthOption: " none of these",
    answer: "a",
  },
  {
    question:
      "Which of the following selects a normal, or small-caps face from a font family?",
    firstOption: " font-weight",
    secondOption: " font-synthesis",
    thirdOption: " font-variant",
    fourthOption: " font-kerning",
    answer: "c",
  },
  {
    question:
      "Which of the following value of cursor shows it as a pointing hand?",
    firstOption: " crosshair",
    secondOption: "default",
    thirdOption: "move",
    fourthOption: "pointer",
    answer: "d",
  },
];

function onMouseOver(i) {
  // this and onMouseOut function adds an hover property to the options, and the reason for using thus instead of css is
  // because of the peculiarity of the options shape, it required manual setting
  allDivs = document.querySelectorAll("div");
  var selectedDiv = allDivs[i].childNodes;

  selectedDiv[1].classList.add("leftHover");
  selectedDiv[3].classList.add("rightHover");
  selectedDiv[5].classList.add("hover");
}
function onMouseOut(i) {
  // read onMouseOver above
  allDivs = document.querySelectorAll("div");
  var selectedDiv = allDivs[i].childNodes;

  selectedDiv[1].classList.remove("leftHover");
  selectedDiv[3].classList.remove("rightHover");
  selectedDiv[5].classList.remove("hover");
}

function generateRandomArray() {
  //1
  // this function generates a non repeating array of numbers and stores it in ranNums which will be used later
  var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ranNums = [],
    i = nums.length,
    j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }
  return ranNums;
}

function beginQuiz() {
  //2
  // change display of homepage to none and that of quizpage to flex
  document.getElementById("home").style.cssText = "display: none;";
  document.getElementById("end").style.cssText = "display: none;";
  document.getElementById("quiz").style.cssText = "display: flex;";

  // initialize all variables to 0, call ranNums, call setQuestion
  pointScored = 0;
  ranNums = generateRandomArray();
  setQuestion();
}

function setQuestion() {
  //3

  // for every time this function is called iterate count and change the Question Count
  count++;
  document.getElementById("count").innerHTML = `${count} of 5`;

  // As long as Count(no of Questions) is not more than 5 then display a question
  if (count <= 5) {
    //this gets various non repeating number in the ranNums array(as f is iterated)
    randomNumber = ranNums[f];
    // f increases as the function is repeatedly called giving the next number in the ranNums array
    f++;

    // this gets a random question-answer object from the database and displays it to the options and questions element
    document.getElementById("currentQuestion").innerHTML =
      database[randomNumber].question;
    document.getElementById("option1").placeholder =
      database[randomNumber].firstOption;
    document.getElementById("option2").placeholder =
      database[randomNumber].secondOption;
    document.getElementById("option3").placeholder =
      database[randomNumber].thirdOption;
    document.getElementById("option4").placeholder =
      database[randomNumber].fourthOption;

    // this adds a fade-in class to allow the question and answer fade-in as it is being displayed
    document.getElementById("currentQuestion").classList.add("fade-in");

    // fade-in class for options
    fadeInputs = document.getElementsByClassName("options");
    for (var i = 0; i < fadeInputs.length; i++) {
      fadeInputs[i].classList.add("fade-in");
    }

    // gets the answer to the question above and pushes it to an array where it can be accessed later
    correctAnswer = database[randomNumber].answer;
    correctAnswers.push(correctAnswer);
  } else {
    // if the count is more than 5, end the quiz by calling endQuiz function
    endQuiz();
  }
}

function getAnswer(selectedOption, inputNo) {
  //4

  //this function is called anytime an option is selected as an answer

  // Firstly, remove the fade-in class, so it can be readded when a new question is shown
  document.getElementById("currentQuestion").classList.remove("fade-in");
  //remove fade-in class for options
  fadeInputs = document.getElementsByClassName("options");
  for (var i = 0; i < fadeInputs.length; i++) {
    fadeInputs[i].classList.remove("fade-in");
  }

  // then this function is called to see if the selected answer is correct
  isAnswerCorrect(selectedOption, inputNo);
}

function isAnswerCorrect(selectedOption, inputNo) {
  //5

  //For this function, its either the selected option is correct or not.
  // but Firstly, we have to get the selectedOption and the value of the options picked[inputNo]

  // the correct answer is gotten from the correctAnswers array where the answer was pushed to by the setQuestion function
  correctAnswer = correctAnswers[correctAnswers.length - 1];

  //then we crosscheck the selected option(which is a string representation of answer e.g "a" or "b") with the correct answer (also a string)

  if (selectedOption === correctAnswer) {
    //if the answer is correct, then display a green background
    //the inputNo is used to access the correct option, and change the background to green by swapping predefined classes

    allInputs = document.querySelectorAll("input");
    let selectedInput = allInputs[inputNo];
    selectedInput.classList.add("correctInput");
    selectedInput.classList.remove("optionsInput");

    //this gets the siblings and also changes them to green by swapping the predefined classes
    x = selectedInput.previousElementSibling;
    y = x.previousElementSibling;

    x.classList.add("rightCorrect");
    x.classList.remove("right");

    y.classList.add("leftCorrect");
    y.classList.remove("left");

    // then 20 points is added when the correct answer is picked and the value is immediately updated in the points div
    pointScored += 20;
    document.getElementById("yourScore").innerHTML = `${pointScored}`;

    //then the the green background must be removed after some time so it does not affect the nect question
    setTimeout(removeAnswerIndicator.bind(null, inputNo), 500);
    // then a new question is set after some time.
    setTimeout(setQuestion, 500);
  } else {
    //if the answer is wrong, then we first get the actual correct answer and turn the background to green

    if (correctAnswer === "a") {
      removeCorrectAnswerIndicator(0);
    } else if (correctAnswer === "b") {
      removeCorrectAnswerIndicator(1);
    } else if (correctAnswer === "c") {
      removeCorrectAnswerIndicator(2);
    } else if (correctAnswer === "d") {
      removeCorrectAnswerIndicator(3);
    }

    //then i also want to get the selected wrong answer and turn the background red

    allInputs = document.querySelectorAll("input");
    let selectedInput = allInputs[inputNo];
    selectedInput.classList.add("wrongInput");
    selectedInput.classList.remove("optionsInput");

    x = selectedInput.previousElementSibling;
    y = x.previousElementSibling;

    x.classList.add("rightWrong");
    x.classList.remove("right");

    y.classList.add("leftWrong");
    y.classList.remove("left");

    // then I also want get the selected wrong answer and turn it back from red to its original color before changing the color
    setTimeout(removeWrongAnswerIndicator.bind(null, inputNo), 500);

    //then a new question is called
    setTimeout(setQuestion, 500);
  }
}

function removeAnswerIndicator(inputNo) {
  //6

  //this also receives the inputNo parameter from the getAnswer function so it can correctly remove the answerindicator
  //so it accesses the option then it swaps the classes back to normal returning the previous background

  allInputs = document.querySelectorAll("input");
  let selectedInput = allInputs[inputNo];
  selectedInput.classList.add("optionsInput");
  selectedInput.classList.remove("correctInput");

  //same is done for the other siblings
  x = selectedInput.previousElementSibling;
  y = x.previousElementSibling;

  x.classList.add("right");
  x.classList.remove("rightCorrect");

  y.classList.add("left");
  y.classList.remove("leftCorrect");
}

function removeCorrectAnswerIndicator(i) {
  //7

  //this receives the i parameter representing the current option value, for example if the answer is "a" then the correct option have a value of 0(the first option element)
  // Hence by doing so, the correct option is selected and the background color is made green
  // by swapping predefined classes for the input and its elements

  allInputs = document.querySelectorAll("input");
  let selectedInput = allInputs[i];
  selectedInput.classList.add("correctInput");
  selectedInput.classList.remove("optionsInput");

  x = selectedInput.previousElementSibling;
  y = x.previousElementSibling;

  x.classList.add("rightCorrect");
  x.classList.remove("right");

  y.classList.add("leftCorrect");
  y.classList.remove("left");

  // then after sometime i want the green background to be removed so a new question can be displayed
  setTimeout(removeAnswerIndicator.bind(null, i), 500);
}

function removeWrongAnswerIndicator(inputNo) {
  //8

  //this gets the selected option using the inputNo and changes the background color back to normal
  allInputs = document.querySelectorAll("input");
  let selectedInput = allInputs[inputNo];
  selectedInput.classList.add("optionsInput");
  selectedInput.classList.remove("wrongInput");

  x = selectedInput.previousElementSibling;
  y = x.previousElementSibling;

  x.classList.add("right");
  x.classList.remove("rightWrong");

  y.classList.add("left");
  y.classList.remove("leftWrong");
}

function endQuiz() {
  //9

  document.getElementById("home").style.cssText = "display: none;";
  document.getElementById("quiz").style.cssText = "display: none;";
  document.getElementById("end").style.cssText = "display: flex;";

  console.log(pointScored);
  document.getElementById("finalScore").innerHTML = pointScored;
  // receive final pointScored, write it to endpage
  // then change display to none and change endPage display to flex
}

function playAgain() {
  //10
  document.getElementById("home").style.cssText = "display: none;";
  document.getElementById("quiz").style.cssText = "display: flex;";
  document.getElementById("end").style.cssText = "display: none;";
  count = 0;

  f = 0;
  pointScored = 0;
  document.getElementById("yourScore").innerHTML = pointScored;

  ranNums = generateRandomArray();
  setQuestion();

  // set all parameters back to zero and call setQuestion
}

function returnHome() {
  //11
  // change display to none , quizpage to none and homePage to flex.
  document.getElementById("home").style.cssText = "display: flex;";
  document.getElementById("quiz").style.cssText = "display: none;";
  document.getElementById("end").style.cssText = "display: none;";
  count = 0;
  pointScored = 0;
  document.getElementById("yourScore").innerHTML = pointScored;
  f = 0;
}
