# Generated by Django 5.0 on 2023-12-10 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0004_employee_date_of_join_employee_dob"),
    ]

    operations = [
        migrations.AlterField(
            model_name="productitem",
            name="damaged",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="productitem",
            name="sold",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="productitem",
            name="verified",
            field=models.BooleanField(default=True),
        ),
    ]
