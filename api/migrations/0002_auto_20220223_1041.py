# Generated by Django 3.0.3 on 2022-02-23 10:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Entry',
        ),
        migrations.AlterField(
            model_name='matchentry',
            name='partner_member_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Member'),
        ),
    ]
