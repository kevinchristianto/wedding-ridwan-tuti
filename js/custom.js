$(function() {

    // This function are copied from main.js
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

    $("#open-invitation").click(() => {
        $("#invitation-content").removeClass("hidden")
        $(".animate-box-hidden").addClass("animate-box")
        contentWayPoint()
		$(window).scrollTo($("#invitation-content"), 2000, {easing: 'easeInOutQuint'})
    })

})