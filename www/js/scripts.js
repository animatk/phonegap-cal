var MOBILE = true;
var SITE_URL = 'https://calendariomustangsoho2015.com/';
var SESSION = window.localStorage;
var MesesData = [
	{mes:"Enero",       mes_nu: 0,  year: 2015, desc : "Mustang Mach I 1968",     info : "Lock Up (1989)"}
	,{mes:"Febrero",    mes_nu: 1,  year: 2015, desc : "Mustang 1967",            info : "Gone in 60 Seconds (2000)"}
	,{mes:"Marzo",      mes_nu: 2,  year: 2015, desc : "Mustang Fastback 1965",   info : "Drive (2011)"}
	,{mes:"Abril",      mes_nu: 3,  year: 2015, desc : "Mustang 1965",            info : "James Bond \"Goldfinger\" (1964)"}
	,{mes:"Mayo",       mes_nu: 4,  year: 2015, desc : "Mustang GT Premium 2013", info : "Fast & Furious 6 (2013)"}
	,{mes:"Junio",      mes_nu: 5,  year: 2015, desc : "Mustang Mach I 1968",     info : "Bullitt (1968)"}
	,{mes:"Julio",      mes_nu: 6,  year: 2015, desc : "Mustang Mach I 1968",     info : "Lock Up (1989)"}
	,{mes:"Agosto",     mes_nu: 7,  year: 2015, desc : "Mustang 1967",            info : "Gone in 60 Seconds (2000)"}
	,{mes:"Septiembre", mes_nu: 8,  year: 2015, desc : "Mustang Fastback 1965",  info : "Drive (2011)"}
	,{mes:"Octubre",    mes_nu: 9,  year: 2015, desc : "Mustang 1965",            info : "James Bond \"Goldfinger\" (1964)"}
	,{mes:"Noviembre",  mes_nu: 10, year: 2015, desc : "Mustang GT Premium 2013", info : "Fast & Furious 6 (2013)"}
	,{mes:"Diciembre",  mes_nu: 11, year: 2015, desc : "Mustang Mach I 1968",     info : "Bullitt (1968)" }
	,{mes:"Enero",      mes_nu: 0,  year: 2016, desc : "Mustang GT 50 Años"}
];

function loadCont(url, func){
	jQuery.ajax({
		type : 'GET',
		url : url,
		success: function(data){
			func(data);
		}
	});
}

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
 
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
 
function deleteCookie(name) {
    setCookie(name,"",-1);
}
 
//setCookie('prueba4', '{"id":3025,"url":"'+location.host+'","status": true}', 1);
//var co = $.parseJSON( getCookie('prueba4') ); 
 

function ak_buscalabel(form, ipt){
	var str = ipt.attr('name');
	if(str.indexOf("[]") >= 0){ 
		var name = str.replace('[]', '');
	}else{
		var name = str;
	}
	var label = form.find('label[for='+name+']');
	
	if(label.length > 0){
		return label.text();	
	}else{
		return ipt.attr('placeholder');	
	}
}


