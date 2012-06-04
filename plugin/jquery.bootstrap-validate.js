/*!
 * jQuery form validation plugin
 * Author: Juan Pablo Canepa (jpcanepa)
 * Version 0.1
 *
 * JQuery Bolierplate credit:
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

        // Create the defaults once
        var pluginName = 'validator',
            /* Default options */
        defaults = {
        },

        /* All validators */
        validators = {
            'non-empty' : function (element) { 
                return getElementValue(element).length > 0
            },
            'is-number' : function (element) {
                try {
                    var intVal = parseInt(getElementValue(element), 10);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            'non-negative' : function (element) {
                try {
                    return parseInt(getElementValue(element), 10) >= 0; 
                } catch (e) {
                    return false;
                }
            },
            'positive' : function (element) {
                try {
                    return parseInt(getElementValue(element), 10) > 0; 
                } catch (e) {
                    return false;
                }
            }
        };

        // The actual plugin constructor
        function Plugin( element, options ) {
            this.element = element;
            this.options = $.extend( {}, defaults, options) ;
            /* Register custom validators */
            if(options !== undefined && typeof(options.validators) != 'undefined')
                $.extend( validators, options.validators); 
            this._defaults = defaults;
            this._name = pluginName;

            this.init();
        }

        /* Gets the value of an element */
        function getElementValue(element) {
            if(element.is('input') || element.is('textarea')) {
                return $.trim(element.val());
            }
        }

		/* Creates a validation handler */
        function createValidator(validatorType, element) {
            return function() {
                return validators[validatorType](element);
            }
        }

        Plugin.prototype = {

            init: function () {
                var that = this,
                    mainForm = $(this.element);

                /* Capture all the fields that must be validated */
                that.fields = mainForm.find('[data-validator]');

                /* Attach the validators to the fields */
                that.fields.each(function (index, element) {
                        var e = $(element);
                        element.doValidation = createValidator(e.attr('data-validator'), e);
                });

                /* Handle the form submit action */
                mainForm.submit(function () {

                        var validation = true;

                        /* Run the validator for each element */
                        that.fields.each(
                            function (index, element) {
                                var e = $(element);
                                if(!element.doValidation()) {
                                    validation = false;

                                    /* Add the "error" class to the container group */
                                    e.closest('div.control-group')
                                    .addClass('error');
                                }
                                else {
                                    /* If validation passed, remove the error class */
                                    e.closest('div.control-group')
                                    .removeClass('error');
                                }
                            }
                        );

                        /* Stop the submit if validation failed */
                        return validation;
                });
            }, 
        };

        $.fn[pluginName] = function ( options ) {
            var args = arguments;
            if (options === undefined || typeof options === 'object') {
                return this.each(function () {
                        if (!$.data(this, 'plugin_' + pluginName)) {
                            $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                        }
                });
            } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
                return this.each(function () {
                        var instance = $.data(this, 'plugin_' + pluginName);
                        if (instance instanceof Plugin && typeof instance[options] === 'function') {
                            instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                        }
                });
            }
        }

})( jQuery, window, document );
