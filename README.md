# StayFit

StayFit is a web application for fitness & nutrition.

## Build with

<p>
<span>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</span> 
<span>
  <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" />
</span> 
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
</span>
  <span>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
</span>
</p>

## Getting started

### Requirements
You need to:
* Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and open it to start the Docker Engine.
* Install [Git](https://www.git-scm.com/downloads) to clone the project (**optional**).
  
### Installation
You have two options here:
#### 1) Getting the project from GitHub and building the Docker images from Dockerfiles

* Download the project using `Download ZIP` option and extract it into a new folder.
<br/>**or**<br/>
* Clone the project into a new folder using Git:
```bash
git clone https://github.com/AndreiVoicu26/StayFit.git
```
* Open the project in a terminal and navigate at the level of the `docker-compose.yml` file.

#### 2) Getting the Docker images from a private registry

* Create a new folder and inside the folder create a new YAML file named `docker-compose.yml`, with the following content:
```
version: "3.8"

services:
  db:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=andrei
      - POSTGRES_PASSWORD=andrei26
      - POSTGRES_DB=stayfitDB
    volumes:
      - db-data:/var/lib/postgresql/data

  spring-boot-app:
    image: andreivoicu26/stayfit:spring-boot-app
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/stayfitDB
      - SPRING_DATASOURCE_USERNAME=andrei
      - SPRING_DATASOURCE_PASSWORD=andrei26

  react-app:
    image: andreivoicu26/stayfit:react-app
    ports:
        - "3000:80"

volumes:
    db-data:
```
* Open a terminal and navigate at the level of the `docker-compose.yml` file.
* Login into the private Docker registry:
```bash
docker login  -u andreivoicu26
```
* At the password prompt, enter the personal access token:
```bash
dckr_pat_dIks4V_JZwMUD_qDEAEEUEtAEbE
```

### Usage

* Build / Pull the Docker images, create and start the containers based on the `docker-compose.yml` file using Docker Compose:
```bash
docker-compose up --build -d
```
* Check if the containers are running in the Docker Desktop app.
* Open a browser and access the StayFit app at `http://localhost:3000`
* Enjoy!

