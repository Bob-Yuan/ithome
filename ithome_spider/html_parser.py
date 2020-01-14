__author__ = 'boy'
__date__ = '2019/12/23 1:38'

from bs4 import BeautifulSoup
import re
from urllib.parse import urlparse


class HtmlParser(object):
    def _get_new_urls(self, page_url, soup):
        new_urls = set()
        links = soup.find_all('a', href=re.compile(r"/view/\d+\.htm"))
        for link in links:
            new_url = link['href']
            new_full_url = urlparse.urljoin(page_url, new_url)
            new_urls.add(new_full_url)
        return new_urls

    def _get_new_data(self, page_url, soup):

        # res_data["url"] = page_url
        #
        # title_node = soup.find('dd', class_="".find("h1"))
        # res_data["title"] = title_node.get_text()
        #
        # summary_node = soup.find('div', class_="")
        # res_data["summary"] = summary_node.get_text()
        try:
            title = soup.find("div", {"class" :"post_title" }).find('h1')

            date = (soup.select('#pubtime_baidu'))[0].get_text().split()[0]
            date_split = date.split('/')
            if len(date_split[1]) < 2:
                date_split[1] = '0' + date_split[1]
            if len(date_split[2]) < 2:
                date_split[2] = '0' + date_split[2]
            date = '-'.join(date_split)

            meta = str((soup.select('#pubtime_baidu'))[0])+"&nbsp;&nbsp;&nbsp;"+str((soup.select('#source_baidu'))[0])+"&nbsp;&nbsp;&nbsp;"+str((soup.select('#author_baidu'))[0])
            paragraph = soup.select('#paragraph')
            excerpt = paragraph[0].get_text()[0:100]
            ads = soup.select(".tagging1")

            if ads != []:         #排除广告页
                print("ads")
                return None, None, None, None, None
            return title, date, meta, excerpt, paragraph[0]
        except Exception as e:
            print(e)
            print("parse failed")
            return None, None, None, None, None

    def parse(self, current_url, html_cont):
        if current_url is None or html_cont is None:
            return

        soup = BeautifulSoup(html_cont, 'html.parser')
        title, date, meta, excerpt, paragraph = self._get_new_data(current_url, soup)
        return title, date, meta, excerpt, paragraph
