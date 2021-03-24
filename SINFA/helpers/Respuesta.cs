using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SINFA.helpers
{
    public class Respuesta
    {
        public int Status { get; set; }
        public string Mensaje { get; set; }
        public object Callback { get; set; }
    }
}