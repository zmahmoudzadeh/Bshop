# Generated by Django 3.1.2 on 2021-04-27 17:06

from django.db import migrations
import django_jalali.db.models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='Expiration_Date',
            field=django_jalali.db.models.jDateField(blank=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='manufacture_Date',
            field=django_jalali.db.models.jDateField(blank=True),
        ),
    ]