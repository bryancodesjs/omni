$(document).ready(() => {
    let provincia = [];
    let Datos = [];
    let idInstitucion;
    let _Institucion;

    function Institucion() {

        axios.get("/C5i/CargarCategorias2")
            .then(res => {
               
                $.each(res.data, function (key, value) {
                    const { id_categoria, nombre } = value;
                    const obj = {
                        value: id_categoria,
                        numero: key,
                        nombre: nombre
                    };
                    provincia.push(obj);
                    $('#institucionRelacionPersonal').append(`                        
                        <option value="${id_categoria}">${key + 1} - ${nombre}</option>
                    `);
                });
                // console.log(provincia);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    Institucion();

    $('#institucionRelacionPersonal').change((e) => {
        idInstitucion = e.target.value;

        const valorSeleccionado = $("#institucionRelacionPersonal option:selected").text()

        _Institucion = valorSeleccionado.substring(4, valorSeleccionado.length);

    }); 


    $('#btnAgregarRelacionPersonal').click((e) => {
        e.preventDefault();

        const obj = {
            id_institucion: idInstitucion,
            institucion: _Institucion,
            ccm: $('#ccm').val(),
            ccn: $('#ccn').val(),
            ccs: $('#ccs').val(),
            cce: $('#cce').val(),
            vehiculos: $('#vehiculosRelacionPersonal').val(),
            motocicletas: $('#motocicletasRelacionPersonal').val()
        }

        Datos.push(obj);

        let fila = '';
        $('#tablaRelacionPersonal').html("");
        $.each(Datos, function (key, value) {
            const { institucion, ccm, ccn, ccs, cce, vehiculos, motocicletas } = value;

            fila += `
             <tr>
                <th scope="row">${institucion}</th>
                <td>${ccm}</td>
                <td>${ccn}</td>
                <td>${ccs}</td>
                <td>${cce}</td>
                <td>${vehiculos}</td>
                <td>${motocicletas}</td>
             </tr>`;

        });

        $('#tablaRelacionPersonal').append(fila);

        LimpiarCampos();
    });

    const LimpiarCampos = () => {
        $('#ccm').val('');
        $('#ccn').val('');
        $('#ccs').val('');
        $('#cce').val('');
        $('#vehiculosRelacionPersonal').val('');
        $('#motocicletasRelacionPersonal').val('');
        $('#institucionRelacionPersonal').prop('selectedIndex', 0);
    };

});