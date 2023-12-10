from django.db import models
from django.utils import timezone
import datetime


    
class ProductCategory(models.Model):
    product_category_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50,null=False)

    def __str__(self):
        return self.name

class Employee(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50, unique=True, null=False)
    name = models.CharField(max_length=100, null=False)
    dob = models.DateField(default=datetime.date.today)
    mail_id = models.EmailField(null=False)
    password = models.CharField(max_length=100, null=False)
    STATUS_CHOICES = [
        ('owner', 'Owner'),
        ('staff', 'Staff'),
        ('manager', 'Manager'),
        ('supervisor', 'Supervisor'),
    ]
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, null=False)
    performance = models.FloatField(default=60)  # Assuming performance is a float field
    date_of_join = models.DateField(default=datetime.date.today)


    def __str__(self):
        return self.name

class Product(models.Model):
    product_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100,null=False)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE,null=False)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2,null=False)

    def __str__(self):
        return self.name
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.name}"

class Inventory(models.Model):
    STOCK_STATUS_CHOICES = [
        ('in stock', 'In Stock'),
        ('have to add', 'Have to Add'),
        ('sold', 'Sold'),
    ]

    inventory_id = models.IntegerField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    stock_status = models.CharField(max_length=50, choices=STOCK_STATUS_CHOICES)
    purchased_stock = models.IntegerField()
    expiry = models.DateField()
    stock_expense = models.DecimalField(max_digits=10, decimal_places=2)
    other_expense = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    date_of_purchase = models.DateField()

    def __str__(self):
        return str(self.inventory_id)

class ProductItem(models.Model):
    id = models.IntegerField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    damaged = models.BooleanField(default=True)
    sold = models.BooleanField(default=True)
    verified = models.BooleanField(default=True)

    def __str__(self):
        return str(self.id)

class Order(models.Model):
    order_id = models.IntegerField(primary_key=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    customer_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.created_at}"

class Sale(models.Model):
    sale_id = models.IntegerField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.total_amount = self.quantity * self.product_price
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.sale_id)

class Customer(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    place = models.CharField(max_length=50)
    dob = models.DateField()

    def __str__(self):
        return self.name

class Leave(models.Model):
    date = models.DateField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    reason = models.CharField(max_length=50)

    def __str__(self):
        return str(self.employee)

class Return(models.Model):
    return_id = models.IntegerField(primary_key=True)
    product_item_id = models.ForeignKey(ProductItem, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.return_id)

class Duty(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('pending', 'Pending'),
        ('time up', 'Time Up'),
    ]

    staff_cat = models.CharField(max_length=50)
    work = models.TextField()
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    deadline = models.DateField()

    def __str__(self):
        return self.work
