$(document).ready(() => {

    let provincia = [];
    let Datos = [];
    let idProvincia;
    let _provincia;

    function Provincia() {

        axios.get("/C5i/CargarProvincia")
            .then(res => {

                $.each(res.data, function (key, value) {
                    const { Id, Nombre } = value;
                    const obj = {
                        value: Id,
                        numero: key,
                        nombre: Nombre
                    };
                    provincia.push(obj);
                    $('#provinciaInterdicciones').append(`                        
                        <option value="${Id}">${key + 1} - ${Nombre}</option>
                    `);
                });
                // console.log(provincia);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    Provincia();

    $('#agregarbtnInterdiccionesMigratorias').click((e) => {
        e.preventDefault();

        const obj = {
            id_diario: $('#IdDiario').val(),
            id_provincia: idProvincia,
            provincia: _provincia,
            erd: $('#ERD').val(),
            ftci: $('#FTCI').val(),
            cesfront: $('#CESFRONT').val()
        };

        Datos.push(obj);

        //console.log(Datos);

        let fila = '';
        $('#tablaInterdiccionesMigratorias').html("");
        $.each(Datos, function (key, value) {
            const { provincia, erd, ftci, cesfront } = value;

            fila += `
             <tr>
                <th scope="row">${provincia}</th>
                <td>${erd}</td>
                <td>${ftci}</td>
                <td>${cesfront}</td>               
             </tr>`;

        });

        $('#tablaInterdiccionesMigratorias').append(fila);

        $('#provinciaInterdicciones').html("");
        let selector = "<option value='0' selected disabled>Seleccione provincia</option>";

        provincia = provincia.filter(function (item) {
            return item.nombre != obj.provincia;
        });

        $.each(provincia, function (key, value2) {
            const { nombre, value, numero } = value2;

            selector += `<option value="${value}">${key + 1} - ${nombre}</option>`;
        });

        $('#provinciaInterdicciones').append(selector);  

        LimpiarCampos();
    });

    $('#provinciaInterdicciones').change((e) => {
        idProvincia = e.target.value;

        const valorSeleccionado = $("#provinciaInterdicciones option:selected").text();
        _provincia = valorSeleccionado.substring(4, valorSeleccionado.length);
    });


    $('#_guardarNotaInterdiccionesMigratorias').click((e) => {
        e.preventDefault();

        //console.log(Datos);

        $.ajax({
            url: '/Directivas/InterdiccionesMigratorias',
            method: 'POST',
            data: { model: Datos },
            success: (res) => {
                const { Status } = res;
                if (Status == 200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: '[OK]',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        document.location.reload();
                    }, 1600);
                }
                console.log(res);
            },
            error: (err) => {
                console.error(err);
            }
        });
    });

    const LimpiarCampos = () => {
        $('#ERD').val('');
        $('#FTCI').val('');
        $('#CESFRONT').val('');
        $('#provinciaInterdicciones').prop('selectedIndex', 0);
    }

});