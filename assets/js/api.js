(function() {
  'use strict';
  var data = null,
    handleQueryResponse = function(response) {
      data = response.getDataTable();
      var rowCount = data.Nf.length,
        columnCount = data.Pf.length,
        rowProperties = [],
        jsonData = [];
      for (var i = 0; i < columnCount; i++) {
        rowProperties[i] = data.Pf[i].label;
      }
      for (var i = 0; i < rowCount; i++) {
        var rowEntry = {};
        for (var j = 0; j < columnCount; j++) {
          var columnEntry = data.Nf[i].c[j];
          if (columnEntry !== null) {
            rowEntry[rowProperties[j]] = data.Nf[i].c[j].v;
          } else {
            rowEntry[rowProperties[j]] = '';
          }
        }
        jsonData[i] = rowEntry;
      }
      var jsonDownloadAnchorElement = document.getElementById('json-file-download');
      if (jsonDownloadAnchorElement) {
        var oldListener = jsonDownloadAnchorElement.onclick;
        jsonDownloadAnchorElement.onclick = function() {
          var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonData)),
            downloadLink = document.createElement("a");
          downloadLink.href = uri;
          downloadLink.download = "LocalFoodPlaces.json";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          if (oldListener) {
            oldListener();
          }
        };
      } else {
        // This is an awful hack because we have no server to get the updated data for the api
        window.awfulHackDataStore = jsonData;
        if (window.awfulHackCallback) {
          window.awfulHackCallback();
        }
      }
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
  window.awfulHackDynamicApiLoad = function() {
    google.setOnLoadCallback(onLoadCallbackFunction);
    // Load the Visualization API.
    google.load('visualization', '1.0', {});
  };
}());
