// selezione degli elementi di Output
const cardContainer = document.querySelector(".container");
const overlayCard = document.querySelector(".overlay");
const overlayImage = document.querySelector(".card-overlay");
const chiudiOverlay = document.querySelector(".bottone");
const titolo = document.querySelector("header");
const galleria = document.querySelector(".gallery");

const apiPictures = "https://lanciweb.github.io/demo/api/pictures/";

function createNewCard(){
        let cards = "";
        axios.get(apiPictures)
            .then(risposta => {
                // codice da eseguire in caso di successo
                const result = risposta.data;
                // scorro l'array ricevuto dalla API
                for (i=0; i<result.length; i++){
                    const {id, title, date, url} = result[i];
                    const titolo = title.toUpperCase();
                    // aggiungo una nuova card 
                    cards +=` 
                        <div class="card">
                            <div class="card-img">
                               <img src=${url} alt=${title}>
                            </div>
                            <div class="card-content">
                                <span>${titolo}</span>
                                <span>${date}</span>
                            </div>
                            <div class="pin">
                                <img src="img/pin.svg" alt="pin">
                            </div>
                        </div>
                        `;  
                }

                // inserisco le cards in pagina
                cardContainer.innerHTML += cards;

                // estraggo la lista delle card
                const elencoItems = document.querySelectorAll(".card");
                
                // imposto un addEventListener per ogni card
                elencoItems.forEach(cardItem => {
                    cardItem.addEventListener("click", () => {
                        let overlay = "";

                        // rendo visibile la card overlay
                        overlayCard.classList.remove("d-none");
                        overlayCard.classList.add("d-block");
                        
                        // seleziono il tag <img> della card che è stata cliccata
                        const contenitoreImg = cardItem.querySelector (".card-img img");
                        
                        // creo la card overlay
                        overlay =` 
                        <div class="card-img card-overlay">
                            <img id="overlay-immagine" src="${contenitoreImg.src}" alt="Immagine-in-overlay">
                        </div>
                        `;  

                        // inserisco la card overlay in pagina
                        overlayImage.innerHTML = overlay;
                        
                        // scurisco tutti gli altri elementi
                        titolo.classList.add("oscura");
                        galleria.classList.add("oscura");
                        

                    })
                });
                
                // evento click sul bottone
                chiudiOverlay.addEventListener("click", () => {
                    // nascondo la card overlay
                    overlayCard.classList.remove("d-block");
                    overlayCard.classList.add("d-none");

                    // schiarisco gli altri elementi
                    titolo.classList.remove("oscura");
                    galleria.classList.remove("oscura");
                })

            })
            .catch(error => {
                // codice da eseguire in caso di errore
                console.error(error);
            })
   
}

createNewCard();



