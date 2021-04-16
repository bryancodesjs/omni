﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DBEntities : DbContext
    {
        public DBEntities()
            : base("name=DBEntities")
        {
           
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<categoria> categorias { get; set; }
        public virtual DbSet<diario> diarios { get; set; }
        public virtual DbSet<eje> ejes { get; set; }
        public virtual DbSet<institucion> institucions { get; set; }
        public virtual DbSet<Municipio> Municipios { get; set; }
        public virtual DbSet<nota> notas { get; set; }
        public virtual DbSet<Provincia> Provincias { get; set; }
        public virtual DbSet<rango> rangoes { get; set; }
        public virtual DbSet<Sector> Sectors { get; set; }
        public virtual DbSet<seguimientocasospositivoscovid> seguimientocasospositivoscovids { get; set; }
        public virtual DbSet<usuario> usuarios { get; set; }
        public virtual DbSet<subcategoria> subcategorias { get; set; }
        public virtual DbSet<directiva> directivas { get; set; }
        public virtual DbSet<subdirectiva> subdirectivas { get; set; }
        public virtual DbSet<operaciones_realizadas> operaciones_realizadas { get; set; }
        public virtual DbSet<cama> camas { get; set; }
        public virtual DbSet<centro> centros { get; set; }
        public virtual DbSet<uci> ucis { get; set; }
        public virtual DbSet<ventiladore> ventiladores { get; set; }
        public virtual DbSet<centrosAislamiento> centrosAislamientoes { get; set; }
        public virtual DbSet<aeropuerto> aeropuertoes { get; set; }
        public virtual DbSet<llegada_vuelos> llegada_vuelos { get; set; }
        public virtual DbSet<nuevos_casos_hoy> nuevos_casos_hoy { get; set; }
        public virtual DbSet<nacionalidad> nacionalidads { get; set; }
        public virtual DbSet<intervenciones_migratorias> intervenciones_migratorias { get; set; }
        public virtual DbSet<interdicciones_migratorias> interdicciones_migratorias { get; set; }
    }
}
