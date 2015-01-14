(function() {
  'use strict';
  var data,
    handleQueryResponse = function(response) {
      console.log('in response handler');
      data = response.getDataTable();
      console.log(data);
    },
    getData = function(URL) {
      console.log(URL, 'in getData');
      var query = new google.visualization.Query(URL);
      query.send(handleQueryResponse);
    };
  console.lot('stuff was defined');
  getData('https://docs.google.com/a/codeforamerica.org/spreadsheets/d/1_lF5WrE_JhgqxeqRJZm2wQAaM-C_Bz-oUOkHHq6vhYk');
}());
