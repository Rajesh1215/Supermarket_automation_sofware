from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet,
    ProductCategoryViewSet,
    ProductViewSet,
    ProductImageViewSet,
    InventoryViewSet,
    ProductItemViewSet,
    OrderViewSet,
    SaleViewSet,
    CustomerViewSet,
    LeaveViewSet,
    ReturnViewSet,
    DutyViewSet,
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'productcategories', ProductCategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'productimages', ProductImageViewSet)
router.register(r'inventories', InventoryViewSet)
router.register(r'productitems', ProductItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'leaves', LeaveViewSet)
router.register(r'returns', ReturnViewSet)
router.register(r'duties', DutyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path("My_api_view",My_api_view,name='my_api_view'),
]
