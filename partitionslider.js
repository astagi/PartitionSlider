/**
* jQuery PartitionSlider Plugin
* Version: 1.0dev
* URL: http://github.com/4ndreaSt4gi/PartitionSlider
* Description: JQuery plugin to make a partition editor widget.
* Requires: JQuery
* Author: Andrea Stagi
* Copyright: Copyright 2011 Andrea Stagi
* License: MIT (included in the source)
*/

(function($) {

    $.fn.extend({
        
        partitionslider: function(options) {
            
            var defaults =  {
                containerId : $(this).attr('id'),
                values : [ 25, 25, 25, 25 ],
                colors : [ "green", "grey", "black", "orange" ],
                width  : 500,
                height : 34,
                onStart : null
            }
            
            var parameters = $.extend(defaults, options);
            var nElements = parameters.values.length;

            function createMe(parameters) {

                var percWidth = parameters.width / 100;
                var div = "";
                var cursorMap = {};
                var cursorId = 0;
                
                for(var i = 0; i < nElements; i++) {

                    div = "<div style='float:left;" +
                                "margin-top:2px;" +
                                "background-color:" + parameters.colors[i] + ";" +
                                "height:" + parameters.height + "px;" +
                                "width:" + Math.round(parameters.values[i] * percWidth) + "px;' " +
                                "id='range" + i + "' ></div>";

                    $("#" + parameters.containerId).append(div);
                    
                    //Ignore the last element
                    if (i != nElements - 1) {
                        cursorId = "cursor" + i;
                        div = "<div style='float:left;" +
                                    "background-color: #e6e6e6;" +
                                    "cursor:pointer;" +
                                    "border:solid 1px #d4d4d4;" +
                                    "height:" + (parameters.height + 4) + "px;" +
                                    "width:" + parameters.height + "px;' " +
                                    "id='" + cursorId + "' class='dragCursor'></div>";
                        $("#" + parameters.containerId).append(div);
                        cursorMap[cursorId] = i;
                    }
                }
                
                $("#" + parameters.containerId).append("<div style='clear:both'></div>");

                $("#" + parameters.containerId + ' .dragCursor').mousedown(function(e) {
                    var selectedCursor = cursorMap[$(this).attr('id')];
                    e.preventDefault();
                });
            }

            createMe(parameters);

            if (parameters.onStart != null)
                parameters.onStart(parameters.values, parameters.colors);

        }
    });

})(jQuery);

