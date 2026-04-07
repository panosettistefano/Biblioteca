// la prima cosa che faccio è configurare il server. 

//importo il framework express
const express = require('express');

// importo il modulo path per poter gestire comodamente i percorsi con / 
const path = require('path');

//creo l'app express che contiene tutti le funzioni e i moduli del server 
const app = express();

//definisco la porta del server 
const PORT = 5000;

//Middleware json
//ora dico al server che ogni volta che inviamo dei dati al front end arrivano sempre come formato stringa
app.use(express.json());

//Middleware su file locali
//dico al server che ogni volta che un utente chiede il percorso da locale, quindi senza Api gli apre i file pubblici.
app.use(express.static(path.join(__dirname, 'public')));


//ora qui creo la mia costante Api. 
const API_URL = 'https://69c6a8e8f272266f3eacf068.mockapi.io/bibliotecaStefanoPanosetti/Libri';


// implemento la route GET Libri
app.get("/api/Libri", (req, res) => {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("c'è un errore nel recupero dei libri");
            }

            return response.json();
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({
                errore: "operazione fallita",
                dettagli: error.message
            });
        })
});


//inserimento all interno del database 
app.post('/api/Libri', (req, res) => {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore di inseriemnto")
            }
            
            return response.json();
        })
        .then(data => {
            res.status(201);
            res.json(data);
            //oppure
            //res.status(201).json(data)
        })
        .catch (error => {
            res.status(500).json({
                errore: "impossibile inserire il libro",
                dettagli: error.message
            });
        });
});
            

// modifica
app.put("/api/Libri/:id", (req, res) => {
    //definisco quello che è l'id che cerco
    const id = req.params.id;

    fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(req.body)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Errore di modifica")
        }

        return response.json();
    })
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.status(500).json({
            errore: "errore di modifica",
            dettagli: error.message
        });
    });
});




//creo anche la route DELETE
app.delete("/api/Libri/:id" , (req, res) => {
    const id = req.params.id; 

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Errore nell'eliminazione");
        }

        return response.json();
    })
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.status(500).json({
            errore : "errore catch di eliminaazione",
            dettagli : error.message
        });
    });
            
});

//avviamento del server 
app.listen(PORT, () => {
    console.log("app in ascolto su http://localhost:" + PORT);
})





