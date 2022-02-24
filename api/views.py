from dateutil.parser import parse
from random import choice  
from django.utils.timezone import localtime
from django.db.models import Q, Count

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MemberSerializer, MatchEntrySerializer
from .models import Member, MatchEntry

import logging

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

# -----------------------------------------------------------------
# 会員情報・会員登録
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

# -----------------------------------------------------------------
# 会員情報更新
# -----------------------------------------------------------------
@api_view(['POST'])
def updateMember(request):
	member = Member.objects.get(id=request.data['id'])
	serializer = MemberSerializer(member, data={'name': request.data['name'], 'dept': request.data['dept']})
	
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

# -----------------------------------------------------------------
# マッチ登録
# -----------------------------------------------------------------
@api_view(['POST'])
def newMatch(request):
	expected_date = parse(request.data['expected_date'])
	start = localtime(expected_date).replace(hour=0, minute=0, second=0, microsecond=0)
	end = localtime(expected_date).replace(hour=23, minute=59, second=59, microsecond=59)
	match_data = {}
	match_list = MatchEntry.objects.filter(Q(expected_date__range=(start, end)) & Q(partner_member_id__isnull=True)).exclude(member_id=request.data['member_id'])

	if match_list.count() == 0:
		serializer = MatchEntrySerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
		match_data = {
			'match_success': False
		}
	else:
		match = choice(match_list)
		serializer = MatchEntrySerializer(match, data={'partner_member_id': request.data['member_id']})
		if serializer.is_valid():
			serializer.save()
		member = Member.objects.get(id=match.member_id)
		match_data = {
			'match_success': True,
			'match_date': match.expected_date,
			'partner_mail': member.mail,
			'partner_name': member.name,
			'partner_dept': member.dept,

		}

	return Response(match_data)

# -----------------------------------------------------------------
# マッチ履歴
# -----------------------------------------------------------------
@api_view(['GET'])
def memberMatchList(request, pk):
	entries = MatchEntry.objects.select_related('partner_member_id').filter(Q(member_id=pk) | Q(partner_member_id=pk)).annotate(null_count=Count('partner_member_id')).order_by('null_count', '-expected_date')
	entry_data = []
	entry_data = []

	for obj in entries:
		if obj.partner_member_id is None:
			data = {
				'id': obj.id,
				'lunch_date': obj.expected_date,
			}
		else:
			if int(obj.member_id) == int(pk):
				data = {
					'id': obj.id,
					'lunch_date': obj.expected_date,
					'partner_mail': obj.partner_member_id.mail,
					'partner_name': obj.partner_member_id.name,
					'partner_dept': obj.partner_member_id.dept,
				}
			else:
				member = Member.objects.get(id=obj.member_id)
				data = {
					'id': obj.id,
					'lunch_date': obj.expected_date,
					'partner_mail': member.mail,
					'partner_name': member.name,
					'partner_dept': member.dept,
				}

		entry_data.append(data)

	return Response(entry_data)

# -----------------------------------------------------------------
# マッチ削除
# -----------------------------------------------------------------
@api_view(['DELETE'])
def deleteMatch(request, pk):
	task = MatchEntry.objects.get(id=pk)
	task.delete()
	return Response('Item succsesfully deleted!')
	