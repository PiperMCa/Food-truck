const menuContainer = document.getElementById("menu-container");
const eventsOverview = document.getElementById("events-overview");

//menu
const getMenu = async () => {
    const response = await fetch('/api/v1/menu');
    return await response.json();
};

//events
const getEvents = async () => {
    const response = await fetch('/api/v1/events');
    return await response.json();
};

//render menu
const showMenu = (menuData) => {
    
}