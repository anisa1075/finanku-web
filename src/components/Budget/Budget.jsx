import React, { useState, useEffect } from 'react'
import './budget.css';
// import './budget.js';
import Budgetbg from '../../assets/budget2.png'

export default function Budget() {
    const [showModal, setShowModal] = useState(false);
    const [showModalPengeluaran, setShowModalPengeluaran] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [namaBudget, setNamaBudget] = useState("");
    const [totalBudget, setTotalBudget] = useState("");

    // state untuk menampung semua budget yang ada
    const [budgets, setBudgets] = useState([]);
    // ambil data dari localStorage saat pertama kali render
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("budgets")) || [];
        setBudgets(saved);
    }, []);

    // function handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit && selectedBudget) {
            // untuk update
            const updatedBudgets = budgets.map((b) =>
                b.id === selectedBudget.id
                    ? { ...b, nama: namaBudget, total: parseInt(totalBudget) }
                    : b
            );

            setBudgets(updatedBudgets);
            localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

            // update selectedBudget biar langsung rerender
            const updatedSelected = updatedBudgets.find(b => b.id === selectedBudget.id);
            setSelectedBudget(updatedSelected);
        } else {
            //UNTUK TAMBAH
            const newBudget = {
                id: Date.now(), // unik id
                nama: namaBudget,
                total: parseInt(totalBudget),
                spent: []  // default untuk array kosong
            };

            const updatedBudgets = [...budgets, newBudget];
            setBudgets(updatedBudgets);
            localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
        }

        // reset input
        setNamaBudget("");
        setTotalBudget("");
        setShowModal(false);
    };


    // untuk details
    const [selectedBudget, setSelectedBudget] = useState(null);
    const handleClick = (budgetId) => {
        // cari data budget berdasarkan id
        const budget = budgets.find((b) => b.id === budgetId);
        if (!budget) {
            console.error("Budget dengan id", budgetId, "tidak ditemukan");
            return;
        }
        setSelectedBudget(budget);
        setShowDetails(true);
        console.log(budget.id);
    };

    // ketika klik update icon
    const [isEdit, setIsEdit] = useState(false);

    const handleUpdateClick = () => {
        if (selectedBudget) {
            setNamaBudget(selectedBudget.nama);
            setTotalBudget(selectedBudget.total);
            setShowModal(true);
            // setShowDetails(true);
            setIsEdit(true);
        }
    };

    // untuk handle delete
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(`Yakin ingin menghapus budget ${selectedBudget?.nama}?`);
        if (!confirmDelete) return; // kalau batal, tidak lanjut

        const updatedBudgets = budgets.filter((b) => b.id !== id);

        setBudgets(updatedBudgets);
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

        setShowModal(false);
        setShowDetails(false);
    };

    // PENGELUARAN
    const [selectedSpent, setSelectedSpent] = useState(null);
    const [namaPengeluaran, setNamaPengeluaran] = useState("");
    const [jumlahPengeluaran, setJumlahPengeluaran] = useState("");
    const [tanggalPengeluaran, setTanggalPengeluaran] = useState("");
    const [editingSpentId, setEditingSpentId] = useState(null);

    // untuk add pengeluaran
    const handleAddOrUpdateSpent = (budgetId, spentData) => {
        // spentData = { id, name, amount, date }

        const updatedBudgets = budgets.map((b) => {
            if (b.id === budgetId) {
                // cek apakah spent sudah ada (update) atau belum (add)
                const existingSpent = b.spent.find((s) => s.id === spentData.id);

                if (existingSpent) {
                    // 🔹 UPDATE spent
                    return {
                        ...b,
                        spent: b.spent.map((s) =>
                            s.id === spentData.id
                                ? { ...s, ...spentData } // replace data lama dengan baru
                                : s
                        ),
                    };
                } else {
                    // 🔹 ADD spent
                    return {
                        ...b,
                        spent: [...(b.spent || []), spentData],
                    };
                }
            }
            return b;
        });

        // simpan state + localStorage
        setBudgets(updatedBudgets);
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

        // sync ke selectedBudget kalau yang sedang dibuka adalah budget ini
        if (selectedBudget && selectedBudget.id === budgetId) {
            const existingSpent = selectedBudget.spent.find((s) => s.id === spentData.id);

            if (existingSpent) {
                setSelectedBudget({
                    ...selectedBudget,
                    spent: selectedBudget.spent.map((s) =>
                        s.id === spentData.id ? { ...s, ...spentData } : s
                    ),
                });
            } else {
                setSelectedBudget({
                    ...selectedBudget,
                    spent: [...selectedBudget.spent, spentData],
                });
            }
        }
    };


    const handleSpentClick = (spent) => {
        setSelectedSpent(spent);              // simpan data spent yg diklik
        setNamaPengeluaran(spent.name);       // isi field modal
        setJumlahPengeluaran(spent.amount);
        setTanggalPengeluaran(spent.date);
        setEditingSpentId(spent.id); // simpan id lama

        setShowModalPengeluaran(true);
        setIsEdit(true);
    };

    // untuk delete
    const handleDeleteSpent = (budgetId, spentId) => {

        const updatedBudgets = budgets.map((b) => {
            if (b.id === budgetId) {
                return {
                    ...b,
                    spent: (b.spent || []).filter((s) => String(s.id) !== String(spentId)),

                };
            }
            return b;
        });

        setBudgets(updatedBudgets);
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

        // sync ke selectedBudget
        const updatedSelectedBudget = updatedBudgets.find(b => b.id === budgetId);
        setSelectedBudget(updatedSelectedBudget);
        setShowModalPengeluaran(false);
        console.log("Delete called with:", budgetId, spentId);

    };

    // untuk sisabudget
    const getRemainingBudget = (budget) => {
        const totalSpent = (budget.spent || []).reduce(
            (sum, s) => sum + s.amount,
            0
        );
        return budget.total - totalSpent;
    };


    return (
        <div style={{ backgroundImage: `url(${Budgetbg})` }} className='bg-cover relative'>
            <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-bold font-outfit mt-24 text-[#9B51E0] text-center ' style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.2)" }}>My Budget.</h1>
            </div>
            <div className='h-screen mt-10 md:mx-10' style={{ display: showDetails ? "none" : "block" }}>
                {/* Main Home */}
                {!showDetails &&

                    <main id="budgets" className="container budgets mt-10">
                        {budgets.map((budget) => {
                            const remaining = getRemainingBudget(budget);
                            return (
                                <div key={budget.id} className="budget__card" data-budgetid={budget.id} onClick={() => handleClick(budget.id)}>
                                    <h2 className="budget__name">{budget.nama}</h2>
                                    <p className="budget__amount">Rp. {remaining.toLocaleString("id-ID")}</p>
                                    <p className="budget__total">Total Rp. {budget.total.toLocaleString("id-ID")} </p>
                                </div>
                            )
                        })}

                        <button className="add__budget__btn" onClick={() => {
                            setShowModal(true);
                            setShowDetails(false);
                            setNamaBudget("");
                            setTotalBudget("");
                            setIsEdit(false);
                        }}>+</button>
                    </main>
                }

            </div>

            {/* Main Details */}
            {showDetails &&
                <div className='w-full flex justify-center py-18'>
                    <main id="budget_details" className="container md:px-10 lg:px-0 px-6">
                        <button className="back__home" onClick={() => setShowDetails(false)}>
                            <i className="ph ph-caret-left icon__back"></i>
                            Halaman Utama
                        </button>
                        <div className="budget__card">
                            <div>
                                <h2 className="budget__name">{selectedBudget.nama}</h2>
                                <p className="budget__amount">Rp {getRemainingBudget(selectedBudget).toLocaleString("id-ID")}</p>
                                <p className="budget__total">Total Rp {selectedBudget.total.toLocaleString("id-ID")}</p>
                            </div>

                            <div className="icon" onClick={handleUpdateClick}>
                                <i className="ph ph-pencil-line"></i>
                            </div>

                        </div>

                        <button className="add__spent__btn" onClick={() => {
                            setShowModalPengeluaran(true),
                                setIsEdit(false),
                                setNamaPengeluaran("");       // isi field modal
                            setJumlahPengeluaran("");
                            setTanggalPengeluaran("");
                        }}>
                            <span>+</span> Catat Pengeluaran</button>

                        <div className="sort__spent">
                            <i className="ph ph-arrows-down-up"></i>
                            <select id="sort_pengeluaran">
                                <option selected value="tanggal|desc">Tanggal Terbaru</option>
                                <option value="nama_pengeluaran|asc">Nama</option>
                                <option value="jumlah_pengeluaran|asc">Terkecil</option>
                                <option value="jumlah_pengeluaran|desc">Terbesar</option>
                            </select>
                        </div>

                        <div className="spent">
                            {selectedBudget.spent.map((spent) => (
                                <div className="spent__item" key={spent.id} onClick={() => handleSpentClick(spent)}>
                                    <div className="spent__item__description">
                                        <h4>{spent.name}</h4>
                                        <p>{spent.date}</p>
                                    </div>
                                    <div className="spent__item__price">

                                        <p>Rp. {spent.amount.toLocaleString("id-ID")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            }

            {/* Modal Tambah Budget */}
            {showModal && (
                <div id="budget_form" className="modal">
                    <div className="card">
                        <div className="modal__card__heading">
                            <h4>{isEdit ? "Update Budget" : "Tambah Budget"}</h4>
                            <i
                                className="ph-fill ph-x-circle"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            ></i>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" id="budget_id" />

                            <label htmlFor="nama_budget">Nama Budget</label>
                            <input
                                id="nama_budget"
                                name="nama_budget"
                                type="text"
                                required
                                value={namaBudget}
                                onChange={(e) => setNamaBudget(e.target.value)}
                            />

                            <label htmlFor="total_budget">Jumlah Budget</label>
                            <div className="input__money">
                                <span>Rp</span>
                                <input
                                    id="total_budget"
                                    name="total"
                                    type="number"
                                    required
                                    value={totalBudget}
                                    onChange={(e) => setTotalBudget(e.target.value)}
                                />
                            </div>

                            <div className="action" style={{
                                display: "flex",
                                justifyContent: isEdit ? "space-between" : "flex-end",
                            }}>
                                {isEdit &&
                                    <button id="delete_budget" type="button" className="danger" onClick={() => handleDelete(selectedBudget.id)}>
                                        <i className="ph-fill ph-trash"></i>
                                    </button>
                                }
                                <button type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* <!-- Modal Tambah Pengeluaran --> */}
            {showModalPengeluaran && (
                <div id="spent_form" className="modal hidden z-50">
                    <div className="card">
                        <div className="modal__card__heading">
                            <h4>Tambah Pengeluaran</h4>
                            <i className="ph-fill ph-x-circle" onClick={() => {
                                setShowModalPengeluaran(false)
                                setShowDetails(true)
                            }}></i>
                        </div>
                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            const newSpent = {
                                id: editingSpentId ? editingSpentId : Date.now(), // kalau edit pakai id lama
                                name: namaPengeluaran,
                                amount: parseInt(jumlahPengeluaran),
                                date: tanggalPengeluaran,
                            };
                            handleAddOrUpdateSpent(selectedBudget.id, newSpent);
                            setEditingSpentId(null); // reset setelah selesai
                            setShowModalPengeluaran(false);
                        }}>
                            <input type="hidden" id="id_pengeluaran" />
                            <label for="nama_pengeluaran">Nama Pengeluaran</label>
                            <input id="nama_pengeluaran" name="nama_pengeluaran" type="text" value={namaPengeluaran} required onChange={(e) => setNamaPengeluaran(e.target.value)} />
                            <label for="jumlah_pengeluaran">Jumlah Pengeluaran</label>
                            <div className="input__money">
                                <span>Rp</span>
                                <input id="jumlah_pengeluaran" name="jumlah_pengeluaran" type="number" value={jumlahPengeluaran} required onChange={(e) => setJumlahPengeluaran(e.target.value)} />
                            </div>
                            <label for="tanggal">Tanggal</label>
                            <input id="tanggal" name="tanggal" type="date" value={tanggalPengeluaran} required onChange={(e) => setTanggalPengeluaran(e.target.value)} />
                            <div className="action" style={{
                                display: "flex",
                                justifyContent: isEdit ? "space-between" : "flex-end",
                            }}>
                                {isEdit &&
                                    <button id="delete_pengeluaran" type="button" className="danger" onClick={() => handleDeleteSpent(selectedBudget.id, selectedSpent.id)}><i
                                        className="ph-fill ph-trash"></i></button>
                                }
                                <button type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>

    )
}
