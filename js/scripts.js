function Movie (){
	$('#movie-list').html('');

	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': '4abc7112',
			's': $('#home-input').val()
		},
		success: function (result){
			if (result.Response == "True"){
				
				let movies = result.Search;
				$.each(movies, function (i, data){
					$('#movie-list').append(`

						<div class="col-md-4">
							<div class="card mb-3">
							  <img src="`+ data.Poster +`" class="card-img-top" alt="...">
							  <div class="card-body">
							    <h5 class="card-title">`+ data.Title +`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
							    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
							  </div>
							</div>
						</div>
					`);
				});

				$('#home-input').val();

			} else {
				
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center">`+ result.Error +`</h1>
					</div>
				`)

			}
		}
	});
}


$('#home-button').on('click', function (){

	Movie();

});

$('#home-input').on('keyup', function (e){

	if (e.keyCode === 13){
		Movie();
	}

});

$('#movie-list').on('click', '.see-detail', function (){
	

	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': '4abc7112',
			'i': $(this).data('id')
		},
		success: function (movie){
			if (movie.Response === "True"){

				$('.modal-body').html(`
					<div class="container-fluid">
						
						<div class="row">
							
							<div class="col-md-4">
								<img src="`+ movie.Poster +`" class="img-fluid">
							</div>

							<div class="col-md-8">
								<h4>`+ movie.Title +`</h4>
								<p>Released : `+ movie.Released +`</p>
								<p>Genre : `+ movie.Genre +`</p>
								<p>Director : `+ movie.Director +`</p>
								<p>Actors : `+ movie.Actors +`</p>
							</div>

						</div>

					</div>
				`);

			}
		}
	});


});