# Generated by Django 4.1.4 on 2023-01-16 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_account_coins_alter_account_prices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='coins',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='account',
            name='prices',
            field=models.JSONField(default=dict),
        ),
    ]