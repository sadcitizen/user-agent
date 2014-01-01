(function (window, document) {
	'use strict';
	function insert(el, value) {
		document.getElementById(el).innerText = value;
	}
	
	insert('user-agent', _ua.getUserAgent());
	insert('screen-resolution', _ua.getResolution().size);
	insert('browser', _ua.getBrowser());
	insert('version', 'full: ' + _ua.getVersion().full + ' | major: ' + _ua.getVersion().major);
	insert('engine', _ua.getEngine());
	insert('device', _ua.getDevice());
	insert('os', _ua.getOS());
	insert('architecture', _ua.getArchitecture());

})(this, document);