/*
	funcion ak_validate
	author @animatk 2013
*/
function ak_validate( form, opts ){
	//@opts { bt, ajax, func}
	var options = {};
	jQuery.extend(options, opts);
	var form = jQuery(form);
	var btn = (options.bt != undefined)? jQuery(options.bt) : form.find('input[type=submit]');
	var inputs = form.find('input, textarea, select');
	var tip = $('.ak-tooltip');

	for(var i = 0; i < inputs.length; i++)
	{
		ipt = jQuery(inputs[i]);
		//
		if(ipt.hasClass('required') && ipt.val() == ""){
			label = ak_buscalabel(form, ipt);
			ipt.addClass('error');
			ak_showtip( ipt, label+': Este campo es obligatorio');
			return false;
		}else{
			tip.remove();
			ipt.removeClass('error');
		}
		if(ipt.hasClass('email') && ipt.val() != ""){
			if(ipt.val().indexOf('@') == '-1' || ipt.val().indexOf('.') == '-1'){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, 'Verifique el correo electr&oacute;nico.');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		if(ipt.hasClass('price') && ipt.val() != ""){
			var filter=/^([0-9.,]+)*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+': Este campo solo permite n&uacute;meros y punto despues de los centavos.');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		
		if(ipt.hasClass('onlynum') && ipt.val() != ""){
			var filter=/^([0-9]+)*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+': Este campo solo permite n&uacute;meros.');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		if(ipt.hasClass('onlydot') && ipt.val() != ""){
			var filter=/^([0-9.]+)*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+': Este campo solo permite n&uacute;meros y punto (.)');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		if(ipt.hasClass('cedula') && ipt.val() != ""){
			var filter=/^([0-9.-]+)*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+': Este campo solo permite n&uacute;meros, punto (.) y guion (-)');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		if(ipt.hasClass('nicename') && ipt.val() != ""){
			var filter=/^([a-zA-Z0-9\-]+)*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+': No puede contener caracteres $&?!, mayusculas, acentos ni espacios.');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		//
		if(ipt.hasClass('phone') && ipt.val() != ""){
			var filter=/^([0-9-\s]+)*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+' Verifique este campo.');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		
		if(ipt.hasClass('estatura') && ipt.val() != ""){
			var filter=/([0-2]{1})\.([0-9]{2})*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+' El formato correcto es similar a 1.65');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		
		if(ipt.hasClass('fecha') && ipt.val() != ""){
			var filter=/([0-9]{4})-([0-9]{2})-([0-9]{2})*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+' El formato correcto es similar a 1980-07-23');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		
		if(ipt.hasClass('fecha-hora') && ipt.val() != ""){
			var filter=/([0-9]{4})-([0-9]{2})-([0-9]{2})\s([0-9]{2}):([0-9]{2}):([0-9]{2})*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+' El formato correcto es similar a 1980-07-23 10:45:00');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		
		if(ipt.hasClass('fecha-dma') && ipt.val() != ""){
			var filter=/([0-9]{2})\/([0-9]{2})\/([0-9]{4})*$/;
			if(!filter.test(ipt.val())){
				label = ak_buscalabel(form, ipt);
				ipt.addClass('error');
				ak_showtip( ipt, label+' El formato correcto es similar a 15/03/1980');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
			}
		}
		
		if(ipt.data('compair')){
			com = form.find(ipt.attr('data-compair'));
			if(ipt.val() != com.val() && ipt.val() != ""){
				label = ak_buscalabel(form, ipt);
				label2 = ak_buscalabel(form, com);
				ipt.addClass('error');
				com.addClass('error');
				ak_showtip( ipt, label+' y '+label2+' Estos campos no pueden ser diferenrtes.');
				return false;
			}else{
				tip.remove();
				ipt.removeClass('error');
				com.removeClass('error');
			}
		}		
	}
	
	if(btn.hasClass('deactive') === false){
		btn.addClass('deactive');
		var cortina = $('#cortina');
		var org = btn.html();
		btn.html(' Espere.. ');
		
		if(cortina.length <= 0){
			$('body').prepend('<div id="cortina">&nbsp;</div>');
			cortina = $('#cortina');
		}
		//

		if(options.ajax === false){
			btn.removeClass('deactive');
			btn.html(org);
			func = options.func;
			func(form.serializeObject());
			return false;
		}else if( options.ajax != undefined && options.ajax != false){
			
			 jQuery.ajax({
				type : 'POST',
				data : form.serialize(),
				url : options.ajax,
				success: function(data){
					btn.removeClass('deactive');
					btn.html(org);
					if(options.func != undefined){
						cortina.remove();
						func = options.func;
						func(data);
					}
				},
				error : function(xhr, ajaxOptions, thrownError){
					btn.removeClass('deactive');
					btn.html(org);
					cortina.remove();
					if(options.error != undefined){
						error = options.error;
						error();
					}
				}
			});
		}else{
			form.submit();
			return true;
		}
 	}
	return false;
}

function ak_showtip(ipt, msj){
	//
	$('.ak-tooltip').remove();
	if(ipt == 'remove'){
		return false;
	}
	//
	var tip = $('<div class="ak-tooltip">');
	var wid = (ipt.innerWidth() > 80)? ipt.innerWidth() : 80;
	tip.html('<div class="ak-tooltip-int" onclick="ak_showtip(\'remove\');">'+msj+'</div>');
	tip.css({
		width: wid
		,top: ipt.offset().top - 6
		,left: ipt.offset().left
	});	
	$('body').prepend(tip);
	ipt.focus();
}

function LoadContent( div, url, params, func ){
    if(div  == 'box'){ 
        var div = '#utility-box .panel-content';
        $('#utility-box').css('display', 'block');
    }
     
    $(div).html( "" );  
    $(div).addClass('cargando');
    $.ajax({ type: "GET", url: url+params,
        success: function( html ){
            $(div).removeClass('cargando');
            $(div).html( html );    
            if( func != undefined ){
                func();
            }
        }
    });
}



var  _DataTablesSpanish = {
	"sProcessing":     "Procesando...",
	"sLengthMenu":     "Mostrar _MENU_ registros",
	"sZeroRecords":    "No se encontraron resultados",
	"sEmptyTable":     "Ningún dato disponible en esta tabla",
	"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix":    "",
	"sSearch":         "Buscar:",
	"sUrl":            "",
	"sInfoThousands":  ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "Siguiente",
		"sPrevious": "Anterior"
	},
	"oAria": {
		"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

	
$(function(){

	$('.input-group-addon').click(function(){
		$input = $(this).parent().find('input, select');
		ak_showtip( $input, $input.attr('placeholder'));
	});
/*
	var fbcookie = $.parseJSON( getCookie('fbtoken') ); 
	if(fbcookie != null){
		SESSION['fbtoken'] = fbcookie.ide;
	}
*/	
	if(isDevice() == 'Android'){
		$('.escape-video').removeClass('oculto');
	}else if(isDevice() == 'iPhone'){
		$('body').addClass('padding20');
		
	}
	
	if( !MOBILE )
	{
		
		$.datepicker.regional['es'] = {
			closeText: 'Cerrar',
			prevText: '<Ant',
			nextText: 'Sig>',
			currentText: 'Hoy',
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
			dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','SÃ¡b'],
			dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
			weekHeader: 'Sm',
		//   dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
		
		$.datepicker.setDefaults($.datepicker.regional['es']);
		
		$.timepicker.regional['es'] = {
			timeOnlyTitle: 'Seleccione Horario',
			timeText: 'Seleccionada: &nbsp;',
			hourText: 'Hora',
			minuteText: 'Minuto',
			secondText: 'Segundo',
			millisecText: 'Milisegundo',
			currentText: 'Ahora',
			closeText: 'Listo',
			ampm: false
		}; 

		$.timepicker.setDefaults($.timepicker.regional['es']);
		
		$('#pickerIni').datetimepicker({
			dateFormat: 'yy-mm-dd'
			,timeFormat: 'HH:mm:00'
			,onClose: function(selectedDate){
			//	$('#pickerEnd').datetimepicker( "option", "minDate", selectedDate );
			}
		});
		$('#pickerEnd').datetimepicker({
			dateFormat: 'yy-mm-dd'
			,timeFormat: 'HH:mm:00'
			,onClose: function(selectedDate){
				$('#pickerIni').datetimepicker( "option", "maxDate", selectedDate );
			}
		});
	
	}else{
		var fecha1 = $('#pickerIni');
		var fecha2 = $('#pickerEnd');
		//
		fecha1.attr('type', 'datetime-local');
		fecha2.attr('type', 'datetime-local');
		fecha1.removeClass('fecha-hora');
		fecha2.removeClass('fecha-hora');
		
		openLog.api({
			 url: SITE_URL
			,path: 'app'
			,jsonp: true
			,query: {
				pedir: 'cookie'
			}
			,success: function(d){
				alert(d);
				if(d){
					if(d.fbtoken != undefined){
						SESSION['fbtoken'] = d.fbtoken.ide;
						SESSION['hasCode'] = true;
						hasFB = true;
					}
					
					if(d.gctoken != undefined){
						SESSION['gctoken'] = d.gctoken.ide;
						SESSION['hasCode'] = true;
						hasGC = true;
					}
					if(d.mwtoken != undefined){
						SESSION['mwtoken'] = d.mwtoken.ide;
						SESSION['hasCode'] = true;
						hasMW = true;
					}
				}
			}
		});
	}
});

function isDevice(){
	return (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)
													)  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)
													) == "Android" ? "Android" : false;
}

