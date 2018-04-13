from flask import render_template, request, redirect, url_for, jsonify, abort
from app import models
from app import app, stores

course_store = stores.CourseStore()
instructor_store = stores.InstructorStore()

@app.route("/api/courses/get")
def get_courses():
    result = [course.as_dict() for course in course_store.get_all()]
    return jsonify(result)


@app.route("/api/courses/add", methods=["POST"])
def add_courses():
    request_data = request.get_json()
    course_store.delete()
    new_courses = []
    for course_row in request_data:
        new_course = models.Course(id=course_row['id'], course=course_row['course'])
        course_store.add(new_course)
        new_courses.append(new_course.as_dict())

    result = jsonify(new_courses)

    return result


@app.route("/api/instructors/get")
def get_instructors():
    result = [instructor.as_dict() for instructor in instructor_store.get_all()]
    return jsonify(result)


@app.route("/api/instructors/add", methods=["POST"])
def add_instructors():
    request_data = request.get_json()
    instructor_store.delete()
    new_instructors = []
    for instructor_row in request_data:
        new_instructor = models.Instructor(id=instructor_row['id'], instructor=instructor_row['instructor'])
        instructor_store.add(new_instructor)
        new_instructors.append(new_instructor.as_dict())

    result = jsonify(new_instructors)

    return result


@app.route("/api/register", methods=["POST"])
def new_registration():
    request_data = request.get_json()

    try:
        registration = models.Registration(student_image=request_data["student_image"],
                                           student_type=request_data["student_type"],
                                           full_name=request_data["full_name"],
                                           address=request_data["address"], country=request_data["country"],
                                           state=request_data["state"], city=request_data["city"],
                                           email_address=request_data["email_address"],
                                           birth_year=request_data["birth_year"],
                                           birth_month=request_data["birth_month"],
                                           birth_day=request_data["birth_day"], course=request_data["course"],
                                           comments=request_data["comments"])

        registration = stores.SendRegistration.send_registration(registration)
        result = jsonify(registration.as_dict())
    except KeyError:
        result = abort(400, f"couldn't parse the request data!")

    return result


@app.errorhandler(400)
def bad_request(error):
    return jsonify(message=error.description)
