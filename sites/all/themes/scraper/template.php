<?php

/**
 * @file
 * The primary PHP file for this theme.
 */

/**
 * Implements hook_preprocess_node().
 */
function scraper_preprocess_node(&$variables) {
}

/**
 * Implements hook_preprocess_page()
 */
function scraper_preprocess_page(&$variables) {
  $variables['navbar_classes_array'][1] = 'container-fluid';

  // drupal_add_js(drupal_get_path('theme', 'scraper') . '/' . 'js/scraper.js');
  // drupal_add_js('https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js', array('type' => 'external'));
  drupal_add_js('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.6/angular.min.js', array('type' => 'external'));
  drupal_add_js('https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.5.6/angular-sanitize.min.js', array('type' => 'external'));
  drupal_add_js('https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.6/ng-csv.min.js', array('type' => 'external'));
  drupal_add_js('https://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.js', array('type' => 'external'));
  drupal_add_css('https://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.css', array('type' => 'external'));

  drupal_add_js(drupal_get_path('theme', 'scraper') . '/' . 'js/scraper-ng.js');
  drupal_add_js(drupal_get_path('theme', 'scraper') . '/' . 'js/scraper-services-ng.js');

  if (drupal_is_front_page()) {
    drupal_set_title('');
  }
}

