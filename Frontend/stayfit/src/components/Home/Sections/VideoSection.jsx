import React, { useEffect } from "react";
import { useAuth } from "../../Auth/AuthProvider";

function VideoSection() {
  const { authenticated, role, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div
      className="img"
      id="video"
      style={{
        backgroundImage: `url(${"images/video_background.png"})`,
      }}
    >
      <div className="overlay"></div>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-12 text-center d-flex align-items-center justify-contente-center vid-height">
            <div class="video-wrap">
              <a
                href="https://www.youtube.com/watch?v=rI-16Jcp3tM&ab_channel=GNCLiveWell"
                class="video-icon d-flex align-items-center justify-content-center mb-4"
              >
                <span class="ion-ios-play"></span>
              </a>
              <span class="subheading">
                Finding Balance In Food, Health And Wellness
              </span>
              <h3>Start Your Body Changing With A Healthy Style</h3>
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
  );
}

export default VideoSection;
