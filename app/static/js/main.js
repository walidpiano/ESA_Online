var stringImage = '';

$(document).ready(function() {

    $("#birth-date").datepicker({
        inline: true,
        showOtherMonths: true,
    });

    loadData();

    $('#instructor').on('change', function() {
        localStorage.setItem("Instructor", $('#instructor').val());
    })

    $('#birth-year, #birth-month').on('change', function() {
        fillDays();
    })

    $("#student-image").on("click", function(e) {
        e.preventDefault();
        $('#select-pic').trigger('click');
    })

    $('#student-type').on('change', function() {
        if ($('#student-type').val() == "New") {
            $('.old').addClass('hide');
            $('#cell-phone').prop('disabled', false);
            $('#birth-place').prop('disabled', false);
            $('#state').prop('disabled', false);
            $('#city').prop('disabled', false);
            $('#address').prop('disabled', false);
            $('#email').prop('disabled', false);
            $('.new').removeClass('hide');
        } else {
            $('.old').removeClass('hide');
            $('#cell-phone').prop('disabled', true);
            $('#birth-place').prop('disabled', true);
            $('#state').prop('disabled', true);
            $('#city').prop('disabled', true);
            $('#address').prop('disabled', true);
            $('#email').prop('disabled', true);
            $('.new').addClass('hide');
        }
    })


    $('#category').on('change', function() {
        var cat = $('#category').val();
        if (cat!="") {
            fillCourses(cat);
        } else {
            $('#course').html("");
        }

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

    event.preventDefault();

    var student_image;
    if ($('#student-image').attr('src') == '../static/img/empty_profile.jpg') {
        student_image = 'None';
    } else {
        student_image = stringImage;
    }
    var isNotApp = browserOrApp();

    category = $('#category').val();
    course = $('#course').val();
    place = $('#place').val();
    point = $('#point').val();
    student_type = $('#student-type').val();
    student_name = $('#student-name').val();
    esa_number = $('#esa-number').val();
    tax_code = $('#tax-code').val();
    birth_year = $('#birth-year').val();
    birth_month = $('#birth-month').val();
    birth_day = $('#birth-day').val();
    nationality = $('#nationality').val();
    sex = $('#sex').val();
    birth_place = $('#birth-place').val();
    home_phone = $('#home-phone').val();
    cell_phone = $('#cell-phone').val();
    country = $('#country').val();
    state = $('#state').val();
    city = $('#city').val();
    zip_code = $('#zip-code').val()
    address = $('#address').val();
    email = $('#email').val();
    comments = $('#comments').val();

    if (isNotApp) {
        instructor = $('#instructor').val();
    } else {
        instructor = getInstructorId($('#instructor-text').val());
    }


    if (instructor == 0) {
        showWrongInstructor();
    } else {
        registration = {
            "student_image": student_image,
            "instructor": instructor,
            "category": category,
            "course": course,
            "place": place,
            "point": point,
            "student_type": student_type,
            "student_name": student_name,
            "esa_number": esa_number,
            "tax_code": tax_code,
            "birth_year": birth_year,
            "birth_month": birth_month,
            "birth_day": birth_day,
            "nationality": nationality,
            "sex": sex,
            "birth_place": birth_place,
            "home_phone": home_phone,
            "cell_phone": cell_phone,
            "country": country,
            "state": state,
            "city": city,
            "zip_code": zip_code,
            "address": address,
            "email_address": email,
            "comments": comments,
        }

        var result;
        $.ajax({
            type: "POST",
            url: "api/register",
            data: JSON.stringify(registration),
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            success: function(response) {
                console.log(response);
                result = response;
            },
            error: function(error) {
                console.log(error);
                result = false;
            }
        });

        showResult(result);
        if (result == false) {
            showResult(false);
        } else {
            showResult(true);
            clearAll();
        }

    }


});


$('#instructor').val($('#last-instructor').val());
});

function loadData() {
    fillInstructors();
    inputOrSelection();
    fillYears();
    fillDays();
    $('#category').append(new Option("--select--", "", true, false));
    fillCategories();
    fillPlaces();
    fillPoints();
    $('.old').addClass('hide');
    fillCountries();
}

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
    stringImage = '';
    $("#student-name").val("");
    $("#esa-number").val("");
    $("#tax-code").val("");
    $("#birth-place").val("");
    $("#home-phone").val("");
    $("#cell-phone").val("");
    $("#state").val("");
    $("#city").val("");
    $("#address").val("");
    $("#zip-code").val("");
    $("#email").val("");
    $("#comments").val("");
    $('#select-pic').val("");
    $('#student-image').attr('src', "../static/img/empty_profile.jpg");
    $("#category").focus();
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
            stringImage = e.target.result.toString();
        };

        reader.readAsDataURL(input.files[0]);
    }
}
var instructorList = [];

function fillInstructors() {
$.ajax({
        type: "GET",
        url: "/api/instructors/show",
        dataType: "json",
        success: function(response) {
            var lastInstructor = localStorage.getItem('Instructor');
            instructorList = [];

            try {
                $.each(response, function (index, topic) {
                    instructorList.push([topic.id, topic.instructor])
                    $('#instructor').append(new Option(topic.instructor, topic.id, true, topic.id == lastInstructor));
                });
            } catch(err) {
                $.each(response, function (index, topic) {
                    $('#instructor').append(new Option(topic.instructor, topic.id, true, false));
                });
            }

        }
    });
}

