"use strict";
let cityStates = [
    {
        state: "California",
        stateAbbr: "CA",
        cities: ["Los Angeles", "San Francisco", "San Diego"]
    },
    {
        state: "Colorado",
        stateAbbr: "CO",
        cities: ["Aspen", "Boulder", "Denver", "Pagosa Springs"]
    },
    {
        state: "Texas",
        stateAbbr: "TX",
        cities: ["Austin", "Dallas", "Houston", "San Antonio"]
    }

];

window.onload = function () {
    loadStatesList();

    const statesList = document.getElementById("statesList");
    statesList.onchange = onStatesListChanged;

    // connect onchange event handler for the team dropdown (hook up a function to it)
    // find the team dropdown
    const citiesList = document.getElementById("citiesList");
    citiesList.onchange = onCitiesListChanged;

}


//first function


function loadStatesList() {
    const statesList = document.getElementById("statesList")

    // create <option value="">Select One...</option> as first option
    //let selectOneOption = new Option("Select One...", "");
    let selectOneOption = document.createElement("option");
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    statesList.appendChild(selectOneOption);

    for (let i = 0; i < cityStates.length; i++) {
        // create an option each time we go thru the loop
        // <option value="xxx">text</option>
        let theOption = document.createElement("option");
        theOption.textContent = cityStates[i].state;
        theOption.value = cityStates[i].stateAbbr;

        // add that option to the <select> element
        statesList.appendChild(theOption);
    }


    // Add a "Select State first..." <option>
    addSelectStateFirstOptionToCitiesList();

}



//second function


function onStatesListChanged() {
    // find the state and city lists
    const statesList = document.getElementById("statesList");
    const citiesList = document.getElementById("citiesList");
    // erase previous team message
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";
    // remove the previous cities from the citie dropdown because the state has changed
    citiesList.options.length = 0;
    // find the states list selection
    let selectedStateAbbr = statesList.value;
    // did they pick "Select one..." option"
    if (selectedStateAbbr == "") {

        // Add a "Select State first..." <option>
        addSelectStateFirstOptionToCitiesList();

        // if they don't pick a state, we can't load cities
        return;
    }

    // go use the selected stateAbbr to find the matching state from the array
    let matchingState = cityStates.find(arrayElement => arrayElement.stateAbbr == selectedStateAbbr);

    // Add a "Select one..." <option>
    let selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select one...";
    selectOneOption.value = "";
    citiesList.appendChild(selectOneOption);

    // loop thru the teams in the matching league and create <option> elements for each
    for (let i = 0; i < matchingState.cities.length; i++) {
        let theOption = document.createElement("option");
        theOption.textContent = matchingState.cities[i];
        citiesList.appendChild(theOption);
    }
}



//third function


function onCitiesListChanged() {
    // find the state and city lists
    const statesList = document.getElementById("statesList");
    const citiesList = document.getElementById("citiesList");

    // erase previous team message
    const messagePara = document.getElementById("messagePara");
    messagePara.innerHTML = "";

    //get selected citie
    let selectedCity = citiesList.value;

    // if "Select one..." is picked, just exit the function
    if (selectedCity == "") {
        return;
    }

    // get the selected league
    let selectedStateIndex = statesList.selectedIndex;
    let selectedState = statesList.options[selectedStateIndex].text;

    // build a message w/ team and league info and display in <p>
    let message = "City: " + selectedCity + "<br>" +
        "State: " + selectedState;
    messagePara.innerHTML = message;

}



//fourth function

function addSelectStateFirstOptionToCitiesList() {
    const citiesList = document.getElementById("citiesList");

    // Add a "Select league first..." <option>
    let selectOneOption = document.createElement("option"); // creates <option> element
    selectOneOption.textContent = "Select league first...";
    selectOneOption.value = "";
    citiesList.appendChild(selectOneOption);
}


