export function MakeContainerDraggable(event, container) {

    let isDragging = true;
    let dragX = event.clientX - container.offsetLeft;
    let dragY = event.clientY - container.offsetTop;

    document.addEventListener("mousemove", (e) => drag(e, container));
    document.addEventListener("mouseup", (e) => dragEnd(e, container));
    document.addEventListener("mouseleave", () => dragEnd());


    function drag(event, container) {
        if (isDragging) {
            container.style.left = event.clientX - dragX + "px";
            container.style.top = event.clientY - dragY + "px";
        }
    }

    function dragEnd() {
        isDragging = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", dragEnd);
    }


}