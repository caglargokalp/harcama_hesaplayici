/* html'den gelenler */
const addBtn = document.getElementById("add-btn");
const titleInp = document.querySelector("#title-inp");
const priceInp = document.getElementById("price-inp");
const list = document.querySelector("#list");
const checkBox = document.querySelector("#checked");
const totalSpan = document.querySelector("#price-info");
const select = document.querySelector("select");
const userInp = document.querySelector('#user-inp')

/* olay izleyicisi */
addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUptade);
select.addEventListener("change", handleFilter);
userInp.addEventListener('change', saveUser)
document.addEventListener('DOMContentLoaded',getUser)

/* toplam fiyat bilgisi*/

let totalPrice = 0;
/* fonksiyonlar */

function updateTotal(price) {
  totalPrice += price;

  /* js de tutulan değişkeni günceller */
  totalSpan.innerText = totalPrice;
}

/* yeni  harcama ekler */

function addExpense(event) {
  /* sayfayı yenilemeyi eneller */
  event.preventDefault();

  /* inputların değerlerine erişöme */
  const title = titleInp.value;
  const price = priceInp.valueAsNumber;
  console.dir(checkBox);
  /* sift option alt tuşu */
  /* inputlardan biri boşisa alert ve fonksiyonu durdur */

  if (!title === "" || !price) {
    alert("lütfen formu doldurunuz");
    return;
  }
  /* inputlar doluysa bir kart oluştur ve html 'e gönder */

  /* div oluşturma */

  const expenseDiv = document.createElement("div");

  /* class ekleme */

  expenseDiv.classList.add("expense");
  if (checkBox.checked === true) {
    expenseDiv.classList.add("paid");
  }

  expenseDiv.innerHTML = `  <h2 id="title">${title} </h2>
     <h2 id="price">${price} </h2>
        <div class="btns">
    <img id="update" src="/images/pay.png" alt="">
    <img id="delete" src="/images/del.png" alt="">
   </div>`;
  /* oluşan kartı html e gönderme */
  list.appendChild(expenseDiv);

  /* e-toplamı güncelle */
  updateTotal(price);

  /*  inputları temizleme */

  titleInp.value = "";
  priceInp.value = "";
  checkBox.checked = false;
}

/* harcamyı siler */
function handleUptade(event) {
  const ele = event.target;

  /* tıklanan butonun kapsayıcısına/ kartına ulaşma */

  const parent = ele.parentElement.parentElement;

  /* tıklanılan elemanınn id si delete ise çalışır */

  if (ele.id === "delete") {
    /* sildiğiniz elemenın fiyatına erişme */

    const price = Number(parent.children[1].innerText);

    /*  toplamdan sildiğimiz fiyatı cıkarma*/

    updateTotal(-price);
    /* elemanı html den kaldırma */

    parent.remove();
  }

  //tıklanılan element güncelle ise
  if (ele.id === "update") {
    parent.classList.toggle("paid");
  }
}
//notları filtreler

function handleFilter(event) {
  const selected = event.target.value;

  //listedeki elemanlara erişme

  const items = list.childNodes;

  //listedeki her bir eleman için switch ile yapacağımız
  //sorgu elemanın gözekeceğine karar verecek

  items.forEach((item) => {
    // /seçilen işleme göre karar verme

    switch (selected) {
      case "all":
        //class' paid olsada olmasada göster
        item.style.display = "flex";
        break;

      case "paid":
        //class'nda paid olmayanlar gizlenecek

        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }

        break;
      case "not-paid":
        // class'ında paid olanlar gizlenecek
        if (item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}

//kullacıyı kaydeder

function saveUser(event){

  localStorage.setItem('username',event.target.value);
}

//kullanıcıyı lokalden alıp inputa yazar

function getUser(){

  const username = localStorage.getItem('username') || '';

//kullanıcı ismini inputa aktar

userInp.value=username;

}