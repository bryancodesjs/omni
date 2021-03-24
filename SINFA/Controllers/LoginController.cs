using SINFA.helpers;
using SINFA.Models.C5i.DB_SQL_EntityFramework;
using SINFA.Models.C5i.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SINFA.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Acceder(Login model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                //var result = db.usuario.Where(u=>u.usuario1 == model.Usuario && u.clave == model.Clave).FirstOrDefault();

                var result = (from u in db.usuarios
                              join i in db.institucions on u.id_institucion equals i.id_institucion
                              join r in db.rangoes on u.id_rango equals r.id_rango
                              where u.usuario1 == model.Usuario && u.clave == model.Clave
                              select new
                              {
                                  u.id_usuario,
                                  u.acceso,
                                  u.nombres,
                                  u.apellidos,
                                  institucion = i.nombre,
                                  i.logo,
                                  rango = r.Nombre
                              }).FirstOrDefault();

                if(result != null)
                {
                    _return.Status = 200;
                    _return.Mensaje = "Ok";
                    _return.Callback = null;

                    Session["idUsuario"] = result.id_usuario;
                    Session["Usuario"] = result.nombres + " " + result.apellidos;
                    Session["Rango"] = result.rango;
                    Session["Institucion"] = result.institucion;
                    Session["Logo"] = result.logo;
                    Session["Acceso"] = result.acceso;
                }
                else
                {
                    _return.Status = 404;
                    _return.Mensaje = "False";
                    _return.Callback = null;
                }
            }


            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Salir()
        {
            Respuesta _return = new Respuesta();

            Session["idUsuario"] = null;
            Session["Usuario"] = null;
            Session["Rango"] = null;
            Session["Institucion"] = null;
            Session["Logo"] = null;
            Session["Acceso"] = null;

            _return.Status = 200;
            _return.Mensaje = "Cerrando sesion";

            return Json(_return, JsonRequestBehavior.AllowGet);
        }


    }
}
