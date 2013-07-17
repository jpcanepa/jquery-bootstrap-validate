jquery-bootstrap-validate
=========================

jQuery plugin to do client-side validation on forms, using bootstrap classes.

Dependencies
------------
This plugin depends on two things:
1. jQuery (obviously)
2. Twitter Bootstrap

Usage
-----
The plugin is initialized like any other jQuery plugin, invoking the constructor
over the element on which it will work. In this case, that root element is a 
form. The plugin will register the validtors to the form fields according to the
`data-validator` attribute of the fields.
