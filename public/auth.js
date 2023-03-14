const verificationForm = document.querySelector('#verification-form')
const loginForm = document.querySelector('#login-form')

verificationForm?.addEventListener('submit', async (e) => {
    e.preventDefault()

    const res = await fetch('/auth/verification', {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        return window.location.replace('/login')
    }

    const json = await res.json()

    Swal.fire({
        title: 'Error!',
        text: json?.message,
        icon: 'error',
    })

})

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault()

    const res = await fetch('/auth/login', {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if (res.ok) {
        return window.location.replace('/')
    }

    const json = await res.json()

    Swal.fire({
        title: 'Error!',
        text: json?.message,
        icon: 'error',
    })
})