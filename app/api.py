from flask import render_template, request, redirect, url_for, jsonify, abort
from app import models
from app import app, stores
import pyodbc


@app.route("/api/courses/")
def get_courses():
    result = stores.CourseStore.get_all_courses()
    return jsonify(result)



@app.errorhandler(400)
def bad_request(error):
    return jsonify(message=error.description)
