$(document).ready(() => {

    const btn_cerrarDiario = $('#cerrarDiario');

    btn_cerrarDiario.click((e) => {
        e.preventDefault();

        const idDiario = $(btn_cerrarDiario).data('id');   

        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Se procedera a cerrar este diario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, hazlo!'
        }).then((result) => {
            if (result.isConfirmed) {

                // PETICION AL SERVIDOR PARA CERRAR DIARIO
                axios.post("/C5i/CerrarDiario", { id: idDiario })
                    .then(res => {
                        const { Status, Mensaje } = res.data;                       

                        if (Status == '200') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `[ ${Mensaje} ]`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setTimeout(() => {
                                document.location.href = "/C5i";
                            }, 1550);
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `[ ${Mensaje} ]`
                            })
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
                // FIN DE PETICION

            }
        })
        // FIN DE THEN DE SWAL
       
    });

    //const btn_cancelar = $('#EliminarNota');

    //btn_cancelar.click( function(e) {
    //    e.preventDefault();

    //    const idNota = $('#EliminarNota').data('id');
    //    console.log(idNota);
    //});


    $(document).on('click', '#EliminarNota', function borrar(e) {
        const _id = $(this).attr('data-id');

        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Se procedera a eliminar esta nota!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, hazlo!'
        }).then((result) => {
            if (result.isConfirmed) {

                console.log(_id);
                // PETICION AL SERVIDOR PARA CERRAR DIARIO
                axios.post("/C5i/EliminarNota", { id: _id })
                    .then(res => {
                        const { Status, Mensaje } = res.data;

                        if (Status == '200') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `[ ${Mensaje} ]`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setTimeout(() => {
                                document.location.reload();
                            }, 1550);
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `[ ${Mensaje} ]`
                            })
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
                // FIN DE PETICION

            }
        })
        // FIN DE THEN DE SWAL





    });

});