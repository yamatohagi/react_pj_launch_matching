from rest_framework import serializers
from .models import Member, MatchEntry

class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = Member
		fields ='__all__'

class MatchEntrySerializer(serializers.ModelSerializer):
	class Meta:
		model = MatchEntry
		fields ='__all__'