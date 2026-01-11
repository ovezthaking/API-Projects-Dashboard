const activityText = document.querySelector('h4')
const button = document.querySelector('button')


button.addEventListener('click', () => {
    fetch('https://apis.scrimba.com/bored/api/activity')
        .then(response => response.json())
        .then(data => {
            activityText.textContent = data.activity
            activityText.classList.add('activity-shown-h4')
            document.querySelector('h1').textContent = '💡🧠💡🧠💡'
            document.querySelector('body').classList.add('activity-shown-body')
        })
})
