# In Place Edit Demo

Why another in place edit library? This was born out of a need for extremely
specific interactions that varied in different parts of the application. There
was no way a blanket set of logic would match every interaction the client
wanted.

This library is built with customization in mind. When you define your in
place edit form, you can pass one or more options to the data-in-place-edit
attribute to get the desired effect. The actions are specific and let you
choose exactly how you want each form to operate.



    <div class="in_place_edit" data-in-place-data="submitOnBlur">
      <form action="#" method="post">
        <input type="text" name="foo" value="foo" />
      </form>
    </div>


We wrap our form inside of a container named `in_place_edit`. This is the CSS
selector we pass to jQuery when calling `$.inPlaceEdit()`. Options are
placed inside of data-in-place-data on the same object. These options are then
wired up to the form via UJS.

Some actions require further options to be specified, as is the case with 'Add
class on focus'. In this action, we need to specify a value for the class to
be added by supplying the `data-add-class-on-focus` attribute.



    <div class="in_place_edit" data-in-place-data="addClassOnFocus" data-add-class-on-focus="red_border">
      <form action="#" method="post">
        <input type="text" name="foo" value="foo" />
      </form>
    </div>

# View the Demo

[View the demo](http://mrfrosti.com/in_place_edit_demo.html)

# Options

Below is an index of available options. More information is available
in the demo for each option

## Submit control

  * Submit on blur (one field)
  * Submit on blur (multiple fields)
  * Submit on click
  * Submit on enter
  * Submit on autocomplete select

## Class manipulation

  * Add class on focus
  * Remove class on focus
  * Add class on blur
  * Remove class on blur
  * Add class on submit

## Label manipulation

  * Show form on click
  * Hide label on click
  * Show label on blur
  * Hide form on blur
  * Show label on enter
  * Hide form on enter
  * Focus respective inputs

## Other controls

  * Blur on submit
  * Blur on autocomplete select
  * Disable inputs on submit
  * Toggle actions on mouseover