var vidAct = true; //video activo

$(window).load(function(){
	//PRIMERO CARGA EL VIDEO DESDE (YT) API
//	var vidId = 'rcs7GR1YzPE';
//	$('#video-frame').html('<iframe id="playerFrame" width="100%" height="100%" src="https://www.youtube.com/embed/' + vidId + '?modestbranding=1&enablejsapi=1&autoplay=0&fs=0&rel=0&controls=0&html5=1&watermark=0" frameborder="0"></iframe>');
/*	
	YTPlayer = new YT.Player('playerFrame', {
		events: {
			'onStateChange': onPSChange
			,'onReady': function(){
				YTPlayer.playVideo();
			}
		}
	});
*/
	if(SESSION['videoStop'] != 't'){
	
		if(isDevice() == 'Android'){
			VideoPlayer.play(SITE_URL+"/vid/video.mp4");
			setTimeout(function(){
				if(vidAct){
					ocultarVideo();
				}
			}, 5200);
			
		}else{
			$('.escape-video').addClass('oculto');
			$('#video1').removeClass('oculto');
				VIDEO = document.getElementById("video1"); 
				VIDEO.play(); 
				VIDEO.onended = function(e) {
				  ocultarVideo();
			  };
		}
	}else{
		ocultarVideo();
	}
	
	

//	$('#video-frame').css('background-image', 'url(img/video.gif?n='+Math.floor((Math.random() * 9999) + 1000)+')');
	

});

function IniciarReloj() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
  //  s = checkTime(s);
  //  $('.cal-mh-hora').html( h+":"+m+":"+s);
	$('.cal-mh-hora').html( h+":"+m );
    var t = setTimeout(function(){ IniciarReloj();},500);
}
function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/*
function onPSChange(event) {
	switch(event.data) {
		case YT.PlayerState.ENDED:
			ocultarVideo();
			break;
		case YT.PlayerState.PLAYING:
		//	log('Video is playing.');
			break;
		case YT.PlayerState.PAUSED:
		//	log('Video is paused.');
			YTPlayer.playVideo();
			break;
		case YT.PlayerState.BUFFERING:
		//	log('Video is buffering.');
			break;
		case YT.PlayerState.CUED:
		//	log('Video is cued.');
			break;
	}
}
*/

function ocultarVideo(){
	var btnVideo = $('#btnSaltarVideo'),
	btnMenu = $('#btnMenu');
	vidAct = false;
	
//	YTPlayer.stopVideo();
	if(isDevice() != 'Android' && SESSION['videoStop'] != 't'){
		VIDEO.pause();
	}
	
	SESSION['videoStop'] = 't';
	
	if(SESSION['hasCode']){
		if(hasFB || hasGC || hasMW){
			ak_navigate('#video', '#home', 'toLeft');
			listarMeses();
			init_calendar();
		//	IniciarReloj();
		}else{
			ak_navigate('#video', '#login', 'toLeft');
			$('header').addClass('arriba');
			logearRedes();
		}
	}else{
		ak_navigate('#video', '#login', 'toLeft');
		$('header').addClass('arriba');
	}
	
	btnVideo.addClass('oculto');
	btnMenu.removeClass('oculto');
}

function ak_navigate(from, to, effect){
	var fx = (effect != undefined)? effect : 'toLeft';
	$(from).removeClass('toCenter toLeft toRight');
	$( to ).removeClass('toCenter toLeft toRight');
	$(from).addClass(fx);
	$( to ).addClass('toCenter');
}


