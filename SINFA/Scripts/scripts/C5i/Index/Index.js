$(document).ready(() => {

    const btn_nuevoDiario = $('#nuevoDiario');

    btn_nuevoDiario.click((e) => {
        e.preventDefault();

        axios.post("/C5i/AbrirDiario")
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
                else if (Status == '400') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `[ ${Mensaje} ]`
                    })
                }
                else if (Status == '404') {
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

    });

    

});