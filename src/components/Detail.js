import React, { useEffect, useState, useCallback } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMahasiswa = useCallback(async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/siswa/${id}`);
      setMahasiswa(result.data.data);
      setError(null);
    } catch (error) {
      setError("Gagal mengambil data mahasiswa!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMahasiswa();
  }, [fetchMahasiswa]);

  if (loading) {
    return <p className="text-center">Memuat data...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <h1 className="text-center my-3">Detail Mahasiswa</h1>
        <hr />
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>NIS</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Jurusan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>{mahasiswa?.id}</td>
                <td>{mahasiswa?.nis}</td>
                <td>{mahasiswa?.nama}</td>
                <td>{mahasiswa?.kelas}</td>
                <td>{mahasiswa?.jurusan}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center my-3">
          <NavLink to="/mahasiswa" className="btn btn-secondary">
            Kembali
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Detail;
