/*Declaração de botões com caracteres*/
let btnZero     = document.querySelector("#btn-zero");
let btnUm       = document.querySelector("#btn-um");
let btnDois     = document.querySelector("#btn-dois");
let btnTres     = document.querySelector("#btn-tres");
let btnQuat     = document.querySelector("#btn-quat");
let btnCinco    = document.querySelector("#btn-cinco");
let btnSeis     = document.querySelector("#btn-seis");
let btnSete     = document.querySelector("#btn-sete");
let btnOito     = document.querySelector("#btn-oito");
let btnNove     = document.querySelector("#btn-nove");
let btnVirgula  = document.querySelector("#btn-vir");

let btnAbrirPrentese    = document.querySelector("#btn-abre-parentese");
let btnFecharPrentese   = document.querySelector("#btn-fecha-parentese");

/*Declaração de botões com funções*/
let btnClear    = document.querySelector("#clear");
let btnSinal    = document.querySelector("#btn-sinal");
let btnResul    = document.querySelector(".btn-resultado");
let btnSomar    = document.querySelector("#somar");
let btnSubtrair = document.querySelector("#subtrair");
let btnMultiplicar = document.querySelector("#multiplicar");
let btnDividir  = document.querySelector("#divisao");

/*Criando a classe calculadora */
class Calculadora{
    constructor(painelDeDigitos,painelDeEquacao,btnClear,btnAbrirParentese){
        try{
            this.visorDados = document.querySelector(painelDeDigitos);
            this.saidaDaMemoriaDeEquacao = document.querySelector(painelDeEquacao);
            this.btnClear = document.querySelector(btnClear);
            this.btnAbrirParentese = document.querySelector(btnAbrirParentese);

            this.visorDados.innerText = "0";
            this.operacaoAtivada = false;
            this.btnDigitado = false;
            this.qtdDeOperacoes = 0;
            this.memoriaDeEquacao = null;
            this.saidaDaMemoriaDeEquacao.innerText = null;
            this.parentesesAbertos = 0;
        }catch(e){
            alert(`Erro entre os parâmetros ${painelDeDigitos} , ${painelDeEquacao} e ${btnClear} .`);
            console.log(`Erro: ${e.message}`);
        }
    }

    setMemoriaDeEquacao(string){
        try{
            if(
                (!isNaN(string))||
                (string=='(')||
                (string==')')||
                (string=='+')||
                (string=='-')||
                (string=='*')||
                (string=='/')
            ){
                if(this.memoriaDeEquacao == null){
                this.memoriaDeEquacao = string;
            }else{
                this.memoriaDeEquacao += string;
            }
            }else{
                if(this.memoriaDeEquacao == null){
                    this.memoriaDeEquacao = '0';
                }else{
                    this.memoriaDeEquacao += '0';
                }
            }
            this.saidaDaMemoriaDeEquacao.innerText = this.metodoTradutor(this.memoriaDeEquacao,false);
        }catch(e){
            console.log(`Erro ao incrementar na MEMÓRIA DE EQUAÇÃO: ${e.message}`);
        }
    }

    metodoRemoverUltimoZero(string){
        let numeroRecebido = string; 
        let notZero = false;
        for(let i=numeroRecebido.length-1;(i!==0)&&(!notZero);i--){
            if(((numeroRecebido[i] === '0')||(numeroRecebido[i] === ','))&&(!notZero)){
                numeroRecebido = numeroRecebido.slice(0,i);
            }else{
                notZero = true;
            }
        }
        return numeroRecebido;
    }

    metodoTradutor(string,boolean){
       try{ if(boolean){
            if(string.includes(',')){
                string = string.replaceAll(',','.');
            }
            if(string.includes('÷')){
                string = string.replaceAll('÷','/');
            }
            if(string.includes('×')){
                string = string.replaceAll('×','*');
            }
        }else{
            if(string.includes('.')){
                string = string.replaceAll('.',',');
            }
            if(string.includes('/')){
                string = string.replaceAll('/','÷');
            }
            if(string.includes('*')){
                string = string.replaceAll('*','×');
            }
        }
        return string;
        }catch(e){
            console.log(`Erro no metTrad: ${e.message}`);
            return '';
        }
    }

