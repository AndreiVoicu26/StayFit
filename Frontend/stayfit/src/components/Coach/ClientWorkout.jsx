import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Workout() {
  const initialClients = [
    {
      id: 1,
      name: "Andrei Voicu",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 2,
      name: "Liam Johnson",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 3,
      name: "Olivia Smith",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 4,
      name: "Ethan Davis",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 5,
      name: "Anastasia Brown",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 6,
      name: "Noah Taylor",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
  ];
  const { id } = useParams();

  const client = initialClients.find((client) => client.id === Number(id));

  const [activeDay, setActiveDay] = useState(null);
  const [categories, setCategories] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [editedCategory, setEditedCategory] = useState("");
  const [showAddExercise, setShowAddExercise] = useState({});
  const [exerciseInput, setExerciseInput] = useState({});
  const [exerciseLink, setExerciseLink] = useState({});
  const [editingExerciseIndex, setEditingExerciseIndex] = useState({});
  const [editedExercise, setEditedExercise] = useState({});

  const getCardClassName = (day, index) => {
    return `card py-3 mb-3 color-${index % 2 === 0 ? "2" : "1"} day ${
      activeDay === day ? "active" : ""
    }`;
  };

  const handleAddCategory = () => {
    setCategories((prevCategories) => {
      const existingCategories = prevCategories[activeDay] || [];
      return {
        ...prevCategories,
        [activeDay]: [
          ...existingCategories,
          { name: newCategory, exercises: [] },
        ],
      };
    });

    setNewCategory("");
    setShowAddCategory(false);
  };

  const handleEditCategory = (index, category) => {
    setEditingCategoryIndex(index);
    setEditedCategory(category.name);
  };

  const handleSaveEdit = () => {
    setCategories((prevCategories) => {
      const editedCategories = [...(prevCategories[activeDay] || [])];
      editedCategories[editingCategoryIndex].name = editedCategory;

      return {
        ...prevCategories,
        [activeDay]: editedCategories,
      };
    });

    setEditingCategoryIndex(null);
    setEditedCategory("");
  };

  const handleCancelEdit = () => {
    setEditingCategoryIndex(null);
    setEditedCategory("");
  };

  const handleRemoveCategory = (index) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories[activeDay]];
      updatedCategories.splice(index, 1);

      return {
        ...prevCategories,
        [activeDay]: updatedCategories,
      };
    });
  };

  const handleAddExercise = (categoryIndex) => {
    setShowAddExercise((prev) => ({ ...prev, [categoryIndex]: true }));
  };

  const handleSaveExercise = (categoryIndex) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories[activeDay]];
      const exerciseName = exerciseInput[categoryIndex];
      const exerciseLinkValue = exerciseLink[categoryIndex] || "";

      if (
        !updatedCategories[categoryIndex].exercises.some(
          (ex) => ex.name === exerciseName
        )
      ) {
        updatedCategories[categoryIndex].exercises.push({
          name: exerciseName,
          link: exerciseLinkValue,
        });
      }

      return {
        ...prevCategories,
        [activeDay]: updatedCategories,
      };
    });

    setExerciseInput((prev) => ({ ...prev, [categoryIndex]: "" }));
    setExerciseLink((prev) => ({ ...prev, [categoryIndex]: "" }));
    setShowAddExercise((prev) => ({ ...prev, [categoryIndex]: false }));
  };

  const handleEditExercise = (categoryIndex, exerciseIndex, exercise) => {
    setEditingExerciseIndex({ categoryIndex, exerciseIndex });
    setEditedExercise(exercise);
  };

  const handleSaveEditExercise = () => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories[activeDay]];
      const { categoryIndex, exerciseIndex } = editingExerciseIndex;

      updatedCategories[categoryIndex].exercises[exerciseIndex] =
        editedExercise;

      return {
        ...prevCategories,
        [activeDay]: updatedCategories,
      };
    });

    setEditingExerciseIndex({});
    setEditedExercise({});
  };

  const handleCancelEditExercise = () => {
    setEditingExerciseIndex({});
    setEditedExercise({});
  };

  const handleRemoveExercise = (categoryIndex, exerciseIndex) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories[activeDay]];
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        exercises: updatedCategories[categoryIndex].exercises.filter(
          (_, index) => index !== exerciseIndex
        ),
      };

      return {
        ...prevCategories,
        [activeDay]: updatedCategories,
      };
    });
  };

  const handleRedirectToLink = (link) => {
    window.location.href = link;
  };

  const isValidURL = (url) => {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlRegex.test(url);
  };

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="workout-nutrition">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">
                  {client.name}'s Workout Schedule
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-4 mt-3">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Tursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <div
                  key={day}
                  className={getCardClassName(day, index)}
                  onClick={() => setActiveDay(day)}
                >
                  <div className="card-body">
                    <h4 className="mb-0 ms-4">{day}</h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-xl-8 mt-3 mb-3">
              {!activeDay ? (
                <div className="card h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="w-100 text-center">
                      <h3>Select a day to view the schedule</h3>
                      <h3>
                        Press <i class="fa-solid fa-plus"></i> to add workouts
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-square-plus"></i> to add
                        exercises for a workout
                      </h3>
                      <h3>For each workout or exercise:</h3>
                      <h3>
                        Press <i class="fa-solid fa-pen-to-square"></i> to edit
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-trash"></i> to delete
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-floppy-disk"></i> to save
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-xmark"></i> to cancel
                      </h3>
                      <h3>
                        For an exercise press
                        <i class="fa-solid fa-arrow-up-right-from-square ms-2 me-2"></i>
                        to access the link
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3 className="mb-0 fw-bold">Schedule for {activeDay}</h3>
                      <i
                        class="fa-solid fa-plus d-flex align-items-center fs-3"
                        onClick={() => setShowAddCategory(true)}
                      ></i>
                    </div>
                  </div>
                  {categories[activeDay] &&
                    categories[activeDay].map((category, index) => (
                      <div className="card mt-3 mb-3" key={index}>
                        <div className="card-header">
                          {editingCategoryIndex === index ? (
                            <>
                              <div className="d-flex">
                                <input
                                  className="me-auto form-control"
                                  type="text"
                                  value={editedCategory}
                                  maxLength={25}
                                  onChange={(e) =>
                                    setEditedCategory(e.target.value)
                                  }
                                  required
                                />
                                <i
                                  class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
                                  onClick={handleSaveEdit}
                                ></i>
                                <i
                                  class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
                                  onClick={handleCancelEdit}
                                ></i>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="d-flex">
                                <h4 className="mb-0 me-auto">
                                  {category.name}
                                </h4>
                                <i
                                  class="fa-solid fa-square-plus d-flex align-items-center fs-3 me-2 mt-1"
                                  onClick={() => handleAddExercise(index)}
                                ></i>
                                <i
                                  class="fa-solid fa-pen-to-square d-flex align-items-center fs-3 ms-2 me-1"
                                  onClick={() =>
                                    handleEditCategory(index, category)
                                  }
                                ></i>
                                <i
                                  class="fa-solid fa-trash d-flex align-items-center fs-3 ms-1"
                                  onClick={() => handleRemoveCategory(index)}
                                ></i>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="card-body">
                          {showAddExercise[index] && (
                            <div className="card">
                              <div className="card-header">
                                <h4 className="mb-0">New exercise:</h4>
                              </div>
                              <div className="card-body">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Exercise Name"
                                  value={exerciseInput[index] || ""}
                                  maxLength={50}
                                  onChange={(e) =>
                                    setExerciseInput((prev) => ({
                                      ...prev,
                                      [index]: e.target.value,
                                    }))
                                  }
                                  required
                                />
                                <div className="d-md-flex mt-2">
                                  <input
                                    type="url"
                                    className="me-auto form-control"
                                    placeholder="Exercise Link"
                                    value={exerciseLink[index] || ""}
                                    onChange={(e) =>
                                      setExerciseLink((prev) => ({
                                        ...prev,
                                        [index]: e.target.value,
                                      }))
                                    }
                                  />
                                  <div className="d-flex mt-2 mt-md-0">
                                    <i
                                      class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
                                      onClick={() => handleSaveExercise(index)}
                                    ></i>
                                    <i
                                      class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
                                      onClick={() =>
                                        setShowAddExercise((prev) => ({
                                          ...prev,
                                          [index]: false,
                                        }))
                                      }
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {category.exercises.map((exercise, exerciseIndex) => (
                            <div key={exerciseIndex} className=" mt-3">
                              {editingExerciseIndex.categoryIndex === index &&
                              editingExerciseIndex.exerciseIndex ===
                                exerciseIndex ? (
                                <>
                                  <input
                                    className="form-control"
                                    placeholder="Exercise Name"
                                    type="text"
                                    value={editedExercise.name}
                                    maxLength={50}
                                    onChange={(e) =>
                                      setEditedExercise({
                                        ...editedExercise,
                                        name: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                  <div className="d-flex mt-2">
                                    <input
                                      type="url"
                                      className="me-auto form-control"
                                      placeholder="Exercise Link"
                                      value={editedExercise.link || ""}
                                      onChange={(e) =>
                                        setEditedExercise({
                                          ...editedExercise,
                                          link: e.target.value,
                                        })
                                      }
                                    />
                                    <i
                                      class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
                                      onClick={handleSaveEditExercise}
                                    ></i>
                                    <i
                                      class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
                                      onClick={handleCancelEditExercise}
                                    ></i>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="d-flex">
                                    <div className="d-flex me-auto">
                                      <h4 className="mb-0">{exercise.name}</h4>
                                      {exercise.link &&
                                        isValidURL(exercise.link) && (
                                          <i
                                            class="fa-solid fa-arrow-up-right-from-square d-flex align-items-center fs-4 mx-3"
                                            onClick={() =>
                                              handleRedirectToLink(
                                                exercise.link
                                              )
                                            }
                                          ></i>
                                        )}
                                    </div>
                                    <i
                                      class="fa-solid fa-pen-to-square d-flex align-items-center fs-3 me-1"
                                      onClick={() =>
                                        handleEditExercise(
                                          index,
                                          exerciseIndex,
                                          exercise
                                        )
                                      }
                                    ></i>
                                    <i
                                      class="fa-solid fa-trash d-flex align-items-center fs-3 ms-1"
                                      onClick={() =>
                                        handleRemoveExercise(
                                          index,
                                          exerciseIndex
                                        )
                                      }
                                    ></i>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  {showAddCategory && (
                    <div className="card mt-3">
                      <div className="card-header">
                        <h4 className="mb-0">New workout:</h4>
                      </div>
                      <div className="card-body d-flex">
                        <input
                          className="me-auto form-control"
                          type="text"
                          value={newCategory}
                          maxLength={25}
                          onChange={(e) => setNewCategory(e.target.value)}
                          required
                        />
                        <i
                          class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
                          onClick={handleAddCategory}
                        ></i>
                        <i
                          class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
                          onClick={() => setShowAddCategory(false)}
                        ></i>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workout;
