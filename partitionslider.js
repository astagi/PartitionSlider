/**
* jQuery PartitionSlider Plugin
* Version: 0.1
* URL: http://github.com/4ndreaSt4gi/PartitionSlider
* Description: JQuery plugin to make a partition editor widget.
* Requires: JQuery
* Author: Andrea Stagi
* Copyright: Copyright 2011 Andrea Stagi
* License: MIT (included in the source)
*/

(function($) {

    $.fn.extend( { 
        
        partitionslider: function(options)  {
            
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
                
                for(var i = 0; i < nElements; i++) {
                    
                    var str = "<div style='float:left;" +
                                "margin-top:2px;" +
                                "background-color:" + parameters.colors[i] + ";" +
                                "height:" + parameters.height + "px;" +
                                "width:" + Math.round(parameters.values[i] * percWidth) + "px;' " +
                                "id='range" + i + "' ></div>";

                    $("#"+parameters.containerId).append(str);
                    
                    //Ignore the last element
                    if ( i != nElements - 1) {
                        var str="<div style='float:left;" +
                                    "background-color: #e6e6e6;" +
                                    "cursor:pointer;" +
                                    "border:solid 1px #d4d4d4;" +
                                    "height:" + (parameters.height + 4) + "px;" +
                                    "width:" + parameters.height + "px;' " +
                                    "id='cursor" + i + "' class='dragCursor'></div>";
                        $("#" + parameters.containerId).append(str);
                    }
                }
                
                $("#" + parameters.containerId).append("<div style='clear:both'></div>");

                $("#" + parameters.containerId + ' .dragCursor').mousedown(function(e) {

                    var selAttrId = $(this).attr('id');
                    var selectedCursor = 0;
                    for (var i = 0; i < nElements - 1; i++) {
                        if ( selAttrId == "cursor" + i ) {
                            selectedCursor = i;
                            break;
                        }
                    }
                    e.preventDefault();
                });                                 
            }            

            createMe(parameters);
            if ( parameters.onStart != null )
                parameters.onStart(parameters.values, parameters.colors);

        }
    });

})(jQuery);

