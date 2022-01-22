from django.db import models
from datetime import datetime 

# Create your models here.

class Entry(models.Model):
  mail = models.CharField(default="", max_length=200)
  name = models.CharField(default="", max_length=200)
  dept = models.CharField(default="", max_length=200)
  expected_date = models.DateTimeField(default=datetime.now)

  def __str__(self):
    return self.mail