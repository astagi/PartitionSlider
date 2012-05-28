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
                create : null
            }
            
            var parameters = $.extend(defaults, options);
            var nElements = parameters.values.length;
            var rangesWidth = 0;

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
                var rangeWidth = 0;
                var cursorId = 0;
                var cursorMap = {};
                
                for(var i = 0; i < nElements; i++) {

                    rangeWidth = Math.round(parameters.values[i] * normWidth);

                    div = "<div style='float:left;" +
                                "margin-top:2px;" +
                                "background-color:" + parameters.colors[i] + ";" +
                                "height:" + parameters.height + "px;" +
                                "width:" + rangeWidth + "px;' " +
                                "id='range" + i + "' class='rangeDiv'></div>";

                    rangesWidth += rangeWidth;

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
                    $(document).bind("mousemove", {selectedCursor: selectedCursor}, onMouseMove);
                    $(document).bind("mouseup", onMouseUp);
                    event.preventDefault();
                });

            }

            function onMouseMove(event) {

                with(mouseMoveContext) {

                    if (currentCursor.oldPosition == event.pageX)
                        return;

                    delta = currentCursor.oldPosition - event.pageX;

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

                parameters.values[event.data.selectedCursor] = parseInt(mouseMoveContext.widthLeft / rangesWidth * 100);
                parameters.values[event.data.selectedCursor + 1] = parseInt(mouseMoveContext.widthRight / rangesWidth * 100);

                if (parameters.onCursorDrag != null)
                    parameters.onCursorDrag(event.data.selectedCursor, parameters.values);

            }

            function onMouseUp(event) {
                $(document).unbind("mousemove", onMouseMove);
                $(document).unbind("mouseup", onMouseUp);
            }

            createMe(parameters);

            if (parameters.create != null)
                parameters.create(parameters.values, parameters.colors);

        }
    });

})(jQuery);

