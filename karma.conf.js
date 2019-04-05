module.exports = function (config) {

    config.set({
        "basePath": "",
        "plugins": ["karma-jasmine", "karma-spec-reporter", "karma-chrome-launcher"],
        "frameworks": ["jasmine"],
        "files": [
            "src/**/*.js"
        ],
        "exclude": [
            "src/*.js"
        ],
        "reporters": ["spec"],
        "logLevel": config.LOG_INFO,
        "colors": true,
        "autoWatch": false,
        "browsers": ["ChromeHeadless"],
        "singleRun": true,
        "concurrency": "Infinity"
    });
};
