// import { checkSystemTheme, body } from "./script/utils.js";
// querySelectorAll->untuk beberapa element, karena class budget__Card nya lebih dari 1

const backHomebtn = document.querySelector("#budget_details button.back__home");
const budgetsPage = document.getElementById("budgets");
// panggil function render budget, ini supaya button add nya bisa di klik, jadi di render dulu budget__Card terbaru bru di klik
renderBudgets();
const budgetDetailPage = document.querySelector("#budget_details");
// pindah ke function selectBudgetCardAndButton
// const budgetCards = document.querySelectorAll("#budgets .budget__card");
// const addBudgetButton = document.querySelector("#budgets button");
const budgetForm = document.getElementById("budget_form");
const closeModalBudgetBtn = document.querySelector("#budget_form i");
const addSpentButton = document.querySelector(".add__spent__btn");
const spentForm = document.getElementById("spent_form");
const closeModalSpentBtn = document.querySelector("#spent_form i");
const notifications = document.getElementById("notifications");
const updateBudgetButton = document.querySelector("#budget_details .budget__card .icon");


checkSystemTheme();


// untuk theme switch
document.getElementById("theme_switch").addEventListener("click", () => {

    if (body.classList.contains('dark')) {
        document.getElementById("light_theme_icon").classList.remove("hidden");
        document.getElementById("dark_theme_icon").classList.add("hidden");
    } else {
        document.getElementById("light_theme_icon").classList.add("hidden");
        document.getElementById("dark_theme_icon").classList.remove("hidden");
    }

    body.classList.toggle('dark');
});



// untuk urutan
const selectUrutan = document.getElementById("sort_pengeluaran");

// Klik tombol update
updateBudgetButton.addEventListener("click", () => {
    openUpdateBudget();
});

// Klik tombol deleted
document.getElementById("delete_budget").addEventListener("click", () => {
    const budgetId = document.getElementById("budget_id").value;

    deleteBudget(budgetId);
});

// Klik tombol pengeluaran
document.getElementById("delete_pengeluaran").addEventListener("click", () => {
    const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetId");
    const pengeluaranId = document.getElementById("id_pengeluaran").value;

    console.log("budget:", budgetId, "pengeluaran:", pengeluaranId);

    deletePengeluaran(budgetId, pengeluaranId);
});

// Klik tombol halaman utama
backHomebtn.addEventListener("click", () => {
    showBudgetPage();

});

// SHOW SEMUA BUDGET TERBARU
function showBudgetPage() {
    budgetDetailPage.classList.add("hidden");
    budgetsPage.classList.remove("hidden");
    // render budget
    renderBudgets();

}

// CLOSE MODAL BUDGET
closeModalBudgetBtn.addEventListener("click", () => {
    closeModalBudget();
});

function openModalBudget() {
    budgetForm.classList.remove("hidden");
}

function closeModalBudget() {
    budgetForm.classList.add("hidden");
}

function openCreateBudget() {
    document.querySelector("#budget_form h4").innerText = "Tambah Budget";
    document.querySelector("#budget_form button.danger").classList.add("hidden");

    resetInput();
    openModalBudget();

}

function openUpdateBudget() {
    document.querySelector("#budget_form h4").innerText = "Update Budget";
    document.querySelector("#budget_form button.danger").classList.remove("hidden");

    const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetId");
    const currentBudget = getBudgetById(budgetId);

    // set name budget
    document.getElementById("nama_budget").value = currentBudget.nama_budget;

    // set total budget
    document.getElementById("total_budget").value = currentBudget.total;

    // set id budget
    document.getElementById("budget_id").value = currentBudget.id;

    openModalBudget();
}

addSpentButton.addEventListener("click", () => {
    openCreatePengeluaran();
});

closeModalSpentBtn.addEventListener("click", () => {
    closeModalPengeluaran();
});

