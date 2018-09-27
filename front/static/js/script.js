$(document).ready(function () {

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    function init2() {
        ymaps.ready();
        var myMap = new ymaps.Map('map', {
            center: [55.739625, 37.54120],
            zoom: 3
        });

        var myGeoObjects = new ymaps.GeoObjectCollection();

        get_licences().then(data => {
            var my_routes = new ymaps.GeoObjectCollection;
            var everything = new ymaps.GeoObjectCollection;


            console.log(data.length);

            for (let i = 0; i < data.length; i++) {
                let arr = data[i].route.split(' - ');
                let len = arr.length;
                ymaps.route([arr[0], arr[len - 1]], {
                    // mapStateAutoApply: true
                }).then(function (route) {
                    route.events.add('click', function (e) {
                        // console.log(geoObject.Baloon(e.get('currentTarget')));

                    })

                    var points = route.getWayPoints(),
                    lastPoint = points.getLength() - 1;
                    points.options.set('preset', 'islands#greenStretchyIcon');
                    // Задаем контент меток в начальной и конечной точках.
                    console.log(points.get(0));
                    points.get(0).properties.set('iconContent', route.requestPoints[0]);
                    points.get(lastPoint).properties.set('iconContent', route.requestPoints[route.requestPoints.length - 1]);
                    my_routes.add(route);
                    route.getPaths().options.set({
                        strokeColor: getRandomColor(),
                    });


                    console.log(ymaps.geoObject.Baloon(route.getPaths()));
                    // console.log('len of route', route.getPaths().getLength())
                    // for (let i2 = 0; i2 < route.getPaths().getLength(); i++) {
                    //     way = route.getPaths().get(i2);
                    //     console.log(way);
                    //     segments = way.getSegments();
                    //     for (let j = 0; j < segments.length; j++) {
                    //         let street = segments[j].getStreet();
                    //         }
                    // }
                    //
                    // console.log('here');
                    //
                    // for(var j=0; j<route.getPaths().getLength(); j++){
                    //     var w = route.getPaths().get(i);
                    //     everything.add(w);
                    // }

                });
            }

            // myMap.geoObjects.add(myGeoObjects);
            // myMap.setBounds(myGeoObjects.getBounds());

            console.log(everything);
            myMap.geoObjects.add(my_routes);
            // myMap.setBounds();
            // myMap.setBounds(my_routes.getBounds());
        })
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
    var draw_tables = function (id, route, type, exp, num) {
        return '<tr><td>' + id + '</td><td>' + route + '</td><td>' + type + '</td><td>' + exp + '</td><td>' + num + '</td></tr>'
    }

    get_licences().then(data => {
        for (var i = 0; i < data.length; i++) {
            $('#lic_body').append(draw_tables(
                data[i].track,
                data[i].route.split(' - '),
                data[i].number,
                data[i].start_date,
                data[i].end_date,
                )
            )
        }
    });

    function main_frame() {

        this.list_of_lics = [];
        var content = document.getElementsByClassName('inside')[0].getElementsByTagName('*');
        var list_of_content = [];

        for (var i = 0; i < content.length; i++) {
            list_of_content.push(content[i].id);
        }

        this.active_tab = content[0].id;
        this.len = content.length;
        this.list_of_content = content;
    }

    let frame = new main_frame();
    document.getElementById(frame.active_tab).style.color = 'black';

    $('.add').hover(function () {
        $('.add').css('backgroung-color', 'grey');

    }, function () {
        $('.add').css('backgroung-color', 'black');
    })


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
            alert();

                $('.add').css('background-color', 'white');
            },
            function () {
                   $('.add').css('background-color', 'black');
            })


        //Creating lics manually

        $('#confirm').unbind().click(function () {
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


        $(document).unbind().mouseup(function (e) {
            var container = $(".context");
            var container2 = $('.hidden_table');
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();
                $('.wrapper').animate({opacity: 1}, 100);

            }if (!container2.is(e.target) && container2.has(e.target).length === 0) {
                container2.hide();
                $('.wrapper').animate({opacity: 1}, 100);
            }
        });

        $('.suggest').click(function () {
            $('.wrapper').animate({opacity: 0.05}, 100);
            $('.hidden_table').show(500);
        })


        if ($('#lic_body').children().length === 0) {
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
            console.log(myMap.geoObjects);
            return false;
        })


        $('.add').unbind().click(function () {
            $('.wrapper').animate({opacity: 0.05}, 100);
            $('.context').show(500);
        })

        $('.container li').hover(function () {
            $(this).css('color', 'black');
        }, function () {
            if (this.id !== frame.active_tab) {
                $(this).css('color', 'white');
            }
        });


        $('#lilic').click(function () {
            frame.active_tab = 'lilic';
            $('div.main-table').css('display', 'flex');
            $('#map').css('display', 'none');
            $('div.order').css('display', 'none');
            $('#lilic').css('color', 'black');
            $('#limap').css('color', 'white');
            $('#liord').css('color', 'white');
        });

        $('#limap').unbind().click(function () {
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

        $('#liord').click(function () {
            frame.active_tab = 'liord';
            $('div.main-table').css('display', 'none');
            $('#map').css('display', 'none');
            $('div.order').css('display', 'flex');
            $('#lilic').css('color', 'white');
            $('#limap').css('color', 'white');
            $('#liord').css('color', 'black');
        });
    })

});
