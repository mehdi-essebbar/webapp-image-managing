# Django and ReactJs
This web application implements a frontend with React JS and a backend with Django Rest Framework. It has few simple features to managing images in a database. 

## Backend: Django Rest Framework/ PostgreSQL

Technologies:
- django 2.2
- python 3.6
- etc (check backend/requirements.txt for more details)

How it works:

- Install python version 3.6, together with [pip](https://pip.pypa.io/en/stable/installing/) and [virtualenv](https://virtualenv.pypa.io/en/stable/installation/).
- Clone the repository from my [github](https://github.com/Mehdi6/webapp-image-managing), and place it in a new folder.
- Install a virtualenv:
    run the command line, place yourself inside the project's folder (/backend), then create your new virtualenv.
    Install the requirements by running the following command line: `pip install -r requirements.txt`

- Run the server
(1) First run the command : `python manage.py migrate`
(2) Then: `python manage.py runserver`
(3) The server is now running on http://localhost:8000/
(4) Make sure that PostgreSQL database is installed in your system and runing.

## Frontend: React and Redux

Technologies:

- ReactJS
- Redux
- Axios
- Bootstrap

How it works ?
- Install nodeJs
- Place yourself in the frontend folder, then install node packages by running the command line: `npm install`
- Run the client server (frontend) by running the command line: `npm run start`

## What do I need to know to test the web application?

Another way to run the whole web application (backend and frontend) is to use docker and docker-compose. Simply place yourself in the root directory of the application and run the command line: `docker-compose up`.

Make sure that docker and docker-compose are installed in your system.

## What does the application do ?

The application is splited into to apps, the frontend and backend. The backend which is an Rest API that implements four endpoints: a) uploading an image. b) listing images stored in the database. c) verifying or rejecting an image (updating the image state). 

The frontend is a ReactJs web application that consumes endpoints from the backend using axios. It has three pages: a) home, a page with basic information. b) a page for uploading images from the system. c) a page for listing images. d) a page for viewing each image and editing their state.

For more details about the features implemented, refer to this [document](https://drive.google.com/open?id=1Ll5QZ7A4JKl45SXDuypeD1EoMPa1mDJYqg7_uJ3MNI8).
## Issue Reporting

If you have found a bug or feature request, please report them at the repository issues section.

## License

MIT

