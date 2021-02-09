// const itunesUrl = 'https://itunes.apple.com/search?term='
// const baseUrl = 
const form = document.querySelector('.form-field')
const songSection = document.querySelector('.song-section')


form.addEventListener('submit', event => {
    event.preventDefault()
    renderSong()
})

function listSongs() {
// Making a function to list songs
    fetch("https://itunes.apple.com/search?term=Blackmore%27s+Night&limit=10")
// this fetch request searches for the band "Blackmore's Night" and takes the first song data
        .then(response => response.json())
// changing the data I got from the fetch and making it into json data
        .then(data => {
// taking that information and console logging the data it has
            console.log(data)
            for (let song of data.results)
                renderSong(song)
            console.log(data.results[0].artistName)
//! this SHOULD be console logging the artist name key value pair inside the data object array
            // playSong()
        })
    }



function renderSong(song) {
    let songDiv = document.createElement('div')
    songDiv.className = 'song'
    songDiv.id = song.trackName
    let songArtist = document.createElement('p')
    songArtist.innerHTML = song.artistName
    let songName = document.createElement('p')
    songName.innerHTML = song.trackName 
    let songAudio = document.createElement('div')
    songAudio.innerHTML = `<audio controls src="${song.previewUrl}"</audio>`

    songDiv.appendChild(songArtist)
    songDiv.appendChild(songName)
    songDiv.appendChild(songAudio)

    songSection.appendChild(songDiv)
}

// wrapperType
listSongs()