import { useContext, useEffect, useState } from "react";
import "./list.css";
import storage from "../../firebase";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory , useParams} from "react-router-dom";
import axios from "axios";


export default function List() {
  let {listId} =useParams()
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchData =async ()=>{
        const res =await axios.get(`http://localhost:3001/list/${listId}`);
        console.log(res);
        setList(res.data)
    }
    fetchData()
  }, []);
  console.log(list);

  const history = useHistory()

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);

    // setList({ ...list, [e.target.name]: value });
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res =await axios.patch(`http://localhost:3001/list/${listId}` , list);
    // createList(list, dispatch);
    history.push("/lists")
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Edit List</h1>
      {list && <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
              value={list.title}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
              value={list.genre}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange} value={list.type}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="MovieId"
              onChange={handleSelect}
              style={{ height: "280px" }}
              value={list.MovieId}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
            Edit
        </button>
      </form>}
    </div>
  );
}
