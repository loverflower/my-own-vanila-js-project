"use strict";

const storeContainer = document.querySelector("ul");
const storeDetailsBlock = document.querySelector(".store-details-block");
const footerWrapper = document.querySelector(".footer-wrapper");
const footerRight = document.querySelector(".footer-right");
const noResultBox = document.querySelector(".no-result-box");
const inputStore = document.querySelector(".input-store");
const productsAmount = document.querySelector(".products-length-js");
const productsStatus = document.querySelector(".status-ok-js");
const productsStorage = document.querySelector(".status-storage-js");
const productsOutOfStock = document.querySelector(".status-outOfStock-js");
const sortNameUp = document.querySelector(".name-up-js");
const sortNameDown = document.querySelector(".name-down-js");
const tbody = document.querySelector(".tbody");
const thead = document.querySelector(".thead");
const allButtons = document.querySelectorAll(".btn-sort");
const sortpriceUp = document.querySelector(".price-up-js");
const sortpriceDown = document.querySelector(".price-down-js");
const sortSpecsUp = document.querySelector(".specs-up-js");
const sortSpecsDown = document.querySelector(".specs-down-js");
const sortSuplierInfoUp = document.querySelector(".suplierinfo-up-js");
const sortSuplierInfoDown = document.querySelector(".suplierinfo-down-js");
const sortProdcompanyUp = document.querySelector(".prodcompany-up-js");
const sortProdcompanyDown = document.querySelector(".prodcompany-down-js");
const sortratingUp = document.querySelector(".rating-up-js");
const sortratingDown = document.querySelector(".rating-down-js");
const sortCountryUp = document.querySelector(".country-up-js");
const sortCountryDown = document.querySelector(".country-down-js");
const inputProducts = document.querySelector("#form-product");
const inputProductsInput = document.querySelector(".input-products");
const inputPtoductsContainer = document.querySelector(".cross-button");
const descriptionEmail = document.querySelector(".description-email-js");
const descriptionPhone = document.querySelector(".description-phone-js");
const descriptionAdress = document.querySelector(".description-adress-js");
const descriptionEstablished = document.querySelector(
    ".description-established-js"
);
const descriptionFloor = document.querySelector(".description-floorArea-js");
const infoBox = document.querySelector(".info");
const popup = document.querySelector(".popup");
const storeButtons = document.querySelector(".form-store-buttons-js");
const deleteStoreJs = document.querySelector(".delete-store-js");
const newProducts = document.querySelector(".new-products-js");
const popupProducts = document.querySelector(".popup-products");
const productsButtons = document.querySelector(".form-products-buttons-js");
const popupEdit = document.querySelector(".popup-edit");
const editName = document.querySelector(".input-edit-name");
const editPrice = document.querySelector(".input-edit-price");
const editSpecs = document.querySelector(".input-edit-specs");
const editRating = document.querySelector(".input-edit-rating");
const editSuplier = document.querySelector(".input-edit-supplierinfo");
const editMadein = document.querySelector(".input-edit-madein");
const editProduct = document.querySelector(".input-edit-productcompany");
const editSelect = document.querySelector(".edit-select");
const editButtonsBox = document.querySelector(".form-edit-buttons-js");

const urlApi = "http://localhost:3000/api/";

let currentStore;
let stores;
let idProducts;
let currentFiltredProducts;
let currentInputProductMessage;
let clickedStore;

/////helpers///////

const selectorInfo = [
    ".products-length-js",
    ".status-ok-js",
    ".status-storage-js",
    ".status-outOfStock-js"
];

const selectorDescriptions = [
    ".description-email-js",
    ".description-phone-js",
    ".description-adress-js",
    ".description-established-js",
    ".description-floorArea-js"
];

const clearInfo = function(selectors) {
    selectors.forEach(e => (document.querySelector(e).innerHTML = ""));
};

