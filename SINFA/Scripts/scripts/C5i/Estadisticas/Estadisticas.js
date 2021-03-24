

$(document).ready(() => {
    $('.div_seguimientoDiario').css("display", "none");
    $('.notaVieja').css("display", "none");
    $('._categorias').css("display", "none"); 
    $('._subCategoria').css("display", "none");

    let datos = [];
    let provincia = [];
    let objCategirias = [];
    let objSubCategirias = [];
    let _idProvincia;
    let _provincia;
    let _visitasRealizadas;
    let _equipos;
    let _visitasAcomuladas;
    let _fallecidos;
    let _traslados;
   

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
                    $('#selectorProvincia').append(`                        
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

    const btn_provincia = $('#selectorProvincia2');

    btn_provincia.change((e) => {

        const idProvincia = e.target.value;
        
        const valorSeleccionado = $("#selectorProvincia2 option:selected").text()

        const res = valorSeleccionado.substring(4, valorSeleccionado.length);

        _provincia = res;
        _idProvincia = idProvincia;        
    });

    const btn_agregar = $('#Agregar');

    btn_agregar.click((e) => {
        e.preventDefault();

        const IdDiario = $('#IdDiario').val();

        const obj = {
            id_diario: IdDiario,
            id_provincia: _idProvincia,
            Provincia: _provincia,
            visitas_realizadas: $('#visitasRealizadas').val(),
            equipos: $('#Equipos').val(),
            visitas_acomuladas: $('#visitasAcumuladas').val(),
            fallecidos: $('#fallecidos').val(),
            traslados: $('#traslados').val()
        };
       
        datos.push(obj);        

        let fila = '';
        $('#tabla').html("");
        $.each(datos, function (key, value) {
            const { IdProvincia, Provincia, visitas_realizadas, visitas_acomuladas, traslados, equipos, fallecidos } = value;
            
            fila += `
             <tr>
                <th scope="row">${Provincia}</th>
                <td>${visitas_realizadas}</td>
                <td>${equipos}</td>
                <td>${visitas_acomuladas}</td>
                <td>${fallecidos}</td>
                <td>${traslados}</td>
             </tr>`;

        });
       
        $('#tabla').append(fila);
       
        $('#selectorProvincia').html("");
        let selector = "<option value='0' selected disabled>Seleccione provincia</option>";

        provincia = provincia.filter(function (item) {
            return item.nombre != obj.Provincia;
        });
       
        $.each(provincia, function (key, value2) {
            const { nombre, value, numero } = value2;
            
            selector += `<option value="${value}">${key+1} - ${nombre}</option>`;
        });

        $('#selectorProvincia').append(selector);        
    });
    

    $('#Eje').change((e) => {
        let categorias = "<option value='0' disabled selected>Seleccione</option>";
        $('#categoriasSelect').html("");
        const id = e.target.value;

        switch (id) {
            case "1":
                objCategirias.push(
                    {
                        value: '1',
                        nombre: 'OPERACIONES ERD'
                    },
                    {
                        value: '2',
                        nombre: 'OPERACIONES ARD'
                    },
                    {
                        value: '3',
                        nombre: 'OPERACIONES FARD'
                    },                    
                    {
                        value: '4',
                        nombre: 'OPERACIONES, COMANDO CONJUNTO METROPOLITANO'
                    },
                    {
                        value: '5',
                        nombre: 'OPERACIONES, COMANDO CONJUNTO NORTE'
                    },
                    {
                        value: '6',
                        nombre: 'OPERACIONES, COMANDO CONJUNTO SUR'
                    },
                    {
                        value: '7',
                        nombre: 'OPERACIONES, COMANDO CONJUNTO ESTE'
                    }
                );
                break;
            case "2":               
                objCategirias.push(
                    {
                        value: '1',
                        nombre: 'OPERACIONES CESFRONT'
                    },
                    {
                        value: '2',
                        nombre: 'OPERACIONES CESEP'
                    },
                    {
                        value: '3',
                        nombre: 'OPERACIONES CESAC'
                    },
                    {
                        value: '4',
                        nombre: 'OPERACIONES DGM'
                    },
                    {
                        value: '5',
                        nombre: 'OPERACIONES DGA'
                    },
                    {
                        value: '6',
                        nombre: 'OPERACIONES DNI'
                    },
                    {
                        value: '7',
                        nombre: 'OPERACIONES DNCD'
                    },
                    {
                        value: '8',
                        nombre: 'OPERACIONES CESMET'
                    },
                    {
                        value: '9',
                        nombre: 'OPERACIONES CECCOM'
                    },
                    {
                        value: '10',
                        nombre: 'OPERACIONES SENPA'
                    }
                );                
                break;
            case "3":
                objCategirias.push(
                    {
                        value: '1',
                        nombre: 'OPERACIONES P.N.'
                    },
                    {
                        value: '2',
                        nombre: 'OPERACIONES COMIPOL'
                    },
                    {
                        value: '3',
                        nombre: 'OPERACIONES DIGESETT'
                    },
                    {
                        value: '4',
                        nombre: 'OPERACIONES CESTUR'
                    },
                    {
                        value: '5',
                        nombre: 'OPERACIONES CIUTRAN'
                    });               
                break;
            case "4":
                objCategirias.push(
                    {
                        value: '1',
                        nombre: 'OPERACIONES SISTEMA NACIONAL DE EMERGENCIA 9-1-1'
                    },
                    {
                        value: '2',
                        nombre: 'OPERACIONES COE'
                    },
                    {
                        value: '3',
                        nombre: 'OPERACIONES DEFENSA CIVIL'
                    },
                    {
                        value: '4',
                        nombre: 'OPERACIONES ONAMET'
                    },
                    {
                        value: '5',
                        nombre: 'OPERACIONES COPRE'
                    });
                break;
            case "5":
                objCategirias.push(
                    {
                        value: '1',
                        nombre: 'APOYO PARA CONTRARRESTAR LA PROPAGACIÓN DEL COVID-19'
                    },
                    {
                        value: '2',
                        nombre: 'FUERZA DE TAREA FTC-I CERCO FRONTERIZO'
                    },
                    {
                        value: '3',
                        nombre: 'APOYO A LA DIRECCIÓN GENERAL DE IMPUESTOS INTERNOS (DGII)'
                    });
                break;
            default:
        }

        $.each(objCategirias, function (i, value) {
            categorias += `<option value="${value.value}">${value.nombre}</option>`;
        });
        $('#categoriasSelect').append(categorias);
        $('._categorias').css("display", "block");

        objCategirias = [];        
    });


    $('#categoriasSelect').change((e) => {
        let categorias = "<option value='0' disabled selected>Seleccione</option>";
        const id = e.target.value;
        
        switch (id) {
            case "1":
                objSubCategirias.push(
                    {
                        value: '1',
                        nombre: 'SITUACION DETALLADA'
                    },
                    {
                        value: '2',
                        nombre: 'CENTRO HOSPITALARIO PARA COVID19'
                    },
                    {
                        value: '3',
                        nombre: 'PRUEBAS RAPIDAS REALIZADAS'
                    },
                    {
                        value: '4',
                        nombre: 'PRUEBAS REALIZADAS EN AEROPUERTOS'
                    },
                    {
                        value: '5',
                        nombre: 'SEGUIMIENTO CASOS COVID19 POSITIVOS'
                    },
                    {
                        value: '6',
                        nombre: 'OPERACIONES DEL C5i'
                    }
                );

                $.each(objSubCategirias, function (i, value) {
                    categorias += `<option value="${value.value}">${value.nombre}</option>`;
                });
                $('#subCategoriasSelect').append(categorias);
                $('._categorias').css("display", "block");

                objSubCategirias = [];      

                $('._subCategoria').css("display","block");
            default:
        }


    });


    $('#subCategoriasSelect').change((e) => {
        const id = e.target.value;
        
        switch (id) {
            case "1":
                $('.notaVieja').css("display", "block");
                break;
            case "5":
                $('.div_seguimientoDiario').css("display", "block");
                break;
            default:
        }



    });

    const btn_guardar = $('#_guardarNotaSeguimiento');

    btn_guardar.click((e) => {
        e.preventDefault();

       

        //console.log(IdDiario);
        

        axios.post("/Directivas/SeguimientoCasosPovisitivos", datos )
            .then(res => {
                const { Status, Mensaje } = res.data;
                //console.log(res.data);
               
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