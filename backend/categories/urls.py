from rest_framework.routers import DefaultRouter
from .views import CategoryView

router = DefaultRouter()
router.register(r'', CategoryView, basename='category')

urlpatterns = router.urls