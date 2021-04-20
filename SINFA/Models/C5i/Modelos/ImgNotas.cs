using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SINFA.Models.C5i.Modelos
{
    public class ImgNotas
    {

        public int IdNota { get; set; }    
        public string Nombre { get; set; }

        public DateTime Fecha { get; set; } = DateTime.Now;



    }
}