using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExcelDashboard.Models
{
    public class Model
    {
        public class TotalGraph
        {
            public string Month { get; set; }
            public string Color { get; set; }
            public string Sales { get; set; }
            public string Activation { get; set; }
        }

        public class WeekGraph
        {
            public string Transaction { get; set; }
            public string Sales { get; set; }
            public string Activation { get; set; }
        }

    }
}