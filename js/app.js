/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/


/**
 * global document, console, event, performance, window
 * {eslint no-undef: "error"}
 *
 *
 * Start: Suggested Section
 *
 * 1. Scroll to Top Button:
*/
//TODO to test performance of whole
const startingTime1 = performance.now();


// TODO: Back to top button: getting the ID and store it in variable
const backTopBtn = document.getElementById('scroll-btn');

// TODO: shown the back top button when the user scroll down 90 from the top of the document
window.addEventListener ('scroll', () => { // Marker: Get help from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
    //setTimeout to delay the execution of the code
    setTimeout ( () => {
        backTopBtn.style.display = (document.documentElement.scrollTop > 90 ) ? 'block': 'none';
    }, 100 );

});

// TODO: add event listener to the button when clicked scroll smooth to top
backTopBtn.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
});


/**
 * 2 + 3: Combining Both Suggested: Hide Fixed Navigation & setTimeout: User Stopped Scrolling
 *
 * 2. Hide Fixed Navigation: |Marker: Get help from https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
 *
 * 3. setTimeout: User Stopped Scrolling: |Marker: Get help from https://stackoverflow.com/questions/3701311/event-when-user-stops-scrolling
 *
 * @description a fixed navigation bar that hides when the user is not scrolling( detected with the help of setTimeout ) and shows when the user
 * is scrolling. Also show the navigation bar when the user reaches the top of the page.
 * Using window.scrollY to get the current vertical position of the scroll bar , and use it to compare this value with the previous scroll position
 * to determine if the user is scrolling up or down. Also check if the scroll position is zero, which means the user is at the top of the page.
*/

// TODO: a variable to store the timer
let timer;
//TODO: get previous vertical position of the scroll bar , and store it in a variable
let previousPos = window.scrollY;

window.addEventListener('scroll', () => {
    // TODO: if the previous timer exists clearTimeout
    if(timer){
        clearTimeout(timer);
    }

    // TODO: get the current vertical position of the scroll bar , and store it
    let currentPos = window.scrollY;

    // TODO: compare between prev. and curr. if the user is scrolling up or at the top of the page, show the navigation bar
    if( currentPos < previousPos || currentPos == 0) {
        document.querySelector('.navbar__menu').style.top = '0'; //TODO: set the top to '0' to show it at original place
    }
    // TODO: else, if the user is scrolling down , show the navigation bar also
    else {
        document.querySelector('.navbar__menu').style.top = '0';
    }

    // TODO: set a new timer with a delay of 400 milliseconds
    timer = setTimeout( () => {
        //TODO: here detected that there is no scrolling so the navigation bar will hide and logged "user is no longer scrolling"
        /*
        if(currentPos) {
            document.querySelector('.navbar__menu').style.top = '-50em';
        }
        */ //----->  comment this because they said make it sticky can't evaluate !

        console.log('User Is No Longer Scrolling'); //TODO: run after 400 milliseconds of no scrolling
    }, 1000);

    // TODO: updating the previous scroll position
    previousPos = currentPos;
});


/**
 * End: Suggested Functions
 *
 * Start: Navigation
*/


// TODO: get the nav menu  by id
const navMenu = document.getElementById('navbar__list'); // ul tag
// TODO: get  all the list of sections  by the <section> element
const sectionList = document.querySelectorAll('section');



// TODO: building the navigation menu function
function buildingNavMenu() {
    const startingTime = performance.now();

    // TODO: using forEach to loop through the items list sections and create an anchor element for each item
    sectionList.forEach((section, i) => {
        // TODO: create the list (li) variable to use it later
        let listItem = document.createElement('li');

        // TODO: get the section id and store it in a variable
        const sectionId = section.getAttribute('id');

        // TODO: get the section dataset attribute and store it in a variable
        const sectionData = section.getAttribute('data-nav');

        /**
         * TODO: set the linkitem href, class name, data for each using innerHTML to set element's HTML content.
         * TODO: makeing the href same as the section so when user click on the navigation item will scroll to the exact section.
         */
        listItem.innerHTML = `<a href='#${sectionId}' class='menu__link' id='menu-item${i+1}' data-nav='${sectionData}'> ${sectionData}</a>`; //Marker: I get the hint of do this from our online session

        // TODO: append the list item (li) to the navMenu (ul)
        navMenu.appendChild(listItem);
    });
    const endTime = performance.now();
    console.log('navigation time token: '+(endTime - startingTime)+ ' milliseconds');
}


