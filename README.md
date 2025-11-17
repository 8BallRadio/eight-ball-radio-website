## 8-Ball Radio

[8-Ball Radio](https://8ballradio.nyc) is an online, open-access radio station based in New York City as a part of 8-Ball Community. The website is where listeners can tune in, browse recent shows, find new favorites, and learn more about the 8-Ball Community and it's other platforms.

The website is built using Vue.js and hosted on Netlify. It pulls information from the Mixcloud and Airtime.Pro APIs and fetchs additional information from our own Netlify server which hosts our MongoDB database.

The main goal of this project was to develop a web application that could serve as a new home for 8-Ball Radio. Our biggest priority was to keep costs low since 8-Ball Community is a non-profit, thus every technology that we use is free other than Airtime.Pro, which is our main broadcasting software.

This project is near complete.

Left to be done:
- Add social media links for each show
- User access to easily modify MongoDB entries
- Progressive Web App

## Contributing
To contribute to this project, join the #radio-website channel in Slack and send a message requesting to join the 8BallRadio organization on Github

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
