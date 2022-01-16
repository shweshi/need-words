const proxy = "https://api.allorigins.win/get?url=";
const api = "https://wantwords.thunlp.org/EnglishRD";

const errors = document.querySelector(".errors");
const button = document.querySelector(".search-btn");
const results = document.querySelector(".results");
const resultContainer = document.querySelector(".result-container");

resultContainer.style.display = "none";

errors.textContent = "";

// grab the form
const form = document.querySelector(".form-data");
// grab the description
const description = document.querySelector(".description");

// declare a method to search by description
const search = async description => {
    button.classList.add("search-btn--loading");

    errors.textContent = "";
    try {
        const response = await axios.get(`${proxy}${encodeURIComponent(`${api}/?description=${description}&mode=EE`)}`);
        const words = JSON.parse(response.data.contents);

        if (response.status !== 200) { throw error; }


        let txt = [];
        for (let i = 0; i <= 10; i++) {
            txt.push(words[i].w);
        };

        button.classList.remove("search-btn--loading");

        results.textContent = txt.join(", ");

        resultContainer.style.display = "block";
    } catch (error) {
        button.classList.remove("search-btn--loading");

        resultContainer.style.display = "none";
        errors.textContent = "We have no data for the description you have requested.";
    }
};

// declare a function to handle form submission
const handleSubmit = async e => {
    e.preventDefault();
    search(description.value);
};

form.addEventListener("submit", e => handleSubmit(e));
description.addEventListener("input", btnActivation);

function btnActivation(){
    console.log(document.querySelector('.description').value.length)
    if (!document.querySelector('.description').value.length) {
        document.querySelector(".search-btn").disabled = true;            
    } else {
        document.querySelector(".search-btn").disabled = false;
    }           
} 

btnActivation();