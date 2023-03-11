// Write your JavaScript code here!
window.addEventListener("load", function() {
    let form = document.querySelector("form");
    const list = document.getElementById("faultyItems"); 
    const pilot = form.querySelector("input[name=pilotName]");
    const copilot = form.querySelector("input[name=copilotName]");
    const fuelLevel = form.querySelector("input[name=fuelLevel]");
    const cargoMass = form.querySelector("input[name=cargoMass]");

    formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse;
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    })
   
});