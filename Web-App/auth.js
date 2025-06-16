document.addEventListener('DOMContentLoaded', function() {

    const registrationForm = document.forms.registration;

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();
            
            const name = this.name.value;
            const surname = this.surname.value;
            const email = this.email.value;
            const password = this.password.value;
            const phone = this.phone.value;
            const messageEl = document.getElementById("message");

            if (!name || !surname || !email || !password || !phone) {
                messageEl.textContent = "Пожалуйста, заполните все поля.";
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.email === email)) {
                messageEl.textContent = "Пользователь с такой почтой уже существует.";
                return;
            }

            const newUser = {
                name,
                surname,
                email,
                password, 
                phone,
                avatar: "https://placehold.co/100x100/f0f0f0/333?text=AV"
            };
            users.push(newUser);

            localStorage.setItem("users", JSON.stringify(users));

            alert("Регистрация прошла успешно! Теперь вы можете войти.");
            
            document.location.href = "login.html";

        });

    }

    const autorizationForm = document.forms.autorization;

    if (autorizationForm) {

        autorizationForm.addEventListener("submit", function (event) {

            event.preventDefault();
            
            const login = this.login.value;
            const password = this.password.value;
            const messageEl = document.getElementById("message");

            if (!login || !password) {
                messageEl.textContent = "Введите логин и пароль.";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            
            const foundUser = users.find(user => user.email === login && user.password === password);

            if (foundUser) {
                alert(`Добро пожаловать, ${foundUser.name}!`);
                document.location.href = "index.html";
            } else {
                messageEl.textContent = "Неправильный логин или пароль.";
            }

        });

    }

});