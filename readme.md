# vRoom



vRoom is a website that allows users to connect to a room, then queue up youtube videos, essentially a website version of a Chromecast



### Technologies



The website is built using an Angular 2 front end, with an Express.js server. 
It uses socket.io to manage the connections between users and rooms, with the Youtube Data API and Youtube Player IFrame  API to search for and play the videos.



### How to run



Run ```npm install```, then ```npm start```.

Connect to ```localhost:3000``` to start queueing videos.