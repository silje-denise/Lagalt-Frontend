# Lagalt-Frontend
## Frontend repo to the Lagalt page
* The backend solution can be found [here](https://github.com/joakimhansen/Lagalt/)
* The API documentation can be found [here](https://lagalt-docker.azurewebsites.net/swagger/index.html)
* Go check out the frontend solution on [Vercel](https://lagalt-frontend-plum.vercel.app/)

# Welcome to Lagalt - Your Gateway to Creative Collaboration!
The Lagalt application is a platform where people can come together to collaborate on different kinds of projects. From music production to game development, everyone is welcome here!
We want to give you the ability to let the creativity flow, and connect with people through your favorite hobby: to make everything. Or as we Norwegians say; Lagalt!

## Collaborators:
* [Silje Denise (@silje-denise)](https://github.com/silje-denise)
* [Silje Slettebakk (@siljeesl)](https://github.com/siljeesl)
* [Joakim Hansen (@joakimhansen)](https://github.com/joakimhansen)
* [Magnus Uttisrud (@mUttisrud)](https://github.com/mUttisrud)

## We can't wait to see what you create, but first: some instructions!
### Environment Variables

In order to use this app as inteded, you are required to create environment variables. Please follow the steps below:

1. Navigate to the root of the project (using cd to change directory if you are doing this in the terminal)
2. Create a file called `.env`
3. Inside this file, add the following variable and set the value to the provided string instead of `yourApiUrl`:

``` 
  REACT_APP_API_URL=yourApiUrl
```
5. If you have a terminal running, stop it (using `ctrl + c`) and start it again by using `npm start`

## Development server
To start the application, run `npm install`, and then `npm start` for a dev server. Navigate to `http://localhost:3000`. The application will automatically reload if you change any of the source files.

## Deployment
The application is deployed to Vercel, check it out [here](https://lagalt-frontend-plum.vercel.app/). We deployed the application via Github, and added the .env file to Vercel. In addition to this, we had to set the keycloak config to point on both localhost and the vercel link in order to be able to log in to our application.

## Security
Our app uses OpenID connect/SSO for authentication. Our Keycloak service works on both localhost and on Vercel.

## Component tree
This is the architecture of our frontend solution. The pages are marked in blue, and the components are marked in purple.
![component tree](./Lagalt_Frontend_ComponentTree.png)
