angular.module('guitarApp',[])

.controller('GuitarCtrl', ['$scope', '$http', function($scope, $http){

	var media = new Audio();
	$scope.song = "";

	$scope.getSongs = function(){

	$http({
        url: 'http://api.guitarparty.com/v2/songs/?query=' + $scope.song,
        dataType: 'json',
        method: 'GET',
        headers: {
            "Guitarparty-Api-Key": '00e8d0ce7d4980a096fdf1da0e98225f6fab131d',
        }
    }).success(function(response){
    	var name = response.objects[0].authors[0].name;
		var lyrics = angular.element( document.querySelector( '#lyrics' ) );
		var artist = angular.element( document.querySelector( '#artist' ) );
		lyrics.html(response.objects[0].body_chords_html);
		artist.html(name)
       
    }).error(function(error){
        $scope.error = error;
    });
    }

    $scope.listenSong = function(){
    	$http.jsonp('https://itunes.apple.com/search?term=' + $scope.song + '&format=jsonp&callback=JSON_CALLBACK')

    	.success(function(data){
    		media.pause(song)
    		var song = data.results[0].previewUrl;
    		media = new Audio(song)
    		media.play()
    		console.log(media)
    	})
    }
}]);