    metodoReceberDigito(string){
        if(isNaN(string)){
            if(string == ','){
                if(!this.visorDados.innerText.includes(",")){
                    if(this.visorDados.innerText == '0'){
                        return "0,";
                    }else{
                        return string;
                    }
                }else{
                    return '';
                }
            }else{
                return '';
            }
        }else{
            return string;
        }
    }

    metodoDigitar(string){
        try{
            if(this.operacaoAtivada){
                this.visorDados.innerText = "0";
                this.operacaoAtivada = false;
            }
        }catch(e){
            console.alert(`Erro em metDig1: ${e.message}`);
        }
        try{
            if(this.visorDados.innerText == "0"){
                this.visorDados.innerText = this.metodoReceberDigito(string);
            }else{
                this.visorDados.innerText += this.metodoReceberDigito(string);
            }
            this.btnDigitado = true;
            if(this.btnDigitado){
                this.btnClear.innerText = 'CE';
                this.tipoDeLimpeza = true;
            }
        }catch(e){
            console.alert(`Erro em metDig2: ${e.message}`);
        }
        
    }

    metodoLimparVisor(){
        try{
            if(this.tipoDeLimpeza){
                this.visorDados.innerText = "0";
                this.btnClear.innerText = "C";
                this.tipoDeLimpeza = false;
            }else{
                this.memoriaDeEquacao = null;
                this.saidaDaMemoriaDeEquacao.innerText = null;
                this.parentesesAbertos = 0;
                this.btnAbrirParentese.innerText = "(";
            }
        }catch(e){
            console.log(`Erro ao LIMPAR VISOR: ${e.message}`);
        }
    }

    metodoMudarSinal(){
        try{
            this.btnDigitado = true;
            if(eval(this.visorDados.innerText.replace(',','.')) > 0){
                this.visorDados.innerText = `-${this.visorDados.innerText}`;

            }else if(eval(this.visorDados.innerText.replace(',','.')) < 0){
                this.visorDados.innerText = `${this.visorDados.innerText.replaceAll('-','')}`;
            }
        }catch(e){
            console.log(`Erro ao MUDAR SINAL: ${e.message}`);
        }
    }

    metodoAbrirParentese(){
        try{
            this.parentesesAbertos ++;
            this.metodoFormarEquacao("(");
            this.btnAbrirParentese.innerHTML = `(<sub>${this.parentesesAbertos}</sub>`;
        }catch(e){
            console.log(`Erro ao ABRIR PARÊNTESE: ${e.message}`);
        }
    }

    metodoFecharParentese(){
        try{
            if(this.parentesesAbertos > 0){
                this.parentesesAbertos --;
                this.metodoFormarEquacao(")");
                if(this.parentesesAbertos > 0){
                    this.btnAbrirParentese.innerHTML = `(<sub>${this.parentesesAbertos}</sub>`;
                }else{
                    this.btnAbrirParentese.innerText = "(";
                }
                this.btnDigitado = false;
                this.operacaoAtivada = true;
            }
        }catch(e){
            console.log(`Erro ao FECHAR PARÊNTESE: ${e.message}`);
        }
    }

