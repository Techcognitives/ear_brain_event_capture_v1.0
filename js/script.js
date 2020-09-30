var BASE_URL = "https://earbrain-7ace2.firebaseio.com/"
var zooom1 = 8;
var zooom2 = 15;
var zooom3 = 20;
var isClickEnable = false;
var zipCode = "";
var stateCode = "";


// $("#searchZipCode").keyup(function() {
//   resetClickSubmit();
//   var zipCodeTxt = $("#searchZipCode").val();
//   var length = zipCodeTxt.length;
//   if (length >= 5) {
//     $.ajax({
//       url : BASE_URL+"usZipCodeLatitudeAndLongitude.json?orderBy=\"zipText\"&equalTo=\""+ zipCodeTxt+  "\"&print=pretty",
//       type: "GET",
//       success: function(data, textStatus, jqXHR)
//       {
//         console.log("data........"+ isEmpty(data));
//         if(isEmpty(data)){
//           resetClickSubmit();
//           alert("Please enter valid zipcode");
//         }else{
//           for (var key in data) {
//             if (data.hasOwnProperty(key)) {    
//               isClickEnable = true;       
//                 console.log(data[key]);
//                 zipCode = data[key].zipText;
//                 stateCode = data[key].stateProvince;
//                 //$("#stateCode").val(data[key].stateProvince);
//                 return;
//             }
//           }
//         }
//       },
//       error: function (jqXHR, textStatus, errorThrown)
//       {
//         resetClickSubmit();
//         var myJSON = JSON.parse(jqXHR.responseText);
//         alert(myJSON.error.message);
//         console.log("data","data......."+myJSON.error.message);
//       }
//   });
//   }
// });

function ClickSubmit() {
    console.log(navigator.onLine);
    var zipCodeTxt = $("#searchZipCode").val();
    var length = zipCodeTxt.length;
    if (navigator.onLine) {
        var name = $('#name').val();
        var emailId = $("#email_id").val()
        if (name == "") {
            alert("Please enter name");
            return;
        } else if (emailId == "") {
            alert("Please enter email");
            return;
        } else if (length < 5) {
            alert("Please enter valid zipcode");
            return;
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
            captureEventFindAnAudiologist(name, emailId, zipCodeTxt);
            
        } else {
            alert("You have entered an invalid email address!")
            return false;
        }


    } else {
        alert("Please check internet connection");
    }

}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function resetClickSubmit() {
    isClickEnable = false;
    zipCode = "";
    stateCode = ""
}

function alert(message) {
    swal({
        title: "Alert",
        text: message
    });
}

function captureEventFindAnAudiologist(name, email, zipcode) {
    var formData = {name:name,email:email, zipCode:zipcode}; 
    var settings = {
        "url": BASE_URL+"EventFindAnAudiologist.json",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(formData),
      };
      
      $.ajax(settings).done(function (response) {
        redirect("map.html?zipcode=" + zipcode + "&emailId=" + email + "&name=" + name);
            //var s_a = document.getElementById("mylink");
           // s_a.href = "map.html?zipcode=" + zipcode + "&emailId=" + email + "&name=" + name;
      });
}

function captureEventCognivuePreferred(formData) {
    var settings = {
        "url": BASE_URL+"EventCognivuePreferred.json",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(formData),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}

function captureEventOtherAudiologist(formData) {
    var settings = {
        "url": BASE_URL+"EventOtherAudiologist.json",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(formData),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}
function captureEventCanNotFindTheAUD(formData) {
    var settings = {
        "url": BASE_URL+"EventCanNotFindTheAUD.json",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(formData),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}
function redirect (url) {
    var ua        = navigator.userAgent.toLowerCase(),
        isIE      = ua.indexOf('msie') !== -1,
        version   = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else { 
        window.location.href = url; 
    }
}

