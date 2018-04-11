from app import db


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100))

    def __repr__(self):
        return f'Id: {self.id}, Course Name: {self.course_name}'

    def as_dict(self):
        return {
            "id": self.id,
            "course_name": self.course_name
        }
