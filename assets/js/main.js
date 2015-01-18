var map,
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
      if (place.Type === typeFilter
          && typeof place.Latitude === 'number'
          && typeof place.Longitude === 'number') {
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
  },
  createMarkerGeoJsonLayer = function(type) {
    return new L.geoJson(null, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "assets/img/pin-" + type + ".png",
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
          var content = "<div class='row map-popup'><div>"
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
        }
      }
    });
  };

/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: '<a href="http://www.mapquest.com/" target="_blank">MapQuest</a> | <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>'
});

/* Overlay Layers */
var farmersMarkets = createMarkerGeoJsonLayer('farmersmarkets');
var restaurants = createMarkerGeoJsonLayer('restaurants');
var csas = createMarkerGeoJsonLayer('csa');
var wineries = createMarkerGeoJsonLayer('wineries');
var agritourism = createMarkerGeoJsonLayer('agritourism');
window.awfulHackCallback = function() {
  restaurants.addData(rucsToGeojson(window.awfulHackDataStore, "Restaurant"));
  farmersMarkets.addData(rucsToGeojson(window.awfulHackDataStore, "Farmers Market"));
  csas.addData(rucsToGeojson(window.awfulHackDataStore, "CSA"));
  wineries.addData(rucsToGeojson(window.awfulHackDataStore, "Winery"));
  agritourism.addData(rucsToGeojson(window.awfulHackDataStore, "Agritourism"));

  // TODO: figure out why this is necessary
  document.getElementById('loading').style.display = 'none';
}
window.awfulHackDynamicApiLoad();

map = L.map("map", {
  zoom: 15,
  center: [38.5750753, -121.4844454],
  layers: [mapquestOSM, restaurants]
});

var overlays = {
    "<img src='assets/img/pin-restaurants.png' width='27' height='45'>&nbsp;Restaurants": restaurants,
    "<img src='assets/img/pin-farmersmarkets.png' width='27' height='45'>&nbsp;Farmers' Markets": farmersMarkets,
    "<img src='assets/img/pin-csa.png' width='27' height='45'>&nbsp;CSA": csas,
    "<img src='assets/img/pin-wineries.png' width='27' height='45'>&nbsp;Wineries": wineries,
    "<img src='assets/img/pin-agritourism.png' width='27' height='45'>&nbsp;Agritourism": agritourism
  },
  layerControl = L.control.layers(overlays).addTo(map);

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
