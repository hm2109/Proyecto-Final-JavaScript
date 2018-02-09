//Inicializa variables de trabajo
var teclas;
var Calculadora;
var datos = []
var display;
var resultado = 0;
var calculadora;
var buffer = '';
var operacion;
var teclaPresionada;


//Define variable que guarda el código
Calculadora = {
	
	//Función que inicializa los elementos de la calculadora
	inicializarCalculadora: function() {
		//Toma posecion de elementos html globales
		display = document.getElementById('display');
		teclas = document.getElementsByClassName('tecla')

		//Asigna listener a todos los elementos de la clase tecla
		for (item = 0; item < teclas.length; item++) {
			teclas[item].addEventListener('mousedown', function() {
				Calculadora.capturarTeclas(this);
				Calculadora.reducirTecla(this);
			});
			teclas[item].addEventListener('mouseup', function() {
				Calculadora.ampliarTecla(this);
			});			
		};
	},

	//Función que evalúa la tecla presionada por el usuario y dependiendo de la tecla y las condiciones de la tecla presionada, agrega su valor al arreglo que guarda los dígitos de la operación
	capturarTeclas: function (elemento) {
		var contenidoCalculadora;

		elemento.style.width
		teclaPresionada = elemento.id;
		contenidoCalculadora = display.innerText;

		//Evalúa el contenido del display y verifica si la tecla presionada es una tecla numérica o un signo de operación	
		if ((contenidoCalculadora.length < 8) || isNaN(teclaPresionada)) {
			if (isNaN(Number(teclaPresionada))) {
				//Verifica la tecla no numérica presionada
				if ((teclaPresionada == 'mas') || (teclaPresionada == 'menos') || (teclaPresionada == 'por') || (teclaPresionada == 'dividido')) {
					datos.push(buffer);
					buffer = '';
					operacion = teclaPresionada;
					Calculadora.actualizaDisplay(buffer);
				} else if (teclaPresionada == 'on') {
					datos = [];
					buffer = '';
					Calculadora.actualizaDisplay('0');
  				} else if (teclaPresionada == 'punto') {
					if (buffer == '') {
						buffer = "0.";
					} else if (!buffer.includes('.')) {
						buffer = buffer + '.';	
					} ;
					Calculadora.actualizaDisplay(buffer);
				} else if (teclaPresionada == 'sign') {
					if (contenidoCalculadora != "0") {
						if (buffer[0] == "-") {
							buffer = buffer.substring(1, buffer.length);
						} else {
							buffer = '-' + buffer;
						}
						Calculadora.actualizaDisplay(buffer);
					};
				} else if (teclaPresionada == 'igual') {
					datos.push(buffer);
					buffer = '';
					Calculadora.obtenerResultado();
				} 
			//Es un número
			} else {
				if (teclaPresionada == '0') {
					if (buffer != '') {
						buffer = buffer + teclaPresionada;
						Calculadora.actualizaDisplay(buffer);
					};
				} else {
					buffer = buffer + teclaPresionada;
					Calculadora.actualizaDisplay(buffer);
				};	
			};
		}
	},

	//Función que actualiza el contenido del display con el elemento recibido como parámetro
	actualizaDisplay: function (texto) {
		display.innerText = texto;
	},

	//Función que realiza el cálculo de la operación ingresada por el usuario en base a los valores almacenados en el array datos
	obtenerResultado: function() {
		var cadena;

		//Verifica si tiene los dos valores numéricos de la operación
		if (datos.length == 2) {

			//Evalúa la operación aritmética a realizar y efectúa el cálculo
			switch (operacion) {
				case 'mas':
					resultado = Number(datos[0]) + Number(datos[1]);
					break;
				case 'menos':
					resultado = Number(datos[0]) - Number(datos[1]);
					break;
				case 'por':
					resultado = Number(datos[0]) * Number(datos[1]);
					break;
				case 'dividido':
					resultado = Number(datos[0]) / Number(datos[1]);
					break;
			}

			//Inicializa el vector que guarda los números de la operación
			datos = [];

			//Convierte el número a cadena de caracteres
			cadena = String(resultado);

			//Evalúa el largo de la cadena y trunca la cadena en caso afirmativo
			if (cadena.length > 8) {
				cadena = cadena.substring(0,8); 
				Calculadora.actualizaDisplay(cadena);
			} else {
				Calculadora.actualizaDisplay(resultado);
			}
			
		}; 
	},

	//Función que reduce el tamaño de la tecla al precionar del botón izquierdo del mpuse sobre el elemento
	reducirTecla: function(tecla) {
		if ((tecla.id == '1') || (tecla.id == '2') || (tecla.id == '3') || (tecla.id == '0') || (tecla.id == 'punto') || (tecla.id == 'igual')) {
			tecla.style.width = '27%';
			tecla.style.height = '58.91px';
			tecla.style.marginRight = '1.5%';
			tecla.style.marginLeft = '0.5%'
			tecla.style.marginTop = '2px'
			tecla.style.marginBottom = '1px';
		} else if (tecla.id == 'mas') {
			tecla.style.width = '88%';
			tecla.style.height = '98%';
			tecla.style.marginRight = '0.5%';
			tecla.style.marginLeft = '12px'
			tecla.style.marginTop = '1.75%'
			tecla.style.marginBottom = '0.5%';
		} else {
			tecla.style.width = '20%';
			tecla.style.height = '58.91px';
			tecla.style.marginRight = '0.5%';
			tecla.style.marginLeft = '1.5%'
			tecla.style.marginTop = '2px'
			tecla.style.marginBottom = '1px';
		}
	},

	//Función que reduce el tamaño de la tecla al soltar el botón izquierdo del mpuse sobre el elemento
	ampliarTecla: function(tecla) {
		if ((tecla.id == '1') || (tecla.id == '2') || (tecla.id == '3') || (tecla.id == '0') || (tecla.id == 'punto') || (tecla.id == 'igual')) {
			tecla.style.width = '29%';
			tecla.style.height = '62.91px';
			tecla.style.marginRight = '0%';
			tecla.style.marginLeft = '0%'
			tecla.style.marginTop = '0px'
			tecla.style.marginBottom = '0px';
		} else if (tecla.id == 'mas') {
			tecla.style.width = '90%';
			tecla.style.height = '100%';
			tecla.style.marginRight = '0%';
			tecla.style.marginLeft = '10px'
			tecla.style.marginTop = '0%'
			tecla.style.marginBottom = '0%';
		} else {
			tecla.style.width = '22%';
			tecla.style.height = '62.91px';
			tecla.style.marginRight = '0%';
			tecla.style.marginLeft = '0%'
			tecla.style.marginTop = '0px'
			tecla.style.marginBottom = '0px';
		}
	}	
};

//Inicualiza los elementos de la calculadora
Calculadora.inicializarCalculadora();