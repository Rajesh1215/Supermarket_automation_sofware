# Generated by Django 5.0 on 2023-12-17 16:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0020_alter_sale_product"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sale",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="SAS_app.productitem"
            ),
        ),
    ]