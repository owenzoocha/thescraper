angular.module('Scraper', [
  'scraper.services',
  'ngSanitize',
  'ngCsv',
  'angular-loading-bar',
])

// Scraper Controller..
.controller('ScraperCtrl', function($scope, $http, DoStuff) {
  $scope.owen = 'wallalal';
  $scope.williams = '333';
  var hi = DoStuff.sayHello();

  $scope.scraperSearch = function(){
    console.log('search!!');
    return false;
  }
  $scope.doLogin = function(){
    console.log('searched!!');
  }
})

// Scraper Controller..
.controller('SearchCtrl', function($scope, $http, DoStuff) {

  $scope.csvArray = []
  // {
  //   "Vehicle": "BMW",
  //   "Date": "30, Jul 2013 09:24 AM",
  //   "Location": "Hauz Khas, Enclave, New Delhi, Delhi, India",
  //   "Speed": 42
  // },

  //   { "Vehicle": "Honda CBR", "Date": "30, Jul 2013 12:00 AM", "Location": "Military Road, West Bengal 734013, India", "Speed": 0 } ];
  //
    $scope.dataArray = [ { "Vehicle": "BMW", "Date": "30, Jul 2013 09:24 AM", "Location": "Hauz Khas, Enclave, New Delhi, Delhi, India", "Speed": 42 }, { "Vehicle": "Honda CBR", "Date": "30, Jul 2013 12:00 AM", "Location": "Military Road, West Bengal 734013, India", "Speed": 0 } ];


console.log($scope.dataArray);

  $scope.search = {};
  $scope.search.terms = '';

  $scope.scraperSearch = function(e){
    var terms = $scope.search.terms;

    DoStuff.searchTwitter(terms).then(function(data){
      if (data['statuses']) {
        jQuery('#scraper-results').html('');

        var content = '';
        var emailsFound = 0;
        var totalTweets = 0;
        var emailList = {};

        angular.forEach(data['statuses'], function(value, key) {

          console.log(value);

          var emailFromTweet = value['text'].match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
          var emailFromDesc = value['user']['description'].match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

          if (emailFromTweet) {
            emailList[emailFromTweet] = true;
            csv = {
              'email' : emailFromTweet,
              'handle' : '@' + value['user']['screen_name'],
              'name' : value['user']['name'],
              'followers' : value['user']['followers_count'],
              'description' : value['user']['description'],
              'tweet' : value['text'],
              'created' : value['created_at'],
            }
            $scope.csvArray.push(csv);
            emailsFound++;
          }

          if (emailFromDesc) {
            emailList[emailFromDesc] = true;
            csv = {
              'email' : emailFromDesc,
              'handle' : '@' + value['user']['screen_name'],
              'name' : value['user']['name'],
              'followers' : value['user']['followers_count'],
              'description' : value['user']['description'],
              'tweet' : value['text'],
              'created' : value['created_at'],
            }
            $scope.csvArray.push(csv);
            emailsFound++;
          }

          content += '<div class="row">';

          // <div class="t-url">' +value['user']['entities']['url']['urls'][0]['display_url']  + '</div> \

          var emailClass = '';
          var emailContent = false;
          if (emailFromDesc || emailFromTweet) {
            emailClass = ' emailFound';
            emailContent = '<div class="t-email"><span>Email Scraped:</span> ';
            if (emailFromDesc) {
              emailContent += emailFromDesc + ' ';
            }
            if (emailFromTweet) {
              emailContent += emailFromTweet;
            }
            emailContent += '</div>';
          }


          content += ' \
            <div class="col-md-12"> \
              <div class="scraper-surround scraper-user-info ' + emailClass + '"> \
                <div class="t-name"><span>Name:</span> ' + value['user']['name'] + '</div> \
                <div class="t-handle"><span>Handle:</span> @' + value['user']['screen_name'] + '</div> \
                <div class="t-profile"><span>Profile:</span> <a target="_blank" href="http://twitter.com/' + value['user']['screen_name'] + '">view profile</a></div> \
                <div class="scraper-tweet"><span>Tweet:</span> ' + value['text'] + '</div> \
                <div class="scraper-tweet"><span>Created:</span> ' + value['created_at'] + '</div> \
                <div class="t-description"><span>Description:</span> ' + value['user']['description'] + '</div> \
                <div class="t-followers"><span>Followers:</span> #' + value['user']['followers_count'] + '</div> \
                <div class="t-friends"><span>Friends:</span> #' + value['user']['friends_count'] + '</div> \
                <div class="t-location"><span>Location:</span> ' + value['user']['location'] + '</div> \
                <span class="tweet-count">' + (key+1) + '</span>';

            // <div class="t-id"><span>ID:</span> ' + value['user']['id'] + '</div> \

           content += emailContent;

           content += ' \</div> \
            </div>';

          // content += ' \
          //   <div class="col-md-6"> \
          //     <div class="scraper-surround scraper-tweet">' + value['text'] + '</div> \
          //   </div>';

          content += '</div>';
          totalTweets++;
        });

        jQuery('#scraper-results').append(content);
        console.log($scope.csvArray);

        // $scope.csvArray = emailList;
        var totalEmails = Object.keys(emailList).length;
        jQuery('#total-tweets span').html(totalTweets);
        jQuery('#total-emails span').html(totalEmails);


      }


    });

    e.preventDefault();
    // doing stuff
  }
  // $scope.doLogin = function(){
  //   console.log('searched!!');
  // }
})
;
