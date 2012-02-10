/**
*
* @fileOverview In place edit allows HTML inputs to submit to the server without the need
*   for a submit button HTML fields are attached to various through the use of the
*   "in_place_data" HTML attribute (UJS)
*
* Options:
*   are space separated strings of values contained in options
*   are modular with a very specific purpose
*   are stackable (except where explicitly noted) to achieve a combination of effects
*   are documented inline below
*
*/
var InPlaceEdit = function(container) {
  var data,
      _container = container,
      options = [
                 'add_class_on_blur',
                 'add_class_on_focus',
                 'add_class_on_submit',
                 'blur_on_autocomplete_select',
                 'blur_on_submit',
                 'disable_inputs_on_submit',
                 'focus_respective_inputs',
                 'remove_class_on_blur',
                 'remove_class_on_focus',
                 'submit_on_autocomplete_select',
                 'submit_on_blur',
                 'submit_on_blur_no_delay',
                 'submit_on_click',
                 'submit_on_enter',
                 'toggle_actions_on_mouseover',
                 'toggle_label_on_blur',
                 'toggle_label_on_click',
                 'toggle_label_on_enter'
                ];

  function init() {
    setObjects();
    setListeners();
  }

  function setListeners() {
    _wireOptions($(_container));
  }

  function setObjects() {
    data = $(_container).find('form').serializeArray();
  }

  /*
  * @description Gathers all DOM elements and calls parseOption on each, and evals if safe
  * @seeAlso parseOption
  */
  function _wireOptions(handle) {
    $((handle.data('in_place_data')||'').split(' ')).each(function() {
      if (_parseOption(this))
        eval(_toCamel(this.toString()) + '.call($(_container))');
    });
  }

  function _toCamel(handle) {
    return handle.replace(/(\_[a-z])/g, function($1) {
      return $1.toUpperCase().replace('_','');
    });
  }

  /*
  * @description Matches the option passed
  * @context {String} Argument to parse
  */
  function _parseOption(option) {
    if (option.toString().length == 0)
      return false;
    if (options.indexOf(option.toString()) == -1) {
      console.warn(' option "' + option + '" is invalid. Valid options include: ' + options.join(', '));
      return false;
    }
    return true;
  }

  /*
  * @description Submit form when focus leaves the input field
  *   Suitable for an in_place_edit containing multiple :input elements
  * @context {jQuery handle} DOM element to apply action on
  */
  function submitOnBlur() {
    var handle = $(this).find('form');
    handle.find(':input').bind({
      focus: function() {
        // Since this is an array of objects, only update the value for the field
        // currently selected
        var new_value = { name: $(this).attr('name'), value: $(this).val() };
        $(data).each(function(x, obj) {
          if (obj.name == new_value.name) {
            data[x].value = new_value.value;
          }
        });
        clearTimeout(handle.timer);
      },
      blur: function() {
       handle.timer = setTimeout(function() {
         if (JSON.stringify(data) != JSON.stringify(handle.serializeArray())) {
           data = handle.serializeArray();
           handle.trigger('submit');
         }
       }, 10);
      }
    });
  }

  /*
  * @description Submit form when focus leaves the input field
  *   Suitable for an in_place_edit containing only one :input element
  * @context {jQuery handle} DOM element to apply action on
  */
  function submitOnBlurNoDelay() {
    var handle = $(this).find('form');
    handle.find(':input').bind('blur', function() {
      if (JSON.stringify(data) != JSON.stringify(handle.serializeArray())) {
        data = handle.serializeArray();
        handle.trigger('submit');
      }
    });
  }

  /*
  * @description Submit form when an element (ie check box) is clicked
  *   Suitable for an in_place_edit containing check boxes
  * @context {jQuery handle} DOM element to apply action on
  */
  function submitOnClick() {
    var handle = $(this).find('form');
    handle.find('input[type="checkbox"]').bind('click', function() {
      handle.trigger('submit');
    });
  }

  /*
  * @description Submit the form when the enter key is pressed
  *   Catches default event
  * @context {jQuery handle} DOM element to apply action on
  */
  function submitOnEnter() {
    var handle = $(this).find('form');
    handle.find(':input').bind({
      focus: function() {
        data = handle.serializeArray();
      },
      keypress: function(evt) {
        if (evt.which == $.ui.keyCode.ENTER)  {
          evt.preventDefault();
          if (JSON.stringify(data) != JSON.stringify(handle.serializeArray())) {
            data = handle.serializeArray();
            $(this).trigger('submit');
          }
        }
      }
    });
  }

  /*
  * @description Submit the form when selecting an autocomplete option
  * @context {jQuery handle} DOM element to apply action on
  */
  function submitOnAutocompleteSelect() {
    $(this).find('.ui-autocomplete-input').bind("autocompleteselect", function(event, ui) {
      var handle = $(this);
      handle.val(ui.item.label);
      $(handle.attr('id_element')).val(ui.item.id);
      handle.parents('form').trigger('submit');
    });
  }

  /*
  * @description Add the data('add_class_on_focus') class from the currently focused :input field
  *   Remove data('add_class_on_focus') class back on blur
  * @context {jQuery handle} DOM element to apply action on
  */
  function addClassOnFocus() {
    var container = $(this);
    var handle = $(this).find(':input');
    handle.bind({
      focus: function() {
        $(this).addClass(container.data('add_class_on_focus'));
      },
      blur: function() {
        $(this).removeClass(container.data('add_class_on_focus'));
      }
    });
  }

  /*
  * @description Remove the data('remove_class_on_focus') class from the blurred :input field
  *   Add data('remove_class_on_focus') class back on blur
  * @context {jQuery handle} DOM element to apply action on
  */
  function removeClassOnFocus() {
    var container = $(this);
    var handle = $(this).find(':input');
    handle.bind({
      focus: function() {
        $(this).removeClass(container.data('remove_class_on_focus'));
      },
      blur: function() {
        $(this).addClass(container.data('remove_class_on_focus'));
      }
    });
  }

  /*
  * @description Add the data('add_class_on_blur') class from the currently blured :input field
  *   Remove data('add_class_on_blur') class back on blur
  * @context {jQuery handle} DOM element to apply action on
  */
  function addClassOnBlur() {
    var container = $(this);
    var handle = $(this).find(':input');
    handle.bind({
      blur: function() {
        $(this).addClass(container.data('add_class_on_blur'));
      },
      focus: function() {
        $(this).removeClass(container.data('add_class_on_blur'));
      }
    });
  }

  /*
  * @description Remove the data('remove_class_on_blur') class from the blurred :input field
  *   Add data('remove_class_on_blur') class back on blur
  * @context {jQuery handle} DOM element to apply action on
  */
  function removeClassOnBlur() {
    var container = $(this);
    var handle = $(this).find(':input');
    handle.bind({
      blur: function() {
        $(this).removeClass(container.data('remove_class_on_blur'));
      },
      focus: function() {
        $(this).addClass(container.data('remove_class_on_blur'));
      }
    });
  }

  /*
  * @description When a display label is clicked, switch to an alternate view containing the form
  *   Requires the label element to have the class display_label
  *   Elements with a class of .no_toggle will be excluded from this event
  * @context {jQuery handle} DOM element to apply action on
  */
  function toggleLabelOnClick() {
    var handle = $(this);
    handle.find('.display_label *:not(.no_toggle)').bind('click', function(evt) {
      if( !$(evt.target).hasClass('no_toggle') ){
        $(this).parents('.display_label').hide();
        handle.find('form').show();
        data = handle.find('form').serializeArray();
      }
    });
  }

  /*
  * @description Inverse of toggleLabelOnClick - returns to display label when form elements blur for longer than 1s
  *   Requires the label element to have the class display_label
  * @context {jQuery handle} DOM element to apply action on
  */
  function toggleLabelOnBlur() {
    var handle = $(this);
    handle.find(':input').bind({
      blur: function() {
        handle.timer = setTimeout(function() {
          handle.find('.display_label').show();
          handle.find('form').hide();
        }, 1000);
      },
      focus: function() {
        clearTimeout(handle.timer);
      }
    });
  }

  /*
  * @description Similar to toggleLabelOnBlur, watching for the enter key to be pressed in a field instead
  * @context {jQuery handle} DOM element to apply action on
  */
  function toggleLabelOnEnter() {
    var handle = $(this);
    handle.find(':input').bind({
      focus: function() {
        data = handle.find('form').serializeArray();
      },
      keypress: function(evt) {
        if (evt.which == $.ui.keyCode.ENTER) {
          evt.preventDefault();
          handle.find('.display_label').show();
          handle.find('form').hide();
        }
      }
    });
  }

  /*
  * @description Specify an element to gain the focus on the form when a label is clicked
  *   This element is defined by the data-in_place_focus_element value on the label element
  *   If no element is specified, then the first element, or the element with class .initial_focus is focused
  * @context {jQuery handle} DOM element to apply action on
  */
  function focusRespectiveInputs() {
    var handle = $(this);
    handle.find('.display_label *').bind('click', function() {
      if ($(this).data('in_place_focus_element') != undefined) {
        handle.find($(this).data('in_place_focus_element')).trigger('focus');
      } else {
        handle.find(':text:first, :text.initial_focus').trigger('focus');
      }

    });
  }

  /*
  * @description Apply transparent class to input elements on submit, blur, or enter
  * @context {jQuery handle} DOM element to apply action on
  */
  function addClassOnSubmit() {
    var container = $(this);
    $(this).find('form').bind({
      blur: function() {
        $(this).find(':input').addClass(container.data('add_class_on_submit'));
      },
      keypress: function(evt) {
        if (evt.which == $.ui.keyCode.ENTER)
          $(this).find(':input').addClass(container.data('add_class_on_submit'));
      },
      submit: function() {
        $(this).find(':input').addClass(container.data('add_class_on_submit'));
      }
    });
  }

  /*
  * @description Simulate tabbing away from a field on submit, blur, or enter
  * @context {jQuery handle} DOM element to apply action on
  */
  function blurOnSubmit() {
    $(this).find('form').bind('submit', function() {
      $(this).find(':input').blur();
    });
  }

  /*
  * @description When autocompleteselect fires, also fire a blur event
  * @context {jQuery handle} DOM element to apply action on
  */
  function blurOnAutocompleteSelect() {
    $(this).find('.ui-autocomplete-input').bind('autocompleteselect', function() {
      $(this).blur();
    });
  }

  /*
  * @description Disable all input fields when submit is fired
  * @context {jQuery handle} DOM element to apply action on
  */
  function disableInputsOnSubmit() {
    $(this).find('form').bind('submit', function() {
      $(this).find(':input').attr('disabled', 'disabled');
    });
  }

  /*
  * @description Toggle a DOM element ".controls" within class "display_label" on mouseover/out
  * @context {jQuery handle} DOM element to apply action on
  */
  function toggleActionsOnMouseover() {
    $(this).find('.display_label').bind({
      mouseover: function() {
        $(this).find('.controls').show();
      },
      mouseout: function() {
        $(this).find('.controls').hide();
      }
    });
  }

  init();

  return {};
}
