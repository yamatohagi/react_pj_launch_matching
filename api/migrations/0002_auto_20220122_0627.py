# Generated by Django 3.0.3 on 2022-01-22 06:27

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='expected_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 22, 6, 27, 14, 394714, tzinfo=utc)),
        ),
    ]
