Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',
    data: {
      username: '',
      password: '',
      ISBN: '',

    },
    created() {
    },
    methods: {

      signIn(){
        console.log(this.username);
        if(this.username === '' || this.password === ''){
          alert("Please enter valid username and password");
        }
        else {
          window.location.assign("main.html");
        }
      },
      async getResults() {
        document.getElementById("searchResults").innerHTML = "";
        document.getElementById("errorMessage").innerHTML = "";
        
    
        var regex = new RegExp(/\b^(97(8|9))?\d{9}(\d|X)$\b/, );
        console.log(this.ISBN);
        console.log(regex.test(this.ISBN))
    
        if (this.ISBN === "" || !regex.test(this.ISBN)){
            // var error = '<p class="text-center m-1 mb-2"> Please enter a valid ISBN </p>'
            // document.getElementById("errorMessage").innerHTML = error;
            alert("Please enter a valid ISBN")
            return;
        }
        // this.displayAlert()
        document.getElementById("searchResults").innerHTML = "Fetching book data...";
    
        console.log("ISBN DATA:")
        var data = await this.getISBNData();
        console.log(data)
        data = data["ISBN:"+this.ISBN];
        var results = await this.getBookData();
        var index = results.lastIndexOf('left">Bookseller</th><th align="left">Notes</th>');
        results = results.substr(index);

        // console.log(data);

        //format HTML
        var subtitle = ' ';
        if (data.subtitle !== undefined){
          subtitle = data.subtitle;
        }
        resultHTML +='<div class="row-holder m-1">';
        var resultHTML = '<img style="margin-right: 5ems;" src='+ data.cover.medium +'>' + '<h2 class="text-center m-1 mt-3">' + data.title + '</h2>' + '<h4 class="text-center m-1 mt-3">' + subtitle + '</h4>';
        resultHTML += '</div>';

        console.log(results);

        if(results !== undefined){

          for (var i = 0; i < 12; i++){
            index = results.indexOf('data-price="');
            var price = results.substr(index + 12);

            var siteLogoIndex = price.indexOf("<img");    //Getting the site logo
            var siteLogo = price.substr(siteLogoIndex);
            siteLogo = siteLogo.substr(0, siteLogo.indexOf(">")+1)

            var titleIndex = siteLogo.indexOf('title="');     //Getting the title of the website
            var titleName = siteLogo.substr(titleIndex + 7)
            var title = titleName.substr(0, titleName.indexOf('"'));

            var linkIndex = price.indexOf('href="');
            var linkSub = price.substr(linkIndex + 6);
            // console.log(linkSub);
            var link = linkSub.substr(0, linkSub.indexOf('"'));
            console.log(link);

            results = results.substr(index + 12);
            price = price.substr(0, price.indexOf('"'));    //Final parsing of price and  updating html string for next round
            
            console.log(price);
            console.log(title);
            console.log(siteLogo);

            resultHTML +='<div class="row align-items-center m-1">';

            resultHTML += siteLogo +'<p>' + title + " " + price + '</p>' + '<a href="' + link + '">Go</a>'+'<br><br>';
            resultHTML += '</div>';
          }
        }
        else {
          resultHTML += "<p>Book data not found, please search a different ISBN</p>";
        }
    
        var result = resultHTML;
        document.getElementById("searchResults").innerHTML = result; 
      },
      async getISBNData() {
        var url = "https://cors-anywhere.herokuapp.com/https://openlibrary.org/api/books?bibkeys=ISBN:"+ this.ISBN +"&jscmd=data&format=json"
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json);
        return json;
      },
      async getBookData() {
          var xmlHttp = new XMLHttpRequest();
          var url = 'https://cors-anywhere.herokuapp.com/https://www.bookfinder.com/search/?isbn='+ this.ISBN +'&title=&author=&lang=en&mode=textbook&st=sr&ac=qr'
          console.log(url);
          xmlHttp.open( "GET", url, false );
          xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*","Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
          // xmlHttp.setRequestHeader("Origin", "*");

          xmlHttp.send( null );
          return xmlHttp.responseText;
      },
      async displayAlert() {
        alert("Fetching book data...");
      }
    },
    computed: {
        
    },
    watch: {
        
    },
});
