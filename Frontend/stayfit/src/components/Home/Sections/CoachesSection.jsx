import React from "react";

function CoachesSection() {
  return (
    <div id="coaches">
      <div className="row justify-content-center pb-5">
        <div className="col-md-6 heading text-center">
          <span className="subheading">Our coaches</span>
          <h2 className="mb-4">Who are we?</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"images/coach_1.png"})`,
                }}
              ></div>
            </div>
            <div className="text d-flex align-items-center pt-3 text-center">
              <div>
                <h3 className="mb-2">Michael Wilson</h3>
                <span className="position mb-4">Owner & Head Coach</span>
                <div class="faded">
                  <ul class="ftco-social text-center">
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"images/coach_2.png"})`,
                }}
              ></div>
            </div>
            <div className="text d-flex align-items-center pt-3 text-center">
              <div>
                <h3 className="mb-2">Omar Davies</h3>
                <span className="position mb-4">Expert Coach</span>
                <div class="faded">
                  <ul class="ftco-social text-center">
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"images/coach_3.png"})`,
                }}
              ></div>
            </div>
            <div className="text d-flex align-items-center pt-3 text-center">
              <div>
                <h3 className="mb-2">Peter Henderson</h3>
                <span className="position mb-4">Trainer & Bodybuilder</span>
                <div class="faded">
                  <ul class="ftco-social text-center">
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"images/coach_4.png"})`,
                }}
              ></div>
            </div>
            <div className="text d-flex align-items-center pt-3 text-center">
              <div>
                <h3 className="mb-2">Amelia Jackson</h3>
                <span className="position mb-4">Nutritionist</span>
                <div class="faded">
                  <ul class="ftco-social text-center">
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachesSection;
