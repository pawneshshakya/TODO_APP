import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../assets/css/style.css";
import axios from "axios";
import { base_url, getAuthHeader } from "../config";
import moment from "moment";

const Home = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // markInComplete();
    getList();
  }, []);
  const getList = async () => {
    const res = await axios.get(`${base_url}/todo/allTask`, {
      headers: getAuthHeader(),
    });
    if (res.status === 200) setTaskList(res.data);
  };

  const deleteTask = async (id) => {
    let res = await axios.delete(`${base_url}/todo/deleteTask/${id}`, {
      headers: getAuthHeader(),
    });
    if (res.status === 200) await getList();
    else alert("Unable to delete task.");
  };
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <Link to="/adddata">
            <button className="btn btn-primary">Add Task</button>
          </Link>
        </div>
        <table className="table mt-2 table-striped table-res">
          <thead>
            <tr className="table-dark">
              <th className="w-5" scope="col">
                S.No.
              </th>
              <th className="w-15" scope="col">
                Task
              </th>
              <th className="w-30" scope="col">
                Description
              </th>
              <th className="w-10" scope="col">
                Added On
              </th>
              <th className="w-10" scope="col">
                Due Date
              </th>
              <th className="w-15" scope="col">
                Status
              </th>
              <th className="w-15" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskList?.map((task, i) => (
              <tr key={task._id}>
                <th scope="row">{i + 1}</th>
                <td>{task.task}</td>
                <td>{task.description}</td>
                <td>{moment(task.addedOn).format("DD/MM/yyyy")}</td>
                <td>{moment(task.dueDate).format("DD/MM/yyyy")}</td>
                <td>
                  {task.status === "IN_PROGRESS"
                    ? "In Progress"
                    : task.status === "COMPLETED"
                    ? "Completed"
                    : "Incompleted"}
                </td>
                <td className="table_btn">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/update/${task._id}`)}
                  >
                    {<EditIcon />}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(task._id)}
                  >
                    {<DeleteIcon />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
