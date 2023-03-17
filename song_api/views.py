from rest_framework.response import Response
from rest_framework import status, generics
from song_api.models import Song
from song_api.serializers import SongSerializer
import math
from datetime import datetime


class Songs(generics.GenericAPIView):
    serializer_class = SongSerializer
    queryset = Song.objects.all()

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        songs = Song.objects.all()
        total_songs = songs.count()
        if search_param:
            songs = songs.filter(title__icontains=search_param)
        serializer = self.serializer_class(songs[start_num:end_num], many=True)
        return Response({
            "status": "success",
            "total": total_songs,
            "page": page_num,
            "last_page": math.ceil(total_songs / limit_num),
            "songs": serializer.data
        })

    def post(self, request):
        print("sdfsdfsdfsdfsdfsdfsdfsdf")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "song": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SongDetail(generics.GenericAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def get_song(self, pk):
        try:
            return Song.objects.get(pk=pk)
        except:
            return None

    def get(self, request, pk):
        song = self.get_song(pk=pk)
        if song == None:
            return Response({"status": "fail", "message": f"song with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(song)
        return Response({"status": "success", "song": serializer.data})

    def put(self, request, pk, option=None):
        song = self.get_song(pk)
        if song == None:
            return Response({"status": "fail", "message": f"song with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            song, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.validated_data['updatedAt'] = datetime.now()
            if option == 'like':
                serializer.validated_data['like_count'] += 1
            if option == None:
                serializer.validated_data['like_count'] = 0
            serializer.save()
            return Response({"status": "success", "song": serializer.data})
        return Response({"status": "fail", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        song = self.get_song(pk)
        if song == None:
            return Response({"status": "fail", "message": f"song with Id: {pk} not found"}, status=status.HTTP_404_NOT_FOUND)

        song.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
