__author__ = 'boy'
__date__ = '2019/12/23 1:35'

import sys
sys.path.insert(0, '../../')

import os
if not os.getenv('DJANGO_SETTINGS_MODULE'):
    os.environ['DJANGO_SETTINGS_MODULE']='ithome.settings'

import django
django.setup()

import MySQLdb
import datetime

from ithome_spider import html_downloader
from ithome_spider import html_outputer
from ithome_spider import html_parser
from ithome_spider import url_manager

from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD


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


class SpiderMain(object):
    def __init__(self):
        self.urls = url_manager.UrlManager()
        self.downloader = html_downloader.HtmlDownloader()
        self.parser = html_parser.HtmlParser()
        self.outputer = html_outputer.Htmloutputer()

    def craw(self):
        db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
        cursor = db.cursor()
        count = 0
        #self.urls.add_new_url(db)
        #while self.urls.has_new_url():
            #try:

        # 首先从数据库中获取上次最后爬取的url作为本次爬取的首条url
        current_url = self.urls.get_first_url(cursor)


        blank_count = 0
        while blank_count<5:
            count = count + 1
            print("craw %d : %s" % (count, current_url))
            html_cont = self.downloader.download(current_url)

            if html_cont != None:
                blank_count = 0
                title, date, meta, excerpt, paragraph = self.parser.parse(current_url, html_cont)

                if title is not None:
                    title = transferContent(str(title))
                    date = transferContent(str(date))
                    meta = transferContent(str(meta))
                    excerpt = transferContent(str(excerpt))
                    paragraph = transferContent(str(paragraph))
                    ret = self.outputer.collect_data(db, current_url, title, date, meta, excerpt, paragraph)
                    if ret == None:
                        blank_count = blank_count + 1
                else:
                    blank_count = blank_count + 1
            else:
                blank_count = blank_count + 1
            #self.urls.add_new_urls(new_urls)

            current_url = self.urls.next_url()

        db.close()
        #self.outputer.output_html(cursor)
        print("craw finish!")

        # if count == 1000:
        #     break
        # count = count + 1
        #except:
        #
        #self.outputer.output_html()


#if __name__ == "__main__":
# obj_spider = SpiderMain()
# obj_spider.craw()

def start():
    print(datetime.datetime.now())
    obj_spider = SpiderMain()
    obj_spider.craw()

if __name__ == "__main__":
    start()
