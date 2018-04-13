from flask import jsonify

from app import stores, api

course_store = stores.CourseStore()

category = 2
result = [course.as_dict() for course in course_store.get_by_category(category)]

#result = jsonify(result)
print(result)
#print(jsonify(result))
