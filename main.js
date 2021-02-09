// const itunesUrl = 'https://itunes.apple.com/search?'
// const baseUrl = 
const form = document.querySelector('.form-field')
const songSection = document.querySelector('.song-section')

// form.addEventListener('submit', event => {
//     event.preventDefault()

// })

fetch("https://itunes.apple.com/search?term=Blackmore%27s+Night&limit=1")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // playSong()
    })
