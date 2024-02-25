import { useEffect, useState } from "react";
import AddModal from "../components/addModal";
import axios from "axios";

interface Note {
  id: number;
  judul: string;
  deskripsi: string;
}
export const Home = () => {
  const [data, setData] = useState<Note[]>([]);
  console.log(data);

  const getData = async () => {
    await axios.get(`http://localhost:5050/notes`).then((res) => {
      setData(res.data.data);
    });
  };

  const deletedData = async (id: number) => {
    try {
      await axios
        .delete(`http://localhost:5050/notes`, { params: { id: id } })
        .then((res) => {
          console.log(res.data.msg);
        });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-300 gap-10 pb-10">
      <h1 className="text-3xl text-center mt-5 text-black font-black">
        Notepad
      </h1>
      <button
        className="btn btn-primary w-56 ml-16 -mb-7"
        onClick={() => {
          const addModal = document.getElementById(
            "addModal"
          ) as HTMLDialogElement | null;
          if (addModal) {
            addModal.showModal();
          }
        }}
      >
        Add
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {data.map((data: Note, index) => (
          <div
            className="card w-80 lg:w-96 mx-auto shadow-xl bg-white"
            key={index}
          >
            <div className="card-body">
              <h2 className="card-title">{data.judul}</h2>
              <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />
            </div>
            <div className="card-actions justify-end mr-4 mb-5">
              <button className="px-6 py-3 rounded-lg bg-yellow-500 text-black">
                Edit
              </button>
              <button
                className="px-6 py-3 rounded-lg bg-red-500 text-black"
                onClick={() => deletedData(data.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddModal getData={getData} />
    </div>
  );
};
