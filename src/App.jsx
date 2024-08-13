import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
import Navbar from './components/Navbar/navbar';
import Search from './components/Search';

function App() {
  const datasPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedDatas = localStorage.getItem('datas');
    if (storedDatas) {
      setDatas(JSON.parse(storedDatas));
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const searchTerm = queryParams.get("q") || "";

    setCurrentPage(page);
    setSearch(searchTerm);

    const filtered = datas.filter((data) => 
      data.name && data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatas(filtered);
  }, [location.search, datas]);

    const totalPages = Math.ceil(filteredDatas.length / datasPerPage);
    const currentDatas = filteredDatas.slice(
      (currentPage - 1) * datasPerPage,
      currentPage * datasPerPage
    );

    const handleNextPage = () => {
      changePage(Math.min(currentPage + 1, totalPages));
    };

    const handlePrevPage = () => {
      changePage(Math.max(currentPage - 1, 1));
    }

    const handleDelete = (id) => {
      const updatedDatas = datas.filter(
        (data) => data.id !==id
      );
      setDatas(updatedDatas);
      localStorage.setItem("datas", JSON.stringify(updatedDatas));
    }

    const changePage = (page) => {
      setCurrentPage(page);
      if (search) {
        navigate(`?page=${page}&1=${search}`);
        return;
      }
      navigate(`?page=${page}`);
    }
  return (
    <>
      <div className="wrapper pb-5">
        <Navbar page={currentPage} />
        <div className="flex items-center justify-center">
          <Search page={currentPage} />
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-4 ml-4 "
            onClick={() => navigate("/add")}
          >
            Tambah Data
          </button>
        </div>
        <table className="bg-white mx-auto p-7 rounded-lg border border-gray-300 w-3/4 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Data</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDatas.map((data, index) => (
              <tr key={data.id}>
                <td className="py-2 px-4 border-b text-center">
                  {(currentPage - 1) * datasPerPage + index + 1}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {data.name}
                </td>
                <td className="flex justify-center items-center py-2 px-4 border-b text-center">
                  <Link to={`/update/${data.id}`}>
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-l"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="py-2 px-4 dark:text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-r"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default App
