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

(function($){
  var inPlaceEdit = function(options) {
    var _curMethod,
        _methods = {},
        _options,
        $this = $(this),
        $form = $(this).find('form').filter(':first'),
        $inputs = $form.find(':input'),
        formData,
        i, j;

    _options =
      {
        actions: [],
        addClassOnBlur: $form.data('addClassOnBlur'),
        addClassOnFocus: $form.data('addClassOnFocus'),
        addClassOnSubmit: $form.data('addClassOnSubmit'),
        blurOnAutocompleteSelect: false,
        blurOnSubmit: false,
        disableInputsOnSubmit: false,
        focusRespectiveInputs: false,
        removeClassOnBlur: $form.data('removeClassOnBlur'),
        removeClassOnFocus: $form.data('removeClassOnFocus'),
        submitOnAutocompleteSelect: false,
        submitOnBlur: false,
        submitOnBlurNoDelay: false,
        submitOnClick: false,
        submitOnEnter: false,
        toggleActionsOnMouseover: false,
        showLabelOnBlur: false,
        showLabelOnEnter: false,
        showFormOnClick: false
      };
    _options = $.extend(_options, options);
    formData = $form.serializeArray();

    // Define the methods for our plugin

    /**
     * @description Submit form when focus leaves the input field
     *   Suitable for an in_place_edit containing multiple :input elements
     */
    _methods.submitOnBlur = function() {
      $inputs.on({
        blur: function() {
          var blurFunction = function() {
            var currentData = $form.serializeArray();
            formData = (formData === currentData) ? formData : currentData;

            $form.trigger('submit');
          },
          timer;

          timer = setTimeout(blurFunction, 1000);
          $form.data('timer', timer);
        },
        focus: function() {
          // Since this is an array of objects, only update the value for the
          // field currently selected
          var newValue = {
            name: this.name,
            value: this.value
          };

          clearTimeout($form.data('timer'));

          $(formData).each(function(i, obj){
            if (obj.name === newValue.name) {
              formData[i].value = newValue.value;
            }
          });
        }
      });
    };

    /**
     * @description Submit form when focus leaves the input field
     *   Suitable for an in_place_edit containing only one :input element
     */
    _methods.submitOnBlurNoDelay = function() {
      $inputs.on('blur', function() {
        var currentData = $form.serializeArray();
        formData = (formData === currentData) ? formData : currentData;
        $form.trigger('submit');
      });
    };

    /**
     * @description Submit form when an element (ie check box) is clicked
     *   Suitable for an in_place_edit containing check boxes
     */
    _methods.submitOnClick = function() {
      // TODO: make this more generic (what about radio buttons?)
      $form.find('input[type=checkbox]').on('click', function() {
        $form.trigger('submit');
      });
    };

    /**
     * @description Submit the form when the enter key is pressed
     *   Catches default event
     */
    _methods.submitOnEnter = function() {
      $form.on({
        focus: function() {
          formData = $form.serializeArray();
        },
        keypress: function(evt) {
          var code = evt.keyCode || evt.which, // Firefox fun
              currentData = null;

          if (code === 13) {
            evt.preventDefault();
            currentData = $form.serializeArray();
            formData = (formData === currentData) ? formData : currentData;
            $form.trigger('submit');
          }
        }
      });
    };

    /**
     * @description Add the data('add_class_on_focus') class from the currently
     * focused :input field. Remove data('add_class_on_focus') class
     * back on blur.
     */
    _methods.addClassOnFocus = function() {
      $inputs.on({
        focus: function() {
          $(this).addClass(_options.addClassOnFocus);
        }
      });
    };

    /**
     * @description Remove the data('remove_class_on_focus') class from the
     * blurred :input field. Add data('remove_class_on_focus') class
     * back on blur
     */
    _methods.removeClassOnFocus = function() {
      $inputs.on({
        focus: function() {
          $(this).removeClass(_options.removeClassOnFocus);
        }
      });
    };

    /**
     * @description Add the data('add_class_on_blur') class from the currently
     * blured :input field. Remove data('add_class_on_blur') class back on blur
     */
    _methods.addClassOnBlur = function() {
      $inputs.on({
        blur: function() {
          $(this).addClass(_options.addClassOnBlur);
        }
      });
    };

    /**
     * @description Remove the data('remove_class_on_blur') class from the
     * blurred :input field. Add data('remove_class_on_blur') class back on blur
     */
    _methods.removeClassOnBlur = function() {
      $inputs.on({
        blur: function() {
          $(this).removeClass(_options.removeClassOnBlur);
        }
      });
    };

    /**
     * @description When a display label is clicked, switch to an alternate view
     * containing the form. Requires the label element to have the class
     * display_label. Elements with a class of .no_toggle will be excluded
     * from this event
     */
    _methods.showFormOnClick = function() {
      $this.find('.display_label').on('click', function(evt) {
        if ( !$(evt.target).hasClass('no_toggle') ) {
          $(this).parents('.display_label').hide();
          $form.show();
          formData = $form.serializeArray();
        }
      });
    };

    /**
     * @description Inverse of showFormOnClick - returns to display label
     * when form elements blur for longer than 1s. Requires the label element
     * to have the class display_label
     */
    _methods.showLabelOnBlur = function() {
      $inputs.on({
        blur: function() {
          var blurFunction,
              timer;

          blurFunction = function() {
            $inputs.find('.display_label').show();
            $form.hide();
          };

          timer = setTimeout(blurFunction, 1000);
          $form.data('labelTimer', timer);
        },
        focus: function() {
          clearTimeout($form.data('labelTimer'));
        }
      });
    };

    /**
     * @description Similar to showLabelOnBlur, watching for the enter key to
     * be pressed in a field instead
     */
    _methods.showLabelOnEnter = function() {
      $inputs.on({
        focus: function() {
          formData = $form.serializeArray();
        },
        keypress: function(evt) {
          var code = evt.keyCode || evt.which;

          if (code === 13) {
            evt.preventDefault();
            $this.find('.display_label').show();
            $form.hide();
          }
        }
      });
    };

    /**
     * @description Specify an element to gain the focus on the form when a
     * label is clicked. This element is defined by the
     * data-in-place-focus-element attribute on the label element. If no
     * element is specified, then the first element, or the element with
     * class .initial_focus is focused
     */
    _methods.focusRespectiveInputs = function() {
      $this.find('.display_label *').on('click', function() {
        var $clickedLabel = $(this);
        if ($clickedLabel.data('inPlaceFocusElement')) {
          setTimeout(function() {
          $this
            .find($clickedLabel.data('inPlaceFocusElement'))
            .trigger('focus');
          }, 10);
        } else {
          $this.find(':text:first, :text.initial_focus').trigger('focus');
        }
      });
    };

    /**
     * @description Apply transparent class to input elements on submit, blur,
     * or enter
     */
    _methods.addClassOnSubmit = function() {
      var className = _options.addClassOnSubmit;
      $inputs.on({
        blur: function() {
          $inputs.addClass(className);
        },
        keypress: function (evt) {
          var code = evt.keyCode || evt.which;

          if (code === 13) {
            $inputs.addClass(className);
          }
        },
        submit: function() {
          $inputs.addClass(className);
        }
      });
    };

    /**
     * @description Simulate tabbing away from a field on submit, blur, or enter
     */
    _methods.blurOnSubmit = function() {
      $form.on('submit', function() {
        $inputs.blur();
      });
    };

    /**
     * @description When autocompleteselect fires, also fire a blur event
     */
    _methods.blurOnAutocompleteSelect = function() {
      $this.find('.ui-autocomplete-input').on('autocompleteselect', function() {
        $(this).blur();
      });
    };

    /**
     * @description Disable all input fields when submit is fired
     */
    _methods.disableInputsOnSubmit = function() {
      $form.on('submit', function() {
        $inputs.prop('disabled', true);
      });
    };

    /**
     * @description Toggle a DOM element ".controls" within class
     * "display_label" on mouseover/out
     */
    _methods.toggleActionsOnMouseover = function() {
      $this.find('.display_label').on({
        mouseover: function() {
          $(this).find('.controls').show();
        },
        mouseout: function() {
          $(this).find('.controls').hide();
        }
      });
    };

    /**
     * @description Submit the form when selecting an autocomplete option
     */
    _methods.submitOnAutocompleteSelect = function() {
      $this.find('.ui-autocomplete-input').on(
        'autocompleteselect',
        function(evt, ui) {
          var $clickedInput = $(this);
          $clickedInput.val(ui.item.label);
          // TODO: Where is 'id_element' defined? I don't see it in the
          // demo.html markup ~ JBS
          $($clickedInput.attr('id_element')).val(ui.item.id);
          $clickedInput.parents('form').trigger('submit');
        }
      );
    };

    // Loop through the given plugin options and bind them
    // appropriately.
    if (_options.actions.length === 0 && $this.data('inPlaceData')) {
      _options.actions = $this.data('inPlaceData').split(' ');
      for (i = 0, j = _options.actions.length; i < j; i += 1) {
        _curMethod = _options.actions[i];
        _options[_curMethod] =
          ($this.data(_curMethod)) ? $this.data(_curMethod) : true;
      }
    }
    for (i = 0, j = _options.actions.length; i < j; i += 1) {
      _curMethod = _options.actions[i];
      // The option is either null or false by default. If it isn't either
      // of those, then we will call the function, provided it is an allowed
      // option.
      if (_options[_curMethod]) {
        if ( _methods.hasOwnProperty(_curMethod) ) {
          // Note: the 'this' being passed to the function is the in_place_edit
          // container
          _methods[_curMethod].call(this);
        } else {
          throw new Error('Option undefined:' + _curMethod);
        }
      }
    }
  };

  $.fn.inPlaceEdit = function(options) {
    // 'this' is a jQuery object in jQuery plugins
    return this.each(function() {
      inPlaceEdit.call(this, options);
    });
  };
}(jQuery));
