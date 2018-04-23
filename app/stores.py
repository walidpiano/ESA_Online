import base64

from app import models, db, send_mail
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
        subject = f'ESA Registration ({registration.student_type})'
        message = f'''{registration.student_type};;{registration.category};{registration.place};{registration.point};{registration.course};{registration.instructor};{registration.course_date};{registration.student_name};{registration.esa_number};{registration.tax_code};{registration.birth_date};{registration.nationality};{registration.registration_date};{registration.sex};{registration.birth_place};{registration.home_phone};{registration.cell_phone};{registration.country};{registration.state};{registration.city};{registration.zip_code};{registration.address};{registration.email_address};{registration.comments}'''

        SendRegistration.save_pic(registration.student_image, registration.student_name)
        with_image = SendRegistration.save_pic(registration.student_image, registration.student_name)
        result = send_mail.send_mail(subject, message, with_image, registration.student_name)
        return result

    @staticmethod
    def save_pic(string_image, image_name):
        result = True
        if string_image == 'None':
            result = False
        else:
            start = string_image.find('base64,') + 6
            string_image = string_image[start:]
            image_data = base64.b64decode(string_image)

            with open(f'app/uploaded_images/{image_name}.jpg', 'wb') as f:
                f.write(image_data)
            result = True

        return result
