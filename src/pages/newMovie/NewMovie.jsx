import { useContext, useState } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { AttachFile } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export default function NewMovie() {
let history =useHistory()

  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [prog , setProg] =useState(null)

  const { dispatch } = useContext(MovieContext);

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
          const progs =Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes )*100
          )
          // let progress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProg(progs)
          // console.log("Upload is " + progress + "% done");
          // setInterval(()=>{
          //   },1000)
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
    if(img && trailer && video){
      console.log("ss");
      upload([
        { file: img, label: "img" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);

    }else{
      setUploaded(3)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
history.push("/movies")

  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
               type="number" min="1900" max="2022" step="1" 
         
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
         
            type="number"
            placeholder="Duration"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="ContentRating"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {/* <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div> */}
     
        <div className="addProductItem">
            <label>Description</label>
            <textarea
          
              name="desc"
              rows="4"
              cols="100"
              onChange={handleChange}
              // value={movie.desc}
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
            Create
          </button>
        ) : (<>
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
          <span>{prog}%</span>
        </>
        )}
      </form>
    </div>
  );
}
