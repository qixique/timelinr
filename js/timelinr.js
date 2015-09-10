
//timelinr
/* ----------------------------------
jQuery Timelinr 0.9.54
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

    jQuery(function(){
      jQuery().timelinr({
        orientation:  'vertical',
        issuesSpeed:  300,
        datesSpeed:   100,
        arrowKeys:    'true',
        startAt:    1
      })
    });
  var howManyDates;
  var heightDate;
jQuery.fn.timelinr = function(options){
	// default plugin settings
	settings = jQuery.extend({
		orientation: 				'horizontal',		// value: horizontal | vertical, default to horizontal
		containerDiv: 				'#timeline',		// value: any HTML tag or #id, default to #timeline
		datesDiv: 					'#dates',			// value: any HTML tag or #id, default to #dates
		datesSelectedClass: 		'selected',			// value: any class, default to selected
		datesSpeed: 				'normal',			// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
		issuesDiv: 					'#issues',			// value: any HTML tag or #id, default to #issues
		issuesSelectedClass: 		'selected',			// value: any class, default to selected
		issuesSpeed: 				'fast',				// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
		issuesTransparency: 		0.2,				// value: integer between 0 and 1 (recommended), default to 0.2
		issuesTransparencySpeed: 	500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		prevButton: 				'#prev',			// value: any HTML tag or #id, default to #prev
		nextButton: 				'#next',			// value: any HTML tag or #id, default to #next
		arrowKeys: 					'false',			// value: true | false, default to false
		startAt: 					1,					// value: integer, default to 1 (first)
		autoPlay: 					'false',			// value: true | false, default to false
		autoPlayDirection: 			'forward',			// value: forward | backward, default to forward
		autoPlayPause: 				2000				// value: integer (1000 = 1 seg), default to 2000 (2segs)
	}, options);

	jQuery(function(){
		// setting variables... many of them
		 howManyDates = jQuery(settings.datesDiv+' li').length;
		var howManyIssues = jQuery(settings.issuesDiv+' li').length;
		var currentDate = jQuery(settings.datesDiv).find('a.'+settings.datesSelectedClass);
		var currentIssue = jQuery(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);
		var widthContainer = jQuery(settings.containerDiv).width();
		var heightContainer = jQuery(settings.containerDiv).height();
		var widthIssues = jQuery(settings.issuesDiv).width();
		var heightIssues = jQuery(settings.issuesDiv).height();
		var widthIssue = jQuery(settings.issuesDiv+' li').width();
		var heightIssue = jQuery(settings.issuesDiv+' li').height();
		var widthDates = jQuery(settings.datesDiv).width();
		var heightDates = jQuery(settings.datesDiv).height();
		var widthDate = jQuery(settings.datesDiv+' li').width();
		 heightDate = jQuery(settings.datesDiv+' li').height();
		// set positions!
		if(settings.orientation == 'horizontal') {	
			jQuery(settings.issuesDiv).width(widthIssue*howManyIssues);
			jQuery(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
			var defaultPositionDates = parseInt(jQuery(settings.datesDiv).css('marginLeft').substring(0,jQuery(settings.datesDiv).css('marginLeft').indexOf('px')));
		} else if(settings.orientation == 'vertical') {
			jQuery(settings.issuesDiv).height(heightIssue*(howManyIssues));
			jQuery(settings.datesDiv).height(heightDate*howManyDates).css('marginTop',heightContainer/2-heightDate/2);
			var defaultPositionDates = parseInt(jQuery(settings.datesDiv).css('marginTop').substring(0,jQuery(settings.datesDiv).css('marginTop').indexOf('px')));
		}
		
		jQuery(settings.datesDiv).on('click','a',(function(event){

			//////
			// jQuery(settings.datesDiv).height(heightDate*(howManyIssues+6));
		
			// console.info("height"+heightIssue*(howManyIssues+2));

//////
			event.preventDefault();
			// first vars
			var whichIssue = jQuery(this).text();
			var currentIndex = jQuery(this).parent().prevAll().length;
			// moving the elements
			if(settings.orientation == 'horizontal') {
				jQuery(settings.issuesDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
			} else if(settings.orientation == 'vertical') {
				jQuery(settings.issuesDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
			}
			jQuery(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
			if(howManyDates == 1) {
				jQuery(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if(jQuery(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					jQuery(settings.prevButton).fadeOut('fast');
				 	jQuery(settings.nextButton).fadeIn('fast');
				} 
				else if(jQuery(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					jQuery(settings.nextButton).fadeOut('fast');
					jQuery(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( jQuery(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					jQuery(settings.nextButton).fadeIn('fast');
					jQuery(settings.prevButton).fadeOut('fast');
				} 
				else if( jQuery(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					jQuery(settings.prevButton).fadeIn('fast');
					jQuery(settings.nextButton).fadeOut('fast');
				}
				else {
					jQuery(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
			// now moving the dates
			jQuery(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
			jQuery(this).addClass(settings.datesSelectedClass);
			if(settings.orientation == 'horizontal') {
				jQuery(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
			} else if(settings.orientation == 'vertical') {

				jQuery(settings.datesDiv).animate({'marginTop':defaultPositionDates-(heightDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
			}
		}));

		jQuery(settings.nextButton).on('click', function(event){
			event.preventDefault();
			// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
			var currentIndex = jQuery(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues = parseInt(jQuery(settings.issuesDiv).css('marginLeft').substring(0,jQuery(settings.issuesDiv).css('marginLeft').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/widthIssue;
				var currentPositionDates = parseInt(jQuery(settings.datesDiv).css('marginLeft').substring(0,jQuery(settings.datesDiv).css('marginLeft').indexOf('px')));
				var currentIssueDate = currentPositionDates-widthDate;
				if(currentPositionIssues <= -(widthIssue*howManyIssues-(widthIssue))) {
					jQuery(settings.issuesDiv).stop();
					jQuery(settings.datesDiv+' li:last-child a').click();
				} else {
					if (!jQuery(settings.issuesDiv).is(':animated')) {
						// bugixed from 0.9.52: now the dates gets centered when there's too much dates.
						jQuery(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues = parseInt(jQuery(settings.issuesDiv).css('marginTop').substring(0,jQuery(settings.issuesDiv).css('marginTop').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/heightIssue;
				var currentPositionDates = parseInt(jQuery(settings.datesDiv).css('marginTop').substring(0,jQuery(settings.datesDiv).css('marginTop').indexOf('px')));
				var currentIssueDate = currentPositionDates-heightDate;
				if(currentPositionIssues <= -(heightIssue*howManyIssues-(heightIssue))) {
					jQuery(settings.issuesDiv).stop();
					jQuery(settings.datesDiv+' li:last-child a').click();
				} else {
					if (!jQuery(settings.issuesDiv).is(':animated')) {
						// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
						jQuery(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates == 1) {
				jQuery(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if(jQuery(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					jQuery(settings.prevButton).fadeOut('fast');
				 	jQuery(settings.nextButton).fadeIn('fast');
				} 
				else if(jQuery(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					jQuery(settings.nextButton).fadeOut('fast');
					jQuery(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( jQuery(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					jQuery(settings.prevButton).fadeOut('fast');
				} 
				else if( jQuery(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					jQuery(settings.nextButton).fadeOut('fast');
				}
				else {
					jQuery(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
		});

		jQuery(settings.prevButton).click(function(event){
			event.preventDefault();
			// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
			var currentIndex = jQuery(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();
			if(settings.orientation == 'horizontal') {
				var currentPositionIssues = parseInt(jQuery(settings.issuesDiv).css('marginLeft').substring(0,jQuery(settings.issuesDiv).css('marginLeft').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/widthIssue;
				var currentPositionDates = parseInt(jQuery(settings.datesDiv).css('marginLeft').substring(0,jQuery(settings.datesDiv).css('marginLeft').indexOf('px')));
				var currentIssueDate = currentPositionDates+widthDate;
				if(currentPositionIssues >= 0) {
					jQuery(settings.issuesDiv).stop();
					jQuery(settings.datesDiv+' li:first-child a').click();
				} else {
					if (!jQuery(settings.issuesDiv).is(':animated')) {
						// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
						jQuery(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
					}
				}
			} else if(settings.orientation == 'vertical') {
				var currentPositionIssues = parseInt(jQuery(settings.issuesDiv).css('marginTop').substring(0,jQuery(settings.issuesDiv).css('marginTop').indexOf('px')));
				var currentIssueIndex = currentPositionIssues/heightIssue;
				var currentIssueDate = currentPositionDates+heightDate;
				if(currentPositionIssues >= 0) {
					jQuery(settings.issuesDiv).stop();
					jQuery(settings.datesDiv+' li:first-child a').click();
				} else {
					if (!jQuery(settings.issuesDiv).is(':animated')) {
						// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
						jQuery(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
					}
				}
			}
			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates == 1) {
				jQuery(settings.prevButton+','+settings.nextButton).fadeOut('fast');
			} else if(howManyDates == 2) {
				if(jQuery(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
					jQuery(settings.prevButton).fadeOut('fast');
				 	jQuery(settings.nextButton).fadeIn('fast');
				} 
				else if(jQuery(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
					jQuery(settings.nextButton).fadeOut('fast');
					jQuery(settings.prevButton).fadeIn('fast');
				}
			} else {
				if( jQuery(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
					jQuery(settings.prevButton).fadeOut('fast');
				} 
				else if( jQuery(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
					jQuery(settings.nextButton).fadeOut('fast');
				}
				else {
					jQuery(settings.nextButton+','+settings.prevButton).fadeIn('slow');
				}	
			}
		});
		// keyboard navigation, added since 0.9.1
		if(settings.arrowKeys=='true') {
			if(settings.orientation=='horizontal') {
				jQuery(document).keydown(function(event){
					if (event.keyCode == 39) { 
				       jQuery(settings.nextButton).click();
				    }
					if (event.keyCode == 37) { 
				       jQuery(settings.prevButton).click();
				    }
				});
			} else if(settings.orientation=='vertical') {
				jQuery(document).keydown(function(event){
					if (event.keyCode == 40) { 
				       jQuery(settings.nextButton).click();
				    }
					if (event.keyCode == 38) { 
				       jQuery(settings.prevButton).click();
				    }
				});
			}
		}
		// default position startAt, added since 0.9.3
		// jQuery(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click'); //custom
		// autoPlay, added since 0.9.4
		if(settings.autoPlay == 'true') { 
			setInterval("autoPlay()", settings.autoPlayPause);
		}
	});
};

// autoPlay, added since 0.9.4
function autoPlay(){
	var currentDate = jQuery(settings.datesDiv).find('a.'+settings.datesSelectedClass);
	if(settings.autoPlayDirection == 'forward') {
		if(currentDate.parent().is('li:last-child')) {
			jQuery(settings.datesDiv+' li:first-child').find('a').trigger('click');
		} else {
			currentDate.parent().next().find('a').trigger('click');
		}
	} else if(settings.autoPlayDirection == 'backward') {
		if(currentDate.parent().is('li:first-child')) {
			jQuery(settings.datesDiv+' li:last-child').find('a').trigger('click');
		} else {
			currentDate.parent().prev().find('a').trigger('click');
		}
	}
}



//ajax js 

jQuery(document).ready(function(){
	var counter=0;
	var page=2;


  jQuery("#timeline .block #dates").on("click","li.last",function(){
  
  	counter++;
  	var c=0;
	var data="";
  	var issu="";
	jQuery("#timeline li").removeClass('last');
 	var htmlobj=jQuery.ajax({url:"/ajaxtimeline/"+counter,async:false});
  
  	var out=htmlobj.responseText.split('</li>')

 console.info("out length is:"+out[0]);
  for(c;c<out.length;c++)
  {
  	if(c < Math.floor(out.length/2))
  		data=data+out[c]+"</li>";
  		
  	else
  		issu=issu+out[c]+"</li>";
  }
jQuery("#timeline .block #dates").append(data);
jQuery("#timeline .block #issues").append(issu);
howManyDates= jQuery("#dates li").length;
// console.info("howManyDates is:"+howManyDates);
jQuery("#dates").height(100*(howManyDates));
  });

});