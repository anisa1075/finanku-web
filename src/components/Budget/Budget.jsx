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

        const newBudget = {
            id: Date.now(), // unik id
            nama: namaBudget,
            total: parseInt(totalBudget),
        };

        const updatedBudgets = [...budgets, newBudget];
        setBudgets(updatedBudgets);

        // simpan ke localStorage
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

        // reset input
        setNamaBudget("");
        setTotalBudget("");

        // tutup modal
        setShowModal(false);
        setShowDetails(false);
    };

    return (
        <div style={{ backgroundImage: `url(${Budgetbg})` }} className='bg-cover relative'>
            <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-bold font-outfit mt-24 text-[#9B51E0] text-center ' style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.2)" }}>My Budget.</h1>
            </div>
            <div className='h-screen' style={{ display: showDetails ? "none" : "block" }}>
                {/* Main Home */}
                {!showDetails &&

                    <main id="budgets" className="container budgets mt-10" onClick={() => setShowDetails(true)}>
                        {budgets.map((budget) => (
                            <div key={budget.id} className="budget__card" data-budgetid={budget.id} onClick={() => setShowDetails(true)}>
                                <h2 className="budget__name">{budget.nama}</h2>
                                <p className="budget__amount">Rp. {budget.total}</p>
                                <p className="budget__total">Total Rp. {budget.total}</p>
                            </div>
                        ))}

                        <button className="add__budget__btn" onClick={() => {
                            setShowModal(true);
                            setShowDetails(false);
                        }}>+</button>
                    </main>
                }

            </div>

            {/* Main Details */}
            {showDetails &&
                <div className='w-full mx-auto flex justify-center py-18'>
                    <main id="budget_details" className="container">
                        <button className="back__home" onClick={() => setShowDetails(false)}>
                            <i className="ph ph-caret-left icon__back"></i>
                            Halaman Utama
                        </button>
                        <div className="budget__card">
                            <div>
                                <h2 className="budget__name">Makan dan Minum</h2>
                                <p className="budget__amount">Rp 968.000</p>
                                <p className="budget__total">Total Rp 1.000.000</p>
                            </div>

                            <div className="icon">
                                <i className="ph ph-pencil-line"></i>
                            </div>

                        </div>

                        <button className="add__spent__btn" onClick={() => setShowModalPengeluaran(true)}><span>+</span> Catat Pengeluaran</button>

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
                            <div className="spent__item">
                                <div className="spent__item__description">
                                    <h4>Bakso</h4>
                                    <p>2025-07-10</p>
                                </div>
                                <div className="spent__item__price">

                                    <p>Rp. 50000</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            }

            {/* Modal Tambah Budget */}
            {showModal && (
                <div id="budget_form" className="modal">
                    <div className="card">
                        <div className="modal__card__heading">
                            <h4>Tambah Budget</h4>
                            <i
                                className="ph-fill ph-x-circle"
                                onClick={() => {
                                    setShowModal(false);
                                    setShowDetails(false);
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

                            <div className="action">
                                <button id="delete_budget" type="button" className="danger">
                                    <i className="ph-fill ph-trash"></i>
                                </button>
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
                        <form action="">
                            <input type="hidden" id="id_pengeluaran" />
                            <label for="nama_pengeluaran">Nama Pengeluaran</label>
                            <input id="nama_pengeluaran" name="nama_pengeluaran" type="text" required />
                            <label for="jumlah_pengeluaran">Jumlah Pengeluaran</label>
                            <div className="input__money">
                                <span>Rp</span>
                                <input id="jumlah_pengeluaran" name="jumlah_pengeluaran" type="number" required />
                            </div>
                            <label for="tanggal">Tanggal</label>
                            <input id="tanggal" name="tanggal" type="date" required />
                            <div className="action">
                                <button id="delete_pengeluaran" type="button" className="danger"><i
                                    className="ph-fill ph-trash"></i></button>
                                <button type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>

    )
}
