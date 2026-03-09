// =================== VARIABLES ===================
let categoryID = null;

let questionBank = [
  {
    question: "In Naruto, who becomes the 7th Hokage?",
    answer: "Naruto Uzumaki"
  },
  {
    question: "In One Piece, what is Luffy’s dream?",
    answer: "To become the Pirate King"
  },
  {
    question: "In One Piece, what is the name of Luffy’s ship?",
    answer: "Thousand Sunny"
  },
  {
    question: "In My Hero Academia, what is Deku's quirk?",
    answer: "One For All"
  }
];

let questionIndex = 0;

// =================== MILESTONE 3 ===================
// Show/hide answer
function toggleShowAnswer() {
  const answerT = document.querySelector(".answers");
  const btn = document.querySelector(".show-answer-btn");

  answerT.classList.toggle("hidden");

  if (answerT.classList.contains("hidden")) {
    btn.textContent = "Show Answer";
  } else {
    btn.textContent = "Hide Answer";
  }
}

// Populate question & answer
function populateQuestion() {
  const questionT = document.querySelector(".question-text");
  const answerT = document.querySelector(".answer-text");

  const currentQA = questionBank[questionIndex];
  questionT.innerHTML = currentQA.question;
  answerT.innerHTML = currentQA.correct_answer;

  // Make sure the answer is hidden when a new question is shown
   document.querySelector(".answers").classList.add("hidden");
  document.querySelector(".show-answer-btn").textContent = "Show Answer";
}

// =================== MILESTONE 4 ===================
// Next question
async function getQuestionRandom() {
  const response = await fetch('https://opentdb.com/api.php?amount=10')
  const data= await response.json()
  storeNewQuestions(data)
}
function storeNewQuestions(data){
questionBank = data.results;
questionIndex = 0;
populateQuestion();
}

function getNextQuestion() {
  const answersDiv = document.querySelector(".answers");
const btn = document.querySelector(".show-answer-btn");

  // Hide answer for the next question
  answersDiv.classList.add("hidden");
  btn.textContent = "Show Answer";

  // Increment index, loop back if at end
  questionIndex++;
  if (questionIndex >= questionBank.length) {
    categoryID ? getQuestionsByCategory() : getQuestionRandom();

  }else {
    populateQuestion();
  }

  
}
//====================Milestone 5==========================//
async function getCategories() {
  const response = await fetch('https://opentdb.com/api_category.php')
  const data = await response.json()
  appendAllCategoriesToHTML(data.trivia_categories)
}
function appendAllCategoriesToHTML(categories) {
  const categoriesUL = document.querySelector('.categories ul');
  categoriesUL.innerHTML = '';
  
  categories.slice(0, 5).forEach(category => {
    appendCategory(category);
  });
}
function appendCategory(category) {
  const categoriesUL = document.querySelector('.categories ul');
  
  const button = document.createElement('button');
  button.textContent = category.name;
  button.id = category.id;
  
  const li = document.createElement('li');
  li.appendChild(button);
  categoriesUL.appendChild(li);
}
// =================== MILESTONE 6 ===================//
function handleCategoryClick(event) {
  categoryID = event.target.id;
  highlightCategoryButton(event.target);
  getQuestionsByCategory();
}
async function getQuestionsByCategory() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&category=' + categoryID)
  const data = await response.json()
  storeNewQuestions(data)
}
function highlightCategoryButton(button) {
  const allButtons = document.querySelectorAll('.categories button');
  allButtons.forEach(btn => {
    btn.classList.remove('selected');
  });
  button.classList.add('selected');
}
// =================== EVENT LISTENERS ===================
document.querySelector(".show-answer-btn").addEventListener("click", toggleShowAnswer);
document.querySelector(".next-question-btn").addEventListener("click", getNextQuestion);
document.querySelector('.categories ul').addEventListener('click', handleCategoryClick);
// =================== INITIALIZE ===================
getQuestionRandom();
getCategories();