const menuList = document.getElementById("menu-container");
const eventsList = document.getElementById("events-overview");

const menuModal = document.getElementById("menuModal");
const eventModal = document.getElementById("eventModal");

const closeButtonMenu = menuModal.querySelector(".close-button");
const closeButtonEvent = eventModal.querySelector(".close-button-event");


//menu modal
const menuModalElements = {
    title: document.getElementById("modalTitle"),
    description: document.getElementById("modalDescription"),
    price: document.getElementById("modalPrice"),
    image: document.getElementById("modalImage")
};

//event modal
const eventModalElements = {
    title: document.getElementById("eventModalTitle"),
    date: document.getElementById("eventModalDate"),
    time: document.getElementById("eventModalTime"),
    location: document.getElementById("eventModalLocation"),
    description: document.getElementById("eventModalDescription")
};

//get menu
const getMenu = async () => {
    const response = await fetch('/api/v1/menu');
    return await response.json();
};

//get events
const getEvents = async () => {
    const response = await fetch('/api/v1/events');
    return await response.json();
};

//render menu
const showMenuList = (menuData) => {
    Object.keys(menuData).forEach(category => {
        menuData[category]?.forEach(item => {
            const menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            menuItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p>${item.price ? '$' + item.price : ''}</p>
            `;
            menuItem.onclick = () => showMenuDetails(item);
            menuList.appendChild(menuItem);
        });
    });
};

//render events
const showEventsList = (eventsData) => {
    eventsData?.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.className = "event-item";
        eventItem.innerHTML = `
            <h2>${event.name}</h2>
            <p>${event.date}</p>
        `;
        eventItem.onclick = () => showEventDetails(event);
        eventsList.appendChild(eventItem);
    });
};

//show menu modal
const showMenuDetails = (item) => {
    menuModalElements.title.textContent = item.name;
    menuModalElements.description.textContent = item.description;
    menuModalElements.price.textContent = item.price ? '$' + item.price : '';
    menuModalElements.image.src = item.imageUrl !== "---" ? item.imageUrl : "";
    menuModal.style.display = "flex";
};

//show event modal
const showEventDetails = (event) => {
    eventModalElements.title.textContent = event.name;
    eventModalElements.date.textContent = event.date;
    eventModalElements.time.textContent = event.time || '';
    eventModalElements.location.textContent = event.location || '';
    eventModal.style.display = "flex";
};

//close modals
closeButtonMenu.onclick = () => (menuModal.style.display = "none");
closeButtonEvent.onclick = () => (eventModal.style.display = "none");

window.onclick = (e) => {
    if (e.target === menuModal) menuModal.style.display = "none";
    if (e.target === eventModal) eventModal.style.display = "none";
};


(async () => {
    const menuData = await getMenu();
    showMenuList(menuData);

    const eventsData = await getEvents();
    showEventsList(eventsData);
})();