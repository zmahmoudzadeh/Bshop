# Generated by Django 3.1.7 on 2021-05-26 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoppings', '0003_shoppingitem_sum_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppinglist',
            name='delivery_time',
        ),
        migrations.AddField(
            model_name='shoppinglist',
            name='delivery',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]