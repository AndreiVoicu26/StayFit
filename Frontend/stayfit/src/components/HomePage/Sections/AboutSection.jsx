import React from "react";

function AboutSection() {
  return (
    <div id="about">
      <div className="container-xl">
        <div className="row g-xl-5">
          <div className="col-md-6 d-flex align-items-stretch">
            <div
              className="img w-100"
              style={{ backgroundImage: `url(${"images/about.png"}` }}
            >
              <div className="counter-wrap d-flex">
                <div className="icon">
                  <img src="images/flaticon-experience.png" />
                </div>
                <div className="text ps-3">
                  <span className="number" data-number="10">
                    0
                  </span>
                  <span class="caption">Years of Experience</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-stretch heading">
            <div className="mt-5 mt-md-0">
              <span className="subheading">About Us</span>
              <h2 className="mb-2">We Are The Best Nutritionists in Town</h2>
              <h3 className="mb-4">Helping People Live Healthier Lives</h3>
              <p className="mb-4">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
              <h4>Our Mission</h4>
              <div className="d-flex">
                <ul>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Balance Body
                    and Mind
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Healthier
                    Habits
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Workout
                    Routines
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Advice
                  </li>
                </ul>
                <ul>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Balance Body
                    and Mind
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Healthier
                    Habits
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Workout
                    Routines
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Advice
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
