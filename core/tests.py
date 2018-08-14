from django.test import TestCase
import pytest
from .models import Todo
import datetime
import requests, json
# Create your tests here.
@pytest.mark.django_db
def test_post():
    todo = Todo(title="test Todo", description="test todo", due_date=datetime.datetime.now().date())
    todo.save()
    assert todo.title == "test Todo"
    assert todo.description == "test todo"


@pytest.mark.django_db
def test_get():
    todo = Todo(title="test Todo", description="test todo", due_date=datetime.datetime.now().date())
    todo.save()
    todo_get = Todo.objects.get(title="test Todo")
    assert todo_get.title == "test Todo"
    assert todo_get.description == "test todo"

@pytest.mark.django_db
def test_delete():
    todo = Todo(title="test Todo", description="test todo", due_date=datetime.datetime.now().date())
    todo.save()
    todo_delete = Todo.objects.get(title="test Todo")
    deleted_todo = todo_delete.delete()
    assert deleted_todo[0] == 1

@pytest.mark.django_db
def test_search():
    todo = Todo(title="test Todo", description="test todo", due_date=datetime.datetime.now().date())
    todo.save()
    url = "http://127.0.0.1:8000/api/v1/todo/?format=json&is_deleted=false&title__contains=test"
    r = requests.get(url)
    r = r.json()
    assert todo.title == r['objects'][0]['title']


