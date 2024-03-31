import React from "react";

function TestimonialSection() {
  return (
    <div id="testimonies">
      <div className="overlay"></div>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center mb-5 heading">
            <span className="subheading">Testimonies</span>
            <h2 className="mb-4">What clients say?</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="testimonies-slider owl-carousel">
              <div class="item">
                <div class="testimony-wrap d-lg-flex align-items-center">
                  <div className="col-12 col-lg-6 d-flex justify-content-center">
                    <div
                      class="img"
                      style={{
                        backgroundImage: `url(${"images/customer_1.png"})`,
                      }}
                    ></div>
                  </div>
                  <div class="text">
                    <h2 class="mb-4 name">Jeffrey Blum</h2>
                    <h4 class="mb-4">
                      Since joining, I've not only lost weight but gained
                      confidence. The personalized workouts and supportive
                      community have been life-changing!
                    </h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap d-lg-flex align-items-center">
                  <div className="col-12 col-lg-6 d-flex justify-content-center">
                    <div
                      class="img"
                      style={{
                        backgroundImage: `url(${"images/customer_2.png"})`,
                      }}
                    ></div>
                  </div>
                  <div class="text">
                    <h2 class="mb-4 name">Sarah McAllister</h2>
                    <h4 class="mb-4">
                      The nutritional guidance provided was a game-changer for
                      me. It’s amazing how the right food can fuel not just your
                      body but also your spirit.
                    </h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap d-lg-flex align-items-center">
                  <div className="col-12 col-lg-6 d-flex justify-content-center">
                    <div
                      class="img"
                      style={{
                        backgroundImage: `url(${"images/customer_3.png"})`,
                      }}
                    ></div>
                  </div>
                  <div class="text">
                    <h2 class="mb-4 name">Nicholas Smith</h2>
                    <h4 class="mb-4">
                      As a busy professional, I struggled with consistency. The
                      app’s flexibility allowed me to maintain my fitness
                      routine, and I’ve never felt better!
                    </h4>
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

export default TestimonialSection;
