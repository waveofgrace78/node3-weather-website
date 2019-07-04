console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(({error, location, forecast}) => {
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
            searchInput.value = ""
        });
    });
});