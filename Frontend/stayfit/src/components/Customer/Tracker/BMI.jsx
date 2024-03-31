import { React, useState, useEffect } from "react";

function BMI() {
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();

    const weight = parseInt(e.target.weight.value);
    const height = parseInt(e.target.height.value);

    setBmi(weight / ((height / 100) * (height / 100)));
  };

  useEffect(() => {
    if (bmi == null) {
      setBmiCategory("");
    } else if (bmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiCategory("Normal");
    } else if (bmi >= 25 && bmi < 30) {
      setBmiCategory("Overweight");
    } else if (bmi >= 30) {
      setBmiCategory("Obese");
    }
  }, [bmi]);

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="mb-0">Body Mass Index</h5>
      </div>
      <div className="card-body">
        <form className="form" onSubmit={(e) => calculateBMI(e)}>
          <div className="d-flex">
            <div className="mt-1 me-3">
              <h5>Weight:</h5>
              <input
                type="number"
                name="weight"
                className="form-control"
                placeholder="kg"
                required
              />
            </div>
            <div className="mt-1 ms-3">
              <h5>Height:</h5>
              <input
                type="number"
                name="height"
                className="form-control"
                placeholder="cm"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3 mb-3">
            Calculate
          </button>
        </form>
        <h5>BMI: {bmi}</h5>
        <hr className="mb-2 mt-2" />
        <h5 className="mb-0">Category: {bmiCategory}</h5>
      </div>
    </div>
  );
}

export default BMI;
