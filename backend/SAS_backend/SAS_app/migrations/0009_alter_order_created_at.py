# Generated by Django 5.0 on 2023-12-13 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0008_alter_sale_product"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(),
        ),
    ]
