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

  $scope.dataArray = [];

  $scope.search = {};
  $scope.search.terms = '';

  $scope.scraperSearch = function(e){
    var terms = $scope.search.terms;

    DoStuff.searchTwitter(terms).then(function(data){

      console.log('hello?!');

      jQuery('#scraper-results').html('');

      var content = '';
      var emailsFound = 0;
      var totalTweets = 0;
      var emailList = {};
      var thisTweetNo = 0;

      if (data) {
        angular.forEach(data, function(value, key) {

          angular.forEach(value, function(v, k) {

            thisTweetNo++;

            // console.log(v);

            var emailFromTweet = v['text'].match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            var emailFromDesc = v['user']['description'].match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

            if (emailFromTweet) {
              emailList[emailFromTweet] = true;
              csv = {
                'email' : emailFromTweet,
                'handle' : '@' + v['user']['screen_name'],
                'name' : v['user']['name'],
                'followers' : v['user']['followers_count'],
                'description' : v['user']['description'],
                'tweet' : v['text'],
                'created' : v['created_at'],
              }
              $scope.csvArray.push(csv);
              emailsFound++;
            }

            if (emailFromDesc) {
              emailList[emailFromDesc] = true;
              csv = {
                'email' : emailFromDesc,
                'handle' : '@' + v['user']['screen_name'],
                'name' : v['user']['name'],
                'followers' : v['user']['followers_count'],
                'description' : v['user']['description'],
                'tweet' : v['text'],
                'created' : v['created_at'],
              }
              $scope.csvArray.push(csv);
              emailsFound++;
            }

            content += '<div class="row">';

            // <div class="t-url">' +v['user']['entities']['url']['urls'][0]['display_url']  + '</div> \

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
                  <div class="t-name"><span>Name:</span> ' + v['user']['name'] + '</div> \
                  <div class="t-handle"><span>Handle:</span> @' + v['user']['screen_name'] + '</div> \
                  <div class="t-profile"><span>Profile:</span> <a target="_blank" href="http://twitter.com/' + v['user']['screen_name'] + '">view profile</a></div> \
                  <div class="scraper-tweet"><span>Tweet:</span> ' + v['text'] + '</div> \
                  <div class="scraper-tweet"><span>Created:</span> ' + v['created_at'] + '</div> \
                  <div class="t-description"><span>Description:</span> ' + v['user']['description'] + '</div> \
                  <div class="t-followers"><span>Followers:</span> #' + v['user']['followers_count'] + '</div> \
                  <div class="t-friends"><span>Friends:</span> #' + v['user']['friends_count'] + '</div> \
                  <div class="t-location"><span>Location:</span> ' + v['user']['location'] + '</div> \
                  <div class="t-location"><span>ID:</span> ' + v['id'] + '</div> \
                  <span class="tweet-count">' + (thisTweetNo) + '</span>';

              // <div class="t-id"><span>ID:</span> ' + v['user']['id'] + '</div> \

             content += emailContent;

             content += ' \</div> \
              </div>';

            // content += ' \
            //   <div class="col-md-6"> \
            //     <div class="scraper-surround scraper-tweet">' + v['text'] + '</div> \
            //   </div>';

            content += '</div>';
            totalTweets++;
          });

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
