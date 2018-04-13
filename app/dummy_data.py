from app import models, db, stores

dummy_courses = [
    models.Course(id=1, category=1, course='Aqua Dive'),
    models.Course(id=2, category=2, course='First Aids'),
    models.Course(id=3, category=2, course='Walid'),
]

dummy_instructor = [
    models.Instructor(id=1, instructor='renzo'),
    models.Instructor(id=2, instructor='walid'),
]

dummy_categories = [
    models.Category(id=1, category='prof'),
    models.Category(id=2, category='aqua'),
]

dummy_places = {
    models.Place(id=1, place='f place'),
    models.Place(id=2, place='s place')
}

def seed_courses(course_store, instructor_store, category_store, place_store):
    db.drop_all()
    db.create_all()

    for course in dummy_courses:
        course_store.add(course)

    for instructor in dummy_instructor:
        instructor_store.add(instructor)

    for category in dummy_categories:
        category_store.add(category)

    for place in dummy_places:
        place_store.add(place)


course_store = stores.CourseStore()
instructor_store = stores.InstructorStore()
category_store = stores.CategoryStore()
place_store = stores.PlaceStore()

seed_courses(course_store, instructor_store, category_store, place_store)
