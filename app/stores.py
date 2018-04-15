from app import models, db
from sqlalchemy import desc, func
from time import ctime


class BaseStore():
    def __init__(self, data_provider):
        self.data_provider = data_provider

    def get_all(self):
        return self.data_provider.query.all()

    def add(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def delete(self):
        result = self.data_provider.query.delete()
        db.session.commit()
        return result


class CourseStore(BaseStore):

    def __init__(self):
        super().__init__(models.Course)

    def get_by_category(self, category):
        return self.data_provider.query.filter_by(category=category)


class InstructorStore(BaseStore):

    def __init__(self):
        super().__init__(models.Instructor)


class CategoryStore(BaseStore):

    def __init__(self):
        super().__init__(models.Category)


class PlaceStore(BaseStore):

    def __init__(self):
        super().__init__(models.Place)


class PointStore(BaseStore):

    def __init__(self):
        super().__init__(models.Point)


class SendRegistration():

    @staticmethod
    def send_registration(registration):
        address = f'ESA Registration ({registration.student_type})'
        message = f'''{registration.student_type};;{registration.category};{registration.place};
        {registration.point};{registration.course};{registration.instructor};{registration.course_date};
        {registration.student_name};{registration.esa_number};{registration.tax_code};{registration.birth_date};
        {registration.nationality};{registration.registration_date};{registration.sex};{registration.birth_place};
        {registration.home_phone};{registration.cell_phone};{registration.country};{registration.state};
        {registration.city};{registration.zip_code};{registration.address};{registration.email_address};
        {registration.comments}'''

