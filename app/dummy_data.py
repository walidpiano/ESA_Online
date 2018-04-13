from app import models, db, stores

dummy_courses = [
    models.Course(id=1, course='Aqua Dive'),
    models.Course(id=2, course='First Aids'),
    models.Course(id=3, course='Walid'),
]

dummy_instructor = [
    models.Instructor(id=1, instructor='renzo'),
    models.Instructor(id=2, instructor='walid'),
]

def seed_courses(course_store, instructor_store):
    db.drop_all()
    db.create_all()

    for course in dummy_courses:
        course_store.add(course)

    for instructor in dummy_instructor:
        instructor_store.add(instructor)


course_store = stores.CourseStore()
instructor_store = stores.InstructorStore()
seed_courses(course_store, instructor_store)
