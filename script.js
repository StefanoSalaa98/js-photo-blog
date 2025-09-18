const cardContainer = document.querySelector(".container");
const overlayCard = document.querySelector(".overlay");
const chiudiOverlay = document.querySelector(".bottone");
const overlayImage = document.querySelector(".card-overlay");
const titolo = document.querySelector("header");
const galleria = document.querySelector(".gallery");

const apiPictures = "https://lanciweb.github.io/demo/api/pictures/";

function createNewCard(){
        let cards = "";
        axios.get(apiPictures)
            .then(risposta => {
                //codice da eseguire in caso di successo
                const result = risposta.data;
                for (i=0; i<result.length; i++){
                    const {id, title, date, url} = result[i];
                    const titolo = title.toUpperCase();
                    console.log(titolo);
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

                cardContainer.innerHTML += cards;

                const elencoItems = document.querySelectorAll(".card");
                // console.log(elencoItems);

                
                elencoItems.forEach(cardItem => {
                    cardItem.addEventListener("click", () => {
                        let overlay = "";

                        overlayCard.classList.remove("d-none");
                        overlayCard.classList.add("d-block");
                        
                        const contenitoreImg = cardItem.querySelector (".card-img img");

                        overlay +=` 
                        <div class="card-img card-overlay">
                            <img id="overlay-immagine" src="${contenitoreImg.src}" alt="Immagine-in-overlay">
                        </div>
                        `;  
                        
                        overlayImage.innerHTML = overlay;
                        
                        titolo.classList.add("oscura");
                        galleria.classList.add("oscura");
                        

                    })
                });

                chiudiOverlay.addEventListener("click", () => {
                    overlayCard.classList.remove("d-block");
                    overlayCard.classList.add("d-none");

                    
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

