let checkbox = document.getElementById('agregarDetalles');
let detailsBox = document.getElementById('add-details-box');
let notePrev = document.getElementsByClassName('item-c5i');

$('.item-c5i').mouseenter(function () {
    $(this).addClass('shadow');
})

$('.item-c5i').mouseleave(function () {
    $(this).removeClass('shadow');
})