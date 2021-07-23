
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // get data
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user)
        })
    } else {
        setupGuides([]);
        setupUI();
    }
})

// creat new guide
const creatForm = document.querySelector('#create-form');
creatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: creatForm['title'].value,
        content: creatForm['content'].value
    }).then(() => {
        // close and reset
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        creatForm.reset();
    })
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
    }).then(() => {
        // close and reset
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
});

// log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    // e.preventDefault();
    auth.signOut()
})

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then()

    // close and reset
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
})