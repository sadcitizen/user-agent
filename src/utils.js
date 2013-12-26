(function (windows) {
	'use strict';

	var userAgent = (windows.navigator && windows.navigator.userAgent) || '';


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

		var masks = {
            browsers: {
                opera: /opr/i,
                opera12: /opera.*\Wpresto\W/i,
                chrome: /webkit\W.*(chrome|chromium)\W/i,
                firefox: /mozilla.*\Wfirefox\W/i,
                ie: /MSIE/i,
                safari: /webkit\W(?!.*chrome).*safari\W/i
            },
            engines: {
                gecko: /mozilla(?!.*webkit).*\Wgecko\W/i,
                webkit: /webkit\W/i,
                trident: /trident/i,
                presto: /presto/i
            },
            os: {
                windows: /windows/i,
                linux: /linux/i,
                ios: /(ipad|iphone|ipod)/i,
                macos: /macintosh/i,
                android: /android/i    
            },
            devices: {
                tablet: /(ipad|android(?!.*mobile))/i,
                mobile: /(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i
            }
        };

        function getBrowser() {
            for (var browser in masks.browsers) {
                if (masks.browsers.hasOwnProperty(browser) && masks.browsers[browser].test(getUserAgent())) {
                    return browser;
                }
            }
            return 'unknown';
        }
        
        function getOS() {
            for (var os in masks.os) {
                if (masks.os.hasOwnProperty(os) && masks.os[os].test(getUserAgent())) {
                    return os;
                }
            }
            return 'unknown';
        }

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
        }

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
            getOS: getOS,
            isIE: isIE,
            isSafari: isSafari,
            isChrome: isChrome,
            isOpera: isOpera
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