# In Place Edit Demo

Why another in place edit library? This was born out of a need for extremely
specific interactions that varied in different parts of the application. There
was no way a blanket set of logic would match every interaction the client
wanted.

This library is built with customization in mind. When you define your in
place edit form, you can pass one or more options to the data-in_place_edit
attribute to get the desired effect. The actions are specific and let you
choose exactly how you want each form to operate.

    
    
          <div class="in_place_edit" data-in_place_data="submit_on_blur">
            <form action="#" method="post">
              <input type="text" name="foo" value="foo" />
            </form>
          </div>
        

We wrap our form inside of a container named in_place_edit. This is the CSS
selector we pass to InPlaceEdit() when we want to initialize. Options are
placed inside of data-in_place_data on the same object. These options are then
wired up to the form via UJS.

Some actions require further options to be specified, as is the case with 'Add
class on focus'. In this action, we need to specify a value for the class to
be added by supplying the data-add_class_on_focus attribute.

    
    
          <div class="in_place_edit" data-in_place_data="add_class_on_focus" data-add_class_on_focus="red_border">
            <form action="#" method="post">
              <input type="text" name="foo" value="foo" />
            </form>
          </div>
        

# Options

Below is an index of available options. Click a link to see a demo of that
option. Further examples are at the bottom.

## Index

### Submit control

  * [Submit on blur (one field)][1]
  * [Submit on blur (multiple fields)][2]
  * [Submit on click][3]
  * [Submit on enter][4]
  * [Submit on autocomplete select][5]

### Class manipulation

  * [Add class on focus][6]
  * [Remove class on focus][7]
  * [Add class on blur][8]
  * [Remove class on blur][9]
  * [Add class on submit][10]

### Label display

  * [Toggle label on click][11]
  * [Toggle label on blur][12]
  * [Toggle label on enter][13]
  * [Focus respective inputs][14]

### Other controls

  * [Blur on submit][15]
  * [Blur on autocomplete select][16]
  * [Disable inputs on submit][17]
  * [Toggle actions on mouseover][18]

## Submit on Blur (one field)

Submitting a form after a field loses focus is the basic functionality of edit
in place.

Note: The value must change for the form to submit

## Submit on Blur (multiple fields)

Submitting the form the instant focus is lost may be great if you only have
one form field. What happens if you have more than one field in the same form?
You probably want to submit them after the user moves on from either field.
This is where submitting with a delay an help. If no activity is detected in
any fields for longer than 1 second, the form submits.

Field 1

Field 2

Note: At least one value must change for the form to submit

## Submit on Click

Suitable for a form containing check boxes

## Submit on Enter

The default action of pressing enter while the focus is in a form is caught
with this library. If you want to re-enable this functionality, add this
method

Note: The value must change for the form to submit

## Submit on Autocomplete Select

When a field is bound to the [jQuery autocomplete UI][19] functionality, a
user can select from a list of items. This option will signal to submit the
form when an autocomplete item is chosen.

## Add Class on Focus

Add the data('add_class_on_focus') class from the currently focused :input
field. Remove data('add_class_on_focus') class back on blur

### Options

data-add_class_on_focus

    The class to add

## Remove Class on Focus

Remove the data('remove_class_on_focus') class from the blurred :input field.
Add data('remove_class_on_focus') class back on blur

### Options

data-remove_class_on_focus

    The class to remove

## Add Class on Blur

Add the data('add_class_on_blur') class from the currently blured :input
field. Remove data('add_class_on_blur') class back on blur

### Options

data-add_class_on_blur

    The class to add

## Remove Class on Blur

Remove the data('remove_class_on_blur') class from the blurred :input field.
Add data('remove_class_on_blur') class back on blur

### Options

data-remove_class_on_blur

    The class to remove

## Toggle Label on Click

When a display label is clicked, switch to an alternate view containing the
form. Requires the label element to have the class display_label. Elements
with a class of .no_toggle will be excluded from this event.

Click me to toggle the form

## Toggle Label on Blur

Inverse of 'Toggle Label On Click' - returns to display label when form
elements blur for longer than 1s. Requires the label element to have the class
'display_label'

Now you see the display label

## Toggle Label on Enter

Similar to 'Toggle Label On Blur', watching for the enter key to be pressed in
a field instead

Now you see the display label

## Focus Respective Inputs

Specify an element to gain the focus on the form when a label is clicked. This
element is defined by the data-in_place_focus_element value on the label
element. If no element is specified, then the first element, or the element
with class .initial_focus is focused.

### Options

data-in_place_focus_element

    The CSS selector of the input element to focus on when clicked

First name

Middle name

Last name

Click different parts of my name: Mr. Benjamin Lee Simpson

## Add Class on Submit

Add class data('add_class_on_submit') to :input element on submit, blur, or
enter

### Options

data-add_class_on_submit

    The class to add

## Blur on Submit

Simulate tabbing away from a field on submit, blur, or enter

## Blur on Autocomplete Select

When autocompleteselect fires, also fire a blur event

## Disable Inputs on Submit

Disable all input fields when submit is fired

## Toggle Actions on Mouseover

Toggle a DOM element with class "display_label" on mouseover/out

Mouseover me to toggle controls  [Edit][20] [Delete][20]

# Examples

The following a is a collection of examples that demonstrate the way in which
the options can stack together to create meaningful interactions.

Create a basic in place edit label that submits on blur, or enter

Field 1

Note: At least one value must change for the form to submit

create a display label with multiple clickable areas

Benjamin Lee Simpson

edit an active hyperlink

[http://www.reddit.com][21] Edit

   [1]: #submit_on_blur_no_delay
   [2]: #submit_on_blur
   [3]: #submit_on_click
   [4]: #submit_on_enter
   [5]: #submit_on_autocomplete_select
   [6]: #add_class_on_focus
   [7]: #remove_class_on_focus
   [8]: #add_class_on_blur
   [9]: #remove_class_on_blur
   [10]: #add_class_on_submit
   [11]: #toggle_label_on_click
   [12]: #toggle_label_on_blur
   [13]: #toggle_label_on_enter
   [14]: #focus_respective_inputs
   [15]: #blur_on_submit
   [16]: #blur_on_autocomplete_select
   [17]: #disable_inputs_on_submit
   [18]: #toggle_actions_on_mouseover
   [19]: http://jqueryui.com/demos/autocomplete/
   [20]: #
   [21]: http://www.reddit.com

