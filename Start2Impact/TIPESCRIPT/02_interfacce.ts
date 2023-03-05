interface internet{
    ip: string;
    connettiInternet(): void;
}

abstract class Dispositivo {
    
    constructor(protected nome: string, protected anno: number){}

    abstract accedni(): void;
    abstract spegni(): void;
}

class Telefono extends Dispositivo {

    accedni(): void {
        console.log('il telefono si accende');
    }
    spegni(): void {
        console.log('il telefono si spegne');
    }
}

class Smartphone extends Dispositivo implements internet {
    ip: string;

    constructor(ip: string, nome: string, anno: number){
        super(nome, anno);
        this.ip = ip;
    }

    connettiInternet(): void {
        console.log('lo smartphone si connette');
    }
    accedni(): void {
        console.log('lo smartphone si accende');
    }
    spegni(): void {
        console.log('lo smartphone si spegne');
    }
}

class Computer extends Dispositivo implements internet {
    ip: string;

    constructor(ip: string, nome: string, anno: number){
        super(nome, anno);
        this.ip = ip;
    }

    connettiInternet(): void {
        console.log('il computer si connette');
    }
    accedni(): void {
        console.log('il computer si accende');
    }
    spegni(): void {
        console.log('il computer si spegne');
    }
}










interface x{
    nome: string;
}

interface y extends x{
    cognome: string;
}

interface z{
    telefono: string;
}

interface W extends y,z{

}