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
  background:"rgba(240, 240, 240, 0.9)",
  borderColor:"#ccc",
//  shadowBlur:,
//  shadow:
//removeElementsOnHide:true

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
  stem:"bottom right",
  stemLength:50,
  stemBase:20,
// Tells the tooltip to be fixed and be attached to the trigger, which is the default target
   background: "#df5946",
//  borderRadius:,
//  borderWidth:,
  borderColor:"#df5946"
//  shadowBlur:,
//  shadow:

};
var title = {'el':'Δες στο χάρτη πόσα ευρώ σε περιμένουν' , 'en':'Requests map'};
var content = {'el':'<img class="small" src="/sites/default/themes/realia/img/money.png" /><p> Συνολική ζήτηση < 50€ </p><br /> \
<img class="medium" src="/sites/default/themes/realia/img/money_m1.png" /><p> Συνολική ζήτηση > 50€ </p><br /> \
<img class="large" src="/sites/default/themes/realia/img/money_l1.png" /><p> Συνολική ζήτηση > 100€ </p>' ,
    'en':'<img class="small" src="/sites/default/themes/realia/img/money.png" /><p> Total requests < 50€ </p><br /> \
<img class="medium" src="/sites/default/themes/realia/img/money_m1.png" /><p> Total requests > 50€ </p><br /> \
<img class="large" src="/sites/default/themes/realia/img/money_l1.png" /><p> Total requests > 100€ </p>'};

var content_marker = {'el':' ευρώ σε περιμένουν στην ' , 'en':' euros are waiting for you at '};
var current_lang = jQuery('html').attr('lang');
jQuery(document).ready(function(){
   
   var element = jQuery("#gmap-looking-for-map");
   var infotoggle = jQuery('<div class="tip-toggle"><i class="fa fa-info-circle fa-3x" aria-hidden="true"></i></div>');
   element.prepend(infotoggle);
   var tip = new Opentip(infotoggle, '',title[current_lang], 
   { showOn: 'click',
     target: infotoggle,
     targetJoint:'top right',
     offset:[60,60], 
     style: 'info',
     //hideTrigger: 'closeButton',
     hideOn:'click',
     containInViewport: false,
    }); 
    tip.show();
//    var tipcontent = jQuery(content[current_lang]);
//    tipcontent.load(function(){
//	tip.setContent(content[current_lang]);
//	tip.show();
//    });
});

jQuery(window).load(function(){
    jQuery('.marker.euro-mark').each(function(){
	   var $this = jQuery(this);
	   var amount = $this.find('.amount').text();
	   var region = $this.data('region');
	   //var classname = $this.attr('class').replace('marker euro-mark no-bg no-hover ','');
	   new Opentip(jQuery(this), amount + content_marker[current_lang] + region, '', 
	   { 
	       style: 'marker_large'
	   });
	});
});



