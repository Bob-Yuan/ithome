__author__ = 'boy'
__date__ = '2020/3/12 13:14'

import MySQLdb
import time
import sys

sys.path.insert(0, '../')       #添加环境变量，包的查找
from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD


#比如开奖号1，2，3，4，5，6，10
# 我买了 567890 11
#
# 怎么算，先从567890对开奖号1-6依次比对，得出红球中奖个数，再将蓝球11与开奖篮球比对，
#
# 将567890六个数和开奖六个数放一个set中看留几个
# 然后判断中了几个
#
# 每次开奖时间到了后执行，首先爬取该期issue开奖号码，根据期号issue，取出当期所有用户的购票。进行判奖，存入状态。
# 状态LotteryStatus：0:未开奖 1：一等奖 2：二等奖 3：三等奖 4：四等奖 5：五等奖 6：六等奖 10：未中奖
# 11：一等奖 已兑奖 12：二等奖 已兑奖 13：三等奖 已兑奖 14：四等奖 已兑奖 15：五等奖 已兑奖 16：六等奖 已兑奖

def JudgeAwards(lottery_type, issue, kaijiang_red_balls, kaijiang_blue_ball):
    # type str类型，彩票种类
    # issue str类型，彩票期号
    # kaijiang_red_balls str类型 1,2,3,4,5,6
    # kaijiang_blue_ball str类型 7

    # 取出当期购买的所有号码
    kaijiang_red_balls = kaijiang_red_balls.split(",")
    print(kaijiang_red_balls)

    db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
    cursor = db.cursor()

    sql = "SELECT * FROM ithome.activity_biglotteryuserbuy WHERE issue='" + issue + "' and type='" + lottery_type + "' and LotteryStatus=0" + ";"
    cursor.execute(sql)
    lotterysUserBuy = cursor.fetchall()
    for aLottery in lotterysUserBuy:
        userbuy_red_balls = []
        userbuy_red_balls.append(aLottery[6])
        userbuy_red_balls.append(aLottery[7])
        userbuy_red_balls.append(aLottery[8])
        userbuy_red_balls.append(aLottery[9])
        userbuy_red_balls.append(aLottery[10])
        userbuy_red_balls.append(aLottery[11])
        userbuy_blue_ball = aLottery[12]

        zhongjiang_redball_num = 12 - len(set(kaijiang_red_balls+userbuy_red_balls))
        if kaijiang_blue_ball == userbuy_blue_ball:
            zhongjiang_blue_ball = 1
        else:
            zhongjiang_blue_ball = 0

        if (zhongjiang_redball_num==0 or zhongjiang_redball_num==1 or zhongjiang_redball_num==2) and zhongjiang_blue_ball==1:
            # 六等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='6' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif (zhongjiang_redball_num==4 and zhongjiang_blue_ball==0) or (zhongjiang_redball_num==3 and zhongjiang_blue_ball==1):
            #五等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='5' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif (zhongjiang_redball_num==5 and zhongjiang_blue_ball==0) or (zhongjiang_redball_num==4 and zhongjiang_blue_ball==1):
            #四等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='4' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 5 and zhongjiang_blue_ball == 1:
            #三等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='3' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 6 and zhongjiang_blue_ball == 0:
            #二等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='2' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 6 and zhongjiang_blue_ball == 1:
            # 一等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='1' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        else:
            # 未中奖
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='10' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()


#手动指定某一期进行判奖
def DesignateJudgeAwards(lottery_type, issue):
    db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
    cursor = db.cursor()

    sql = "SELECT * FROM ithome.activity_biglotterywinningnumbers WHERE issue_num=" + str(issue) + ";"
    print(sql)
    cursor.execute(sql)
    winningnumbers = cursor.fetchone()

    kaijiang_blue_ball = winningnumbers[3]
    kaijiang_red_balls = winningnumbers[5]
    kaijiang_red_balls = kaijiang_red_balls.split(",")
    print(kaijiang_red_balls)

    sql = "SELECT * FROM ithome.activity_biglotteryuserbuy WHERE issue='" + str(issue) + "' and type='" + lottery_type + "' and LotteryStatus=0" + ";"
    cursor.execute(sql)
    lotterysUserBuy = cursor.fetchall()
    print()
    for aLottery in lotterysUserBuy:
        userbuy_red_balls = []
        userbuy_red_balls.append(aLottery[6])
        userbuy_red_balls.append(aLottery[7])
        userbuy_red_balls.append(aLottery[8])
        userbuy_red_balls.append(aLottery[9])
        userbuy_red_balls.append(aLottery[10])
        userbuy_red_balls.append(aLottery[11])
        userbuy_blue_ball = aLottery[12]

        zhongjiang_redball_num = 12 - len(set(kaijiang_red_balls + userbuy_red_balls))
        if kaijiang_blue_ball == userbuy_blue_ball:
            zhongjiang_blue_ball = 1
        else:
            zhongjiang_blue_ball = 0

        if (
                zhongjiang_redball_num == 0 or zhongjiang_redball_num == 1 or zhongjiang_redball_num == 2) and zhongjiang_blue_ball == 1:
            # 六等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='6' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif (zhongjiang_redball_num == 4 and zhongjiang_blue_ball == 0) or (
                zhongjiang_redball_num == 3 and zhongjiang_blue_ball == 1):
            # 五等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='5' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif (zhongjiang_redball_num == 5 and zhongjiang_blue_ball == 0) or (
                zhongjiang_redball_num == 4 and zhongjiang_blue_ball == 1):
            # 四等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='4' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 5 and zhongjiang_blue_ball == 1:
            # 三等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='3' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 6 and zhongjiang_blue_ball == 0:
            # 二等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='2' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 6 and zhongjiang_blue_ball == 1:
            # 一等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='1' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        else:
            # 未中奖
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='10' WHERE (id = " + str(
                aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()

# 当定时任务出错时，手动进行判奖，第一个参数是彩票种类，第二个参数是期号
# DesignateJudgeAwards("fcssq", 2020010)
