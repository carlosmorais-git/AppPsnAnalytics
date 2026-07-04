from django.contrib import admin
from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from project.settings import SPECTACULAR_SETTINGS
from apps.games.views.scraping_views import home_ok_view

schema_view = get_schema_view(
    openapi.Info(
        title=SPECTACULAR_SETTINGS['TITLE'],
        description=SPECTACULAR_SETTINGS['DESCRIPTION'],
        default_version=SPECTACULAR_SETTINGS['VERSION'],
        contact=openapi.Contact(email=SPECTACULAR_SETTINGS['CONTACT_EMAIL']),
    ),
    public=SPECTACULAR_SETTINGS['PUBLIC'],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home_ok_view.as_view(), name="home_ok_view"),
    path("api/", include("apps.games.urls")),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0),name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0),name="schema-redoc"),
]
