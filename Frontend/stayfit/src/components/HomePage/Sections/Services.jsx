import React from "react";

function Services() {
  return (
    <div id="services">
      <div className="container">
        <div className="row">
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="service-box first text-center">
              <div className="icon">
                <img src="images/flaticon-workout.png" />
              </div>
              <div className="text">
                <h2 className="mb-3">Workout Routines</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="service-box middle text-center">
              <div className="icon">
                <img src="images/flaticon-nutrition.png" />
              </div>
              <div className="text">
                <h2 className="mb-3">Nutrition Strategies</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="service-box last text-center">
              <div className="icon">
                <img src="images/flaticon-motivation.png" />
              </div>
              <div className="text">
                <h2 className="mb-3">Support Motivation</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
