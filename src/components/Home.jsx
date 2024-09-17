import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [duedate, setDuedate] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      handleGetAllTasks(); // Call handleGetAllTasks correctly
    }
  }, [isAuthenticated, navigate]);

  const handleDataSave = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/saveTodo",
        { title, duedate, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      handleGetAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleGetAllTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/getTodo", {
        withCredentials: true,
      });
      // toast.success(data.message);
      setTasks(data.getTodo);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTasks = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/deleteTodo/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      handleGetAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // const updateTasks = async (id) => {
  //   try {
  //     const updatedTask = tasks.find((task) => task._id === id);
  //     await axios.put(`http://localhost:3000/api/v1/${id}`, updatedTask, {
  //       withCredentials: true,
  //     });
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const updateTasks = async (id) => {
    const updatedTask = tasks.find((task) => task._id === id);
    await axios
      .put(`http://localhost:3000/api/v1/${id}`, updatedTask, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChnage = async (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  return (
    <>
      <section className="home">
        <h1>CREATE YOUR TASK</h1>
        <div className="Add-task">
          <input
            type="text"
            placeholder="Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="Please enter Duedate"
            value={duedate}
            onChange={(e) => setDuedate(e.target.value)}
          />
          <textarea
            placeholder="Please enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleDataSave}>Create Task</button>
        </div>

        <div className="my-task">
          <h2>My Task</h2>
          {tasks && tasks.length > 0 ? (
            tasks.map((element) => {
              return (
                <div className="task-container" key={element._id}>
                  <div className="data">
                    <input
                      type="text"
                      value={element.title}
                      onChange={(e) =>
                        handleInputChnage(element._id, "title", e.target.value)
                      }
                    />

                    <input
                      className="input"
                      type="date"
                      value={element.duedate}
                      onChange={(e) =>
                        handleInputChnage(
                          element._id,
                          "duedate",
                          e.target.value
                        )
                      }
                    />

                    <textarea
                      className="textarea"
                      value={element.description}
                      onChange={(e) =>
                        handleInputChnage(
                          element._id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="btn">
                    <button
                      onClick={() => {
                        updateTasks(element._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        deleteTasks(element._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Task is Created</h1>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
