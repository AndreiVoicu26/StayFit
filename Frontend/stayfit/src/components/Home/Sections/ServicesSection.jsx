import React from "react";

function ServicesSection() {
  return (
    <div id="services">
      <div className="overlay"></div>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center mb-5 heading">
            <span className="subheading">Our mission</span>
            <h2 className="mb-4">Services</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="services-slider owl-carousel">
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"images/services_1.png"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Individual Coaching</h2>
                    <p class="mb-4">
                      Empower your journey with guidance and encouragement for
                      lasting change.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"images/services_2.png"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Workout Schedules</h2>
                    <p class="mb-4">
                      Boost yourself with exercises designed to propel you
                      towards your peak performance.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"images/services_3.png"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Personalized Food Plan</h2>
                    <p class="mb-4">
                      Craft a vibrant lifestyle with tailored nutrition that
                      empowers and rejuvenates.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"images/services_4.png"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Weight Loss Program</h2>
                    <p class="mb-4">
                      Transform your body with a program that focuses on
                      sustainable weight loss.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
