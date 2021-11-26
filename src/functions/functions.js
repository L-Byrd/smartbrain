//fetch functions
export const fetchSignIn = (token=null,email, password) => {
  return token === null
    ? fetch("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        }),
      })
    : fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
};

export const fetchRegister = (email, password, name) => {
    return fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name
        }),
      })
};

export const fetchProfile = (id, token) => {
  return fetch(`/profile/${id}`, {
    method: 'GET', 
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  })
}

export const fetchImage = (token, id) => {
    return fetch('/image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            id
        })
      })
}

export const fetchImageUrl = (token, input) => {
  return fetch("/imageurl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      input
    }),
  });
};

//face detection
export const calculateFaceLocation = (data) => {
  const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
}