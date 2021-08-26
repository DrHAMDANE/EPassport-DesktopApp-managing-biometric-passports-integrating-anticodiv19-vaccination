import eel
from tkinter import *
from tkinter.filedialog import askopenfilename
from shutil import copyfile
import redis
from datetime import date
import base64

photo=''
signature=''
REDIS_PORT = 6379
REDIS_HOST = '127.0.0.1'
r = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT,db=0,decode_responses=True)
eel.init("web")
@eel.expose
def askSignature():
    global signature
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    signature = askopenfilename(initialdir='/desktop',title="choisir une photo",filetypes=[("png files","*.png")])
    copyfile(signature,'web/signature.png')
    signature='web/signature.png'
    return 'signature.png'
@eel.expose    
def askPhoto():
    global photo
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    photo = askopenfilename(initialdir='/desktop',title="choisir une photo",filetypes=[("png files","*.png")])
    copyfile(photo,'web/photo.png')
    photo='web/photo.png'
    return 'photo.png'
@eel.expose
def add(id,firstname,lastname,birth,birthplace,sexe,groupage,autorite): 
    global photo,signature
    if id and firstname and birthplace and birth and sexe and groupage and autorite and photo and signature:
        pn=r.hget('info_civil'+id,'nom')
        if pn:
            return ('ko','This passport already exist')
        else:
            dateD=date.today()
            dateE=dateD.replace(year = dateD.year + 10)
            dateD=str(dateD.day)+'/'+str(dateD.month)+'/'+str(dateD.year) 
            dateE=str(dateE.day)+'/'+str(dateE.month)+'/'+str(dateE.year) 
            with open(photo, "rb") as image2string:
                photo= base64.b64encode(image2string.read())
            with open(signature, "rb") as image2string:
                signature= base64.b64encode(image2string.read())
            
            r.hmset('info_civil'+id,{"nom":lastname,"prenom":firstname,"dateN":birth,"lieuN":birthplace,"sexe":sexe,"groupage":groupage,"autorite":autorite,"dateD":dateD,"dateE":dateE})
            r.set('photo:'+id,photo)
            r.set('signature:'+id,signature)
            photo=''
            signature=''
            return ('ok','Passport was added successfully')
    else:
            return ('ko','All field must be filled')

@eel.expose
def rechercher(id):
    data=r.hgetall('info_civil'+id)
    if data:
        dateexp=data['dateE'].split('/')
        dd= date(int(dateexp[2]),int(dateexp[1]),int(dateexp[0]))
        if dd<date.today():
            exp="yes"
        else:
            exp='no'

        photo=r.get('photo:'+id)
        signature=r.get('signature:'+id)
        decodeit = open('web/signature.png', 'wb')
        decodeit.write(base64.b64decode((signature)))
        decodeit.close()

        decodeitp = open('web/photo.png', 'wb')
        decodeitp.write(base64.b64decode((photo)))
        decodeitp.close()
        signature='web/signature.png'
        photo='web/photo.png'
        return (exp,data)
    else:
        return ('ko','This passport does not exist')

@eel.expose
def askSignatureUp():
    global signature
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    signature = askopenfilename(initialdir='/desktop',title="choisir une photo",filetypes=[("png files","*.png")])
    print(signature)
    copyfile(signature,'web/signature.png')
    signature='web/signature.png'
    return 'signature.png'
@eel.expose    
def askPhotoUp():
    global photo
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    photo = askopenfilename(initialdir='/desktop',title="choisir une photo",filetypes=[("png files","*.png")])
    copyfile(photo,'web/photo.png')
    photo='web/photo.png'
    return 'photo.png'
@eel.expose
def edit(id,autorite):
    global photo,signature
    photo='web/photo.png'
    signature='web/signature.png'
    if id and autorite :
        pn=r.hget('info_civil'+id,'nom')
        if pn:
            with open(photo, "rb") as image2string:
                photo= base64.b64encode(image2string.read())
            with open(signature, "rb") as image2string:
                signature= base64.b64encode(image2string.read())
            
            r.hset('info_civil'+id,"autorite",autorite)
            r.set('photo:'+id,photo)
            r.set('signature:'+id,signature)
            photo=''
            signature=''
            return ('ok','Passport was edited successfully')
        else:
            return ('ko','This passport does not exist')
    else:
            return ('ko','All field must be filled')

@eel.expose
def renew(id,autorite):
    if edit(id,autorite)==('ok','Passport was edited successfully'):  
        data=r.hgetall('info_civil'+id)
        dateexp=data['dateE'].split('/')
        dd= date(int(dateexp[2]),int(dateexp[1]),int(dateexp[0]))  
        if dd<date.today():
            dateD=date.today()
            dateE=dateD.replace(year = dateD.year + 10)
            dateD=str(dateD.day)+'/'+str(dateD.month)+'/'+str(dateD.year) 
            dateE=str(dateE.day)+'/'+str(dateE.month)+'/'+str(dateE.year)
            r.hmset('info_civil'+id,{"dateD":dateD,"dateE":dateE})
            return ('ok','Passport was renewed successfully')
        else:
            return ('ko','This passport is not expired')
    else:
        return ('ko','Something went wrong')
@eel.expose
def remove(id):
    if id  :
        pn=r.hget('info_civil'+id,'nom')
        if pn:
            
            r.delete('info_civil'+id)
            r.delete('photo:'+id)
            r.delete('signature:'+id)
            return ('ok','Passport was removed successfully')
        else:
            return ('ko','This passport does not exist')
    else:
            return ('ko','All field must be filled')

@eel.expose
def searchvac(id):
    data=r.hgetall('info_civil'+id)
    if data:
        photo=r.get('photo:'+id)
        decodeit = open('web/photo.png', 'wb')
        decodeit.write(base64.b64decode((photo)))
        decodeit.close()
        return data

@eel.expose
def addvac(id,num,nom,dateexp,datepro,datevac,desc,lot,provider,tech,type):
    data=r.hget('info_civil'+id,'nom')
    if data:
        r.hmset('info_vac:'+id+':'+num,{'nom_vac':nom,'date_exp':dateexp,'date_pro':datepro,'date_vac':datevac,'description':desc,'lot':lot,'provider':provider,'technique':tech,'type':type})
        return ('ok','The vaccination was addes successfully')
    else:
        return ('ko','Passport does not exist!')
eel.start("new.html")