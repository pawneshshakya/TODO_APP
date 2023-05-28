import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_url, getAuthHeader } from "../../config";
import moment from "moment";
import { Button } from "react-bootstrap";

const Update = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    task: "",
    dueDate: "",
    description: "",
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get(`${base_url}/todo/getTask/${params.id}`, {
      headers: getAuthHeader(),
    });
    if (res.status === 200) {
      setInputVal({
        ...res.data,
        dueDate: moment(res.data.dueDate).format("yyyy-MM-DD"),
      });
    }
  };
  const setData = (e) => {
    let { name, value } = e.target;
    if (name === "dueDate") value = moment(value).format("yyyy-MM-DD");
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
  const markComplete = async () => {
    const res = await axios.get(`${base_url}/todo/completeTask/${params.id}`, {
      headers: { ...getAuthHeader() },
    });
    if (res.status === 200) {
      navigate("/home");
    }
  };
  const markInProgress = async () => {
    const res = await axios.get(
      `${base_url}/todo/markInProgress/${params.id}`,
      {
        headers: { ...getAuthHeader() },
      }
    );
    if (res.status === 200) {
      navigate("/home");
    }
  };
  const markInComplete = async () => {
    const res = await axios.get(
      `${base_url}/todo/markInComplete/${params.id}`,
      {
        headers: { ...getAuthHeader() },
      }
    );
    if (res.status === 200) {
      navigate("/home");
    }
  };
  const handleClick = (type) => {
    if (type === "inProgress") markInProgress();
    else markInComplete();
  };
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
              value={inputVal.task}
              className="form-control"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">
              Due Date {inputVal.dueDate}
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
              value={inputVal.description}
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
              Update
            </button>
            {inputVal.status !== "COMPLETED" ? (
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={markComplete}
              >
                Mark as Complete
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={() => handleClick("inProgress")}
                >
                  Mark as In-Progress
                </button>
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={() => handleClick("inComplete")}
                >
                  Mark as Incomplete
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
