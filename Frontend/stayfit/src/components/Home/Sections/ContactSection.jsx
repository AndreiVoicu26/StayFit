import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../../config";

function ContactSection() {
  const [content, setContent] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/send-email`,
        content,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Email sent successfully!");
        console.log("Email sent successfully!");
      }
    } catch (error) {
      console.log("Error sending email: ", error);
    }
  };

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
            <form class="p-4 p-md-5" onSubmit={(e) => handleSendEmail(e)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={content.name}
                  onChange={(e) =>
                    setContent({ ...content, name: e.target.value })
                  }
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your Email"
                  value={content.email}
                  onChange={(e) =>
                    setContent({ ...content, email: e.target.value })
                  }
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Subject"
                  value={content.subject}
                  onChange={(e) =>
                    setContent({ ...content, subject: e.target.value })
                  }
                />
              </div>
              <div class="mb-3">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  class="form-control"
                  placeholder="Message"
                  value={content.message}
                  onChange={(e) =>
                    setContent({ ...content, message: e.target.value })
                  }
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
          <div class="col-md-5 d-flex mt-md-5">
            <div class="row d-flex mb-5">
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Address</h3>
                    <p>Union Square 45, Timisoara RO</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Contact</h3>
                    <p>+4075 248 517</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="box p-2 px-3 d-flex">
                  <div class="icon">
                    <i class="fa-solid fa-paper-plane"></i>
                  </div>
                  <div>
                    <h3 class="mb-3">Email</h3>
                    <p>
                      <a href="mailto:andreivoicu80@gmail.com">
                        andreivoicu@stayfit.com
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
                      <a href="">www.stayfit.com</a>
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
