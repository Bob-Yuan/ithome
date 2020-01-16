"# ithome" 
需要修改数据库



#配置
[^_^]: #()
##1、配置settings.py下的数据库参数
    1) DATABASES_HOST = '127.0.0.1'  
    2) DATABASES_NAME = 'ithome'  
    3) DATABASES_USER = 'root'  
    4) DATABASES_PASSWORD = '123456'  

##2、配置linux的crontab，每天8点自动执行爬虫脚本
vim /etc/crontab  
0 8 * * * root python3 /root/ithome/ithome_spider/ithome_spider.py
  
注：cron 服务的启动与停止，命令如下：  
    1) service cron start  
    2) service cron stop  
    3) service cron restart  
    4) service cron reload      重新载入配置  
    5) service cron status

重要：如果你使用的是python版本管理工具，得确保base的python解释器安装了bs4、mysqlclient模块!! 
因为crontab默认使用base的python解释器 
  

