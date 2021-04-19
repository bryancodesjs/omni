using SINFA.helpers;
using SINFA.Models.C5i.DB_SQL_EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SINFA.Controllers
{
    public class DirectivasController : Controller
    {
        // GET: Directivas
        [HttpPost]
        public JsonResult SeguimientoCasosPovisitivos(List<seguimientocasospositivoscovid> Model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                foreach (var item in Model)
                {
                    item.fecha = DateTime.Now;
                    item.id_usuario = Convert.ToInt32(Session["idUsuario"].ToString());

                    db.seguimientocasospositivoscovids.Add(item);
                    var res = db.SaveChanges();

                    if (res == 1)
                    {
                        _return.Status = 200;
                        _return.Mensaje = "Ok";
                    }

                }
            }

            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OperacionesRealizadas(List<operaciones_realizadas> model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                foreach (var item in model)
                {                    
                    db.operaciones_realizadas.Add(item);
                    var res = db.SaveChanges();
                    if (res != 1)
                    {
                        break;
                    }
                    else
                    {
                        _return.Status = 200;
                        _return.Mensaje = "Ok";
                    }
                }
            }
            

            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Centros_Hospitalarios_Covid19_publico(int idDiario, int totalPublicos, cama _camas, uci _uci, ventiladore _ventilador)
        {
            centro _centro = new centro();
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                _camas.fecha = DateTime.Now;
                _uci.fecha = DateTime.Now;
                _ventilador.fecha = DateTime.Now;

                db.camas.Add(_camas);
                db.ucis.Add(_uci);
                db.ventiladores.Add(_ventilador);

                db.SaveChanges();

                _centro.id_cama = _camas.id_cama;
                _centro.id_uci = _uci.id_uci;
                _centro.id_ventilador = _ventilador.id_ventiladores;

                _centro.id_diario = idDiario;
                _centro.total_centros = totalPublicos;
                _centro.tipo_centro = "Publico";

                db.centros.Add(_centro);

                var res = db.SaveChanges();

                if (res == 1)
                {
                    _return.Status = 200;
                    _return.Mensaje = "Ok";
                }
                else
                {
                    _return.Status = 404;
                    _return.Mensaje = "False";
                }

                return Json(_return, JsonRequestBehavior.AllowGet);
            }


            
        }

        public JsonResult Centros_Hospitalarios_Covid19_privado(int idDiario, int totalPrivado, cama _camas, uci _uci, ventiladore _ventilador)
        {
            centro _centro = new centro();
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                _camas.fecha = DateTime.Now;
                _uci.fecha = DateTime.Now;
                _ventilador.fecha = DateTime.Now;

                db.camas.Add(_camas);
                db.ucis.Add(_uci);
                db.ventiladores.Add(_ventilador);

                db.SaveChanges();

                _centro.id_cama = _camas.id_cama;
                _centro.id_uci = _uci.id_uci;
                _centro.id_ventilador = _ventilador.id_ventiladores;

                _centro.id_diario = idDiario;
                _centro.total_centros = totalPrivado;
                _centro.tipo_centro = "Privado";

                db.centros.Add(_centro);

                var res = db.SaveChanges();

                if (res == 1)
                {
                    _return.Status = 200;
                    _return.Mensaje = "Ok";
                }
                else
                {
                    _return.Status = 404;
                    _return.Mensaje = "False";
                }

                return Json(_return, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult CentrosAislamientoCovid19(List<centrosAislamiento> model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                foreach (var item in model)
                {
                    db.centrosAislamientoes.Add(item);
                    var res = db.SaveChanges();

                    if (res == 1)
                    {
                        _return.Status = 200;
                        _return.Mensaje = "Ok";
                    }
                    else
                    {
                        _return.Status = 404;
                        _return.Mensaje = "False";
                    }
                }
                
            }

            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LlegadaVuelos(List<llegada_vuelos> model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                foreach (var item in model)
                {
                    item.fecha = DateTime.Now;

                    db.llegada_vuelos.Add(item);
                    var res = db.SaveChanges();

                    if (res == 1)
                    {
                        _return.Status = 200;
                        _return.Mensaje = "Ok";
                    }
                    else
                    {
                        _return.Status = 404;
                        _return.Mensaje = "False";
                    }

                }
            }

            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public JsonResult NuevosCasosHoy(nuevos_casos_hoy model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                db.nuevos_casos_hoy.Add(model);
                var res = db.SaveChanges();

                if (res == 1)
                {
                    _return.Status = 200;
                }
                else
                {
                    _return.Status = 404;
                }
                
            }

            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IntervencionesMigratorias(List<intervenciones_migratorias> model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                foreach (var item in model)
                {
                    item.fecha = DateTime.Now;

                    db.intervenciones_migratorias.Add(item);
                    var res = db.SaveChanges();

                    if (res == 1)
                    {
                        _return.Status = 200;
                    }
                    else
                    {
                        _return.Status = 404;
                    }

                }

                return Json(_return, JsonRequestBehavior.AllowGet);
            }
            
        }

        public JsonResult InterdiccionesMigratorias(List<interdicciones_migratorias> model)
        {
            using (DBEntities db = new DBEntities())
            {
                Respuesta _return = new Respuesta();

                foreach (var item in model)
                {
                    item.fecha = DateTime.Now;
                    db.interdicciones_migratorias.Add(item);
                    var res = db.SaveChanges();

                    if (res == 1)
                    {
                        _return.Status = 200;
                        _return.Mensaje = "Ok";
                    }
                    else
                    {
                        _return.Status = 404;
                        _return.Mensaje = "False";
                    }

                }
                return Json(_return, JsonRequestBehavior.AllowGet);
            }      
           
        }

        public async Task<JsonResult> RelacionPersonalVehiculos(List<relacion_personal_vehiculos_puntosFijos> model)
        {
            using (DBEntities db = new DBEntities())
            {
                Respuesta _return = new Respuesta();

                foreach (var item in model)
                {
                    item.fecha = DateTime.Now;

                    db.relacion_personal_vehiculos_puntosFijos.Add(item);
                    var res = await db.SaveChangesAsync();

                    if (res == 1)
                    {
                        _return.Status = 200;
                    }
                    else
                    {
                        _return.Status = 404;
                    }
                }

                return Json(_return, JsonRequestBehavior.AllowGet);
            }
            
        }


    }
}