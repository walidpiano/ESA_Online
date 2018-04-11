from app import models, db, stores

dummy_courses = [
    models.Course(id=1, course_name='Aqua Dive'),
    models.Course(id=2, course_name='First Aids'),
]


def seed_courses(course_store):
    db.drop_all()
    db.create_all()

    for course in dummy_courses:
        course_store.add(course)


course_store = stores.CourseStore()
seed_courses(course_store)
