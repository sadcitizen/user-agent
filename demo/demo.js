(function (window, document) {
	'use strict';
	function insert(el, value) {
		document.getElementById(el).innerText = value;
	}
	
	var browser = Utils.browser();

	insert('user-agent', browser.getUserAgent());
	insert('screen-resolution', browser.getResolution().size);
	insert('browser', browser.getBrowser());
	insert('version', 'full: ' + browser.getVersion().full + ' | major: ' + browser.getVersion().major);
	insert('engine', browser.getEngine());
	insert('device', browser.getDevice());
	insert('os', browser.getOS());
	insert('architecture', browser.getArchitecture());

})(this, document);