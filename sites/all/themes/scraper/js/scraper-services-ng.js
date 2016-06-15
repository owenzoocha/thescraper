angular.module('scraper.services', [])

// Do stuff by 'ere
.service('DoStuff', function($http, $q) {
  this.sayHello = function() {
    return 'hello!';
  };

  this.searchTwitter = function(terms) {
    var deferred = $q.defer();
    var req = {
     method: 'POST',
     url: '/scraper/search',
     headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
     },
     data: {
      search_terms: terms,
     },
    }
    $http(req)
    .success(function(data, status, headers, config) {
      deferred.resolve(data);
    })
    .error(function(data, status, headers, config) {
      deferred.resolve(data); // send the error message back
    });

    return deferred.promise;
  };
})
;
