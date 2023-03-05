function creaArra<T extends number | string>(items: T[]): T[]{
    return new Array().concat(items);
}

const arr1 = creaArra<number>([1,2,3,4]);
const arr2 = creaArra<string>(['1','2','3']);


class Prova<T>{
    private lista: T[] = [];

    aggiungiItem(item: T){
        this.lista.push(item);
    }

    rimuoviItem(item: T){
        this.lista.splice(this.lista.indexOf(item,1));
    }
}

const listaStringhe= new Prova<string>();
listaStringhe.aggiungiItem('luca');
listaStringhe.aggiungiItem('anna');
listaStringhe.aggiungiItem('gaia');

const listaNumeri = new Prova<number>();
listaNumeri.aggiungiItem(3);
listaNumeri.aggiungiItem(34);
listaNumeri.aggiungiItem(134);