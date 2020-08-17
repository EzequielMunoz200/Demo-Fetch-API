const formElt = document.querySelector(".form-inline");
const inputElt = document.getElementById("fieldSearch");
const card = document.querySelector(".box");

//target the template
let tplElt = document.getElementById("tpl");
//makes a clone where I'm going to insert content
let tplClone = tplElt.content.cloneNode(true);
let poster = tplClone.querySelector(".card-img");
let title = tplClone.querySelector(".card-title");
let plot = tplClone.querySelector(".card-text");
let actors = tplClone.querySelector(".actors");
let awards = tplClone.querySelector(".awards");
let director = tplClone.querySelector(".director");
let released = tplClone.querySelector(".released");
let genre = tplClone.querySelector(".genre");
let writers = tplClone.querySelector(".writers");

formElt.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    let text = inputElt.value;
    getData(text);

}

function getData(text) {
    fetch("http://omdbapi.com/?t=" + text + "&apikey=KEY_API")

        .then((response) => response.json())

        .then(
            (data) => {
                if (data.Response == "False") {
                    card.querySelector(".box-inner").innerHTML = "<div class='alert alert-warning col-2 text-center ml-auto mr-auto'>" + data.Error + "</div>";
                    if (document.querySelector(".dynamic") != null) {
                        document.querySelector(".dynamic").style.display = "none";
                    }
                } else {
                    card.querySelector(".box-inner").innerHTML = "";
                    poster.setAttribute('src', data.Poster);
                    title.textContent = data.Title;
                    plot.textContent = data.Plot;
                    released.textContent = data.Released;
                    genre.textContent = data.Genre;
                    actors.textContent = data.Actors;
                    awards.textContent = data.Awards;
                    director.textContent = data.Director;
                    writers.textContent = data.Writer;
                    card.style.display = "block";
                    //insertion in the DOM
                    card.appendChild(tplClone);
                    document.querySelector(".dynamic").style.display = "flex";
                }
            })
}
