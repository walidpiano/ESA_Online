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


class CourseStore(BaseStore):

    def __init__(self):
        super().__init__(models.Course)


