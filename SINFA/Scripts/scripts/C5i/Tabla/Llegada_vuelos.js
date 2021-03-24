$(document).ready(() => {

    aeroPuerto = [];
    Datos = [];
    let _aeropuerto;
    let _idAeropuerto;
    let _tipoPrueba;

    function AeroPuertos() {

        axios.get("/C5i/CargarAeropuertos")
            .then(res => {

                $.each(res.data, function (key, value) {
                    const { id, nombre } = value;
                    const obj = {
                        value: id,
                        numero: key,
                        nombre: nombre
                    };
                    aeroPuerto.push(obj);
                    $('#aeroPuertoLlegadaVuelos').append(`                        
                        <option value="${id}">${key + 1} - ${nombre}</option>
                    `);
                });
                // console.log(provincia);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    AeroPuertos();


    $('#aeroPuertoLlegadaVuelos').change((e) => {
        _idAeropuerto = e.target.value;

        const valorSeleccionado = $("#aeroPuertoLlegadaVuelos option:selected").text();
        _aeropuerto = valorSeleccionado.substring(4, valorSeleccionado.length);
    });

    $('#tipoPruebaLlegadaVuelo').change((e) => {      

        _tipoPrueba = $("#tipoPruebaLlegadaVuelo option:selected").text();        
    });


    $('#_agregarLLEGADA_VUELOS').click((e) => {
        e.preventDefault();

        const obj = {
            id_aeropuerto: _idAeropuerto,
            id_diario: $('#IdDiario').val(),
            aeropuerto: _aeropuerto,
            tipo_prueba: _tipoPrueba,
            cantidad_vuelos: $('#cantidadVuelos').val(),
            pasajeros: $('#cantidadPasajerosLlegadaVuelos').val(),
            pruebas_pcr: $('#pruebasPCR').val(),
            pruebas_realizadas: $('#pruebasRealizadas').val(),
            pruebas_positivas: $('#pruebasPositivas').val(),
            pruebas_sospechosos: $('#pruebasSospechosos').val(),
            pruebas_negativas: $('#pruebasNegativas').val(),
            porcentaje_presentadas: $('#porcentajePresentadas').val(),
            porcentaje_realizadas: $('#porcentajePositivas').val(),
            porcentaje_positivas: $('#porcentajeSospechosos').val(),
            porcentaje_sospechosos: $('#porcentajeNegativas').val()
        };
        Datos.push(obj);
        //console.log(obj);

        let fila = '';
        $('#tablaLlegadaVuelos').html("");
        $.each(Datos, function (key, value) {
            const { aeropuerto, tipo_prueba, cantidad_vuelos, pasajeros, pruebas_pcr, pruebas_realizadas, pruebas_positivas, pruebas_sospechosos, pruebas_negativas, porcentaje_presentadas, porcentaje_realizadas, porcentaje_positivas, porcentaje_sospechosos} = value;

            fila += `
             <tr>
                <th scope="row">${aeropuerto}</th>
                <td>${tipo_prueba}</td>
                <td>${cantidad_vuelos}</td>
                <td>${pasajeros}</td>
                <td>${pruebas_pcr}</td>
                <td>${pruebas_realizadas}</td>
                <td>${pruebas_positivas}</td>
                <td>${pruebas_sospechosos}</td>
                <td>${pruebas_negativas}</td>
                <td>${porcentaje_presentadas}</td>
                <td>${porcentaje_realizadas}</td>
                <td>${porcentaje_positivas}</td>
                <td>${porcentaje_sospechosos}</td>
             </tr>`;
        });

        $('#tablaLlegadaVuelos').append(fila);

    });

    $('#_guardarNotaLLEGADA_VUELOS').click((e) => {
        e.preventDefault();

        $.ajax({
            url: '/Directivas/LlegadaVuelos',
            method: 'POST',
            data: { model: Datos },
            success: (res) => {
                const { Status } = res;
                console.log(res);
                if (Status == 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: '[OK]',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        document.location.reload();
                    }, 1600)
                }
            },
            error: (err) => {
                console.log(err);
            }
        });

    });


});