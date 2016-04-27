  Drupal.theme.prototype.mermix_modal = function () {
    var html = ''
    html += '  <div id="ctools-modal">'
    html += '    <div class="ctools-modal-content mermix_modal">' // panels-modal-content
    html += '      <div class="modal-header">';
    html += '        <a class="close" href="#"><i class="fa fa-times" aria-hidden="true"></i>';
    //html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '        <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  }

