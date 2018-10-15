$(function () {

    $('.navbar-right a[href="#menu1"]').tab('show');
    var counter = 1;
    activaTab('menu' + counter);
    //var inst = setInterval(change, 10000);
    function activaTab(tab) {
        $('#dTabs a[href="#' + tab + '"]').tab('show');
    };
    function change() {
        //var elem = document.getElementById("menu"+1);


        activaTab('menu' + counter);
        counter++;
        if (counter > 3) {
            counter = 1;
            // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
        }
    }

   // TotalChart();
    TotalUAEChart();
   // MonthChart();
//WeekChart();
});
function createTotalChart(obj) {
    $("#totalChart").kendoChart({
        theme: "Office365",
        title: {
            text: "Sales-Total"
        },
        dataSource: {
            data: obj,
           
        },
        series: [{
            type: "area",
            field: "Sales",
            name: "Sales"
        },
        {
            type: "area",
            field: "Activation",
            name: "Activation"
        }],
        legend: {
            position: "bottom"
        },
        categoryAxis: [{
            //type: "date",
            //baseUnit: "days",
            labels: {
                rotation: "auto",
                //dateFormats: {
                //    days: "MMM-d"
                //}
            }
            //,
            //field: "Month"
        }],
        tooltip: {
            visible: true,
            template: function (dataItem) {
                //debugger;
                // return "Total " + dataItem.dataItem.Sales + " Sales between " + dataItem.dataItem.FullIntervals
            },
            format: "{0}"
        }

    });
}
function createTotalUAEChart(obj) {
    $("#totalUAEChart").kendoChart({
        theme: "Office365",
        title: {
            text: "Sales and Activations-Total"
        },
        dataSource: {
            data: obj,
            group: [
      { field: "Color" }
            ]
            
        },
        series: [{
            type: "column",
            field: "Sales",
            categoryField: "Month",
            name: "Sales",
            labels: { visible: true }
        }],
        legend: {
            position: "bottom"
        },
        categoryAxis: [{
            //type: "date",
            //baseUnit: "days",
            labels: {
                rotation: "auto",
                //dateFormats: {
                //    days: "MMM-d"
                //}
            },
            field: "Month"
        }],
        tooltip: {
            visible: true,
            template: function (dataItem) {
                //debugger;
                // return "Total " + dataItem.dataItem.Sales + " Sales between " + dataItem.dataItem.FullIntervals
            },
            format: "{0}"
        }

    });
}
function createMonthChart(obj) {
    console.log(obj);
    $("#monthChart").kendoChart({
        theme: "Material",
        title: {
            text: "Sales-Total"
        },
        dataSource: {
            data: obj
        },
        series: [{
            type: "line",
            field: "Sales",
            name: "Sales"
        },
        {
            type: "line",
            field: "Activation",
            name: "Activation"
        }],
        legend: {
            position: "bottom"
        },
        categoryAxis: [{
            type: "date",
            baseUnit: "days",
            labels: {
                rotation: "auto",
                dateFormats: {
                    days: "MMM-dd"
                }
            },
            field: "Transaction"
        }],
        tooltip: {
            visible: true,
            template: function (dataItem) {
                //debugger;
                // return "Total " + dataItem.dataItem.Sales + " Sales between " + dataItem.dataItem.FullIntervals
            },
            format: "{0}"
        }

    });
}

function createWeekChart(obj) {
    $("#weekChart").kendoChart({
        theme: "Bootstrap",
        title: {
            text: "Sales-Total"
        },
        dataSource: {
            data: obj
        },
        series: [{
            type: "area",
            field: "Sales",
            name: "Sales"
        },
        {
            type: "area",
            field: "Activation",
            name: "Activation"
        }],
        legend: {
            position: "bottom"
        },
        categoryAxis: [{
            type: "date",
            baseUnit: "days",
        labels: { rotation: "auto",
        dateFormats: {
        days: "MMM-d"
      }
      },
            field: "Transaction"
            
        }],
        tooltip: {
            visible: true,
            template: function (dataItem) {
                debugger;
                console.log(dataItem);
                //return "Total " + dataItem.dataItem.Sales + " Sales between " + dataItem.dataItem.FullIntervals
            },
            format: "{0}"
        }

    });
}


function TotalChart() {

    $.ajax({
        url: '/Home/TotalChart',
        // data: JSON.stringify(),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            //console.log(data);
            createTotalChart(data);
        }

    });


}

function TotalUAEChart() {

    $.ajax({
        url: '/Home/TotalUAEChart',
        // data: JSON.stringify(),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data);
            createTotalUAEChart(data);
        }

    });


}

function MonthChart() {

    $.ajax({
        url: '/Home/MonthChart',
        // data: JSON.stringify(),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            //console.log(data);
            createMonthChart(data);
        }

    });


}

function WeekChart() {

    $.ajax({
        url: '/Home/WeekChart',
        // data: JSON.stringify(),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            //console.log(data);
            createWeekChart(data);
        }

    });


}