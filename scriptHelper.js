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
        input = [ pilot.value, copilot.value, fuelLevel.value, cargoMass.value ];
        let errMsg = "";

        const isNotEmpty = (input) => {
            let isValid = validateInput(input) !== "Empty";
            if (!isValid) 
                errMsg = "All fields are required.";
            return isValid;
        }

        const isCorrectType = (input, index) => {
            let isValid = (index < 2 && validateInput(input) === "Not a Number") || (index >= 2 && validateInput(input) === "Is a Number");
            if (!isValid)
                errMsg = "Make sure to enter valid information for each field.";
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
            copilotStatus.innerHTML = `Copilot ${copilot.value} is ready for launch`;
            
            const validFuelLevel = (level) => {
                if (fuelLevel.value < 10000) {
                    fuelStatus.innerHTML = "Fuel level too low for launch";
                    return false;
                } 
            }

            const validCargoMass = (mass) => {
                if (cargoMass.value > 10000) {
                    cargoStatus.innerHTML = "Cargo mass too high for launch"; 
                    return false;
                } 
            }

            if ( !validFuelLevel(fuelLevel.value) || !validCargoMass(cargoMass.value) ) {
                list.style.visibility = "visible";
                launchStatus.style.color = "red";
            }
        }
        event.preventDefault();
    });
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
