(function (windows) {
    'use strict';

    var Logger = function() {

        function leadingZero(value) {
            return (value < 10 ? '0' : '') + value;
        }

        function getNowDateTime() {
            var date = new Date();
            return leadingZero(date.getHours()) + ':' +
                leadingZero(date.getMinutes()) + ':' +
                leadingZero(date.getSeconds()) + '.' + date.getMilliseconds();
        }

        function log(msg) {
            if (arguments.length) {
                console.log(getNowDateTime() + ' => ' + msg);
            }
        }

        return {
            log: log
        }
    };

    var Browser = function() {
        var userAgent = (windows.navigator && windows.navigator.userAgent) || '',
            defaults = {
                browser: null,
                engine: null,
                os: null,
                device: null,
                version: {
                    full: null,
                    major: null,
                    minor: null
                }
            }, 
            masks = {
                browser: {
                    Opera: /opr|opera.*\Wpresto\W/i,
                    Chrome: /webkit\W.*(chrome|chromium)\W/i,
                    Firefox: /mozilla.*\Wfirefox\W/i,
                    'Internet Explorer': /MSIE/i,
                    Safari: /webkit\W(?!.*chrome).*safari\W/i
                },
                engine: {
                    gecko: /mozilla(?!.*webkit).*\Wgecko\W/i,
                    webkit: /webkit\W/i,
                    trident: /trident/i,
                    presto: /presto/i
                },
                os: {
                    Windows: /windows/i,
                    Linux: /linux/i,
                    iOS: /(ipad|iphone|ipod)/i,
                    Mac: /macintosh/i,
                    Android: /android/i
                },
                device: {
                    tablet: /(ipad|android(?!.*mobile))/i,
                    mobile: /(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i
                }
            },
            agent = agent || parseUA();

        /* parsers */

        function parseUA() {
            var ua = {};

            ua.os = parseOS();
            ua.browser = parseBrowser();
            ua.version = parseVersion(ua.browser);
            ua.device = parseDevice();
            
            return ua;
        }

        function parseProperty(prop) {
            for (var pr in masks[prop]) {
                if (masks[prop].hasOwnProperty(pr) && masks[prop][pr].test(getUserAgent())) {
                    return pr;
                }
            }
        }

        function parseOS () {
            return parseProperty('os');
        }

        function parseBrowser() {
            return parseProperty('browser');
        }

        function parseVersion(browser) {
            var version, parts = [];

            if (browser === 'Internet Explorer') {
                version = getUserAgent().match(new RegExp('MSIE (\\S+)', 'i'))[1].replace(';','');
            } else {
                browser = (browser === 'Opera' ? '(?:OPR|Version)' : browser);
                version = getUserAgent().match(new RegExp(browser + '\\/(\\S+)', 'i'))[1];
            }
            
            parts = version.split('.');

            return {
                full: version,
                major: parseInt(parts[0]),
            }
        }

        function parseDevice() {
            return parseProperty('device');
        }

        /* getters */

        function getProperty(prop) {
            return agent[prop] ? agent[prop] : 'Unknown';
        }

        function getOS() {
            return getProperty('os');
        }

        function getBrowser() {
            return getProperty('browser');
        }
        
        function getVersion() {
            return getProperty('version');
        }

        function getDevice() {
            return getProperty('device');
        }


/*
        function isIE() {
            return checkBrowser(masks.browser.ie);
        }
        
        function isSafari() {
            return checkBrowser(masks.browser.safari);
        }
        
        function isChrome() {
            return checkBrowser(masks.browser.chrome);
        }
        
        function isOpera() {
            return checkBrowser(masks.browser.opera) || checkBrowser(masks.browser.opera12);
        }*/

        function getUserAgent() {
            return userAgent;
        }

        function getResolution() {
            return {
                width: window.screen.width,
                height: window.screen.height,
                size: window.screen.width + 'x' + window.screen.height
            };
        }

        function checkBrowser(exp) {
            return function() {
                return (exp).text(ua);
            };
        }

        return {
            getUserAgent: getUserAgent,
            getResolution: getResolution,
            getBrowser: getBrowser,
            getVersion: getVersion,
            getOS: getOS,
            getDevice: getDevice,
            /*isIE: isIE,
            isSafari: isSafari,
            isChrome: isChrome,
            isOpera: isOpera*/
        }
    }

    var Utils = function () {
        return {
            logger: Logger,
            browser: Browser
        }
    };

    windows.Utils = new Utils();
})(this);