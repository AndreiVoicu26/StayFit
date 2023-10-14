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
          <div class="col-md-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"https://images.unsplash.com/photo-1585358682246-23acb1561f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0cml0aW9uaXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"})`,
                }}
              >
                <div class="num">
                  <span>1</span>
                </div>
              </div>
              <div class="text">
                <h2>Trusted Services</h2>
                <p class="mb-4">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG51dHJpdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"})`,
                }}
              >
                <div class="num">
                  <span>2</span>
                </div>
              </div>
              <div class="text">
                <h2>Natural Ways</h2>
                <p class="mb-4">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"https://images.unsplash.com/photo-1480179087180-d9f0ec044897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"})`,
                }}
              >
                <div class="num">
                  <span>3</span>
                </div>
              </div>
              <div class="text">
                <h2>Training Routine</h2>
                <p class="mb-4">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3 text-center d-flex align-items-stretch">
            <div class="step">
              <div
                class="img"
                style={{
                  backgroundImage: `url(${"https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zml0bmVzcyUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"})`,
                }}
              >
                <div class="num">
                  <span>4</span>
                </div>
              </div>
              <div class="text">
                <h2>Satisfaction</h2>
                <p class="mb-4">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia.
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
