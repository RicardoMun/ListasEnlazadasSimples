const capturaValorInput = function(){
    let valoresNodos = document.getElementById("nodos").value;
    document.getElementById("nodos_ingresados").innerHTML = valoresNodos;
};
/* const capturaValorInputFlecha = () => {
    let valoresNodos = document.getElementById("nodos").value;
    document.getElementById("nodosIngresados").innerHTML = valoresNodos;
}; */


function cargueImagenes(eventoSeleccionar) {
    let files = eventoSeleccionar.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        /* Cargue de sólo imagenes */
        if (!f.type.match('image.*')) {
            continue;
        }
        let cargueImagenes = new FileReader;
        /* Capturar información de la imagen: tipo, nombre, tamaño */
        cargueImagenes.onload = (function(imagenSeleccionada) {
            return function(imagen) {
                /* Crear etiqueta HTML en el DOM */
                let span = document.createElement('span');
                /* Escribimos en la etiqueta span: cargamos la imagen */
                span.innerHTML = ['<img class ="thumb" width ="100px" heigth="100px" src= " ',
                    imagen.target.result, ' "title=" ', escape(imagenSeleccionada.name),
                    ' "/> '
                ].join('');
                document.getElementById("lista").insertBefore(span, null);
            };
        })(f);
        /* Función de la API FileReader
        Hace la lectura del contenido de un objeto Blob
        Trabaja con el atributo result que devuelve los datos del fichero, en este caso la imagen seleccionada */
        cargueImagenes.readAsDataURL(f);
    }
}
document.getElementById('files').addEventListener('change', cargueImagenes, false);

/* Cargue de archivo .txt */
let input = myInput;
let infoArchivo = new FileReader;
input.addEventListener('change', onChange);

function onChange(event){
    /* event es el evento click de selección */
    /* target es el tipo de archivo seleccionado */
    /* Files[0] sólo permite el cargue de un archivo */
    let archivo = event.target.files[0];
    /* readAsText se utiliza para leer el contenido de los archivos */
    infoArchivo.readAsText(archivo);
    /* Permite ejecutar la función onload después de cargar el archivo */
    infoArchivo.onload = onLoad;
}

/* Lectura del contenido del archivo */
function onLoad(){
    
    let contenidoTxt = infoArchivo.result;
    let lecturaLinea = contenidoTxt.split('\n');
    let contenido = "";

    contenido += lecturaLinea;
    document.getElementById("ver_txt").innerHTML = contenido; 
}


class NodeClass {
    constructor(value) {
        /* Propiedades que tiene todo nodo */
        this.value = value;
        this.next = null; /* Generar el enlace entre los nodos */
    }
}

