from django.contrib import admin
from .models import Employee, ProductCategory, Product,ProductImage, Inventory, ProductItem, Order, Sale, Customer, Leave, Return, Duty

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'name', 'dob', 'mail_id', 'status', 'performance', 'date_of_join')
    search_fields = ('user_id', 'name', 'mail_id')

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('product_category_id', 'name')
    search_fields = ('product_category_id', 'name')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_id', 'name', 'product_category', 'description', 'price')
    search_fields = ('product_id', 'name', 'product_category__name')

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product','image')
    search_fields = ('product','image')

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('inventory_id', 'product', 'stock_status', 'purchased_stock', 'expiry', 'stock_expense', 'other_expense', 'stock', 'date_of_purchase')
    search_fields = ('inventory_id', 'product__name', 'stock_status')

@admin.register(ProductItem)
class ProductItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'inventory', 'damaged', 'sold', 'verified')
    search_fields = ('id', 'product__name', 'inventory__inventory_id')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'total_price', 'customer_id', 'created_at')
    search_fields = ('order_id', 'customer_id')

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('sale_id', 'order', 'product', 'quantity', 'product_price', 'total_amount')
    search_fields = ('sale_id', 'order__order_id', 'product__name')

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'name', 'place', 'dob')
    search_fields = ('customer_id', 'name')

@admin.register(Leave)
class LeaveAdmin(admin.ModelAdmin):
    list_display = ('date', 'employee', 'reason')
    search_fields = ('date', 'employee__name', 'reason')

@admin.register(Return)
class ReturnAdmin(admin.ModelAdmin):
    list_display = ('return_id', 'product_item_id')
    search_fields = ('return_id', 'product_item_id__id')

@admin.register(Duty)
class DutyAdmin(admin.ModelAdmin):
    list_display = ('staff_cat', 'work', 'employee', 'status', 'deadline')
    search_fields = ('staff_cat', 'work', 'employee__name', 'status')
