import datetime
import time


dt1 = datetime.datetime(year=1986, month=10, day=25)
result1 = dt1.timestamp()

dt2 = datetime.datetime(year=2018, month=10, day=25)
result2 = dt2.timestamp()

result3 = dt2 - dt1

print(result3)
#result = dt.timestamp()