const insertTableDataHtml = function(currentProduct, i) {
    return `<tr data-id="${currentProduct.id}">
    <td title="${currentProduct.Name}" ><span>${
        currentProduct.Name
    }</span> <br> ${i + 1}</td>
    <td <span>${currentProduct.Price}</span> <span>USD</span></td>
    <td title="${currentProduct.Specs}" class="cell-short-text">${
        currentProduct.Specs
    } </td>
    <td class="cell-short-text"
      title="${currentProduct.SupplierInfo} ">
      ${currentProduct.SupplierInfo} </td>
    <td>${currentProduct.MadeIn}</td>
    <td>${currentProduct.ProductionCompanyName}</td>
    <td>

      <div class="items-container">

        <div class="stars-box">
          ${showRatingStars(currentProduct.Rating)}
         </div>
         <div class="btn-edit-container-js"> 
         <button class="btn-edit btn-edit-products-js" data-id="${
             currentProduct.id
         }" type="button"><span><svg class="svg-size-tiny">
         
         <use xlink:href="/src/img/svg/sprite.svg#icon-pencil"></use>
     </svg></span></button>
     <button class="btn-edit btn-delete-products-js" data-id="${
         currentProduct.id
     }" type="button" <span><svg class="svg-size-tiny">
         <use xlink:href="/src/img/svg/sprite.svg#icon-cross"></use>
     </svg></span></button>
    
      </div>
      </div>
    </td>
  </tr>
`;
};
///// add info about products ////
const addInfoProducts = function(idProducts) {
    clearInfo(selectorInfo);
    productsAmount.insertAdjacentHTML("beforeend", `${idProducts.length} `);
    productsStatus.insertAdjacentHTML(
        "beforeend",
        `${showStatusInfo(idProducts).ok} `
    );
    productsStorage.insertAdjacentHTML(
        "beforeend",
        `${showStatusInfo(idProducts).storage} `
    );
    productsOutOfStock.insertAdjacentHTML(
        "beforeend",
        `${showStatusInfo(idProducts).outOfStock} `
    );
    tbody.innerHTML = "";
    idProducts.forEach((e, i) => {
        document
            .querySelector(".tbody")
            .insertAdjacentHTML("beforeend", insertTableDataHtml(e, i));
    });
};

////add  info about store
const addInfoStore = function(currentStore) {
    clearInfo(selectorDescriptions);
    descriptionEmail.insertAdjacentHTML("beforeend", `${currentStore.Email} `);
    descriptionPhone.insertAdjacentHTML(
        "beforeend",
        `${currentStore.PhoneNumber} `
    );
    descriptionAdress.insertAdjacentHTML(
        "beforeend",
        `${currentStore.Address} `
    );
    descriptionEstablished.insertAdjacentHTML(
        "beforeend",
        `${currentStore.Established} `
    );
    descriptionFloor.insertAdjacentHTML(
        "beforeend",
        `${currentStore.FloorArea} `
    );
};

///// show/close preloader ////
const showingPreloader = function(bool, selector) {
    if (bool) {
        document.querySelector(`.${selector}`).insertAdjacentHTML(
            "beforeend",
            `
            <svg class="svg-preloader" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="#fb5e5e" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
            `
        );
    } else {
        document.querySelector(`.${selector}`).innerHTML = "";
    }
};

////// changing button's view for inputs /////
const insertHtmlButtonsClose = function() {
    return `<button class="search-button" id="cross">
    <svg class="svg-size-tiny">
        <use
            xlink:href="/src/img/svg/sprite.svg#icon-cross"
        ></use>
    </svg>
</button>
<button
class="search-button" type="submit"
id="search"
>
<svg class="svg-size-tiny">
    <use
        xlink:href="/src/img/svg/sprite.svg#icon-search"
    ></use>
</svg>
</button>`;
};
////// change inputStoreButtons /////
const insertHtmlButtonsSearch = function() {
    return ` <button
    class="search-button"
    id="search" type="submit"
>
    <svg class="svg-size-tiny" >
        <use
            xlink:href="/src/img/svg/sprite.svg#icon-search"
        ></use>
    </svg>
</button>
<button class="search-button" >
    <svg class="svg-size-tiny">
        <use
            xlink:href="/src/img/svg/sprite.svg#icon-spinner9"
        ></use>
    </svg>
</button>
`;
};
////// render number of stores in html /////
const showStoreHtml = function(storesItem) {
    return `<li class="stores-items" data-id="${storesItem.id}">
<div class="item-box">
  <div class="positioned-item-name">
    <span title="${storesItem.Name}">${storesItem.Name}</span>
    <div class="positioned-item-text"><span>${storesItem.FloorArea}</span><span>sq.m</span></div>
  </div>
  <span>${storesItem.Address}</span>
</div>
</li>`;
};

