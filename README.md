"# ithome" 
## Nginx+uWSGI在Ubuntu上部署Django项目 
相关配置网上都有：  
https://segmentfault.com/a/1190000014361352  
https://www.jianshu.com/p/f1ed50f22d07  
https://segmentfault.com/q/1010000020638513

##1、创建数据库  
CREATE DATABASE ithome CHARACTER SET = utf8;

##2、配置linux的crontab，每天8点自动执行爬虫脚本
vim /etc/crontab  
0 8 * * * root python3 /root/ithome/spider/ithome_spider/ithome_spider.py  
30 9 * * * root /root/.environments/ithome/bin/python3 /root/ithome/spider/lottery_spider/lottery_spider.py
0 0 * * * root /root/.environments/ithome/bin/python3 /root/gitrepo/ithome/utils/judge2048.py    
（重要：确保base的python解释器安装了requirements中的所有模块!!   因为crontab默认使用base的python解释器,  
当然你也可以指定自定义的python解释器，比如 /root/.environment/ithome/bin/python3)  
第一个定时任务是爬取每天it之家新发的文章  
第二个定时任务是爬取每期开奖信息，爬虫爬完后会自动调用判奖程序，判定该期购买彩票是否中奖  
第三个定时任务是每天0点对2048排名进行奖励


##3、通用变量设置
[^_^]: #()
###1、配置settings.py下的数据库参数
    1) DATABASES_HOST = 'localhost'  
    2) DATABASES_NAME = 'ithome'  
    3) DATABASES_USER = 'root'  
    4) DATABASES_PASSWORD = '123456'  
###2、配置settings.py下的邮件参数
    1) EMAIL_HOST = "smtp.qq.com"  
    2) EMAIL_PORT = 25  
    3) EMAIL_HOST_USER = "xxx@qq.com"  
    4) EMAIL_HOST_PASSWORD = "xxx"   #这个是授权码，不是密码
    5) EMAIL_USE_TLS = False
    6) EMAIL_FROM = "xxx"
###3、部署网页网址（用在发送给别人的注册邮件中）
    ip_addr = "https://www.qxdq.xyz"    

  

