import React from "react";

function ContactSection() {
  return (
    <div id="contact">
      <div className="overlay"></div>
      <div class="container">
        <div className="row justify-content-center">
          <div class="col-md-7 heading text-center">
            <span class="subheading">Contact</span>
            <h2 class="mb-4">Get in touch</h2>
          </div>
        </div>
        <div className="row">
          <div class="col-md-7 order-md-last d-flex">
            <form action="#" class="p-4 p-md-5">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your Email"
                />
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" placeholder="Subject" />
              </div>
              <div class="mb-3">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  class="form-control"
                  placeholder="Message"
                ></textarea>
              </div>
              <div class="mb-3">
                <input
                  type="submit"
                  value="Send Message"
                  class="btn btn-primary py-3 px-5"
                />
              </div>
            </form>
          </div>
          <div class="col-md-5 d-flex mt-5">
            <div class="row d-flex mb-5">
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Address</h3>
                    <p>4th Avenue Street, Suite 4562 New York NY</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Contact Number</h3>
                    <p>+4072 959 543</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-paper-plane"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Email Address</h3>
                    <p>
                      <a href="mailto:andreivoicu@gmail.com">
                        andreivoicu80@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-globe"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Website</h3>
                    <p>
                      <a href="#">www.stayfit.com</a>
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

export default ContactSection;
