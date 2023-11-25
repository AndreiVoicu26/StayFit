import React, { useState } from "react";
import Navbar from "./Navbar";

function Coaches() {
  const [coach, setCoach] = useState(null);

  const coachesData = [
    {
      id: 1,
      name: "Michael Hall",
      role: "Owner & Head Coach",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl:
        "https://www.personaltrainercentral.com/images/fit_happy_fitness_trainer.jpg",
    },
    {
      id: 2,
      name: "Omar Davies",
      role: "Expert Trainer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl:
        "https://media.licdn.com/dms/image/C5603AQHtdN2eLpF6yg/profile-displayphoto-shrink_800_800/0/1663502946313?e=2147483647&v=beta&t=qlibuPJP6tTNYq_9w6uxiAdWdXWnbMOUTzyfsl3LUbE",
    },
    {
      id: 3,
      name: "Amelia Jackson",
      role: "Expert Nutritionist",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl:
        "https://images.unsplash.com/photo-1585358682246-23acb1561f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0cml0aW9uaXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="coaching">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Coaches</h1>
              </div>
            </div>
          </div>
        </div>
        {coach ? (
          <div className="container px-4 sections">
            <div className="row ms-md-5">
              <div className="col-xl-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="mb-0">Your coach is {coach.name}</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="mb-0 top d-flex">
                      Press <i class="fa fa-minus mx-2"></i> to cancel the
                      partnership.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ms-md-5">
              <div className="col-xl-12 mt-3 mb-3">
                <div className="card">
                  <header>
                    <div class="img profile">
                      <img src={coach.imageUrl}></img>
                    </div>
                  </header>
                  <h3 className="name">{coach.name}</h3>
                  <h5 className="role">{coach.role}</h5>
                  <div class="description">
                    <p>{coach.description}</p>
                  </div>
                  <div class="text-center choose">
                    <a href="#" onClick={() => setCoach(null)}>
                      <i class="fa fa-minus"></i>
                    </a>
                  </div>
                  <footer className="mt-4">
                    <a href="">
                      <i class="fa fa-whatsapp"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-linkedin"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-instagram"></i>
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container px-4 sections">
            <div className="row ms-md-5">
              <div class="col-xl-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="mb-0">You haven't chosen any coach yet.</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="top d-flex">
                      Press <i class="fa fa-plus mx-2"></i> to choose your
                      coach.
                    </h5>
                    <h5 className="mb-0">
                      You can cancel your partnership with your coach anytime.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-stretch ms-md-5">
              {coachesData.map((coach) => (
                <div className="col-xl-4 mt-3 mb-3" key={coach.id}>
                  <div className="card">
                    <header>
                      <div className="img profile">
                        <img src={coach.imageUrl} alt={coach.name} />
                      </div>
                    </header>
                    <h3 className="name">{coach.name}</h3>
                    <h5 className="role">{coach.role}</h5>
                    <div className="description">
                      <p>{coach.description}</p>
                    </div>
                    <div className="text-center choose">
                      <a href="#" onClick={() => setCoach(coach)}>
                        <i className="fa fa-plus"></i>
                      </a>
                    </div>
                    <footer className="mt-4">
                      <a href="">
                        <i class="fa fa-whatsapp"></i>
                      </a>
                      <a href="">
                        <i class="fa fa-facebook"></i>
                      </a>
                      <a href="">
                        <i class="fa fa-linkedin"></i>
                      </a>
                      <a href="">
                        <i class="fa fa-instagram"></i>
                      </a>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coaches;
