# Map-Matching Web Application :world_map:

![alt text](https://miro.medium.com/max/1400/1*5UCbEwih6uqYxBrKns-VuA.png)

## Built With
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## About The Project
### Objectives of the website

1. Allow users to upload their GPS data in the form of a JSON file
2. User is able to select between different map-matching algorithms to match their GPS data points
3. Visual output of both the user's raw GPS data and the map-matched route

### Internally 

1. Reads in GPS data
2. Convert from raw GPS data to visual output using Polyline on the website
3. Run map-matching algorithm - user able to choose between different map matching algorithms
4. Outputs the mapped locations
5. Convert from raw output to visual output using Polyline on the website

<!-- GETTING STARTED -->
## Getting Started
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/fiotbl/map-matching.git
   ```
2. Start the client
   ```sh
   npm start
   ```
3. Start the server
   ```sh
   node app.js
   ```
4. Enter your Google Maps API in `.env`
   ```js
   REACT_APP_GOOGLE_API_KEY='YOUR_API_KEY';
   ```

<!-- USAGE EXAMPLES -->
## Usage


  
## Map-Matching Algorithms Used
### 1. [Google Maps Snap to Road](https://developers.google.com/maps/documentation/roads/snap)

### 2. [OSRM Match Service API](http://project-osrm.org/docs/v5.5.1/api/?language=JavaScript#general-options)

<!-- ROADMAP -->
## Roadmap
### Phase 1:  
- [x] Develop a rough website (Front end only) 
- [x] Implement a main map matching algorithms on backend
- [x] Output user’s GPA data visually on the Google Map using Polyline
- [x] Integrate with Map Matching (backend)
- [x] Visual Outputs of the map-matched route on Map
- [x] Saving of data into the MongoDB

### Phase 2:  
- [x] Include a drop-down option of the different map matching algorithms
- [x] Implement a second map-matching algorithm - Scaling the Project

### Phase 3:  
- [ ] Automatic zooming into the map where geo points are located in
- [ ] Improve design of website




<!-- CONTRIBUTING -->
## Contributing

Any contributions to this project will be **greatly appreciated**!

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
