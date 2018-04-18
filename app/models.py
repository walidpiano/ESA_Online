from app import db
import datetime


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.Integer)
    course = db.Column(db.String(100))

    def __repr__(self):
        return f'Id: {self.id}, Category: {self.category}, Course Name: {self.course}'

    def as_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "course": self.course
        }


class Instructor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    instructor = db.Column(db.String(100))

    def __repr__(self):
        return f'ID: {self.id}, Instructor: {self.instructor}'

    def as_dict(self):
        return {
            "id": self.id,
            "instructor": self.instructor
        }


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100))

    def __repr__(self):
        return f'ID: {self.id}, Category: {self.category}'

    def as_dict(self):
        return {
            "id": self.id,
            "category": self.category
        }


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    place = db.Column(db.String(100))

    def __repr__(self):
        return f'ID: {self.id}, Place: {self.place}'

    def as_dict(self):
        return {
            "id": self.id,
            "place": self.place
        }


class Point(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    point = db.Column(db.String(100))

    def __repr__(self):
        return f'ID: {self.id}, Point: {self.point}'

    def as_dict(self):
        return {
            "id": self.id,
            "point": self.point
        }


class Registration:

    def __init__(self, student_image, instructor, category, course, place, point, student_type,
                 student_name, esa_number, tax_code, birth_year, birth_month, birth_day, nationality,
                 sex, birth_place, home_phone, cell_phone, country, state, city, zip_code, address,
                 email_address, comments):
        self.student_image = student_image
        self.instructor = instructor
        self.category = category
        self.course = course
        self.place = place
        self.point = point
        self.student_type = student_type
        self.student_name = student_name.title().strip().replace(";", " ")
        self.comments = comments.replace(";", " ")
        self.course_date = datetime.datetime.now()
        self.registration_date = datetime.datetime.now()

        if student_type == 'Old':
            self.esa_number = esa_number.upper().strip().replace(";", " ")
            self.tax_code = ''
            self.birth_date = 0
            self.nationality = ''
            self.sex = ''
            self.birth_place = ''
            self.home_phone = ''
            self.cell_phone = ''
            self.country = ''
            self.state = ''
            self.city = ''
            self.zip_code = ''
            self.address = ''
            self.email_address = ''
        else:
            self.esa_number = ''
            self.tax_code = tax_code.strip().replace(";", " ")
            self.birth_date = datetime.datetime(year=int(birth_year), month=int(birth_month), day=int(birth_day))
            self.nationality = nationality
            self.sex = sex
            self.birth_place = birth_place.title().strip().replace(";", " ")
            self.home_phone = home_phone.strip().replace(";", " ")
            self.cell_phone = cell_phone.strip().replace(";", " ")
            self.country = country
            self.state = state.title().strip().replace(";", " ")
            self.city = city.title().strip().replace(";", " ")
            self.zip_code = zip_code.strip().replace(";", " ")
            self.address = address.strip().replace(";", " ")
            self.email_address = email_address.lower().replace(";", " ")

    def as_dict(self):
        return {
            "student_image": 'Received',
            "instructor": self.instructor,
            "category": self.category,
            "course": self.course,
            "place": self.place,
            "point": self.point,
            "student_type": self.student_type,
            "student_name": self.student_name,
            "esa_number": self.esa_number,
            "tax_code": self.tax_code,
            "birth_date": self.birth_date,
            "nationality": self.nationality,
            "sex": self.sex,
            "birth_place": self.birth_place,
            "home_phone": self.home_phone,
            "cell_phone": self.cell_phone,
            "country": self.country,
            "state": self.state,
            "city": self.city,
            "zip_code": self.zip_code,
            "address": self.address,
            "email_address": self.email_address,
            "comments": self.comments,
            "course_date": self.course_date,
            "registration_date": self.registration_date
        }
