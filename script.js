const casper = require('casper').create({
    exitOnError: true,
    pageSettings: {
        loadImages: false,
        loadPlugins: false
    }
});

const loginUrl = 'https://stackoverflow.com/users/login';

const env = require('system').env;

var EMAIL = env.EMAIL;
var PASSWORD = env.PASSWORD;
var CUSTOM_URLS = env.CUSTOM_URLS;

if (!EMAIL || !PASSWORD) {
    casper.die('Email and password required.');
}

if (CUSTOM_URLS) {
    CUSTOM_URLS = CUSTOM_URLS.split(',').map(function (url) { return url.trim(); });
}

casper.start(loginUrl);

casper.then(function () {
    this.echo('Open Stackoverflow login page.');
    
    this.fill('#login-form', { email: EMAIL, password: PASSWORD }, true);
});

casper.wait(500);

casper.then(function () {
    if (this.getCurrentUrl().indexOf(loginUrl) === 0) {
        this.die('Could not log in. Check your credentials.');
    } else {
        this.echo('Clicking profile link.');

        this.click('.my-profile');

        this.then(function () {
            this.echo('User logged in.');
        });
    }
});

casper.each(CUSTOM_URLS, function (casper, url) {
    casper.thenOpen(url, function () {
        casper.echo('Visit ' + url + '.');
    });
});

casper.run();