from app import models, db, stores

dummy_courses = [
    models.Course(id=1, course='Aqua Dive'),
    models.Course(id=2, course='First Aids'),
    models.Course(id=3, course='Walid'),
]


def seed_courses(course_store):
    db.drop_all()
    db.create_all()

    for course in dummy_courses:
        course_store.add(course)


course_store = stores.CourseStore()
seed_courses(course_store)
