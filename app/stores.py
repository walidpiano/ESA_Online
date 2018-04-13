from app import models, db
from sqlalchemy import desc, func


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


class SendRegistration:

    @staticmethod
    def send_registration(registration):
        return registration
