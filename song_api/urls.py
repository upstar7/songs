from django.urls import path
from song_api.views import Songs, SongDetail

urlpatterns = [
    path('', Songs.as_view()),
    path('<int:pk>/<str:option>', SongDetail.as_view()),
    path('<int:pk>', SongDetail.as_view())
]
