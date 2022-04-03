window.onload = () => {
    const fruitWords = ["amora","pera", "abacaxi", "abacate", "morango", "laranja", "uva", "uxi", "banana", "bacuri", "buruti", "caju", "carambola", "cacau", "damasco", "duriao", "embauba", "figo", "framboesa", "goiaba", "graviola", "groselha", "heisteria", "inga", "jambo", "jabuticaba", "kiwi", "limao", "lichia", "mamao", "melancia", "marmelo", "nectarina", "nespera", "guarana", "pessego", "quina", "roma", "seriguela", "sapoti", "tamara", "tamarindo", "tangerina", "umbu", "veludo", "xixa", "yamamomo", "zimbro"]
    const randomIndex = Math.floor(Math.random() * fruitWords.length)
    let fruitChoice = fruitWords[randomIndex]
    const alreadyChosenLetters = []
    let chances = 6
    const hit = []
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    const modal = document.querySelector(".modal")
    const modal_content = document.querySelector("#modal_content")
    const close_cross = document.querySelector("#close_cross")
    const close_button = document.querySelector(".close_button")
    const buttons = document.querySelectorAll(".button")
    const slash_display = document.querySelector(".display_slashs")
    const display_chances = document.querySelector("#display_chances")

    fruitChoice = fruitChoice.split("")
    fruitChoice.forEach(element => {
        hit.push("_")
        slash_display.innerHTML = hit
    });

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            if (alreadyChosenLetters.includes(button.value)) {
                modal_content.innerHTML = 'Letra já escolhida!'
                modal.style.visibility = 'visible'
            }else {
                for (let i=0; i<fruitChoice.length; i++) {
                    if (button.value === fruitChoice[i]) {
                        hit[i] = fruitChoice[i]
                        slash_display.innerHTML = hit
                        if (String(hit) === String(fruitChoice)) {
                            await sleep(.1)
                            modal_content.innerHTML = 'Parabéns, Você acertou! 🥳'
                            modal.style.visibility = 'visible'
                            close_button.addEventListener('click', () => {
                                modal.style.visibility = 'hidden'
                                window.location.reload()
                            })
                        }
                    }else if (!fruitChoice.includes(button.value)) {
                        chances--
                        if (chances <= 0) {
                            modal_content.innerHTML = 'Que pena, Você perdeu! 😢, a palavra era ' + String(fruitChoice).replaceAll(",", "") + "!"
                            modal.style.visibility = 'visible'
                            close_button.addEventListener('click', () => {
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
            display_chances.innerHTML = "Chances restantes: " + chances
        })
    });
    display_chances.innerHTML = "Chances restantes: " + chances

    close_cross.addEventListener('click', () => {
        modal.style.visibility = 'hidden'
    })
    close_button.addEventListener('click', () => {
        modal.style.visibility = 'hidden'
    })

}