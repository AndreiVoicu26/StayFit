import React from "react";

function ProcedureSection() {
  return (
    <div id="procedure">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center mb-5 heading">
            <span className="subheading">Our Procedure</span>
            <h2 className="mb-4">How it works?</h2>
          </div>
        </div>
        <div className="row">
          <div class="col-lg-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"images/procedure_1.png"})`,
                }}
              >
                <div class="num">
                  <span>1</span>
                </div>
              </div>
              <div class="text">
                <h2>Trusted Services</h2>
                <p class="mb-4">
                  Reliable and proven methods to enhance your well-being.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"images/procedure_2.png"})`,
                }}
              >
                <div class="num">
                  <span>2</span>
                </div>
              </div>
              <div class="text">
                <h2>Natural Ways</h2>
                <p class="mb-4">
                  Integrating organic approaches for a healthier lifestyle.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"images/procedure_3.png"})`,
                }}
              >
                <div class="num">
                  <span>3</span>
                </div>
              </div>
              <div class="text">
                <h2>Training Routine</h2>
                <p class="mb-4">
                  Customized exercise plans for all fitness levels.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"images/procedure_4.png"})`,
                }}
              >
                <div class="num">
                  <span>4</span>
                </div>
              </div>
              <div class="text">
                <h2>Satisfaction</h2>
                <p class="mb-4">
                  Achieving your health goals with fulfilling results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcedureSection;
