using Gma.QrCodeNet.Encoding;
using Gma.QrCodeNet.Encoding.Windows.Render;
using Newtonsoft.Json;
using SINFA.helpers;
using SINFA.Models.C5i.DB_SQL_EntityFramework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages;

namespace SINFA.Controllers
{
    public class C5iController : Controller
    {

        // GET: C5i
        public ActionResult Index()
        {
            if (Session["Usuario"] != null)
            {
                using (DBEntities db = new DBEntities())
                {
                    var result = (from d in db.diarios
                                  join u in db.usuarios on d.id_usuario equals u.id_usuario
                                  join r in db.rangoes on u.id_rango equals r.id_rango
                                  join i in db.institucions on u.id_institucion equals i.id_institucion
                                  orderby d.id_diario descending
                                  select new
                                  {
                                      d.id_diario,
                                      d.id_usuario,
                                      d.fecha,
                                      d.cerrado,
                                      d.hora_apertura,
                                      d.hora_cierre,
                                      escribiente = u.nombres + u.apellidos,
                                      rango = r.Nombre,
                                      institucion = i.nombre
                                  }).ToList();

                    dynamic jsonSerializerIndex = JsonConvert.SerializeObject(result);
                    dynamic jsonIndex = JsonConvert.DeserializeObject<dynamic>(jsonSerializerIndex);

                    ViewBag.Index = jsonIndex;
                    return View();
                }
            }
            else
            {
                return Redirect("/Login");
            }           

        }

        public ActionResult NuevaNota(int id)
        {
            if (Session["Usuario"] != null && id > 0)
            {
                ViewBag.IdDiario = id;
                return View();
            }
            else
            {
                return Redirect("/Login");
            }
            
        }

        public ActionResult NuevaTabla(int id)
        {
            if (Session["Usuario"] != null && id > 0)
            {
                ViewBag.IdDiario = id;
                return View();
            }
            else
            {
                return Redirect("/Login");
            }

        }

        public async Task<JsonResult> GuardarNota(nota model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                model.id_usuario = Convert.ToInt32(Session["idUsuario"].ToString());
                model.eliminado = 0;
                db.notas.Add(model);
                var res = await db.SaveChangesAsync();

                if(res == 1)
                {
                    _return.Status = 200;
                    _return.Mensaje = "OK";
                }
                else
                {
                    _return.Status = 404;
                    _return.Mensaje = "False";
                }

                return Json(_return, JsonRequestBehavior.AllowGet);
            }
            
        }

        public ActionResult EditarNota(int Id)
        {
            using (DBEntities db = new DBEntities())
            {
                var nota = (from n in db.notas
                              join u in db.usuarios on n.id_usuario equals u.id_usuario
                              join i in db.institucions on u.id_institucion equals i.id_institucion
                              join r in db.rangoes on u.id_rango equals r.id_rango
                              join s in db.Sectors on n.id_sector equals s.IdSector
                              join p in db.Provincias on n.id_provincia equals p.Id
                              join m in db.Municipios on n.id_municipio equals m.IdMunicipio

                              where n.id_nota == Id && n.eliminado == 0 && m.IdProvincia == p.Id && s.IdProvincia == p.Id && s.IdMunicipio == m.IdMunicipio
                              select new
                              {
                                  n.id_nota,
                                  n.id_diario,
                                  u.nombres,
                                  u.apellidos,
                                  n.asunto,
                                  n.id_provincia,
                                  provincia = p.Nombre,
                                  n.id_municipio,
                                  municipio = m.Nombre,
                                  n.id_sector,
                                  sector = s.Nombre,
                                  n.detalles,
                                  n.direccion,
                                  n.fecha,
                                  n.hora,
                                  n.eliminado,
                                  institucion = i.nombre,
                                  rango = r.Nombre
                              }).ToList();

                dynamic jsonSerializerIndex = JsonConvert.SerializeObject(nota);
                dynamic jsonIndex = JsonConvert.DeserializeObject<dynamic>(jsonSerializerIndex);

                ViewBag.Nota = jsonIndex;
                return View();
            }
           
        }

