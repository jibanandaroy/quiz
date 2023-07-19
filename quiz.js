let url = "https://opentdb.com/api.php?amount=1";

let check = document.getElementById("check-answer");
let correctNumber = 0;
let inCorrectNumber = 0;


let loadQuestion = () =>{
    fetch(url)
    .then((data) =>{
        return data.json();
    })
    .then((data) =>{
        displayQuestion(data.results);
    })
}

let displayQuestion = (question) =>{
    question.forEach(que => {
        console.log(question);
        
        correctAnswer = que.correct_answer;

        let possibleAnswer = que.incorrect_answers;

        possibleAnswer.splice(Math.random() * 3, 0, correctAnswer);
        questionHTML(que,possibleAnswer);

    });

}



let questionHTML = (que,possibleAnswer) =>{
    
    const queHTML = document.createElement("div");
    queHTML.classList.add("col-12");
    queHTML.innerHTML = `
            <div class="row justify-content-between heading">
                <p class="category">Category: ${que.category}</p>
               
            </div>
            <p>${que.question}</p>
        `
    const answerDiv = document.createElement("div");
    answerDiv.classList.add(
        "questions",
        "row",
        "justify-content-around",
        "mt-4"
    )

    possibleAnswer.forEach(answer =>{
        const answerHTML = document.createElement("li");
        answerHTML.classList.add("col-12", "col-md-5");
        answerHTML.textContent = answer;

        answerHTML.onclick = selectAnswer;
        answerDiv.appendChild(answerHTML);
    })
    queHTML.appendChild(answerDiv);
    document.querySelector("#app").appendChild(queHTML);

}

selectAnswer = (e) => {
    if(document.querySelector(".active")){
        const activeAnswer = document.querySelector(".active");
        activeAnswer.classList.remove("active");
    }
    e.target.classList.add("active")
}


let validAnswer = (e) =>{
    if(document.querySelector(".active"))
    {
        checkAnswer();
        resultCount();
    }
    
}

let checkAnswer = () =>{
    const answer = document.querySelector(".questions .active");

    if(answer.textContent === correctAnswer)
    {
        correctNumber++;
    }else{
        inCorrectNumber++;
    }

    const app = document.querySelector("#app");
    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }

    loadQuestion();
    
}



let resultCount = () =>{
    const queHTML = document.createElement("div");

    queHTML.classList.add("totals");

    queHTML.innerHTML = `
    
       <span class="badge badge-success">${correctNumber}</span>
       <span class="badge badge-danger">${inCorrectNumber}</span>
       
    `
    document.querySelector("#app").appendChild(queHTML);
   
}

check.addEventListener('click', validAnswer)

document.addEventListener("DOMContentLoaded", function(){
    loadQuestion();
    resultCount();

})