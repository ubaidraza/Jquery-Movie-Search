$( document ).ready(()=>{

    $( '#formSeacrh').on('submit',(e)=>{
        e.preventDefault();
        let searchMovies = $('#searchMovies').val();
        getMovies(searchMovies);

    });

    function getMovies(searchMovies){
        axios.get('http://www.omdbapi.com/?apikey=9f9c2080&s='+searchMovies)
        .then((response)=>{
            console.log(response);

            let movies = response.data.Search;
            var output='' ;
            $.each(movies,function(index,movie,){
              output+=`
                <div class="col-lg-3">
                  <div class="well text-center">
                     <img src="${movie.Poster}" class="img-thumbnail" />
                     <h6 style="margin-top:10px; font-size:20px;">${movie.Title}</h6>
                     <a onClick="movieSelected (' ${movie.imdbID} ')" class="btn btn-primary" href="#"> View Detals </a>
                  </div>
                </div> `   ;       
            });
            var moviesResult = $('#movieResults');
            moviesResult.html(output);
        })
        .catch(err=>{
            console.log(err);
        });
    }
    

  function movieSelected (id){
      console.log(id);
    sessionStorage.setItem('movieId',id);
      window.location='movie.html';
      return false;
  }

  function getMovie(){
      var movieId = sessionStorage.getItem('movieId');

      axios.get('http://www.omdbapi.com/?apikey=9f9c2080&i='+movieId)
      .then((response)=>{
          var movie = response.data.Search;
          console.log(response);
          var output = `
          <div class="row" >
            <div class="col-lg-4">
                <div class="well">
                <img src="${movie.Poster}" class="thumbnail" />
                </div>
            </div>
            <div class="col-lg-8">
                <h3>${movie.Title}</h3>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writter:</strong> ${movie.Writter}</li>
                    <li class="list-group-item"><strong>Actor:</strong> ${movie.Actor}</li>
                </ul>
            </div>
          </div>`;

          $('#movie').html(output);
      })
      .catch((err)=>{
        console.log(err);
    })
  }   
})  //ready function