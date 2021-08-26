import eel
from tkinter import *
from tkinter.filedialog import askopenfilename
from shutil import copyfile
import redis
from datetime import date
import base64


REDIS_PORT = 6379
REDIS_HOST = '127.0.0.1'
r = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT,db=0,decode_responses=True)
eel.init("web")


@eel.expose
def searchvac(id):
    list=[]
    data=r.hgetall('info_civil'+id)
    if data:
        dateexp=data['dateE'].split('/')
        dd= date(int(dateexp[2]),int(dateexp[1]),int(dateexp[0]))
        if dd<date.today():
            list.insert(0,('ko','This passport is expired'))
        else:
            list.insert(0,('ok','ok'))
          
        photo=r.get('photo:'+id)
        decodeit = open('web/photo.png', 'wb')
        decodeit.write(base64.b64decode((photo)))
        decodeit.close()

        signature=r.get('signature:'+id)
        decodeit = open('web/signature.png', 'wb')
        decodeit.write(base64.b64decode((signature)))
        decodeit.close()

        list.append(data)
        vacs=r.keys('info_vac:'+id+':*')
        for vac in vacs:
            vac=r.hgetall(vac)
            list.append(vac)
        return list
    else:
        list.insert(0,('ko','This passport does not exist'))
        return list


eel.start("new.html")