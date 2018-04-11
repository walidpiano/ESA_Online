from flask import render_template, request, redirect, url_for, jsonify, abort
from app import models
from app import app


@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html")



@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html", message=error.description)
