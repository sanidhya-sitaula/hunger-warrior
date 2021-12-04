from django.urls import path, include
#from .views import article_list, article_details 
from .views import ListingViewSet, UsersViewSet,LoginViewSet, OrderViewSet, RequestViewSet, TotalValueViewSet, SignUpViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter() 
router.register('listings', ListingViewSet, basename = 'listings')
router.register('users', UsersViewSet, basename = 'users')
router.register('login', LoginViewSet, basename = 'login')
router.register('signup', SignUpViewSet, basename = 'signup')
router.register('orders', OrderViewSet, basename = 'orders' )
router.register('requests', RequestViewSet, basename = 'requests')
router.register('totalValue', TotalValueViewSet, basename = 'totalValue')

urlpatterns = [
    path('', include(router.urls)),
    # path('articles/', ArticleList.as_view()),
    # path('articles/<int:id>/', ArticleDetails.as_view()),
]

