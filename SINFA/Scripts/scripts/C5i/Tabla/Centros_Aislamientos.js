

$(document).ready(() => {

    let _provinciaArray = [];
    let Datos = [];
    let _idprovincia;
    let _provincia;
    let _personal;

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
                    _provinciaArray.push(obj);
                    $('#provinciaCentrodeAislamiento').append(`                        
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

    $('#agregarCentroAislamiento').click((e) => {
        e.preventDefault();

        const obj = {
            id_provincia: _idprovincia,
            id_diario: $('#IdDiario').val(),
            provincia: _provincia,
            centro: $('#nombreCentroAislamiento').val(),
            personal: _personal,
            habilitadas: $('#CamasHabilitadasCentroAislamiento').val(),
            ocupadas: $('#CamasOcupadasCentroAislamiento').val(),
            disponibles: $('#CamasDisponiblesCentroAislamiento').val()
        };
        
        const { provincia, centro, personal, habilitadas, ocupadas, disponibles } = obj;        

        if (provincia == '' || centro == '' || personal == '' || habilitadas == '' || ocupadas == '' || disponibles == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe completar todos los campos!'
            });
            return;
        }

        Datos.push(obj);

        let fila = '';
        $('#tablaCentrosAislamiento').html("");
        $.each(Datos, function (key, value) {
            const { provincia, centro, personal, habilitadas, ocupadas, disponibles } = value;

            fila += `
             <tr>
                <th scope="row">${provincia}</th>
                <td>${centro}</td>
                <td>${personal}</td>
                <td>${habilitadas}</td>
                <td>${ocupadas}</td>
                <td>${disponibles}</td>
             </tr>`;

        });

        $('#tablaCentrosAislamiento').append(fila);
        
        _provinciaArray = _provinciaArray.filter(function (item) {
            return item.nombre != obj.provincia;
        });
        
        $('#provinciaCentrodeAislamiento').html("");
        let selector = "<option value='0' selected disabled>Seleccione provincia</option>";

        $.each(_provinciaArray, function (key, value2) {
            const { nombre, value, numero } = value2;

            selector += `<option value="${value}">${key + 1} - ${nombre}</option>`;
        });

        $('#provinciaCentrodeAislamiento').append(selector);

        _provincia = '';

        LimpiarCampos();

    });

    $('#personalCentrosAislamientos').change((e) => {

        _personal = $("#personalCentrosAislamientos option:selected").text();
    });

    $('#provinciaCentrodeAislamiento').change((e) => {
        _idprovincia = e.target.value;

        const valorSeleccionado = $("#provinciaCentrodeAislamiento option:selected").text();
        _provincia = valorSeleccionado.substring(4, valorSeleccionado.length);
    });

    $('#_guardarCentrosDeAislamientos').click((e) => {
        e.preventDefault();

        $.ajax({
            url: '/Directivas/CentrosAislamientoCovid19',
            method: 'POST',
            data: { model: Datos },
            success: (res) => {
                const { Status } = res;
                console.log(res);
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
                    }, 1600);
                }
            },
            error: (error) => {
                console.log(error);
            }
        });

    });

    const LimpiarCampos = () => {      
        $('#nombreCentroAislamiento').val('');        
        $('#CamasHabilitadasCentroAislamiento').val('');
        $('#CamasOcupadasCentroAislamiento').val('');
        $('#CamasDisponiblesCentroAislamiento').val('');
    }

});