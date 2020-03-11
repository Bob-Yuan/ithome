__author__ = 'boy'
__date__ = '2020/3/5 16:23'
import sys
import os
import django
import MySQLdb
import urllib.request
from bs4 import BeautifulSoup

sys.path.insert(0, '../../')       #添加环境变量，包的查找
from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD

if not os.getenv('DJANGO_SETTINGS_MODULE'):
    os.environ['DJANGO_SETTINGS_MODULE']='ithome.settings'

django.setup()


def download(url, type):
    if url is None:
        return None
    try:
        request = urllib.request.Request(url)
        request.add_header('User-Agent', 'Mozilla/5.0')
        response = urllib.request.urlopen(request)

        if response.getcode() != 200:
            return None
        if type == 1:
            content = response.read().decode('GBK')
        elif type == 2:
            content = response.read().decode('utf8')
        return content
    except:
        print("craw failed")
        return None


def parse(html_cont, type):
    if html_cont is None:
        return

    soup = BeautifulSoup(html_cont, 'html.parser')
    # try:
    db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
    cursor = db.cursor()

    if type == 1:
        sql = "SELECT * FROM activity_biglotterywinningnumbers order by id DESC limit 1;"
        cursor.execute(sql)
        data = cursor.fetchone()
        if data == None:
            newestDate = "<td>0000000</td>"
        else:
            newestDate = data[1]

        data = soup.find("tbody", id='data-tab').find_all("tr")

        for i in range(len(data)-1, -1, -1):
            #if(取出日期大于则pass，else加入数据库)
            html_data = data[i].find_all("td")

            if int(newestDate[4:-5]) < int(str(html_data[0])[4:-5]):
                sql = "INSERT INTO activity_biglotterywinningnumbers(issue, kaijiang_date, red_balls, blue_ball) VALUES ('"\
                      + transferContent(str(html_data[0])) + "', '" + transferContent(str(html_data[1])) + "', '" + \
                      transferContent(str(html_data[2])) + "', '" + transferContent(str(html_data[3])) + "');"

                try:
                    cursor.execute(sql)
                    db.commit()
                except Exception as e:
                    print(e)
                    print("db error")
                    db.rollback()
            else:
                pass

    elif type == 2:
        sql = "SELECT * FROM activity_lotteryinfo WHERE type='fcssq' order by id DESC limit 1;"
        cursor.execute(sql)
        data = cursor.fetchone()

        if data == None:
            newestIssue = 0
        else:
            newestIssue = int(data[2])

        find_data = soup.find("div", class_='exBox').find("div", class_="titleH2").get_text()
        issue = find_data[14:21]
        kaijiang_date = find_data[14:18]+"-"+find_data[25:30]

        print(int(issue))
        print(newestIssue)

        if int(issue) > newestIssue:
            sql = "INSERT INTO activity_lotteryinfo(type, issue, kaijiang_date) VALUES('"\
                  + transferContent("fcssq") + "', '" + transferContent(issue) + "', '"\
                  + transferContent(kaijiang_date) + "');"
            try:
                cursor.execute(sql)
                db.commit()
            except Exception as e:
                print(e)
                print("db error")
                db.rollback()
        else:
            pass

    # except Exception as e:
    #     print(e)
    #     print("parse failed")
    return 0


def transferContent(content):
    if content is None:
        return None
    else:
        stri = ""
        for c in content:
            if c == '"':
                stri += c.replace('"', '\\\"')
            elif c == "'":
                stri += c.replace("'", "\\\'")
            elif c == "\\":
                stri += "\\\\"
            else:
                stri += str(c)
    return stri


if __name__ == "__main__":
    url = "https://chart.cp.360.cn/kaijiang/ssq"
    html_cont = download(url, 1)
    parse(html_cont, 1)

    url = "https://kaijiang.aicai.com/fcssq/"
    html_cont = download(url, 2)
    parse(html_cont, 2)
