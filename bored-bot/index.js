const activityText = document.querySelector('p')
const button = document.querySelector('button')


button.addEventListener('click', () => {
    fetch('https://apis.scrimba.com/bored/api/activity')
        .then(response => response.json())
        .then(data => {
            activityText.textContent = data.activity
            activityText.classList.add('activity-shown-p')
            document.querySelector('h1').textContent = '💡🧠💡🧠💡'
            document.querySelector('main').classList.add('activity-shown-body')
        })
})
