__author__ = 'boy'
__date__ = '2020/3/12 13:14'

import MySQLdb
import time
import sys

sys.path.insert(0, '../')       #添加环境变量，包的查找
from ithome.settings import DATABASES_HOST, DATABASES_NAME, DATABASES_USER, DATABASES_PASSWORD


db = MySQLdb.connect(DATABASES_HOST, DATABASES_USER, DATABASES_PASSWORD, DATABASES_NAME, charset="utf8")
cursor = db.cursor()