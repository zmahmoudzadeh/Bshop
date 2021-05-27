# Generated by Django 3.1.7 on 2021-05-19 10:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_jalali.db.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shops', '0002_board'),
        ('items', '0002_auto_20210427_2136'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShoppingList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, null=True)),
                ('sabt', models.BooleanField(default=False)),
                ('address', models.CharField(max_length=500, null=True)),
                ('phone', models.CharField(max_length=100, null=True)),
                ('online', models.BooleanField(default=False, null=True)),
                ('max_cost', models.IntegerField(blank=True, null=True)),
                ('delivery_time', django_jalali.db.models.jDateField(blank=True, null=True)),
                ('shop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='shopping_list_shop', to='shops.shop')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shopping_list_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(blank=True, null=True)),
                ('item', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='shopping_item', to='items.item')),
                ('shopping_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shopping_list_items', to='shoppings.shoppinglist')),
            ],
        ),
    ]
