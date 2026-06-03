
from django.contrib import admin
from django.urls import path,include
from accounts import urls as ac_urls
from recipes import urls as re_urls
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(ac_urls)),
    path('',include(re_urls))
    
]
urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )