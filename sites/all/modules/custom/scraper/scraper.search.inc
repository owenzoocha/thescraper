<?php
//
function scraper_search_form($form, &$form_state){
  $form['#attributes'] = array(
    'ng-submit' => 'scraperSearch($event)',
    'ng-controller' => 'SearchCtrl',
  );
  $form['terms'] = array(
    '#type' => 'textfield',
    '#description' => t('Enter in your search terms separated with a comma eg:'),
    '#attributes' => array(
      'placeholder' => array('terms..'),
      'ng-model' => 'search.terms',
    ),
  );

  $text = '<div><ul>';
  $text .= '<li>fitness, blogger</li>';
  $text .= '<li>chef, blogger</li>';
  $text .= '<li>bookings or #bookings</li>';
  $text .= '<li>bookings or #bookings</li>';
  $text .= '<li>exact phrases: "enquiries"</li>';
  $text .= '<li>gym OR celebrity, bookings</li>';
  $text .= '</ul>';
  $text .= '<p>For further search techniques - see the <a href="https://dev.twitter.com/rest/public/search" target="_blank">Twitter Search Api</a>.</p>';
  $text .= '</div>';

  $form['textstuff'] = array(
    '#markup' => $text,
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Search'),
    '#attributes' => array(
      'class' => array('btn btn-success btn-block'),
      // 'ng-click' => 'doLogin()',
    ),
  );

  $text  = '<div id="results">';
  $text .= '<h2>Results:</h2>';
  $text .= '<div id="total-tweets"><strong>Total Tweets </strong><span></span></div>';
  $text .= '<div id="total-emails"><strong>Total Emails found: </strong><span></span></div>';
  // $text .= '<div id="export-emails"><a ng-csv="csvArray" csv-header="[\'email address\', \'handle\', \'name\']" filename="emails.csv" href="#">Export Results</a></div>';
  $text .= '<div id="export-emails"><a ng-csv="csvArray" csv-label="true" filename="emails.csv" href="#">Export Results</a></div>';
  $text .= '</div>';

  $form['textstuff2'] = array(
    '#markup' => $text,
  );

  return $form;
}

function twitter_scraper_search_form_submit($form, &$form_state){
  // handled by ajax..
}
