function creaElemento(elemento: string, id: string, nome: string){
    return function(constructor: any){
        const container = document.getElementById('container')
        const prova = new constructor(nome)
        if(container){
            container.innerHTML = elemento;
            container.querySelector('h1')!.textContent = prova.nome;
        }
    }
}

@creaElemento('<h1></h1>', 'container', 'Luca')
class Prova2{

    constructor(public nome: string){
        console.log('sto creando un oggetto di prova');
    }
}