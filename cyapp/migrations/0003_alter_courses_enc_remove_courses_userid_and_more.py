# Generated by Django 5.0.2 on 2024-02-27 14:53

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cyapp', '0002_catctf_ctf'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='enc',
            field=models.BooleanField(default=False),
        ),
        migrations.RemoveField(
            model_name='courses',
            name='userid',
        ),
        migrations.AddField(
            model_name='courses',
            name='userid',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
