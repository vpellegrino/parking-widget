# Parking Widget

The Parking widget is a **simple**, **light** and **framework-less** web-component, declared as a custom HTML element. It can be added to the DOM and initialized via two properties:
1.	_model_ is the JSON definition (e.g. `src/assets/model.json`), used to fill and render all widget dynamic areas.
2.	_onSelectionCallback_ is the function provided to the widget that will be called each time a parking slot selection takes place. That function is expecting one argument: the object related to the selected parking slot.

## Communication mechanism 
Can be represented as below:

![Parking-widget: Communication mechanism](https://i.imgur.com/hy5j4Zg.png)

## Component Responsiveness
The strategy that I followed to differentiate desktop and mobile devices (you can see in _parkingWidget.css_) was to create two different media queries to separate all the rules that belong to small devices from those of medium/large devices. 
The specialization followed the criteria that screen width under 600 px are small, while beyond 600 px are medium. Obviously, more sophisticated criteria can be applied, when necessary.

## Codebase organization
The widget has been included inside a very tiny web application, to demonstrate the integration between the parking widget and the host web application. 
Unfortunately, as you may know, web-components are not compatible with all browsers: for example, IE is not (what a surprise! 😊), but Chrome and Firefox work fine. I made the choice of avoiding to add a polyfill library to keep the code as simple and light as possible.
The web application is served by a static server (_lite-server_).

## Demo and Test-cases
To see the component in action, _Node_ and _NPM_ are necessary.
Open a terminal, pointing to parking-widget directory:

`$ npm install`     will install all the libraries required to run the server and execute the unit tests.

`$ npm start`       will boot lite-server and open a browser tab navigating to the web application

`$ npm test`        will execute the whole test suite, creating a report about the results.