        public JsonResult GuardarCambios(nota model)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {               
                model.id_usuario = Convert.ToInt32(Session["idUsuario"].ToString());
                db.Entry(model).State = EntityState.Modified;
                db.SaveChanges();
                var res = db.SaveChanges();

                if (res == 0)
                {
                    _return.Status = 200;
                    _return.Mensaje = "Actualizado Correctamente";
                }
                else
                {
                    _return.Status = 400;
                    _return.Mensaje = "Algo Salio mal";
                }

                return Json(_return, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CerrarDiario(int id)
        {
            Respuesta _return = new Respuesta();

            using (DBEntities db = new DBEntities())
            {
                var result = db.notas.Where(n=>n.id_diario == id).Count();

                if (result == 0)
                {
                    _return.Status = 400;
                    _return.Mensaje = "Aun no tienes notas disponibles en este diario";
                }
                else
                {
                    var _diario = db.diarios.Where(d=>d.id_diario == id).FirstOrDefault();

                    _diario.cerrado = 1;
                    db.Entry(_diario).State = EntityState.Modified;                    
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

        public JsonResult AbrirDiario()
        {
            Respuesta _return = new Respuesta();
            diario model = new diario();                      

            using (DBEntities db = new DBEntities())
            {
                var result = (from d in db.diarios
                              where d.cerrado == 0
                              select d
                              ).ToList();

                if (result.Count > 0)
                {
                    _return.Status = 400;
                    _return.Mensaje = "Debe cerrar los diarios antes de abrir otro";
                }
                else
                {                    
                    ObtenerHora _hora = new ObtenerHora();

                    model.id_usuario = Convert.ToInt32(Session["idUsuario"].ToString());
                    model.fecha = DateTime.Now;
                    model.hora_apertura = _hora.HoraActual( DateTime.Now.ToString("hh:mm:ss") );
                    model.cerrado = 0;

                    db.diarios.Add(model);
                    var res = db.SaveChanges();

                    if (res == 1)
                    {
                        _return.Status = 200;
                        _return.Mensaje = "Diario Creado";
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
        
        public ActionResult Diario(int id, string fecha, string texto=null)
        {
            ViewBag.Fecha = fecha;
            int codeDiario = id;
            dynamic jsonSerializerTabla;
            dynamic jsonTabla;
            if (texto == null)
            {
                using (DBEntities db = new DBEntities())
                {

                    //--------- CODIGOS PARA LAS TABLAS ------------------------------------------------------------

                    var tablas = (from t in db.seguimientocasospositivoscovids
                                  join u in db.usuarios on t.id_usuario equals u.id_usuario
                                  join p in db.Provincias on t.id_provincia equals p.Id
                                  join i in db.institucions on u.id_institucion equals i.id_institucion
                                  join r in db.rangoes on u.id_rango equals r.id_rango
                                  where t.id_diario == id
                                  select new
                                  {
                                      t.id_diario,
                                      t.equipos,
                                      t.visitas_realizadas,
                                      t.visitas_acomuladas,
                                      t.fallecidos,
                                      t.traslados,
                                      t.fecha,
                                      usuario = r.Nombre + " " + u.nombres + " " + u.apellidos + " " + i.nombre,
                                      provincia = p.Nombre
                                  }
                                  ).ToList();

                    jsonSerializerTabla = JsonConvert.SerializeObject(tablas);
                    jsonTabla = JsonConvert.DeserializeObject<dynamic>(jsonSerializerTabla);

                    ViewBag.Tablas = jsonTabla;





                    //--------- CODIGOS PARA NOTAS ------------------------------------------------------------
                    var result = (from n in db.notas
                                  join u in db.usuarios on n.id_usuario equals u.id_usuario
                                  join i in db.institucions on u.id_institucion equals i.id_institucion
                                  join r in db.rangoes on u.id_rango equals r.id_rango
                                  join d in db.diarios on id equals d.id_diario
                                  join s in db.Sectors on n.id_sector equals s.IdSector
                                  join p in db.Provincias on n.id_provincia equals p.Id
                                  join m in db.Municipios on n.id_municipio equals m.IdMunicipio

                                  where n.id_diario == id && n.eliminado != 1 && m.IdProvincia == p.Id && s.IdProvincia == p.Id && s.IdMunicipio == m.IdMunicipio
                                  select new
                                  {
                                      n.id_diario,
                                      n.id_nota,
                                      u.nombres,
                                      u.apellidos,
                                      n.asunto,
                                      provincia = p.Nombre,
                                      municipio = m.Nombre,
                                      sector = s.Nombre,
                                      n.detalles,
                                      n.direccion,
                                      n.hora,
                                      institucion = i.nombre,
                                      rango = r.Nombre,
                                      estadoDiario = d.cerrado
                                  }).ToList();

                    dynamic jsonSerializerIndex = JsonConvert.SerializeObject(result);
                    dynamic jsonIndex = JsonConvert.DeserializeObject<dynamic>(jsonSerializerIndex);

                    ViewBag.Elements = jsonIndex;
                    ViewBag.IdDiario = id;
                    ViewBag.Fecha = fecha;
                    ViewBag.codigoDiario = codeDiario;

                    if (result.Count == 0)
                    {

                        ViewBag.Elements = jsonIndex;
                        ViewBag.IdDiario = id;
                        ViewBag.Fecha = fecha;
                        ViewBag.codigoDiario = codeDiario;

                        return View();

                    }




                }
                //----------------------------------------------------------------------------------------------
            }


            else if (texto != null && id > 0)
            {

                ViewBag.IdDiario = id;

                ViewBag.codigoDiario = codeDiario;

                string TextoBuscado;
                string TextoEncontrado;
                string Acentos;

                var re = texto.Trim();
                if (re.Length > 0)
                {

                    List<dynamic> lstBuscar = new List<dynamic>();
                    using (DBEntities db = new DBEntities())
                    {

                        //-----------------------------------------------------------------------------------------

                        //--------- CODIGOS PARA LAS TABLAS ------------------------------------------------------------

                        var tablas = (from t in db.seguimientocasospositivoscovids
                                      join u in db.usuarios on t.id_usuario equals u.id_usuario
                                      join p in db.Provincias on t.id_provincia equals p.Id
                                      join i in db.institucions on u.id_institucion equals i.id_institucion
                                      join r in db.rangoes on u.id_rango equals r.id_rango
                                      where t.id_diario == id
                                      select new
                                      {
                                          t.id_diario,
                                          t.equipos,
                                          t.visitas_realizadas,
                                          t.visitas_acomuladas,
                                          t.fallecidos,
                                          t.traslados,
                                          t.fecha,
                                          usuario = r.Nombre + " " + u.nombres + " " + u.apellidos + " " + i.nombre,
                                          provincia = p.Nombre
                                      }
                                      ).ToList();

                        jsonSerializerTabla = JsonConvert.SerializeObject(tablas);
                        jsonTabla = JsonConvert.DeserializeObject<dynamic>(jsonSerializerTabla);

                        ViewBag.Tablas = jsonTabla;
                       
                        var text = (from n in db.notas
                                    where n.id_diario != null && n.eliminado != 1 && n.detalles != null && n.asunto != null && n.id_usuario != null &&
                                   n.asunto.Contains(texto) || n.detalles.Contains(texto)
                                    select n).ToList();
                        


                        if (text != null)
                        {
                            foreach (var itemCodigo in text)
                            {
                                int Codig = (int)itemCodigo.id_diario;
                                int codigo = (int)itemCodigo.id_nota;
                                if (Codig == id)
                                {



                                    using (DBEntities db3 = new DBEntities())
                                    {
                                        var nota = (from n in db3.notas
                                                    join u in db3.usuarios on n.id_usuario equals u.id_usuario
                                                    join i in db3.institucions on u.id_institucion equals i.id_institucion
                                                    join r in db3.rangoes on u.id_rango equals r.id_rango
                                                    join s in db3.Sectors on n.id_sector equals s.IdSector
                                                    join p in db3.Provincias on n.id_provincia equals p.Id
                                                    join m in db3.Municipios on n.id_municipio equals m.IdMunicipio

                                                    where n.id_nota == codigo && n.eliminado == 0 && m.IdProvincia == p.Id && s.IdProvincia == p.Id && s.IdMunicipio == m.IdMunicipio
                                                    select new GetNota
                                                    {
                                                        id_nota = n.id_nota,
                                                        id_diario = (int)n.id_diario,
                                                        nombres = u.nombres,
                                                        apellidos = u.apellidos,
                                                        asunto = n.asunto,
                                                        id_provincia = (int)n.id_provincia,
                                                        provincia = p.Nombre,
                                                        id_municipio = (int)n.id_municipio,
                                                        municipio = m.Nombre,
                                                        id_sector = (int)n.id_sector,
                                                        sector = s.Nombre,
                                                        detalles = n.detalles,
                                                        direccion = n.direccion,
                                                        fecha = (DateTime)n.fecha,
                                                        hora = (TimeSpan)n.hora,
                                                        eliminado = (int)n.eliminado,
                                                        institucion = i.nombre,
                                                        rango = r.Nombre
                                                    }).ToList();



                                        lstBuscar.Add(nota);

                                    }
                                    ViewBag.Resultado = lstBuscar;



                                    TextoBuscado = RemoveAccentsWithNormalization(texto.ToLower());

                                    foreach (var items in text)
                                    {
                                        string detallex = RemoveAccentsWithNormalization(items.detalles.ToLower());
                                        string asuntox = RemoveAccentsWithNormalization(items.asunto.ToLower());


                                        bool t = detallex.Contains(TextoBuscado) || asuntox.Contains(TextoBuscado);
                                        if (t == true)
                                        {

                                            int posicionD = -1;
                                            int posicionA = -1;
                                            string mitexto = "";
                                            posicionD = detallex.IndexOf(TextoBuscado);
                                            posicionA = asuntox.IndexOf(TextoBuscado);


                                            if (posicionD == -1 && posicionA == -1)
                                            {
                                                ViewBag.Texto = texto;


                                            }
                                            else if (posicionD > -1 && posicionA == -1)
                                            {
                                                mitexto = items.detalles.Substring(posicionD, TextoBuscado.Length);

                                                ViewBag.Texto = mitexto;

                                            }
                                            else if (posicionD == -1 && posicionA > -1)
                                            {
                                                mitexto = items.asunto.Substring(posicionA, TextoBuscado.Length);

                                                ViewBag.Texto = mitexto;
                                            }
                                            else if (posicionD > -1 && posicionA > -1)
                                            {
                                                mitexto = items.detalles.Substring(posicionD, TextoBuscado.Length);

                                                ViewBag.Texto = mitexto;

                                            }
                                            else
                                            {
                                                ViewBag.Texto = texto;

                                            }

                                        }



                                    }








                                   







                                }
                                else
                                {

                                    return View();
                                }

                            }



                        


                        }
                        else
                        {
                            return View();

                        }

                        

                    }
                    return View();
                }
                else
                {
                    return RedirectToAction("Index");

                }


            }
            else
            {
                return RedirectToAction("Index");

            }
            return View();
        }

        public JsonResult EliminarNota(int id)
        {
            Respuesta _return = new Respuesta();            

            using (DBEntities db = new DBEntities())
            {
                var registro = db.notas.Find(id);
                registro.eliminado = 1;
                var res = db.SaveChanges();

                if (res == 1)
                {
                    _return.Mensaje = "Ok";
                    _return.Status = 200;
                }
                else
                {
                    _return.Mensaje = "False";
                    _return.Status = 404;
                }

            }            

            return Json(_return, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ImprimirDiario(int Id)
        {           
            using (DBEntities db = new DBEntities())
            {
                var notas = (from n in db.notas
                             join d in db.diarios on n.id_diario equals d.id_diario
                             where d.id_diario == Id
                             select new
                             {
                                 n.id_nota,
                                 n.id_provincia,
                                 n.detalles,
                                 n.asunto,
                                 n.fecha,
                                 n.hora,
                                 n.direccion                                 
                             }).ToList();

                var diario = (from d in db.diarios
                              where d.id_diario == Id
                              select new
                              {
                                  Inicio = d.fecha,
                                  Apertura = d.hora_apertura,
                                  Cierre = d.hora_cierre
                              }).FirstOrDefault();

                dynamic jsonSerializer = JsonConvert.SerializeObject(notas);
                dynamic json = JsonConvert.DeserializeObject<dynamic>(jsonSerializer);            

                var datos = Session["Rango"].ToString() + " " + Session["Usuario"].ToString() + " " + Session["Institucion"].ToString();               

                QrEncoder qrEncoder = new QrEncoder(ErrorCorrectionLevel.H);
                QrCode qrCode = new QrCode();
                qrEncoder.TryEncode(datos, out qrCode);

                GraphicsRenderer renderer = new GraphicsRenderer(new FixedCodeSize(400, QuietZoneModules.Zero), Brushes.Black, Brushes.White);

                MemoryStream ms = new MemoryStream();

                renderer.WriteToStream(qrCode.Matrix, ImageFormat.Png, ms);
                var imageTemporal = new Bitmap(ms);
                var imagen = new Bitmap(imageTemporal, new Size(new Point(200, 200)));

                // Guardar en el disco duro la imagen (Carpeta del proyecto)
                //imagen.Save("imagen.png", ImageFormat.Png);

                var qrListo = ImageToByte2(imagen);

                ViewBag.Qr = Convert.ToBase64String(qrListo);

                ViewBag.Inicio = diario.Inicio;
                ViewBag.Final = Convert.ToDateTime(diario.Inicio).AddDays(1);
                ViewBag.Apertura = diario.Apertura;
                ViewBag.Cierre = diario.Cierre;
               
                ViewBag.Notas = json;

                return View();
            }

        }
        public static byte[] ImageToByte2(Image img)
        {
            using (var stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }

        public JsonResult CargarProvincia()
        {
            using (DBEntities db = new DBEntities())
            {
                var provincias = (from p in db.Provincias
                                  orderby p.Nombre ascending
                                  select p).ToList();

                return Json(provincias, JsonRequestBehavior.AllowGet);
            }            
        }

        public JsonResult CargarMunicipio(int id)
        {
            using (DBEntities db = new DBEntities())
            {
                var municipios = (from m in db.Municipios
                                  where m.IdProvincia == id
                                  orderby m.Nombre ascending
                                  select m).ToList();

                return Json(municipios, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CargarSector(int idProvincia, int idMunicipio)
        {
            using (DBEntities db = new DBEntities())
            {
                var sectores = (from s in db.Sectors
                                  where s.IdProvincia == idProvincia && s.IdMunicipio == idMunicipio
                                  orderby s.Nombre ascending
                                  select s).ToList();

                return Json(sectores, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Estadisticas()
        {
            return View();
        }


        
        public ActionResult Search()
        {

            using (DBEntities db = new DBEntities())
            {
                var notas = (from n in db.notas
                             join d in db.diarios on n.id_diario equals d.id_diario
                            
                             select new
                             {
                                 n.id_nota,
                                 n.id_provincia,
                                 n.detalles,
                                 n.asunto,
                                 n.fecha,
                                 n.hora,
                                 n.direccion
                             }).ToList();

                var diario = (from d in db.diarios                           
                              select new
                              {
                                  Inicio = d.fecha,
                                  Apertura = d.hora_apertura,
                                  Cierre = d.hora_cierre
                              }).FirstOrDefault();

                dynamic jsonSerializer = JsonConvert.SerializeObject(notas);
                dynamic json = JsonConvert.DeserializeObject<dynamic>(jsonSerializer);

            }



                return View();

        }
        
        public ActionResult Personal()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Search(string texto)
        {
          
          string TextoBuscado;
            var re = texto.Trim();
            if (re.Length>0)
            {

                List<dynamic> lstBuscar = new List<dynamic>();
                using (DBEntities db = new DBEntities())
                {

                    var text = (from n in db.notas
                                where n.id_diario != null && n.eliminado != 1 && n.detalles != null && n.asunto != null && n.id_usuario != null &&
                               n.asunto.Contains(texto) || n.detalles.Contains(texto)
                                select n).ToList();

                    if (text != null)
                    {





                        TextoBuscado = RemoveAccentsWithNormalization(texto.ToLower());

                        foreach (var items in text)
                        {
                            string detallex = RemoveAccentsWithNormalization(items.detalles.ToLower());
                            string asuntox = RemoveAccentsWithNormalization(items.asunto.ToLower());


                            bool t = detallex.Contains(TextoBuscado) || asuntox.Contains(TextoBuscado);
                            if (t == true)
                            {

                                int posicionD = -1;
                                int posicionA = -1;
                                string mitexto = "";
                                posicionD = detallex.IndexOf(TextoBuscado);
                                posicionA = asuntox.IndexOf(TextoBuscado);


                                if (posicionD == -1 && posicionA == -1)
                                {
                                    ViewBag.Texto = texto;


                                }
                                else if (posicionD > -1 && posicionA == -1)
                                {
                                    mitexto = items.detalles.Substring(posicionD, TextoBuscado.Length);

                                    ViewBag.Texto = mitexto;

                                }
                                else if (posicionD == -1 && posicionA > -1)
                                {
                                    mitexto = items.asunto.Substring(posicionA, TextoBuscado.Length);

                                    ViewBag.Texto = mitexto;
                                }
                                else if (posicionD > -1 && posicionA > -1)
                                {
                                    mitexto = items.detalles.Substring(posicionD, TextoBuscado.Length);

                                    ViewBag.Texto = mitexto;

                                }
                                else
                                {
                                    ViewBag.Texto = texto;

                                }

                            }

                        }

                        foreach (var item in text)
                        {
                            int codigo = item.id_nota;
                            using (DBEntities db3 = new DBEntities())
                            {
                                var nota = (from n in db3.notas
                                            join u in db3.usuarios on n.id_usuario equals u.id_usuario
                                            join i in db3.institucions on u.id_institucion equals i.id_institucion
                                            join r in db3.rangoes on u.id_rango equals r.id_rango
                                            join s in db3.Sectors on n.id_sector equals s.IdSector
                                            join p in db3.Provincias on n.id_provincia equals p.Id
                                            join m in db3.Municipios on n.id_municipio equals m.IdMunicipio

                                            where n.id_nota == codigo && n.eliminado == 0 && m.IdProvincia == p.Id && s.IdProvincia == p.Id && s.IdMunicipio == m.IdMunicipio
                                            select new GetNota
                                            {
                                                id_nota = n.id_nota,
                                                id_diario = (int)n.id_diario,
                                                nombres = u.nombres,
                                                apellidos = u.apellidos,
                                                asunto = n.asunto,
                                                id_provincia = (int)n.id_provincia,
                                                provincia = p.Nombre,
                                                id_municipio = (int)n.id_municipio,
                                                municipio = m.Nombre,
                                                id_sector = (int)n.id_sector,
                                                sector = s.Nombre,
                                                detalles = n.detalles,
                                                direccion = n.direccion,
                                                fecha = (DateTime)n.fecha,
                                                hora = (TimeSpan)n.hora,
                                                eliminado = (int)n.eliminado,
                                                institucion = i.nombre,
                                                rango = r.Nombre
                                            }).ToList();



                                lstBuscar.Add(nota);

                            }

                            ViewBag.Resultado = lstBuscar;
                            return View();




                        }

                    }
                    else
                    {

                        return View();
                    }

                }
               
            }
            else
            {
                return RedirectToAction("Index");

            }


            return View();

        }

        public List<dynamic> CargarTablas(int id)
        {
            List<dynamic> rtables = null;
            using (DBEntities db = new DBEntities())
            {
                var tablas = (from t in db.seguimientocasospositivoscovids
                              join u in db.usuarios on t.id_usuario equals u.id_usuario
                              join p in db.Provincias on t.id_provincia equals p.Id
                              join i in db.institucions on u.id_institucion equals i.id_institucion
                              join r in db.rangoes on u.id_rango equals r.id_rango
                              where t.id_diario == id
                              select new
                              {
                                  t.id_diario,
                                  t.equipos,
                                  t.visitas_realizadas,
                                  t.visitas_acomuladas,
                                  t.fallecidos,
                                  t.traslados,
                                  t.fecha,
                                  usuario = r.Nombre + " " + u.nombres + " " + u.apellidos + " " + i.nombre,
                                  provincia = p.Nombre
                              }
                                    ).ToList();
                rtables = tablas.ToList<dynamic>();

            }

            return rtables;
        }


        public List<dynamic> Resultados(string texto, int id)
        {
            List<dynamic> LstResultado = null;
            using (DBEntities db = new DBEntities())
            {
                var resultado2 = (from d in  db.notas.Where(a => a.asunto.Contains(texto) || a.detalles.Contains(texto))
                    select new { d.asunto,d.detalles }).ToList();
                //--------- CODIGOS PARA NOTAS ------------------------------------------------------------
                var result = (from n in db.notas
                              join u in db.usuarios on n.id_usuario equals u.id_usuario
                              join i in db.institucions on u.id_institucion equals i.id_institucion
                              join r in db.rangoes on u.id_rango equals r.id_rango
                              join d in db.diarios on id equals d.id_diario
                              join s in db.Sectors on n.id_sector equals s.IdSector
                              join p in db.Provincias on n.id_provincia equals p.Id
                              join m in db.Municipios on n.id_municipio equals m.IdMunicipio

                              where  n.id_diario == id && n.eliminado != 1 && m.IdProvincia == p.Id && s.IdProvincia == p.Id && s.IdMunicipio == m.IdMunicipio
                              select new
                              {
                                  n.id_diario,
                                  n.id_nota,
                                  u.nombres,
                                  u.apellidos,
                                  n.asunto,
                                  provincia = p.Nombre,
                                  municipio = m.Nombre,
                                  sector = s.Nombre,
                                  n.detalles,
                                  n.direccion,
                                  n.hora,
                                  institucion = i.nombre,
                                  rango = r.Nombre,
                                  estadoDiario = d.cerrado
                              }).ToList();


                var resultadoFinal = result.Where(n => n.asunto.Contains(texto) || n.detalles.Contains(texto)).ToList();

                LstResultado = resultadoFinal.ToList<dynamic>();
                //result.ToList<dynamic>();
            }
            return LstResultado;
        }

        public JsonResult CargarEjes()
        {
            using (DBEntities db = new DBEntities())
            {
                var ejes = (from e in db.ejes
                            select new
                            {
                                e.id_eje,
                                e.nombre
                            }).ToList();

                return Json(ejes, JsonRequestBehavior.AllowGet);
            }            
        }
        public JsonResult CargarCategorias(int id)
        {
            using (DBEntities db = new DBEntities())
            {
                var categorias = (from e in db.categorias
                            where e.id_eje == id
                            select new
                            {
                                e.id_categoria,
                                e.nombre
                            }).ToList();

                return Json(categorias, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CargarCategorias2()
        {
            using (DBEntities db = new DBEntities())
            {
                var categorias = (from c in db.categorias
                                  select new
                                  {
                                      c.id_categoria,
                                      c.nombre
                                  }).ToList();

                return Json(categorias, JsonRequestBehavior.AllowGet);
            }

        }


        public JsonResult CargarSubCategorias(int id)
        {
            using (DBEntities db = new DBEntities())
            {
                var subcategorias = (from e in db.subcategorias
                                  where e.id_categoria == id
                                  select new
                                  {
                                      e.id_subcategoria,
                                      e.nombre
                                  }).ToList();

                return Json(subcategorias, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CargarDirectivas()
        {
            using (DBEntities db = new DBEntities())
            {
                var directivas = (from e in db.directivas                                     
                                     select new
                                     {
                                         e.id_directiva,
                                         e.nombre
                                     }).ToList();

                return Json(directivas, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CargarSubDirectivas(int id)
        {
            using (DBEntities db = new DBEntities())
            {
                var directivas = (from e in db.subdirectivas
                                  where e.id_directiva == id
                                  select new
                                  {
                                      e.id_subdirectivas,
                                      e.nombre
                                  }).ToList();

                return Json(directivas, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CargarAeropuertos()
        {
            using (DBEntities db = new DBEntities())
            {
                var aeropuertos = db.aeropuertoes.ToList();

                return Json(aeropuertos, JsonRequestBehavior.AllowGet);
            }            
        }

        public JsonResult CargarPaises()
        {
            using (DBEntities db = new DBEntities())
            {
                var paises = (from p in db.nacionalidads select p).OrderBy(p=>p.pais).ToList();

                return Json(paises, JsonRequestBehavior.AllowGet);
            }            
        }


        public static string RemoveAccentsWithNormalization(string inputString)
        {
            string normalizedString = inputString.Normalize(NormalizationForm.FormD);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < normalizedString.Length; i++)
            {
                UnicodeCategory uc = CharUnicodeInfo.GetUnicodeCategory(normalizedString[i]);
                if (uc != UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(normalizedString[i]);
                }
            }
            return (sb.ToString().Normalize(NormalizationForm.FormC));
        }
    }
}
