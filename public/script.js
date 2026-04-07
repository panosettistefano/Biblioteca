// importo  gli elementi del documento HTML dagli id
const libroIdInput = document.getElementById('libroId');
const titoloInput = document.getElementById('titolo');
const autoreInput = document.getElementById('autore');
const genereInput = document.getElementById('genere');
const annoInput = document.getElementById('anno');
const pagineInput = document.getElementById('pagine');

// Messaggio 
const messaggioForm = document.getElementById('messaggioForm');

// Bottoni e Tabella
const salvaBtn = document.getElementById('salvaBtn');
const caricaBtn = document.getElementById('caricaBtn');
const tabellaLibri = document.getElementById('tabellaLibri');
const campoGeneri = document.getElementById('campoGeneri')


//aggiungo i filtri e le Statistiche
const filtroGenere = document.getElementById('filtroGenere');
const filtroPagine = document.getElementById('filtroPagine');
const tabellaStatistiche = document.getElementById('tabellaStatistiche');


//inizio a creare le funzioni

//creao la FUNZIONE PER CARICARE I LIBRI

function caricaLibri() {
    tabellaLibri.innerHTML = "<td>Caricamento in corso</td>";

    fetch("/api/Libri")
        .then(response => {
            if (!response.ok) throw new Error("Errore di connessione");
            return response.json();
        })
        .then(libri => {
            tabellaLibri.innerHTML = ""; // Svuoto la tabella

            //qui ho aggiunto le costanti JS collegate ai filtri scelti dall html
            const genereScelto = filtroGenere.value;
            const pagineScelte = filtroPagine.value;

            //lo inizializzo di default
            let libriFiltrati = libri;

            if (genereScelto !== "tutti") {
                libriFiltrati = libriFiltrati.filter(libro => libro.genere === String(genereScelto));
            }

            if (pagineScelte !== "tutti") {
                libriFiltrati = libriFiltrati.filter(libro => {

                    //ho dovuto riconvertire in number senno non funzionava
                    const numPagine = Number(libro.pagine);

                    if (pagineScelte === "250") {
                        return numPagine <= 250;
                    } else if (pagineScelte === "500") {
                        return numPagine > 250 && numPagine < 500;
                    } else if (pagineScelte === "piu500") {
                        return numPagine > 500;
                    }

                    return true;

                })

            }

            //se è vuoto torno direttamenete che non esistono libri 
            if (libriFiltrati.length === 0) {
                tabellaLibri.innerHTML = "<td>Nessun libro presente.</td>";
                return;
            }




            // per ogni libri Filtato, quindi rimasto, stampo l'intera riga della tabella e creo i due bottoni che serviranno per modifica/elimina
            libriFiltrati.forEach(libro => {
                const riga = document.createElement("tr");

                riga.innerHTML = `
                   <td>${libro.id}</td>
                   <td>${libro.titolo || ""}</td>
                   <td>${libro.autore || ""}</td>
                   <td>${libro.genere || ""}</td>
                   <td>${libro.anno || ""}</td>
                   <td>${libro.pagine || ""}</td>
                   <td>
                        <button class="btn btn-dark btn-sm modifica-btn" data-id="${libro.id}">Modifica</button>
                        <button class="btn elimina-btn text-dark rounded btn-light btn-sm" data-id="${libro.id}">Elimina</button>
                   </td>
                `;

                tabellaLibri.appendChild(riga);
            });

            collegaEventiBottoni(libri); // Attivo i bottoni appena creati
        })
        .catch(error => console.error(error));
}


// Senza questa funzione i due bottoni che ho creato non sono collegati a niente, quindi non fanno nulla. Devo collegarli agli eventi.

function collegaEventiBottoni(listaLibri) {
    const bottoniModifica = document.querySelectorAll(".modifica-btn");
    const bottoniElimina = document.querySelectorAll(".elimina-btn");

    bottoniModifica.forEach(bottone => {
        bottone.addEventListener("click", () => {
            const idCliccato = bottone.dataset.id;
            const libroScelto = listaLibri.find(libro => libro.id === idCliccato);

            // importaimo tutti i valori del libro scelto nel modale Inserisci, creando appunto una modifica
            if (libroScelto) {
                preparaModifica(libroScelto);
            }
        });
    });

    bottoniElimina.forEach(bottone => {
        bottone.addEventListener("click", () => {

            const idCliccato = bottone.dataset.id;
            eliminaLibro(idCliccato);

        });
    });
}

// Creo la funzione per riempire in automarico i campi utilizzando come input il libro in questione
function preparaModifica(libro) {
    // Metto i dati nel form
    libroIdInput.value = libro.id;
    titoloInput.value = libro.titolo || "";
    autoreInput.value = libro.autore || "";
    genereInput.value = libro.genere || "";
    annoInput.value = libro.anno || "";
    pagineInput.value = libro.pagine || "";

    messaggioForm.textContent = "Stai modificando il libro con ID: " + libro.id;
    messaggioForm.classList.remove('d-none');

    // qui ho dovuto cercare come si automatizzava la chiusura e aprturna delle modali di bootstrap
    bootstrap.Modal.getInstance(document.getElementById('modalCerca')).hide();
    new bootstrap.Modal(document.getElementById('modalInserisci')).show();
}



