$( document ).ready(()=>{

    $( '#formSeacrh').on('submit',(e)=>{
        e.preventDefault();
        let searchMovies = $('#searchMovies').val();
        if(searchMovies){
            
            getMovies(searchMovies);
            
        }else{
            alert("Please provide movie name!")
        }
        

    });

    function getMovies(searchMovies){
        axios.get('http://www.omdbapi.com/?apikey=9f9c2080&s='+searchMovies)
        .then((response)=>{

            let movies = response.data.Search;
            var output='' ;
            $.each(movies,function(index,movie){
                var checkImage = function(movie){
                       
                }
              output+=`
                <div class="col-lg-3">
                  <div class="well text-center">
                     <img src="${movie.Poster}" class="img-thumbnail" />
                     <a href="#" style="color:white;" data-id="${movie.imdbID}" ><h6 style="margin-top:10px; font-size:20px;">${movie.Title.substr(0,Math.floor(Math.random()*(17-12+1))+12)}...</h6></a>
                     <a href="#"  id="selectedId" data-id="${movie.imdbID}" class="btn  btn-success"> View Detals </a>
                  </div>
                </div> `;     
            });
            var moviesResult = $('#movieResults');
            moviesResult.html(output);
            
                $("a[data-id]").on('click',function(){
                    console.log('view movie clicked');
                    var id = $(this).data('id');
                    movieSelected(id);
                }) 
             
 
        })
        .catch(err=>{
            console.log(err);
        });
    }
    

  function movieSelected (id){
   
    sessionStorage.setItem('movieId',id);
      window.location='movie.html';
      
      return false;
  }
})  //ready function
  function getMovie(){
      var movieId = sessionStorage.getItem('movieId');


      axios.get('http://www.omdbapi.com/?apikey=9f9c2080&i='+movieId)
      .then((response)=>{
          var movie = response.data;
          var output = `
          <div class="row well" >
            <div class="col-lg-4 text-center">
                <img src="${movie.Poster}" class="thumbnail" />
            </div>
            <div class="col-lg-8">
                <h3>${movie.Title}</h3>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre :</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Country  :</strong> ${movie.Country}</li>
                    <li class="list-group-item"><strong>Released :</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated :</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB rating :</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director :</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writter :</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actor :</strong> ${movie.Actors}</li>
                </ul>
            </div>
          </div>
          <div class="row">
            <div class="well ">
               <h3>Plot </h3> 
               ${movie.Plot}
               <hr>
               <a class="btn btn-info" target="_blank" href="https://www.imdb.com/title/${movie.imdbID}">View IMDB </a>
               <a  class="btn btn-default" href="index.html">Back</a>
            </div>
          </div>`;
          

          $('#movie').html(output);
          
          
      })
      .catch((err)=>{
        console.log(err);
    }) 
}
