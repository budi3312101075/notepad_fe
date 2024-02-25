import { memo, useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

interface AddModalProps {
  getData: () => void;
}

const addModal: React.FC<AddModalProps> = ({ getData }) => {
  const [deskripsi, setDeskripsi] = useState("");
  const [judul, setJudul] = useState("");

  const submit = async () => {
    try {
      await axios.post("http://localhost:5050/notes", {
        judul: judul,
        deskripsi: deskripsi,
      });
      closeModal();
      getData();
    } catch (err) {}
  };

  const closeModal = () => {
    (document.getElementById("addModal") as any).close();
  };
  return (
    <dialog id="addModal" className="text-black modal">
      <div className="modal-box bg-white max-w-5xl">
        <h3 className="font-bold text-lg ml-2">Add New Note</h3>
        <p className="mb-5 ml-2">add your activities in this notepad</p>
        <input
          className="bg-white px-2 py-1 mb-5 w-3/4 placeholder:text-black "
          type="text"
          name="judul"
          id="judul"
          placeholder="Judul"
          autoComplete="off"
          onChange={(e) => setJudul(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={deskripsi}
          onChange={setDeskripsi}
          className="h-44"
        />
        <button
          className="p-2 bg-green-500 rounded-xl mr-2 mt-12"
          type="submit"
          onClick={submit}
        >
          Submit
        </button>
        <button
          className="p-2 bg-red-500 rounded-xl"
          type="button"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default memo(addModal);
