from django.urls import path
from . import views

urlpatterns = [
	path('set-get-member/', views.setGetMember, name="set-get-member"),
	path('update-member/', views.updateMember, name="update-member"),
	path('new-match/', views.newMatch, name="new-match"),
	path('member-match-list/<str:pk>/', views.memberMatchList, name="member-match-list"),
	path('delete-match/<str:pk>/', views.deleteMatch, name="delete-match"),
]