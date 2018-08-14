from django.db import models
from todo import settings

class Todo(models.Model): 
         
    title = models.CharField(max_length=100, unique=True) 
    description = models.TextField() 
    due_date = models.DateField() 
    is_completed = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    subtask = models.TextField(default = "")
 
    def __unicode__(self): 
        return self

