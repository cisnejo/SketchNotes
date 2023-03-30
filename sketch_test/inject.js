

const overlayHTML = chrome.extension.getURL('overlay.html');

const overlay = document.createElement('iframe');
overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: 99'
overlay.src = overlayHTML;
document.body.appendChild(overlay);




function buttonContainer() {
    const div_container = document.createElement('div')
    const p_label = document.createElement('p')
    const ul_list = document.createElement('ul')
    const li_toggle = document.createElement('li')
    const button_toggle = document.createElement('button')

    li_toggle.appendChild(button_toggle)
    ul_list.appendChild(li_toggle)
    div_container.appendChild(p_label)
    div_container.appendChild(ul_list)

    p_label.innerText = "Sketch Notes"
    button_toggle.innerText = "Toggle"
    let overlayStatus = false

    button_toggle.addEventListener("click", () => {
        console.log('hello')
        overlayStatus ? overlay.style.display = 'none' : overlay.style.display = 'block'
        overlayStatus != overlayStatus
    })

    const styles_divContainer = {
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "100",
        border: "1px solid black"
    }

    Object.assign(div_container.style, styles_divContainer)
    return div_container
}

document.body.appendChild(buttonContainer())