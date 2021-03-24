using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SINFA.Controllers
{
    public class R6Controller : Controller
    {
        // GET: R6
        public ActionResult Index()
        {
            return View();
        }

        // GET: R6/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: R6/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: R6/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: R6/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: R6/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: R6/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: R6/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
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

        public ActionResult Estadistica()
        {
            ViewBag.Message = "Zona de estadisticas";

            return View();
        }

        public ActionResult Imprimir()
        {
            ViewBag.Message = "Imprimir Diario";

            return View();
        }
    }
}
