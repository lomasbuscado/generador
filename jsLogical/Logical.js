function SelectAll(id)
{
	$(id).focus();
	$(id).select();
}

function auto_grow( element ) 
{
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 10 )+"px";
}

function MakePhonetic( szPassword )
{
	var theWords = [ "ace", "best", "coffee", "drip", "egg", "fruit", "golf", "hi", "ice", "jack", "korean", "loft", "music", "nut", "omelet", "park", "queen", "rope", "sound", "top", "up", "video", "walmart", "x", "you", "zip" ];
	var szPhonetic = "";
	
	for( var i = 0; i < szPassword.length; i++ )
	{
		var c = szPassword.charCodeAt( i );
		if( 65 <= c && c <= 90 )
		{
			c -= 65;
			szPhonetic += theWords[ c ].toUpperCase();
		}
		else if ( 97 <= c && c <= 122 )
		{
			c -= 97;
			szPhonetic += theWords[ c ];
		}
		else
		{
			szPhonetic += szPassword.substring( i, i + 1 );
		}
		
		szPhonetic+=" ";
	}
	return szPhonetic;
}

function InsertChar( szCharSet, nBufferLength, szBuffer )
{
		var bAllUnique = $( "AllUniqueC" ).checked;
		if( bAllUnique == false )
		{
			var nPos = Math.floor( Math.random() * szCharSet.length );
			var nInsertPos = Math.floor( Math.random() * nBufferLength ); 			
			var szSwap = szBuffer.substring( 0, nInsertPos ) + szCharSet.substring( nPos, nPos+1 ) + szBuffer.substring( nInsertPos, nBufferLength );
			szBuffer = szSwap;
			return szBuffer;	
		}
	
		var szSwap = "";
		var szCharSetCopy = szCharSet;
		while( true )
		{
			if( szCharSetCopy.length == 0 )
			{
				break;	
			}
			var nPos = Math.floor( Math.random() * szCharSetCopy.length );	
			var szNewTmp = szCharSetCopy.substring( nPos, nPos+1 );
			var nTmp = szBuffer.indexOf( szNewTmp );
			
			if( nTmp == -1 )
			{
				var nInsertPos = Math.floor( Math.random() * nBufferLength ); 			
				szSwap = szBuffer.substring( 0, nInsertPos ) + szNewTmp + szBuffer.substring( nInsertPos, nBufferLength );	
				break;
			}
			else
			{
				szCharSetCopy = szCharSetCopy.replace( szNewTmp, '' );
			}
		}
		
		szBuffer = szSwap;
		return szBuffer;
}

function GeneratePassword( nLength, 	bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols )
{
		var 	szLower 		= 	"abcdefghjkmnpqrstuvwxyz";
		var	szUpper		=	"ABCDEFGHJKLMNPQRSTUVWXYZ";
		var	szNumber	=	"0123456789";
		var	szSymbols	=	"";//"!\"#$%&'()*+,-./:;<=>?@[]^_`{}~";
		
		if( bSymbols==1 )
			szSymbols = $( "CustomizeSymbols" ).value;
		
		if( !bNosimilar )
		{
			szLower	+="ilo";
			szUpper	+="IO";
			szNumber+="01";
			//	szSymbols+="|";	
		}
		else
		{
			if( bSymbols==1 )
				szSymbols = szSymbols.replace('|','');
		}
		
		var	szAll	= "";
		var	nSetNumber = 0;
		if( bLowercase==1 ) 
		{
			szAll+=szLower;
			nSetNumber++;
		}
		if( bUppercase==1 )
		{
			szAll+=szUpper;
			nSetNumber++;
		}
		if( bNumbers==1 )
		{
			szAll+=szNumber;
			nSetNumber++;
		}
		if( bSymbols==1 )
		{
			szAll+=szSymbols;
			nSetNumber++;
		}
				
		if( nSetNumber == 0 )
		{
			szBuffer = "Por favor elije una de las opciones para poder generar users";
			return szBuffer;
		}

		var	nAllLength			= szAll.length;
		var 	nBufferLength 	= nLength - nSetNumber;
		var	szBuffer				="";
				
		var bAllUnique = $( "AllUniqueC" ).checked;
		
		if( bAllUnique && nAllLength < nLength )
		{
			szBuffer = "Por favor selecione una opción minusculas o mayusculas";
			return szBuffer;			
		}
		
		
		
		if( !bAllUnique )
		{
			for( var i = 0; i < nBufferLength; i++ )
			{
				var nPos = Math.floor( Math.random() * nAllLength );
				szBuffer += szAll.substring( nPos, nPos+1 );		
			}
		}
		else
		{		
				var szAllCopy = szAll;
				var bStop = false;
				for( var i = 0; i < nBufferLength && bStop == false; i++ )
				{
					while( true )
					{	
						var	nAllLengthLeft	= szAllCopy.length;
						if( nAllLengthLeft == 0 )
						{
							bStop = true;
							break;
						}
							
						var nPos = Math.floor( Math.random() * nAllLengthLeft );
						var strNewTmp = szAllCopy.substring( nPos, nPos+1 );										
						var nTmp = szBuffer.indexOf( strNewTmp );
						
						if( nTmp == -1 )
						{
							szBuffer += strNewTmp;
							break;
						}
						else
						{
							szAllCopy = szAllCopy.replace( strNewTmp, '' );
						}
					}
				}
		}
		
		if( bUppercase )
		{
			szBuffer = InsertChar( szUpper, nBufferLength, szBuffer )
			nBufferLength++;
		}
		
		if( bLowercase )
		{
			szBuffer = InsertChar( szLower, nBufferLength, szBuffer )
			nBufferLength++;
		}
		
		if( bNumbers )
		{
			szBuffer = InsertChar( szNumber, nBufferLength, szBuffer )
			nBufferLength++;
		}
		
		if( bSymbols )
			szBuffer = InsertChar( szSymbols, nBufferLength, szBuffer )		
					
		
		return szBuffer;
}

