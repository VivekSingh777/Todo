# Todo

# INSTALLATION
Most of the dependencies can be installed using
`pip install -r requirements.txt`

# POST INSTALLATION
`python manage.py makemigartion` --> for creating migration
`python manage.py migrate`
# USAGE
`python manage.py runserver`

# Celery tasks
Open your redis-server with following command
`redis-server /usr/local/etc/redis.conf`
Run Celery task with this command
`celery -A todo worker -l info -B`

# Pytest
`py.test abs_path/to/test/file`
