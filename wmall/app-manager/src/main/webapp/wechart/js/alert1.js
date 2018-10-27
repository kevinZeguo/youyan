function alert1(code){
	$('body').prepend('<div class="t"></div><div class="t_c"><p>'+code+'</p><a href="#">确定</a></div>')
	$('a').click(function(){
		$('body>.t').remove();
		$('body>.t_c').remove();
	});
}