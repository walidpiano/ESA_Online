import pyodbc


class Country:
    def __init__(self, id, name):
        self.id = id
        self.name = name


class State(Country):
    def __init__(self, id, country, name):
        self.id = id
        self.country = country
        self.name = name



class City(State):
    def __init__(self, id, state, name):
        self.id = id
        self.state = state
        self.name = name


class Course:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def as__dict(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Query:
    def run_query(string):
        result = []
        '''
        conn_str = (
            r'Driver={SQL Server};'
            r'Server=Walid-PC\Master;'
            r'Database=ESA_DB;'
            r'Trusted_Connection=yes;'
            )
        '''

        conn_str = (
            r'Driver={FreeTDS};'
            r'Server=ESAOnlineDB.mssql.somee.com;'
            r'Database=ESAOnlineDB;'
            r'uid=walid2_SQLLogin_1;'
            r'pwd=xpe82xp4a2;'
            )

        cnxn = pyodbc.connect(conn_str)
        cursor = cnxn.cursor()
        cursor.execute(string)
        for row in cursor:
            result.append(row)
        cnxn.close()
        return result


