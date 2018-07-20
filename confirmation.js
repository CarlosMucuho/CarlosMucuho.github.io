 var obj = sessionStorage.myObject;
 console.log("out if " + obj);
 var cartList = [];
 if (obj != undefined) {
     console.log("inside if" + obj);
     cartList = JSON.parse(obj);
 }
 console.log("cart " + cartList);

 var getClassArray = document.getElementsByClassName('products');
 var divzero = getClassArray[0];
 var cartLenght = Object.keys(cartList).length;
 var i = 0;
 var total = new Decimal(0);



 if (obj != undefined) {
     for (i = 0; i < cartLenght; i++) {

         var div = document.createElement("div");
         div.setAttribute("class", "item")
         var productName = cartList[i].name;
         var productId = cartList[i].id;
         var quantity = new Decimal(cartList[i].quantity);
         var productPrice = cartList[i].price + " XLM";
         var temp = new Decimal(cartList[i].price);
         temp = temp.times(quantity)
         console.log("price is : " + temp);
         total = total.plus(temp);
         console.log("total is : " + total);
         
         div.innerHTML = '<span class="price">' + productPrice + '</span>' +
             '<p class="item-name">' + productName + '  x ' + quantity + '</p>' +
             ' <p class="item-description"></p>' +
             '</div>'

         divzero.appendChild(div);
     }
 }
 var divTotal = document.createElement("div");
 divTotal.setAttribute("class", "total");
 divTotal.innerHTML = 'Total<span class="price">' + total + ' XLM</span>'
 divzero.appendChild(divTotal);