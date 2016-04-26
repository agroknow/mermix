/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    
    var url = Drupal.settings.ak_mermix_tools.popup_phone_url;
    var link = jQuery("<a></a>").attr('href', url).addClass('ctools-modal-mermix-modal').click(Drupal.CTools.Modal.clickAjaxLink);
    Drupal.ajax[url] = new Drupal.ajax(url, link.get(0), {
	url: url,
	event: 'click',
	progress: {type: 'throbber'}
    });
    link.click();
    jQuery(document).unbind("keydown", modalEventEscapeCloseHandler);
    jQuery('.modal-header .close').unbind('click');
});