function listarMeses(){

	var listaMeses = $('#listaMeses');
	var output = "";
	var out_fin = '</div></div>';
	var mesActual = new Date().getMonth();
	listaMeses.html("");

	for(i in MesesData){
		var obj = MesesData[i];
		var actual = (mesActual == obj.mes_nu)? 'activo': "";
		var info = (undefined != obj.info)? 'Película: '+obj.info : "";
		var out_ini = '<div class="col-sm-6"><div class="mes-cont '+actual+'">';
		var out_foto = '<div class="mes-foto" onclick="loadCalImage('+i+');" style="background-image: url(img/meses/thumbnail_'+i+'.jpg);"><div class="foto-sup"><img src="img/cal-verimagen.png" alt="Ver Imagen" /></div></div>';
		var out_deta = '<div class="mes-deta" onclick="loadCalMes('+i+');"><div class="mes-deta-info"><div class="mes-deta-int"><div class="mes-titl">'+obj.mes+'</div><div class="mes-desc">'+obj.desc+'<br/>'+info+'</div></div></div><div class="mes-deta-sub"><span class="mes-deta-ver"><img src="img/cal-vercal.png" alt="Ver Calendario" /></span></div></div>';
		
		output += out_ini;
		
		if(i%2==0){
			output += out_foto+out_deta;
		}else{
			output += out_deta+out_foto;
		}
		
		output += out_fin;
	}
	
	listaMeses.html(output);
	
	SESSION.removeItem('videoStop');
}

function btnConozca(){
	$('section').removeClass('toCenter');
	ak_navigate('#home', '#galeria'); 
	galeriaImg(0);
	btnIzq({
		text : 'Volver'
		,from : '#galeria'
		,to : '#home'
		,fx : 'toRight'
	});
}
function btnDetrasde(){
	$('#menu').removeClass('toCenter'); 
	VideoPlayer.play(SITE_URL+"/vid/video.mp4");
}

function galeriaImg(nu){
	$('body').prepend('<div id="cortina"> </div>');
	var n = (nu != undefined)? nu : 0;
	var next = $('.gal-next');
	var prev = $('.gal-prev');
	
	
	$('<img>').attr('src', 'img/gal/'+n+'.jpg').load(function(){
		
		if(n > 6){
			next.css('display', 'none');
		}else{
			next.css('display', 'block');
			next.attr('onclick', 'galeriaImg('+(n+1)+')');
			
		}
		//
		if(n < 1){
			prev.css('display', 'none');
		}else{
			prev.css('display', 'block');
			prev.attr('onclick', 'galeriaImg('+(n-1)+')');
		}
		$('#cortina').remove();
		$('#galeria').css('background-image','url(img/gal/'+n+'.jpg)');
		
	});
}

function loadCalImage(n, f){
	var obj = MesesData[n];
	var contImage = $('#imagen');
	var from = (f != undefined)? f : '#home';
	contImage.css('background-image', 'url(img/meses/'+n+'.jpg)');
	ak_navigate( from , '#imagen');
	btnIzq({
		text : 'Volver'
		,from : '#imagen'
		,to : '#home'
		,fx : 'toRight'
	});
}
function loadCalMes(n){
	var obj = MesesData[n];
	$('.cal-mes').html( obj.mes +' de '+ obj.year );
	$('.cal-mh').css('background-image', 'url(img/meses/thumbnail_'+n+'.jpg)');
	
	var next = (n+1 > MesesData.length)? 0 : n+1;
	var prev = (n-1 < 0)? MesesData.length : n-1;
	
	$('.cal-prev').attr('onclick', 'loadCalMes('+prev+', false)');
	$('.cal-next').attr('onclick', 'loadCalMes('+next+', false)');
	$('.cal-mh').attr('onclick', 'loadCalImage('+n+', \'#calendario\')');

	var d = new Date();
	d.setYear( obj.year );
	d.setMonth(obj.mes_nu);
	var m = moment(d);
	$('.Calendario').fullCalendar( 'gotoDate', m );

	ak_navigate('#home', '#calendario');

	btnIzq({
		text : 'Volver'
		,from : '#calendario'
		,to : '#home'
		,fx : 'toRight'
	});
}

function btnIzq(obj){
	var btmI = $('#btnIzquierdo'),
	effect = (obj.fx)? ", '"+obj.fx+"'" : "";
	btmI.html(obj.text);
	btmI.attr('onclick', "ak_navigate('"+obj.from+"', '"+obj.to+"' "+effect+"); $('#btnIzquierdo').addClass('oculto')");
	btmI.removeClass('oculto');
}


/* FUNCIONAMIENTO DE LA APLICACION */


function form_login(form){
	
	ak_validate(form, {
		ajax: false
		,bt: '#BtnCodigo'
		,func : function(data){
			//
			openLog.api({
				url : SITE_URL
				,path: 'app'
				,jsonp: true
				,query: {
					pedir: 'codigo'
					,num: data.codigo
				}
				,success: function(obj){					
					$('#cortina').remove();
					if(obj.success === false){
						ak_showtip(  $(obj.selector), obj.msj );
					}else{
						SESSION['hasCode'] = 't';
						
						if(hasFB || hasGC || hasMW){
							$('header').removeClass('arriba');
							ak_navigate('#login', '#home');
							listarMeses();
							init_calendar();
						}else{
							logearRedes();
						}
					//	init_calendar();			
					}
				}
			});
			
		}
	});
	
	return false;
}

function logout(){
	$('body').prepend('<div id="cortina"></div>');
	openLog.jsonp( SITE_URL+'app?pedir=salir', 
	function(resp){
		SESSION.clear();
		location.reload();
	});
}

function logearRedes(){
	$('#login form').css('display', 'none');
	$('#LogearCon').css('display', 'block');
}


/* END FORM LOGIN */

//Calendar Constants
var CalIni = new Date();
var CalEnd = CalIni;
var CalMes = CalIni;
var hasFB = false;
var hasGC = false;
var hasMW = false;

