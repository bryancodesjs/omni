using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SINFA.helpers
{
    public class GetNota
    {
        public int id_nota            { get; set; }
        public int id_diario          { get; set; }
        public string nombres { get; set; } = "";
        public string   apellidos     { get; set; }
        public string   asunto        { get; set; }
        public int id_provincia       { get; set; }
        public string  provincia      { get; set; }
        public int id_municipio       { get; set; }
        public string  municipio      { get; set; }
        public int id_sector          { get; set; }
        public string   sector        { get; set; }
        public string  detalles       { get; set; }
        public string    direccion    { get; set; }
        public DateTime?  fecha        { get; set; }
        public TimeSpan? hora          { get; set; }
        public int  eliminado         { get; set; }
        public string  institucion    { get; set; }
        public string  rango          { get; set; }

    }
}