/////clear all active store////
const clearAllactiveStores = function() {
    document
        .querySelectorAll("li")
        .forEach(e => e.classList.remove("active-store"));
};

//// choosing direction of sorting////
const choosingDirectionSort = function(listProducts, currentFiltredStores) {
    if (currentFiltredStores) {
        return currentFiltredStores;
    } else {
        return listProducts;
    }
};
/// store's filtration////
const filtrationStorage = function(currentMes) {
    if (!currentMes) return;
    const message = String(currentMes).toLowerCase();
    const filtredStores = stores.filter(obj => {
        for (let key of Object.values(obj)) {
            if (
                String(key)
                    .toLowerCase()
                    .indexOf(message) != -1
            ) {
                return true;
            }
        }
    });

    if (filtredStores.length === 0) {
        storeContainer.innerHTML = "";
        storeContainer.insertAdjacentHTML(
            "beforeend",
            `<li class="no-founded-stores">Ooopsss, try again!</li>`
        );
        return;
    }
    storeContainer.innerHTML = "";
    filtredStores.forEach(function(storesItem, _) {
        storeContainer.insertAdjacentHTML(
            "beforeend",
            showStoreHtml(storesItem)
        );
    });
};
/// sorting data of products////
const sortingDataProducts = function(
    listProducts,
    sortDirection,
    sortField,
    currentFiltredStores
) {
    let sortData;

    if (sortDirection) {
        sortData = choosingDirectionSort(listProducts, currentFiltredStores)
            .map(e => e)
            .sort((a, b) => {
                if (a[sortField] > b[sortField]) {
                    return 1;
                }
                if (a[sortField] < b[sortField]) {
                    return -1;
                }
                return 0;
            });
    } else {
        sortData = choosingDirectionSort(listProducts, currentFiltredStores)
            .map(e => e)
            .sort((a, b) => {
                if (a[sortField] < b[sortField]) {
                    return 1;
                }
                if (a[sortField] > b[sortField]) {
                    return -1;
                }
                return 0;
            });
    }
    return sortData;
};
///showing star's rating////
const showRatingStars = function(rating) {
    let i = 0;
    let result = "";
    do {
        i++;
        if (rating >= i) {
            result += `<svg class="svg-size-tiny">
            <use xlink:href="/src/img/svg/sprite.svg#icon-star-full"></use>
          </svg>`;
        } else {
            result += `<span></span><svg class="svg-size-tiny">
            <use xlink:href="/src/img/svg/sprite.svg#icon-star-empty"></use>
          </svg>`;
        }
    } while (i < 5);
    return result;
};
///showing statusinfo////
const showStatusInfo = function(currentStore) {
    const currentStatusObject = { ok: 0, storage: 0, outOfStock: 0 };
    currentStore.forEach(e => {
        if (e.Status === "OK") {
            currentStatusObject.ok += 1;
        } else if (e.Status === "STORAGE") {
            currentStatusObject.storage += 1;
        } else if (e.Status === "OUT_OF_STOCK") {
            currentStatusObject.outOfStock += 1;
        } else {
            return;
        }
    });
    return currentStatusObject;
};
///clearing page when rerender happens////
const clearFields = function() {
    noResultBox.classList.add("hidden");
    document.querySelector(".tbody").innerHTML = "";
    clearAllactiveStores();
    footerRight.classList.remove("hidden");
    allButtons.forEach(e => {
        e.classList.remove("active-sort");
    });
};
///render stores////
const showStores = function() {
    storeContainer.innerHTML = "";
    stores.forEach(function(storesItem, _) {
        storeContainer.insertAdjacentHTML(
            "beforeend",
            showStoreHtml(storesItem)
        );
    });
};
///clearing all active buttons besides current two////
const helpClearActiveButtons = function(currentButton) {
    const allButtonsMas = [...allButtons];
    const filtredButtonsMas = allButtonsMas.filter(e => {
        return (
            currentButton.classList[2].split("-")[0] !==
            e.classList[2].split("-")[0]
        );
    });

    filtredButtonsMas.forEach(e => e.classList.remove("active-sort"));
};

