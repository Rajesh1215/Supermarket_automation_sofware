from rest_framework import viewsets
from .models import Employee, ProductCategory, Product, ProductImage, Inventory, ProductItem, Order, Sale, Customer, Leave, Return, Duty
from .serializers import EmployeeSerializer, ProductCategorySerializer, ProductSerializer, ProductImageSerializer, InventorySerializer, ProductItemSerializer, OrderSerializer, SaleSerializer, CustomerSerializer, LeaveSerializer, ReturnSerializer, DutySerializer
from django.db.models import Count , Sum,F, ExpressionWrapper, fields, DecimalField
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q
from decimal import Decimal  # Import the Decimal class
from django.db.models.functions import TruncMonth
from datetime import datetime
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from datetime import timedelta



class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class ProductItemViewSet(viewsets.ModelViewSet):
    queryset = ProductItem.objects.all()
    serializer_class = ProductItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

class ReturnViewSet(viewsets.ModelViewSet):
    queryset = Return.objects.all()
    serializer_class = ReturnSerializer

class DutyViewSet(viewsets.ModelViewSet):
    queryset = Duty.objects.all()
    serializer_class = DutySerializer


@api_view(['GET'])
def Statistics(request):
    # Total number of categories
    total_categories = ProductCategory.objects.count()

    # Total number of products
    total_products = Product.objects.count()

    # Total number of items
    total_items = ProductItem.objects.count()

    # Number of nearly sold-out products (assumed nearly sold out if stock is less than 5)
    nearly_sold_out_products = Product.objects.filter(inventory__stock__lt=5).count()

    # Number of nearly expiring products (assumed nearly expiring if expiry is within 7 days)
    nearly_expiring_products = Product.objects.filter(inventory__expiry__lte=(timezone.now() + timedelta(days=7))).count()

    # Number of products with good expiry time (assumed good expiry time if more than 30 days)
    good_expiry_products = Product.objects.filter(inventory__expiry__gte=(timezone.now() + timedelta(days=30))).count()

    # Number of expired items
    expired_items = ProductItem.objects.filter(inventory__expiry__lt=timezone.now()).count()
    expired_products = ProductItem.objects.filter(inventory__expiry__lt=timezone.now()).values("product__name").annotate(
        item_count=Count('product__name')
    ).count()
    # Number of sold items
    sold_items = ProductItem.objects.filter(sold=True).count()

    out_of_stock = Product.objects.annotate(
        num_unverified_items=Count(
            'productitem',
            filter=~Q(productitem__verified=True)  # Exclude ProductItems with verified=True
        )
    ).filter(num_unverified_items=0).count()
    # Number of verified items
    verified_items = ProductItem.objects.filter(verified=True,sold=False).count()
    unverified_items = ProductItem.objects.filter(verified=False,sold=False).count()

    # Grouped count of items by product
    items_by_product = ProductItem.objects.values('product__name').annotate(item_count=Count('id'))

    # Grouped count of items by category
    items_by_category = ProductItem.objects.values('product__product_category__name').annotate(item_count=Count('id'))

    Have_to_add = Inventory.objects.filter(stock_status='have to add').values('stock_status').aggregate(Total_stock=Sum('purchased_stock'))['Total_stock']

    return Response({
        'total_categories': total_categories,
        "Have_to_add":Have_to_add,
        'total_products': total_products,
        'total_items': total_items,
        "out_of_stock":out_of_stock,
        "expired_products":expired_products,
        'nearly_sold_out_products': nearly_sold_out_products,
        'nearly_expiring_products': nearly_expiring_products,
        'good_expiry_products': good_expiry_products,
        'expired_items': expired_items,
        'sold_items': sold_items,
        'verified_items': verified_items,
        "unverified_items":unverified_items,
        'items_by_product': items_by_product,
        'items_by_category': items_by_category,
        
    })

