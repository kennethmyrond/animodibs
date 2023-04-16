//front end
document.addEventListener("DOMContentLoaded", function (event) {

    const input = document.querySelector("#error");
    const input2 = document.querySelector("#error2");

    const key1 = document.querySelector("#event_name");
    const key2 = document.querySelector("#organizer");

    const submit = document.getElementById("submit");
    submit.addEventListener("click", async (e) => {
        e.preventDefault();

        const form = document.querySelector("#reservation");
        const formData = new FormData(form);


        const hidden = document.querySelector("#hidden");
        const hiddenData = new FormData(hidden);

        let formValue = {};
        let hiddenValue = {};



        for (const [key, value] of formData) {
            if (document.querySelector("input#event_name")?.value === "") {
                input.style.color = "#FF0000";
                input.innerHTML = " *Required";

            }

            if (document.querySelector("input#organizer")?.value === "") {
                input2.style.color = "#FF0000";
                input2.innerHTML = " *Required";

            }

            formValue[key] = value;
        }
        for (const [key, value] of hiddenData) {
            hiddenValue[key] = value;
        }

        console.log(hiddenValue);
        console.log(formValue);

        const JSONbody = JSON.stringify(formValue);

        fetch('/rooms/' + hiddenValue["room_id"] + '/confirm?time=' + hiddenValue["time"] + '&dateto=' + hiddenValue["dateto"] + '&datefrom=' + hiddenValue["datefrom"] + '&dayCheck=' + hiddenValue["arrdays"], {
            method: "POST",
            body: JSONbody,
            headers: { "Content-type": "application/json" },
        }).then((res) => {
            window.location.href = res.url;
        }).catch((err) => {
            console.log(err);
        });

    })

    key1.addEventListener('keyup', function () {
        input.innerHTML = "";
    })

    key2.addEventListener('keyup', function () {
        input2.innerHTML = "";
    })
});


