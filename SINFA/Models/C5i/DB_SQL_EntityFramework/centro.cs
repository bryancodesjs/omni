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
    
    public partial class centro
    {
        public int id_centro { get; set; }
        public Nullable<int> id_diario { get; set; }
        public Nullable<int> total_centros { get; set; }
        public Nullable<int> id_cama { get; set; }
        public Nullable<int> id_uci { get; set; }
        public Nullable<int> id_ventilador { get; set; }
        public string tipo_centro { get; set; }
    }
}
