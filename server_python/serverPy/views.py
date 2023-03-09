from django.http import HttpResponse
import json

def hello(request):
    response = {
        "name":"Camilo",
        "age":29
    }
    return HttpResponse(json.dumps(response))