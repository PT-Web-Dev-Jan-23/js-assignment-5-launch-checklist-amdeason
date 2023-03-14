const { getElementError } = require('@testing-library/dom');

// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                    <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: </li>
                        <li>Diameter: </li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: </li>
                        <li>Number of Moons: </li>
                    </ol>
                    <img src="">
    */
    const specName = [ "Name: ", "Diameter: ", "Star: ", "Distance from Earth: ", "Number of Moons: "]
    const spec = [ name, diameter, star, distance, moons ];
    const missionTarget = document.getElementById("missionTarget");
    const title = document.createElement("h2");
    const list = document.createElement("ol"); 
    const img = document.createElement("IMG");

    title.innerHTML = "Mission Destination";
    missionTarget.appendChild(title);

    missionTarget.appendChild(list);
    for (const index in spec) {
        let li = document.createElement("li");
        li.innerHTML = `${specName[index]}${spec[index]}`;
        list.appendChild(li);
    }

    img.src = `${imageUrl}`;
    missionTarget.appendChild(img);
}

function validateInput(testInput) {
    if (!testInput) {
        return "Empty";
    }
    else if (isNaN(testInput)) {
        return "Not a Number";
    }
    else {
        return "Is a Number";
    }
}
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        input = [ pilot.value, copilot.value, fuelLevel.value, cargoMass.value ];
        let errMsg = "";

        const isNotEmpty = (input) => {
            let isValid = validateInput(input) !== "Empty";
            if (!isValid) 
                errMsg = "All fields are required!";
            return isValid;
        }

        const isCorrectType = (input, index) => {
            let isValid = (index < 2 && validateInput(input) === "Not a Number") || (index >= 2 && validateInput(input) === "Is a Number");
            if (!isValid)
                errMsg = "Make sure to enter valid information for each field!";
            return isValid;
        }

        let formIsValid = input.every( (element, index)  => { 
            return isNotEmpty(element) && isCorrectType(element, index); 
        });
        
        if (!formIsValid) {
            alert(errMsg);
        }
        else {
            const launchStatus = document.getElementById("launchStatus");
            const pilotStatus = document.getElementById("pilotStatus"); 
            const copilotStatus = document.getElementById("copilotStatus");
            const fuelStatus = document.getElementById("fuelStatus");
            const cargoStatus = document.getElementById("cargoStatus");

            pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;
            
            const validFuelLevel = (level) => {
                if (fuelLevel.value < 10000) {
                    fuelStatus.innerHTML = "Fuel level too low for launch";
                    return false;
                } 
                return true;
            }

            const validCargoMass = (mass) => {
                if (cargoMass.value > 10000) {
                    cargoStatus.innerHTML = "Cargo mass too heavy for launch"; 
                    return false;
                } 
                return true;
            }

            list.style.visibility = "visible";

            if ( !validFuelLevel(fuelLevel.value) || !validCargoMass(cargoMass.value)) {
                launchStatus.innerHTML = "Shuttle not ready for launch";
                launchStatus.style.color = "red";
            }

            else {
                launchStatus.innerHTML = "Shuttle is ready for launch";
                launchStatus.style.color = "green";
            }
        }
    });
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
