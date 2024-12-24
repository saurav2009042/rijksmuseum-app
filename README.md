# Getting Started with Rijksmuseum Application

This project was created using [Create React App](https://github.com/facebook/create-react-app).

The application makes use of Open API provided by https://data.rijksmuseum.nl to load images as tiles onto our page.

The application does the following:
1. Loads 20 images on application start.
2. Loads 20 more images every time the user clicks on 'Load More' button.
3. If the user submits a search query, the images pertaining to the search query are returned.
4. On hovering over an image / tile, its title can be seen upto 3 lines.

## Setting Up Locally

1. Open terminal in VS Code and navigate to an empty folder.
2. Execute `git clone https://github.com/saurav2009042/rijksmuseum-app.git` for HTTPS or `git clone git@github.com:saurav2009042/rijksmuseum-app.git` for SSH.
3. Do an `npm install` to install dependencies.
4. Run `npm start`.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).