const cardContainer = document.querySelector(".container");
const apiPictures = "https://lanciweb.github.io/demo/api/pictures/";

function createNewCard(){
        let cards = "";
        axios.get(apiPictures)
            .then(risposta => {
                //codice da eseguire in caso di successo
                const result = risposta.data;
                for (i=0; i<result.length; i++){
                    const {id, title, date, url} = result[i];
                    cards +=` 
                        <div class="card">
                            <div class="card-img">
                               <img src=${url} alt=${title}>
                            </div>
                            <div class="card-content">
                                <span>${title}</span>
                                <span>${date}</span>
                            </div>
                            <div class="pin">
                                <img src="img/pin.svg" alt="pin">
                            </div>
                        </div>
                        `;  
                }

                cardContainer.innerHTML += cards;
            })
            .catch(error => {
                // codice da eseguire in caso di errore
                console.error(error);
            })
   
}

createNewCard();
