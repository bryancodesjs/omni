$(document).ready(() => {
    $('.div_seguimientoDiario').css("display", "none");
    $('.div_OPERACIONES_REALIZADAS').css("display", "none");
    $('.div_HOSPITALARIOS_COVID19').css("display", "none"); 
    $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
    $('.div_LLEGADA_VUELOS').css("display", "none");
    $('.DIV_NUEVOSCASOS_HOY').css("display", "none"); 
    $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
    $('.DIV_RELACION_INSTITUCION').css("display", "none"); 
    $('.DIV_Interdicciones_Migratorias').css("display", "none");

    let _idEje;


     function Ejes() {

        axios.get("/C5i/CargarEjes")
            .then(res => {
                let categorias = "<option value='0' disabled selected>Seleccione</option>";

                $.each(res.data, function (key, value) {
                    const { id_eje, nombre } = value;
                    categorias += `<option value="${id_eje}">${key + 1} - ${nombre}</option>`;
                });
                categorias += `<option value="D">Directivas</option>`;
                $('#Eje').append(categorias);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    Ejes();

    const selector_eje = $('#Eje');

    selector_eje.change((e) => {

        const idEje = e.target.value;

        $('#categoriasSelect').html("");

        if (idEje == 'D')
        {
            _idEje = idEje;

            $.ajax({
                url: '/C5i/CargarDirectivas',
                method: 'POST',                
                success: function (res) {
                    let categorias = "<option value='0' disabled selected>Seleccione</option>";
                    $.each(res, function (key, value) {
                        const { id_directiva, nombre } = value;
                        categorias += `<option value="${id_directiva}">${key + 1} - ${nombre}</option>`;
                    });
                    $('#categoriasSelect').append(categorias);
                    $('._categorias').css("display", "block")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
        else
        {
            $.ajax({
                url: '/C5i/CargarCategorias',
                method: 'POST',
                data: { id: idEje },
                success: function (res) {
                    let categorias = "<option value='0' disabled selected>Seleccione</option>";
                    $.each(res, function (key, value) {
                        const { id_categoria, nombre } = value;
                        categorias += `<option value="${id_categoria}">${key + 1} - ${nombre}</option>`;
                    });
                    $('#categoriasSelect').append(categorias);
                    $('._categorias').css("display", "block")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
       

    });

    $('#categoriasSelect').change((e) => {
        const idCategoria = e.target.value;
        //console.log(idCategoria);
        $('#subCategoriasSelect').html("");

        if (_idEje == 'D') {
            $.ajax({
                url: '/C5i/CargarSubDirectivas',
                method: 'POST',
                data: { id: idCategoria },
                success: function (res) {
                    let categorias = "<option value='0' disabled selected>Seleccione</option>";
                    $.each(res, function (key, value) {
                        const { id_subdirectivas, nombre } = value;
                        categorias += `<option value="${id_subdirectivas}">${key + 1} - ${nombre}</option>`;
                    });
                    $('#subCategoriasSelect').append(categorias);
                    $('._categorias').css("display", "block")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
        else {            

            $.ajax({
                url: '/C5i/CargarSubCategorias',
                method: 'POST',
                data: { id: idCategoria },
                success: function (res) {
                    let categorias = "<option value='0' disabled selected>Seleccione</option>";
                    $.each(res, function (key, value) {
                        const { id_subdirectivas, nombre } = value;
                        categorias += `<option value="${id_subdirectivas}">${key + 1} - ${nombre}</option>`;
                    });
                    $('#subCategoriasSelect').append(categorias);
                    $('._categorias').css("display", "block")
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }

    });

    $('#subCategoriasSelect').change((e) => {
        const Seleccion = $("#subCategoriasSelect option:selected").text();
        const Resultado = Seleccion.substring(4, Seleccion.length);
        //console.log(Resultado);

        switch (Resultado) {
           
            case 'CENTROS DE AISLAMIENTO DE LAS FF.AA. CASOS COVID19 A NIVEL NACIONAL':
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "block");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");                
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;

            case 'RESULTADOS OPERACIONES REALIZADAS':
                $('.div_OPERACIONES_REALIZADAS').css("display", "block");
                $('.div_seguimientoDiario').css("display", "none");               
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;

            case 'SEGUIMIENTO DIARIO A CASOS POSITIVOS Y SOSPECHOSOS (COVID-19).':
                $('.div_seguimientoDiario').css("display", "block");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;
            case 'CENTROS HOSPITALARIOS PÚBLICOS Y PRIVADOS DISPONIBLES PARA CASOS COVID-19 A NIVEL NACIONAL, CON SUS RESPECTIVAS CAMAS Y VENTILADORES.':
                $('.div_HOSPITALARIOS_COVID19').css("display", "block");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;
            case 'LLEGADA DE VUELOS Y RESULTADOS DE LAS PRUEBAS RÁPIDAS REALIZADAS POR EL MIDE, EN LOS DIFERENTES AEROPUERTOS INTERNACIONALES A NIVEL NACIONAL. ':
                $('.div_LLEGADA_VUELOS').css("display", "block");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");      
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;
            case 'NUEVOS CASOS AL DÍA DE HOY':           
                $('.DIV_NUEVOSCASOS_HOY').css("display", "block");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;
            case 'RESULTADOS DE LAS DIFERENTES INTERDICCIONES MIGRATORIAS Y RETORNO VOLUNTARIO QUE REALIZAN LAS FUERZAS ARMADAS, EN VIRTUD DE LA DIRECTIVA NO. 26-2018 FUERZA DE TAREA INTERAGENCIAL CERCO FRONTERIZO.':
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "block");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");    
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;
            case 'AI.-RELACIÓN DE PERSONAL Y VEHÍCULOS DE LOS PUNTOS FIJOS, RETENES Y PATRULLAS.':
                $('.DIV_RELACION_INSTITUCION').css("display", "block");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");   
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
                break;
            case 'DIRECTIVA NO. 22-(2020), SOBRE LA EJECUCIÓN DE UN DISPOSITIVO DE SEGURIDAD PARA EL FORTALECIMIENTO DE LOS CONTROLES FRONTERIZOS (TERRESTRES, MARÍTIMOS Y AÉREOS), EN APOYO A LA DIRECCIÓN GENERAL DE MIGRACIÓN (DGM), DESDE LAS 0800 DEL 31/12/20 HASTA LAS 0800 DEL 01/03/2021. ':
                $('.DIV_Interdicciones_Migratorias').css("display", "block");
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none");
                $('.DIV_RELACION_INSTITUCION').css("display", "none");                
                break;

            default:
                $('.DIV_NUEVOSCASOS_HOY').css("display", "none");
                $('.div_HOSPITALARIOS_COVID19').css("display", "none");
                $('.div_seguimientoDiario').css("display", "none");
                $('.div_OPERACIONES_REALIZADAS').css("display", "none");
                $('.div_CENTROSDEAISLAMIENTO_COVID19').css("display", "none");
                $('.div_LLEGADA_VUELOS').css("display", "none");
                $('.DIV_INTERVENCIONES_MIGRATORIA').css("display", "none"); 
                $('.DIV_RELACION_INSTITUCION').css("display", "none");
                $('.DIV_Interdicciones_Migratorias').css("display", "none");
        };

    });


});