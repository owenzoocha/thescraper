<?php

/**
 * @file lateral.class.php
 * Defines the LateralApi Class for api use.
 *
 * @author Owen Williams.
 */

/**
 * LateralApi Class
 * Defines Later api functions.
 */
class LateralApi {

  // function __construct() {
  //   dpm('constructed!');
  // }

  /**
   * Returns a list of documents stored in Lateral.
   * @param  boolean $key      [description]
   * @param  boolean $keywords [description]
   * @param  boolean $page     [description]
   * @param  boolean $per_page [description]
   * @param  boolean $public   [description]
   * @return [type]            [description]
   */
  public function lateralGetDocuments($public = TRUE, $keywords = FALSE, $page = FALSE, $per_page = FALSE) {
    $api_name   = "documents";
    $url_params = array();
    $parameters = array();

    if ($keywords) {
      $parameters["keywords"] = $keywords;
    }
    if ($page) {
      $url_params[] = "page={$page}";
    }
    if ($per_page) {
      $url_params[] = "per_page={$per_page}";
    }
    if (count($url_params)) {
      $api_name .= "?" . implode("&", $url_params);
    }
    $method = 'GET';
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Clear out all lateral data.
   */
  public function lateralDeleteAllData($public = TRUE) {
    $api_name   = 'delete-all-data';
    $method     = 'DELETE';
    $parameters = array();
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Add a document to lateral.
   */
  public function lateralAddDocument($public = TRUE, $text, $meta = false) {
    // Check parameters exist.
    $api_name   = 'documents';
    $method     = 'POST';
    $parameters = array(
      "text" => $text,
    );
    if ($meta) {
      $parameters["meta"] = json_encode($meta);
    }
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Delete a document by id.
   */
  public function lateralDeleteDocument($public = TRUE, $document_id) {
    // Check if document_id set
    $api_name   = "documents/{$document_id}";
    $method     = 'DELETE';

    $parameters = array();
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Fetch a document from id.
   */
  public function lateralFetchDocument($public = TRUE, $document_id) {
    // Check document_id set
    $api_name   = "documents/{$document_id}";
    $method     = 'GET';

    $parameters = array();
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }


  /**
   * Grab a list of documents related to a document_id.
   */
  public function lateralRecommendById($public = TRUE, $document_id, $no_results = FALSE, $select_from = FALSE) {
    $api_name   = "documents/{$document_id}/similar";
    $method     = 'GET';
    $parameters = array(
      "results" => $no_results,
      "select_from" => $select_from
    );
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Grab a list of documents related to a document_id.
   */
  public function lateralRecommendByText($public = TRUE, $text, $no_results = false, $select_from = false) {
    $api_name   = 'documents/similar-to-text';
    $method     = 'POST';

    $parameters = array(
      "text" => $text,
      "number"=> $no_results,
      "select_from" => $select_from
    );
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Create document clusters.
   */
  public function lateralCreateClusters($public = TRUE, $number_clusters = 10) {
    $api_name   = 'cluster-models';
    $method     = 'POST';
    $parameters = array(
      "number_clusters" => $number_clusters,
    );

    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Get a list of clusters.
   */
  public function lateralGetClusters($public = TRUE, $cluster_model_id = false) {
    $api_name   = 'cluster-models';
    $method     = 'GET';
    $parameters = array(
    );
    if ($cluster_model_id) {
      $api_name .= "/{$cluster_model_id}";
    }
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Get cluster word cloud.
   */
  public function lateralGetClusterWordCloud($public = TRUE, $cluster_model_id, $cluster_id) {
    $api_name   = "cluster-models/{$cluster_model_id}/clusters/{$cluster_id}/word-cloud";
    $method     = 'GET';
    $parameters = array(
    );
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Get cluster words.
   */
  public function lateralGetClusterWords($public = TRUE, $cluster_model_id, $cluster_id) {
    $api_name   = "cluster-models/{$cluster_model_id}/clusters/{$cluster_id}/words";
    $method     = 'GET';
    $parameters = array(
    );
    $result = $this->lateralCallApi($api_name, $method, $parameters, $public);
    return $result;
  }

  /**
   * Calls the LateralApi endpoint using the $api_function passed.
   */
  protected function lateralCallApi($api_function, $method, $parameters, $public) {
    // Lateral Base URL.
    $LATERAL_API_PATH = variable_get('lateral_baseurl', '');

    // Public Read/Write key.
    $LATERAL_PUBLIC_API_KEY = variable_get('lateral_api_public_write_key', '');

    // Private Read/Write key.
    $LATERAL_PRIVATE_API_KEY = variable_get('lateral_api_private_write_key', '');

    if ($public) {
      $api_key = $LATERAL_PUBLIC_API_KEY;
    }
    else {
      $api_key = $LATERAL_PRIVATE_API_KEY;
    }

    $curl = curl_init();

    $q_array    = array();
    $q_string   = "";
    $parameters = array_filter($parameters, 'strlen');

    // Construct query string
    if (count($parameters)) {
      foreach($parameters as $key => $value) {
        if ($key !== 'meta') {
          $value = trim(mb_convert_encoding($value, "UTF-8"));
        }
        $parameters[$key] = $value;
      }
      //$q_string = http_build_query($parameters, '', '&');
      //$q_string = implode("&",$q_array);
    }

    // Base Options
    $curl_options = array(
      CURLOPT_URL => "$LATERAL_API_PATH/$api_function",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => $method,
      //CURLOPT_POSTFIELDS => json_encode($parameters),
      //CURLOPT_POSTFIELDS => "{\"text\":\"Fat black cat\",\"meta\":\"{ \\\"title\\\": \\\"Lorem Ipsum\\\" }\"}",
      CURLOPT_HTTPHEADER => array(
        "content-type: application/json",
        "subscription-key: $api_key"
      ),
    );

    // Base Parameters.
    if (count($parameters) > 0) {
      $curl_options[CURLOPT_POSTFIELDS] = json_encode($parameters);
    }

    // CURL Recommend By Text for Lateral API (change for PwC AWS Local).
    curl_setopt_array($curl, $curl_options);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
      return "cURL Error #:" . $err;
    }
    else {
      return $response;
    }
  }

}
