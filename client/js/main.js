function mainController(){
	 $('#MyMonthTextBox').monthpicker({
        dateFormat: 'MM yy',
        changeMonth: true,
        changeYear: true,
        showMonthAfterYear: true,
        showAnim: "drop",
        constrainInput: true,
        yearRange: "-100Y:+10Y",
        minDate: new Date(new Date().getFullYear() - 100, new Date().getMonth(), 1),
        maxDate: new Date((new Date().getFullYear() + 10), new Date().getMonth(), 1),
        defaultDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),

        // Monthpicker functions
        onClose: function (dateText, inst) {
            var date = new Date(inst.selectedYear, inst.selectedMonth, 1);
            $(this).monthpicker('option', 'defaultDate', date);
            $(this).monthpicker('setDate', date);
        },

        beforeShow: function (input, inst) {
            if ($(this).monthpicker("getDate") !== null) {
                // Making sure that the date set is the first of the month.
                if($(this).monthpicker("getDate").getDate() !== 1){
                    var date = new Date(inst.selectedYear, inst.selectedMonth, 1);
                    $(this).monthpicker('option', 'defaultDate', date);
                    $(this).monthpicker('setDate', date);
                }
            } else {
                // If the date is null, we reset it to the defaultDate. Make sure that the defaultDate is always set to the first of the month!
                $(this).monthpicker('setDate', $(this).monthpicker('option', 'defaultDate'));
            }
        },
        // Special monthpicker function!
        onChangeMonthYear: function (year, month, inst) {
            $(this).val($.monthpicker.formatDate($(this).monthpicker('option', 'dateFormat'), new Date(year, month - 1, 1)));
        }
    })
    //.after( // this makes a link labeled "clear" appear to the right of the input-field, which clears the text in it
    //    $("<a href='javascript: void(0);'>clear</a>").click(function() {
    //        $(this).prev().val('');
    //    })
    //)
    ;
};