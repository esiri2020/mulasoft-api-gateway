<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Musala Api Gateway </h3>

  <p align="center">
    A fullstack front-end and backend application for adding and displaying multiple gateway terminals, validating ipaddresses for devices added to those gateways. also user can be able to add and delete multiple peripheral devices from gateways. 
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This sample project is managing gateways - master devices that control multiple peripheral devices. 
my task was to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. The information must be stored in the database. 
When storing the gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.
The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:
•	a unique serial number (string), 
•	human-readable name (string),
•	IPv4 address (to be validated),
•	multiple associated peripheral devices. 
Each peripheral device has:
•	a UID (number),
•	vendor (string),
•	date created,
•	status - online/offline.



<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This project was built using the following Libraries and frameworks

* [Next.js](https://nextjs.org/)
* [Mongodb](https://www.mongodb.com//)
* [Vercel](https://vercel.com/)
* [tailwind-css](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project is in development and not yet compiled to production/build state. 
The database was and was built with secured mongodb. 
This project contains raw js front and backend codes. 
All the codes are contained in the  musala_soft folder of the repository provided.  
to run and build this project apply following these steps after cloning the repository.

1. On your browser, navigate to https://github.com/esiri2020/mulasoft-api-gateway and clone
2. create a folder and run the command - git init and git remote add origin https://github.com/esiri2020/mulasoft-api-gateway.git
3. finally git pull origin main  

if the project was zipped and sent via mail all you need to do to run the project is in the prerequisites section below. 

### Prerequisites

Node.js => 14
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/esiri2020/mulasoft-api-gateway
   ```
2. Navigate to the repository directory
      ```sh
      cd musala_soft
      ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the application using
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Esiri Ekwale - esiri.ekwale@gmail.com && esiri2000@gmail.com

Project Link: [https://github.com/esiri2020/mulasoft-api-gateway](https://github.com/esiri2020/mulasoft-api-gateway)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

