from app import models


class CountryStore():

    @staticmethod
    def get_all_countries():
        result = models.Query.run_query('SELECT * FROM tblCountry ORDER BY Country;')
        return result


class StateStore():

    @staticmethod
    def get_all_states():
        result = models.Query.run_query('SELECT * FROM tblState ORDER BY StateName;')
        return result


class CityStore():

    @staticmethod
    def get_all_cities():
        result = models.Query.run_query('SELECT * FROM tblCity ORDER BY CityName;')
        return result

class CourseStore():

    @staticmethod
    def get_all_courses():
        query = models.Query.run_query('SELECT ID, CourseName FROM tblCourses ORDER BY CourseName;')
        result = []
        for e in query:
            course = models.Course(e[0], e[1])
            result.append(course.as__dict())
        return result

