__author__ = 'boy'
__date__ = '2020/3/12 13:14'

import MySQLdb
import datetime
import sys

sys.path.insert(0, './gitrepo/ithome/')       #添加环境变量，包的查找
from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD

def Judge2048():
    today = datetime.date.today()
    oneday = datetime.timedelta(days=1)
    yesterday = str(today-oneday)
    print(yesterday)

    db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
    cursor = db.cursor()

    sql = "SELECT * FROM ithome.activity_records2048 WHERE send_time='"+ yesterday +"' order by -score;"
    cursor.execute(sql)
    records = cursor.fetchall()


    ranking = 0
    for record in records:
        ranking = ranking + 1
        if ranking == 1:
            rewards_credits = 1000
        elif ranking == 2:
            rewards_credits = 500
        elif ranking == 3:
            rewards_credits = 300
        elif ranking == 4:
            rewards_credits = 200
        elif ranking == 5:
            rewards_credits = 100
        elif ranking == 6:
            rewards_credits = 80
        elif ranking == 7:
            rewards_credits = 60
        elif ranking == 8:
            rewards_credits = 40
        elif ranking == 9:
            rewards_credits = 30
        elif ranking == 10:
            rewards_credits = 20
        else:
            rewards_credits = 10

        sql = "SELECT * FROM ithome.users_userprofile WHERE id='" + record[2] + "';"
        cursor.execute(sql)
        user = cursor.fetchone()
        credits = int(user[17]) + rewards_credits


        sql = "UPDATE ithome.users_userprofile SET credits = '" + str(credits) + "' WHERE (id = '" + record[2] + "');"
        try:
            cursor.execute(sql)
            db.commit()
        except Exception as e:
            print(e)
            print("db error")
            db.rollback()


Judge2048()