//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SINFA.Models.C5i.DB_SQL_EntityFramework
{
    using System;
    using System.Collections.Generic;
    
    public partial class usuario
    {
        public int id_usuario { get; set; }
        public Nullable<int> id_institucion { get; set; }
        public Nullable<int> id_rango { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string cedula { get; set; }
        public string telefono { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
        public Nullable<int> acceso { get; set; }
        public string usuario1 { get; set; }
        public string clave { get; set; }
    }
}