function init_calendar(){
	$('.Calendario').fullCalendar({
		editable: true
		,selectable: true
		,selectHelper: true
	//	,eventLimit: true
		,header: {
			left: '',
			center: '',
			right: ''
		}
		,select: function(start, end) {
			
			if(hasFB || hasGC || hasMW){
			
				if(hasFB){
					$('#auth_fb').css('display', 'block');
				}else{
					$('#auth_fb').css('display', 'none');
				}
				
				if(hasGC){
					$('#auth_gc').css('display', 'block');
				}else{
					$('#auth_gc').css('display', 'none');
				}
				
				if(hasMW){
					$('#auth_mw').css('display', 'block');
				}else{
					$('#auth_mw').css('display', 'none');
				}
				//aumentar 1 dia error del calendario
				start._d.setDate( start._d.getDate() +1 );
				start._d.setHours( 0 );
				end._d.setDate( end._d.getDate() );
				end._d.setHours( 23 );
				
				var formato = (MOBILE)? 'DateTimeLocal':'aleDateTime';
				
				$('#pickerIni').val(start._d.format(formato));
				$('#pickerEnd').val(end._d.format(formato));
				//
				$('#EventoAgregar').modal('show');
			}

			$('.Calendario').fullCalendar('unselect');
		}		
		,eventClick: function(calEvent, jsEvent, view) {
			
		//	console.log( calEvent );
			
			var Mod = $('#EventoDetalles');
			var html = '<ul>';
			html += '<li><strong> Descripción: </strong>'+calEvent.title+'</li>';
			html += '<li><strong> Inicia: </strong>'+date_format(calEvent.start._d)+'</li>';
			if(calEvent.end != null){
			
				html += '<li><strong> Finaliza: </strong>'+date_format(calEvent.end._d)+'</li>';
				
			}
			html += '</ul>';
			
			Mod.find('.modal-body').html(html);
			Mod.modal('show');
		}
		,viewRender : function(view){
			//remover eventos de mw  (Microsoft Windows o Outlook)
			$('.Calendario').fullCalendar( 'removeEvents', 'mw');
			$('.Calendario').fullCalendar( 'removeEvents', 'gc');
			$('.Calendario').fullCalendar( 'removeEvents', 'fbc');
			//buscar eventos desde la fecha x hasta la fecha y
			CalIni = view.start._d;
			CalEnd = view.end._d;
			CalMes = view.intervalEnd._d;
			var ini = view.start._d.format("isoUtcDateTime");
			var end = view.end._d.format("isoUtcDateTime");
			if(hasMW){
				mw_getEvents(ini, end);
			}
			if(hasGC){
				goo_getEvents(CalIni, CalEnd, CalMes);
			}
			if(hasFB){
				fb_set_birthdates();
			}
		}
	});
	
	fb_init();
	goo_init();
	mw_init();
}

function loop_calendar(obj, dat, fre, tot){
	var events = Array();
	var tot = (tot != undefined)? tot : 5;
	var fre = (fre != undefined)? fre : 'year';
	var showHour = (dat.hour != undefined)? dat.hour : false;

	for( var i=0; i < tot; i++ ){
		var nobj = {};
		nobj.title = obj.title;
		nobj.color = obj.color;
		nobj.start = obj.start;
		nobj.end = obj.end;
		
		// "SECONDLY" / "MINUTELY" / "HOURLY" / "DAILY"/ "WEEKLY" / "MONTHLY" / "YEARLY"

		if( fre == 'YEARLY' ){
			var d = new Date( dat.ini );
			d.setYear(d.getFullYear() + i);
			d.setDate(d.getDate() + 1);
			
			nobj.start = date_format(d, showHour);	

			if(dat.end != undefined){
				var d = new Date( dat.ini );
				d.setYear(d.getFullYear() + i);
				d.setDate(d.getDate() + 1);
				
				nobj.end = date_format(d, showHour);
			}
			
		}else if( fre == 'MONTHLY' ){
		
			var d = new Date( dat.ini );
			d.setMonth(d.getMonth() + i);
			d.setDate(d.getDate() + 1);
			
			nobj.start = date_format(d, showHour);	

			if(dat.end != undefined){
			
				var d = new Date( dat.ini );
				d.setMonth(d.getMonth() + i);
				d.setDate(d.getDate() + 1);
				
				nobj.end = date_format(d, showHour);
			}
		}
		
		events.push( nobj );
	}

	$('.Calendario').fullCalendar( 'addEventSource', events);
}

function guardar_evento(){
	var form = $('#saveEvent');
	
	ak_validate(form, {
		ajax: false
		,bt : '.boton-saveEvent'
		,func: function(d){			
			if(d.auth_fb == undefined && d.auth_gc == undefined && d.auth_mw == undefined){
				cortina.remove();
				ak_showtip($('#saveEvent input[type=checkbox]:eq(1)'), 'Debe seleccionar por lo menos uno de sus calendarios.');
				return false;
			}
			//
			var EvIni = new Date(d.EventIni);
			var EvEnd = new Date(d.EventEnd);
			
			d.EventIni = date_format( EvIni, 'utc' );
			d.EventEnd = date_format( EvEnd, 'utc' );
			
			var func = function(){
				$('input[name=EventName]').val("");
				$('textarea[name=EventDesc]').val("");
				$('input[name=EventIni]').val("");
				$('input[name=EventEnd]').val("");
				$('input[name=EventPlace]').val("");
				$('select[name=EventPrivacy]').val("1");
				$('select[name=EventAll]').val("");
				$('select[name=auth_fb]').val("");
				$('select[name=auth_gc]').val("");
				$('select[name=auth_mw]').val("");

				$('#EventoAgregar').modal("hide");
				$('#cortina').remove();
			}

			if(d.auth_fb == 't'){
				fb_set_event(d, func);
			}
			if(d.auth_gc == 't'){
				gc_set_event(d, func);
			}
			if(d.auth_mw == 't'){
				wm_set_event(d, func);
			}
		}
	});
}

