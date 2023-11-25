import React from "react";

function Footer() {
  return (
    <div id="footer">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md">
            <div className="logo mb-4">
              <a href="#hero">
                <h2 class="ftco-heading-2">
                  #stay
                  <span>fit</span>
                </h2>
              </a>
              <img className="img-fluid" src="images/logo_1.png" alt="logo" />
              <ul class="social-list float-md-left mt-4">
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
          <div className="col-md">
            <div class="links mb-4">
              <ul class="list-unstyled px-4">
                <li>
                  <a href="#hero">
                    <i class="fa-solid fa-arrow-right"></i> Home
                  </a>
                </li>
                <li>
                  <a href="#about">
                    <i class="fa-solid fa-arrow-right"></i> About
                  </a>
                </li>
                <li>
                  <a href="#services-extended">
                    <i class="fa-solid fa-arrow-right"></i> Services
                  </a>
                </li>
                <li>
                  <a href="#procedure">
                    <i class="fa-solid fa-arrow-right"></i> Procedure
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div class="links mb-4">
              <ul class="list-unstyled px-4">
                <li>
                  <a href="#coaches">
                    <i class="fa-solid fa-arrow-right"></i> Coaches
                  </a>
                </li>
                <li>
                  <a href="#testimonies">
                    <i class="fa-solid fa-arrow-right"></i> Testimonies
                  </a>
                </li>
                <li>
                  <a href="#pricing">
                    <i class="fa-solid fa-arrow-right"></i> Membership
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <i class="fa-solid fa-arrow-right"></i> Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div class="contact-info mb-4 px-4">
              <h2>Have a question?</h2>
              <div class="mb-4">
                <ul className="list-unstyled">
                  <li>
                    <i class="fa-solid fa-map"></i>
                    <span>
                      4th Avenue Street, <br></br>Suite 4562 New York NY
                    </span>
                  </li>
                  <li>
                    <i class="fa-solid fa-phone"></i>
                    <span>+4072 959 543</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-envelope"></i>
                    <span>andreivoicu80@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid py-3 copyright">
        <div class="row">
          <div class="col-md-12 text-center">
            <p>Copyright ©2023 All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
