# Generated by Django 4.1.4 on 2023-01-09 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='coins',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='account',
            name='initial_balance',
            field=models.DecimalField(blank=True, decimal_places=10, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='prices',
            field=models.JSONField(),
        ),
    ]
