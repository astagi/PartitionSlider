/**
* jQuery PartitionSlider Plugin
* Version: 1.0dev
* URL: http://github.com/4ndreaSt4gi/PartitionSlider
* Description: JQuery plugin to make a partition editor widget.
* Requires: JQuery
* Author: Andrea Stagi
* Copyright: 2011 Andrea Stagi
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

            var currentCursor = {
                leftRangeDivId: null,
                rightRangeDivId : null,
                oldPosition : 0
            };

            var mouseMoveContext = {
                delta: 0,
                widthLeft : 0,
                widthRight : 0,
            };

            function createMe(parameters) {

                var normWidth = parameters.width / 100;
                var div = "";
                var cursorId = 0;
                var cursorMap = {};
                
                for(var i = 0; i < nElements; i++) {

                    div = "<div style='float:left;" +
                                "margin-top:2px;" +
                                "background-color:" + parameters.colors[i] + ";" +
                                "height:" + parameters.height + "px;" +
                                "width:" + Math.round(parameters.values[i] * normWidth) + "px;' " +
                                "id='range" + i + "' class='rangeDiv'></div>";

                    $("#" + parameters.containerId).append(div);
                    
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

                $("#" + parameters.containerId + ' .dragCursor').mousedown(function(event) {
                    var selectedCursor = cursorMap[$(this).attr('id')];
                    currentCursor.leftRangeDivId = "#" + parameters.containerId + ' #range' + selectedCursor;
                    currentCursor.rightRangeDivId = "#" + parameters.containerId + ' #range' + (selectedCursor + 1);
                    currentCursor.oldPosition = event.pageX;
                    $(document).bind("mousemove", onMouseMove);
                    $(document).bind("mouseup", onMouseUp);
                    event.preventDefault();
                });

            }

            function onMouseMove(event) {

                with(mouseMoveContext) {

                    if (currentCursor.oldPosition == event.pageX)
                        return;

                    delta = currentCursor.oldPosition - event.pageX;

                    console.log(delta);

                    widthLeft = $(currentCursor.leftRangeDivId).width() - delta;
                    widthRight = $(currentCursor.rightRangeDivId).width() + delta;

                    if (widthLeft < 0 || widthRight < 0)
                    {
                        currentCursor.oldPosition = event.pageX;
                        return;
                    }

                    $(currentCursor.leftRangeDivId).width(widthLeft);
                    $(currentCursor.rightRangeDivId).width(widthRight);

                    currentCursor.oldPosition = event.pageX;

                }
            }

            function onMouseUp(event) {
                $(document).unbind("mousemove", onMouseMove);
                $(document).unbind("mouseup", onMouseUp);
            }

            createMe(parameters);

            if (parameters.onStart != null)
                parameters.onStart(parameters.values, parameters.colors);

        }
    });

})(jQuery);

