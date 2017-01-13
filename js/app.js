$(function(){

//Zmienne do html

        //slider
    var slider = $(".slider"); //Slider div
    var slideBox = slider.find(".slides"); //Lista z slajdami
    var slideLi = slideBox.find("li"); //Li ze slajdami
    var slidePict = slideLi.find("img"); //Obrazki slajdow

        //buttony
    var allButtons = $("button");
    var prevBut = slider.find("#prevPicture");
    var nextBut = slider.find("#nextPicture");
    var stopBut = slider.find("#stopBut");
    var autoLeftBut = slider.find("#autoLeft");
    var autoRightBut = slider.find("#autoRight");
    var menuBut = $("#menuBut"); //zeby dalo sie poza slajder wyciagnac

        //menu
    var menu = slider.find(".menu");
    var menuLi = menu.find("li");

        //teksty
    var textSlides = slider.find(".textSlides");
    var textLi = textSlides.find("li");
    var textIndex = 1;

//Zmienne od slajdow

    var firstSlide = $(slideLi).first().clone(true);
    var lastSlide = $(slideLi).last().clone(true);
    var firstText = $(textLi).first().clone(true);
    var lastText = $(textLi).last().clone(true);
    var index = 1; //aktualny index obrazka
    var time = 1000; //czas przejscia slajdu
    var slideTime = 3000; //czas co jaki zmienia sie slajd
    var autoLeft; //pusta zmienna pod interwal
    var autoRight; //jw

//Czcionka

    var modFontSize = 10; //Procent od wysokosci slidera
    var modMenuFontSize = 6 // jw

//Kilka funkcji zeby sie jako tako skalowalo

    //Dopasowanie szerokosci li do szerokosci slidera
    function newSize(){
        var actSlideLi = $(".slides li");
        var newWidth = slider.width();
        for (var i = 0; i < actSlideLi.length; i++) {
            $(actSlideLi[i]).width(newWidth);
        }
    }

    //Szerokosc wszystkich slajdow
    function slideBoxSize(){
        var actSlideLi = $(".slides li");
        var liWidth = actSlideLi.width();
        var newWidth = liWidth * actSlideLi.length;
        slideBox.width(newWidth);
    }

    //sprawdza index i ustawia slajd w poziomie
    function slideSet(){
        var actSlideLi = $(".slides li");
        slideBox.css("left", -(index * $(actSlideLi).width()));
    }

    //sprawdza index i ustawia slaj w pionie
    function slideSetVertical(){
        var actSlideLi = $(".slides li");
        slideBox.css("top", -(index * $(actSlideLi).height()));
    }

    //skaluje menu wbudowane w slajder
    function resizeMenu(){
        var newHeight = menu.parent().innerHeight();
        menu.css("height", newHeight);
        for (var i = 0; i < menuLi.length; i++) {
            var newLiHeight = parseFloat(newHeight) / menuLi.length;
            $(menuLi[i]).css("height", newLiHeight).css("line-height", newLiHeight + "px");
        }
    }

    //przesuwa guzik menu o szerokosc menu jezeli jest aktywne
    function checkBut(time){
        if(menu.hasClass('menuOn')){
            var menuWidth = menu.width();
            menuBut.animate({
                left: menuWidth
            }, time);
        }
    }

    //texty slajdow
    function resizeText(){
        var actTextLi = $(".textSlides li");
        var sliderWidth = slider.innerWidth();
        var newWidth = sliderWidth * actTextLi.length;
        textSlides.width(newWidth);
        for (var i = 0; i < actTextLi.length; i++) {
            $(actTextLi[i]).width(sliderWidth);
        }
    }
    //ustawia slajd z tekstem zgodnie z textIndex
    function textSet(){
        textSlides.css("left", -(textIndex * $(slideLi).width()));
    }

    //rozmiar czcionki
    function resizeFonts(){
        var actMenuLi = menu.find("li");
        var actTextLi = textSlides.find("li");
        var actAllButtons = slider.find("button");
        var newFontSize = slider.height() / modFontSize;
        for (var i = 0; i < actMenuLi.length; i++) {
            $(actMenuLi[i]).css("font-size", (newFontSize * (modMenuFontSize * 0.1)));
        }
        for (var i = 0; i < actTextLi.length; i++) {
            $(actTextLi[i]).css("font-size", newFontSize);
        }
        for (var i = 0; i < actAllButtons.length; i++) {
            $(actAllButtons[i]).css("font-size", newFontSize);
        }
    }

    //Ustawienie wysokosci slajera przy ruchu gora dol
    function setSliderHeight() {
        slider.height(slideLi.height());
    }

//Dodanie kopi slajdow i opisow zeby mogl sie krecic w kolko;
    function addClone(){
        $(textLi).first().before(lastText);
        $(slideLi).first().before(lastSlide);
        $(slideLi).last().after(firstSlide);
        $(textLi).last().after(firstText);
    }

//Sterowanie slajderem

    //slajd w prawo
    function slideRight(){
        $(slideBox).stop();
        index++;
        if(index == slideLi.length + 1){
            slideBox.animate({
                left: -(index * $(slideLi).width())
            }, time, function(){
                $(slideBox).css("left", -(slideLi.width()))
            });
            index = 1;
        }
        else{
            slideBox.animate({
                left: -(index * $(slideLi).width())
            }, time);
        }
    };

    //text w prawo
    function slideTextRight(){
        textIndex++;
        $(textSlides).stop()
        if(textIndex == textLi.length + 1){
            textSlides.animate({
                left: -(textIndex * $(textLi).width())
            },time, function(){
                $(textSlides).css("left", -(textLi.width()))
            });
            textIndex = 1;
        }
        else{
            textSlides.animate({
                left: -(textIndex * $(textLi).width())
            }, time);
        }
    };

    //slajd w lewo
    function slideLeft(){
        $(slideBox).stop();
        index--;
        if(index == 0){
            slideBox.animate({
                left: -(index * $(slideLi).width())
            },time, function(){
                $(slideBox).css("left", -(slideLi.width() * slideLi.length))
            });
            index = slideLi.length;
        }
        else{
            slideBox.animate({
                left: -(index * $(slideLi).width())
            }, time);
        }
    };

    //text w lewo
    function slideTextLeft(){
        $(textSlides).stop()
        textIndex--;
        if(textIndex == 0){
            textSlides.animate({
                left: -(textIndex * $(textLi).width())
            },time, function(){
                $(textSlides).css("left", -(textLi.width() * textLi.length))
            });
            textIndex = textLi.length;
        }
        else{
            textSlides.animate({
                left: -(textIndex * $(textLi).width())
            }, time);
        }
    };

    //Poruszanie slajderem w dol
    function sliderMoveDown(){
        $(slideBox).stop();
        index++;
        if(index == slideLi.length + 1){
            slideBox.animate({
                top: -(index * $(slideLi).height())
            }, time, function(){
                $(slideBox).css("top", -(slideLi.height()))
            });
            index = 1;
        }
        else{
            slideBox.animate({
                top: -(index * $(slideLi).height())
            }, time);
        }
    }

    //Poruszanie slajderem w gore
    function sliderMoveUp(){
        $(slideBox).stop();
        index--;
        if(index == 0){
            slideBox.animate({
                top: -(index * $(slideLi).height())
            },time, function(){
                $(slideBox).css("top", -(slideLi.height() * slideLi.length))
            });
            index = slideLi.length;
        }
        else{
            slideBox.animate({
                top: -(index * $(slideLi).height())
            }, time);
        }
    }

    //Przypisanie poruszania gora dol

    function setUpDown(){

        //w dol
        nextBut.on("click", function(event){
            event.preventDefault();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            sliderMoveDown();
            slideTextRight();
        });

        //w gore
        prevBut.on("click", function(event){
            event.preventDefault();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            sliderMoveUp();
            slideTextLeft();
        });

    };

    //przypisanie funkcji do guzikow next / prev
    function setNextPrev(){

        nextBut.on("click", function(event){
            event.preventDefault();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            slideRight();
            slideTextRight();
        });

        prevBut.on("click", function(event){
            event.preventDefault();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            slideLeft();
            slideTextLeft();
        });

    };

    //Ustawienie guzika od menu
    function setMenu(){

        //otwieranie zamykanie menu
        menuBut.on('click', function(event){
            if (!(menu.hasClass('menuOn'))){
                event.preventDefault();
                $(menu).stop();
                menu.addClass('menuOn');
                menu.fadeIn(400);
                checkBut(400);
            }
            else{
                event.preventDefault();
                $(menu).stop();
                menu.removeClass('menuOn');
                menu.fadeOut(300);
                menuBut.animate({
                    left: 0
                }, 200);
            };
        });

    };

//Auto play + dopisanie do przyciskow

    //auto play prawo lewo
    function setAutoPlay(){

        //w prawo
        autoRightBut.on("click", function(event){
            event.preventDefault();
            $(slideBox).stop();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            slideSet();
            textSet();
            autoRight = setInterval(function(){
                slideRight();
                slideTextRight();
            }, slideTime);
        });

        //w lewo
        autoLeftBut.on("click", function(event){
            event.preventDefault();
            $(slideBox).stop();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            slideSet();
            textSet();
            autoLeft = setInterval(function(){
                slideLeft();
                slideTextLeft();
            }, slideTime);
        });

        //i na drzewo (stop)
        stopBut.on('click', function(event) {
            event.preventDefault();
            slideSet();
            textSet();
            clearInterval(autoLeft);
            clearInterval(autoRight);
        });

    }

    function setAutoPlayVertical(){

        //w dol
        autoRightBut.on("click", function(event){
            event.preventDefault();
            $(slideBox).stop();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            slideSetVertical();
            textSet();
            autoRight = setInterval(function(){
                sliderMoveDown();
                slideTextRight();
            }, slideTime);
        });

        //w gore
        autoLeftBut.on("click", function(event){
            event.preventDefault();
            $(slideBox).stop();
            clearInterval(autoLeft);
            clearInterval(autoRight);
            slideSetVertical();
            textSet();
            autoLeft = setInterval(function(){
                sliderMoveUp();
                slideTextLeft();
            }, slideTime);
        });

        //stop
        stopBut.on('click', function(event) {
            event.preventDefault();
            slideSetVertical();
            textSet();
            clearInterval(autoLeft);
            clearInterval(autoRight);
        });

    }


//Slajder w prawo w lewo
    function basicSlider(){

        //ustawienie na rozruch
        setNextPrev();
        setMenu();
        setAutoPlay();
        addClone();
        newSize();
        slideBoxSize();
        slideSet();
        textSet();
        resizeMenu();
        resizeText();
        resizeFonts();

        //i zeby pozniej sie nie rozwalilo
        $(window).on("resize", function(event){
            newSize();
            slideBoxSize();
            slideSet();
            resizeText();
            textSet();
            resizeMenu();
            resizeFonts();
            checkBut(1);
        });
    }

//Slajder gora dol
    function upDownSlider(){

        //ustawienie na rozruch
        addClone();
        setUpDown();
        setAutoPlayVertical();
        setMenu();
        setSliderHeight();
        slideSetVertical();
        textSet();
        resizeMenu();
        resizeText();
        resizeFonts();

        //i kilka rzeczy na pozniej
        $(window).on("resize", function(event){
            setSliderHeight();
            slideSetVertical();
            textSet();
            resizeMenu();
            resizeText();
            resizeFonts();
        });
    }
    upDownSlider();
    //basicSlider();

});
