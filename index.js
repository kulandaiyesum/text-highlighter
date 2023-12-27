const selectableTextArea = document.querySelectorAll(".selectable-text-area");

const highlightBtn = document.querySelector("#mark-btn");

selectableTextArea.forEach((elem) => {
  elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

function selectableTextAreaMouseUp(event) {
  setTimeout(() => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length) {
      const x = event.pageX;
      const y = event.pageY;
      const highlightBtnWidth = Number(
        getComputedStyle(highlightBtn).width.slice(0, -2)
      ); // 40px -- here using slice to remove the px and get only the number
      const highlightBtnHeight = Number(
        getComputedStyle(highlightBtn).height.slice(0, -2)
      );
      if (document.activeElement !== highlightBtn) {
        highlightBtn.style.left = `${x - highlightBtnWidth * 0.5}px`;
        highlightBtn.style.top = `${y - highlightBtnHeight * 1.25}px`;
        highlightBtn.style.display = "block";
        highlightBtn.classList.add("btnEntrance");
      } else {
        highlightBtn.style.left = `${x - highlightBtnWidth * 0.5}px`;
        highlightBtn.style.top = `${y - highlightBtnHeight * 0.5}px`;
      }
    }
  }, 0);
}

document.addEventListener("mousedown", documentMouseDown);
function documentMouseDown(event) {
  if (
    getComputedStyle(highlightBtn).display === "block" &&
    event.target.id !== "mark-btn"
  ) {
    highlightBtn.style.display = "none";
    highlightBtn.classList.remove("btnEntrance");
    window.getSelection().empty(); // <=> window.getSelection().removeAllRanges();
  }
}
highlightBtn.addEventListener("click", highlightBtnClick);

function highlightBtnClick(event) {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  if (selectedText.length) {
    const range = selection.getRangeAt(0);
    const newNode = document.createElement("span");
    newNode.classList.add("highlighter");
    range.surroundContents(newNode);
  }
}