function openModalPengeluaran() {
    spentForm.classList.remove("hidden");
}
// function close modal pengeluaran
function closeModalPengeluaran() {
    spentForm.classList.add("hidden");
}

// function untuk select budget card detail dan button lagi
function selectBudgetCardAndButton() {
    const budgetCards = document.querySelectorAll("#budgets .budget__card");
    const addBudgetButton = document.querySelector("#budgets button");

    // gunakan foreach untuk perulangan, karena dia berupa array
    // Klik Budget Card, event listener klik budget card
    budgetCards.forEach((card) => {
        card.addEventListener("click", () => {

            // ambil id dari budgetCard, untuk detail budget
            const budgetId = card.getAttribute("data-budgetId");

            // render budget detail
            renderBudgetDetails(budgetId);

            // render pengeluaran
            const urutan = selectUrutan.value; //utuk ambil value pilihan urutan
            renderPengeluaran(budgetId, urutan);

            budgetDetailPage.classList.remove("hidden");
            budgetsPage.classList.add("hidden");
        });
    });

    // Klik Tambah Budget, event listener klik tambah budget
    addBudgetButton.addEventListener("click", () => {
        openCreateBudget();
    });
}


// RENDER BUDGET CARD
function renderBudgets() {
    const budgetData = getExistingData();
    // console.log(budgetData); //muncul sudah jadi array nya

    // render data ke halaman utama
    const budgetList = budgetData.map((budgets) => {

        // histung sisa budget
        const sisaBudget = hitungSisaBudget(budgets);

        // format rupiah
        // console.log("format :", formatRupiah(sisaBudget));


        return `
    <div class="budget__card" data-budgetId="${budgets.id}">
            <h2 class="budget__name">${budgets.nama_budget}</h2>
            <p class="budget__amount">${formatRupiah(sisaBudget)}</p>
            <p class="budget__total">Total ${formatRupiah(budgets.total)}</p>
    </div>`
    }).concat([`<button class="add__budget__btn">+</button>`]).join(""); //join dengan array kosong, agar tulisannya udah nggk jadi array tapi jadi string teks
    // console.log("budgetList : ", budgetList);

    // Tampilkan ke budgetsPage dengan innerHTML
    budgetsPage.innerHTML = budgetList;

    // setelah render, panggil ulang select budgetCard dan Button nya
    selectBudgetCardAndButton();
}

// RENDER BUDGET DETAILS
function renderBudgetDetails(budgetId) {

    // ambil semua data budgetCard
    // const budgets = getExistingData();
    // console.log("budgets : ", budgets, budgetId);

    // filter data yang id nya sama
    const currentBudget = getBudgetById(budgetId); //tambahkan[0] supaya jadi objek, tidak jadi array lagi
    // console.log(currentBudget);

    // render detail budget dengan id nya
    document.querySelector("#budget_details .budget__card").setAttribute("data-budgetId", budgetId);

    // untuk sisa budget
    const sisaBudget = hitungSisaBudget(currentBudget);

    // masukan ke div budget details html nya
    // 1. untuk budget name
    document.querySelector("#budget_details .budget__card h2").innerText = currentBudget.nama_budget;

    // 2. untuk budget amount
    document.querySelector("#budget_details .budget__card .budget__amount").innerText = formatRupiah(sisaBudget);

    // 2. untuk budget total
    document.querySelector("#budget_details .budget__card .budget__total").innerText = formatRupiah(currentBudget.total);
}


// START PENGELUARAN

// SUBMIT PENGELUARAN BUDGET
document.querySelector("#spent_form form").addEventListener("submit", (e) => {
    e.preventDefault(); //biar nggk ke reload

    // ambil data formnya
    const data = getFormValue(new FormData(e.target)); //dan ini butuh properti name di form nya

    // ambil id pengeluaran
    const pengeluaranId = document.getElementById("id_pengeluaran").value;

    if (pengeluaranId) {
        updatePengeluaran(pengeluaranId, data);
    } else {
        addPengeluaran(data);

    }

    closeModalPengeluaran(); //tutup modal pengeluaran
    resetInput(); //reset input
    showNotification(`✅ Pengeluaran ${data.nama_pengeluaran} berhasil disimpan!`);

    // ambil id
    const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetId");

    // render pengeluaran nya lagi pada saat submit
    const urutan = selectUrutan.value; //utuk ambil value pilihan urutan
    renderPengeluaran(budgetId, urutan);
    renderBudgetDetails(budgetId);



});

