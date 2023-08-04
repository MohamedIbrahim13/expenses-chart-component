const colContainer = document.querySelector(".cols");

const getData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
};

// getData().then(arr => {
//   console.log(arr);
// });

function onHover(ele, over, leave) {
  ele.addEventListener("mouseover", over);
  ele.addEventListener("mouseleave", leave);
}

function document_loaded() {
  return getData().then(data => {
    data.map(item => {
      colContainer.innerHTML += `<div class="col" style='height:${item.amount}px;position:relative'>
      <div class="hidden" style='position:absolute;top:-35px;background-color:var(--darkBrown);color:white;padding:5px;border-radius:3px'>$${item.amount}</div>
      <div style='position:absolute;bottom:-25px'>${item.day}</div></div>`;
    });
    const cols = document.querySelectorAll(".col");
    cols.forEach(col => {
      onHover(
        col,
        () => {
          col.childNodes[1].classList.remove("hidden");
        },
        () => {
          col.childNodes[1].classList.add("hidden");
        }
      );
    });
  });
}

document.readyState == "complete"
  ? document_loaded
  : window.addEventListener("load", document_loaded);
