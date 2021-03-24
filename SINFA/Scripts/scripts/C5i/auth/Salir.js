const btn_salir = $('#Salir');

btn_salir.click((e) => {
    e.preventDefault();

    Swal.fire({
        title: '¿Estas seguro?',
        text: "¡Se procedera a cerrar la sesion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, hazlo!'
    }).then((result) => {
        if (result.isConfirmed) {

            // PETICION AL SERVIDOR PARA CERRAR DIARIO
            axios.post("/Login/Salir")
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
                            document.location.href = "/Login";
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
    });
    // FIN DE THEN DE SWAL



});