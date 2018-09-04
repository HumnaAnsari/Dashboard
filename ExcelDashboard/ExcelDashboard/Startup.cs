using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ExcelDashboard.Startup))]
namespace ExcelDashboard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
