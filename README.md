# Drawings-Creator-and-Gallery
Users can LogIn or create an account, after getting to their dashboard the user can then create drawings on their profile which are then stored in MySQL database, the user can then go back in and update, delete, or download the drawings. 

## Table of Contents

* [Canvas](#Canvas)
* [Routers](#Routers)
* [Models](#Models)
* [Handlebars](#Handlebars)
* [Server](#Server)
* [Installation](#Installation)

## Canvas
Created a drawing canvas using scss and JavaScript to allow the user to draw on the canvas using either a paintbrush, a pen or a bucket. 

## Routers
Added the routes for the back end to connect to the server and render the appropriate pages using handlebars.js when called upon. 

## Models
Added the models for the User and for the Drawings, and also made the neessary associations for the models to appropriately refer to each other. 

## Handlebars
Created handlebars using Handlebars.js to render the pages (HTML) when being called upon in the routes. So that when the user clicks on a particular link (Login, dashboard etc.) the pages are then rendered as requested. 

## Server
We used Express and sequeleize in the back end and then hosted the site on Heroku. The site can be seen below. 

Link to deployed drawings creator and gallery: [Deployed site](https://drawings-creator-and-gallery.herokuapp.com/)

![image of home page with slideshow](/public/images/homepagewithslideshow.png)
![image of login page](/public/images/loginpage.png)
![image of dashboard](/public/images/dashboard.png)
![image of canvas](/public/images/canvas.png)
![image of drawing on dashboard](/public/images/drawingondashboardview.png)

## Installation

There is no need to install anything, to use the drawings creator and gallery simply follow the link below. 

See deployed site here: [Deployed Site](https://drawings-creator-and-gallery.herokuapp.com/)

To view our code see our GitHub below. 

See repository here: [GitHub Repo](https://github.com/JD-Jaramillo/Drawings-Creator-and-Gallery)
