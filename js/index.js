
class Calculadora{
    constructor(panValorAnterior, panValorActual){
        this.panValorAnterior = panValorAnterior;
        this.panValorActual = panValorActual;
        this.clear();
    }
    //Metodos
    // limpiar
    clear(){
        this.operando1 = 0;
        this.operando2 = 0;
        this.operador = '';
        this.actualizar();             
    }
    // actualizar la pantalla
    actualizar(){
        this.panValorAnterior.innerHTML = this.operando1 + this.operador;
        this.panValorActual.innerHTML = this.operando2;
    }
    // agregar numeros a la pantalla
    agregarNum (numero){
        if(numero === "." && this.operando2.includes('.')) return; //evita colocar mas puntos
        this.operando2 = this.operando2 === 0 // para quitar el numero 0 del inicio
        ? numero:
        this.operando2.toString() + numero;

        this.actualizar();
    }
    // eliminar el numero numero 
    borrar(){
        if(this.operando2 === 0)return;
        this.operando2 = +this.operando2.toString().slice(0, -1);

        this.actualizar();
    }

    operacion(operador){
        if(this.operador){
            this.calculo();
        }
        this.operador = operador;
        this.operando1 = +this.operando2 === 0 ? this.operando1:this.operando2;
        this.operando2 = 0;
        this.actualizar();
    }

    calculo(){
        switch(this.operador){
            case "+":
                this.operando1 = +this.operando1 + +this.operando2;
            break;
            case "-":
                this.operando1 = +this.operando1 - +this.operando2;
            break;
            case "*":
                this.operando1 = +this.operando1 * +this.operando2;
            break;
            case "/":
                this.operando1 = +this.operando1 / +this.operando2;
            break;
            case "%":
                this.operando1 = (+this.operando1 * +this.operando2) / 100;                
            break;        
        }
        this.operador = "";
        this.operando2 = 0;
        this.actualizar();

    }


}

//Captando los elementos en una variable
const panValorAnterior = document.getElementById('valorAnterior');
const panValorActual = document.getElementById('valorActual');
const botonesNumeros = document.querySelectorAll('.numeros');
const botonesOperador = document.querySelectorAll('.operacion');
const botonLimpiar = document.querySelector('.limpiar');
const botonBorrar = document.querySelector('.borrar');
const botonIgual = document.querySelector('.igual');


const calculadora = new Calculadora(panValorAnterior, panValorActual);

//Limpiar la pantalla
botonLimpiar.addEventListener("click", () =>{
    calculadora.clear();

})
// Seleccionar los numeros 
botonesNumeros.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculadora.agregarNum(button.innerHTML);

    })
})

botonesOperador.forEach(button =>{
    button.addEventListener('click', ()=>(
        calculadora.operacion(button.innerHTML)
    ))
})
// Eliminar el ultimo numero 
botonBorrar.addEventListener('click', () =>{
    calculadora.borrar();
})

botonIgual.addEventListener('click', ()=>{
    calculadora.calculo();
})