function date_format(date, hours){
		var output = date.getFullYear() +'-'+
			("0" + (date.getMonth() + 1)).slice(-2)+'-'+
			("0" +  date.getDate()).slice(-2);
		
		if( hours === true ){
			output += ' '+
				("0" + date.getHours()).slice(-2)+':'+
				("0" + date.getMinutes()).slice(-2)+':'+
				("0" + date.getSeconds()).slice(-2);
		} else if( hours == 'utc' ) {
			output += 'T'+
				("0" + date.getHours()).slice(-2)+':'+
				("0" + date.getMinutes()).slice(-2)+':'+
				("0" + date.getSeconds()).slice(-2)+'-0500';
		} else if( hours == 'tz' ) {
			output += 'T'+
				("0" + date.getHours()).slice(-2)+':'+
				("0" + date.getMinutes()).slice(-2)+':'+
				("0" + date.getSeconds()).slice(-2)+'Z';
		}
		
		return output;
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
}

/*! GOOGLE API */
	//constante de eventos de google
	var G_Events = Array(),
	clientId = '575669402911-5nabcf0k5qubc6ps2shbsi2uav3r5cid.apps.googleusercontent.com',
	apiKey = 'AIzaSyCjSbIzogs1Row6dYqBmgR-NV6Kh32avOA',
	goo_api_url = 'https://www.googleapis.com/',
	scopes = 'https://www.googleapis.com/auth/calendar';

	// Use a button to handle authentication the first time.
	function goo_init() {
		if(SESSION['gctoken'] && SESSION['gctoken'] != "" ){
			$('.gcLogin').css('display','none');
			gctoken = SESSION['gctoken'];
			hasGC = true;
			goo_call();
		}else{
			$('.gcLogin').css('display','block');
			hasGC = false;
		}
	}
	
	function goo_login() {
		openLog.login({
			url: 'https://accounts.google.com/o/oauth2/auth'
			,path: ''
			,query: {
				client_id: "575669402911-5nabcf0k5qubc6ps2shbsi2uav3r5cid.apps.googleusercontent.com"
				,scope: "https://www.googleapis.com/auth/calendar"
				,immediate: false
				,include_granted_scopes: true
				,proxy: "oauth2relay753833450"
				,redirect_uri: "https://calendariomustangsoho2015.com/opengc.html"
				,origin: "https://calendariomustangsoho2015.com/"
				,response_type: "token"
				,state: "557500042%7C0.3630815089"
				,authuser: "0"
			}
		});
        return false;
	}

      // Load the API and make an API call.  Display the results on the screen.
	function goo_call() {
		if(!MOBILE){
			openLog.api({
				url: goo_api_url
				,path:'calendar/v3/calendars/primary/events'
				,query:{
					key: apiKey
					,access_token: gctoken
				}
				,success: function(resp){						
					G_Events = resp.items;
					goo_getEvents();
				}
				,error: function(){
					SESSION['gctoken'] = "";
					hasGC = false;
					goo_init();
				}
			});
		}else{	
			
			openLog.jsonp( SITE_URL+'app?pedir=goo_events&k='+apiKey+'&a='+gctoken, 
			function(resp){
				//var resp = JSON.parse(resp);
				if(resp && !resp.error){
					G_Events = resp.items;
					goo_getEvents();
				}else{
					SESSION['gctoken'] = "";
					hasGC = false;
					goo_init();
				}
			});
		}
    }
	
	function goo_getEvents(dateIni, dateEnd, dateMes){
		if(dateIni == undefined){
			dateIni = CalIni;
		}
		if(dateEnd == undefined){
			dateEnd = CalEnd;
		}
		if(dateMes == undefined){
			dateMes = CalMes;
		}
		
		var G_Cal_Events = Array();
		for(i in G_Events){
			var ev = G_Events[i];
			var obj = {};
			
			obj.id = 'gc';
			obj.title = ev.summary;
			obj.color = '#d9534f';
			
			if(ev.start.dateTime != undefined){
				obj.start = ev.start.dateTime;
			}else{
				obj.start = ev.start.date;
			}
			
			if(ev.end.dateTime != undefined){
				obj.end = ev.end.dateTime;
			}else{
				obj.end = ev.end.date;
			}
			
			var start = new Date(obj.start);
			var end = new Date(obj.end);
			
			if(ev.recurrence != undefined){					
				var GRegStr = ev.recurrence[0];
				var GFreExp = /FREQ=([^\;]*)/;
				var GUntExp = /UNTIL=([^\;]*)/;
				var GRepExp = /COUNT=([^\;]*)/;
				
				var GFreMat = GRegStr.match(GFreExp);
				var GUntMat = GRegStr.match(GUntExp);
				var GRepMat = GRegStr.match(GRepExp);
				// "SECONDLY" / "MINUTELY" / "HOURLY" / "DAILY"/ "WEEKLY" / "MONTHLY" / "YEARLY"
				
				var ev_ini = obj.start.split('-');
				var ev_end = obj.end.split('-');

					//es infinito
					if(GFreMat[1] == 'YEARLY'){
						obj.start = dateIni.getFullYear()+'-'+ev_ini[1]+'-'+ev_ini[2];
						obj.end = dateIni.getFullYear()+'-'+ev_end[1]+'-'+ev_end[2];
					
					}else if(GFreMat[1] == 'MONTHLY'){

						obj.start = dateMes.getFullYear()+'-'+("0" + (dateMes.getMonth() + 1)).slice(-2)+'-'+ev_ini[2];
						obj.end = dateMes.getFullYear()+'-'+("0" + (dateMes.getMonth() + 1)).slice(-2)+'-'+ev_end[2];
					}
					
					G_Cal_Events.push(obj);
			
				if(GUntMat != undefined || GRepMat != undefined ){
					//console.log('es finito');
				}
				
			}else{

				if( end > dateIni && end < dateEnd ){
					G_Cal_Events.push(obj);
				}
			}
		}
		$('.Calendario').fullCalendar( 'addEventSource', G_Cal_Events);
	}
	
	
	
