__author__ = 'boy'
__date__ = '2020/3/12 13:14'

import MySQLdb
import time
import sys

sys.path.insert(0, '../')       #添加环境变量，包的查找
from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD


def checkStatus(self, request):
    if request.user.id != None:
        user_buy_status_0 = BigLotteryUserBuy.objects.filter(user_id=request.user.id, LotteryStatus=0)
        newest_lottery = LotteryInfo.objects.filter(type="fcssq")
        for a_user_buy in user_buy_status_0:
            pass



#比如开奖号1，2，3，4，5，6，10
# 我买了 567890 11
#
# 怎么算，先从567890对开奖号1-6依次比对，得出红球中奖个数，再将蓝球11与开奖篮球比对，
#
# 将567890六个数和开奖六个数放一个set中看留几个
# 然后判断中了几个
#
# 每次开奖时间到了后执行，首先爬取该期issue开奖号码，根据期号issue，取出当期所有用户的购票。进行判奖，存入状态。
# 状态LotteryStatus：0：未开奖 1：未中奖 2：中奖已领取 3：一等奖 4：二等奖 5：三等奖 6：四等奖 7：五等奖 8：六等奖 9：七等奖

def JudgeAwards(type, issue, kaijiang_red_balls, kaijiang_blue_ball):
    # redballs:1,2,3,4,5,6 blueball:7
    # 取出当期购买的所有号码
    kaijiang_red_balls = kaijiang_red_balls.split(",")
    print(kaijiang_red_balls)

    db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
    cursor = db.cursor()

    sql = "SELECT * FROM ithome.activity_biglotteryuserbuy WHERE issue='" + issue + "' and type='" + type + "' and LotteryStatus=0" + ";"
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
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='8' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif (zhongjiang_redball_num==4 and zhongjiang_blue_ball==0) or (zhongjiang_redball_num==3 and zhongjiang_blue_ball==1):
            #五等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='7' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif (zhongjiang_redball_num==5 and zhongjiang_blue_ball==0) or (zhongjiang_redball_num==4 and zhongjiang_blue_ball==1):
            #四等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='6' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 5 and zhongjiang_blue_ball == 1:
            #三等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='5' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 6 and zhongjiang_blue_ball == 0:
            #二等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='4' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        elif zhongjiang_redball_num == 6 and zhongjiang_blue_ball == 1:
            # 一等
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='3' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        else:
            # 未中奖
            sql = "UPDATE ithome.activity_biglotteryuserbuy SET LotteryStatus='1' WHERE (id = " + str(aLottery[0]) + ");"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
