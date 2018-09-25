$(document).ready(function(){

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function init() {

        // Объявляем набор опорных точек и массив индексов транзитных точек.
        var referencePoints = frame.list_of_lics[0],
            viaIndexes = [2];

        // Создаем мультимаршрут и настраиваем его внешний вид с помощью опций.
        var multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: referencePoints,
            // params: {viaIndexes: viaIndexes},
        }, {
            boundsAutoApply: true,
            // Внешний вид путевых точек.
            wayPointStartIconColor: "#333",
            wayPointStartIconFillColor: "#B3B3B3",
            // Задаем собственную картинку для последней путевой точки.
            // Внешний вид транзитных точек.
            viaPointIconRadius: 7,
            viaPointIconFillColor: "#000088",
            viaPointActiveIconFillColor: "#E63E92",
            // Транзитные точки можно перетаскивать, при этом
            // маршрут будет перестраиваться.
            viaPointDraggable: true,
            // Позволяет скрыть иконки транзитных точек маршрута.
            // viaPointVisible:false,

            // Внешний вид точечных маркеров под путевыми точками.
            pinIconFillColor: "#000088",
            pinActiveIconFillColor: "#B3B3B3",
            // Позволяет скрыть точечные маркеры путевых точек.
            // pinVisible:false,

            // Внешний вид линии маршрута.
            routeStrokeWidth: 2,
            routeStrokeColor: "#000088",
            routeActiveStrokeWidth: 6,
            routeActiveStrokeColor: "#E63E92",

            // Внешний вид линии пешеходного маршрута.
            routeActivePedestrianSegmentStrokeStyle: "solid",
            routeActivePedestrianSegmentStrokeColor: "#00CDCD",

            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        });

        // Настраиваем внешний вид второй точки через прямой доступ к ней.


        // Создаем кнопки.


        // Создаем карту с добавленной на нее кнопкой.
        var myMap = new ymaps.Map('map', {
            center: [55.739625, 37.54120],
            zoom: 0
        });

        // Добавляем мультимаршрут на карту.
        myMap.geoObjects.add(multiRoute);
    }
    function init2() {


        var myMap = new ymaps.Map('map', {
            center: [55.739625, 37.54120],
            zoom: 0
        });

        for(var i=0; i<frame.list_of_lics.length; i++) {

            ymaps.route(frame.list_of_lics[i], {
                mapStateAutoApply: true
            }).then(function (route) {
                route.getPaths().options.set({
                    // В балуне выводим только информацию о времени движения с учетом пробок.
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                    // Можно выставить настройки графики маршруту.
                    strokeColor: getRandomColor()
                });
                // добавляем маршрут на карту
                myMap.geoObjects.add(route);
            });
        }
    }

    class Licence {
        constructor(id, route, type, expire, num) {
            this.id = id;
            this.route = route;
            this.type = type;
            this.expire = expire;
            this.num = num;
        }
    }

    var is_open = false;
    var draw_tables = function(id, route, type, exp, num){
        return '<tr><td>' + id + '</td><td>' + route + '</td><td>' + type + '</td><td>' + exp + '</td><td>' + num + '</td></tr>'
    }

    get_licences().then(data => {
        for(var i=0; i<data.length; i++){
            $('#lic_body').append(draw_tables(
                                            data[i].track,
                                            data[i].route.split(' - '),
                                            data[i].number,
                                            data[i].start_date,
                                            data[i].end_date,
                )
            )
        }
        console.log(data);
        });

    function main_frame(){

        this.list_of_lics = [];
        var content = document.getElementsByClassName('inside')[0].getElementsByTagName('*');
        var list_of_content = [];

        for(var i = 0; i < content.length; i++){
            list_of_content.push(content[i].id);
        }
        this.active_tab = content[0].id;
        this.len = content.length;
        this.list_of_content = content;
    }

    let frame = new main_frame();
    document.getElementById(frame.active_tab).style.color = 'black';


    $('#lilic').css('color', 'black');
    var chosen = 'lic';
    $(document).mousemove(function (e) {
        var x = e.pageX;
        var y = e.pageY;

        $('ul div').hover(function () {
                $(this).css('color', 'grey');
            },
            function () {
                $(this).css('color', 'black');
            })

        $('.add').hover(function () {
                $(this).css('opacity', 0.5);
            },
            function () {
                $(this).css('opacity', 0.3);
            })


        //Creating lics manually

        $('#confirm').unbind().click(function ()
        {
            var lic = new Licence(
            $('#input_id')[0].value,
            $('#input_route')[0].value,
            $('#input_type')[0].value,
            $('#input_exp')[0].value,
            $('#input_num')[0].value);
            console.log(lic);

            // var resp = add_license(lic.id, lic.route[0], lic.num, lic.expire, lic.type);
            console.log(lic);

            add_license(lic.id, lic.route, lic.type, lic.expire, lic.num);

            $('#lic_body').append(draw_tables(lic.id, lic.route.split(' - '), lic.type, lic.expire, lic.num));

            $('#warn').remove();
            $('.context').hide();
            $('.wrapper').css('opacity', '1');
            console.log($('#input_route'));
            $('#lic_body').append();
            frame.list_of_lics.push(lic.route);

            delete lic;
            $('#input_id')[0].value = '';
            $('#input_route')[0].value = '';
            $('#input_type')[0].value = '';
            $('#input_exp')[0].value = '';
            $('#input_num')[0].value = '';
        });



        $(document).unbind().mouseup(function(e)
        {
            var container = $(".context");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                container.hide();
                $('.wrapper').animate({opacity: 1}, 100);
            }
        });




        if($('#lic_body').children().length === 0) {
            $('.main-table').css('display', 'block');
            $('.main-table').css('text-align', 'center');
            $('.main-table').append('<p id="warn">There are not any licenses. Add one?<p>');
        }


        $('table').unbind().click(function () {
            $('.main-table').hide();
            $('#map').show();
            $("#limap").css('color', 'black');
            $("#lilic").css('color', 'white');
        })

        $('.shapka').unbind().mousedown(function () {
                $('.context').hide(10);
            $('table').append('<tr style="color: orange; opacity: 0.8"><td>ME345A199</td><td>Reutov - Chelyabinsk</td><td>Rise</td><td>03.04.2019</td><td>0</td></tr>');
            return false;
        })




        $('.add').unbind().click(function () {
            $('.wrapper').animate({opacity: 0.05}, 100);
            $('.context').show(500);
        })

        $('.container li').hover(function(){
            $(this).css('color', 'black');
        }, function(){
            if(this.id !== frame.active_tab) {
                $(this).css('color', 'white');
            }
        });


        $('#lilic').click(function() {
            frame.active_tab = 'lilic';
            $('div.main-table').css('display', 'flex');
            $('#map').css('display', 'none');
            $('div.order').css('display', 'none');
            $('#lilic').css('color', 'black');
            $('#limap').css('color', 'white');
            $('#liord').css('color', 'white');
        });

        $('#limap').unbind().click(function() {
            frame.active_tab = 'limap';
            $('div.main-table').css('display', 'none');
            $('#map').css('display', 'flex');
            $('div.order').css('display', 'none');
            $('#lilic').css('color', 'white');
            $('#limap').css('color', 'black');
            $('#liord').css('color', 'white');
            init2();
            ymaps.ready();


        });

        $('#liord').click(function() {
            frame.active_tab = 'liord';
            $('div.main-table').css('display', 'none');
            $('#map').css('display', 'none');
            $('div.order').css('display', 'flex');
            $('#lilic').css('color', 'white');
            $('#limap').css('color', 'white');
            $('#liord').css('color', 'black');
        });
    })

    // // #api
    // console.log('getting licenses');
    // get_licences().then(data => {
    //     // тут делаешь что хочешь с датой
    //     console.log(data);
    // });
    // console.log('adding license');
    // add_license('a111bb', 'Moscow-Tver-SPb', '333', '2018-09-01', '2018-09-11');

});
