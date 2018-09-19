$(document).ready(function(){
    $('#lilic').css('color', 'black');
    var chosen = 'lic';


    $('.container li').hover(function(){
        $(this).css('color', 'black');
    }, function(){
        $(this).css('color', 'white')
    });

    $('#lilic').click(function() {
        $('div.main-table').css('display', 'flex');
        $('#map').css('display', 'none');
        $('div.order').css('display', 'none');
        $('#lilic').css('color', 'black');
        $('#limap').css('color', 'white');
        $('#liord').css('color', 'white');
    });

    $('#limap').click(function() {
        $('div.main-table').css('display', 'none');
        $('#map').css('display', 'flex');
        $('div.order').css('display', 'none');
        $('#lilic').css('color', 'white');
        $('#limap').css('color', 'black');
        $('#liord').css('color', 'white');
    });

    $('#liord').click(function() {
        $('div.main-table').css('display', 'none');
        $('#map').css('display', 'none');
        $('div.order').css('display', 'flex');
        $('#lilic').css('color', 'white');
        $('#limap').css('color', 'white');
        $('#liord').css('color', 'black');
    });

});
