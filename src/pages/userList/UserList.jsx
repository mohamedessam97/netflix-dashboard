import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [data, setData] = useState(userRows);
  useEffect(() => {
    const fetchData =async ()=>{
        const res =await axios.get(`http://localhost:3001/user/all`);
        console.log(res.data);
        console.log(userRows);
        setData(res.data.map(item=> ({...item , id:item._id})))
    }
    fetchData()
}, []);
  const handleDelete = async (id) => {
    const res =await axios.delete(`http://localhost:3001/user/${id}`);
    console.log(res);
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "plan",
      headerName: "plan",
      width: 120,
    },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
      {/* <table>

      </table>
      <ul>

      {
        
        data.map(l=>{
          return(
            <li>{l.email}</li>
          )
        })
      }
      </ul> */}
    </div>
  );
}
