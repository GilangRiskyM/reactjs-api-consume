import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [mahasiswaField, setMahasiswaField] = useState({
    nis: "",
    nama: "",
    kelas: "",
    jurusan: "",
  });

  const fetchPost = useCallback(async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/siswa/${id}`);
      setMahasiswaField((prev) => ({ ...prev, ...result.data.data }));
      setErrors({});
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const changeMahasiswaFieldHandler = (e) => {
    setMahasiswaField((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/siswa/${id}`, mahasiswaField);
      Swal.fire({
        title: "Berhasil!",
        text: "Data mahasiswa berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/mahasiswa");
      });
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors || {});
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center my-3">Form Edit Mahasiswa</h1>
      <form onSubmit={onSubmitChange}>
        <div className="mb-3">
          <label className="form-label"> ID</label>
          <input type="text" className="form-control" value={id} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label"> NIS</label>
          <input
            type="text"
            className={`form-control ${errors.nis ? "is-invalid" : ""}`}
            placeholder="Isi NIS"
            name="nis"
            value={mahasiswaField.nis ?? ""}
            onChange={changeMahasiswaFieldHandler}
          />
          {errors.nis && (
            <div className="invalid-feedback">{errors.nis[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            className={`form-control ${errors.nama ? "is-invalid" : ""}`}
            placeholder="Isi Nama"
            name="nama"
            value={mahasiswaField.nama ?? ""}
            onChange={changeMahasiswaFieldHandler}
          />
          {errors.nama && (
            <div className="invalid-feedback">{errors.nama[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Kelas</label>
          <input
            type="text"
            className={`form-control ${errors.kelas ? "is-invalid" : ""}`}
            placeholder="Isi Kelas"
            name="kelas"
            value={mahasiswaField.kelas ?? ""}
            onChange={changeMahasiswaFieldHandler}
          />
          {errors.kelas && (
            <div className="invalid-feedback">{errors.kelas[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Jurusan</label>
          <input
            type="text"
            className={`form-control ${errors.jurusan ? "is-invalid" : ""}`}
            placeholder="Isi Jurusan"
            name="jurusan"
            value={mahasiswaField.jurusan ?? ""}
            onChange={changeMahasiswaFieldHandler}
          />
          {errors.jurusan && (
            <div className="invalid-feedback">{errors.jurusan[0]}</div>
          )}
        </div>
        <center>
          <button type="submit" className="btn btn-warning mx-1 mb-3">
            Update
          </button>
          <NavLink to="/mahasiswa" className="btn btn-secondary mx-1 mb-3">
            Kembali
          </NavLink>
        </center>
      </form>
    </div>
  );
};

export default Edit;
