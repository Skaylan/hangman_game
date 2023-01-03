window.onload = async () => {

    const data = await fetch("https://hangman-game-api.vercel.app/api/v1/get-game-data", {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'appiclation-json',
        },
    })
    const gameData = await data.json()
    const value = gameData.value
    const category = gameData.category
    
    // const fruitWords = ["amora", "pera", "abacaxi", "abacate", "morango", "laranja", "uva", "uxi", "banana", "bacuri", "buruti", "caju", "carambola", "cacau", "damasco", "duriao", "embauba", "figo", "framboesa", "goiaba", "graviola", "groselha", "heisteria", "inga", "jambo", "jabuticaba", "kiwi", "limao", "lichia", "mamao", "melancia", "marmelo", "nectarina", "nespera", "guarana", "pessego", "quina", "roma", "seriguela", "sapoti", "tamara", "tamarindo", "tangerina", "umbu", "veludo", "xixa", "yamamomo", "zimbro"]
    // const randomIndex = Math.floor(Math.random() * fruitWords.length)
    // let wordChosed = fruitWords[randomIndex]
    let wordChosed = gameData.value
    wordChosed = wordChosed.toLowerCase()
    wordChosed = wordChosed.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    wordChosed = wordChosed.replaceAll(" ", "-")
    const alreadyChosenLetters = []
    let chances = 6
    const hit = []
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    const modal = document.querySelector(".modal")
    const modalContent = document.querySelector("#modal_content")
    const closeCrossButton = document.querySelector("#close_cross")
    const closeButton = document.querySelector(".close_button")
    const buttons = document.querySelectorAll(".button")
    const dashDisplay = document.querySelector(".display_dash")
    const displayChances = document.querySelector("#display_chances")
    const titleH3 = document.querySelector("#title-h3")


    titleH3.innerHTML = `Dica: ${gameData.category}`

    wordChosed = wordChosed.split("")
    wordChosed.forEach(element => {
        hit.push("_")
        dashDisplay.innerHTML = String(hit).replaceAll(",", " ")
    });
    for (let i=0; i<wordChosed.length; i++) {
        if (wordChosed[i] === '-') {
            hit[i] = '-'
        }
    }
    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            if (alreadyChosenLetters.includes(button.value)) {
                modalContent.innerHTML = 'Letra já escolhida!'
                modal.style.visibility = 'visible'
            }else {
                for (let i=0; i<wordChosed.length; i++) {
                    if (button.value === wordChosed[i]) {
                        hit[i] = wordChosed[i]
                        dashDisplay.innerHTML = String(hit).replaceAll(",", " ")
                        if (String(hit) === String(wordChosed)) {
                            await sleep(.1)
                            modalContent.innerHTML = 'Parabéns, Você acertou! 🥳'
                            modal.style.visibility = 'visible'
                            closeCrossButton.addEventListener('click', () => {
                                modal.style.visibility = 'hidden'
                                window.location.reload()
                            })

                            closeButton.addEventListener('click', () => {
                                modal.style.visibility = 'hidden'
                                window.location.reload()
                            })
                        }
                    }else if (!wordChosed.includes(button.value)) {
                        chances--
                        if (chances <= 0) {
                            modalContent.innerHTML = 'Que pena, Você perdeu! 😢, a palavra era ' + String(wordChosed).replaceAll(",", "") + "!"
                            modal.style.visibility = 'visible'
                            closeCrossButton.addEventListener('click', () => {
                                modal.style.visibility = 'hidden'
                                window.location.reload()
                            })
                            closeButton.addEventListener('click', () => {
                                modal.style.visibility = 'hidden'
                                window.location.reload()
                            })
                        }
                        break
                    }
                    
                }
                alreadyChosenLetters.push(button.value)
            }
            if (alreadyChosenLetters.includes(button.value)) {
                button.style.background = "#ecad23"
            }
            displayChances.innerHTML = "Chances restantes: " + chances
        })
    });
    displayChances.innerHTML = "Chances restantes: " + chances

    closeCrossButton.addEventListener('click', () => {
        modal.style.visibility = 'hidden'
    })
    closeButton.addEventListener('click', () => {
        modal.style.visibility = 'hidden'
    })

}