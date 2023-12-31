# Generated by Django 5.0 on 2023-12-10 10:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0003_remove_employee_date_of_join_remove_employee_dob"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="date_of_join",
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name="employee",
            name="dob",
            field=models.DateField(default=datetime.date.today),
        ),
    ]
