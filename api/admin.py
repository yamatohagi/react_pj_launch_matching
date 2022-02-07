from django.contrib import admin

# Register your models here.

from .models import Member, MatchEntry

admin.site.register(Member)
admin.site.register(MatchEntry)