var map,
    theaterSearch = [],
    museumSearch = [],
    // typeFilter - optional string type on which to limit data being transformed and returned
    // returns a valid geojson given data input from RUCS (not currently aligned to any standard)
    rucsToGeojson = function(data, typeFilter) {
    // Transform RUCS data into valid geojson
      var placeCount = 0,
        numPlaces = data.length,
        geoJsonData = {
          type: 'FeatureCollection',
          features: []
        };
      for (var i = 0; i < numPlaces; i++) {
        var place = data[i];
        if (place.Type === typeFilter) {
          geoJsonData.features[placeCount] = {
            type: 'Feature',
            id: placeCount,
            properties: {
              NAME: place.Name,
              ADDRESS1: place["Street Address"],
              CITY: place.City,
              ZIP: place.Zip,
              DESCRIPTION: place.Description
            },
            geometry: {
              type: 'Point',
              coordinates: [place.Latitude, place.Longitude]
            }
          };
          placeCount++;
        }
      }
      return geoJsonData;
    };

/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});


/* Overlay Layers */
var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
  }
});
$.getJSON("data/boroughs.geojson", function (data) {
  boroughs.addData(data);
});

var subwayLines = L.geoJson(null, {

  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html(feature.properties.Line);
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
    layer;
  }
});
$.getJSON("data/subways.geojson", function (data) {

});

var theaters = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/restaurants.png",
        iconSize: [27, 45],
        iconAnchor: [12, 28],
        popupAnchor: [0, -27]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<div class='row map-popup'><div class='col-md-9'>"
        + "<span class='title'><strong>" + feature.properties.NAME + "</strong></a>"
        + "<br><span class='description'>" + feature.properties.DESCRIPTION + "</span>"
        + "<br><span class='address'>" + feature.properties.ADDRESS1 + "</span>" + "</div></div>";

      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html(feature.properties.NAME);
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
      theaterSearch.push({
        name: layer.feature.properties.NAME,
        source: "Theaters",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/LocalFoodPlaces.json", function (data) {
  theaters.addData(rucsToGeojson(data, "Restaurants"));
});

var museums = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/farmersmarkets.png",
        iconSize: [27, 45],
        iconAnchor: [12, 28],
        popupAnchor: [0, -27]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<div class='row map-popup'><div class='col-md-9'>"
        + "<span class='title'><strong>" + feature.properties.NAME + "</strong></span>"
        + "<br><span class='description'>" + feature.properties.DESCRIPTION + "</span>"
        + "<br><span class='address'>" + feature.properties.ADDRESS1 + "</span>" + "</div></div>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html(feature.properties.NAME);
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
      museumSearch.push({
        name: layer.feature.properties.NAME,
        source: "Museums",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/LocalFoodPlaces.json", function (data) {
  museums.addData(rucsToGeojson(data, "Farmers Market"));
});

map = L.map("map", {
  zoom: 15,
  center: [38.57888, -121.491408],
  layers: [mapquestOSM, theaters]
});

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var overlays = {
  "<img src='assets/img/restaurants.png' width='27' height='45'>&nbsp;Restaurants": theaters,
  "<img src='assets/img/farmersmarkets.png' width='27' height='45'>&nbsp;Farmers Market": museums
};

var layerControl = L.control.layers(overlays, {
//  collapsed: isCollapsed
}).addTo(map);

/* Add overlay layers to map after defining layer control to preserver order */


var sidebar = L.control.sidebar("sidebar", {
  closeButton: true,
  position: "left"
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {

  $("#loading").hide();



  /* instantiate the typeahead UI */
  $("#searchbox").on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

/* Placeholder hack for IE */
if (navigator.appName == "Microsoft Internet Explorer") {
  $("input").each(function () {
    if ($(this).val() === "" && $(this).attr("placeholder") !== "") {
      $(this).val($(this).attr("placeholder"));
      $(this).focus(function () {
        if ($(this).val() === $(this).attr("placeholder")) $(this).val("");
      });
      $(this).blur(function () {
        if ($(this).val() === "") $(this).val($(this).attr("placeholder"));
      });
    }
  });
}