/**
 * End: Navigation
 *
 * Start: Scroll to Anchor
*/


// TODO: function to scroll to sections when user click the navigation menu item
function respondToTheClick () {
    // TODO: get ALL the list item anchor by the class name
    const anchorLists = document.querySelectorAll('.menu__link');
    // TODO: get ALL rhe sections for scroll to the corresponding section
    const targetSections = document.querySelectorAll('section');

    // TODO: looping through all anchorLists | add event listener to the list item anchor to scroll to the corresponding section
    anchorLists.forEach((list, i) => {
        list.addEventListener("click", (event) => {
            event.preventDefault(); // TODO: Prevent the default behavior of the anchor
            const targetSection = targetSections[i]; // TODO: get the target section
            targetSection.scrollIntoView(); // TODO: Scroll to the target section
             // TODO: looping through all menu items and remove the active class from them
             anchorLists.forEach(list => {
                list.classList.remove("menu__link__active");
            });
            // TODO: toggle the active class on the clicked menu item
            list.classList.toggle("menu__link__active");

         });
    });
}


/**
 * End: Scroll to Anchor
 *
 * Start: Section Active State
*/


/**
 *@description function to check the current active section with the corrsponding anchor using .getAttribute, using data attribute
 *looping through the anchor lists, if it's true will return the anchor.
 *@returns {element} HTML anchor element
*/
function checkCorrespondinglistItem(currentActiveSection) {
    const anchorLists = document.querySelectorAll('.menu__link');
    for(let i=0; i<anchorLists.length; i++) {
        let anchorList = anchorLists[i];
        if(anchorList.getAttribute('data-nav') === currentActiveSection.getAttribute('data-nav')) {
            return anchorList;
        }
    }
}


/**
 * @description function to distinguish the section in view while scrolling, and set it active using classList methods
 * Also add an active state to the navigation items when a section is in the viewport.
*/

function sectionInView(){

    // TODO: set variable for the current section active for checking and tracking
    let currentActiveSection = null;

    // TODO: loop through all the section
    for(const section of sectionList) {
        /* TODO: for detecting the section locaton relative to the viewport using info
          from getBoundingClientRect() function and store the info in variable
        */
        const sectionLocation = section.getBoundingClientRect();

        // TODO: Check if the section is in the viewport // Marker: Get help from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=To%20get%20the%20%3Cdiv%3E%20element%E2%80%99s%20position%20in%20the,box.getBoundingClientRect%20%28%29%3B%20console.log%20%28rect%29%3B%20Code%20language%3A%20JavaScript%20%28javascript%29
        if(sectionLocation.top <= window.innerHeight && sectionLocation.bottom >=0 ) {

            // TODO: if section in viewport, check if it's not the active section
            if(section !== currentActiveSection) {
                // TODO: if not the one, remove the class 'active' as well as the corresponding listItem
                if(currentActiveSection) {
                    currentActiveSection.classList.remove('active');
                    //TODO: calling the method to check if its matching, and store the return value in varable
                    const checked = checkCorrespondinglistItem(currentActiveSection);
                    checked.classList.remove('menu__link__active');
                }

                // TODO: set the 'active' class to the new current section that active | and the items that match
                section.classList.add('active');

                const checked = checkCorrespondinglistItem(section);
                checked.classList.add('menu__link__active');

                currentActiveSection = section; //TODO: update the variable current
            }

         // TODO: else if the section is not in the viewport, remove 'active' class
        } else {
            section.classList.remove('active');
            const checked = checkCorrespondinglistItem(section);
            checked.classList.remove('menu__link__active');
        }
    }
}


/**
 * End: Section Active State
 *
 * Function calling & Events
*/


// TODO: "building the navigation menu" function calling
buildingNavMenu();
// TODO: call the function respondToTheClick "to scroll to sections" when user click the menu item
respondToTheClick();

// TODO: add event listener when scrolling with function to state which Section in Viewport to make it Active
window.addEventListener('scroll', sectionInView);

// TODO: checking the initial positions of the sections when the page load
sectionInView();

const endTime1 = performance.now();
console.log('All time token: '+(endTime1 - startingTime1)+ ' milliseconds');