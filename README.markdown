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
        
# View the Demo

[View the demo](http://mrfrosti.com/in_place_edit.demo.html)

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

