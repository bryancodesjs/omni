

$(document).ready(() => {
    

    $('#_guardarHospitalariosCovid19').click((e) => {
        e.preventDefault();
        //$('#').val();

        // OBJETOS DE CENTROS PUBLICOS

        const camaPublico = {
            total: $('#totalCamasPublico').val(),
            ocupada: $('#ocupadasCamasPublico').val(),
            disponible: $('#disponibleCamasPublico').val()
        }

        const uciPublico = {
            total: $('#totalUciPublico').val(),
            ocupada: $('#ocupadaUciPublico').val(),
            disponible: $('#disponibleUciPublico').val()
        }

        const ventiladoresPublico = {
            total: $('#totalVentiladorPublico').val(),
            ocupada: $('#ocupadoVentiladorPublico').val(),
            disponible: $('#disponibleVentiladorPublico').val()
        }

        if (camaPublico.disponible == '' || camaPublico.ocupada == '' || camaPublico.total == '' || uciPublico.disponible == '' || uciPublico.ocupada == '' || uciPublico.total == '' || ventiladoresPublico.disponible == '' || ventiladoresPublico.ocupada == '' || ventiladoresPublico.total == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe completar todos los campos!'
            });
            return;
        }
        
        // OBJETOS DE CENTROS PRIVADOS

        const camaPrivado = {
            total: $('#totalCamasPrivado').val(),
            ocupada: $('#ocupadoCamasPrivado').val(),
            disponible: $('#disponibleCamasPrivado').val()
        }

        const uciPrivado = {
            total: $('#totalUciPrivado').val(),
            ocupada: $('#ocupadoUciPrivado').val(),
            disponible: $('#disponibleUciPrivado').val()
        }

        const ventiladoresPrivado = {
            total: $('#totalVentiladorPrivado').val(),
            ocupada: $('#ocupadoVentiladorPrivado').val(),
            disponible: $('#disponibleVentiladorPrivado').val()
        }

        if (camaPrivado.disponible == '' || camaPrivado.ocupada == '' || camaPrivado.total == '' || uciPrivado.disponible == '' || uciPrivado.ocupada == '' || uciPrivado.total == '' || ventiladoresPrivado.disponible == '' || ventiladoresPrivado.ocupada == '' || ventiladoresPrivado.total == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe completar todos los campos!'
            });
            return;
        }
       

        const totalCentrosPublicos = $('#TotalCentrosPublicos').val();

        const totalCentrosPrivados = $('#totalCentrosPrivados').val();

        //console.log(camaPrivado);
        //console.log(uciPrivado);
        //console.log(ventiladoresPrivado);


        // INSERTAR EN LA BASE DE DATOS EL OBJETO PUBLICO

        $.ajax({
            url: '/Directivas/Centros_Hospitalarios_Covid19_publico',
            method: 'POST',
            data: {
                idDiario: $('#IdDiario').val(),
                totalPublicos: totalCentrosPublicos,
                _camas: camaPublico,
                _uci: uciPublico,
                _ventilador: ventiladoresPublico
            },
            success: (res) => {
                const { Status } = res;
                console.log(res);

                if (Status == 200) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ok',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        document.location.reload();
                    }, 1600)

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salio mal!'
                    });
                }
            },
            error: (err) => {
                console.error(err);
            }

        });


        // INSERTAR EN LA BASE DE DATOS EL OBJETO PRIVADO

        $.ajax({
            url: '/Directivas/Centros_Hospitalarios_Covid19_privado',
            method: 'POST',
            data: {
                idDiario: $('#IdDiario').val(),
                totalPrivado: totalCentrosPrivados,
                _camas: camaPrivado,
                _uci: uciPrivado,
                _ventilador: ventiladoresPrivado
            },
            success: (res) => {
                const { Status } = res;
                console.log(res);

                if (Status == 200) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ok',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        document.location.reload();
                    }, 1600)

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salio mal!'
                    });
                }
            },
            error: (err) => {
                console.error(err);
            }

        });



    });


});