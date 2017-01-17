$(document).ready(function() {

	function heightDetect() {
		$(".body").css("height", $(window).height());
	};

	heightDetect();

	$(window).resize(function () {
		heightDetect();
	})
	
});