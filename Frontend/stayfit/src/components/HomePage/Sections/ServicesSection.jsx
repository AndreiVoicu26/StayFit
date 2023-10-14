import React from "react";

function ServicesSection() {
  return (
    <div id="services-extended">
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
                      backgroundImage: `url(${"https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxsb3NpbmclMjB3ZWlnaHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Individual coaching</h2>
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Workout plan</h2>
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Personalized food plan</h2>
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="service">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"images/background.jpg"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2>Weight Loss Program</h2>
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind.
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
