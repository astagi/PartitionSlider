PartitionSlider
===============

**JQuery plugin to make a partition editor widget. Needed at work, shared with everyone.**

# Info


- URL: http://github.com/4ndreaSt4gi/PartitionSlider
- Description: JQuery plugin to make a partition editor widget.
- Requires: JQuery
- Author: Andrea Stagi

# Basic usage

JQuery plugin allows you to make a partition editor widget in a simple way.

Create a simple partition slider
--------------------------------

- values: our partitions value (percentage).
- colors: colors of the partitions.
- height: height of the widget (pixel).
- width: width of the widget (pixel).

In the following code example we see how to create our PartitionSlider specifying the attributes and the container (#partition).

        $('#partition').PartitionSlider({
            values : [ 25, 25, 30, 20 ],
            colors : [ "green", "yellow", "black", "blue" ],
            width  : 300,
            height : 30,
        });

Override 'create' method
------------------------

When your PartitionSlider is created you may need to specify some actions to do.
In the following example we see how to override this method, receiving the values of ranges and the relative colors.

        $('#partition').PartitionSlider({
            create: function(values, colors){
                $('#drink1val').html(values[0]);
                $('#drink2val').html(values[1]);
                $('#drink3val').html(values[2]);
                $('#drink4val').html(values[3]);

                $('#drink1').css("color", colors[0]);
                $('#drink2').css("color", colors[1]);
                $('#drink3').css("color", colors[2]);
                $('#drink4').css("color", colors[3]);
            },
        });

Override 'onCursorDrag' method
------------------------------

Overriding onCursorDrag method you can specify what happens everytime the users drag a cursor.
In the following example we see how to override this method, receiving the selected cursor index of ranges and the values of ranges.

        $('#partition').PartitionSlider({
            onCursorDrag: function(cursor, values){
                $('#drink1val').html(values[0]);
                $('#drink2val').html(values[1]);
                $('#drink3val').html(values[2]);
                $('#drink4val').html(values[3]);
            },
        });


# Advanced usage

Advanced features for this plugin are still in development

# Credits

Copyright 2011 Andrea Stagi (http://github.com/4ndreaSt4gi/)

# Licensing

MIT (included, http://www.opensource.org/licenses/MIT)
