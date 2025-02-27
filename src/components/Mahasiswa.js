import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Mahasiswa = () => {
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/siswa");
      // Pastikan result.data.data ada dan merupakan array sebelum diproses
      if (result.data && Array.isArray(result.data.data)) {
        const sortedData = result.data.data.sort((a, b) => b.id - a.id);
        setMahasiswaData(sortedData);
      } else {
        // Jika data bukan array atau tidak ada, set array kosong
        setMahasiswaData([]);
      }
    } catch (error) {
      console.error("Server Error:", error);
      setError("Gagal mengambil data mahasiswa.");
      // Reset mahasiswaData ke array kosong saat terjadi error
      setMahasiswaData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p className="text-center">Memuat data...</p>;
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row d-flex">
          <h1 className="text-center my-3">Daftar Mahasiswa</h1>
          <hr />
          <div className="col-12 col-md-12 mb-3 text-center">
            <NavLink to="/mahasiswa/create" className="btn btn-primary">
              Tambah Data
            </NavLink>
          </div>
          <hr />
          <p className="text-center text-danger">{error}</p>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>NIS</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Jurusan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    Data Kosong
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <h1 className="text-center my-3">Daftar Mahasiswa</h1>
        <hr />
        <div className="col-12 col-md-12 mb-3 text-center">
          <NavLink to="/mahasiswa/create" className="btn btn-primary">
            Tambah Data
          </NavLink>
        </div>
        <hr />
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>NIS</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswaData.length > 0 ? (
                mahasiswaData.map((mahasiswa, index) => (
                  <tr key={mahasiswa.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{mahasiswa.nis}</td>
                    <td>{mahasiswa.nama}</td>
                    <td>{mahasiswa.kelas}</td>
                    <td>{mahasiswa.jurusan}</td>
                    <td className="text-center">
                      <NavLink
                        to={`/mahasiswa/${mahasiswa.id}`}
                        className="btn btn-info my-1 mx-2"
                      >
                        Lihat
                      </NavLink>
                      <NavLink
                        to={`/mahasiswa/${mahasiswa.id}/edit`}
                        className="btn btn-warning my-1 mx-2"
                      >
                        Edit
                      </NavLink>
                      <NavLink
                        to={`/mahasiswa/${mahasiswa.id}/delete`}
                        className="btn btn-danger my-1 mx-2"
                      >
                        Hapus
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Data Kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mahasiswa;
