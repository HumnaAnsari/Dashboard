using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ExcelDashboard.Models.Model;

namespace ExcelDashboard.Controllers
{
    public class HomeController : Controller
    {
        static string path1 = "E:\\Projects\\Databasev3.xlsx";
        string connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path1 + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";

        string today = DateTime.Now.ToString("MM/dd/yyyy");

        static DayOfWeek day = DateTime.Now.DayOfWeek;
        static int days = day - DayOfWeek.Sunday;
        static DateTime start = DateTime.Now.AddDays(-days);
        string weekend = start.AddDays(6).ToShortDateString();
        string weekstart = start.ToShortDateString();
        static DateTime mstart = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
        string monthend = mstart.AddMonths(1).AddDays(-1).ToShortDateString();
        string monthstart = mstart.ToShortDateString();

        public ActionResult Index()
        {


            DataTable dd = DailyData(today);
            ViewBag.DailyData = dd;

            DataTable wd = WeeklyData(weekstart, weekend);
            ViewBag.WeeklyData = wd;
            DataTable md = MonthlyData(monthstart, monthend);
            ViewBag.MonthlyData = md;
            DataTable td = TotalData();
            ViewBag.TotalData = td;
            //DataTable ddARE = DailyDataARE(today);
            //ViewBag.DailyDataARE = ddARE;

            return View();
        }

        public DataTable DailyData(string today)
        {

            // connString = "Dsn = Excel Files; dbq = E:\\Projects\\Databasev2.xlsx; defaultdir = E:\\Projects; driverid = 1046; maxbuffersize = 2048; pagetimeout = 5";
            string query = "SELECT SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] where [Transaction]=#" + today + "# group by [Transaction]";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            return dt;
        }
        public DataTable WeeklyData(string ws, string we)
        {
            string query = "SELECT SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] where [Transaction] BETWEEN #" + ws + "# and #" + we + "#";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            return dt;
        }
        public DataTable MonthlyData(string ms, string me)
        {
            string query = "SELECT SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] where [Transaction] BETWEEN #" + ms + "# and #" + me + "#";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            return dt;
        }
        public DataTable TotalData()
        {
            string query = "SELECT SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$]";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            return dt;
        }
        public DataTable DailyDataARE(string today)
        {

            // connString = "Dsn = Excel Files; dbq = E:\\Projects\\Databasev2.xlsx; defaultdir = E:\\Projects; driverid = 1046; maxbuffersize = 2048; pagetimeout = 5";
            string query = "SELECT [Transaction],[Option Type],SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] where [Transaction]=#" + today + "# and [Cty Code]= 'ARE' and [Option Type] in ('White','Silver') group by [Transaction],[Option Type]";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            if(dt.Rows[1][0] == null)
            {
                DataRow workRow = dt.NewRow();
                workRow[1] = "Silver";
                workRow[2] = "0";
                dt.Rows.Add(workRow);
                
            }
            return dt;
        }
        public static DataTable ConvertXSLXtoDataTable(string query, string connString)
        {
            OleDbConnection oledbConn = new OleDbConnection(connString);
            DataTable dt = new DataTable();
            try
            {

                oledbConn.Open();
                using (OleDbCommand cmd = new OleDbCommand(query, oledbConn))
                {
                    OleDbDataAdapter oleda = new OleDbDataAdapter();
                    oleda.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    oleda.Fill(ds);

                    dt = ds.Tables[0];
                }
            }
            catch
            {
            }
            finally
            {

                oledbConn.Close();
            }

            return dt;

        }

        public JsonResult WeekChart()
        {
            string query = "SELECT [Transaction],SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] where [Transaction] BETWEEN #" + weekstart + "# and #" + weekend + "# group by [Transaction]";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            List<WeekGraph> obj = new List<WeekGraph>();

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow i in dt.Rows)
                {
                    WeekGraph obj1 = new WeekGraph();
                    obj1.Transaction = i["Transaction"].ToString().Trim();
                    obj1.Sales = i["Sales"].ToString().Trim();
                    obj1.Activation = i["Activation"].ToString().Trim();
                    obj.Add(obj1);
                }

            }

            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MonthChart()
        {
            string query = "SELECT [Transaction],SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] where [Transaction] BETWEEN #" + monthstart + "# and #" + monthend + "# group by [Transaction] order by [Transaction]";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            List<WeekGraph> obj = new List<WeekGraph>();

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow i in dt.Rows)
                {
                    WeekGraph obj1 = new WeekGraph();
                    obj1.Transaction = i["Transaction"].ToString().Trim();
                    obj1.Sales = i["Sales"].ToString().Trim();
                    obj1.Activation = i["Activation"].ToString().Trim();
                    obj.Add(obj1);
                }

            }

            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        public JsonResult TotalChart()
        {
            string query = "SELECT [Month],SUM([Sales]) AS Sales,SUM([ID Activation]) AS Activation FROM [Master$] group by [Month]";
            DataTable dt = ConvertXSLXtoDataTable(query, connString);
            List<TotalGraph> obj = new List<TotalGraph>();

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow i in dt.Rows)
                {
                    TotalGraph obj1 = new TotalGraph();
                    obj1.Month = i["Month"].ToString().Trim();
                    obj1.Sales = i["Sales"].ToString().Trim();
                    obj1.Activation = i["Activation"].ToString().Trim();
                    obj.Add(obj1);
                }

            }

            return Json(obj, JsonRequestBehavior.AllowGet);
        }


    }
}