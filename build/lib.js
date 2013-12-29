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
                    Gecko: /mozilla(?!.*webkit).*\Wgecko\W/i,
                    Webkit: /webkit\W/i,
                    Trident: /trident/i,
                    Presto: /presto/i
                },
                os: {
                    Windows: /windows/i,
                    Linux: /linux/i,
                    iOS: /(ipad|iphone|ipod)/i,
                    Mac: /macintosh/i,
                    Android: /android/i
                },
                device: {
                    Tablet: /(ipad|android(?!.*mobile))/i,
                    Mobile: /(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i
                },
                architecture: {
                    x64: /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i,
                    x32: /((?:i[346]|x)86)[;\)]/i,
                    //ARM: //i
                }
            },
            agent = agent || parseUA();

        /* parsers */

        function parseUA() {
            var ua = {};

            ua.os = parseOS();
            ua.browser = parseBrowser();
            ua.version = parseVersion(ua.browser);
            ua.engine = parseEngine();
            ua.device = parseDevice();
            ua.architecture = parseArchitecture();
            
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

        function parseDevice() {
            var device = parseProperty('device');
            return device || 'Desktop';
        }

        function parseEngine() {
            return parseProperty('engine');    
        }

        function parseArchitecture() {
            return parseProperty('architecture');
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

        function getEngine() {
            return getProperty('engine');    
        }

        function getArchitecture() {
            return getProperty('architecture');    
        }

        function checkBrowserWithVersion(browser, version) {
            if (getBrowser() === browser) {
                return version === undefined ? true : getVersion().major === version;
            } 
            return false;
        }

        function isIE(version) {
            return checkBrowserWithVersion('Internet Explorer', version);
        }
        
        function isSafari(version) {
            return checkBrowserWithVersion('Safari', version);
        }
        
        function isChrome(version) {
            return checkBrowserWithVersion('Chrome', version);
        }
        
        function isOpera(version) {
            return checkBrowserWithVersion('Opera', version);
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
            getVersion: getVersion,
            getOS: getOS,
            getDevice: getDevice,
            getEngine: getEngine,
            getArchitecture: getArchitecture,
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