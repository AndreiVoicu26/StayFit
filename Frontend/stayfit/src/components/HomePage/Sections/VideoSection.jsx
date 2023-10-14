import React from "react";

function VideoSection() {
  return (
    <div
      className="img"
      id="video"
      style={{
        backgroundImage: `url(${"https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"})`,
      }}
    >
      <div className="overlay"></div>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center d-flex align-items-center justify-contente-center vid-height">
            <div class="video-wrap">
              <a
                href=""
                class="video-icon d-flex align-items-center justify-content-center mb-4"
              >
                <span class="ion-ios-play"></span>
              </a>
              <span class="subheading">
                Finding Balance In Food, Health And Wellness
              </span>
              <h3>Start Your Body Changing With A Healthy Style</h3>
              <p>
                <a href="#" class="btn btn-primary py-3 px-4">
                  Get Started Now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
