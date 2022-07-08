declare var $: any;
export class ComponentInitilizer {
  //make card extensible
  initialCard(dom: string | null | undefined) {
    $(dom).on('maximized.lte.cardwidget', function (e: any) {
      setTimeout(() => {
        var parent = $(e.currentTarget).children().last();
        var target = $(e.currentTarget).height();
        parent.children().css({ minHeight: target });
      }, 500);
    });

    $(dom).on('minimized.lte.cardwidget', function (e: any) {
      setTimeout(() => {
        var parent = $(e.currentTarget).children().last();

        parent.children().css({ minHeight: '' });
      }, 1);
    });
  }

  // fix action buttons
  fixTopButtons() {
    // $(document).scroll(function (event) {
    //   var actionButtons = $('#action-button-inner');
    //   var top = actionButtons.offset().top;
    //   if (top > 180) {
    //     $('#action-button-inner').find('img').attr('width', 25);

    //     $('#action-button-inner')
    //       .find('a')
    //       .removeClass('click-post-action-button');
    //     $('#action-button-inner').find('a').css('padding', '5px 5px');
    //     $('#action-button-inner')
    //       .find('a')
    //       .addClass('click-post-action-button-scrolled');
    //     actionButtons.css('background-color', '#343A40');
    //   } else {
    //     $('#action-button-inner').find('img').attr('width', 35);
    //     $('#action-button-inner')
    //       .find('a')
    //       .addClass('click-post-action-button');
    //     $('#action-button-inner').find('a').css('padding', '');
    //     $('#action-button-inner')
    //       .find('a')
    //       .removeClass('click-post-action-button-scrolled');
    //     actionButtons.css('background-color', 'white');
    //   }
    // });
    $('[data-toggle="tooltip"]').tooltip();
    $('#checkboxPrimary22').click(function (e) {
      e.stopPropagation();
    });
  }

  setExpandableTable() {
    let $__default: any;
    let SELECTOR_ARIA_ATTR = 'aria-expanded';
    let SELECTOR_DATA_TOGGLE$2 = '[data-widget="expandable-table"]';
    let SELECTOR_EXPANDABLE_BODY = '.expandable-body';

    $__default = /*#__PURE__*/ this._interopDefaultLegacy($);
    $__default['default'](SELECTOR_DATA_TOGGLE$2).each(function (
      _: any,
      $header: any
    ) {
      var $type = $__default['default']($header).attr(SELECTOR_ARIA_ATTR);
      var $body = $__default['default']($header)
        .next(SELECTOR_EXPANDABLE_BODY)
        .children()
        .first()
        .children();

      if ($type === 'true') {
        debugger;
        $body.show();
      } else if ($type === 'false') {
        $body.hide();
        $body.parent().parent().addClass('d-none');
      }
    });
  }

  setSelect2(component: string, options: {} | null) {
    $(component).select2(options);
  }
  private _interopDefaultLegacy(e: any) {
    return e && typeof e === 'object' && 'default' in e ? e : { default: e };
  }
  setInputClearable() {
    $('input.clearable').addClass('x onX');
  }
}
