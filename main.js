const itunesUrl = 'https://itunes.apple.com/search?term='

const form = document.querySelector('.form-field')
const songSection = document.querySelector('.song-section')
let songPlayer = document.querySelector('.sound-control')

form.addEventListener('submit', event => {
    event.preventDefault()
    clearInputs()
    listSongs()
})


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
            if (data.results.length > 0) {
                    for (let song of data.results) {
                    renderSong(song)
                    console.log("test 2", data.results[0].artistName)
                    }    
            } else {
                    showError()
            }
        })
    }

function showError() {
    let errorTroll = document.createElement('div')
    let errorMsg = document.createElement('p')
    let errorRick = document.createElement('div')
    errorMsg.innerHTML = "You got an error! what would Rick do?!"
    errorRick.innerHTML = `<video controls autoplay='true' src="https://video-ssl.itunes.apple.com/itunes-assets/Video118/v4/04/b5/e3/04b5e334-fbcf-5f26-e981-8de20fd4b76d/mzvf_4028901463979513279.640x464.h264lc.U.p.m4v">`
    
    errorTroll.appendChild(errorMsg)
    errorTroll.appendChild(errorRick)

    songSection.appendChild(errorTroll)
}


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

    let songImg = document.createElement('div')
    songImg.className = 'song-image'
    songImg.innerHTML = `<img src="${song.artworkUrl100}">`
    
    let songAudio = document.createElement('div')
    songAudio.innerHTML = `<button class="start-music" data-song-url="${song.previewUrl}">Play!</button>`

    songAudio.addEventListener('click', event => {
        console.log(event.target.dataset.songUrl)
        songPlayer.src = event.target.dataset.songUrl
        songPlayer.volume = .5
        songPlayer.autoplay = true
    })


    songInfo.appendChild(songArtist)
    songInfo.appendChild(songName)
    songInfo.appendChild(songAlbum)
    
    songBox.appendChild(songInfo)
    songBox.appendChild(songImg)

    songDiv.appendChild(songBox)
    songDiv.appendChild(songAudio)

    songSection.appendChild(songDiv)

}



function clearInputs() {
    let songs = document.querySelectorAll('.song-card')
    for (let song of songs)
        song.remove()
}
