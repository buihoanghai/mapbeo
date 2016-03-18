# mapbeo
Setup Development environment

Software requirements

		1) Nodejs
	Download here: https://nodejs.org/en/download/
		2) Ruby
	Download here: http://rubyinstaller.org/downloads/
Step by step

	Open terminal at your folder
	
	1) bower: http://bower.io/
		install bower: 
			npm install -g bower
		install libarys:
			bower install
	2) grunt: http://gruntjs.com/getting-started
		instal grunt-cli:
			npm install -g grunt-cli
		install grunt plugin:
			npm install
	3) scss: https://www.npmjs.com/package/grunt-contrib-sass
		install scss:
			gem install sass (https://www.npmjs.com/package/grunt-contrib-sass)
	4) For develop
		grunt develop
	5) For production
		grunt release
	6) Unit test
		grunt karma
	7) E2E
		Install protractor
			npm install -g protractor
			webdriver-manager update
		Run E2E
			webdriver-manager start
			protractor conf.js
