import React, { useEffect, useState, useCallback } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Delete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);

  const fetchMahasiswa = useCallback(async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/siswa/${id}`);
      setMahasiswa(result.data.data);
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchMahasiswa();
  }, [fetchMahasiswa]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/siswa/${id}`);
      Swal.fire({
        title: "Berhasil!",
        text: "Data mahasiswa berhasil dihapus!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/mahasiswa");
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus data.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Gagal menghapus data mahasiswa:", error);
    }
  };

  if (!mahasiswa) {
    return <p className="text-center">Memuat data...</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex my-3">
        <h1 className="text-center">Hapus Data Siswa</h1>
        <h2 className="text-center">
          <div className="alert alert-danger" role="alert">
            Apakah anda yakin ingin menghapus data di bawah ini? <br /> Data
            yang dihapus tidak dapat dikembalikan!
          </div>
        </h2>
        <center>
          <table>
            <tbody>
              <tr>
                <td>NIS</td>
                <td>:</td>
                <td>{mahasiswa.nis}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{mahasiswa.nama}</td>
              </tr>
              <tr>
                <td>Kelas</td>
                <td>:</td>
                <td>{mahasiswa.kelas}</td>
              </tr>
              <tr>
                <td>Jurusan</td>
                <td>:</td>
                <td>{mahasiswa.jurusan}</td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
      <div className="mb-3">
        <center>
          <NavLink to="/mahasiswa" className="btn btn-secondary mx-2">
            Kembali
          </NavLink>
          <button onClick={handleDelete} className="btn btn-danger mx-2">
            Hapus
          </button>
        </center>
      </div>
    </div>
  );
};

export default Delete;
