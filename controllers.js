angular.module('flickrApp', [])

.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
})
.controller('PictureSearchCntrl', function($http, $sce){
	
	this.keyword = '';
	this.results = [];
	
	this.trustResource = function(farm, server, id, secret){
		//console.log('https://farm' + farm + '.staticflickr.com/' + server + '/'+ id +'_'+ secret + '.jpg');
		return $sce.trustAsResourceUrl('https://farm' + farm + '.staticflickr.com/' + server + '/'+ id +'_'+ secret + '.jpg');
	};	

	this.searchFlickr = function(){
		var embedUrl = "https://api.flickr.com/services/rest";

		var params = {
			method: 'flickr.photos.search',
			api_key: "cd668ffc67cbb10ea00d43046c2f2e13",
			tags: this.keyword,
			format: 'json',
			nojsoncallback: 1
		}

		$http({
			method:'GET',
			url: embedUrl,
			params:params
		})
		.then(function(response){

			// for(var i = 0; i < response.data.photos.photo.length; i++){
			// 	this.results.push(response.data.photos.photo[i]);	
			// }
			this.results = response.data.photos.photo;
			//console.log(this.results);
		},
		function(response){
			alert('Search error.');
			//post logic for ng-if for results div.
		});
	};	

});