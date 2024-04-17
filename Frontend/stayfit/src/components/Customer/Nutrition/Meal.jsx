import React from "react";

function NutritionPlan({ meals, mealType, index }) {
  return (
    <div className="card my-3" key={index}>
      <div className="card-header d-flex">
        <h4 className="mb-0 me-auto fw-bold">{mealType}</h4>
      </div>
      <div className="card-body">
        {meals &&
          meals
            .filter(
              (mealElement) => mealElement.mealType === mealType.toUpperCase()
            )
            .map((mealElement, mealIndex) => (
              <div key={mealIndex} className="d-flex">
                <h4 className="mb-0">{mealElement.name}</h4>
                <h4 className="mb-0 mx-3 text-muted">
                  {mealElement.details && "|"}
                </h4>
                <h4 className="mb-0">{mealElement.details}</h4>
                <hr />
              </div>
            ))}
      </div>
    </div>
  );
}

export default NutritionPlan;
