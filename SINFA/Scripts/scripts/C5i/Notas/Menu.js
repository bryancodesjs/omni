

$(document).ready(() => {
    $('.div_seguimientoDiario').css("display", "none");
    $('.notaVieja').css("display", "none");
    $('._categorias').css("display", "none");
    $('._subCategoria').css("display", "none");

    function Ejes() {

        axios.get("/C5i/CargarEjes")
            .then(res => {
                let categorias = "<option value='0' disabled selected>Seleccione</option>";

                $.each(res.data, function (key, value) {
                    const { id_eje, nombre } = value;
                    categorias += `<option value="${id_eje}">${key + 1} - ${nombre}</option>`;
                });
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
       
    });

    $('#categoriasSelect').change((e) => {
        const idCategoria = e.target.value;
        //console.log(idCategoria);
        
        $('.notaVieja').css("display", "block")
    })



});