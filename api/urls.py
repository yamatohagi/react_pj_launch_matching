from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('entry-list/', views.entryList, name="entry-list"),
	path('entry-detail/<str:pk>/', views.entryDetail, name="entry-detail"),
	path('create-entry/', views.createEntry, name="create-entry"),
	path('delete-entry/', views.deleteEntry, name="delete-entry"),
	path('search-closest-entry/', views.searchClosestEntry, name="search-closest-entry"),
]
