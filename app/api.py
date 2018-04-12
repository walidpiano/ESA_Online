from flask import render_template, request, redirect, url_for, jsonify, abort
from app import models
from app import app, stores

course_store = stores.CourseStore()


@app.route("/api/courses/")
def get_courses():
    result = [course.as_dict() for course in course_store.get_all()]
    return jsonify(result)


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
