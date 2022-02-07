from django.shortcuts import render
from django.http import JsonResponse
from datetime import date, datetime, timedelta
from dateutil.parser import parse
from random import choice  
import logging

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MemberSerializer, MatchEntrySerializer

from .models import Member, MatchEntry
# Create your views here.
logger = logging.getLogger(__name__)

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'会員情報・会員登録':'/set-get-member/',
		'会員情報更新':'/update-member/',
		'マッチ登録':'/new-match/',
		'マッチ履歴':'/member-match-list/<str:pk>/',
		}

	return Response(api_urls)

# @api_view(['GET'])
# def entryList(request):
# 	tasks = Entry.objects.all().order_by('-id')
# 	serializer = EntrySerializer(tasks, many=True)
# 	return Response(serializer.data)

# @api_view(['GET'])
# def entryDetail(request, pk):
# 	tasks = Entry.objects.get(id=pk)
# 	serializer = EntrySerializer(tasks, many=False)
# 	return Response(serializer.data)

# @api_view(['POST'])
# def createEntry(request):
# 	data = request.data
# 	data['expected_date'] = parse(data['expected_date'])

# 	serializer = EntrySerializer(data=data)
# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)

# @api_view(['DELETE'])
# def deleteEntry(request, pk):
# 	task = Entry.objects.get(id=pk)
# 	task.delete()

# 	return Response('Item succsesfully delete!')

# @api_view(['POST'])
# def searchClosestEntry(request):
# 	logger.error(request.data['expected_date'])
# 	expected_date = parse(request.data['expected_date'])
# 	start = expected_date + timedelta(-5)
# 	end = expected_date + timedelta(5)
# 	tasks = choice(Entry.objects.filter(expected_date__range=(start, end)).exclude(mail=request.data['mail']))
# 	serializer = EntrySerializer(tasks, many=False)
# 	return Response(serializer.data)

# -----------------------------------------------------------------
@api_view(['POST'])
def setGetMember(request):
	try:
		member = Member.objects.get(mail=request.data['mail'])
	except Member.DoesNotExist:
		addSerializer = MemberSerializer(data=request.data)
		if addSerializer.is_valid():
			addSerializer.save()
		member = Member.objects.get(mail=request.data['mail'])

	serializer = MemberSerializer(member, many=False)
	logger.error(serializer.data)
	return Response(serializer.data)


@api_view(['POST'])
def updateMember(request):
	member = Member.objects.get(id=request.data['id'])
	serializer = MemberSerializer(member, data={'name': request.data['name'], 'dept': request.data['dept']})
	
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def newMatch(request):
	serializer = MatchEntrySerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['GET'])
def memberMatchList(request, pk):
	# entries = MatchingEntry.objects.all().order_by('-id')
	entries = MatchEntry.objects.select_related('partner_member_id').all()
	
	serializer = MatchEntrySerializer(entries, many=True)
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error(entries.query)
	logger.error(serializer.data)
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	logger.error("0")
	return Response(serializer.data)




	