//pulisco il form dopo aver fatto un inserimento. 
function pulisciForm() {
    libroIdInput.value = "";
    titoloInput.value = "";
    autoreInput.value = "";
    genereInput.value = "";
    annoInput.value = "";
    pagineInput.value = "";
    messaggioForm.textContent = "";
    messaggioForm.classList.remove('d-none');
}

//SALVATAGGIO
function salvaLibro() {
    const id = libroIdInput.value.trim();
    const titolo = titoloInput.value.trim();
    const autore = autoreInput.value.trim();
    const genere = genereInput.value.trim();
    const anno = annoInput.value.trim();
    const pagine = pagineInput.value.trim();


    if (titolo === "" || autore === "" || genere === "" || anno === "" || pagine === "") {
        messaggioForm.textContent = "compilare tutti i campi per salvare";
        messaggioForm.classList.remove('d-none');
        retrun;
    }

    const datiLibro = {
        titolo: titolo,
        autore: autore,
        genere: genere,
        anno: anno,
        pagine: pagine
    };

    //inserimento
    if (id === "") {
        fetch("/api/Libri", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datiLibro)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("errore nell inserimento del libro")
                }

                return response.json();
            })
            .then(() => {
                pulisciForm();
                messaggioForm.textContent = "Hai inserito il film correttamente";
                messaggioForm.classList.remove('d-none');
                caricaLibri();
            })
            .catch(error => {
                messaggioForm.textContent = "errore:" + error.message;
            })
    }
    //aggiornamento
    else {
        fetch("/api/Libri/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datiLibro)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("errore di aggiornamento")
                }
                return response.json();
            })
            .then(() => {
                messaggioForm.textContent = "ok, hai aggiornato il libro";
                messaggioForm.classList.remove('d-none');
                pulisciForm();
                caricaLibri();
            })
            .catch(error => {
                messaggioForm.textContent = "errore: " + error.message;
            });
    }
}

function eliminaLibro(id) {
    fetch("/api/Libri/" + id, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Errore eliminazione");
            return response.json();
        })
        .then(() => caricaLibri())
        .catch(error => console.error(error));
}



//creo la funzione che mostra i generi all interno della tendina filtro del modulo Catalogo
function mostraCampoGeneri() {
    fetch("/api/Libri")
        .then(response => {
            if (!response.ok) throw new Error("Errore di recupero Api");
            return response.json();
        })
        .then(libri => {
            //Prelevo solo i generi con map
            const tuttiIGeneri = libri.map(libro => libro.genere);

            // uso set per eliminare i doppi. Qui ho voluto usare una nuova funzione js 
            const generiUnici = [...new Set(tuttiIGeneri)];
            filtroGenere.innerHTML = '<option value="tutti">Tutti i generi</option>';

            // Aggiungo un option per ogni genere trovato
            generiUnici.forEach(genere => {
                if (genere) { // evito di inserire generi vuoti
                    filtroGenere.innerHTML += `<option value="${genere}">${genere}</option>`;
                }
            });
        })
        .catch(error => console.error("Errore caricamento generi:", error));
}

           



// creo la funzione che calcola tutte le mie statistiche crea una tabella
function statistiche() {
    fetch("/api/Libri")
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nel cariciamento dati api");
            }

            return response.json();
        })
        .then(libri => {

            let libriTotali = 0;
            let libriAntichi = 0;
            let libriStorici = 0;
            let libriContemporanei = 0;
            let pagineTotali = 0;

            let libroRecente = ""
            let annoMax = 0;


            libri.forEach(libro => {

                //libri.find(libro => libro.pagine > libro.pagine )
                // torvo il numero della pagine totali
                pagineTotali += Number(libro.pagine) || 0;

                const annoLibro = Number(libro.anno);
                if (annoLibro > annoMax) {
                    libroRecente = libro.titolo;
                    annoMax = libro.anno;
                }

                if (libro.anno < 1900) {
                    ++libriAntichi;
                    ++libriTotali;
                } else if (libro.anno > 1900 && libro.anno < 1950) {
                    ++libriStorici;
                    ++libriTotali;
                } else if (libro.anno > 1950) {
                    ++libriContemporanei;
                    ++libriTotali;
                }
            });
            // ripulisco la tabella per evitare che i dati si sovrascrivono
            tabellaStatistiche.innerHTML = "";

            const riga1 = document.createElement("tr");
            riga1.innerHTML = `
                                    <td>${libriTotali}</td>
                                   <td>${libriAntichi || ""}</td>
                                   <td>${libriStorici || ""}</td>
                                   <td>${libriContemporanei || ""}</td>
                                   <td>${libroRecente || ""}</td>
                                    <td>${pagineTotali || ""}</td>
                                   `;

            tabellaStatistiche.appendChild(riga1);
        })
        .catch(error => {
            messaggioForm.textContent = "errore: " + error.message;
        })
}



//attacco le funzioni agli elementi html 

salvaBtn.addEventListener('click', salvaLibro);
caricaBtn.addEventListener('click', caricaLibri);

// Svuoto il form quando si chiude il modale di inserimento
document.getElementById('modalInserisci').addEventListener('hidden.bs.modal', pulisciForm);

// Carico i libri appena avvio la pagina
caricaLibri();


document.addEventListener('click', statistiche);
//funzione aggiunta alla fine per gestire il processo di aggiornamento
caricaBtn.addEventListener('click', mostraCampoGeneri);





































