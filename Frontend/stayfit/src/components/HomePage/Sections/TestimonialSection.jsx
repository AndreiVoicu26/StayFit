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
                <div class="testimony-wrap d-md-flex align-items-center">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"https://images.unsplash.com/photo-1578924608828-79a71150f711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2 class="mb-4 name">Jeffrey Blum</h2>
                    <h4 class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics.
                    </h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap d-md-flex align-items-center">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjcxfHx0cmFpbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2 class="mb-4 name">Sarah McAllister</h2>
                    <h4 class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics.
                    </h4>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap d-md-flex align-items-center">
                  <div
                    class="img"
                    style={{
                      backgroundImage: `url(${"https://images.unsplash.com/photo-1579758682665-53a1a614eea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"})`,
                    }}
                  ></div>
                  <div class="text">
                    <h2 class="mb-4 name">Nicholas Wilson</h2>
                    <h4 class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics.
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
