# Generated by Django 3.1.2 on 2021-05-21 13:20

from django.db import migrations, models
import django_jalali.db.models


class Migration(migrations.Migration):

    dependencies = [
        ('shoppings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoppingitem',
            name='price',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='shoppinglist',
            name='delivery_time',
            field=django_jalali.db.models.jDateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shoppinglist',
            name='max_cost',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