///////filtration status of products
const filterStatusProducts = function(listProducts, status) {
    let count = 0;
    currentFiltredProducts = listProducts.map(e => {
        if (e.Status === status) {
            tbody.insertAdjacentHTML(
                "beforeend",
                insertTableDataHtml(e, count++)
            );
            return e;
        }
    });

    if (status === "all-js") {
        tbody.innerHTML = "";
        currentFiltredProducts = listProducts.map((e, i) => {
            tbody.insertAdjacentHTML("beforeend", insertTableDataHtml(e, i));
            return e;
        });
    }
};

///sorting function////
let sortingDataTable = function(e) {
    const currentButton = e.target.closest("button");
    if (!currentButton) return;
    helpClearActiveButtons(currentButton);
    const showSortButton = function(
        currentSortbutton,
        buttonSortclass,
        directionSort,
        typeSort,
        upButton,
        downButton
    ) {
        if (currentSortbutton.classList.contains(buttonSortclass)) {
            if (!currentSortbutton.classList.contains("active-sort")) {
                const sortedData = sortingDataProducts(
                    idProducts,
                    directionSort,
                    typeSort,
                    currentFiltredProducts
                );

                currentSortbutton.classList.add("active-sort");
                if (directionSort) {
                    downButton.classList.remove("active-sort");
                } else {
                    upButton.classList.remove("active-sort");
                }
                tbody.innerHTML = "";

                sortedData.forEach((currentSortedProducts, i) => {
                    if (currentSortedProducts) {
                        tbody.insertAdjacentHTML(
                            "beforeend",
                            insertTableDataHtml(currentSortedProducts, i)
                        );
                    }
                });
            } else {
                tbody.innerHTML = "";
                currentSortbutton.classList.remove("active-sort");
                const currentData = !currentFiltredProducts
                    ? idProducts
                    : currentFiltredProducts;

                currentData
                    .filter(e => {
                        return e !== undefined;
                    })
                    .forEach((current, i) => {
                        tbody.insertAdjacentHTML(
                            "beforeend",
                            insertTableDataHtml(current, i)
                        );
                    });
            }
        }
    };
    showSortButton(
        currentButton,
        "name-up-js",
        true,
        "Name",
        sortNameUp,
        sortNameDown
    );

    showSortButton(
        currentButton,
        "name-down-js",
        false,
        "Name",
        sortNameUp,
        sortNameDown
    );

    showSortButton(
        currentButton,
        "price-up-js",
        true,
        "Price",
        sortpriceUp,
        sortpriceDown
    );
    showSortButton(
        currentButton,
        "price-down-js",
        false,
        "Price",
        sortpriceUp,
        sortpriceDown
    );

    showSortButton(
        currentButton,
        "specs-up-js",
        true,
        "Specs",
        sortSpecsUp,
        sortSpecsDown
    );

    showSortButton(
        currentButton,
        "specs-down-js",
        false,
        "Specs",
        sortSpecsUp,
        sortSpecsDown
    );

    showSortButton(
        currentButton,
        "suplierinfo-up-js",
        true,
        "SupplierInfo",
        sortSuplierInfoUp,
        sortSuplierInfoDown
    );

    showSortButton(
        currentButton,
        "suplierinfo-down-js",
        false,
        "SupplierInfo",
        sortSuplierInfoUp,
        sortSuplierInfoDown
    );

    showSortButton(
        currentButton,
        "prodcompany-up-js",
        true,
        "ProductionCompanyName",
        sortProdcompanyUp,
        sortProdcompanyDown
    );
    showSortButton(
        currentButton,
        "prodcompany-down-js",
        false,
        "ProductionCompanyName",
        sortProdcompanyUp,
        sortProdcompanyDown
    );

    showSortButton(
        currentButton,
        "rating-up-js",
        true,
        "Rating",
        sortratingUp,
        sortratingDown
    );
    showSortButton(
        currentButton,
        "rating-down-js",
        false,
        "Rating",
        sortratingUp,
        sortratingDown
    );

    showSortButton(
        currentButton,
        "country-up-js",
        true,
        "MadeIn",
        sortCountryUp,
        sortCountryDown
    );

    showSortButton(
        currentButton,
        "country-down-js",
        false,
        "MadeIn",
        sortCountryUp,
        sortCountryDown
    );
};
////filter products////
const filterStoreProducts = function(productSearchMessage, listProducts) {
    currentFiltredProducts = productSearchMessage
        ? currentFiltredProducts
        : listProducts;
    if (!currentFiltredProducts) currentFiltredProducts = listProducts;

    const message = String(productSearchMessage).toLowerCase();
    const filtredProducts = currentFiltredProducts
        .filter(e => {
            return e !== undefined;
        })

        .filter(obj => {
            for (let key of Object.values(obj)) {
                if (
                    String(key)
                        .toLowerCase()
                        .indexOf(message) != -1
                ) {
                    return true;
                }
            }
        });
    currentFiltredProducts = filtredProducts;

    if (filtredProducts.length === 0) {
        tbody.innerHTML = "";
        tbody.insertAdjacentHTML(
            "beforeend",
            `<div class="no-founded-stores">Ooopsss, haven't found</div>`
        );
        return;
    }
    tbody.innerHTML = "";
    filtredProducts.forEach(function(currentProduct, number) {
        tbody.insertAdjacentHTML(
            "beforeend",
            insertTableDataHtml(currentProduct, number)
        );
    });
};
/////listening input products ////
inputProducts.addEventListener("input", function(e) {
    currentInputProductMessage = e.target.value;
    inputPtoductsContainer.innerHTML = "";
    inputPtoductsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="search-button" type="button" id="cross-products">
            <svg class="svg-size-tiny">
                <use
                    xlink:href="/src/img/svg/sprite.svg#icon-cross"
                ></use>
            </svg>
        </button>
        `
    );

    document
        .querySelector("#cross-products")
        .addEventListener("click", function() {
            inputProductsInput.value = "";
            inputPtoductsContainer.innerHTML = "";
            tbody.innerHTML = "";
            filterStoreProducts("", idProducts);
            const allButtons = [...document.querySelectorAll(".btn-sort")];
            allButtons.forEach(e => {
                e.classList.remove("active-sort");
            });
            inputProductsInput.focus();
            currentInputProductMessage = "";
        });
});
inputProducts.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!currentInputProductMessage) return;
    filterStoreProducts(currentInputProductMessage, idProducts);
});

const getStores = async function() {
    showingPreloader(true, "preloader");
    try {
        const resp = await fetch(urlApi + "Stores");
        stores = await resp.json();
    } catch (err) {
        alert(err.message);
    }
    document.querySelector(".preloader").classList.remove("preloader-width");
    showingPreloader(false, "preloader");
    showStores(stores);
};

const getProducts = async function(currentStore) {
    document
        .querySelector(".section-preloader")
        .classList.remove("hide-section-preloader");
    showingPreloader(true, "section-preloader");
    try {
        const resp = await fetch(
            `${urlApi}Products?filter=%7B%22where%22%3A%7B%22StoreId%22%3A%22${currentStore.id}%22%7D%7D`
        );
        idProducts = await resp.json();
    } catch (err) {
        alert(err.message);
    }
    showingPreloader(false, "section-preloader");
    document
        .querySelector(".section-preloader")
        .classList.add("hide-section-preloader");
    storeDetailsBlock.classList.remove("overflow");
    document.querySelectorAll(".info-store").forEach(e => {
        e.classList.remove("info-store-bottom");
    });
    addInfoStore(currentStore);
    addInfoProducts(idProducts);
    thead.removeEventListener("click", sortingDataTable);
    thead.addEventListener("click", sortingDataTable);
};

/////getting products of current store//////
storeContainer.addEventListener("click", function(event) {
    document.querySelector(".no-result-box").classList.add("display-none");
    clickedStore = event.target.closest("li");

    stores.forEach(function(e, _) {
        if (clickedStore.dataset.id == e.id) {
            currentStore = e;
            clearFields();
            clickedStore.classList.add("active-store");
            currentFiltredProducts = null;
            getProducts(currentStore);
        }
    });
});
////////////update value from input store/////
const updateValueInputStore = function(e) {
    let currentInputValue = e.target.value;
    document.querySelector(".search-buttons-wrapper").innerHTML = "";
    document
        .querySelector(".search-buttons-wrapper")
        .insertAdjacentHTML("beforeend", insertHtmlButtonsClose());

    document.querySelector("#cross").addEventListener("click", function() {
        storeContainer.innerHTML = "";
        inputStore.value = "";
        inputStore.focus();
        document.querySelector(".search-buttons-wrapper").innerHTML = "";
        document
            .querySelector(".search-buttons-wrapper")
            .insertAdjacentHTML("beforeend", insertHtmlButtonsSearch());

        stores.forEach(function(storesItem, _) {
            storeContainer.insertAdjacentHTML(
                "beforeend",
                showStoreHtml(storesItem)
            );
        });
    });

    document.querySelector("#test").addEventListener("submit", function(e) {
        e.preventDefault();
        filtrationStorage(currentInputValue);
        currentInputValue = "";
    });
};
////////////update info about store/////
infoBox.addEventListener("click", function(e) {
    document.querySelectorAll(".info-store").forEach(e => {
        e.classList.remove("info-store-bottom");
    });
    const clickedElement = e.target.closest(".info-store");
    if (!clickedElement) return;
    clearFields();
    clickedStore.classList.add("active-store");
    clickedElement.classList.add("info-store-bottom");
    if (clickedElement.classList.contains("ok-js")) {
        filterStatusProducts(idProducts, "OK");
    } else if (clickedElement.classList.contains("storage-js")) {
        filterStatusProducts(idProducts, "STORAGE");
    } else if (clickedElement.classList.contains("stock-js")) {
        filterStatusProducts(idProducts, "OUT_OF_STOCK");
    } else if (clickedElement.classList.contains("all-js")) {
        filterStatusProducts(idProducts, "all-js");
    } else {
        return -1;
    }
});
inputStore.addEventListener("input", updateValueInputStore);

////////////show form for creating new store/////
footerWrapper.addEventListener("click", function(e) {
    e.preventDefault();
    const clickedButton = e.target.closest("button");
    if (!clickedButton) return;
    if (clickedButton.classList.contains("create-store-js")) {
        popup.classList.remove("display-none");
    }
});
////////////create new store/////
const createNewStore = function(newStore) {
    fetch(urlApi + "Stores", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: newStore.Name,
            Email: newStore.Email,
            PhoneNumber: newStore.PhoneNumber,
            Address: newStore.Address,
            Established: newStore.Established,
            FloorArea: newStore.FloorArea
        })
    })
        .then(response => {
            if (response.status < 400) {
                getStores();
                popup.classList.add("display-none");
            }
        })
        .catch(e => alert(e.message));
};
////////////create new products/////
const createNewProducts = function(newProducts) {
    fetch(urlApi + "Products", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProducts)
    })
        .then(response => {
            if (response.status < 400) {
                getStores();
                popup.classList.add("display-none");
            }
        })
        .catch(e => alert(e.message));
};
////////////delete current store/////
const deleteStore = async function(currentStore) {
    fetch(urlApi + `Stores/${currentStore.id}`, {
        method: "delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify({})
    })
        .then(response => {
            if (response.status < 400) {
                noResultBox.classList.remove("hidden");
                noResultBox.classList.remove("display-none");
                getStores();
            }
        })
        .catch(e => alert(e.message));
};
////////////delete current product/////
const deleteCurrentProduct = function(currentProductId) {
    fetch(urlApi + `Products/${currentProductId}`, {
        method: "delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify({})
    })
        .then(response => {
            if (response.status < 400) {
                getProducts(currentStore);
            }
        })
        .catch(e => alert(e.message));
};

////////////update current product/////
const updateCurrentProduct = function(editedObj) {
    fetch(urlApi + `Products`, {
        method: "put",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(editedObj)
    })
        .then(response => {
            if (response.status < 400) {
                getProducts(currentStore);
            }
        })
        .catch(e => alert(e.message));
};
////////////get current product info/////
const getCurrentProductInfo = async function(currentProductId) {
    try {
        const response = await fetch(urlApi + `Products/${currentProductId}`);
        const data = await response.json();
        currentProductId = data.id;
        popupEdit.classList.remove("display-none");
        editName.value = data.Name;
        editPrice.value = data.Price;
        editSpecs.value = data.Specs;
        editRating.value = data.Rating;
        editSuplier.value = data.SupplierInfo;
        editMadein.value = data.MadeIn;
        editProduct.value = data.ProductionCompanyName;
        editSelect.value = data.Status;
    } catch (err) {
        alert(err.message);
    }
};

deleteStoreJs.addEventListener("click", function(e) {
    const clickedButton = e.target.closest("button");
    if (!clickedButton) return;
    const approveDeleting = confirm("Do you really want to delete this store?");
    if (
        clickedButton.classList.contains("delete-store-js") &&
        approveDeleting
    ) {
        deleteStore(currentStore);
    }
});
///validation for store/// *need to refactor with validationCreateProduct*
const validationCreateStore = function(obj, fieldsValidation) {
    const arr = [];
    for (let [x, y] of Object.entries(obj)) {
        if (x === fieldsValidation[0]) {
            if (y === "" || !isNaN(y)) {
                arr.push(x);
            }
        }
        if (x === fieldsValidation[1]) {
            if (y === "" || y.indexOf("@") === -1) {
                arr.push(x);
            }
        }
        if (x === fieldsValidation[2] || x === fieldsValidation[3]) {
            if (y === "" || isNaN(y)) {
                arr.push(x);
            }
        }

        if (x === fieldsValidation[4]) {
            if (y === "") {
                arr.push(x);
            }
        }
    }

    return arr.map(e => e.toLowerCase());
};
///validation for store/// *need to refactor with validationCreateStore*
const validationCreateProduct = function(obj, fieldsValidation) {
    const arr = [];
    for (let [x, y] of Object.entries(obj)) {
        if (x === fieldsValidation[0]) {
            if (y === "" || !isNaN(y)) {
                arr.push(x);
            }
        }

        if (x === fieldsValidation[1] || x === fieldsValidation[3]) {
            if (y === "" || isNaN(y)) {
                arr.push(x);
            }
        }

        if (
            x === fieldsValidation[2] ||
            x === fieldsValidation[4] ||
            x === fieldsValidation[5] ||
            x === fieldsValidation[6]
        ) {
            if (y === "") {
                arr.push(x);
            }
        }
    }

    return arr.map(e => e.toLowerCase());
};

const fieldsValidationProducts = [
    "Name",
    "Price",
    "Specs",
    "Rating",
    "SupplierInfo",
    "MadeIn",
    "ProductionCompanyName"
];

const fieldsValidationStore = [
    "Name",
    "Email",
    "PhoneNumber",
    "FloorArea",
    "Address"
];
///// creating new store////
storeButtons.addEventListener("click", function(e) {
    const clickedButton = e.target.closest("button");
    if (!clickedButton) return;
    e.preventDefault();
    if (clickedButton.classList.contains("new-store-js")) {
        let newObj = {};
        const arr = [...document.querySelectorAll(".input-create-store")];
        arr.forEach(e => (newObj = { ...newObj, [e.id]: e.value }));
        const currentMistakes = validationCreateStore(
            newObj,
            fieldsValidationStore
        );
        arr.forEach(input => {
            input.classList.remove("mistake");
        });

        if (currentMistakes.length === 0) {
            createNewStore(newObj);
        } else {
            alert("input correct data");
            arr.forEach(input => {
                currentMistakes.forEach(valError => {
                    if (input.classList.contains(valError)) {
                        input.classList.add("mistake");
                    }
                });
            });
        }
    }
    if (clickedButton.classList.contains("cancel-form-js")) {
        popup.classList.add("display-none");
    }
});

newProducts.addEventListener("click", function(e) {
    e.preventDefault();
    const clickedButton = e.target.closest("button");
    if (!clickedButton) return;
    if (clickedButton.classList.contains("new-products-js")) {
        popupProducts.classList.remove("display-none");
    }
});

///// creating new product////
productsButtons.addEventListener("click", function(e) {
    e.preventDefault();
    const clickedButton = e.target.closest("button");
    if (!clickedButton) return;
    if (clickedButton.classList.contains("new-products-js")) {
        let newObj = {};
        const arr = [...document.querySelectorAll(".input-create-products")];
        const select = document.querySelector("select");
        arr.forEach(e => (newObj = { ...newObj, [e.id]: e.value }));
        newObj = {
            ...newObj,
            Status: select.value,
            StoreId: currentStore.id,
            Photo: "1"
        };

        const currentMistakes = validationCreateProduct(
            newObj,
            fieldsValidationProducts
        );

        arr.forEach(input => {
            input.classList.remove("mistake");
        });
        if (currentMistakes.length === 0) {
            createNewProducts(newObj);
            popupProducts.classList.add("display-none");
            getProducts(currentStore);
        } else {
            alert("input correct data");
            arr.forEach(input => {
                currentMistakes.forEach(valError => {
                    if (input.classList.contains(valError)) {
                        input.classList.add("mistake");
                    }
                });
            });
        }
        ///
    }
    if (clickedButton.classList.contains("close-products-js")) {
        popupProducts.classList.add("display-none");
    }
});
let currentProductId;

////editing of choosing product
tbody.addEventListener("click", function(e) {
    const clickedButton = e.target.closest("button");
    currentProductId = clickedButton.dataset.id;
    if (!clickedButton) return;
    if (clickedButton.classList.contains("btn-delete-products-js")) {
        deleteCurrentProduct(currentProductId);
    }

    if (clickedButton.classList.contains("btn-edit-products-js")) {
        getCurrentProductInfo(clickedButton.dataset.id);
    }
});

editButtonsBox.addEventListener("click", function(e) {
    e.preventDefault();
    const clickedButton = e.target.closest("button");
    if (!clickedButton) return;
    if (clickedButton.classList.contains("close-edit-js")) {
        popupEdit.classList.add("display-none");
    }
    if (clickedButton.classList.contains("send-edited-button-js")) {
        let newObj = {};
        const arr = [...document.querySelectorAll(".input-edit")];
        const select = document.querySelector(".edit-select");
        arr.forEach(e => (newObj = { ...newObj, [e.id]: e.value }));
        newObj = {
            ...newObj,
            Status: select.value,
            StoreId: currentStore.id,
            Photo: "1",
            id: currentProductId
        };

        const currentMistakes = validationCreateProduct(
            newObj,
            fieldsValidationProducts
        );

        arr.forEach(input => {
            input.classList.remove("mistake");
        });
        if (currentMistakes.length === 0) {
            updateCurrentProduct(newObj);
            popupEdit.classList.add("display-none");
        } else {
            alert("input correct data");
            arr.forEach(input => {
                currentMistakes.forEach(valError => {
                    if (input.classList.contains(valError)) {
                        input.classList.add("mistake");
                    }
                });
            });
        }
    }
});

getStores();
