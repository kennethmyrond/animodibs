//front end
document.addEventListener("DOMContentLoaded", function (event) {

    const input = document.querySelector("#error");
    const input2 = document.querySelector("#error2");
    const input3 = document.querySelector("#error3");
    const input4 = document.querySelector("#error4");
    const input5 = document.querySelector("#error5");

    const key1 = document.querySelector("#event_name");
    //const key2 = document.querySelector("#event_name");
    const key3 = document.querySelector("#data_from");
    const key4 = document.querySelector("#data_to");
    const key5 = document.querySelector("#timeselect");

    const submit = document.getElementById("submit");

    submit.addEventListener("mouseover", async (e) => {

    });

    submit.addEventListener("click", async (e) => {
        e.preventDefault();


        const form = document.querySelector("#reservation");
        const formData = new FormData(form);
        console.log(formData.getAll);
        let formValue = {};
        let day = [];
        let eqp = [];
        var checkboxes = document.getElementsByName('days');
        var checkboxes1 = document.getElementsByName('equipment');


        //getting value of check boxes
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked) {
                day.push(checkboxes[i].value);
                console.log(day);
            }
        }

        for (var j = 0, n = checkboxes1.length; j < n; j++) {
            if (checkboxes1[j].checked) {
                eqp.push(checkboxes1[j].value);
                console.log(eqp);
            }
        }

        if (day.every(element => element === null)) {
            input2.style.color = "#FF0000";
            input2.innerHTML = " *Required";
        } else { input2.innerHTML = ""; }

        //getting other values
        for (const [key, value] of formData) {

            if (document.querySelector("input#event_name")?.value === "") {
                input.style.color = "#FF0000";
                input.innerHTML = " *Required";

            }

            if (document.querySelector("input#data_from")?.value === "") {
                input3.style.color = "#FF0000";
                input3.innerHTML = " *Required";
            }

            if (document.querySelector("input#data_to")?.value === "") {
                input4.style.color = "#FF0000";
                input4.innerHTML = " *Required";
            }

            if (document.querySelector("select#timeselect")?.value === "") {
                input5.style.color = "#FF0000";
                input5.innerHTML = " *Required";
            }

            formValue["days"] = day;
            formValue["equipment"] = eqp;

            if (key != "days" || key != "equipment") {
                formValue[key] = value;

            }
        }

        const JSONbody = JSON.stringify(formValue);
        console.log(formValue);

        fetch("/createreservation", {
            method: "POST",
            body: JSONbody,
            headers: { "Content-type": "application/json" },
        }).then((res) => {
            if (res.status === 500) {
                console.log("NOT OK")
                if (!alert('Invalid Reservation! Please try selecting a different room, days, dates, or times !')) { window.location.reload(); }
            }
            if (res.redirected) { window.location.href = res.url; }
        }).catch((err) => {
            console.log("err");
        });
    });


    key1.addEventListener('keyup', function () {
        input.innerHTML = "";
    })

    key3.addEventListener('change', function () {
        input3.innerHTML = "";
    })
    key4.addEventListener('change', function () {
        input4.innerHTML = "";
    })
    key5.addEventListener('change', function () {
        input5.innerHTML = "";
    })


});