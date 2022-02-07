from django.db import models
from datetime import datetime 

# Create your models here.
class Member(models.Model):
  mail = models.CharField(default="", max_length=200)
  name = models.CharField(default="", max_length=200)
  dept = models.CharField(default="", max_length=200)
  last_login = models.DateTimeField(default=datetime.now)

  class Meta:
    constraints = [
      models.UniqueConstraint(
        fields=["mail"],
        name="unique_mail"
      ),
    ]

  def __str__(self):
    return self.mail

class MatchEntry(models.Model):
  member_id = models.IntegerField(default=0, blank=False)
  expected_date = models.DateTimeField(default=datetime.now)
  partner_member_id = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
