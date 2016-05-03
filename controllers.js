angular.module('flickrApp', [])

.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
})
.controller('PictureSearchCntrl', function($http, $sce, $q, $timeout){
	
	var vm = this;

	vm.keyword = '';
	vm.searching = false;
	
	vm.trustResource = function(farm, server, id, secret){
		//console.log('https://farm' + farm + '.staticflickr.com/' + server + '/'+ id +'_'+ secret + '.jpg');
		return $sce.trustAsResourceUrl('https://farm' + farm + '.staticflickr.com/' + server + '/'+ id +'_'+ secret + '.jpg');
	};	

	var wait = function(response){
		return $q(function(resolve, reject){
			vm.searching = true;
			$timeout(function(){
				resolve(response);
			}, 2000);
		});
	}

	vm.searchFlickr = function(){
		var embedUrl = "https://api.flickr.com/services/rest";

		var params = {
			method: 'flickr.photos.search',
			api_key: "cd668ffc67cbb10ea00d43046c2f2e13",
			tags: vm.keyword,
			format: 'json',
			nojsoncallback: 1
		}

		$http({
			method:'GET',
			url: embedUrl,
			params:params
		})
		.then(function(response){
			wait(response).then(function(){
				vm.searching = false;
				vm.results = response.data.photos.photo;	
			});
			
		},
		function(response){
			alert('Search error.');
			//post logic for ng-if for results div.
		});
	};


});