export const SESSION_KEY = 'sessionAuth'

export const saveSession = (session) => {
  console.log(session)
  try {
    window.session = session

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session),
    )
  } catch (error) {
    console.log(error)
    window.session = null
  }
}

export const loadSession = () => {
  // const json = localStorage.getItem(SESSION_KEY)

  // if (json) {
  //   const session = JSON.parse(json)
  // }

  try {
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY),
    )

    if (session) {
      window.session = session
    } else {
      window.session = null
    }

    // const session = getSession()
    // return session ? session.token : null
  } catch (er) {
    console.log(er)
    window.session = null
  }
}

export const getTokenSession = () => {
  try {
    const session = getSession()
    return session ? session.token : null

    // const session =
    //   JSON.parse(localStorage.getItem(SESSION_KEY)) ||
    //   window.session
    // if (session) {
    //   return session.token
    // } else {
    //   return null
    // }
  } catch (er) {
    console.log(er)
    return null
  }
}

export const getSession = () => {
  try {
    const session =
      JSON.parse(localStorage.getItem(SESSION_KEY)) ||
      window.session

    return session || null
  } catch (er) {
    console.log(er)
    return null
  }
}
