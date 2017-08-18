# vRoom

vRoom is a website version of a Chromecast.
Users select a name, then join or create a room.
Once inside, they can search for and queue up youtube videos, which are added and play for everyone in the room.

### Technologies

The website is built using an Angular 2 front end, with an Express.js server. 
It uses socket.io to manage the connections between users and rooms, with the Youtube Data API and Youtube Player IFrame  API to search for and play the videos.

### How to run

Run ```npm install```, then ```npm start```.

Connect to ```localhost:3000``` to start queueing videos.