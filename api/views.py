from django.shortcuts import render
from django.http import JsonResponse
from datetime import date, datetime
from dateutil.parser import parse
import logging

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import EntrySerializer

from .models import Entry
# Create your views here.
logger = logging.getLogger(__name__)

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/entry-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/create-entry/',
		'Delete':'/delete-entry/',
		}

	return Response(api_urls)

@api_view(['GET'])
def entryList(request):
	tasks = Entry.objects.all().order_by('-id')
	serializer = EntrySerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def entryDetail(request, pk):
	tasks = Entry.objects.get(id=pk)
	serializer = EntrySerializer(tasks, many=False)
	return Response(serializer.data)

@api_view(['POST'])
def createEntry(request):
	data = request.data
	data['expected_date'] = parse(data['expected_date'])

	serializer = EntrySerializer(data=data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['DELETE'])
def deleteEntry(request, pk):
	task = Entry.objects.get(id=pk)
	task.delete()

	return Response('Item succsesfully delete!')

@api_view(['GET'])
def searchClosestEntry(request):
	logger.error('1')
	logger.error('1')
	logger.error('1')
	logger.error('1')
	logger.error('1')
	logger.error('1')
	logger.error(request.data)
	expected_date = request.data.expected_date
	start = expected_date + datetime.timedelta(-3)
	end = expected_date + datetime.timedelta(3)
	tasks = Entry.objects.filter(expected_date___range=(start, end)).order_by('-expected_date')
	serializer = EntrySerializer(tasks, many=True)
	return Response(serializer.data)