# Generated by Django 5.0 on 2023-12-16 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SAS_app", "0015_alter_customer_customer_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="productitem",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
