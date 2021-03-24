
$(document).ready(() => {
    let idInstitucion;
    let Institucion;
    let Directiva;
    let idLugar;
    let Lugar;
    let idNacionalidad;
    let Nacionalidad;
    let Datos = [];

    function Ejes() {

        axios.get("/C5i/CargarEjes")
            .then(res => {
                let categorias = "<option value='0' disabled selected>Seleccione</option>";

                $.each(res.data, function (key, value) {
                    const { id_eje, nombre } = value;
                    categorias += `<option value="${id_eje}">${key + 1} - ${nombre}</option>`;
                });
                
                $('#Ejes_Intervencion').append(categorias);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    function Paises() {

        axios.get("/C5i/CargarPaises")
            .then(res => {
                let categorias = "<option value='0' disabled selected>Seleccione</option>";

                $.each(res.data, function (key, value) {
                    const { id, pais } = value;
                    categorias += `<option value="${id}">${key + 1} - ${pais}</option>`;
                });

                $('#paisesIntervencion').append(categorias);

            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                    $('#provinciasIntervenciones').append(`                        
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
    Ejes();
    Paises();
   

    $('#Ejes_Intervencion').change((e) => {
        idInstitucion = e.target.value;

        const valorSeleccionado = $("#Ejes_Intervencion option:selected").text();
        Institucion = valorSeleccionado.substring(4, valorSeleccionado.length);
    });

    $('#directivaIntervenciones').change((e) => {       

        Directiva = $("#directivaIntervenciones option:selected").text();        
    });

    $('#provinciasIntervenciones').change((e) => {
        idLugar = e.target.value;

        const valorSeleccionado = $("#provinciasIntervenciones option:selected").text();
        Lugar = valorSeleccionado.substring(4, valorSeleccionado.length);
    });

    $('#paisesIntervencion').change((e) => {
        idNacionalidad = e.target.value;

        const valorSeleccionado = $("#paisesIntervencion option:selected").text();
        Nacionalidad = valorSeleccionado.substring(4, valorSeleccionado.length);
    });

    $('#agregarbtnIntervenciones').click((e) => {

        const obj = {
            id_institucion: idInstitucion,
            id_diario: $('#IdDiario').val(),
            institucion: Institucion,
            directiva: Directiva,
            id_provincia: idLugar,
            provincia: Lugar,
            id_nacionalidad: idNacionalidad,
            nacionalidad: Nacionalidad,
            retorno_voluntario: $('#retornoVoluntario').val(),
            hombres: $('#hombresIntervenciones').val(),
            mujeres: $('#mujeresIntervenciones').val(),
            ninos: $('#ninosIntervenciones').val(),
            total: $('#totalIntervenciones').val()
        };

        Datos.push(obj);

        let fila = '';
        $('#tablaIntervenciones').html("");
        $.each(Datos, function (key, value) {
            const { institucion, directiva, provincia, nacionalidad, retorno_voluntario, hombres, mujeres, ninos, total } = value;

            fila += `
             <tr>
                <th scope="row">${institucion}</th>
                <td>${directiva}</td>
                <td>${provincia}</td>
                <td>${nacionalidad}</td>
                <td>${retorno_voluntario}</td>
                <td>${hombres}</td>
                <td>${mujeres}</td>
                <td>${ninos}</td>
                <td>${total}</td>
             </tr>`;

        });

        $('#tablaIntervenciones').append(fila);

        LimpiarCampos();

    });

    $('#_guardarNotaIntervenciones').click((e) => {
        e.preventDefault();

        $.ajax({
            url: '/Directivas/IntervencionesMigratorias',
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
                    }, 1600)
                }
            },
            error: (err) => {
                console.log(err);
            }
        });


    });

    const LimpiarCampos = () => {        
        $('#retornoVoluntario').val('');
        $('#hombresIntervenciones').val('');
        $('#mujeresIntervenciones').val('');
        $('#ninosIntervenciones').val('');
        $('#totalIntervenciones').val('');        
        $('#Ejes_Intervencion').prop('selectedIndex', 0);
        $('#directivaIntervenciones').prop('selectedIndex', 0);
        $('#provinciasIntervenciones').prop('selectedIndex', 0);
        $('#paisesIntervencion').prop('selectedIndex', 0);
    }


})