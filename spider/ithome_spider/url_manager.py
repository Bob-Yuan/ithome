__author__ = 'boy'
__date__ = '2019/12/23 1:38'

import MySQLdb

#从数据库中获取昨天最后爬的url+1，若为空，最多往后爬7篇，都为空则停止

class UrlManager(object):
    def __init__(self):
        self.url = ""

    def add_new_url(self, url):
        if url is None:
            return
        if url not in self.new_urls and url not in self.old_urls:
            self.new_urls.add(url)

    def add_new_urls(self, urls):
        if urls is None or len(urls) == 0:
            return
        for url in urls:
            self.add_new_url(url)

    def has_new_url(self):
        return len(self.new_urls) != 0

    def get_first_url(self, cursor):
        sql = "select * from article_articles order by total_id DESC limit 1;"
        cursor.execute(sql)
        data = cursor.fetchone()
        self.url = data[3]         #例：https://www.ithome.com/0/464/431.htm
        if self.url == "":
            self.url = "https://www.ithome.com/0/465/001.htm"
        return self.next_url()

    def next_url(self):
        count = 0
        for i in range(0, len(self.url)):
            if self.url[i] == '/':
                count = count + 1
            if count == 3:
                break

        num = int(self.url[i:-4].replace('/', ''))

        if num % 1000000 == 999999:
            str1 = str(int(num / 1000000) + 1)
            str2 = "000"
            str3 = "000"
        else:
            str1 = str(int(num / 1000000))

            if num % 1000 == 999:
                str2_int = int((num % 1000000) / 1000)+1
                if str2_int < 10:
                    str2 = "00" + str(str2_int)
                elif str2_int < 100:
                    str2 = "0" + str(str2_int)
                else:
                    str2 = str(str2_int)
                str3 = "000"
            else:
                str2_int = int((num % 1000000) / 1000)
                if str2_int < 10:
                    str2 = "00" + str(str2_int)
                elif str2_int < 100:
                    str2 = "0" + str(str2_int)
                else:
                    str2 = str(str2_int)

                str3_int = num % 1000 + 1
                if str3_int < 10:
                    str3 = "00" + str(str3_int)
                elif str3_int < 100:
                    str3 = "0" + str(str3_int)
                else:
                    str3 = str(str3_int)

        self.url = "https://www.ithome.com/" + str1 + "/" + str2 + "/" + str3 + ".htm"
        return self.url