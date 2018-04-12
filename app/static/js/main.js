$(document).ready(function() {
    $("#birth-date").datepicker({
        inline: true,
        showOtherMonths: true,
    });
    fillCourses();
    fillYears();
    fillDays();

    $('#birth-year, #birth-month').on('change', function() {
        fillDays();
    })

    fill();

    $('button').on('click', function() {
        alert($("#full-name").val());
        $("#full-name").text("");
    })

    $("#student-image").on("click", function() {
        $('#select-pic').trigger('click');
    })

    window.onscroll = function() {myFunction()};
    var header = document.getElementById("header-to-stick");
    var sticky = header.offsetTop;
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            header.classList.add("sticky");
        }
        else
        {
            header.classList.remove("sticky");
        }
    }

    $(".content").submit(function(event) {
    alert("ttt");
    event.preventDefault();

    student_image = $('#student-image').val();
    student_type = $('#student-type').val();
    full_name = $('#full-name').val();
    address = $('#address').val();
    country = $('#country').val();
    state = $('#state').val();
    city = $('#city').val();
    email = $('#email').val();
    birth_year = $('#birth-year').val();
    birth_month = $('#birth-month').val();
    birth_day = $('#birth-day').val();
    course = $('#course').val();
    comments = $('#comments').val();

    registration = {
        "student_image": student_image,
        "student_type": student_type,
        "full_name": full_name,
        "address": address,
        "country": country,
        "state": state,
        "city": city,
        "email_address": email,
        "birth_year": birth_year,
        "birth_month": birth_month,
        "birth_day": birth_day,
        "course": course,
        "comments": comments,
    }
    alert(registration);
    $.ajax({
        type: "POST",
        url: "api/register",
        data: JSON.stringify(registration),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
});

});

function fill() {
    $("#full-name").val("rr");
    $("#address").val("rr");
    $("#country").val("rr");
    $("#state").val("rr");
    $("#city").val("rr");
    $("#email").val("walidpiano@yahoo.com");
    $("#birth-date").val("10/10/2018");
    $("textarea").val("tttttt");
}

function clearAll() {
    $("#full-name").val("");
    $("#address").val("");
    $("#country").val("");
    $("#state").val("");
    $("#city").val("");
    $("#email").val("");
    $("#birth-date").val("");
    $("textarea").val("");
    $('#select-pic').val("");
    $('#student-image').attr('src', "../static/img/empty_profile.jpg");
    $("#full-name").focus();
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#student-image')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function fillCourses() {
$.ajax({
        type: "GET",
        url: "/api/courses",
        dataType: "json",
        success: function(response) {
            $.each(response, function (index, topic) {
                $('#course').append(new Option(topic.course_name, topic.id, true, false));
            });
        }
    });
}

function fillYears() {
    var i;
    for (i=1970; i <= (new Date()).getFullYear(); i++ ) {
        $('#birth-year').append(new Option(i, i, true, false));
    };
}

function fillDays() {
    var year = $('#birth-year').val();
    var month = $('#birth-month').val();
    var numberOfDays = daysInMonth(month, year)
    $('#birth-day')
        .find('option')
        .remove()
        .end();
    var i;
    for (i=1; i <= numberOfDays; i++) {
        $('#birth-day').append(new Option (i, i, true, false));
    }

}