function gc_set_event(d, func)
{
	var query = {};
	query.summary = d.EventName;
	query.description = d.EventDesc;
	query.start = {};
	query.end = {};
	
	if(d.EventAll == 't'){
		var EvIni = new Date(d.EventIni);
		var EvEnd = new Date(d.EventEnd);
		
		d.EventIni = date_format( EvIni );
		d.EventEnd = date_format( EvEnd );
		
		if(d.EventIni == d.EventEnd){
			EvEnd.setDate(EvEnd.getDate()+1);
			d.EventEnd = date_format( EvEnd );
		}
		
		query.start.date = d.EventIni;
		query.end.date = d.EventEnd;
	}else{
		query.start.dateTime = d.EventIni;
		query.end.dateTime = d.EventEnd;
	}
	
	query.location = d.EventPlace;
	//privacidad
	var EventPrivacy = 'public';
	
	if(d.EventPrivacy == 2){
		EventPrivacy = 'confidential';
	}
	if(d.EventPrivacy == 3){
		EventPrivacy = 'private';
	}
	
	query.visibility = EventPrivacy;

/*	var request = gapi.client.calendar.events.insert({
	  'calendarId': 'primary',
	  'resource': query
	});
	request.execute(function(resp) {
		$('.Calendario').fullCalendar( 'removeEvents', 'gc');
		goo_call();
		
		if(func != undefined){
			func();
		}
	});
*/		
	openLog.api({
		url: goo_api_url
		,method: 'POST'
		,path:'calendar/v3/calendars/primary/events'
		,query:{
			key: apiKey
			,access_token: gctoken
		}
		,params: query
		,success: function(resp){						
			$('.Calendario').fullCalendar( 'removeEvents', 'gc');
			goo_call();
			
			if(func != undefined){
				func();
			}
		}
		,error: function(){
			SESSION['gctoken'] = "";
			goo_init();
		}
	});
}
	
	
	
	
/*! END GOOGLE API */


/*! FACEBOOK LOGIN */

	var F_Friends = Array(),
	fbtoken = "",
	FB_api_url = 'https://graph.facebook.com/v1.0';
	
	function fb_init() {
		if(SESSION['fbtoken'] && SESSION['fbtoken'] != "" ){
			$('.fbLogin').css('display','none');
			fbtoken = SESSION['fbtoken'];
			hasFB = true;
			fb_get_birthdates();
			fb_get_events();
		}else{
			$('.fbLogin').css('display','block');
			hasFB = false;
			
		}
	}
	
	function fb_login(){
		$('.fbLogin').text('Espere...').addClass('btn-default');
		openLog.login({
			url: 'https://www.facebook.com/dialog/oauth'
			,path: ''
			,query: {
				client_id : '326339840802808'
				,redirect_uri : 'https://calendariomustangsoho2015.com/openfb.html'
				,response_type : 'token'
				,display : 'popup'
				,scope : 'public_profile,user_friends,friends_birthday,user_birthday,user_events,rsvp_event'
			}
		
		});
	}


function fb_get_birthdates(fb_user){
	openLog.api({
		url: FB_api_url
		,path: '/me/friends'
		,query: {
			'fields': 'id,name,birthday'
			,'limit': '5000'
			, access_token : fbtoken
		}
		,success: function(response){
			F_Friends = response.data;
			fb_set_birthdates();
		}
		,error: function(){
			SESSION['fbtoken'] = "";
			hasFB = false;
			fb_init();
		}
	});
}

function fb_set_birthdates(){
	
	var FB_friends = Array();
	
	for(i in F_Friends){
		var ami = F_Friends[i];
		var obj = {};

		if(ami.birthday != undefined){
			//
			obj.id = 'fbc';
			obj.title = ami.name+' - Cumpleaños';
			obj.color = '#4c66a4';
			var cumple = ami.birthday.split('/');
			obj.start = CalMes.getFullYear()+'-'+cumple[0]+'-'+cumple[1];
			
			var ini = new Date(obj.start);
			
			if( ini > CalIni && ini < CalEnd ){
				FB_friends.push(obj);
			}
		}				
	}
	
	$('.Calendario').fullCalendar( 'addEventSource', FB_friends);
}


