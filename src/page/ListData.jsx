import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';

const ListData = () => {
    const [anyData, setAnyData] = useState("");
    const [datas, setDatas] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedDatas = localStorage.getItem("datas");
        if (!storedDatas) {
            localStorage.setItem("datas", JSON.stringify(datas));
        } else {
            setDatas(JSON.parse(storedDatas));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!anyData) return;

        const newData = {
            id: datas.length + 1,
            name: anyData,
        };

        const updatedDatas = [...datas, newData];
        setDatas(updatedDatas);
        localStorage.setItem("datas", JSON.stringify(updatedDatas));
        navigate("/");
    };

  return (
    <>
    <Navbar/>
    <div className="wrapper p-7">
        <div className='max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-8'>
            <h2 className='ext-2xl font-bold mb-4'>Tambah Data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nama Data
                </label>
                <input
                type="text"
                value={anyData}
                onChange={(e) => setAnyData(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Masukkan Data Apapun"
                />
                </div>
                <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Tambah
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

export default ListData