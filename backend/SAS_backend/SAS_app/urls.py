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
    Statistics,
    Get_product_details,
    Get_category_details,
    Calculate_metrics,
    Category_sales,
    Monthwise_revenue,
    LoginView
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
    path('statistics/', Statistics, name='statistics'),
    path('get_product_details/<int:product_id>/', Get_product_details, name='get_product_details'),
    path('get_category_details/<int:category_id>/', Get_category_details, name='get_category'),
    path('calculate_metrics/', Calculate_metrics, name='calculate_metrics'),
    path("category_sales/",Category_sales, name='get_category_sales'),
    path("monthwise_revenue/",Monthwise_revenue, name='get_monthwise_revenue'),
    path('login/', LoginView.as_view(), name='login')
]



