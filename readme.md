# BIBLIOTECA DI STEFANO

## STRUTTURA
LibreriaStefano/ <br>
    package.json <br>
    server.js <br>
    readme.md <br>
    public/ <br>
        - index.html <br>
        - script.js<br>
        - style.css<br>
    schreenshot&link/ <br>
        - foto e txt con link MOCKAPI
    
    


1) ho creato la mia rotta API su mockAPI creando la struttura dell'oggetto Libri
2) ho impostato il server seguendo i vari passaggi e preparnadolo per le operazioni di CRUD. 
3) ho creato lo scheletro in HTML utilizzando Bootrastrap per importare dei modali che ho sfruttato per creare una hero che contiene i Tre pulsanti principali da cui si possono aprire le Opzioni del Sito. 

4) Ho creato lo style.css aggiugendo pochissime personalizzazioni poichè ho deciso di gestire quasi tutto con bootstrap per facilitarmi il lavoro "grafico"

5) dopo aver creato e definito server, html e style ho creato il file script e la prima cosa che ho fatto è stato implemetare gli elementi html tramite gli id

6) ho creato la funzione caricaLibri seguendo la logica dell'esempio del cinema. Poi ho testatol, inserendo da Postman il funzionamento della fuzione.

8) ho fatto i modo che i bottoni fossero collegati ad eventi specifici

7) ho creato tutte le altre funzioni base quindi inserimento/modifica ed elimina. 

8) da qui ho iniziato ad aggiungere le funzioni avanzate aggiugendo un filter dentro carica ma ancor prima creando una funzione che legge i generi presenti nella libreria e li carica in autotico nella tendina html "filtroGeneri"

9) per ultima ho creato il bottone per le statistiche ed una piccola funzione che fa il report dei libri totali divisi in 3 "epoche" storiche diverse, ci dice il libro più recente e il numero totale della pagine. Tramite il tasto aggiorna diciamo al programma di calcolare via js queste statistiche

10) ho eliminato i node_moduls

COMMENTO: ho cercato di fare qualcosa di leggermente diverso dall'esempio del cinema mantenendo una logica simile. Alcune cose le ho dovute cercare su internet ma il riferimento ufficiale del lavoro è stata la guida. 