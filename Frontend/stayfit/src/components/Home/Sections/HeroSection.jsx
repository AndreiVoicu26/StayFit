import React, { useEffect } from "react";
import { useAuth } from "../../Auth/AuthProvider";

function HeroSection() {
  const { authenticated, role, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

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
                <h3 className="vertical">Fitness</h3>
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
                    Embark on a fitness journey where every workout is a step
                    toward surpassing your limits. Unleash a more vibrant,
                    energetic self, and discover the strength to conquer your
                    goals.
                  </p>
                  <p>
                    <button className="btn btn-primary px-5 py-3 mt-3">
                      <a
                        href={
                          authenticated
                            ? role === "CUSTOMER"
                              ? "/dashboard"
                              : role === "COACH"
                              ? "/clients"
                              : "/management"
                            : "/login"
                        }
                      >
                        Get started now
                      </a>
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
                  backgroundImage: `url(${"images/hero_2.png"})`,
                }}
              >
                <h3 className="vertical">Health</h3>
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
                    Discover the path to a healthier, more balanced lifestyle,
                    and embrace the vitality that comes with it. Elevate your
                    well-being and experience the benefits of a renewed body and
                    mind.
                  </p>
                  <p>
                    <button className="btn btn-primary px-5 py-3 mt-3">
                      <a
                        href={
                          authenticated
                            ? role === "CUSTOMER"
                              ? "/dashboard"
                              : role === "COACH"
                              ? "/clients"
                              : "/management"
                            : "/login"
                        }
                      >
                        Get started now
                      </a>
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
