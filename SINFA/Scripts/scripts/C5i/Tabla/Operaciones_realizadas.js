$(document).ready(() => {

    let provincia = [];
    let Datos = [];
    let idLugar;
    let _ubicacion;

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
                    $('#Lugar').append(`                        
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

    $('#Lugar').change((e) => {
        idLugar = e.target.value;

        const valorSeleccionado = $("#Lugar option:selected").text()

        _ubicacion = valorSeleccionado.substring(4, valorSeleccionado.length);
       
    });

    $('#btn_agregar_operacionesOperaciones').click((e) => {
        e.preventDefault();

        const obj = {
            id_diario: $('#IdDiario').val(),
            lugar: idLugar,
            ubicacion: _ubicacion,
            unidad: $('#Unidad').val(),
            personas_detenidas: $('#PersonasDetenidas').val(),
            vehiculos_detenidos: $('#VehiculosDetenidos').val(),
            mercancia_retenida: $('#MercanciaRetenida').val()            
        };

        const { ubicacion, unidad, personas_detenidas, vehiculos_detenidos, mercancia_retenida } = obj;

        if (ubicacion == '' || unidad == '' || personas_detenidas == '' || vehiculos_detenidos == '' || mercancia_retenida == '') {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe completar todos los campos!'
            });

        } else
        {
            Datos.push(obj);

            let fila = '';
            $('#tablaOperacionesRealizadas').html("");
            $.each(Datos, function (key, value) {
                const { ubicacion, unidad, personas_detenidas, vehiculos_detenidos, mercancia_retenida } = value;

                fila += `
             <tr>
                <th scope="row">${ubicacion}</th>
                <td>${unidad}</td>
                <td>${personas_detenidas}</td>
                <td>${vehiculos_detenidos}</td>
                <td>${mercancia_retenida}</td>
             </tr>`;

            });

            $('#tablaOperacionesRealizadas').append(fila);

            LimpiarCampos();


            $('#Lugar').html("");
            let selector = "<option value='0' selected disabled>Seleccione provincia</option>";

            provincia = provincia.filter(function (item) {
                return item.nombre != obj.ubicacion;
            });

            $.each(provincia, function (key, value2) {
                const { nombre, value, numero } = value2;

                selector += `<option value="${value}">${key + 1} - ${nombre}</option>`;
            });

            $('#Lugar').append(selector);        
        }

    });


    $('#_guardarOperacionesRealizadas').click((e) => {
        //console.log(Datos);
        $.ajax({
            url: '/Directivas/OperacionesRealizadas',
            method: 'POST',
            data: { model: Datos },
            success: (res) => {
                const { Status } = res;
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
                    },1600)
                }
            },
            error: (err) => {
                console.log(err);
            }
        })

    });

    const LimpiarCampos = () => {
        //$('#Lugar').val('');
        $('#Unidad').val('');
        $('#PersonasDetenidas').val('');
        $('#VehiculosDetenidos').val('');
        $('#MercanciaRetenida').val('');
        $('#Lugar').focus();
    }

   

});