// document.getElementById("searchButton").addEventListener("click", function(event) {
//     const ISBN = document.getElementById("inputISBN").value;
//     document.getElementById("searchResults").innerHTML = "";
//     document.getElementById("errorMessage").innerHTML = "";

//     var regex = new RegExp(/\b^(97(8|9))?\d{9}(\d|X)$\b/, );
//     console.log(ISBN);
//     console.log(regex.test(ISBN))

//     if (ISBN === "" || !regex.test(ISBN)){
//         // var error = '<p class="text-center m-1 mb-2"> Please enter a valid ISBN </p>'
//         // document.getElementById("errorMessage").innerHTML = error;
//         alert("Please enter a valid ISBN")
//         return;
//     }


//     var result = '<h2 class="text-center m-1 mt-3"> ISBN IS VALID </h2>';
//     document.getElementById("searchResults").innerHTML = result;
// });

var ISBN = '';

async function getResults() {
    ISBN = document.getElementById("inputISBN").value;
    document.getElementById("searchResults").innerHTML = "";
    document.getElementById("errorMessage").innerHTML = "";
    

    var regex = new RegExp(/\b^(97(8|9))?\d{9}(\d|X)$\b/, );
    console.log(ISBN);
    console.log(regex.test(ISBN))

    if (ISBN === "" || !regex.test(ISBN)){
        // var error = '<p class="text-center m-1 mb-2"> Please enter a valid ISBN </p>'
        // document.getElementById("errorMessage").innerHTML = error;
        alert("Please enter a valid ISBN")
        return;
    }

    console.log("ISBN DATA:")
    var data = await ISBNData();
    console.log(data)
    var results = await bookData();
    console.log(data)
    console.log("got")

    var result = '<h2 class="text-center m-1 mt-3"> ISBN IS VALID </h2>';
    document.getElementById("searchResults").innerHTML = result;
}

const ISBNData = async() => {
    var url = "https://openlibrary.org/api/books?bibkeys=ISBN:"+ ISBN +"&jscmd=data&format=json"
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json;
}

const bookData = async() => {
    var url = 'https://www.bookfinder.com/search/?isbn='+ ISBN +'&title=&author=&lang=en&mode=textbook&st=sr&ac=qr'
    const response = await fetch(url);
    const result = await response;
    return result;
}

// function ISBNSearch(){
//     const ISBN = document.getElementById("inputISBN").value;

//     console.log(ISBN);

//     if (ISBN === ""){
//         var error = '<h2 class="text-center m-1 mt-3"> Please enter a valid ISBN </h2>'
//         document.getElementById("searchResults").innerHTML = error;
//         return;
//     }

// };



// document.getElementById("weatherSubmit").addEventListener("click", function(event) {
//     event.preventDefault();
//     const value = document.getElementById("weatherInput").value;
//     if (value === ""){
//       var error = '<h2 class="text-center m-1 mt-3"> Please enter a city </h2>'
//       document.getElementById("weatherResults").innerHTML = error;
//       return;
//     }
//     console.log(value);
//     const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=ea7646e34e3c420c620cba0938ded508";
//     fetch(url)
//       .then(function(response) {
//         return response.json();
//       }).then(function(json) {
//           console.log(json);	
//         let results = "";
//         results += '<h2 class="text-center">Weather in ' + json.name + "</h2>";
//         for (let i=0; i < json.weather.length; i++) {
//       results += '<img class="rounded mx-auto d-block" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
//         }
//         results += '<h3 class="text-center">' + json.main.temp + " &deg;F</h3>"
//         results += '<p class="text-center">'
//         for (let i=0; i < json.weather.length; i++) {
//       results += json.weather[i].description
//       if (i !== json.weather.length - 1)
//         results += ", "
//         }
//         results += "</p>";
//         document.getElementById("weatherResults").innerHTML = results;
//         document.getElementById("footer").style.position = "absolute";

//       })
// });