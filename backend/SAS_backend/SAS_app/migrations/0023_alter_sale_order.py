# Generated by Django 5.0 on 2023-12-17 16:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0022_alter_sale_product"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sale",
            name="order",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="SAS_app.order",
            ),
        ),
    ]
