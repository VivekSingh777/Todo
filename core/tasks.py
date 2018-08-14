from __future__ import absolute_import, unicode_literals
from celery import task
from .models import Todo
@task()
def delete_tasks():
    # Do something...
    #delete all project which is marked for soft delete.
    todo = Todo.objects.filter( is_deleted = True)
    if todo:
    	for item in todo:
    		todo.delete() 