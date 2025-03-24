import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Create = () => {
  const [mahasiswaField, setMahasiswaField] = useState({
    nis: "",
    nama: "",
    kelas: "",
    jurusan: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeMahasiswaFieldHandler = (e) => {
    setMahasiswaField({
      ...mahasiswaField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/siswa",
        mahasiswaField
      );
      console.log(response);

      Swal.fire({
        title: "Berhasil!",
        text: "Data mahasiswa berhasil disimpan!",
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
          text: "Terjadi kesalahan saat menambah data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center my-3">Form Tambah Mahasiswa</h1>
      <form method="post" onSubmit={onSubmitChange}>
        <div className="mb-3">
          <label className="form-label"> NIS</label>
          <input
            type="text"
            className={`form-control ${errors.nis ? "is-invalid" : ""}`}
            id="nis"
            placeholder="Isi NIS"
            name="nis"
            value={mahasiswaField.nis}
            onChange={onChangeMahasiswaFieldHandler}
          />
          {errors.nis && <div className="invalid-feedback">{errors.nis}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            className={`form-control ${errors.nama ? "is-invalid" : ""}`}
            id="nama"
            placeholder="Isi Nama"
            name="nama"
            value={mahasiswaField.nama}
            onChange={onChangeMahasiswaFieldHandler}
          />
          {errors.nama && <div className="invalid-feedback">{errors.nama}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Kelas</label>
          <input
            type="text"
            className={`form-control ${errors.kelas ? "is-invalid" : ""}`}
            id="kelas"
            placeholder="Isi Kelas"
            name="kelas"
            value={mahasiswaField.kelas}
            onChange={onChangeMahasiswaFieldHandler}
          />
          {errors.kelas && (
            <div className="invalid-feedback">{errors.kelas}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Jurusan</label>
          <input
            type="text"
            className={`form-control ${errors.jurusan ? "is-invalid" : ""}`}
            id="jurusan"
            placeholder="Isi Jurusan"
            name="jurusan"
            value={mahasiswaField.jurusan}
            onChange={onChangeMahasiswaFieldHandler}
          />
          {errors.jurusan && (
            <div className="invalid-feedback">{errors.jurusan}</div>
          )}
        </div>
        <center>
          <button type="submit" className="btn btn-success mx-1 mb-3">
            Simpan
          </button>
          <NavLink to="/mahasiswa" className="btn btn-secondary mx-1 mb-3">
            Kembali
          </NavLink>
        </center>
      </form>
    </div>
  );
};

export default Create;