function fb_get_events(fb_user){
	//solo muestra los eventos a los que asistira el usuario
	
	openLog.api({
		url: FB_api_url
		,path: '/me/events'
		,query: {
			access_token : fbtoken
		}
		,success: function(response){
			var events = response.data;
			var FB_Events = Array();
			
			for(i in events){
				var ev = events[i];
				var obj = {};
				//
				obj.id = 'fbe';
				obj.title = ev.name;
				obj.color = '#4c66a4';
				obj.start = ev.start_time;
				//
				if( ev.end_time != undefined ){
					obj.end = ev.end_time;
				}
				FB_Events.push( obj );
			}
			
			$('.Calendario').fullCalendar( 'addEventSource', FB_Events);
		}
		,error: function(){
			SESSION['fbtoken'] = "";
			hasFB = false;
			fb_init();
		}
	});
	
}

function fb_set_event(d, func)
{
	var query = {};
	query.name = d.EventName;
	query.description = d.EventDesc;
	
	if(d.EventAll == 't'){
		var EvIni = new Date(d.EventIni);
		var EvEnd = new Date(d.EventEnd);
		//
		d.EventIni = date_format( EvIni );
		d.EventEnd = date_format( EvEnd );
		//
		if(d.EventIni == d.EventEnd){
			EvEnd.setDate(EvEnd.getDate()+1);
			d.EventEnd = date_format( EvEnd );
		}
	}
	
	query.start_time = d.EventIni;
	query.end_time = d.EventEnd;
	query.location = d.EventPlace;
	//privacidad
	var EventPrivacy = 'OPEN';
	
	if(d.EventPrivacy == 2){
		EventPrivacy = 'SECRET';
	}
	if(d.EventPrivacy == 3){
		EventPrivacy = 'FRIENDS';
	}
	query.access_token = fbtoken;
	query.privacy_type = EventPrivacy;

	openLog.api({
		url: FB_api_url
		,path: '/me/events'
		,method: 'POST'
		,query: query
		,success : function(response) {
			$('.Calendario').fullCalendar( 'removeEvents', 'fbe');
			fb_get_events();
			
			if(func != undefined){
				func();
			}
		}
	});
}
	
/*! END FACEBOOK LOGIN */


/*! WINDOWS LOGIN */
	var mw_api_url = 'https://apis.live.net/v5.0',
	mwtoken ="";

	function mw_init(){
		if( SESSION['mwtoken'] && SESSION['mwtoken'] != "" ){
			$('.mwLogin').css('display','none');
			mwtoken = SESSION['mwtoken'];
			hasMW = true;
			mw_getEvents();
		}else{
			$('.mwLogin').css('display','block');
			hasMW = false;
		}
	}
	
	function mw_login(){
		$('.mwLogin').text('Espere...');
		//
		openLog.login({
			url: 'https://login.live.com/oauth20_authorize.srf'
			,path: ''
			,query: {
				client_id:'00000000401374AC'
				,display:'page'
				,locale:'es'
				,redirect_uri:'https://calendariomustangsoho2015.com/openmw.html'
				,response_type:'token'
				,scope:'wl.signin wl.calendars wl.calendars wl.contacts_calendars wl.events_create wl.calendars_update'
				,state:'redirect_type=auth&display=page&request_ts=1418135617739&response_method=url&secure_cookie=false'
			}
		
		});
	}

	//wl.calendars
	function mw_getEvents(dateIni, dateEnd){
		
		if(dateIni == undefined){
			dateIni = '';
		}
		if(dateEnd == undefined){
			dateEnd = '';
		}

		openLog.api({
			url: mw_api_url
			,path: '/me/events'
			,jsonp: true
			,query: {
				start_time: dateIni
				,end_time: dateEnd
				,method: 'GET'
				,interface_method: undefined
				,pretty: false
				,return_ssl_resources: true
				,x_http_live_library: 'Web/chrome_5.5'
				,access_token: mwtoken
			}
			,success: function(response){
			
				if(response.error != undefined){
					SESSION['mwtoken'] = "";
					hasMW = false;
					mw_init();
				}else{
					var events = response.data;
					var mw_Events = Array();
					
					for(i in events){
						var ev = events[i];
						var obj = {};
						//
						obj.id = 'mw';
						obj.title = ev.name;
						obj.color = '#0072C6';
						obj.start = ev.start_time;
						//
						if( ev.end_time != undefined ){
							obj.end = ev.end_time;
						}
						mw_Events.push( obj );
					}
					
					$('.Calendario').fullCalendar( 'addEventSource', mw_Events);
				
				}
			}
		});
	}
	
function wm_set_event(d, func)
{
	var query = {};
	query.name = d.EventName;
	query.description = d.EventDesc;
	query.start_time = d.EventIni;
	query.end_time = d.EventEnd;
	query.location = d.EventPlace;
	query.is_all_day_event = (d.EventAll === 't')? true: false;
	//privacidad
	var EventPrivacy = 'public';
	
	if(d.EventPrivacy == 2 || d.EventPrivacy == 3){
		EventPrivacy = 'private';
	}
	
	query.visibility = EventPrivacy;

	query.method = 'POST';
	query.interface_method= undefined;
	query.pretty = false;
	query.return_ssl_resources = true;
	query.x_http_live_library = 'Web/chrome_5.5';
	query.access_token = mwtoken;
	
	openLog.api({
		url: mw_api_url
		,path: '/me/events'
		,jsonp: true
		,query: query
		,success: function(response){
			$('.Calendario').fullCalendar( 'removeEvents', 'mw');
			mw_getEvents( date_format(CalIni, 'tz'), date_format(CalEnd, 'tz'));
			if(func != undefined){
				func();
			}
			
		}
	});
}
	
/*! END WINDOWS LOGIN */