    metodoFormarEquacao(string){
        if(string == null){
            string = "0";
        }
        if(isNaN(string)){
           try{
                if((string == "+")||(string == "-")||(string == "/")||(string == "*")){
                    let ultimoCaracter = this.memoriaDeEquacao.slice(-1);
                    if((ultimoCaracter=="+")||(ultimoCaracter=="-")||(ultimoCaracter=="/")||(ultimoCaracter== "*")){
                        this.memoriaDeEquacao = this.memoriaDeEquacao.slice(0,-1);
                    }
                    this.setMemoriaDeEquacao(string);
                }else if(string.includes(",")){
                    let numeroSemVirgula = string.replaceAll(',','');
                    if(!isNaN(numeroSemVirgula)){
                        numeroSemVirgula = this.metodoRemoverUltimoZero(string);
                        numeroSemVirgula = this.metodoTradutor(numeroSemVirgula,true);
                        this.setMemoriaDeEquacao(numeroSemVirgula);
                    }else{
                        console.log(`Erro: Caractere não esperado recebido ('${string}')`);
                    }
                }else if((string === '(')||(string === ')')){
                    let ultimoCaracter;
                    if(this.memoriaDeEquacao != null){
                        if(this.memoriaDeEquacao.length > 1){
                            ultimoCaracter = this.memoriaDeEquacao.slice(-1);
                        }else{
                            ultimoCaracter = this.memoriaDeEquacao.slice(0);
                        }
                    }
                    if(string === '('){
                        if(ultimoCaracter === ')'){
                            this.metodoFormarEquacao('*');
                        }
                        this.setMemoriaDeEquacao(string);
                    }else{
                        if(!isNaN(ultimoCaracter)){
                            this.setMemoriaDeEquacao(string);
                        }else{
                            if(ultimoCaracter===")"){
                                this.setMemoriaDeEquacao(string);
                            }else{
                                this.metodoFormarEquacao(this.visorDados.innerText);
                                this.setMemoriaDeEquacao(string);
                            }
                        }
                    }
                }else{
                    console.log(`Erro: Caractere não esperado recebido ('${string}')`);
                }
            }catch(e){
                console.log(`Erro no mFE1: ${e.message}`);
                console.log(`Caracter recebido: ${string}`);
            }
        }else{
            try{
                let numeroRecebido = this.metodoTradutor(string,true);
                this.setMemoriaDeEquacao(numeroRecebido);
            }catch(e){
                console.log(`Erro no mFE2: ${e.message}`);
                console.log(`Caracter recebido: ${string}`);
            }           
        }
    }

    operacaoSubtrair(){
        try{
            this.operacaoAtivada = true;
            if(this.memoriaDeEquacao != null){
                try{
                    let ultimoCaracter;
                    if(this.memoriaDeEquacao.length > 1){
                        ultimoCaracter = this.memoriaDeEquacao.slice(-1);
                    }else{
                        ultimoCaracter = this.memoriaDeEquacao.slice(0);
                    }
                    if(((ultimoCaracter="+")||(ultimoCaracter="*")||(ultimoCaracter="/"))&&(!this.btnDigitado)){
                        this.metodoFormarEquacao("-");
                    }else if(this.btnDigitado){
                        this.metodoFormarEquacao(this.visorDados.innerText);
                        this.metodoFormarEquacao("-");
                        this.btnDigitado = false;   
                    }
                }catch(e){
                    console.log(`Erro ao SUBTRAIR: ${e.message}`)
                }    
            }else{
                this.metodoFormarEquacao(this.visorDados.innerText);
                this.metodoFormarEquacao("-")
                this.btnDigitado = false;
            }
        }catch(e){
            console.log(`Erro ao SUBTRAIR: ${e.message}`);
        } 
    }
    
    operacaoSomar(){
        try{
            this.operacaoAtivada = true;
            if(this.memoriaDeEquacao != null){
                try{
                    let ultimoCaracter = this.memoriaDeEquacao.slice(-1);
                    if(((ultimoCaracter="-")||(ultimoCaracter="*")||(ultimoCaracter="/"))&&(!this.btnDigitado)){
                        this.metodoFormarEquacao("+"); 
                    }else if(this.btnDigitado){
                        this.metodoFormarEquacao(this.visorDados.innerText);
                        this.metodoFormarEquacao("+"); 
                        this.btnDigitado = false;
                    }
                }catch(e){
                    console.log(`Erro ao SOMAR: ${e.message}`)
                }
            }else{
                this.metodoFormarEquacao(this.visorDados.innerText);
                this.metodoFormarEquacao("+");    
                this.btnDigitado = false;
            }
        }catch(e){
            console.log(`Erro ao SOMAR: ${e.message}`);
        }
    }