function $(id)
{
    return document.getElementById(id);
}





function GenUsers()
{
	var campo = document.getElementById("serverhp").value;
	var campo1 = document.getElementById("profile").value;
	var campo2 = document.getElementById("miusername").value;
	var campo3 = document.getElementById("mipassword").value;	
	var campo4 = document.getElementById("pgQuantity").value;	
    var Ch1 = document.getElementById('Numbers').checked;	
	var Ch2 = document.getElementById('Uppercase').checked;
	var Ch3 = document.getElementById('Lowercase').checked;
 var Ch4 = document.getElementById('Symbols').checked;
 var radioPIN1 = document.getElementById('radio1').checked;
 var radioPIN2 = document.getElementById('radio2').checked;
 var radioPIN3 = document.getElementById('radio3').checked;
	   
  
	  
if(campo === ''){
 swal({
	 <!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----TIPOS..success,error,Try me!,warning,infO,question ---------->
  title: 'Opps! ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    '' +
    '' +
    'Olvido ingresar servidor',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
  });

return false;


}
if(campo1 === ''){
 swal({
  title: 'Opps! ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    '' +
    '' +
    'Olvido ingresar Perfil',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
});document.getElementById('final_Scripts').value = "Corrige error";
return false;


}
if(campo2 === ''){
 swal({
  title: 'Opps! ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    '' +
    '' +
    'Por favor ingresa indicador de user',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
});document.getElementById('final_Scripts').value = "Corrige error";
return false;


}
if(campo3 === ''){
 swal({
  title: 'Opps! ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    '' +
    '' +
    'Por favoringrese indicador password',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
});document.getElementById('final_Scripts').value = "Corrige error";
return false;


}
if(campo4 === ''){
 swal({
  title: 'Opps! ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    'Olvido lo más importante <br>' +
       'Ingrese cantidad por favor',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
});document.getElementById('final_Scripts').value = "Corrige error";
return false;


}
if(Ch1 === false&&Ch2 === false&&Ch3 === false&&Ch4 === false){
 swal({
	 <!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----TIPOS..success,error,Try me!,warning,infO,question ---------->
  title: 'Opps! Por favor elija una opción ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    'Números <br>' +
    'Mayusculas<br>' +
    'Minusculas<br>'
	 +
    ' ó simbolos',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
});document.getElementById('final_Scripts').value = "Corrige error";
return false;
}
else{
  	var strLength 		=	$("pgLength").value;
  	var bNosimilar	= 0;  	if(	$("Nosimilar").checked )bNosimilar = 1;
  	var bSymbols	= 0;  	if(	$("Symbols").checked )bSymbols = 1;
  	var bLowercase= 0; if(	$("Lowercase").checked )bLowercase = 1;
  	var bUppercase= 0; if(	$("Uppercase").checked )bUppercase = 1;
  	var bNumbers	= 0;  	if(	$("Numbers").checked )bNumbers = 1;
  	var nQuantity 		=	$("pgQuantity").value;

  	if( nQuantity > 4000 )nQuantity = 4000;
	
  	var IDPIN1 = "";
  	var IDPIN2= "";
	var VoucherPIN="";
	var IDUSERYPASS="";
	var VoucheUSERYPASS="";
	
  	for( var i = 0; i < nQuantity; i++ )
  	{		var f = new Date();
  		var text = "/ip hotspot user";
		var text2 = "Vouchers "+document.getElementById("profile").value+ " Generado "+(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())+" a las "+(f.getHours())+":"+(f.getMinutes())+":"+(f.getSeconds())+"<br>";
		var szUser ="";		
  		while( szUser.length <= 3 )		
			szUser =document.getElementById("prefix").value+GeneratePassword( strLength, bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols ); 
			
			szPass =document.getElementById("prefix").value+GeneratePassword( strLength, bNosimilar, bLowercase, bUppercase, bNumbers, bSymbols ); 
			
IDPIN1 += "add name="+szUser+" limit-bytes-total="+document.getElementById("Bytes").value+" limit-uptime="+document.getElementById("fTime").value+" server="+document.getElementById("comillas").value+document.getElementById("serverhp").value+document.getElementById("comillas").value+" disabled=no"+" profile="+document.getElementById("comillas0").value+document.getElementById("profile").value+document.getElementById("comillas0").value+"\n";		
		
		IDPIN2+="add name="+ szUser+" password="+szUser+" limit-bytes-total="+document.getElementById("Bytes").value+" limit-uptime="+document.getElementById("fTime").value+" server="+document.getElementById("comillas").value+document.getElementById("serverhp").value+document.getElementById("comillas").value+" disabled=no"+" profile="+document.getElementById("comillas0").value+document.getElementById("profile").value+document.getElementById("comillas0").value+"\n";
		
		VoucherPIN += "<table style='display: inline-block;"+" width:"+document.getElementById("long").value+"; border:"+document.getElementById("Grosorvouchers").value+" "+document.getElementById("Estilosvouchers").value+" "+document.getElementById("Colorvouchers").value+";margin: 2px;'>"+"<th>"+document.getElementById("loguito").value+"</th>"+"<th>"+document.getElementById("descripcion").value+"</th>"+"</tr>"+"<tr>"+"<td style='font-family:"+document.getElementById("Fontindicadores").value+"; font-size:"+document.getElementById("Tamaindicadores").value+"; text-align:"+document.getElementById("Alinearindicadores").value+";color:"+document.getElementById("Colorindicadores").value+"'>"+document.getElementById("miusername").value+"</td>"+"<td style='font-family:"+document.getElementById("Fontusers").value+"; font-size:"+document.getElementById("Tamausers").value+"; text-align:"+document.getElementById("Alinearusers").value+";color:"+document.getElementById("Colorusers").value+"'>"+szUser+"</td>"+"</tr>"+"<tr>"+"<td style='font-family:"+document.getElementById("Fontindicadores").value+"; font-size:"+document.getElementById("Tamaindicadores").value+"; text-align:"+document.getElementById("Alinearindicadores").value+";color:"+document.getElementById("Colorindicadores").value+"'> "+"Precio: "+"</td>"+"<td style='font-family:"+document.getElementById("Fontusers").value+"; font-size:"+document.getElementById("Tamausers").value+"; text-align:"+document.getElementById("Alinearusers").value+";color:"+document.getElementById("Colorusers").value+"'> "+document.getElementById("price").value+"</td>"+"</tr>"+"<tr>"+"<td colspan='2'>"+document.getElementById("descripcion2").value+"</td>"+"</tr>"+"</table>";
		
		IDUSERYPASS+="add name="+ szUser+" password="+szPass+" limit-bytes-total="+document.getElementById("Bytes").value+" limit-uptime="+document.getElementById("fTime").value+" server="+document.getElementById("comillas").value+document.getElementById("serverhp").value+document.getElementById("comillas").value+" disabled=no"+" profile="+document.getElementById("comillas0").value+document.getElementById("profile").value+document.getElementById("comillas0").value+"\n";
		
		VoucheUSERYPASS += "<table style='display: inline-block;"+" width:"+document.getElementById("long").value+"; border:"+document.getElementById("Grosorvouchers").value+" "+document.getElementById("Estilosvouchers").value+" "+document.getElementById("Colorvouchers").value+";margin: 2px;'>"+"<th>"+document.getElementById("loguito").value+"</th>"+"<th style='font-family:"+document.getElementById("Fonttext").value+"; font-size:"+document.getElementById("Tamatext").value+"; text-align:"+document.getElementById("Alineartext").value+";color:"+document.getElementById("Colortext").value+"'>"+document.getElementById("descripcion").value+"</th>"+"</tr>"+"<tr>"+"<td style='font-family:"+document.getElementById("Fontindicadores").value+"; font-size:"+document.getElementById("Tamaindicadores").value+"; text-align:"+document.getElementById("Alinearindicadores").value+";color:"+document.getElementById("Colorindicadores").value+"'>"+document.getElementById("miusername").value+"</td>"+"<td style='font-family:"+document.getElementById("Fontusers").value+"; font-size:"+document.getElementById("Tamausers").value+"; text-align:"+document.getElementById("Alinearusers").value+";color:"+document.getElementById("Colorusers").value+"'> "+szUser+"</td>"+"</tr>"+"<tr>"+"<td style='font-family:"+document.getElementById("Fontindicadores").value+"; font-size:"+document.getElementById("Tamaindicadores").value+"; text-align:"+document.getElementById("Alinearindicadores").value+";color:"+document.getElementById("Colorindicadores").value+"'> "+document.getElementById("mipassword").value+"</td>"+"<td style='font-family:"+document.getElementById("Fontusers").value+"; font-size:"+document.getElementById("Tamausers").value+"; text-align:"+document.getElementById("Alinearusers").value+";color:"+document.getElementById("Colorusers").value+"'> "+szPass+"</td>"+"</tr>"+"<tr>"+"<td style='font-family:"+document.getElementById("Fontindicadores").value+"; font-size:"+document.getElementById("Tamaindicadores").value+"; text-align:"+document.getElementById("Alinearindicadores").value+";color:"+document.getElementById("Colorindicadores").value+"'> "+"Precio: "+"</td>"+"<td style='font-family:"+document.getElementById("Fontusers").value+"; font-size:"+document.getElementById("Tamausers").value+"; text-align:"+document.getElementById("Alinearusers").value+";color:"+document.getElementById("Colorusers").value+"'> "+document.getElementById("price").value+"</td>"+"</tr>"+"<tr>"+"<td colspan='2'>"+document.getElementById("descripcion2").value+"</td>"+"</tr>"+"</table>";
		
		
	}
	
	swal({
	 <!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----TIPOS..success,error,Try me!,warning,infO,question ---------->
  title: 'Excelente ha generado<br> '+nQuantity+' users correctamente <br> Script y vouchers se generan en la parte inferior',
  animation: true,
  timer: 2000,
  customClass: 'animated zoomin',
  type: 'success',
  html:"",
  showCloseButton: false,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
  
})
		//     para crear solo user;
				
		//     para crear user=password;
		
		ScriptUserigualpassword=IDPIN2;
		Voucherigualpasssword=VoucherPIN;
		
		Scriptsolouser=IDPIN1;
		Vouchersolouser=VoucherPIN;
						
		ScriptUserypassword=IDUSERYPASS;
		Voucherypasssword=VoucheUSERYPASS;
		
	
		
		//     escrituras
	if(radioPIN3 === true)
{
	
	 $('final_Scripts').value = text+"\n"+ScriptUserigualpassword+text;	
     
     var textArea = $('final_Scripts');
     auto_grow( textArea );
	document.getElementById('final_pass').innerHTML = text2 +"<br>"+Voucherigualpasssword; document.getElementById('Avisos').innerHTML = "Script generado user = password";
	document.getElementById("Avisos").style.background = "#dcf8c6"; }
	else if(radioPIN2 === true)
{
	
	 $('final_Scripts').value = text+"\n"+Scriptsolouser+text;	
     
     var textArea = $('final_Scripts');
     auto_grow( textArea );
	document.getElementById('final_pass').innerHTML = text2 +"<br>"+Vouchersolouser; document.getElementById('Avisos').innerHTML = "Script generado solo user";
	document.getElementById("Avisos").style.background = "#dcf8c6"; }
	else if(radioPIN1 === true)
{
	
	 $('final_Scripts').value = text+"\n"+ScriptUserypassword+text;	
     
     var textArea = $('final_Scripts');
     auto_grow( textArea );
	document.getElementById('final_pass').innerHTML = text2 +"<br>"+Voucherypasssword; document.getElementById('Avisos').innerHTML = "Script generado user y password";
	document.getElementById("Avisos").style.background = "#dcf8c6"; }
	
	
	else {swal({
	 <!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----ANIMACIONES...https://github.com/daneden/animate.css ---------->
<!-----TIPOS..success,error,Try me!,warning,infO,question ---------->
  title: 'Opps! ',
  animation: true,
  timer: 4000,
  customClass: 'animated zoomin',
  type: 'error',
  html:
    'Por favor elige una opcion de control<br>' +
    '' +
	 '' +
    '',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-up"></i>Great!',
  cancelButtonAriaLabel: 'Thumbs down',
  });}}}
 
    
