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

  // $profile = 'https://twitter.com/' . $tweet->user->screen_name;
  // $headers = array(
  //   'Content-Type' => 'application/json',
  // );
  // $data = '{"startUrls":[{"key": "TEST", "value": "'.$profile.'"}]}';
  // $url = 'https://api.apifier.com/v1/wzHqPfZhWtuPXpX3f/crawlers/Twitter%20Scraper/execute?token=5iijWrGbJetJZ2ZhhqvbcBWg7';
  // $apifier = drupal_http_request($url, $headers = array(), 'POST', $data);
  // dpm($apifier);

  this.searchApifier = function(profile) {
    var deferred = $q.defer();
    var req = {
     method: 'POST',
     url: 'https://api.apifier.com/v1/wzHqPfZhWtuPXpX3f/crawlers/Twitter%20Scraper/execute?token=5iijWrGbJetJZ2ZhhqvbcBWg7',
     headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
     },
     data: {
        startUrls:[{
          "key": "TEST",
          "value": profile
        }]
     },
    }
    console.log(req);
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