class listasSimples {
    constructor() {
        /* Propiedades que tiene toda lista */
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /* Metodos a trabajar con SyngleLinkedList */

    /* AÑADE nodos al FINAL de la lista */
    pushNode(value) {
        /* Instancia de la clase NodeClass */
        let newNode = new NodeClass(value);
        /* Validar si la lista esta vacía */
        if (!this.head) {
            /* Como sería el único nodo de la lista, toma el valor de cabeza y cola */
            this.head = newNode;
            this.tail = this.head;
        } else {
            /* La actual cola de la lista genera el enlace con el nuevo nodo */
            this.tail.next = newNode;
            /* El nuevo nodo pasa a ser la nueva cola de la lista */
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    /* ELIMINA nodo al FINAL de la lista */
    popNode() {
        if (!this.head) return undefined; /* Nada que eliminar */
        /* Debemos recorrer toda la lista hasta llegar al nodo cola */
        let nodoActual = this.head;
        let newTail = nodoActual;
        /* Recorremos todos los enlaces de la lista */
        while (nodoActual.next) {
            newTail = nodoActual;
            nodoActual = nodoActual.next;
        }
        this.tail = newTail;
        /* Especificamos que es la nueva cola y se genera el enlace de next con null */
        this.tail.next = null;
        this.length--;
        /* Incluir la validación: Si eliminamos el único nodo que tenia la lista */
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return nodoActual;
    }

    /* AÑADE nodo al INICIO de la lista */
    unshiftNode(value) {
        let newNode = new NodeClass(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        newNode.next = this.head;
        /* El nuevo nodo pasa a ser la cabeza de la lista */
        this.head = newNode;
        this.length++;
        return null;
    }

    /* ELIMINA nodo al INICIO de la lista */
    shiftNode() {
        if (!this.head) return undefined;
        let nodoActual = this.head;
        this.head = nodoActual.next;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return nodoActual;
    }

    /* BUSCA un nodo por el PUNTERO(NodoBuscado) */
    getValorNodo(nodoBuscado) {
        if (nodoBuscado < 0 || nodoBuscado >= this.length) return null;
        let contadorNodos = 0;
        let nodoActual = this.head;
        while (contadorNodos != nodoBuscado) {
            nodoActual = nodoActual.next;
            contadorNodos++;
        }
        return nodoActual;
        /* Prueba que capturamos el valor de la posición
        return nodoActual.value; PREGUNTAR ERROR .NEXT
        */ 
    }

    /* MODIFICA un nodo por el PUNTERO(NodoBuscado) */
    modificarValorNodo(value, nodoBuscado) {
        let encontrarNodo = this.getValorNodo(nodoBuscado);
        if (encontrarNodo) {
            encontrarNodo.value = value;
            return true;
        }
        return false;
    }

    /* INSERTA nuevo nodo en determinada posición de la lista */
    insertarNodoEnPosicion(value, nodoBuscado) {
        let nuevoNodo = new NodeClass(value);
        let nodoActual = this.head;
        let nodoAnterior;

        if (nodoBuscado < 0 || nodoBuscado >= this.length) {
            return null;
        }
        if(nodoBuscado === 0){
            this.pushNode(value);
        }else{
            for(let i = 0; i < nodoBuscado; i++){
                nodoAnterior = nodoActual;
                nodoActual = nodoActual.next;
            }
            nuevoNodo.next = nodoActual;
            nodoAnterior.next = nuevoNodo;
        }
        this.length++;
    }
    
    /* ELIMINA nodo en determinada posición de la lista */
    removerNodoEnPosicion(nodoBuscado){

        let nodoActual = this.head;
        let nodoAnterior = null;
        
        if(nodoBuscado < 0 || nodoBuscado > this.length) return null;
        if(nodoBuscado === 0) this.head = nodoActual.next;
        else{
            for(let i = 0; i < nodoBuscado; i++){
                nodoAnterior = nodoActual;
                nodoActual = nodoActual.next;
            }
            nodoAnterior.next = nodoActual.next;
        }
        this.length--;
        return nodoActual.value;
    }

    /* ELIMINA nodos por determinado valor */
    removerNodoPorValor(value){

        
        let nodoActual = this.head;
        let nodoAnterior = null;
        let valorInt = parseInt(value);

        while(nodoActual !== null){
            if(nodoActual.value === value || nodoActual.value === valorInt){
                if(!nodoAnterior){
                    this.head = nodoActual.next;
                }else{
                    nodoAnterior.next = nodoActual.next;
                }
                this.length--;
                return nodoActual;
            }
            nodoAnterior = nodoActual;
            nodoActual = nodoActual.next;
        }
        return null;
    }

    invertirOrdenLista(){
        /* Implementar método reverse() invertir nodos de la lista */
        
        let lastNode;
        let headNode = this.head;
        let tailNode = this.tail;
        let actualNode = this.head;
        let nextNode;

        while(actualNode != null){
            nextNode = actualNode.next;
            actualNode.next = lastNode;
            lastNode = actualNode;
            actualNode = nextNode;
        }
        this.head = tailNode;
        this.tail = headNode;
        
        return lastNode;  
    }
    
    /* Imprime la lista con valores por defecto */
    imprimirListaDefault(){
        let arrayNodos = [];
        let nodoActual = this.head;

        while(nodoActual){
            arrayNodos.push(nodoActual.value);
            nodoActual = nodoActual.next;
        }

       document.getElementById("lista_default").innerHTML = arrayNodos;
    }

    /* Imprime la lista con los valores que ingresa el usuario */
    imprimirCrearLista(){
        let arrayNodos = [];
        let nodoActual = this.head;

        while(nodoActual){
            arrayNodos.push(nodoActual.value);
            nodoActual = nodoActual.next;
        }

        document.getElementById("crear_lista").innerHTML = arrayNodos;
    }
    
    /* Imprime la lista con los valores que ha modificado el usuario */
    imprimirListaResultante(){
        let arrayNodos = [];
        let nodoActual = this.head;

        while(nodoActual){
            arrayNodos.push(nodoActual.value);
            nodoActual = nodoActual.next;
        }

        document.getElementById("lista_resultante").innerHTML = arrayNodos;
    }


}

let listaSimpleTest = new listasSimples();

function rand(n){
    //creamos un numero al azar entre 1 y 6  
    return(Math.floor(Math.random() * n + 1 ));
} 

/* Se cargan valores por defecto */
listaSimpleTest.unshiftNode(1); /* añade nodo al inicio de la lista*/
listaSimpleTest.unshiftNode(2); /* añade nodo al inicio de la lista */
listaSimpleTest.unshiftNode(3); /* añade nodo al inicio de la lista */
listaSimpleTest.unshiftNode(4); /* añade nodo al inicio de la lista */
listaSimpleTest.unshiftNode(5); /* añade nodo al inicio de la lista */
listaSimpleTest.unshiftNode(6); /* añade nodo al inicio de la lista */
listaSimpleTest.unshiftNode(7); /* añade nodo al inicio de la lista */
listaSimpleTest.unshiftNode(8); /* añade nodo al inicio de la lista */

console.log(listaSimpleTest);
//listaSimpleTest.imprimirListaDefault();
//document.getElementById("lista_default").innerHTML = listaSimpleTest.imprimirLista();



//------------------------------------------------------------------

function crearLista(){

    let obtenerNodos = document.getElementById("nodos").value;
    let arrayNodos = obtenerNodos.split(',');
    arrayNodos.forEach(i => {
        listaSimpleTest.pushNode(i);
    });


    let obtenerImg = document.getElementById("nombre_img").value;
    let arrayImg = obtenerImg.split(',');
    arrayImg.forEach(i => {
        listaSimpleTest.pushNode(i);
    });


    let obtenerTXT = document.getElementById("ver_txt").value;
    let arrayTxt = obtenerTXT.split(",");
    arrayTxt.forEach(i => {
        listaSimpleTest.pushNode(i);
    });


    listaSimpleTest.imprimirCrearLista();

} 

function mostrarLista(){

    let seleccionNodos = document.getElementById("selector_nodos").value;
    let alInicio = document.getElementById("agregar_inicio").checked;
    let alFinal = document.getElementById("agregar_final").checked;
    let valorNodo = document.getElementById("valor_n").value; //Captura el valor input que ingresa el ususario
    let valorPosicionNodo = document.getElementById("posicion_n").value; //Captura el valor de posicion input que ingresa el ususario

    if ((seleccionNodos === "1") && (alInicio)){
        listaSimpleTest.unshiftNode(valorNodo);
        listaSimpleTest.imprimirListaResultante();
        
    }else if((seleccionNodos === "1") && (alFinal)){
        listaSimpleTest.pushNode(valorNodo);
        listaSimpleTest.imprimirListaResultante();

    }else if ((seleccionNodos === "2") && (alInicio)){
        alert("INFO");
        listaSimpleTest.shiftNode();
        listaSimpleTest.imprimirListaResultante();

    }else if((seleccionNodos === "2") && (alFinal)){
        listaSimpleTest.popNode();
        listaSimpleTest.imprimirListaResultante();

    }else if (seleccionNodos === "3"){
        let posicion = document.getElementById("posicion_n").value;
        document.getElementById("lista_resultante").innerHTML = "El nodo que buscaste en la posición: "+ posicion + " es el: " +
                                                                listaSimpleTest.getValorNodo(posicion).value;

    } else if (seleccionNodos === "4") {
        listaSimpleTest.removerNodoEnPosicion(valorPosicionNodo);
        listaSimpleTest.imprimirListaResultante();

    } else if (seleccionNodos === "5") {
        listaSimpleTest.removerNodoPorValor(valorNodo);
        listaSimpleTest.imprimirListaResultante();

    }else if (seleccionNodos === "6") {
        listaSimpleTest.modificarValorNodo(valorNodo, valorPosicionNodo);
        listaSimpleTest.imprimirListaResultante();

    } else if (seleccionNodos === "7") {
        listaSimpleTest.insertarNodoEnPosicion(valorNodo, valorPosicionNodo);
        listaSimpleTest.imprimirListaResultante();

    }else if(seleccionNodos === "8"){
        listaSimpleTest.invertirOrdenLista();
        listaSimpleTest.imprimirListaResultante();

    }
    
}