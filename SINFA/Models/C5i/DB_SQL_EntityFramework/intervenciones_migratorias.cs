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
    
    public partial class intervenciones_migratorias
    {
        public int id { get; set; }
        public Nullable<int> id_institucion { get; set; }
        public string directiva { get; set; }
        public Nullable<int> id_provincia { get; set; }
        public Nullable<int> id_nacionalidad { get; set; }
        public Nullable<int> retorno_voluntario { get; set; }
        public Nullable<int> hombres { get; set; }
        public Nullable<int> mujeres { get; set; }
        public Nullable<int> ninos { get; set; }
        public Nullable<int> total { get; set; }
        public Nullable<int> id_diario { get; set; }
        public Nullable<System.DateTime> fecha { get; set; }
    }
}