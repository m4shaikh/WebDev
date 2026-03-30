const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
let urlList = [];
load();

if (urlList.length > 0) {
  renderList();
}

function load() {
  let storedUrlList = localStorage.getItem("storedUrlList");
  if (storedUrlList) {
    urlList = JSON.parse(storedUrlList);
  }
}

function store() {
  localStorage.setItem("storedUrlList", JSON.stringify(urlList));
}

function renderList() {
  let string = makeHTMLString();
  listEl.innerHTML = string;
}

function makeHTMLString() {
  let listItems = "";
  for (let i = 0; i < urlList.length; i++) {
    listItems += `<li><a href='${urlList[i]}' target = '_blank'>${urlList[i]}</a></li>`;
  }
  return listItems;
}

addBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    if (!urlList.includes(url)) {
      urlList.push(url);
    }
    renderList();
    store();
  });
});
