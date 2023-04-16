//document.addEventListener("DOMContentLoaded", function (event) {

function enlargePic(picId) {
    const small = document.getElementById(picId).src;
    document.getElementById("mainPic").src = small;
  }

  // for searching button for date
  const room_id = document.querySelector("#roomId").innerHTML
  let params = (new URL(document.location)).searchParams;
  
  $(function () {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left',
      locale: {
        format: 'YYYY-MM-DD'
      }
    }, function (start, end, label) {
      //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        let selectDate = "dateto="+start.format('YYYY-MM-DD')+ '&datefrom=' + end.format('YYYY-MM-DD');
        
    });
  });


  const sub = document.querySelector("#submitbtn")
  sub.addEventListener('click', function(e){
    var checked = $('input[type="checkbox"].checkJobToSend:checked');
    var checkedValues = [];
    checked.each(function (i) {
        checkedValues.push(checked[i].value); // add checked values to our temporary list
    });
    var queryParam = '&dayCheck=' + checkedValues.join(','); // create query param
    let selectDate = document.querySelector("#inputdate").value
    selectDate = selectDate.replace(' - ', ' ')
    let arr = selectDate.split(/ (.*)/)
    let datetoParam = arr[0]
    let datefromParam = arr[1]
    window.location.href = '/rooms/'+ room_id +'?'+'dateto='+datetoParam+'&datefrom='+datefromParam+queryParam
  })


  const reserve = document.getElementsByClassName("btn-reserve")
  for(var i = 0; i<reserve.length; i++)(
    reserve[i].addEventListener("click", function(e){
      // var checked = $('input[type="checkbox"].checkJobToSend:checked');
      // var checkedValues = [];
      // checked.each(function (i) {
      //     checkedValues.push(checked[i].value); // add checked values to our temporary list
      // });
      // var dayParam = '&dayCheck=' + checkedValues.join(','); // create query param
      // let selectDate = document.querySelector("#inputdate").value
      // selectDate = selectDate.replace(' - ', ' ')
      // let arr = selectDate.split(/ (.*)/)
      // console.log(arr)
      // let datetoParam = arr[0]
      // let datefromParam = arr[1]

      let parent = e.target.closest('tr')
      let timeParam = parent.querySelector(".form-time").innerHTML
      let datetoParam = params.get("dateto")
      let datefromParam = params.get("datefrom")
      let daycheckParam = params.get('dayCheck')
      window.location.href=room_id+'/confirm?time='+ timeParam +'&dateto='+datetoParam+'&datefrom='+datefromParam+'&dayCheck='+daycheckParam

      
    })
  )
  

  //add room to favorites
  function addFav() {
    let x = document.getElementById("btn-favorite").value;
    if (x == 0) {
      fetch('/rooms/'+room_id+'/fave', {
        method: 'POST'
      }).then((res)=>{
        document.getElementById("btn-favorite").innerHTML = 'Remove to favorites';
        document.getElementById("btn-favorite").value = 1;
      })
    }
    else {
      fetch('/rooms/'+room_id+'/fave', {
        method: 'DELETE'
      }).then((res)=>{
        document.getElementById("btn-favorite").innerHTML = 'Add to favorites';
        document.getElementById("btn-favorite").value = 0;
      })
    }
  }

  // let today = new Date();
  // let day = today.getDay();
  // let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
  // //document.getElementById("inputdate").value = date + ' - ' + date;
  // console.log(date + ' - ' + date);

  // let popup = document.getElementById("popup-details");
  // function openPopup() {
  //   popup.classList.add("open-popup");
  //   console.log("open");
  // }

  // function closePopup() {
  //   popup.classList.remove("open-popup");
  // }

  // let popup2 = document.getElementById("popup-waitlist");
  // function openPopupWait() {
  //   popup2.classList.add("open-popup");
  //   console.log("open");
  // }
  // function closePopupWait() {
  //   popup2.classList.remove("open-popup");
  // }
//})