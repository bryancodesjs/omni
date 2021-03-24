
$(document).ready(() => {

    $('#_guardarNotaNuevosCasosHoy').click((e) => {
        e.preventDefault();

        const obj = {
            id_diario: $('#IdDiario').val(),
            confirmados: $('#CasosConfirmadosHoy').val(),
            fallecidos: $('#CasosFallecidosHoy').val(),
            nuevasPruebas: $('#NuevasPruebasHoy').val()
        };

        const { confirmados, fallecidos, nuevasPruebas } = obj;

        if (confirmados == '' || fallecidos == '' || nuevasPruebas == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe completar todos los campos!'
            });
            return;
        }

        //console.log(obj);

        $.ajax({
            url: '/Directivas/NuevosCasosHoy',
            method: 'POST',
            data: { model: obj },
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
                    setTimeout(() => { document.location.reload() }, 1500)
                }
            },
            error: (err) => {
                console.log(err);
            }
        });


    });



})