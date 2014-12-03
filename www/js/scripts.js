var MOBILE = true;
var SITE_URL = 'https://irisdev.co/calendar_app/';
var SESSION = window.sessionStorage;


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
	
	var fbcookie = $.parseJSON( getCookie('fbtoken') ); 
	
	if(fbcookie != null){
		SESSION['fbtoken'] = fbcookie.ide;
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
		
		loadCont(SITE_URL+'app?pedir=cookie&name=fbtoken', function(d){
			if(d != ""){
				fbcookie = $.parseJSON( d );
				SESSION['fbtoken'] = fbcookie.ide;
			}
		});
	}
});




function ak_navigate(from, to, effect){
	var fx = (effect != undefined)? effect : 'toLeft';
	$(from).removeClass('toCenter toLeft toRight');
	$( to ).removeClass('toCenter toLeft toRight');
	$(from).addClass(fx);
	$( to ).addClass('toCenter');
}


/* FUNCIONAMIENTO DE LA APLICACION */


function form_login(form){
	
	ak_validate(form, {
		ajax: false
		,bt: '#BtnCodigo'
		,func : function(data){
			//
			loadCont( SITE_URL+'app?pedir=codigo&num='+data.codigo, function(d){
				var obj = jQuery.parseJSON(d);
				$('#cortina').remove();
				
				if(obj.success === false){
					ak_showtip(  $(obj.selector), obj.msj );
				}else{
					ak_navigate('#login', '#home');
					init_calendar();			
				}
				
			});
			
		}
	});
	
	return false;
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
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek'
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
		//	mw_getEvents(ini, end);
			goo_getEvents(CalIni, CalEnd, CalMes);
			fb_set_birthdates();
		}
	});
	
	fb_init();
	//goo_init();
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
	var G_Events = Array();

	var clientId = '575669402911-5nabcf0k5qubc6ps2shbsi2uav3r5cid.apps.googleusercontent.com';
	// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
	// requests in the code.
	// The provided key works for this sample only when run from
	// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
	// To use in your own application, replace this API key with your own.
	var apiKey = 'AIzaSyCjSbIzogs1Row6dYqBmgR-NV6Kh32avOA';

	// To enter one or more authentication scopes, refer to the documentation for the API.
	var scopes = 'https://www.googleapis.com/auth/calendar';

	// Use a button to handle authentication the first time.
	function goo_init() {
		gapi.client.setApiKey(apiKey);
		window.setTimeout(goo_check, 1);
	}

	function goo_check() {
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, goo_result);
	}
	  
	function goo_result(authResult) {
		var authorizeButton = document.getElementById('authorize-button');
		if (authResult && !authResult.error) {
			$('#GCalConn').html('Esta conectado con Google Calendar.');
			authorizeButton.style.visibility = 'hidden';
			hasGC = true;
			goo_call();
		} else {
			
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = goo_login;
		}
	}

	function goo_login(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, goo_result);
        return false;
	}

      // Load the API and make an API call.  Display the results on the screen.
	function goo_call() {
	  
        gapi.client.load('calendar', 'v3', function() {

			var restRequest = gapi.client.request({
			  'path': 'calendar/v3/users/me/calendarList'
			//  , 'params': {'query': 'Google+', 'orderBy': 'best'}
			});
			
			restRequest.then(function(resp) {
				//temporar obtiene el primer calendario y lo pinta en el calendario del front
				var  G_Cal = resp.result.items[0];
				gapi.client.request({
				  'path': 'calendar/v3/calendars/'+G_Cal.id+'/events'
				}).then(function(resp) {
					G_Events = resp.result.items;
					goo_getEvents();
				});
			  
			}, function(reason) {
			//
			});
			
       });
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

	var request = gapi.client.calendar.events.insert({
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
}
	
	
	
	
/*! END GOOGLE API */


/*! FACEBOOK LOGIN */

	var F_Friends = Array();

	openFB.init('326339840802808');
	
	function fb_init() {
		if(SESSION['fbtoken'] && SESSION['fbtoken'] != "" ){
		
			$('.fbLoginMovil').css('display','none');
			hasFB = true;
			fb_get_birthdates();
			fb_get_events();
		}else{
			$('.fbLoginMovil').css('display','block');
			
		}
	}
	
	function fb_login(){
		openFB.login('public_profile,user_friends,friends_birthday,user_birthday,user_events,rsvp_event');
	}


function fb_get_birthdates(fb_user){
	openFB.api({
		path: '/v1.0/me/friends'
		,params: {
			'fields': 'id,name,birthday'
			,'limit': '5000'
		}
		,success: function(response){
			F_Friends = response.data;
			fb_set_birthdates();
		}
		,error: function(){
			SESSION['fbtoken'] = "";
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
	
	openFB.api({
		path: '/v1.0/me/events'
		,params: {}
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
	
	query.privacy_type = EventPrivacy;

	FB.api('/me/events', 'POST', query, function(response) {
		$('.Calendario').fullCalendar( 'removeEvents', 'fbe');
		fb_get_events();
		
		if(func != undefined){
			func();
		}
	});
}
	
/*! END FACEBOOK LOGIN */


/*! WINDOWS LOGIN */
//	WL.Event.subscribe("auth.login", mw_onLogin);
/*	
	WL.init({
		client_id: '00000000401374AC',
		redirect_uri: 'https://irisdev.co/calendar_app',
		scope: "wl.signin wl.calendars wl.calendars wl.contacts_calendars wl.events_create wl.calendars_update",
		response_type: "token"
	});
	WL.ui({
		name: "signin",
		element: "signin"
	});
*/	
	function mw_onLogin (session) {
		if (!session.error) {
			WL.api({
				path: "me",
				method: "GET"
			}).then(
				function (response) {
					document.getElementById("info").innerText = "Hello, " + response.first_name + " " + response.last_name + "!";
					hasMW = true;
					mw_getEvents();
				},
				function (responseFailed) {
					document.getElementById("info").innerText = "Error: " + responseFailed.error.message;
				}
			);
		}
		else {
			document.getElementById("info").innerText = "Error: " + session.error_description;
		}
	}
	
	//wl.calendars
	
	function mw_getEvents(dateIni, dateEnd){
		
		if(dateIni == undefined){
			dateIni = '';
		}
		if(dateEnd == undefined){
			dateEnd = '';
		}
	
		WL.api({
		//	path: "me/calendars",
			path: 'me/events?start_time='+dateIni+'&end_time='+dateEnd,
			method: "GET"
		}).then(
			function (response) {
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
				
			},
			function (responseFailed) {
				document.getElementById("info").innerText ="Error: " + responseFailed.error.message;
			}
		);
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
	
	WL.api({
		path: "me/events",
		method: "POST",
		body: query
	}).then(
		function (response) {
			$('.Calendario').fullCalendar( 'removeEvents', 'mw');
			mw_getEvents( date_format(CalIni, 'tz'), date_format(CalEnd, 'tz'));
			if(func != undefined){
				func();
			}
		},
		function (responseFailed) {
			//
		});
}
	
/*! END WINDOWS LOGIN */