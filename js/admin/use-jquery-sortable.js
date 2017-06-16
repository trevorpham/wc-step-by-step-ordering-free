(function($) {
  $(document).ready(function() {

    if ( typeof sbsLicenseValid === 'undefined' ) {
      return;
    }

    function serializeData() {
      var data = $('#sbs-order').sortable('serialize').get();
      var jsonString = JSON.stringify(data);
      $('input#step_order').val(jsonString);
    }

    var group = $('.sortable').sortable({
      group: 'sortable',
      nested: true,
      isValidTarget: function($item, container) {

        if ( !sbsLicenseValid && $(container.el).is('.step-sortable') && $('#sbs-order').children().not('.placeholder, .dragged').length >= 2  ) {
          return false;
        }

        if ( !sbsLicenseValid && $(container.el).is('.package-sortable') && $('#sbs-order').children().not('.placeholder, .dragged').length >= 1  ) {
          return false;
        }

        if ( $item.attr('parent-id') === '0' && ($(container.el).is('#sbs-order') || $(container.el).is('#sbs-pool')) ) {
          return true;
        }

        if ( $item.attr('parent-id') === $(container.el).parent().attr('data-catid') ) {
          return true;
        }

        return false;

      },
      onDrop: function($item, container, _super) {
        serializeData();
        _super($item, container);
      }
    });

    if ( !sbsLicenseValid ) {
      $('.onf-sortable').sortable('disable');
    }

    /**
     * Buttons for moving sortables, in case drag and drop does not work.
     */
    $('.sbs-sortable-item-move-up').on('click touchend', function() {
      $item = $(this).parent().parent();
      $before = $item.prev();
      if ($before) {
        $item.insertBefore($before);
        serializeData();
      }
    });

    $('.sbs-sortable-item-move-down').on('click touchend', function() {
      $item = $(this).parent().parent();
      $next = $item.next();
      if ($next) {
        $item.insertAfter($next);
        serializeData();
      }
    });

    $('.sbs-sortable-item-add').on('click touchend', function() {
      $item = $(this).parent().parent();

      if ( !sbsLicenseValid && $('.step-sortable').length && $('#sbs-order').children().length >= 2  ) {
        return false;
      }

      if ( !sbsLicenseValid && $('.package-sortable').length && $('#sbs-order').children().length >= 1  ) {
        return false;
      }

      $item.detach().appendTo('#sbs-order');
      serializeData();
    });

    $('.sbs-sortable-item-remove').on('click touchend', function() {
      $item = $(this).parent().parent();
      $item.detach().appendTo('#sbs-pool');
      serializeData();
    });

    if ( !sbsLicenseValid && $('#sbs-order-container').length ) {
      $('.sbs-sortable-item-add').off();
      $('.sbs-sortable-item-remove').off();
      $('.sbs-sortable-item-move-up').off();
      $('.sbs-sortable-item-move-down').off();
    }

  });
})(jQuery);