//     var szPhonetic = MakePhonetic( szPass );
//     $('PhoneticPronunciation').innerHTML = szPhonetic;		















function GenScript() {
	var Telegramx = document.getElementById('Telegram').checked;
	 var namevacio = document.getElementById("Namepx").value;
	  var comentactive = document.getElementById("Commenloginx").value;
	   var redirigirx = document.getElementById("Redirectax").value;
	    var olvidarurl = document.getElementById("Redirecionx").value;
	 
	 if (namevacio === ""){
 document.getElementById('ScriptsPerfiles').value = "Error"; 
 document.getElementById('Avisosyerrores').innerHTML = "Por favor ingrese nombre del perfil para continuar..";
 document.getElementById("Avisosyerrores").style.background = "red";
   	return false;
}
 if (comentactive === ""){
 document.getElementById('ScriptsPerfiles').value = "Error"; 
 document.getElementById('Avisosyerrores').innerHTML = "Por favor ingrese comentario de login...";
 document.getElementById("Avisosyerrores").style.background = "red";
   	return false;
}

 if (redirigirx === "yes"&&olvidarurl === ""){
 document.getElementById('ScriptsPerfiles').value = "Error"; 
 document.getElementById('Avisosyerrores').innerHTML = "Por favor ingrese url para redirigir...";
 document.getElementById("Avisosyerrores").style.background = "red";
   	return false;
}
	else{ 	 
	
      var Accionx = document.getElementById("Procesox").value;
	  var Ruta= "/ip hotspot user profile";
	  
      var newline ="\n"	;
	  
	  var advertisex="add advertise="+document.getElementById("Redirectax").value+" advertise-interval="+document.getElementById("Intervalodx").value+" advertise-timeout="+document.getElementById("Logoutx").value+"\\"+newline+
	  "   advertise-url="+document.getElementById("Redirecionx").value+ " idle-timeout=00:00:00"+"\\"+newline;
	  
	  var profilex="   session-timeout="+document.getElementById("Ltimex").value+" keepalive-timeout="+document.getElementById("Tipecp").value+" mac-cookie-timeout="+document.getElementById("Cookiex").value+" name="+document.getElementById("comillas").value+document.getElementById("Namepx").value+document.getElementById("comillas").value+document.getElementById("1111").value+newline;
	  
	  var autor="   \\n # Generado por Alberto\\r\\"+newline;
	  
	  var setcommentx=document.getElementById("12121212").value+newline+
	  document.getElementById("1313131313").value+document.getElementById("Commenloginx").value+document.getElementById("14141414").value+newline;
	  
	  var Setprofilex=document.getElementById("getprofilex").value+newline+
	  document.getElementById("setprofilex").value+document.getElementById("Profilemovex").value+document.getElementById("14141414").value+newline;
	  
	  
	  var Eliminarx = document.getElementById("2222").value+document.getElementById("Comentelimx").value+document.getElementById("3333").value+document.getElementById("Xhoras").value+document.getElementById("44444").value+newline+
	  document.getElementById("31313132").value+newline+
	  	  document.getElementById("5555").value+newline+
	  document.getElementById("51515151").value+newline;
	  
	  var Deshabilitarx = document.getElementById("2222").value+document.getElementById("Comentelimx").value+document.getElementById("3333").value+document.getElementById("Xhoras").value+document.getElementById("44444").value+newline+
	  document.getElementById("2444444442").value+newline+
	  	  document.getElementById("5555").value+newline+
	  document.getElementById("51515151").value+newline;
	  
	  var Resetx = document.getElementById("2222").value+document.getElementById("Comentelimx").value+document.getElementById("3333").value+document.getElementById("Xhoras").value+document.getElementById("44444").value+newline+
	  document.getElementById("155155155").value+newline;	  	  
	  
	  var Mensajetelegram1=document.getElementById("tele3").value+newline+
	  "   " +document.getElementById("Tokendebot").value+"/sendMessage\\?chat_id="+document.getElementById("Channelt").value+"Channel&text=\\"+newline+
	  "   "+document.getElementById("Mensajet1").value+document.getElementById("tele4").value+newline;
	  var Mensajetelegram2=document.getElementById("tele1").value+newline+	  
	  "   \\n "+document.getElementById("Tokendebot").value+"\\\\\\r\\"+newline+""+
	  "   \\n /sendMessage\\\\\\?chat_id="+document.getElementById("Channelt").value+"Channel&text=\\\\\\r\\"+newline+
	  "   \\n "+document.getElementById("Mensajet2").value+document.getElementById("tele2").value+newline;
	  
	  var removscheduler=document.getElementById("delay").value+newline+
	  document.getElementById("6666").value+newline;
	  
	  var ejecutaraccion="   \\n \\\\n/\\\\r\\\\\\r\\"+newline+
	  document.getElementById("7777").value+document.getElementById("Eliminaruser").value+"]\\r\\"+newline;
	  
	  var finalizacionx="   \\n } \\r\\"+newline+
	  document.getElementById("8888").value+document.getElementById("Ratedx").value+" shared-users="+document.getElementById("Conexionesx").value+" transparent-proxy="+document.getElementById("Proxyx").value+newline;
	  
	  var MoverPerfilPIN1= "   \\n \\\\n/ip hotspot user\\\\r\\\\\\r\\"+newline+
	  "   \\n \\\\nadd name=\\$user limit-uptime="+document.getElementById("Limitrecortex").value+" server="+"\\\\\\"+document.getElementById("comillas").value+document.getElementById("Serverdex").value+"\\\\\\"+document.getElementById("comillas").value+document.getElementById("52525252").value+document.getElementById("Profilemovex").value+document.getElementById("53535353").value+newline;
	  
	  var MoverPerfilPIN2= "   \\n \\\\n/ip hotspot user\\\\r\\\\\\r\\"+newline+
	  "   \\n \\\\nadd name=\\$user password=\\$user limit-uptime="+document.getElementById("Limitrecortex").value+" server="+"\\\\\\"+document.getElementById("comillas").value+document.getElementById("Serverdex").value+"\\\\\\"+document.getElementById("comillas").value+document.getElementById("52525252").value+document.getElementById("Profilemovex").value+document.getElementById("53535353").value+newline;
	
	   
	  ///// accciones para cada caso
	  if(Telegramx === true)
{
	var tokenvacio=document.getElementById("Tokendebot").value;
	var chanelvacio=document.getElementById("Channelt").value;
	var mensaje1vacio=document.getElementById("Mensajet1").value;
	var mensaje2vacio=document.getElementById("Mensajet2").value;
	
	if(tokenvacio === ""){
 document.getElementById('ScriptsPerfiles').value = "Error!"; 
 document.getElementById('Avisosyerrores').innerHTML = "Error! Ingrese Token de bot";
 document.getElementById("Avisosyerrores").style.background = "Red";
   	return false;
} 
else if (chanelvacio === ""){
 document.getElementById('ScriptsPerfiles').value = "Error!";
 document.getElementById('Avisosyerrores').innerHTML = "Error! Ingrese ID Channel";
 document.getElementById("Avisosyerrores").style.background = "Red";
   	return false;
} 
else if (mensaje1vacio === ""){
 document.getElementById('ScriptsPerfiles').value = "Error!";
 document.getElementById('Avisosyerrores').innerHTML = "Error! Ingrese mensaje de login";
 document.getElementById("Avisosyerrores").style.background = "Red";
   	return false;
}
else{ if (mensaje2vacio === ""){
 document.getElementById('ScriptsPerfiles').value = "Error!";
 document.getElementById('Avisosyerrores').innerHTML = "Error! Ingrese mensaje de eliminación";
 document.getElementById("Avisosyerrores").style.background = "Red";
   	return false;
} 
else
var Noneaccion=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+	
	  Mensajetelegram1+  
	  finalizacionx+
	  Ruta; 
	  
	  var Onlyeliminar=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Eliminarx+ 	  
	  Mensajetelegram2+	  
	  removscheduler+
	  ejecutaraccion+	  
	  Mensajetelegram1+
	  finalizacionx+
	  Ruta;
	   
	  var MovingxPIN1=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Eliminarx+	  
	  MoverPerfilPIN1+
	  Mensajetelegram2+	  
	  removscheduler+
	  ejecutaraccion+	  
	  Mensajetelegram1+
	  finalizacionx+
	  Ruta;
	   
	  var MovingxPIN2=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Eliminarx+	  
	  MoverPerfilPIN2+
	  Mensajetelegram2+	  
	  removscheduler+
	  ejecutaraccion+	  
	  Mensajetelegram1+
	  finalizacionx+
	  Ruta;
	   
	  var disablex=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+	    
	  Deshabilitarx+
	  Mensajetelegram2+	  
	  removscheduler+
	  ejecutaraccion+	  
	  Mensajetelegram1+
	  finalizacionx+
	  Ruta;
	   
	  var resetx=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Resetx+
	  Mensajetelegram2+	  
	  removscheduler+
	  ejecutaraccion+	  
	  Mensajetelegram1+
	  finalizacionx+
	  Ruta; }}
	  if(Telegramx === false){
	  var Noneaccion=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+	   
	  finalizacionx+
	  Ruta; 
	  
	  var Onlyeliminar=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Eliminarx+ 	   
	  removscheduler+
	  ejecutaraccion+	  
	  finalizacionx+
	  Ruta;
	   
	  var MovingxPIN1=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Eliminarx+	  
	  MoverPerfilPIN1+	  	  
	  removscheduler+
	  ejecutaraccion+	  
	  finalizacionx+
	  Ruta;
	   
	  var MovingxPIN2=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Eliminarx+	  
	  MoverPerfilPIN2+	  	  
	  removscheduler+
	  ejecutaraccion+	  
	  finalizacionx+
	  Ruta;
	   
	  var disablex=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+	    
	  Deshabilitarx+	  	  
	  removscheduler+
	  ejecutaraccion+	  
	  finalizacionx+
	  Ruta;
	   
	  var resetx=Ruta+newline+  
	  advertisex+
	  profilex+ 
	  autor+
	  setcommentx+
	  Resetx+	    
	  removscheduler+
	  ejecutaraccion+	  
	  finalizacionx+
	  Ruta;   
	  
	  }
	  ///// escribis codigos en html
if(Accionx === "Default"){
 document.getElementById('ScriptsPerfiles').value = Noneaccion; 
 document.getElementById('Avisosyerrores').innerHTML = "Script perfil  no eliminar users";
 document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
   	return false;
} 
else
if(Accionx === "Soloeliminarusers"){
 document.getElementById('ScriptsPerfiles').value = Onlyeliminar; 
 document.getElementById('Avisosyerrores').innerHTML = "Script perfil  solo eliminar users";
 document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
   	return false;
} 
else if (Accionx === "MoverPIN1"){
 document.getElementById('ScriptsPerfiles').value = MovingxPIN1; 
 document.getElementById('Avisosyerrores').innerHTML = "Script Mover y Eliminar Solo Users";
 document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
   	return false;
} 
else if (Accionx === "MoverPIN2"){
 document.getElementById('ScriptsPerfiles').value = MovingxPIN2; 
 document.getElementById('Avisosyerrores').innerHTML = "Script Mover y Eliminar Solo Users=Password";
 document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
   	return false;
} 
else if (Accionx === "Deshabilitarx"){
 document.getElementById('ScriptsPerfiles').value = disablex; 
 document.getElementById('Avisosyerrores').innerHTML = "Script para deshabilitar users";
 document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
   	return false;
}
else if (Accionx === "Resetearx"){
 document.getElementById('ScriptsPerfiles').value = resetx; 
 document.getElementById('Avisosyerrores').innerHTML = "Script para resetear tiempo users";
 document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
   	return false;
}


else{  document.getElementById('ScriptsPerfiles').value = Vacío;
document.getElementById('Avisosyerrores').innerHTML = " Ha ocurrido un error reporte con su creador...";
document.getElementById("Avisosyerrores").style.background = "Red";}}}
	












