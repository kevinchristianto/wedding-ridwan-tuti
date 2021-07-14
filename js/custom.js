$(function() {

	const urlParams = new URLSearchParams(window.location.search)
	let name = urlParams.get('recipient')
	let arr = name.split("_")
	arr.forEach((val, i) => {
		arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1)
	})
	name = arr.join(" ")
	$('#recipient').html(name)

	$('.grid').masonry({
		// options
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true,
	})

    // These 2 functions are copied from main.js
    // I copied it here just to simplify and make it easier to call, but it's not practical
    var contentWayPoint = () => {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 250, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
    }

	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true,
				parallaxElements: false,
				hideDistantElement: true
			});
		}
	};

    $("#open-invitation").click(() => {
		document.getElementById("audio").play()
		$("#invitation-content").removeClass("hidden")
        $(".animate-box-hidden").addClass("animate-box")
		parallax()
        contentWayPoint()
		$(window).scrollTo($("#invitation-content"), 2000, {easing: 'easeInOutQuint'})
    })

	$(".copy-account").click(function() {
		var copyText = $(this).data('number')
		var textArea = document.createElement("textarea")
		textArea.value = copyText
		document.body.appendChild(textArea)
		textArea.select()
		document.execCommand("Copy")
		textArea.remove()
	})

	$("#toggle-audio").click(function() {
		const audio = document.getElementById("audio"), state = $(this).data("state")
		state == "playing" ? audio.pause() : audio.play()
		state == "playing" ? $(this).data("state", "paused") : $(this).data("state", "playing")
		$(this).toggleClass("icon-pause2").toggleClass("icon-play2")
	})

})