// function untuk addPengeluaran
function addPengeluaran(data) {
    // ambil id nya terlebih dahulu
    const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetId");

    const currentBudget = getBudgetById(budgetId);

    // untuk pengeluaran sekarang
    const currentSpent = currentBudget.pengeluaran ?? [];

    // tambah data pengeluaran ke budget
    const budgetWithSpent = {
        ...currentBudget,
        "pengeluaran": [...currentSpent, { ...data, id: generateId() }]
    };

    // console.log(data, budgetId, currentBudget);
    // console.log(budgetWithSpent);

    const allBudgets = getExistingData(); //ambil semua data budget , data awal nya

    // setelah itu cari budget yang sesuai dengan budgetWithSpent yang sudah diupdate berdasarkan ID
    const updatedBudgets = allBudgets.map((budget) => {
        if (budget.id == budgetId) {
            return budgetWithSpent;
        }
        return budget;

    });

    // console.log(updatedBudgets);

    // simpan ke local storage
    saveBudget(updatedBudgets);
}

// function updatePengeluaran
function updatePengeluaran(pengeluaranId, data) {
    // ambil id nya terlebih dahulu
    const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetId");

    const allBudgets = getExistingData();

    // untuk update budget dengan pengeluaran terbaru
    const updatedBudget = allBudgets?.map((budget) => {
        if (budget.id == budgetId) {
            const pengeluaran = budget?.pengeluaran?.map((item) => {
                if (item.id == pengeluaranId) {
                    return { ...data, id: item.id };
                }

                return item;
            });

            return { ...budget, pengeluaran };

        }
        return budget;

    });

    saveBudget(updatedBudget);
}

function deletePengeluaran(budgetId, pengeluaranId) {

    const allBudgets = getExistingData();
    const pengeluaranName = document.getElementById("nama_pengeluaran").value;

    const confirmed = confirm(`Yakin ingin menghapus pengeluaran ${pengeluaranName}?`);

    if (confirmed) {
        const afterDelete = allBudgets?.map((budget) => {
            if (budget.id == budgetId) {
                return {
                    ...budget,
                    pengeluaran: budget.pengeluaran.filter((pengeluaran) => pengeluaran.id != pengeluaranId)
                }
            }
            return budget;
        });

        saveBudget(afterDelete);
        closeModalPengeluaran();

        // render pengeluaran
        const urutan = selectUrutan.value; //utuk ambil value pilihan urutan
        renderPengeluaran(budgetId, urutan);

        showNotification(`✅ Pengeluaran ${pengeluaranName} berhasil dihapus!`);
        renderBudgetDetails(budgetId);


    } else {
        closeModalPengeluaran();
    }


}

// FUNCTION TYPE SORT PENGELUARAN
document.getElementById("sort_pengeluaran").addEventListener("change", (e) => {
    // ambil id
    const budgetId = document.querySelector("#budget_details .budget__card").getAttribute("data-budgetId");
    renderPengeluaran(budgetId, e.target.value);
});