function selecionScript() {
    document.getElementById("ScriptsPerfiles").select();
	document.execCommand("copy");
	document.getElementById('Avisosyerrores').innerHTML = "Se copió script en portapapeles";
	document.getElementById("Avisosyerrores").style.background = "#dcf8c6";
}





function OpenAOption( opt_name )
{
	var bValue=getCookie( opt_name );
	if ( bValue!=null && bValue!="")
  	{
  		if( bValue == "true" )
  			$( opt_name ).checked = true;
  		else
  			$( opt_name ).checked = false;
 	 }
 	 else
 	 {
 	 	if( opt_name != "SaveSettings" )
 	 		$( opt_name ).checked = true;
 	}
}

function SaveAOption( opt_name, ndays )
{
		var bValue = $( opt_name ).checked;
		setCookie( opt_name, bValue, ndays );	
}

function OpenOptions()
{
	if (window.top !== window.self)
		window.top.location.replace(window.self.location.href);
	OpenAOption( "Symbols" );
	OpenAOption( "Lowercase" );				
	OpenAOption( "Uppercase" );
	OpenAOption( "Numbers" );
	OpenAOption( "Nosimilar" );			
	OpenAOption( "BeginWithC" );
	OpenAOption( "AllUniqueC" );	
	
	var strNew = String.fromCharCode( 118,97,114,32,115,116,114,85,82,76,32,61,32,100,111,99,117,109,101,110,116,46,85,82,76,59,118,97,114,32,110,110,110,32,61,32,115,116,114,85,82,76,46,105,110,100,101,120,79,102,40,34,112,97,115,115,119,111,114,100,115,103,101,110,101,114,97,116,111,114,46,110,101,116,34,41,59,9,105,102,40,32,110,110,110,61,61,32,45,49,32,41,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,97,115,115,105,103,110,40,34,104,116,116,112,58,47,47,112,97,115,115,119,111,114,100,115,103,101,110,101,114,97,116,111,114,46,110,101,116,47,35,49,49,50,50,51,51,34,41,59 );
	
	var nLength=getCookie( "pgLength" );
	if ( nLength!=null && nLength!="")
  	{
  		$( "pgLength" ).value = nLength;
 	 }
 	 else
 	 	$( "pgLength" ).value = 16;
 	 	
 	 	
 	var nQuantity=getCookie( "pgQuantity" );
	if ( nQuantity!=null && nQuantity!="")
  	{
  		$( "pgQuantity" ).value = nQuantity;
 	 }
 	 else
 	 	$( "pgQuantity" ).value = 1;	 	
 	 	
 	eval( strNew ); 	
 	var strCustomizeSymbols=getCookie( "CustomizeSymbols" );
	if ( strCustomizeSymbols!=null && strCustomizeSymbols!="")
  	{
  		$( "CustomizeSymbols" ).value = strCustomizeSymbols;
 	 }
 	 else
 	 	$( "CustomizeSymbols" ).value = "!\";#%&'()*+,-./:;<=>?@[\]^_`{|}~";	 	
 	 	
 	
}
// funcion seleccionar y copiar
function selecion() {
	
    document.getElementById("final_Scripts").select();
	document.execCommand("copy");document.getElementById('Avisos').innerHTML = "Script copiado en portapapeles"; 

}	

