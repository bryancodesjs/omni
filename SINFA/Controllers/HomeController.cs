using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SINFA.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Imprimir()
        {
            ViewBag.Message = "Imprimir Diario del Dia";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Diario()
        {
            ViewBag.Message = "Diario del dia";

            return View();
        }

        public ActionResult NuevaNota()
        {
            ViewBag.Message = "Crear nueva nota";

            return View();
        }
        public ActionResult NuevaNotaDos()
        {
            ViewBag.Message = "Crear nueva nota";

            return View();
        }
    }
}