function renderPengeluaran(budgetId, sortBy) {
    //    CARA 1
    // const currentBudget = getBudgetById(budgetId);
    // const pengeluaran = currentBudget.pengeluaran;
    // console.log(pengeluaran);

    // CARA 2(SINGKAT), gunakan destructuring, (membongkar) properti pengeluaran langsung dari object yang dikembalikan oleh getBudgetById
    const { pengeluaran } = getBudgetById(budgetId);

    const [index, type] = sortBy.split("|");
    console.log(index, type);

    // untuk sort pengeluaran, memodifikasi data pengeluaran
    sortPengeluaran(pengeluaran, index, type);

    const listPengeluaran = pengeluaran?.map((item) => {
        return `
            <div class="spent__item" data-pengeluaranid="${item.id}">
                <div class="spent__item__description">
                    <h4>${item.nama_pengeluaran}</h4>
                    <p>${item.tanggal}</p>
                </div>
                <div class="spent__item__price">

                    <p>${formatRupiah(item.jumlah_pengeluaran)}</p>
                </div>
            </div>
        `
    }).join("") ?? null;

    document.querySelector("#budget_details .spent").innerHTML = listPengeluaran;

    // OPEN MODAL UPDATE PENGELUARAN
    document.querySelectorAll("#budget_details .spent .spent__item").forEach((element) => {
        element.addEventListener("click", () => {
            openUpdatedPengeluaran(element.getAttribute("data-pengeluaranid"), pengeluaran);
        })
    });

}

// function untuk SORT PENGELUARAN
function sortPengeluaran(pengeluaran, indexData, type) {
    if (!pengeluaran) {
        return [];
    }

    let perubahan = 0
    // gunakan perulangan DO WHile
    do {
        // reset perubahan nya
        perubahan = 0;
        // lakukan perulangan dengan for
        for (let i = 0; i < pengeluaran?.length - 1; i++) {

            // mengubah uangnya string jadi angka
            const leftData = indexData == "jumlah_pengeluaran" ? +pengeluaran[i][indexData] : pengeluaran[i][indexData];
            const rightData = indexData == "jumlah_pengeluaran" ? +pengeluaran[i + 1][indexData] : pengeluaran[i + 1][indexData];
            if (
                (type == "asc" && leftData > rightData) || (type == "desc" && leftData < rightData)
            ) {
                let temp = pengeluaran[i];
                pengeluaran[i] = pengeluaran[i + 1];
                pengeluaran[i + 1] = temp;
                perubahan++;
            }
        }

    } while (perubahan > 0);

    return pengeluaran;
}


function openCreatePengeluaran() {
    document.querySelector("#spent_form h4").innerText = "Tambah Pengeluaran";
    document.getElementById("delete_pengeluaran").classList.add("hidden");

    resetInput();
    openModalPengeluaran();
}

function openUpdatedPengeluaran(pengeluaranId, pengeluaran) {
    document.querySelector("#spent_form h4").innerText = "Update Pengeluaran";
    document.getElementById("delete_pengeluaran").classList.remove("hidden");

    const currentPengeluaran = pengeluaran?.filter((item) => item.id == pengeluaranId)[0];

    openModalPengeluaran();

    // set nama pengeluaran
    document.getElementById("nama_pengeluaran").value = currentPengeluaran.nama_pengeluaran;
    // set jumlah pengeluaran
    document.getElementById("jumlah_pengeluaran").value = currentPengeluaran.jumlah_pengeluaran;
    // set tanggal
    document.getElementById("tanggal").value = currentPengeluaran.tanggal;
    // set id
    document.getElementById("id_pengeluaran").value = currentPengeluaran.id;
}
// END PENGELUARAN


function getFormValue(formData) {
    // untuk menggabungkan jadi 1 objek
    let result = new Object();

    for (const data of formData.entries()) { //untuk perloopingan

        // destructuring data
        const [key, value] = data;

        Object.assign(result, { [key]: value });
    }

    return result;
}

// function existingData untuk ambil data lama
function getExistingData() {
    return JSON.parse(localStorage.getItem("budgets")) ?? [];
}

// ambil budget berdasarkan id
function getBudgetById(id) {
    const budgets = getExistingData();

    return budgets.filter((budget) => budget.id == id)[0];
}


