import { useEffect, useState } from "react";
import $ from "jquery";
import studentsData from "./data/students";
import "./App.css";

function App() {
  const [students, setStudents] = useState(studentsData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nim: "",
    nama: "",
    prodi: "Teknologi Informasi",
    ipk: "",
    status: "Aktif",
  });

  // DOM Manipulation menggunakan JavaScript dan jQuery
  useEffect(() => {
    document.title = "Dashboard Akademik";

    $(".topbar").hide().fadeIn(500);

    $(".topbar h4").hover(
      function () {
        $(this).css("color", "#3978ef");
      },
      function () {
        $(this).css("color", "#263248");
      },
    );
  }, []);

  // Filter pencarian dan status mahasiswa
  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      student.nim.toLowerCase().includes(keyword) ||
      student.nama.toLowerCase().includes(keyword);

    const matchStatus =
      filterStatus === "Semua" || student.status === filterStatus;

    return matchSearch && matchStatus;
  });

  // Statistik dashboard
  const total = students.length;
  const aktif = students.filter((s) => s.status === "Aktif").length;
  const nonaktif = students.filter((s) => s.status === "Nonaktif").length;

  const rataIpk = total
    ? (students.reduce((sum, s) => sum + Number(s.ipk), 0) / total).toFixed(2)
    : "0.00";

  // Membuka form tambah mahasiswa
  const handleAdd = () => {
    setEditId(null);
    setForm({
      nim: "",
      nama: "",
      prodi: "Teknologi Informasi",
      ipk: "",
      status: "Aktif",
    });
    setShowModal(true);
  };

  // Membuka form edit mahasiswa
  const handleEdit = (student) => {
    setEditId(student.id);

    setForm({
      nim: student.nim,
      nama: student.nama,
      prodi: student.prodi,
      ipk: student.ipk,
      status: student.status,
    });

    setShowModal(true);
  };

  // Menyimpan data mahasiswa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(form.ipk) < 0 || Number(form.ipk) > 4) {
      alert("IPK harus antara 0 sampai 4!");
      return;
    }

    if (students.some((s) => s.nim === form.nim && s.id !== editId)) {
      alert("NIM sudah terdaftar!");
      return;
    }

    if (editId) {
      setStudents(
        students.map((s) =>
          s.id === editId ? { ...form, id: editId, ipk: Number(form.ipk) } : s,
        ),
      );
    } else {
      setStudents([
        ...students,
        { ...form, id: Date.now(), ipk: Number(form.ipk) },
      ]);
    }

    setShowModal(false);
  };

  // Menghapus data mahasiswa
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data mahasiswa ini?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">A</div>
          <div>
            <h5>ACADEMIC</h5>
            <small>Management System</small>
          </div>
        </div>

        <p className="menu-label">MENU UTAMA</p>

        <div className="menu-item active">
          <span>▦</span> Dashboard
        </div>

        <div className="menu-item">
          <span>♙</span> Data Mahasiswa
        </div>

        <div className="menu-item">
          <span>▤</span> Akademik
        </div>

        <div className="menu-item">
          <span>⚙</span> Pengaturan
        </div>

        <div className="sidebar-bottom">
          <div className="admin-avatar">GA</div>
          <div>
            <strong>Administrator</strong>
            <small>Admin Kampus</small>
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h4>Dashboard</h4>
            <small>Selamat datang di sistem akademik</small>
          </div>

          <div className="admin-info">
            <span>🔔</span>
            <div className="admin-avatar">GA</div>
          </div>
        </header>

        {/* STATISTIK */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">♙</div>
            <p>Total Mahasiswa</p>
            <h2>{total}</h2>
            <small>Seluruh data mahasiswa</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Mahasiswa Aktif</p>
            <h2>{aktif}</h2>
            <small>Terdaftar aktif</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <p>Mahasiswa Nonaktif</p>
            <h2>{nonaktif}</h2>
            <small>Status nonaktif</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">★</div>
            <p>Rata-rata IPK</p>
            <h2>{rataIpk}</h2>
            <small>Akumulasi nilai IPK</small>
          </div>
        </section>

        {/* TABEL MAHASISWA */}
        <section className="table-card">
          <div className="table-heading">
            <div>
              <h5>Data Mahasiswa</h5>
              <p>Kelola informasi dan nilai akademik mahasiswa</p>
            </div>

            <button className="btn-add" onClick={handleAdd}>
              + Tambah Mahasiswa
            </button>
          </div>

          {/* PENCARIAN DAN FILTER */}
          <div className="filter-area">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Cari NIM atau nama mahasiswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="form-select status-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

          {/* TABEL DATA */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>Program Studi</th>
                  <th>IPK</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <strong>{student.nim}</strong>
                    </td>

                    <td>{student.nama}</td>
                    <td>{student.prodi}</td>

                    <td>
                      <strong>{Number(student.ipk).toFixed(2)}</strong>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          student.status === "Aktif"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(student)}
                          title="Edit data"
                        >
                          ✎
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(student.id)}
                          title="Hapus data"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Data mahasiswa tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Menampilkan {filteredStudents.length} dari {total} mahasiswa
          </div>
        </section>

        <footer>© 2026 Academic Dashboard | Sistem Informasi Akademik</footer>
      </main>

      {/* MODAL TAMBAH DAN EDIT */}
      {showModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <div className="modal-header">
              <div>
                <h5>{editId ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</h5>
                <small>Lengkapi informasi mahasiswa berikut.</small>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <label>NIM</label>
                <input
                  className="form-control"
                  required
                  value={form.nim}
                  onChange={(e) => setForm({ ...form, nim: e.target.value })}
                  placeholder="Masukkan NIM"
                />

                <label>Nama Mahasiswa</label>
                <input
                  className="form-control"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                />

                <label>Program Studi</label>
                <select
                  className="form-select"
                  value={form.prodi}
                  onChange={(e) => setForm({ ...form, prodi: e.target.value })}
                >
                  <option>Teknologi Informasi</option>
                  <option>Sistem Informasi</option>
                  <option>Informatika</option>
                  <option>Manajemen</option>
                </select>

                <label>IPK</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  min="0"
                  max="4"
                  step="0.01"
                  value={form.ipk}
                  onChange={(e) => setForm({ ...form, ipk: e.target.value })}
                  placeholder="Contoh: 3.75"
                />

                <label>Status Mahasiswa</label>
                <select
                  className="form-select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Aktif</option>
                  <option>Nonaktif</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>

                <button type="submit" className="btn-save">
                  {editId ? "Simpan Perubahan" : "Simpan Mahasiswa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
