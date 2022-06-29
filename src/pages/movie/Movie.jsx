import { useContext, useState, useEffect } from "react";
import "./movie.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NewMovie() {
  let { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  // const [imgTitle, setImgTitle] = useState(null);
  // const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [prog, setProg] = useState(null);

  const { dispatch } = useContext(MovieContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3001/movie/${movieId}`);
      console.log(res.data);
      setMovie(res.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    console.log(items);
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProg((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:3001/movie/${movieId}`,
      movie
    );
    console.log(res);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Edit Movie</h1>
      {movie && (
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="John Wick"
              name="title"
              onChange={handleChange}
              value={movie.title}
            />
          </div>

          <div className="addProductItem">
            <label>Year</label>
            <input
            type="number" min="1900" max="2022" step="1" 
              placeholder="Year"
              name="year"
              onChange={handleChange}
              value={movie.year}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
              value={movie.genre}
            />
          </div>
          <div className="addProductItem">
            <label>Duration</label>
            <input
              type="number"
              placeholder="Duration"
              name="limit"
              onChange={handleChange}
              value={movie.limit}
            />
          </div>
          <div className="addProductItem">
            <label>Limit</label>
            <input
              type="text"
              placeholder="limit"
              name="ContentRating"
              onChange={handleChange}
              value={movie.ContentRating}
            />
          </div>
          <div className="addProductItem">
            <label>Is Series?</label>
            <select
              name="isSeries"
              id="isSeries"
              onChange={handleChange}
              value={movie.isSeries}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            {/* <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
            value={movie.desc}
          /> */}
            <textarea
              id="w3review"
              name="desc"
              rows="4"
              cols="100"
              onChange={handleChange}
              value={movie.desc}
            >
              description
            </textarea>
          </div>
          <div className="addProductItem">
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>

          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          {uploaded === 3 ? (
            <button className="addProductButton" onClick={handleSubmit}>
              Edit
            </button>
          ) : (
            <>
              <button className="addProductButton" onClick={handleUpload}>
                Upload
              </button>
              <span>{prog}%</span>
            </>
          )}
        </form>
      )}
    </div>
  );
}
