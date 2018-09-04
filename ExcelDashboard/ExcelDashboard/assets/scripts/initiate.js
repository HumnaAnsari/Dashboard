// create DropDownList from select HTML element
$(".kendo-select").kendoDropDownList();

// createdropdownlist with search
$(document).ready(function () {
    $(".kendo-search-select").kendoDropDownList({
        filter: "startswith",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        }
    });
});

// Date Range Picker
$(function () {

    //var start = moment().subtract(-1, 'days');
    //var end = moment();
    
    var start = moment();
    var end = moment().subtract(-7, 'days');
    


    function cb(start, end) {
        $('#daterange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#daterange').daterangepicker({
        locale: {
            //format: 'YYYY-MM-DD'
            format: 'MM-DD-YYYY'
        },
        startDate: start,
        endDate: end,
        "opens": "left",
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
       
    }, cb);

    cb(start, end);

});

//Vonage Date Picker


// Chat Area chart
function createChart() {
    $("#chat-area-chart").kendoChart({

        legend: {
            position: "bottom"
        },
        seriesColors: ["#e8eaf6", "#4caf50"],
        seriesDefaults: {
            type: "area",
            area: {
                opacity: .95,
                line: {
                    style: "smooth"
                }
            }
        },
        series: [{
            name: "Chat requests",
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        }, {
            name: "Chat answered",
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        }],
        valueAxis: {
            font: "12px Roboto, sans-serif",
            color: "#76838f",

            labels: {
                format: "{0}"
            },
            line: {
                visible: false
            },
            axisCrossingValue: -10
        },
        categoryAxis: {
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            majorGridLines: {
                visible: false
            },
            labels: {
                font: "12px Roboto, sans-serif",
                color: "#76838f",
                rotation: "auto"
            }
        },
        tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
        }
    });
}

$(document).ready(createChart);


// Autocomplete

$(document).ready(function () {
    var data = [
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia & Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
    ];

    //create AutoComplete UI component
    $("#search").kendoAutoComplete({
        dataSource: data,
        filter: "startswith",
        placeholder: "Keyword...",
        separator: ", "
    });
});


function ValidateEmailAddress(inputvalue)
{

    var flag = false;
    var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
    if (pattern.test(inputvalue)) {
        flag = true;
        $("#EmailAddressValidation").hide();
    } else {

        $("#EmailAddressValidation").show();
    }

    return flag;
}