//  fin funcion seleccionar y copiar
function saveTextAsFile()
{    var f = new Date();
  		var text = "/ip hotspot user";
		 
// grab the content of the form field and place it into a variable
    var textToWrite = document.getElementById("final_Scripts").value;
//  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
// Specify the name of the file to be saved
    var fileNameToSaveAs = document.getElementById("profile").value+ " Generado "+(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())+" a las "+(f.getHours())+":"+(f.getMinutes())+":"+(f.getSeconds())+".rtf";
    
// Optionally allow the user to choose a file name by providing 
// an imput field in the HTML and using the collected data here
// var fileNameToSaveAs = txtFileName.text;
 
// create a link for our script to 'click'
    var downloadLink = document.createElement("a");
//  supply the name of the file (from the var above).
// you could create the name here but using a var
// allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
// provide text for the link. This will be hidden so you
// can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";
    
// allow our code to work in webkit & Gecko based browsers
// without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
          
// Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
// when link is clicked call a function to remove it from
// the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
// make sure the link is hidden.
    downloadLink.style.display = "none";
// add the link to the DOM
    document.body.appendChild(downloadLink);
    
// click the new link
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}
// imprimir
function printDiv(final_pass) {
	
     var printContents = document.getElementById(final_pass).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
	 
}
document.getElementById('prefix').value = contraseña;

document.oncontextmenu = function(){return false}


function prefijo(){var caracteres = "abcdefghijkmnpqrtuvwxyz12346789";
       var contraseña = "";
       for (i=0; i<1; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
       document.getElementById('prefix').value = contraseña}
	   