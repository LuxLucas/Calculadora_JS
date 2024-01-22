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
    constructor(painelDeDigitos,painelDeEquacao,btnClear){
        try{
            this.visorDados = document.querySelector(painelDeDigitos);
            this.saidaDaMemoriaDeEquacao = document.querySelector(painelDeEquacao);
            this.btnClear = document.querySelector(btnClear);

            this.visorDados.innerText = "0";
            this.operacaoAtivada = false;
            this.btnDigitado = false;
            this.qtdDeOperacoes = 0;
            this.memoriaDeEquacao = null;
            this.saidaDaMemoriaDeEquacao.innerText = null;
        }catch(e){
            alert(`Erro entre os parâmetros ${painelDeDigitos} , ${painelDeEquacao} e ${btnClear} .`);
            console.log(`Erro: ${e.message}`);
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
                    this.memoriaDeEquacao += `${string}`;
                    this.saidaDaMemoriaDeEquacao.innerText = this.metodoTradutor(this.memoriaDeEquacao,false);
                }else if(string.includes(",")){
                    let numeroSemVirgula = string.replaceAll(',','');
                    if(!isNaN(numeroSemVirgula)){
                        numeroSemVirgula = this.metodoRemoverUltimoZero(string);
                        numeroSemVirgula = this.metodoTradutor(numeroSemVirgula,true);
                            if(this.memoriaDeEquacao == null){
                                this.memoriaDeEquacao = numeroSemVirgula;
                            }else{
                                this.memoriaDeEquacao += numeroSemVirgula;
                            }
                        this.saidaDaMemoriaDeEquacao.innerText = this.metodoTradutor(this.memoriaDeEquacao,false);
                    }else{
                        console.log(`Erro: Caractere não esperado recebido ('${string}')`);
                    }
                }else{
                    console.log(`Erro: Caractere não esperado recebido ('${string}')`);
                }
            }catch(e){
                console.log(`Erro no mFE1: ${e.message}`);
            }
        }else{
            try{
                let numeroRecebido = this.metodoTradutor(string,true);
                numeroRecebido = parseFloat(numeroRecebido);
                if(this.memoriaDeEquacao == null){
                    this.memoriaDeEquacao = `${numeroRecebido}`;
                }else{
                    this.memoriaDeEquacao += `${numeroRecebido}`;
                }
                this.saidaDaMemoriaDeEquacao.innerText = this.metodoTradutor(this.memoriaDeEquacao,false);
            }catch(e){
                console.log(`Erro no mFE2: ${e.message}`);
            }           
        }
    }

    operacaoSubtrair(){
        try{
            this.operacaoAtivada = true;
            if(this.memoriaDeEquacao != null){
                try{
                    let ultimoCaracter = this.memoriaDeEquacao.slice(-1);
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
let calculadora = new Calculadora("#visor","#prompt-hist","#clear");

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
//btnAbrirPrentese.addEventListener("click",calculadora.abrirParentese.bind(calculadora));
//btnFecharPrentese.addEventListener("click",calculadora.fecharParentese.bind(calculadora));

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
