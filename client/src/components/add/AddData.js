import axios from "axios";
import React, { useState } from "react";
import { base_url, getAuthHeader } from "../../config";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddData = () => {
  const [inputVal, setInputVal] = useState({
    task: "",
    dueDate: "",
    description: "",
  });
  const navigate = useNavigate();
  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const saveData = async () => {
    const res = await axios.post(`${base_url}/todo/saveTask`, inputVal, {
      headers: { ...getAuthHeader() },
    });
    if (res.status === 200) {
      navigate("/home");
    }
  };
  const completeTask = () => {};
  return (
    <div className="container">
      <div className="w-100 d-flex justify-content-start mt-5">
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputName1" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="task"
              onChange={setData}
              placeholder="Title"
              value={inputVal.title}
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              onChange={setData}
              value={inputVal.dueDate}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputDescription1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              onChange={setData}
              value={inputVal.desc}
              className="form-control"
              placeholder="Description"
              cols="80"
              rows="5"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={saveData}
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddData;
