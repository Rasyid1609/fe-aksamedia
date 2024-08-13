import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';

const UpadateData = () => {
    const [anyData, setAnyData] = useState("");
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const storedDatas = localStorage.getItem("datas");
        if (!storedDatas) {
          localStorage.setItem("datas", JSON.stringify(datas));
        } else {
          setDatas(JSON.parse(storedDatas));
        }
    
        if (id) {
          const dataToUpdate = JSON.parse(storedDatas).find(
            (data) => data.id === parseInt(id)
          );
          if (dataToUpdate) {
            setAnyData(dataToUpdate.name);
          }
        }
      }, [id]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!anyData) return;
    
        const newData = {
          id: parseInt(id),
          name: anyData,
        };
        
        const updatedDatas = id
        ? datas.map((data) =>
            data.id === parseInt(id) ? newData : data
            )
        : [...datas, newData];

        setDatas(updatedDatas);
        localStorage.setItem("datas", JSON.stringify(updatedDatas));

        navigate("/");
    };
  return (
    <>
      <Navbar />
      <div className="wrapper p-7">
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">
            {id ? "Update data" : "Tambah Data Baru"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Data Apapun
              </label>
              <input
                type="text"
                value={anyData}
                onChange={(e) => setAnyData(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Masukkan nama Data"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {id ? "Update" : "Tambah"}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpadateData