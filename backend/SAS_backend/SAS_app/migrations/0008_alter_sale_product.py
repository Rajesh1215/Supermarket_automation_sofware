# Generated by Django 5.0 on 2023-12-12 19:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0007_alter_sale_product"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sale",
            name="product",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="SAS_app.productitem"
            ),
        ),
    ]