@api_view(['GET'])
def Get_product_details(request, product_id):
    try:

        # Verified items for the given product
        verified_items = ProductItem.objects.filter(product=product_id, verified=True)
        verified_items_count=verified_items.count()
        # Unverified items for the given product
        unverified_items = ProductItem.objects.filter(product=product_id, verified=False)
        unverified_items_count=unverified_items.count()
        # Total items for the given product
        total_items = ProductItem.objects.filter(product=product_id)
        total_items_count=total_items.count()
        status_label = 'Out of Stock' if verified_items_count == 0 else ('Less Stock' if verified_items_count < 2 else 'Good Stock')
        # Sold items for the given product
        sold_items = ProductItem.objects.filter(product=product_id, sold=True, verified=True)
        sold_items_count =sold_items.count()
        # Unsold items for the given product
        unsold_items = ProductItem.objects.filter(product=product_id, sold=False, verified=True)
        unsold_items_count = unsold_items.count()
        # Unexpired items for the given product
        unexpired_items = ProductItem.objects.filter(product=product_id, verified=True, inventory__expiry__gte=timezone.now())
        unexpired_items_count = unexpired_items.count()
        # Expired items for the given product
        expired_items = ProductItem.objects.filter(product=product_id, verified=True, inventory__expiry__lt=timezone.now())
        expired_items_count = expired_items.count()
        # Nearly expired items for the given product (within 7 days)
        nearly_expired_items = ProductItem.objects.filter(product=product_id, verified=True, inventory__expiry__range=[timezone.now(), timezone.now() + timezone.timedelta(days=7)])
        nearly_expired_items_count=nearly_expired_items.count()


        # Response with all details
        response_data = {
    "status": status_label,
    "verified_items_count": verified_items_count,
    "unverified_items_count": unverified_items_count,
    "total_items_count": total_items_count,
    "sold_items_count": sold_items_count,
    "unsold_items_count": unsold_items_count,
    "unexpired_items_count": unexpired_items_count,
    "expired_items_count": expired_items_count,
    "nearly_expired_items_count":nearly_expired_items_count,
    'total_items': total_items_count,
    'sold_items': serialize_product_items(sold_items),
    'unsold_items': serialize_product_items(unsold_items),
    'unexpired_items': serialize_product_items(unexpired_items),
    'expired_items': serialize_product_items(expired_items),
    'nearly_expired_items': serialize_product_items(nearly_expired_items),
    'verified_items': serialize_product_items(verified_items),
    'unverified_items': serialize_product_items(unverified_items),
}

        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def serialize_product_items(items):
    serialized_items = []
    for item in items:
        serialized_item = {
            'id': item.id,
            'product_id': item.product.product_id,
            'inventory_id': item.inventory.inventory_id,
            'damaged': item.damaged,
            'sold': item.sold,
            'verified': item.verified,
        }
        serialized_items.append(serialized_item)
    return serialized_items

