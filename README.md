# EatLocal

Initially developed for West Sacramento by the 2015 Fellows.

Eat Local maps restaurants, grocery stores, and farmers markets using or selling locally-grown food within West Sacramento so that citizens who want to support locally-grown food can easily find and purchase it. This project was built during the Code for America 2015 Fellowship Build Week, primarily used as way for fellows in the West Sacramento team to get to know each other’s work styles better and build something useful.

##Contributing

The data for the project is publicly editable through [this google spreadsheet] (https://docs.google.com/a/codeforamerica.org/spreadsheets/d/1_lF5WrE_JhgqxeqRJZm2wQAaM-C_Bz-oUOkHHq6vhYk/edit#gid=0).

API are statically available thorugh /api/<type>, the documentation for which is located [here](http://codeforamerica.github.io/EatLocal/api-index.html). In the future, this will be made dynamic to reflect changes in the data source in real time.

Currently the page is hosted [here](http://codeforamerica.github.io/EatLocal/) using [gh-pages](https://pages.github.com/). To contribute, please fork the repository and issue pull requests.

The project can be accessed locally through the index.html file in the root directory where you clone the repository. Alternatively, if you have python installed you can run python -m SimpleHTTPServer in the root directory of the cloned repository and then access the site at localhost:8000.

##Next Steps

Add a backend to facillitate data security, more efficient api and data history storage, etc.

##License and Copyright

Copyright 2013-2014 Code for America, MIT License (see LICENSE.md for details)
