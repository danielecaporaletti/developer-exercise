abstract class EssereVivente{

    sonoVivo(): boolean{
        return true;
    }

    abstract presenta(): void;

}

class Persona extends EssereVivente {

    static prova = 'miao';

    constructor(protected nome: string, protected readonly cognome: string) {
        super();
    }

    presenta(): void{
        console.log(`ciao sono ${this.nome} ${this.cognome}`);
    }

    saluta(persona: Persona): void {
        console.log(`ciao ${persona.nome} ${persona.cognome}, molto piacere`);
    }
}

Persona.prova;

class Studente extends Persona {

    constructor(nome: string, cognome: string, private materiaPreferita: string){
        super(nome, cognome);
    }

    setNome(newNome: string){
        this.nome = newNome;
    }
}

const studente1: Studente = new Studente('luca', 'rossi', 'storia');
const studente2: Studente = new Studente('luca', 'rossi', 'storia');

class Preside extends Persona {

    private static instance: Preside;

    private constructor(nome: string, cognome: string, private ruolo: string){
        super(nome, cognome);
    }

    static getInstance(): Preside{
        if (!Preside.instance){
            this.instance = new Preside('marco', 'aurelio', 'preside');
        }
        return this.instance;
    }

    saluta(): void {
        console.log(`buongiorno, sono il preside ${this.nome} ${this.cognome}`);
    }
}

Preside.getInstance().presenta();