function fillCategories() {
$.ajax({
        type: "GET",
        url: "/api/categories/show",
        dataType: "json",
        success: function(response) {
            $.each(response, function (index, topic) {
                $('#category').append(new Option(topic.category, topic.id, true, false));
            });
        }
    });
}


function fillCourses(category) {
$.ajax({
        type: "GET",
        url: "/api/courses/show/"+category,
        dataType: "json",
        success: function(response) {
            $('#course').html("");
            $.each(response, function (index, topic) {
                $('#course').append(new Option(topic.course, topic.id, true, false));
            });
        }
    });
}

function fillPlaces() {
$.ajax({
        type: "GET",
        url: "/api/places/show",
        dataType: "json",
        success: function(response) {
            $.each(response, function (index, topic) {
                $('#place').append(new Option(topic.place, topic.id, true, false));
            });
        }
    });
}

function fillPoints() {
$.ajax({
        type: "GET",
        url: "/api/points/show",
        dataType: "json",
        success: function(response) {
            $.each(response, function (index, topic) {
                $('#point').append(new Option(topic.point, topic.id, true, false));
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

function fillCountries() {

    var nationalityContent = "<select id='nationality'><option title='Afghanistan' alt='Afghanistan' value='Afghanistan'>Afghanistan</option><option title='Albania' alt='Albania' value='Albania'>Albania</option><option title='Algeria' alt='Algeria' value='Algeria'>Algeria</option><option title='American Samoa' alt='American Samoa' value='American Samoa'>American Samoa</option><option title='Andorra' alt='Andorra' value='Andorra'>Andorra</option><option title='Angola' alt='Angola' value='Angola'>Angola</option><option title='Anguilla' alt='Anguilla' value='Anguilla'>Anguilla</option><option title='Antarctica' alt='Antarctica' value='Antarctica'>Antarctica</option><option title='Argentina' alt='Argentina' value='Argentina'>Argentina</option><option title='Armenia' alt='Armenia' value='Armenia'>Armenia</option><option title='Australia' alt='Australia' value='Australia'>Australia</option><option title='Austria' alt='Austria' value='Austria'>Austria</option><option title='Azerbaijan' alt='Azerbaijan' value='Azerbaijan'>Azerbaijan</option><option title='Bahamas' alt='Bahamas' value='Bahamas'>Bahamas</option><option title='Bahrain' alt='Bahrain' value='Bahrain'>Bahrain</option><option title='Bangladesh' alt='Bangladesh' value='Bangladesh'>Bangladesh</option><option title='Barbados' alt='Barbados' value='Barbados'>Barbados</option><option title='Belarus' alt='Belarus' value='Belarus'>Belarus</option><option title='Belgium' alt='Belgium' value='Belgium'>Belgium</option><option title='Belize' alt='Belize' value='Belize'>Belize</option><option title='Benin' alt='Benin' value='Benin'>Benin</option><option title='Bhutan' alt='Bhutan' value='Bhutan'>Bhutan</option><option title='Bolivia' alt='Bolivia' value='Bolivia'>Bolivia</option><option title='Bosnia And Herzegovina' alt='Bosnia And Herzegovina' value='Bosnia And Herzegovina'>Bosnia And Herzegovina</option><option title='Botswana' alt='Botswana' value='Botswana'>Botswana</option><option title='Brazil' alt='Brazil' value='Brazil'>Brazil</option><option title='Brunei Darussalam' alt='Brunei Darussalam' value='Brunei Darussalam'>Brunei Darussalam</option><option title='Bulgaria' alt='Bulgaria' value='Bulgaria'>Bulgaria</option><option title='Burkina Faso' alt='Burkina Faso' value='Burkina Faso'>Burkina Faso</option><option title='Burundi' alt='Burundi' value='Burundi'>Burundi</option><option title='Cambodia' alt='Cambodia' value='Cambodia'>Cambodia</option><option title='Cameroon' alt='Cameroon' value='Cameroon'>Cameroon</option><option title='Canada' alt='Canada' value='Canada'>Canada</option><option title='Cape Verde' alt='Cape Verde' value='Cape Verde'>Cape Verde</option><option title='Cayman Islands' alt='Cayman Islands' value='Cayman Islands'>Cayman Islands</option><option title='Central African Republic' alt='Central African Republic' value='Central African Republic'>Central African Republic</option><option title='Chad' alt='Chad' value='Chad'>Chad</option><option title='Chile' alt='Chile' value='Chile'>Chile</option><option title='China' alt='China' value='China'>China</option><option title='Colombia' alt='Colombia' value='Colombia'>Colombia</option><option title='Comoros' alt='Comoros' value='Comoros'>Comoros</option><option title='Congo Brazzaville' alt='Congo Brazzaville' value='Congo Brazzaville'>Congo Brazzaville</option><option title='Congo Kinshasa' alt='Congo Kinshasa' value='Congo Kinshasa'>Congo Kinshasa</option><option title='Costa Rica' alt='Costa Rica' value='Costa Rica'>Costa Rica</option><option title='Croatia (hrvatska)' alt='Croatia (hrvatska)' value='Croatia (hrvatska)'>Croatia (hrvatska)</option><option title='Cuba' alt='Cuba' value='Cuba'>Cuba</option><option title='Cyprus' alt='Cyprus' value='Cyprus'>Cyprus</option><option title='Czech Republic' alt='Czech Republic' value='Czech Republic'>Czech Republic</option><option title='Denmark' alt='Denmark' value='Denmark'>Denmark</option><option title='Djibouti' alt='Djibouti' value='Djibouti'>Djibouti</option><option title='Dominican Republic' alt='Dominican Republic' value='Dominican Republic'>Dominican Republic</option><option title='East Timor' alt='East Timor' value='East Timor'>East Timor</option><option title='Ecuador' alt='Ecuador' value='Ecuador'>Ecuador</option><option selected title='Egypt' alt='Egypt' value='Egypt'>Egypt</option><option title='El Salvador' alt='El Salvador' value='El Salvador'>El Salvador</option><option title='Equatorial Guinea' alt='Equatorial Guinea' value='Equatorial Guinea'>Equatorial Guinea</option><option title='Eritrea' alt='Eritrea' value='Eritrea'>Eritrea</option><option title='Estonia' alt='Estonia' value='Estonia'>Estonia</option><option title='Ethiopia' alt='Ethiopia' value='Ethiopia'>Ethiopia</option><option title='Fiji' alt='Fiji' value='Fiji'>Fiji</option><option title='Finland' alt='Finland' value='Finland'>Finland</option><option title='France' alt='France' value='France'>France</option><option title='Gabon' alt='Gabon' value='Gabon'>Gabon</option><option title='Gambia' alt='Gambia' value='Gambia'>Gambia</option><option title='Georgia' alt='Georgia' value='Georgia'>Georgia</option><option title='Germany' alt='Germany' value='Germany'>Germany</option><option title='Ghana' alt='Ghana' value='Ghana'>Ghana</option><option title='Great Britain (uk)' alt='Great Britain (uk)' value='Great Britain (uk)'>Great Britain (uk)</option><option title='Greece' alt='Greece' value='Greece'>Greece</option><option title='Grenada' alt='Grenada' value='Grenada'>Grenada</option><option title='Guatemala' alt='Guatemala' value='Guatemala'>Guatemala</option><option title='Guinea' alt='Guinea' value='Guinea'>Guinea</option><option title='Guyana' alt='Guyana' value='Guyana'>Guyana</option><option title='Haiti' alt='Haiti' value='Haiti'>Haiti</option><option title='Honduras' alt='Honduras' value='Honduras'>Honduras</option><option title='Hong Kong' alt='Hong Kong' value='Hong Kong'>Hong Kong</option><option title='Hungary' alt='Hungary' value='Hungary'>Hungary</option><option title='Iceland' alt='Iceland' value='Iceland'>Iceland</option><option title='India' alt='India' value='India'>India</option><option title='Indonesia' alt='Indonesia' value='Indonesia'>Indonesia</option><option title='Iran' alt='Iran' value='Iran'>Iran</option><option title='Iraq' alt='Iraq' value='Iraq'>Iraq</option><option title='Ireland' alt='Ireland' value='Ireland'>Ireland</option><option title='Israel' alt='Israel' value='Israel'>Israel</option><option title='Italy' alt='Italy' value='Italy'>Italy</option><option title='Ivory Coast' alt='Ivory Coast' value='Ivory Coast'>Ivory Coast</option><option title='Jamaica' alt='Jamaica' value='Jamaica'>Jamaica</option><option title='Japan' alt='Japan' value='Japan'>Japan</option><option title='Jordan' alt='Jordan' value='Jordan'>Jordan</option><option title='Kazakhstan' alt='Kazakhstan' value='Kazakhstan'>Kazakhstan</option><option title='Kenya' alt='Kenya' value='Kenya'>Kenya</option><option title='Korea (north)' alt='Korea (north)' value='Korea (north)'>Korea (north)</option><option title='Korea (south)' alt='Korea (south)' value='Korea (south)'>Korea (south)</option><option title='Kosovo' alt='Kosovo' value='Kosovo'>Kosovo</option><option title='Kuwait' alt='Kuwait' value='Kuwait'>Kuwait</option><option title='Kyrgyzstan' alt='Kyrgyzstan' value='Kyrgyzstan'>Kyrgyzstan</option><option title='Laos' alt='Laos' value='Laos'>Laos</option><option title='Latvia' alt='Latvia' value='Latvia'>Latvia</option><option title='Lebanon' alt='Lebanon' value='Lebanon'>Lebanon</option><option title='Lesotho' alt='Lesotho' value='Lesotho'>Lesotho</option><option title='Liberia' alt='Liberia' value='Liberia'>Liberia</option><option title='Libya' alt='Libya' value='Libya'>Libya</option><option title='Lithuania' alt='Lithuania' value='Lithuania'>Lithuania</option><option title='Luxembourg' alt='Luxembourg' value='Luxembourg'>Luxembourg</option><option title='Macau' alt='Macau' value='Macau'>Macau</option><option title='Macedonia' alt='Macedonia' value='Macedonia'>Macedonia</option><option title='Madagascar' alt='Madagascar' value='Madagascar'>Madagascar</option><option title='Malawi' alt='Malawi' value='Malawi'>Malawi</option><option title='Malaysia' alt='Malaysia' value='Malaysia'>Malaysia</option><option title='Maldives' alt='Maldives' value='Maldives'>Maldives</option><option title='Mali' alt='Mali' value='Mali'>Mali</option><option title='Malta' alt='Malta' value='Malta'>Malta</option><option title='Marshall Islands' alt='Marshall Islands' value='Marshall Islands'>Marshall Islands</option><option title='Mauritania' alt='Mauritania' value='Mauritania'>Mauritania</option><option title='Mauritius' alt='Mauritius' value='Mauritius'>Mauritius</option><option title='Mexico' alt='Mexico' value='Mexico'>Mexico</option><option title='Moldova' alt='Moldova' value='Moldova'>Moldova</option><option title='Monaco' alt='Monaco' value='Monaco'>Monaco</option><option title='Mongolia' alt='Mongolia' value='Mongolia'>Mongolia</option><option title='Montenegro' alt='Montenegro' value='Montenegro'>Montenegro</option><option title='Morocco' alt='Morocco' value='Morocco'>Morocco</option><option title='Mozambique' alt='Mozambique' value='Mozambique'>Mozambique</option><option title='Myanmar' alt='Myanmar' value='Myanmar'>Myanmar</option><option title='Namibia' alt='Namibia' value='Namibia'>Namibia</option><option title='Nepal' alt='Nepal' value='Nepal'>Nepal</option><option title='Netherlands' alt='Netherlands' value='Netherlands'>Netherlands</option><option title='Netherlands Antilles' alt='Netherlands Antilles' value='Netherlands Antilles'>Netherlands Antilles</option><option title='New Zealand' alt='New Zealand' value='New Zealand'>New Zealand</option><option title='Nicaragua' alt='Nicaragua' value='Nicaragua'>Nicaragua</option><option title='Niger' alt='Niger' value='Niger'>Niger</option><option title='Nigeria' alt='Nigeria' value='Nigeria'>Nigeria</option><option title='Norway' alt='Norway' value='Norway'>Norway</option><option title='Oman' alt='Oman' value='Oman'>Oman</option><option title='Other' alt='Other' value='Other'>Other</option><option title='Pakistan' alt='Pakistan' value='Pakistan'>Pakistan</option><option title='Palestine' alt='Palestine' value='Palestine'>Palestine</option><option title='Panama' alt='Panama' value='Panama'>Panama</option><option title='Papua New Guinea' alt='Papua New Guinea' value='Papua New Guinea'>Papua New Guinea</option><option title='Paraguay' alt='Paraguay' value='Paraguay'>Paraguay</option><option title='Peru' alt='Peru' value='Peru'>Peru</option><option title='Philippines' alt='Philippines' value='Philippines'>Philippines</option><option title='Poland' alt='Poland' value='Poland'>Poland</option><option title='Portugal' alt='Portugal' value='Portugal'>Portugal</option><option title='Puerto Rico' alt='Puerto Rico' value='Puerto Rico'>Puerto Rico</option><option title='Qatar' alt='Qatar' value='Qatar'>Qatar</option><option title='Romania' alt='Romania' value='Romania'>Romania</option><option title='Russian Federation' alt='Russian Federation' value='Russian Federation'>Russian Federation</option><option title='Rwanda' alt='Rwanda' value='Rwanda'>Rwanda</option><option title='San Marino' alt='San Marino' value='San Marino'>San Marino</option><option title='Saudi Arabia' alt='Saudi Arabia' value='Saudi Arabia'>Saudi Arabia</option><option title='Senegal' alt='Senegal' value='Senegal'>Senegal</option><option title='Serbia' alt='Serbia' value='Serbia'>Serbia</option><option title='Seychelles' alt='Seychelles' value='Seychelles'>Seychelles</option><option title='Sierra Leone' alt='Sierra Leone' value='Sierra Leone'>Sierra Leone</option><option title='Singapore' alt='Singapore' value='Singapore'>Singapore</option><option title='Slovak Republic' alt='Slovak Republic' value='Slovak Republic'>Slovak Republic</option><option title='Slovenia' alt='Slovenia' value='Slovenia'>Slovenia</option><option title='Somalia' alt='Somalia' value='Somalia'>Somalia</option><option title='South Africa' alt='South Africa' value='South Africa'>South Africa</option><option title='South Sudan' alt='South Sudan' value='South Sudan'>South Sudan</option><option title='Spain' alt='Spain' value='Spain'>Spain</option><option title='Sri Lanka' alt='Sri Lanka' value='Sri Lanka'>Sri Lanka</option><option title='Sudan' alt='Sudan' value='Sudan'>Sudan</option><option title='Suriname' alt='Suriname' value='Suriname'>Suriname</option><option title='Swaziland' alt='Swaziland' value='Swaziland'>Swaziland</option><option title='Sweden' alt='Sweden' value='Sweden'>Sweden</option><option title='Switzerland' alt='Switzerland' value='Switzerland'>Switzerland</option><option title='Syria' alt='Syria' value='Syria'>Syria</option><option title='Taiwan' alt='Taiwan' value='Taiwan'>Taiwan</option><option title='Tajikistan' alt='Tajikistan' value='Tajikistan'>Tajikistan</option><option title='Tanzania' alt='Tanzania' value='Tanzania'>Tanzania</option><option title='Thailand' alt='Thailand' value='Thailand'>Thailand</option><option title='Togo' alt='Togo' value='Togo'>Togo</option><option title='Tonga' alt='Tonga' value='Tonga'>Tonga</option><option title='Trinidad And Tobago' alt='Trinidad And Tobago' value='Trinidad And Tobago'>Trinidad And Tobago</option><option title='Tunisia' alt='Tunisia' value='Tunisia'>Tunisia</option><option title='Turkey' alt='Turkey' value='Turkey'>Turkey</option><option title='Turkmenistan' alt='Turkmenistan' value='Turkmenistan'>Turkmenistan</option><option title='Tuvalu' alt='Tuvalu' value='Tuvalu'>Tuvalu</option><option title='Uganda' alt='Uganda' value='Uganda'>Uganda</option><option title='Ukraine' alt='Ukraine' value='Ukraine'>Ukraine</option><option title='United Arab Emirates' alt='United Arab Emirates' value='United Arab Emirates'>United Arab Emirates</option><option title='United Kingdom' alt='United Kingdom' value='United Kingdom'>United Kingdom</option><option title='United States' alt='United States' value='United States'>United States</option><option title='Uruguay' alt='Uruguay' value='Uruguay'>Uruguay</option><option title='Uzbekistan' alt='Uzbekistan' value='Uzbekistan'>Uzbekistan</option><option title='Vatican City State (holy See)' alt='Vatican City State (holy See)' value='Vatican City State (holy See)'>Vatican City State (holy See)</option><option title='Venezuela' alt='Venezuela' value='Venezuela'>Venezuela</option><option title='Vietnam' alt='Vietnam' value='Vietnam'>Vietnam</option><option title='Western Sahara' alt='Western Sahara' value='Western Sahara'>Western Sahara</option><option title='Yemen' alt='Yemen' value='Yemen'>Yemen</option><option title='Yugoslavia' alt='Yugoslavia' value='Yugoslavia'>Yugoslavia</option><option title='Zambia' alt='Zambia' value='Zambia'>Zambia</option><option title='Zimbabwe' alt='Zimbabwe' value='Zimbabwe'>Zimbabwe</option></select>";
    var countryContent = "<select id='country' required><option title='Afghanistan' alt='Afghanistan' value='Afghanistan'>Afghanistan</option><option title='Albania' alt='Albania' value='Albania'>Albania</option><option title='Algeria' alt='Algeria' value='Algeria'>Algeria</option><option title='American Samoa' alt='American Samoa' value='American Samoa'>American Samoa</option><option title='Andorra' alt='Andorra' value='Andorra'>Andorra</option><option title='Angola' alt='Angola' value='Angola'>Angola</option><option title='Anguilla' alt='Anguilla' value='Anguilla'>Anguilla</option><option title='Antarctica' alt='Antarctica' value='Antarctica'>Antarctica</option><option title='Argentina' alt='Argentina' value='Argentina'>Argentina</option><option title='Armenia' alt='Armenia' value='Armenia'>Armenia</option><option title='Australia' alt='Australia' value='Australia'>Australia</option><option title='Austria' alt='Austria' value='Austria'>Austria</option><option title='Azerbaijan' alt='Azerbaijan' value='Azerbaijan'>Azerbaijan</option><option title='Bahamas' alt='Bahamas' value='Bahamas'>Bahamas</option><option title='Bahrain' alt='Bahrain' value='Bahrain'>Bahrain</option><option title='Bangladesh' alt='Bangladesh' value='Bangladesh'>Bangladesh</option><option title='Barbados' alt='Barbados' value='Barbados'>Barbados</option><option title='Belarus' alt='Belarus' value='Belarus'>Belarus</option><option title='Belgium' alt='Belgium' value='Belgium'>Belgium</option><option title='Belize' alt='Belize' value='Belize'>Belize</option><option title='Benin' alt='Benin' value='Benin'>Benin</option><option title='Bhutan' alt='Bhutan' value='Bhutan'>Bhutan</option><option title='Bolivia' alt='Bolivia' value='Bolivia'>Bolivia</option><option title='Bosnia And Herzegovina' alt='Bosnia And Herzegovina' value='Bosnia And Herzegovina'>Bosnia And Herzegovina</option><option title='Botswana' alt='Botswana' value='Botswana'>Botswana</option><option title='Brazil' alt='Brazil' value='Brazil'>Brazil</option><option title='Brunei Darussalam' alt='Brunei Darussalam' value='Brunei Darussalam'>Brunei Darussalam</option><option title='Bulgaria' alt='Bulgaria' value='Bulgaria'>Bulgaria</option><option title='Burkina Faso' alt='Burkina Faso' value='Burkina Faso'>Burkina Faso</option><option title='Burundi' alt='Burundi' value='Burundi'>Burundi</option><option title='Cambodia' alt='Cambodia' value='Cambodia'>Cambodia</option><option title='Cameroon' alt='Cameroon' value='Cameroon'>Cameroon</option><option title='Canada' alt='Canada' value='Canada'>Canada</option><option title='Cape Verde' alt='Cape Verde' value='Cape Verde'>Cape Verde</option><option title='Cayman Islands' alt='Cayman Islands' value='Cayman Islands'>Cayman Islands</option><option title='Central African Republic' alt='Central African Republic' value='Central African Republic'>Central African Republic</option><option title='Chad' alt='Chad' value='Chad'>Chad</option><option title='Chile' alt='Chile' value='Chile'>Chile</option><option title='China' alt='China' value='China'>China</option><option title='Colombia' alt='Colombia' value='Colombia'>Colombia</option><option title='Comoros' alt='Comoros' value='Comoros'>Comoros</option><option title='Congo Brazzaville' alt='Congo Brazzaville' value='Congo Brazzaville'>Congo Brazzaville</option><option title='Congo Kinshasa' alt='Congo Kinshasa' value='Congo Kinshasa'>Congo Kinshasa</option><option title='Costa Rica' alt='Costa Rica' value='Costa Rica'>Costa Rica</option><option title='Croatia (hrvatska)' alt='Croatia (hrvatska)' value='Croatia (hrvatska)'>Croatia (hrvatska)</option><option title='Cuba' alt='Cuba' value='Cuba'>Cuba</option><option title='Cyprus' alt='Cyprus' value='Cyprus'>Cyprus</option><option title='Czech Republic' alt='Czech Republic' value='Czech Republic'>Czech Republic</option><option title='Denmark' alt='Denmark' value='Denmark'>Denmark</option><option title='Djibouti' alt='Djibouti' value='Djibouti'>Djibouti</option><option title='Dominican Republic' alt='Dominican Republic' value='Dominican Republic'>Dominican Republic</option><option title='East Timor' alt='East Timor' value='East Timor'>East Timor</option><option title='Ecuador' alt='Ecuador' value='Ecuador'>Ecuador</option><option selected title='Egypt' alt='Egypt' value='Egypt'>Egypt</option><option title='El Salvador' alt='El Salvador' value='El Salvador'>El Salvador</option><option title='Equatorial Guinea' alt='Equatorial Guinea' value='Equatorial Guinea'>Equatorial Guinea</option><option title='Eritrea' alt='Eritrea' value='Eritrea'>Eritrea</option><option title='Estonia' alt='Estonia' value='Estonia'>Estonia</option><option title='Ethiopia' alt='Ethiopia' value='Ethiopia'>Ethiopia</option><option title='Fiji' alt='Fiji' value='Fiji'>Fiji</option><option title='Finland' alt='Finland' value='Finland'>Finland</option><option title='France' alt='France' value='France'>France</option><option title='Gabon' alt='Gabon' value='Gabon'>Gabon</option><option title='Gambia' alt='Gambia' value='Gambia'>Gambia</option><option title='Georgia' alt='Georgia' value='Georgia'>Georgia</option><option title='Germany' alt='Germany' value='Germany'>Germany</option><option title='Ghana' alt='Ghana' value='Ghana'>Ghana</option><option title='Great Britain (uk)' alt='Great Britain (uk)' value='Great Britain (uk)'>Great Britain (uk)</option><option title='Greece' alt='Greece' value='Greece'>Greece</option><option title='Grenada' alt='Grenada' value='Grenada'>Grenada</option><option title='Guatemala' alt='Guatemala' value='Guatemala'>Guatemala</option><option title='Guinea' alt='Guinea' value='Guinea'>Guinea</option><option title='Guyana' alt='Guyana' value='Guyana'>Guyana</option><option title='Haiti' alt='Haiti' value='Haiti'>Haiti</option><option title='Honduras' alt='Honduras' value='Honduras'>Honduras</option><option title='Hong Kong' alt='Hong Kong' value='Hong Kong'>Hong Kong</option><option title='Hungary' alt='Hungary' value='Hungary'>Hungary</option><option title='Iceland' alt='Iceland' value='Iceland'>Iceland</option><option title='India' alt='India' value='India'>India</option><option title='Indonesia' alt='Indonesia' value='Indonesia'>Indonesia</option><option title='Iran' alt='Iran' value='Iran'>Iran</option><option title='Iraq' alt='Iraq' value='Iraq'>Iraq</option><option title='Ireland' alt='Ireland' value='Ireland'>Ireland</option><option title='Israel' alt='Israel' value='Israel'>Israel</option><option title='Italy' alt='Italy' value='Italy'>Italy</option><option title='Ivory Coast' alt='Ivory Coast' value='Ivory Coast'>Ivory Coast</option><option title='Jamaica' alt='Jamaica' value='Jamaica'>Jamaica</option><option title='Japan' alt='Japan' value='Japan'>Japan</option><option title='Jordan' alt='Jordan' value='Jordan'>Jordan</option><option title='Kazakhstan' alt='Kazakhstan' value='Kazakhstan'>Kazakhstan</option><option title='Kenya' alt='Kenya' value='Kenya'>Kenya</option><option title='Korea (north)' alt='Korea (north)' value='Korea (north)'>Korea (north)</option><option title='Korea (south)' alt='Korea (south)' value='Korea (south)'>Korea (south)</option><option title='Kosovo' alt='Kosovo' value='Kosovo'>Kosovo</option><option title='Kuwait' alt='Kuwait' value='Kuwait'>Kuwait</option><option title='Kyrgyzstan' alt='Kyrgyzstan' value='Kyrgyzstan'>Kyrgyzstan</option><option title='Laos' alt='Laos' value='Laos'>Laos</option><option title='Latvia' alt='Latvia' value='Latvia'>Latvia</option><option title='Lebanon' alt='Lebanon' value='Lebanon'>Lebanon</option><option title='Lesotho' alt='Lesotho' value='Lesotho'>Lesotho</option><option title='Liberia' alt='Liberia' value='Liberia'>Liberia</option><option title='Libya' alt='Libya' value='Libya'>Libya</option><option title='Lithuania' alt='Lithuania' value='Lithuania'>Lithuania</option><option title='Luxembourg' alt='Luxembourg' value='Luxembourg'>Luxembourg</option><option title='Macau' alt='Macau' value='Macau'>Macau</option><option title='Macedonia' alt='Macedonia' value='Macedonia'>Macedonia</option><option title='Madagascar' alt='Madagascar' value='Madagascar'>Madagascar</option><option title='Malawi' alt='Malawi' value='Malawi'>Malawi</option><option title='Malaysia' alt='Malaysia' value='Malaysia'>Malaysia</option><option title='Maldives' alt='Maldives' value='Maldives'>Maldives</option><option title='Mali' alt='Mali' value='Mali'>Mali</option><option title='Malta' alt='Malta' value='Malta'>Malta</option><option title='Marshall Islands' alt='Marshall Islands' value='Marshall Islands'>Marshall Islands</option><option title='Mauritania' alt='Mauritania' value='Mauritania'>Mauritania</option><option title='Mauritius' alt='Mauritius' value='Mauritius'>Mauritius</option><option title='Mexico' alt='Mexico' value='Mexico'>Mexico</option><option title='Moldova' alt='Moldova' value='Moldova'>Moldova</option><option title='Monaco' alt='Monaco' value='Monaco'>Monaco</option><option title='Mongolia' alt='Mongolia' value='Mongolia'>Mongolia</option><option title='Montenegro' alt='Montenegro' value='Montenegro'>Montenegro</option><option title='Morocco' alt='Morocco' value='Morocco'>Morocco</option><option title='Mozambique' alt='Mozambique' value='Mozambique'>Mozambique</option><option title='Myanmar' alt='Myanmar' value='Myanmar'>Myanmar</option><option title='Namibia' alt='Namibia' value='Namibia'>Namibia</option><option title='Nepal' alt='Nepal' value='Nepal'>Nepal</option><option title='Netherlands' alt='Netherlands' value='Netherlands'>Netherlands</option><option title='Netherlands Antilles' alt='Netherlands Antilles' value='Netherlands Antilles'>Netherlands Antilles</option><option title='New Zealand' alt='New Zealand' value='New Zealand'>New Zealand</option><option title='Nicaragua' alt='Nicaragua' value='Nicaragua'>Nicaragua</option><option title='Niger' alt='Niger' value='Niger'>Niger</option><option title='Nigeria' alt='Nigeria' value='Nigeria'>Nigeria</option><option title='Norway' alt='Norway' value='Norway'>Norway</option><option title='Oman' alt='Oman' value='Oman'>Oman</option><option title='Other' alt='Other' value='Other'>Other</option><option title='Pakistan' alt='Pakistan' value='Pakistan'>Pakistan</option><option title='Palestine' alt='Palestine' value='Palestine'>Palestine</option><option title='Panama' alt='Panama' value='Panama'>Panama</option><option title='Papua New Guinea' alt='Papua New Guinea' value='Papua New Guinea'>Papua New Guinea</option><option title='Paraguay' alt='Paraguay' value='Paraguay'>Paraguay</option><option title='Peru' alt='Peru' value='Peru'>Peru</option><option title='Philippines' alt='Philippines' value='Philippines'>Philippines</option><option title='Poland' alt='Poland' value='Poland'>Poland</option><option title='Portugal' alt='Portugal' value='Portugal'>Portugal</option><option title='Puerto Rico' alt='Puerto Rico' value='Puerto Rico'>Puerto Rico</option><option title='Qatar' alt='Qatar' value='Qatar'>Qatar</option><option title='Romania' alt='Romania' value='Romania'>Romania</option><option title='Russian Federation' alt='Russian Federation' value='Russian Federation'>Russian Federation</option><option title='Rwanda' alt='Rwanda' value='Rwanda'>Rwanda</option><option title='San Marino' alt='San Marino' value='San Marino'>San Marino</option><option title='Saudi Arabia' alt='Saudi Arabia' value='Saudi Arabia'>Saudi Arabia</option><option title='Senegal' alt='Senegal' value='Senegal'>Senegal</option><option title='Serbia' alt='Serbia' value='Serbia'>Serbia</option><option title='Seychelles' alt='Seychelles' value='Seychelles'>Seychelles</option><option title='Sierra Leone' alt='Sierra Leone' value='Sierra Leone'>Sierra Leone</option><option title='Singapore' alt='Singapore' value='Singapore'>Singapore</option><option title='Slovak Republic' alt='Slovak Republic' value='Slovak Republic'>Slovak Republic</option><option title='Slovenia' alt='Slovenia' value='Slovenia'>Slovenia</option><option title='Somalia' alt='Somalia' value='Somalia'>Somalia</option><option title='South Africa' alt='South Africa' value='South Africa'>South Africa</option><option title='South Sudan' alt='South Sudan' value='South Sudan'>South Sudan</option><option title='Spain' alt='Spain' value='Spain'>Spain</option><option title='Sri Lanka' alt='Sri Lanka' value='Sri Lanka'>Sri Lanka</option><option title='Sudan' alt='Sudan' value='Sudan'>Sudan</option><option title='Suriname' alt='Suriname' value='Suriname'>Suriname</option><option title='Swaziland' alt='Swaziland' value='Swaziland'>Swaziland</option><option title='Sweden' alt='Sweden' value='Sweden'>Sweden</option><option title='Switzerland' alt='Switzerland' value='Switzerland'>Switzerland</option><option title='Syria' alt='Syria' value='Syria'>Syria</option><option title='Taiwan' alt='Taiwan' value='Taiwan'>Taiwan</option><option title='Tajikistan' alt='Tajikistan' value='Tajikistan'>Tajikistan</option><option title='Tanzania' alt='Tanzania' value='Tanzania'>Tanzania</option><option title='Thailand' alt='Thailand' value='Thailand'>Thailand</option><option title='Togo' alt='Togo' value='Togo'>Togo</option><option title='Tonga' alt='Tonga' value='Tonga'>Tonga</option><option title='Trinidad And Tobago' alt='Trinidad And Tobago' value='Trinidad And Tobago'>Trinidad And Tobago</option><option title='Tunisia' alt='Tunisia' value='Tunisia'>Tunisia</option><option title='Turkey' alt='Turkey' value='Turkey'>Turkey</option><option title='Turkmenistan' alt='Turkmenistan' value='Turkmenistan'>Turkmenistan</option><option title='Tuvalu' alt='Tuvalu' value='Tuvalu'>Tuvalu</option><option title='Uganda' alt='Uganda' value='Uganda'>Uganda</option><option title='Ukraine' alt='Ukraine' value='Ukraine'>Ukraine</option><option title='United Arab Emirates' alt='United Arab Emirates' value='United Arab Emirates'>United Arab Emirates</option><option title='United Kingdom' alt='United Kingdom' value='United Kingdom'>United Kingdom</option><option title='United States' alt='United States' value='United States'>United States</option><option title='Uruguay' alt='Uruguay' value='Uruguay'>Uruguay</option><option title='Uzbekistan' alt='Uzbekistan' value='Uzbekistan'>Uzbekistan</option><option title='Vatican City State (holy See)' alt='Vatican City State (holy See)' value='Vatican City State (holy See)'>Vatican City State (holy See)</option><option title='Venezuela' alt='Venezuela' value='Venezuela'>Venezuela</option><option title='Vietnam' alt='Vietnam' value='Vietnam'>Vietnam</option><option title='Western Sahara' alt='Western Sahara' value='Western Sahara'>Western Sahara</option><option title='Yemen' alt='Yemen' value='Yemen'>Yemen</option><option title='Yugoslavia' alt='Yugoslavia' value='Yugoslavia'>Yugoslavia</option><option title='Zambia' alt='Zambia' value='Zambia'>Zambia</option><option title='Zimbabwe' alt='Zimbabwe' value='Zimbabwe'>Zimbabwe</option></select>";
    $.get("../country.html", function(data) {
        $("#nationality-container").html(nationalityContent);
        $("#country-container").html(countryContent);
    });
}


function showResult(succeeded) {
    if (succeeded) {
        $('.modal-body').text('Registration Sent Successfully!');
        $('.modal-header').removeClass('modal-header-fail');
        $('#myModal').modal('toggle');
    } else {
        $('.modal-body').text('Oops! Registration Not Sent!');
        $('.modal-header').addClass('modal-header-fail');
        $('#myModal').modal('toggle');
    }
}

function showWrongInstructor() {
    $('.modal-body').text('Oops, instructor name is incorrect!');
    $('.modal-header').addClass('modal-header-fail');
    $('#myModal').modal('toggle');
}

function getInstructorId(instructorName) {
    result = 0;
    instructorList.forEach(function(instructor) {
        if (instructor[1] === instructorName) {
            result = instructor[0];
        }
    })
    return result
}

function inputOrSelection() {
    var isNotApp = browserOrApp();
    if (isNotApp) {
        $('#instructor-text').prop('disabled', true);

    } else {
        $('#instructor-insert').removeClass('hide');
        $('#instructor-select').addClass('hide');
        $('#instructor-text').prop('disabled', false);
        $('#instructor').prop('disabled', true)
    }

}

function browserOrApp() {
    result = false;
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera || isFirefox || isSafari || isIE || isEdge || isChrome || isBlink) {
        result = true;
    }
    return result;
}
