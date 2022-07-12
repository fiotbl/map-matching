# Map Matching Website :world_map:

Website for users to input json GPS data to map match the GPS data points. Routes before and after the map matching algorithm is done will be shown visually on the map.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![alt text](https://miro.medium.com/max/1400/1*5UCbEwih6uqYxBrKns-VuA.png)

## Overview

### Objectives of the website :round_pushpin:

1. Input GPS data from user (json file)
2. Visual output of the Map Matching

### Internally :gear:

1. Reads in GPS data
2. Convert from raw GPS data to visual output using Polyline on the website
3. Runs map matching algorithm - user able to choose between different map matching algorithms
4. Outputs the mapped locations
5. Convert from raw output to visual output using Polyline on the website

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
