from django.shortcuts import render, redirect
import json, datetime
from .models import Todo
from django.http import HttpResponse

def index(request): #the index view
    today_date = datetime.date.today()
    todo = Todo.objects.filter( due_date = str(today_date))
    for item in todo:
        print(item.due_date)
    return render(request, "index.html")


def getAlerts(request):
    today_date = datetime.date.today()
    todo = Todo.objects.filter( due_date = str(today_date))
    if todo:
        msg = "You Have {} number of task due today".format(len(todo))
        return HttpResponse(msg)


