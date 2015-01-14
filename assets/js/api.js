(function() {
  'use strict';
  var data,
    handleQueryResponse = function(response) {
      data = response.getDataTable();
      console.log(data);
    },
    getData = function(URL) {
      var query = new google.visualization.Query(URL);
      query.send(handleQueryResponse);
    },
    onLoadCallbackFunction = function() {
      getData('https://docs.google.com/spreadsheet/ccc?key=1_lF5WrE_JhgqxeqRJZm2wQAaM-C_Bz-oUOkHHq6vhYk');
    };
  google.setOnLoadCallback(onLoadCallbackFunction);
  // Load the Visualization API.
  google.load('visualization', '1.0', {});
}());
