const itunesUrl = 'https://itunes.apple.com/search?term='
// const baseUrl = 
const form = document.querySelector('.form-field')
const songSection = document.querySelector('.song-section')


form.addEventListener('submit', event => {
    event.preventDefault()
    clearInputs()
    listSongs()
})

// songSection.addEventListener('click', event => {
//     listSongs()
// })
//! currently rendering the search on every click anywhere, also renders songs on 
//! press of the 'enter' key


// document.addEventListener('click', event => {
//     renderSong()
// })

function listSongs() {
    let songInput = document.querySelector('input').value
    songInput.replace(" ", "+")
    songInput.replace("'", "%27")
// Making a function to list songs
    fetch(itunesUrl + songInput + '&limit=12')
// this fetch request searches for the band "Blackmore's Night" and takes the first song data
        .then(response => response.json())
// changing the data I got from the fetch and making it into json data
        .then(data => {
// taking that information and console logging the data it has
            console.log("test 1", data)
            for (let song of data.results)
                // clearInputs(song)
                renderSong(song)
            console.log("test 2", data.results[0].artistName)
//! this SHOULD be console logging the artist name key value pair inside the data object array
            // playSong()
        })
    }

// variable.dataset.songUrl = song.previewUrl

function renderSong(song) {
    let songDiv = document.createElement('div')
    songDiv.className = 'song-card'
    songDiv.id = song.trackName
    let songBox = document.createElement('div')
    songBox.className = 'song-box'
    let songInfo = document.createElement('div')
    songInfo.className = 'song-info'
    let songArtist = document.createElement('p')
    songArtist.className = "song-artist"
    songArtist.innerHTML = song.artistName
    let songName = document.createElement('p')
    songName.className = 'track-name'
    songName.innerHTML = song.trackName
    let songAlbum = document.createElement('p')
    songAlbum.className = 'song-album'
    songAlbum.innerHTML = song.collectionName
    // songName.innerHTML = `<p>${song.trackName}</p><img src="${song.artworkUrl60}">` 
    let songImg = document.createElement('div')
    songImg.className = 'song-image'
    songImg.innerHTML = `<img src="${song.artworkUrl100}">`
    let songAudio = document.createElement('div')
    songAudio.innerHTML = `<audio controls src="${song.previewUrl}"</audio>`

    songInfo.appendChild(songArtist)
    songInfo.appendChild(songName)
    songInfo.appendChild(songAlbum)
    
    songBox.appendChild(songInfo)
    songBox.appendChild(songImg)

    songDiv.appendChild(songBox)

    // songDiv.appendChild(songArtist)
    // songDiv.appendChild(songName)
    // songDiv.appendChild(songImg)
    songDiv.appendChild(songAudio)

    songSection.appendChild(songDiv)

//     clearInputs()
}

function clearInputs() {
    let songs = document.querySelectorAll('.song-card')
    for (let song of songs)
        song.remove()
}

// wrapperType
// listSongs()