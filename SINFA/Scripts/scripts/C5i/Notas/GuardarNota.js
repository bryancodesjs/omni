

$(document).ready( () => {
    let _idProvincia;
    const btn_guardar = $('#_guardarNota');

    btn_guardar.click((e) => {
        e.preventDefault();        

        const obj = {
            id_institucion: $('#categoriasSelect').val(),
            asunto: $('#Asunto').val(),
            fecha: Fecha = $('#Fecha').val(),
            hora: Hora = $('#Hora').val(),
            id_provincia: $('#selectorProvincia').val(),
            id_municipio: $('#selectorMunicipio').val(),
            id_sector: $('#selectorSector').val(),
            direccion: $('#Direccion').val(),
            detalles: $('#Detalles').val(), 
            id_diario: $('#IdDiario').val()
        }       

        axios.post("/C5i/GuardarNota", obj)
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
                    }, 1550 );
                }
                else
                {
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
                
                $.each(res.data, function (key, value) {
                    const { Id, Nombre } = value;                    

                    $('#selectorProvincia').append(`                        
                        <option value="${Id}">${key + 1} - ${Nombre}</option>
                    `);
                });              

            })
            .catch((error) => {
                console.error(error);
            });

    }

    const btn_provincia = $('#selectorProvincia');

    btn_provincia.change( (e) => {
        const idProvincia = e.target.value;
        _idProvincia = idProvincia;
        
        axios.post("/C5i/CargarMunicipio", { id: idProvincia })
            .then(res => {

                let html = `<option value="0" selected disabled>Seleccione municipio</option>`;
                $.each(res.data, function (key, value) {
                    const { IdMunicipio, Nombre } = value;

                    html += `<option value="${IdMunicipio}">${key + 1} - ${Nombre}</option>`;
                });
                $('#selectorMunicipio').html(html);
            })
            .catch((error) => {
                console.error(error);
            });

    });

    const btn_municipio = $('#selectorMunicipio');

    btn_municipio.change((e) => {
        const idMunicipio = e.target.value;
        //console.log(idMunicipio);

        axios.post("/C5i/CargarSector", { idProvincia: _idProvincia, idMunicipio: idMunicipio })
            .then(res => {

                let html = `<option value="0" selected disabled>Seleccione sector</option>`;
                $.each(res.data, function (key, value) {
                    const { IdSector, Nombre } = value;

                    html += `<option value="${IdSector}">${key+1} - ${Nombre}</option>`;
                });
                $('#selectorSector').html(html);
            })
            .catch((error) => {
                console.error(error);
            });

    });

    Provincia();


});