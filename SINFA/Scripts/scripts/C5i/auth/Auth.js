
$(document).ready(() => {

    const btn_acceso = $('.login-btn');

    btn_acceso.click((e) => {
        e.preventDefault();

        const obj = {
            Usuario: $('#Usuario').val(),
            Clave: $('#Clave').val()
        }

        axios.post("/Login/Acceder", obj)
            .then(res => {
                const { Status, Mensaje } = res.data;

                if (Status == '200') {                    
                    document.location.href = "/C5i"
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

    });

});
