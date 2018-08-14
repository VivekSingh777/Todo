from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.constants import ALL


class TodoResource(ModelResource):
	""" 
	API FACET
	"""
	class Meta:
		from .models import Todo
		queryset = Todo.objects.all()
		resource_name = 'todo'
		allowed_methods = ['post', 'get', 'delete', 'put', 'patch']
		filtering = {'title': ALL, 'is_deleted':ALL, 'due_date':ALL}
		always_return_data = True
		authorization = Authorization()