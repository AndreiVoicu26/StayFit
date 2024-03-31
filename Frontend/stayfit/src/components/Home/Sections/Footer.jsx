import React from "react";

function Footer() {
  return (
    <div id="footer">
      <div className="container">
        <div className="row mb-2">
          <div className="col-lg-3">
            <div className="logo mb-4 text-center">
              <a href="">
                <h2 class="ftco-heading-2">
                  #stay
                  <span>fit</span>
                </h2>
              </a>
              <img className="img-fluid" src="images/logo_1.png" alt="logo" />
              <ul class="social-list mt-2 p-0">
                <li className="me-2">
                  <a href="#">
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li className="me-2">
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
          <div className="col-lg-3 col-6">
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
                  <a href="#services">
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
          <div className="col-lg-3 col-6">
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
                    <i class="fa-solid fa-arrow-right"></i> Memberships
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
          <div className="col-lg-3">
            <div class="contact-info mb-4 px-3">
              <h3>Have a question?</h3>
              <div class="mb-4">
                <ul className="list-unstyled">
                  <li>
                    <i class="fa-solid fa-map"></i>
                    <span>Union Square 45, Timisoara RO</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-phone"></i>
                    <span>+4075 248 517</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-envelope"></i>
                    <span>andreivoicu@stayfit.com</span>
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
            <p>Copyright ©2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
