window.onload = () => {
    const fruitWords = ["amora", "pera", "abacaxi", "abacate", "morango", "laranja", "uva", "uxi", "banana", "bacuri", "buruti", "caju", "carambola", "cacau", "damasco", "duriao", "embauba", "figo", "framboesa", "goiaba", "graviola", "groselha", "heisteria", "inga", "jambo", "jabuticaba", "kiwi", "limao", "lichia", "mamao", "melancia", "marmelo", "nectarina", "nespera", "guarana", "pessego", "quina", "roma", "seriguela", "sapoti", "tamara", "tamarindo", "tangerina", "umbu", "veludo", "xixa", "yamamomo", "zimbro"]
    const randomIndex = Math.floor(Math.random() * fruitWords.length)
    let fruitChosen = fruitWords[randomIndex]
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

    fruitChosen = fruitChosen.split("")
    fruitChosen.forEach(element => {
        hit.push("_")
        dashDisplay.innerHTML = String(hit).replaceAll(",", " ")
    });

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            if (alreadyChosenLetters.includes(button.value)) {
                modalContent.innerHTML = 'Letra já escolhida!'
                modal.style.visibility = 'visible'
            }else {
                for (let i=0; i<fruitChosen.length; i++) {
                    if (button.value === fruitChosen[i]) {
                        hit[i] = fruitChosen[i]
                        dashDisplay.innerHTML = String(hit).replaceAll(",", " ")
                        if (String(hit) === String(fruitChosen)) {
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
                    }else if (!fruitChosen.includes(button.value)) {
                        chances--
                        if (chances <= 0) {
                            modalContent.innerHTML = 'Que pena, Você perdeu! 😢, a palavra era ' + String(fruitChosen).replaceAll(",", "") + "!"
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