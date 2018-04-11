from app import dummy_data, stores, models

course_store = stores.CourseStore()
result = course_store.get_all()


courses = [course.as_dict() for course in course_store.get_all()]
print(courses)
