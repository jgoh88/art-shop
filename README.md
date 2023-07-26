# ArtShop
## Introduction/Overview
This project was inspired by e-commerce/marketplace related web applications. It is a marketplace platform for connectingartists with art enthusiasts and collectors, and for artists to promote and sell their artworks. Artists (sellers) can list their artworks, and users can buy those artworks by adding them to cart and then checkout. This application was built as part of my GA 4-day group project.

Features of the game:
* Register account and login
* List and manage artworks
* Listing and search for artworks
* Add artworks to cart and checkout

![alt text](./assets/screenshots/art-shop.png "ArtShop feature screenshots")

## Collaborators
* [Mohamad Hazem](https://github.com/MohamadHazem)
* Jarrod Goh

## Getting Started
### Prerequisite
Make sure that you have Node.js installed together with a package manager like npm or yarn.
Apart from that you'll also need to have a mongoDB account and cluster, and also a cloudinary account. You can register for free on [mongodb.com](https://www.mongodb.com/) and [cloudinary.com](https://cloudinary.com/)

### Installation
```bash
# Clone repository
$ git clone https://github.com/jgoh88/art-shop.git
```
Backend
```bash
# Install dependencies
$ cd art-shop/backend
$ npm install   # or yarn install

# Remove built react app
$ rm -r build

# Setup environment variables
# Create a .env file with the required variables. Refer to .env_sample in backend folder

# Run application
$ node index    # or nodemon index if you have nodemon installed. This will start the backend
```
Frontend  
Note: You'll need to create a cloudinary upload preset for this, refer [cloudinary documentation](https://cloudinary.com/documentation/react_image_and_video_upload) for more information. 
```bash
# Install dependencies
$ cd ../art-shop
$ npm install   # or yarn install

# Setup environment variables
# Create a .env file with the required variables. Refer to .env_sample in art-shop folder

# Run application
$ npm start    # This will start the application
```

## Demo
For demo of the application, you can refer [here](https://art-shop-fvdd.onrender.com). 
