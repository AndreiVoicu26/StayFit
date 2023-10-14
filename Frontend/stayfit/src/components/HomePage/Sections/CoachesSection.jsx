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
        <div className="col-md-6 col-lg-3">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"https://www.personaltrainercentral.com/images/fit_happy_fitness_trainer.jpg"})`,
                }}
              ></div>
            </div>
            <div className="text d-flex align-items-center pt-3 text-center">
              <div>
                <h3 className="mb-2">Michael Hall</h3>
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
        <div className="col-md-6 col-lg-3">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"https://media.licdn.com/dms/image/C5603AQHtdN2eLpF6yg/profile-displayphoto-shrink_800_800/0/1663502946313?e=2147483647&v=beta&t=qlibuPJP6tTNYq_9w6uxiAdWdXWnbMOUTzyfsl3LUbE"})`,
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
        <div className="col-md-6 col-lg-3">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png"})`,
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
        <div className="col-md-6 col-lg-3">
          <div className="staff">
            <div className="img-wrap d-flex align-items-stretch">
              <div
                className="img align-self-stretch"
                style={{
                  backgroundImage: `url(${"https://images.unsplash.com/photo-1585358682246-23acb1561f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0cml0aW9uaXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"})`,
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
