/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

handle_dialog_video = function(event) {
	event.preventDefault();
	Site.dialog_video
		.set_title(this.getAttribute('title'))
		.set_content_from_url(this.getAttribute('href'))
		.addClass('video')
		.open_when_ready();
}

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	//Video link connected to click event
	Site.video_link = document.querySelector('a.youtube');
	Site.video_link.addEventListener('click', handle_dialog_video);
	// New dialog video
	Site.dialog_video = new Caracal.Dialog();

	// handle analytics event
	var dataLayer = window.dataLayer || new Array();
	for (var i=0, count=Caracal.ContactForm.list.length; i<count; i++)
		Caracal.ContactForm.list[i].events.connect('submit-success', function(data) {
			dataLayer.push({'event': 'leadSent'});
			return true;
		});
};


// connect document `load` event with handler function
$(Site.on_load);
