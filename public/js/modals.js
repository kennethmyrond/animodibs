// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("view-details");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on the button, open the modal
for(let i = 0; i<btn.length; i++)[
    btn[i].onclick = async function(e) {
      let selectDate = document.querySelector("#inputdate").value
      selectDate = selectDate.replace(' - ', ' ')
      let arr = selectDate.split(/ (.*)/)
      let dateto3 = arr[0]
      let datefrom3 = arr[1]
      let parent = e.target.closest('tr')
      let time = parent.querySelector(".form-time").innerHTML
      let res = await fetch(room_id+'/details?time='+time+'&dateto='+dateto3+'&datefrom='+datefrom3, {
        method: 'get'
      })
      let deets = await res.json()

      modal.style.display = "block";
      if(deets){
        document.querySelector("#eventname").innerHTML = "Event Name: "+deets.event_name
        document.querySelector("#org").innerHTML = "Event Organizer: "+deets.organizer
        document.querySelector("#rem").innerHTML = "Remarks: "+deets.remarks
      } else {
        document.querySelector("#eventname").innerHTML = "Event Name: None"
        document.querySelector("#org").innerHTML = "Event Organizer: None"
        document.querySelector("#rem").innerHTML = "Remarks: None"
      }
      
    }
]

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}