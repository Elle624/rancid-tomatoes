const getData = (path) => {
  return fetch(path)
    .then (response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Sorry we are having difficulty loading this page, please try again later!')
      }
    })
}

const updateData = (path, action, id) => {
  return fetch(path, {
    method: action,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })
    .then (response => {
      if (response.ok) {
        return response;
      } else {
        throw new Error('Sorry we are having difficulty loading this page, please try again later!')
      }
    })
}
export const apiCalls = {
  allMovies: () => {
    return getData("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
  },

  selectMovie: (id) => {
    return getData(`https://rancid-tomatillos.herokuapp.com/api/v2//movies/${id}`)
  },

  selectVideo: (id) => {
    return getData(`https://rancid-tomatillos.herokuapp.com/api/v2//movies/${id}/videos`)
  },

  getWatchList: () => {
    return getData("https://rancid-tomatillos-server-tl.herokuapp.com/watch-list")
  },

  addToWatchList: (id) => {
    return updateData("https://rancid-tomatillos-server-tl.herokuapp.com/watch-list", 'POST', id)
  },

  removeFromWatchList: (id) => {
    return updateData("https://rancid-tomatillos-server-tl.herokuapp.com/watch-list", 'DELETE', id)
  }
}
