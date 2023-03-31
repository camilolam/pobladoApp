from django.http import HttpResponse
import json
import sys
#import MySQLdb
import pymysql


class customer(object):
    id = 0
    name = ""
    identification = ""
    nContracts = 0

    def __init__(self,id,name,identification,nContracts):
        self.id = id
        self.name = name
        self.identification = identification
        self.nContracts = nContracts
    
    def serializer(self):
        return {
            "customerId":self.id,
            "name": self.name,
            "identification": self.identification,
            "Number Of Contracts":  self.nContracts
        }

def queryDb(sql,count):#0 all - 1 one
    try:
        db = pymysql.connect(host="www.db4free.net",user="camilocanaveral",passwd="Maria1234.",db="cvp_info" ) #MySQLdb
        print("Se ha conectado correctamente")
    except pymysql.Error as e:
        sys.exit(1)

    cursor = db.cursor()
    try:
        cursor.execute(sql)
        if(count == 0):
            registros = cursor.fetchall()
        elif(count == 1): 
            registros = cursor.fetchone()
        return registros
    except:
        db.close()
        return -1
    
    

def dbConnection(request):
    sql="select * from clients"
    res=queryDb(sql,1)   
    resJson = customer(res[0],res[1],res[2],res[3])
    print(resJson.serializer())
    return HttpResponse(json.dumps(resJson.serializer()))



def readCustomers(request,ident):
    
    sql="select * from clients where identification=%s"%(ident)
    res=queryDb(sql,1)
    print("Respuesta res")
    print(res)
    if(res == -1 or res == None):
        return HttpResponse(json.dumps({"error":"Not user found",
                                        "res":res}))
    else:
        resJson = customer(res[0],res[1],res[2],res[3])
        return HttpResponse(json.dumps(resJson.serializer()))
    


def hi(request):
    response = {
        "name":"Camilo",
        "age":29
    }
    return HttpResponse(json.dumps(response))

