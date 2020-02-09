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
    
        console.log("ISBN DATA:")
        var data = await this.getISBNData();
        console.log(data)
        var results = await this.getBookData();
        console.log(data)
        console.log("got")
    
        var result = '<h2 class="text-center m-1 mt-3"> ISBN IS VALID </h2>';
        document.getElementById("searchResults").innerHTML = result; 
      },
      async getISBNData() {
        var url = "https://openlibrary.org/api/books?bibkeys=ISBN:"+ this.ISBN +"&jscmd=data&format=json"
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        return json;
      },
      async getBookData() {
          var xmlHttp = new XMLHttpRequest();
          var url = 'https://www.bookfinder.com/search/?isbn='+ this.ISBN +'&title=&author=&lang=en&mode=textbook&st=sr&ac=qr'
          xmlHttp.open( "GET", url, false );
          xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
          xmlHttp.send( null );
          return xmlHttp.responseText;
      }
    },
    computed: {
        
    },
    watch: {
        
    },
});
