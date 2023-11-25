import React from "react";

function HeroSection() {
  return (
    <div id="hero">
      <div className="home-slider js-fullheight owl-carousel">
        <div className="slider-item js-fullheight">
          <div className="container-fluid p-0 gradient">
            <div
              className="row d-md-flex slider-text js-fullheight align-items-center justify-content-end"
              data-scrollax-parent="true"
            >
              <div
                className="one-third order-md-last img js-fullheight"
                style={{
                  backgroundImage: `url(${"images/hero_1.png"})`,
                }}
              >
                <h3
                  className="vertical"
                  style={{ backgroundImage: `url(${"images/divider.png"})` }}
                >
                  Wellness
                </h3>
              </div>
              <div
                className="one-forth d-flex js-fullheight align-items-center ftco-animate"
                data-scrollax=" properties: { 'translateY': '70%' }"
              >
                <div className="text">
                  <span className="subheading">Welcome</span>
                  <h1 className="mb-4 mt-3">
                    Unlock Your <span>Potential</span>, <br /> Achieve Your{" "}
                    <span>Goals</span>
                  </h1>
                  <p>
                    Embark on a path to vitality and self-enhancement, where
                    your potential knows boundless horizons. Your journey to a
                    healthier, more vibrant you begins here.
                  </p>
                  <p>
                    <button href="#" className="btn btn-primary px-5 py-3 mt-3">
                      Get started now
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item js-fullheight">
          <div className="container-fluid p-0">
            <div
              className="row d-flex slider-text js-fullheight align-items-center justify-content-end"
              data-scrollax-parent="true"
            >
              <div
                className="one-third order-md-last img js-fullheight"
                style={{
                  backgroundImage: `url(${"https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"})`,
                }}
              >
                <h3
                  className="vertical"
                  style={{ backgroundImage: `url(${"images/divider.png"})` }}
                >
                  Health
                </h3>
              </div>
              <div
                className="one-forth d-flex js-fullheight align-items-center ftco-animate"
                data-scrollax=" properties: { 'translateY': '70%' }"
              >
                <div className="text">
                  <span className="subheading">Welcome</span>
                  <h1 className="mb-4 mt-3">
                    <span>Fuel</span> Your Body, <br /> <span>Nourish</span>{" "}
                    Your Soul
                  </h1>
                  <p>
                    Elevate your health with us, a comprehensive guide to
                    holistic well-being. Discover the path to a vibrant life,
                    making informed choices for your body and nurturing your
                    inner balance.
                  </p>
                  <p>
                    <button href="#" className="btn btn-primary px-5 py-3 mt-3">
                      Get started now
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
