__author__ = 'boy'
__date__ = '2019/12/23 1:36'

import urllib.request


class HtmlDownloader(object):
    def download(self, url):
        if url is None:
            return None
        try:
            request = urllib.request.Request(url)
            request.add_header('User-Agent', 'Mozilla/5.0')
            response = urllib.request.urlopen(request)

            if response.getcode() != 200:
                return None

            content = response.read().decode('utf-8')
            return content
        except:
            print("craw failed")
            return None