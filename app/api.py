from flask import render_template, request, redirect, url_for, jsonify, abort
from app import models
from app import app, stores

course_store = stores.CourseStore()


@app.route("/api/courses/")
def get_courses():
    result = [course.as_dict() for course in course_store.get_all()]
    return jsonify(result)


@app.errorhandler(400)
def bad_request(error):
    return jsonify(message=error.description)
