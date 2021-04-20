using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SINFA.Models.C5i.Modelos
{
    public class Imagenes
    {


        public string confirmacion { get; set; }
        public Exception errorr { get; set; }

        public void FileUpload(string ruta, HttpPostedFileBase file)
        {
            try
            {

                file.SaveAs(ruta);
                this.confirmacion = "Fichero Guardado";



            }
            catch (Exception ex)
            {

                this.errorr = ex;
            }



        }

        internal void FileUpload(string ruta, HttpPostedFile file)
        {
            throw new NotImplementedException();
        }
    }
}