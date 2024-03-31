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
                  <span className="number" data-number="5">
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
              <h2 className="mb-2">Our Story: The Path To Well-Being</h2>
              <h3 className="mb-4">Helping People Live Healthier Lives</h3>
              <p className="mb-4">
                Stayfit emerged from a simple belief: health and wellness are
                the cornerstones of a full life. Our mission is to empower
                individuals through holistic fitness and nutrition solutions,
                fostering a community where every journey towards health and
                vitality is supported and celebrated.
              </p>
              <h4>Our Commitment</h4>
              <div className="d-md-flex text-center">
                <ul>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Balance Body
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
                    <span class="ion-ios-checkmark-circle"></span>Personal
                    Growth
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Nutrition
                    Education
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Consistent
                    Progress
                  </li>
                  <li>
                    <span class="ion-ios-checkmark-circle"></span>Support
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
