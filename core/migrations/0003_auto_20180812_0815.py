# Generated by Django 2.0.6 on 2018-08-12 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_todo_is_completed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='due_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
