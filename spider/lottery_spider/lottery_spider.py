__author__ = 'boy'
__date__ = '2020/3/5 16:23'
import sys
import os
import django
import MySQLdb
import urllib.request
from bs4 import BeautifulSoup

sys.path.insert(0, './gitrepo/ithome/')       #添加环境变量，包的查找
from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD
from utils.judgeLottery import JudgeAwards

if not os.getenv('DJANGO_SETTINGS_MODULE'):
    os.environ['DJANGO_SETTINGS_MODULE']='ithome.settings'

django.setup()


def download(url, download_type):
    if url is None:
        return None
    try:
        request = urllib.request.Request(url)
        request.add_header('User-Agent', 'Mozilla/5.0')
        response = urllib.request.urlopen(request)

        if response.getcode() != 200:
            return None
        if download_type == 1:
            content = response.read().decode('GBK')
        elif download_type == 2:
            content = response.read().decode('utf8')
        return content
    except:
        print("craw failed")
        return None


def parse(html_cont, parse_type):
    if html_cont is None:
        return

    soup = BeautifulSoup(html_cont, 'html.parser')
    # try:
    db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
    cursor = db.cursor()

    if parse_type == 1:
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
            html_data_td = data[i].find_all("td")
            html_data_span = data[i].find_all("span")

            redballs_number_data = ""
            for j in range(0, len(html_data_span)-2):
                if j != len(html_data_span)-3:
                    redballs_number_data = redballs_number_data + html_data_span[j].get_text() + ","
                else:
                    redballs_number_data = redballs_number_data + html_data_span[j].get_text()

            blueball_number_data = html_data_span[6].get_text()
            issue_num = html_data_td[0].get_text()

            if int(newestDate[4:-5]) < int(str(html_data_td[0])[4:-5]):
                sql = "INSERT INTO activity_biglotterywinningnumbers(issue_html, issue_num, kaijiang_date, red_balls_html, blue_ball_html,\
                 red_balls_nums, blue_ball_num) VALUES ('"+ transferContent(str(html_data_td[0])) + "', '" + transferContent(str(issue_num)) + "', '" + \
                      transferContent(str(html_data_td[1])) + "', '" + transferContent(str(html_data_td[2])) + "', '" + transferContent(str(html_data_td[3]))\
                      + "', '" + transferContent(str(redballs_number_data)) + "', '" + transferContent(str(blueball_number_data)) + "');"

                try:
                    cursor.execute(sql)
                    db.commit()
                except Exception as e:
                    print(e)
                    print("db error")
                    db.rollback()

                #调用判奖函数
                #issue和type以及开奖号码
                lottery_type = "fcssq"
                JudgeAwards(lottery_type, newestDate[4:-5], redballs_number_data, blueball_number_data)
            else:
                pass

    elif parse_type == 2:
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
    # download_type =1 下载开奖记录 parse_type=1 解析开奖记录
    url = "https://chart.cp.360.cn/kaijiang/ssq"
    html_cont = download(url, 1)
    parse(html_cont, 1)

    # download_type =1 下载下次开奖时间和期号 parse_type=2 解析下次开奖时间和期号
    url = "https://kaijiang.aicai.com/fcssq/"
    html_cont = download(url, 2)
    parse(html_cont, 2)
