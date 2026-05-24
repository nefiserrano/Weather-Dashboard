# Weather Dashboard

This project is a responsive web application that allows users to search for real-time weather information anywhere in the world. By connecting to a live weather database (OpenWeatherMap API), the app dynamically updates its text, weather icons, and full-screen background images to match the exact climate of the searched city, wrapped in smooth animations.

## Instructions for Build and Use

Steps to build and/or run the software:

1. Clone or download this repository to your local computer.
2. Open your terminal, navigate into the project root directory, and run `npm install` to download the required packages.
3. Create a .env file in the main folder and add your API key like this: `VITE_WEATHER_API_KEY=your_actual_api_key_here`.
4. Run `npm run dev` in your terminal to start the local development server.
5. Click the local server link (usually http://localhost:5173) provided in the terminal to view the app in your browser.

Instructions for using the software:

1. Locate the search box in the center of the screen.
2. Type in the name of any global city (e.g., "London", "Tokyo", or "Cairo") and click the "Search" button or press Enter.
3. Watch the interface dynamically slide into view with the city's current temperature, humidity, wind speed, and a matching background theme.
4. Try searching for an empty or invalid city name to see the error checking and troubleshooting messages in action.

## Development Environment

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* **Node.js:** v18.x or higher (Runtime environment)
* **Vite:** v5.x or higher (Frontend build tool and dev server)
* **React:** v18.x or higher (Frontend UI library)
* **Framer Motion:** v11.x or higher (Animation library used for UI transitions)
* **OpenWeatherMap Current Weather Data API:** v2.5 or higher (External REST API service for retrieving global weather data)

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [React Documentation](https://react.dev/learn)
* [React Tutorial—TutorialsPoint](https://www.tutorialspoint.com/reactjs/index.htm)
* [OpenWeatherMap API Documentation](https://openweathermap.org/api/one-call-3?collection=one_call_api_3.0)
* [Framer Motion Animation Guide](https://www.framer.com/motion/)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* Add a "Use My Location" button that automatically geolocates the user's current city.
* Implement a 5-day weather forecast layout below the main current weather card.
* Create a toggle switch to let users swap easily between Fahrenheit and Celsius.