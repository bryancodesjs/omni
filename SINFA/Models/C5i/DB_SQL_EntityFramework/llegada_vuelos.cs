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
    
    public partial class llegada_vuelos
    {
        public int id { get; set; }
        public Nullable<int> id_aeropuerto { get; set; }
        public Nullable<int> id_diario { get; set; }
        public string tipo_prueba { get; set; }
        public Nullable<int> cantidad_vuelos { get; set; }
        public Nullable<int> pasajeros { get; set; }
        public Nullable<int> pruebas_pcr { get; set; }
        public Nullable<int> pruebas_realizadas { get; set; }
        public Nullable<int> pruebas_positivas { get; set; }
        public Nullable<int> pruebas_sospechosos { get; set; }
        public Nullable<int> pruebas_negativas { get; set; }
        public Nullable<int> porcentaje_presentadas { get; set; }
        public Nullable<int> porcentaje_realizadas { get; set; }
        public Nullable<int> porcentaje_positivas { get; set; }
        public Nullable<int> porcentaje_sospechosos { get; set; }
        public Nullable<System.DateTime> fecha { get; set; }
    }
}
