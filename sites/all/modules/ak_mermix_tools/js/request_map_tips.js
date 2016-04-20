/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Opentip.styles.mermix = {
  // Make it look like the alert style. If you omit this, it will default to "standard"
  extends: "alert",
  className: 'mermix',
  // Tells the tooltip to be fixed and be attached to the trigger, which is the default target
  background:'#e63434',
  borderRadius:0,
  borderWidth:1,
  borderColor:'#ce1919',
};

Opentip.styles.marker_large = {
  // Make it look like the alert style. If you omit this, it will default to "standard"
  extends: "alert",
  className: 'marker-large',
  // Tells the tooltip to be fixed and be attached to the trigger, which is the default target
  background:[ [ 0, "rgba(230, 52, 52, 0.7)" ], [ 1, "rgba(206, 25, 25, 0.9)" ] ],
  borderColor:"#ce1919",
//  shadowBlur:,
//  shadow:
removeElementsOnHide:true

};
Opentip.styles.marker_medium = {
  // Make it look like the alert style. If you omit this, it will default to "standard"
  extends: "alert",
  className: 'marker-medium',
  // Tells the tooltip to be fixed and be attached to the trigger, which is the default target
  background:[ [ 0, "rgba(255, 94, 0, 0.7)" ], [ 1, "rgba(220, 81, 0, 0.9)" ] ],
//  borderRadius:,
//  borderWidth:,
  borderColor:"#D06900",
//  shadowBlur:,
//  shadow:

};
Opentip.styles.marker_small = {
  // Make it look like the alert style. If you omit this, it will default to "standard"
  extends: "alert",
  className: 'marker-small',
  // Tells the tooltip to be fixed and be attached to the trigger, which is the default target
  background:[ [ 0, "rgba(255, 165, 0, 0.7)" ], [ 1, "rgba(234, 152, 0, 0.9)" ] ],
//  borderRadius:,
//  borderWidth:,
  borderColor:"#EA9800",
//  shadowBlur:,
//  shadow:

};

Opentip.styles.info = {
  // Make it look like the alert style. If you omit this, it will default to "standard"
  extends: "standard",
  className: 'info',
  tipJoint:"bottom right",
  stemLength:100,
  stemBase:40
  // Tells the tooltip to be fixed and be attached to the trigger, which is the default target
//  background:,
//  borderRadius:,
//  borderWidth:,
//  borderColor:,
//  shadowBlur:,
//  shadow:

};
var title = {'el':'Χάρτης ζήτησης' , 'en':'Requests map'};
var content = {'el':'Κάνε κλίκ στην περιοχή που σε ενδιαφέρει και δες την ζήτηση!' , 'en':'Click any region to see the demand'};
var content_marker = {'el':' ευρώ σε περιμένουν στην ' , 'en':' euros are waiting for you at '};
var current_lang = jQuery('html').attr('lang');
jQuery(document).ready(function(){
   
   new Opentip("#gmap-looking-for-map", content[current_lang], title[current_lang], 
   { showOn: 'creation',
     target: '#gmap-looking-for-map',
     targetJoint:'top left',
     offset:[650,400], 
     style: 'info',
     hideOn:'remove',
     containInViewport: false,
    }); 
});

jQuery(window).load(function(){
    jQuery('.marker.euro-mark').each(function(){
	var $this = jQuery(this);
	   var amount = $this.find('.amount').text();
	   var region = $this.data('region');
	   var classname = $this.attr('class').replace('marker euro-mark no-bg no-hover ','');
	   new Opentip(jQuery(this), amount + content_marker[current_lang] + region, '', 
	   { 
	       style: 'marker_' + classname
	   });
	});
});



