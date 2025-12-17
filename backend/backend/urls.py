from django.contrib import admin
from django.urls import path, include
from categories.views import CategoryView
from users.views import RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Registro e Autentificação dos Usuarios
    path('api/register/', RegisterView.as_view()),
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/refresh/', TokenRefreshView.as_view()),
    path('api/profile/', ProfileView.as_view()),
    path('api/category/', include('categories.urls')),
    path('api/record/', include('records.urls')),
]
