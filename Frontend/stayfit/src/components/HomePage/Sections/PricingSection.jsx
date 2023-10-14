import React from "react";

function PricingSection() {
  return (
    <div id="pricing">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center mb-5 heading">
            <span className="subheading">Membership pricing</span>
            <h2 className="mb-4">Choose your plan</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 col-sm-6">
            <div class="pricing-card">
              <div class="header">
                <h3 class="title">1 Month</h3>
              </div>
              <div class="value">$59.99</div>
              <ul class="content">
                <li>Personal Coach</li>
                <li>Workout Program</li>
                <li>Nutrition Plan</li>
                <li>Gym Membership</li>
                <li>Goals Tracking</li>
              </ul>
              <div>
                <a href="#">Start Now</a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="pricing-card">
              <div class="header">
                <h3 class="title">6 Months</h3>
              </div>
              <div class="value">$339.99</div>
              <ul class="content">
                <li>Personal Coach</li>
                <li>Workout Program</li>
                <li>Nutrition Plan</li>
                <li>Gym Membership</li>
                <li>Goals Tracking</li>
              </ul>
              <div>
                <a href="#">Start Now</a>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="pricing-card">
              <div class="header">
                <h3 class="title">1 Year</h3>
              </div>
              <div class="value">$659.99</div>
              <ul class="content">
                <li>Personal Coach</li>
                <li>Workout Program</li>
                <li>Nutrition Plan</li>
                <li>Gym Membership</li>
                <li>Goals Tracking</li>
              </ul>
              <div>
                <a href="#">Start Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
