import uuid
from django.db import models

# Create your models here.


class Song(models.Model):

    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    release_date = models.DateField(auto_now_add=True)
    genre = models.CharField(max_length=100)
    like_count = models.IntegerField(blank=True, default=0)

    class Meta:
        db_table = 'songs'
        ordering = ['title']

    def __str__(self) -> str:
        return self.title