    operacaoMultiplicar(){
        try{
            this.operacaoAtivada = true;
            if(this.memoriaDeEquacao != null){
                try{
                    let ultimoCaracter = this.memoriaDeEquacao.slice(-1);
                    if(((ultimoCaracter="+")||(ultimoCaracter="-")||(ultimoCaracter="/"))&&(!this.btnDigitado)){
                        this.metodoFormarEquacao("*");
                    }else if(this.btnDigitado){
                        this.metodoFormarEquacao(this.visorDados.innerText);
                        this.metodoFormarEquacao("*");
                        this.btnDigitado = false;
                    }
                }catch(e){
                    console.log(`Erro ao MULTIPLICAR: ${e.message}`);
                }
            }else{
                this.metodoFormarEquacao(this.visorDados.innerText);
                this.metodoFormarEquacao("*");
                this.btnDigitado = false;
            }
        }catch(e){
            console.log(`Erro ao MULTIPLICAR: ${e.message}`);
        }
    }

    operacaoDividir(){
        try{
            this.operacaoAtivada = true;
            if(this.memoriaDeEquacao != null){
                try{
                    let ultimoCaracter = this.memoriaDeEquacao.slice(-1);
                    if(((ultimoCaracter="+")||(ultimoCaracter="-")||(ultimoCaracter="/"))&&(!this.btnDigitado)){
                        this.metodoFormarEquacao("/");
                    }else if(this.btnDigitado){
                        this.metodoFormarEquacao(this.visorDados.innerText);
                        this.metodoFormarEquacao("/");
                        this.btnDigitado = false;
                    }
                }catch(e){
                    console.log(`Erro ao DIVIDIR: ${e.message}`);
                }
            }else{
                this.metodoFormarEquacao(this.visorDados.innerText);
                this.metodoFormarEquacao("/");
                this.btnDigitado = false;
            }
        }catch(e){
            console.log(`Erro ao DIVIDIR: ${e.message}`);
        }
    }
}

/*Instanciândo a classe calculadora*/
let calculadora = new Calculadora("#visor","#prompt-hist","#clear","#btn-abre-parentese");

/*Listando ações*/
btnResul.addEventListener("click",function(){
alert(`
Visor: ${calculadora.visorDados.innerText} 
Memória: ${calculadora.memoriaDeEquacao}
`)
});

btnClear.addEventListener("click",calculadora.metodoLimparVisor.bind(calculadora));
btnSinal.addEventListener("click",calculadora.metodoMudarSinal.bind(calculadora));

btnVirgula.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,","));
btnAbrirPrentese.addEventListener("click",calculadora.metodoAbrirParentese.bind(calculadora));
btnFecharPrentese.addEventListener("click",calculadora.metodoFecharParentese.bind(calculadora));

btnSomar.addEventListener("click",calculadora.operacaoSomar.bind(calculadora));
btnSubtrair.addEventListener("click",calculadora.operacaoSubtrair.bind(calculadora));
btnMultiplicar.addEventListener("click",calculadora.operacaoMultiplicar.bind(calculadora));
btnDividir.addEventListener("click",calculadora.operacaoDividir.bind(calculadora));

btnZero.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"0"));
btnUm.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"1"));
btnDois.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"2"));
btnTres.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"3"));
btnQuat.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"4"));
btnCinco.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"5"));
btnSeis.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"6"));
btnSete.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"7"));
btnOito.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"8"));
btnNove.addEventListener("click",calculadora.metodoDigitar.bind(calculadora,"9"));

/*alert(

);*/