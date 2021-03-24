$(document).ready(() => {

    const btn_guardarCambios = $('#_guardarCambios');

    btn_guardarCambios.click(() => {

        var date = new Date($('#Fecha').val());

        const obj = {
            id_institucion: $('#selectorInstitucion').val(),
            asunto: $('#Asunto').val(),
            fecha: Fecha = date,
            hora: Hora = $('#Hora').val(),
            id_provincia: $('#selectorProvincia').val(),
            id_municipio: $('#selectorMunicipio').val(),
            id_sector: $('#selectorSector').val(),
            direccion: $('#Direccion').val(),
            detalles: $('#Detalles').val(),
            id_nota: $('#_idNota').val(),
            id_diario: $('#_idDiario').val(),
            eliminado: $('#_eliminado').val()
        }
        
        //console.log(obj);
        axios.post("/C5i/GuardarCambios", { model: obj })
            .then(res => {
                const { Status, Mensaje } = res.data;
                //console.log(res.data);
                if (Status == "200") {
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

    });


    function Provincia() {

        axios.get("/C5i/CargarProvincia")
            .then(res => {               
                const defecto = $('#selectorProvincia').val();
               
                $.map(res.data, function (val, i) {
                    const { Nombre, Id } = val;
                    if (Id != defecto) {                      
                        $('#selectorProvincia').append(`                        
                            <option value="${Id}">${Nombre}</option>
                        `);
                    }                    
                });

            })
            .catch((error) => {
                console.error(error);
            });

    }

    const btn_provincia = $('#selectorProvincia');

    btn_provincia.change((e) => {
        const idProvincia = e.target.value;
        _idProvincia = idProvincia;
        //$('#selectorMunicipio').html
        //GUARDAR REGISTRO ACTUAL DEL MUNICIPIO
        const IdMunicipioActual = $('#selectorMunicipio').val();
        const MunicipioActual = $('#selectorMunicipio').text();

        axios.post("/C5i/CargarMunicipio", { id: idProvincia })
            .then(res => {

                let html = ``;
                $.each(res.data, function (key, value) {
                    const { IdMunicipio, Nombre } = value;

                    html += `<option value="${IdMunicipio}">${key + 1} - ${Nombre}</option>`;
                });
                $('#selectorMunicipio').html(html);
                html = "";
            })
            .catch((error) => {
                console.error(error);
            });

    });





    Provincia();



});