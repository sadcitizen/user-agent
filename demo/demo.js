(function (window, document) {
	'use strict';
	function fillValue(el, value) {
		document.getElementById(el).innerText = value;
	}
	
	fillValue('user-agent', Utils.browser().getUserAgent());
	fillValue('screen-resolution', Utils.browser().getResolution().size);
	fillValue('browser', Utils.browser().getBrowser());

})(this, document);