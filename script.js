
/*
	to grab the image from themoviedb.org  
	https://image.tmdb.org/t/p/w500/<img-path>

	searching url formate
	https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

	we can make encoded URI from string 
	encodeURI("string");

	https://api.themoviedb.org/3/search/movie?api_key=cb213741fa9662c69add38c5a59c0110&language=en-US&page=1&include_adult=false&query=

*/


// encoding practice
// let encodedname = encodeURI("english man");
// console.log(encodedname);

// getting trending movies for homepage
// const tmdb = fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=cb213741fa9662c69add38c5a59c0110")
// 	.then((response) => response.json())
// 	.then((data) => console.log(data.results[0]))
// 	.catch((err) => console.log(err));


// testing search result
// let tmdbsearch = fetch("https://api.themoviedb.org/3/search/movie?api_key=cb213741fa9662c69add38c5a59c0110&language=en-US&page=1&include_adult=false&query=english%20man")
// 	.then((response) => response.json())
// 	.then((data) => console.log(data.results))
// 	.catch((err) => console.log(err));

console.log("new script is attached");

let currentMovieStack = [];

const homeButton = document.querySelector("#home-button");
const searchBox = document.querySelector("#search-box");
const goToFavouriteButton = document.querySelector("#goto-favourites-button");
const movieCardContainer = document.querySelector("#movie-card-container")

// simple function to show an alert when we need 
function showAlert(message){
	alert(message);
}


// create move cards using elements of currentMovieStack array 
function renderList(){
	movieCardContainer.innerHTML = '';

	for(let i = 0; i<currentMovieStack.length; i++){

		// creating div element for movie card and setting class and id to it
		let movieCard = document.createElement('div');
		movieCard.classList.add("movie-card");
		movieCard.setAttribute('id', currentMovieStack[i].id);

		// templet for interHtml of movie card which sets image, title and rating of particular movie
		movieCard.innerHTML = `
		<img src="${'https://image.tmdb.org/t/p/w500' + currentMovieStack[i].poster_path}" alt="${currentMovieStack[i].title}" class="movie-poster">
		<div class="movie-title-container">
			<span>${currentMovieStack[i].title}</span>
			<div class="rating-container">
				<img src="./res/rating-icon.png" alt="">
				<span>${currentMovieStack[i].vote_average}</span>
			</div>
		</div>
		<button class="add-to-favourite-button text-icon-button" data-id="${currentMovieStack[i].id}">
			<img src="./res/favourites-icon.png">
			<span>Make favourite</span>
		</button>
		`;
		movieCardContainer.append(movieCard); //appending card to the movie container view
		
	}
}


// if any thing wrong by using this function we print message to the main screen
function printError(message){
	const errorDiv = document.createElement("div");
	errorDiv.innerHTML = message;
	errorDiv.style.height = "100%";
	errorDiv.style.fontSize = "5rem";
	errorDiv.style.margin = "auto";
	movieCardContainer.innerHTML = "";
	movieCardContainer.append(errorDiv);
}

// gets tranding movies from the server and renders as movie cards
function getTrandingMovies(){
	const tmdb = fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=cb213741fa9662c69add38c5a59c0110")
	.then((response) => response.json())
	.then((data) => {
		currentMovieStack = data.results;
		renderList();
	})
	.catch((err) => printError(err));
}

getTrandingMovies();

searchBox.addEventListener('keyup' , ()=>{
	let searchString = searchBox.value;
	
	if(searchString.length > 0){
		let searchStringURI = encodeURI(searchString);
		const searchResult = fetch(`https://api.themoviedb.org/3/search/movie?api_key=cb213741fa9662c69add38c5a59c0110&language=en-US&page=1&include_adult=false&query=${searchStringURI}`)
			.then((response) => response.json())
			.then((data) =>{
				currentMovieStack = data.results;
				renderList();
			})
			.catch((err) => printError(err));
	}
})


homeButton.addEventListener('click', getTrandingMovies);
