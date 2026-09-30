const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const signInButton =
    document.getElementById("signInButton");

const forgotPassword =
    document.getElementById("forgotPassword");

const createAccount =
    document.getElementById("createAccount");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");



/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

togglePassword.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type === "password";


        passwordInput.type =
            isPassword
                ? "text"
                : "password";


        togglePassword.innerHTML =
            isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';


        togglePassword.setAttribute(
            "aria-label",
            isPassword
                ? "Hide password"
                : "Show password"
        );

    }
);



/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (!email || !password) {

            showToast(
                "Please fill in all fields."
            );

            return;
        }


        signInButton.classList.add(
            "loading"
        );


        /*
            Simulated login request.

            Replace this section with your
            actual API / Firebase / backend.
        */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1300
                )
        );


        signInButton.classList.remove(
            "loading"
        );

        const remember = document.getElementById("remember").checked;
        sessionStorage.setItem("campusLoggedIn", "true");

        if (remember) {
            localStorage.setItem("campusLoggedIn", "true");
        } else {
            localStorage.removeItem("campusLoggedIn");
        }

        showToast(
            "Login successful!"
        );

        setTimeout(
            () => {
                window.location.assign("index.html");
            },
            900
        );

    }
);



/* =========================================================
   FORGOT PASSWORD
========================================================= */

forgotPassword.addEventListener(
    "click",
    (event) => {

        event.preventDefault();


        showToast(
            "Password reset option selected."
        );

    }
);



/* =========================================================
   CREATE ACCOUNT
========================================================= */

createAccount.addEventListener(
    "click",
    (event) => {

        event.preventDefault();


        showToast(
            "Create account selected."
        );

    }
);



/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}



/* =========================================================
   INPUT INTERACTION
========================================================= */

emailInput.addEventListener(
    "input",
    () => {

        if (
            emailInput.value.length > 0
        ) {

            emailInput.classList.add(
                "has-value"
            );

        } else {

            emailInput.classList.remove(
                "has-value"
            );

        }

    }
);


passwordInput.addEventListener(
    "input",
    () => {

        if (
            passwordInput.value.length > 0
        ) {

            passwordInput.classList.add(
                "has-value"
            );

        } else {

            passwordInput.classList.remove(
                "has-value"
            );

        }

    }
);



/* =========================================================
   ENTER KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            document.activeElement !==
            document.querySelector(
                ".sign-in-button"
            )
        ) {

            if (
                document.activeElement ===
                emailInput ||
                document.activeElement ===
                passwordInput
            ) {

                loginForm.requestSubmit();

            }

        }

    }
);