// function ADD BUDGET
function addNewBudget(dataBaru) {

    // data baru dengan id
    const dataWithId = {
        id: generateId(),
        ...dataBaru
    }

    // sementara untuk data baru
    const existingData = getExistingData();
    existingData.push(dataWithId);  //push data ke existing data -> menampilkan data baru tanpa menghilangkan data lama

    // simopan ke local storage, masih data lama, karena udah diubah dengan existing data jadi sudah tidak hilang data lama nya
    saveBudget(existingData);
}

// FUNCTION UPDATE BUDGET
function updateBudget(dataBaru, budgetId) {
    // console.log(dataBaru, budgetId);

    // mapping data nya
    const existingData = getExistingData();
    const updatedBudget = existingData?.map((budget) => {
        if (budget.id == budgetId) {
            return { id: budgetId, ...dataBaru, pengeluaran: budget.pengeluaran };
        }

        return budget;
    });

    // save dataBaru nya
    saveBudget(updatedBudget);
    renderBudgetDetails(budgetId);
}


// FUNCTION DELETE BUDGET
function deleteBudget(budgetId) {

    const allBudgets = getExistingData(); //ambil semua data budget , data awal nya

    // data berdasarkan id
    const budgetName = document.getElementById("nama_budget").value;

    const confirmed = confirm(`Apakah anda yakin ingin menghapus budget ${budgetName}`);

    if (confirmed) {
        // filter budget nya, yang id nya tidak sama dengan budgetId
        const deletedBudgets = allBudgets.filter((budget) => budget.id != budgetId);

        // simpan data nya
        saveBudget(deletedBudgets);

        showNotification(`✅ Budget ${budgetName} berhasil dihapus!`);

        closeModalBudget();
        showBudgetPage();

    } else {
        closeModalBudget();
    }

}

// Submit form budget
document.querySelector("#budget_form form").addEventListener("submit", (e) => {
    e.preventDefault(); //biar nggk ke reload

    const data = getFormValue(new FormData(e.target)); //mengambil semua data input di form secara otomatis
    // console.log("data : ", data); //sudah jadi 1 objek

    const idBudget = document.getElementById("budget_id").value;

    if (idBudget) {
        updateBudget(data, idBudget);
    } else {
        addNewBudget(data);
    }

    // setelah save tutup modal nya
    closeModalBudget();

    // hapus lagi value input
    resetInput();

    // show notifikasi
    showNotification(`✅ Budget ${data.nama_budget} berhasil disimpan!`);

    renderBudgets();

});


// function generate ID
function generateId() {
    return new Date().getTime();
}


// function reset input
function resetInput() {
    document.querySelectorAll("form input").forEach((input) => {
        input.value = "";
    })
}

// function show notifikasi
function showNotification(message) {
    const newNotification = document.createElement("div");
    newNotification.innerText = message;
    newNotification.classList.add("notification");
    //tambahkan ke dalam parent class=notifications-wrapper sebagai child nya
    notifications.appendChild(newNotification);

    // atur supaya notif nya hilang dengan me-remove childe nya, ditunggu selama 4000/4detik
    //akan ada animsi fadeout di class out, selama 5 detik,  lalu hapus
    setTimeout(() => {
        newNotification.classList.add("out");

        setTimeout(() => {
            notifications.removeChild(newNotification);
        }, 500);
    }, 4000)
}

function hitungSisaBudget(dataBudget) {
    // hitung seluruh total pengeluaran
    const totalPengeluaran = dataBudget?.pengeluaran?.map((item) => +item.jumlah_pengeluaran).reduce((jumlah, total) => jumlah + total, 0) ?? 0;

    // lalu hitung sisa budgetnya
    return +dataBudget.total - totalPengeluaran;
}

// FUNCTION FORMAT RUPIAH
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// FUNCTION SAVE BUDGET
function saveBudget(budgets) {
    localStorage.setItem("budgets", JSON.stringify(budgets)); //berupa key & value dan HANYA BISA MENYIMPAN STRING, ada [] untuk array
}
