using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SINFA.helpers
{
    public class ObtenerHora
    {
       

        public TimeSpan HoraActual(string Fecha)
        {
            // CONFIGURACIONES PARA OBTENER LA HORA, MINUTOS Y SEGUNDOS
            var fecha = Fecha;
            var hora = fecha.IndexOf(":");
            var horaFinal = Convert.ToInt32(fecha.Substring(0, hora));

            var minutos = fecha.LastIndexOf(":");
            var minutosFinal = Convert.ToInt32(fecha.Substring(hora + 1, minutos - 3));

            var segundos = Convert.ToInt32(fecha.Substring(minutos + 1, 2));
            // -----------------------------------------------------------  

            TimeSpan _hora = new TimeSpan(horaFinal, minutosFinal, segundos);

            return _hora;
        }

    }

}