@api_view(['GET'])
def Get_category_details(request, category_id=1):
    try:
        # Count of products with expired items
        products_with_expired_items = ProductItem.objects.filter(product__product_category=category_id,inventory__expiry__lt=timezone.now(),verified=True,sold=False).values('product__name').annotate(
            expired_products=Count('id', distinct=True))

        # Count of products with nearly expired items (within 7 days)
        products_with_nearly_expired_items = ProductItem.objects.filter(product__product_category=category_id,
            inventory__expiry__range=[timezone.now(), timezone.now() + timezone.timedelta(days=7)]).values(
            'product__name').annotate(nearly_expired_products=Count('id', distinct=True))

        # Count of products with good stock (total stock 5 or more)
        products_with_good_stock = ProductItem.objects.filter(product__product_category=category_id,inventory__stock__gte=5).values('product__name').annotate(
            good_stock_products=Count('id', distinct=True))

        # Count of products out of stock
        products_out_of_stock = ProductItem.objects.filter(product__product_category=category_id,inventory__stock=0).values('product__name').annotate(
            out_of_stock_products=Count('id', distinct=True))

        # Count of products nearly sold out (stock less than 5)
        products_nearly_sold_out = ProductItem.objects.filter(product__product_category=category_id,inventory__stock__lt=5).values('product__name').annotate(
            nearly_sold_out_products=Count('id', distinct=True))

        products_of_cat=Product.objects.filter(product_category=category_id).values()
        # Response with all details
        response_data = {
            'expired_products': products_with_expired_items,
            'nearly_expired_products': products_with_nearly_expired_items,
            'good_stock_products': products_with_good_stock,
            'out_of_stock_products': products_out_of_stock,
            'nearly_sold_out_products': products_nearly_sold_out,
            "products_of_cat":products_of_cat,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def Calculate_metrics(request):
    try:
        # Calculate total expense (sum of stock expense and other expense)
        total_expense = Inventory.objects.aggregate(
            total_expense=Sum(F('stock_expense') + F('other_expense'))
        )['total_expense'] or Decimal(0)

        # Calculate total revenue (sum of total amount from sales)
        total_revenue = Sale.objects.aggregate(total_revenue=Sum('total_amount'))['total_revenue'] or Decimal(0)

        # Calculate cost price of each item using inventory ID
        # inventory_costs = Inventory.objects.annotate(
        #     cost_price=ExpressionWrapper(
        #         (F('stock_expense') + F('other_expense'))//F("purchased_stock"),
        #         output_field=DecimalField()
        #     )
        # )
        total_cost_price = Sum(
            (F('sale__product__inventory__stock_expense') + F('sale__product__inventory__other_expense')) /
            F('sale__product__inventory__purchased_stock'),
            output_field=DecimalField()
        )


        orders_with_total_cost_price = Order.objects.annotate(
            total_cost_price=total_cost_price
        ).values()

        orders_with_total_profit_price = Order.objects.annotate(
            total_cost_price=total_cost_price- (F('sale__total_amount'))
        ).values()

        all_orders_with_total_cost_price = Order.objects.aggregate(
            total_cost_price=total_cost_price
        ).values()

        all_orders_with_total_profit_price = Order.objects.aggregate(
            total_cost_price=total_cost_price- (F('sale__total_amount'))
        ).values()
        all_orders_with_total_profit_price_alt = Sale.objects.values("order").annotate( profit=Sum(F('total_amount'))-Sum(
            ((F('product__inventory__stock_expense') + F('product__inventory__other_expense')) /
            F('product__inventory__purchased_stock'))*F('quantity'),
            output_field=DecimalField()
        ))
        all_orders_with_total_profit_price_alt_count=all_orders_with_total_profit_price_alt.count()
        total_profit = all_orders_with_total_profit_price_alt.aggregate(total_profit=Sum('profit'))['total_profit'] or 0
        productitems = ProductItem.objects.filter(  Q( sold=False ,damaged=True) | Q(sold=False ,inventory__expiry__lt=timezone.now()))
        productitems_loss_dam_ex=productitems.aggregate( total_loss  =  Sum(
            (F('inventory__stock_expense') + F('inventory__other_expense')) /
            F('inventory__purchased_stock'),
            output_field=DecimalField()
        ) )

        today_orders = Order.objects.filter(created_at__date=timezone.now().date())

        # Calculate total revenue for today's orders
        today_revenue = today_orders.aggregate(today_revenue=Sum('sale__total_amount'))['today_revenue'] or Decimal(0)

        # Calculate total cost price for today's orders
        today_cost_price = today_orders.aggregate(
            today_cost_price=total_cost_price
        )['today_cost_price'] or Decimal(0)

        # Calculate total profit price for today's orders
        today_profit_price = today_revenue- today_cost_price 

        # Filter product items for unsold and expired items
        productitems = ProductItem.objects.filter(
            Q(sold=False, damaged=True) | Q(sold=False, inventory__expiry__lt=timezone.now())
        )

        # Calculate total loss for unsold and expired items
        productitems_loss_dam_ex = productitems.aggregate(
            total_loss=Sum(
                (F('inventory__stock_expense') + F('inventory__other_expense')) /
                F('inventory__purchased_stock'),
                output_field=DecimalField()
            )
        )


        return Response({
            "total_expense": total_expense,
            "total_revenue": total_revenue,
            "productitems_loss_dam_ex":productitems_loss_dam_ex,
            "productitems": productitems.values(),
            "all_orders_with_total_cost_price":all_orders_with_total_cost_price,
            "all_orders_with_total_profit_price":all_orders_with_total_profit_price,
            "orders_with_total_cost_price":orders_with_total_cost_price,
            "orders_with_total_profit_price":orders_with_total_profit_price,
            "today_orders_revenue": today_revenue,
            "today_orders_cost_price": today_cost_price,
            "today_orders_profit_price": today_profit_price,
            "all_orders_with_total_profit_price_alt":all_orders_with_total_profit_price_alt,
            "all_orders_with_total_profit_price_alt_count":all_orders_with_total_profit_price_alt_count,
            "total_profit":total_profit,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def Category_sales(request):
    try:
        # Annotate each sale with the total sales amount (sales * quantity)
        # Coalesce is used to handle cases where quantity is NULL
        catogary_sales=Sale.objects.values("product__product_category").annotate(
            total_sales_by_cat=Count("quantity")
        )
        product_sales=Sale.objects.values("product").annotate(
            total_sales_by_pro=Sum("quantity")
        )
        product_revenue=Sale.objects.values("product").annotate(
            total_revenue_by_pro=Sum("total_amount")
        )

        return Response({
            "category_sales_data": catogary_sales,
            "product_sales_data":product_sales,
            "product_revenue":product_revenue,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def Monthwise_data(request):
    try:
        # Monthly Revenue
        monthly_revenue = Order.objects.values('created_at__year', 'created_at__month').annotate(
            total_revenue=Sum('total_price'),
            order_count=Count('order_id')
        )

        # Monthly Expense
        monthly_expense = Inventory.objects.values('date_of_purchase__year', 'date_of_purchase__month').annotate(
            total_stock_expense=Sum('stock_expense'),
            total_other_expense=Sum('other_expense'),
            total_expense=Sum('stock_expense') + Sum('other_expense'),
            stock_count=Count('inventory_id')
        )

        result = []
        for entry in monthly_revenue:
            month_year = datetime(entry['created_at__year'], entry['created_at__month'], 1)
            result.append({
                'month_year': month_year,
                'total_revenue': entry['total_revenue'],
                'order_count': entry['order_count'],
                'total_stock_expense': 0,
                'total_other_expense': 0,
                'total_expense': 0,
                'stock_count': 0,
            })

        for entry in monthly_expense:
            month_year = datetime(entry['date_of_purchase__year'], entry['date_of_purchase__month'], 1)
            matching_entry = next((item for item in result if item['month_year'] == month_year), None)
            if matching_entry:
                matching_entry.update({
                    'total_stock_expense': entry['total_stock_expense'],
                    'total_other_expense': entry['total_other_expense'],
                    'total_expense': entry['total_expense'],
                    'stock_count': entry['stock_count'],
                })

        return Response({'monthly_data': result})

    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def Order_sales(request,order_id=1):
    try:
        Orders_sales = Sale.objects.filter(order_id=order_id).values()
        return Response({'Orders_sales': Orders_sales})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            # Retrieve the user based on the provided username
            user = Employee.objects.get(username=username)

            # Check if the provided password matches the stored password
            if password == user.password:
                # Password is correct, return user's status (role)
                return Response({'status': user.status,"user_id":user.user_id}, status=status.HTTP_200_OK)
            else:
                # Password is incorrect
                return Response({'error': 'Invalid username or password'})
        
        except Employee.DoesNotExist:
            # User with the provided username does not exist
            return Response({'error': 'Invalid username or password'})
        
from django.db import transaction



@csrf_exempt
@require_POST
def Make_order(request):
    try:
        # Get the JSON data from the request body
        data = json.loads(request.body.decode('utf-8'))

        # Assuming the form fields are sent as an array named 'orderItems'
        order_items = data.get('orderItems', [])
        customer = data.get('customer', )

        # Step 1: Set 'sold' to True for each ProductItem in the list
        for item in order_items:
            product_item_id = item.get('productItemId', '')
            # Assuming product_item_id is a string
            product_item = ProductItem.objects.get(id=product_item_id)
            product_item.sold = True
            product_item.save()

        # Step 2: Count the number of products based on all ProductItem instances in the list
        total_quantity = len(order_items)
        order = Order.objects.create(total_price=0, customer_id=customer, created_at=timezone.now())
        latest_order = Order.objects.latest('order_id')

        # Step 3: Create records in the Sale model for each product
        sales = []
        for item in order_items:
            
            product_item_id = item.get('productItemId', '')
            product_item = ProductItem.objects.get(id=product_item_id)
            product = product_item.product
            product_price = product.price
            quantity = 1  # Assuming each ProductItem corresponds to one quantity
            total_amount = quantity * product_price

            # Create a record in the Sale model
            sale = Sale.objects.create(order_id=latest_order.order_id, product=product, quantity=quantity, product_price=product_price, total_amount=total_amount)
            sales.append(sale)

        # Step 4: Calculate the total amount for the order based on the sales
        total_amount = sum(sale.total_amount for sale in sales)

        # Step 5: Create a record in the Order model with the calculated total amount
        order=Order.objects.get(order_id=latest_order.order_id)
        order.total_price = total_amount
        order.save()
        # Return a success response
        return JsonResponse({'message': 'Order placed successfully.', 'order_items': order_items})

    except Exception as e:
        # Return an error response
        return JsonResponse({'error': str(e)}, status=500)