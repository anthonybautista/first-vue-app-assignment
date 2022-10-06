const app = Vue.createApp({
    data(){
        return {
            categories: [
                {label: 'Milk', value: 'Milk'},
                {label: 'Cheese', value: 'Cheese'},
                {label: 'Yogurt', value: 'Yogurt'},
                {label: 'Ice Cream', value: 'Ice Cream'},
            ],
            products: [],
            cartItems: [],
            rightDrawerOpen: false,
            selected: "Milk",
            productsList : {
                'Milk' : [
                    new Product('Whole Milk', '1 Gallon', 3.49, 'images/whole-milk.png'),
                    new Product('2% Milk', '1 Gallon', 3.29, 'images/2-milk.png'),
                    new Product('Chocolate Milk', '1 Gallon', 4.49),
                ],
                'Cheese' : [
                    new Product('Cheddar Cheese', '8 oz', 3.99, 'images/cheddar.png'),
                    new Product('Gouda Cheese', '8 oz', 4.50, 'images/gouda.png'),
                    new Product('Meunster Cheese', '8 oz', 4.25, 'images/meunster.png'),
                    new Product('Cheese Curds', '1 lb', 5.99, 'images/curds.png'),
                ],
                'Yogurt' : [
                    new Product('Strawberry Yogurt', '32 oz', 3.99, 'images/strawberry-yogurt.png'),
                    new Product('Peach Yogurt', '32 oz', 3.99),
                ],
                'Ice Cream' : [
                    new Product('Strawberry Ice Cream', '16 oz', 3.99,'images/strawberry-ice.png'),
                    new Product('Chocolate Ice Cream', '16 oz', 3.99,'images/chocolate-ice.png'),
                    new Product('Mint Chip Ice Cream', '16 oz', 3.99,'images/mint-ice.png'),
                    new Product('Butter Pecan Ice Cream', '16 oz', 3.99,'images/butter-ice.png'),
                ],
            },
        }
    },

    methods: {
        show(category) {
            this.products = this.productsList[category];
        },
        toggleRightDrawer() {
            this.rightDrawerOpen = !this.rightDrawerOpen;
        },
        addToCart(itemName, itemPrice) {
            let itemIndex = this.itemInCart(itemName);
            if (itemIndex != null) {
                this.cartItems[itemIndex].qty++;
                this.rightDrawerOpen = true;
            } else {
                let cartItem = {name: itemName, qty: 1, price: itemPrice};
                this.cartItems.push(cartItem);
                this.rightDrawerOpen = true;
            }
        },
        removeIt(item) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
        },
        emptyCart() {
            this.cartItems.splice(0,this.cartItems.length);
        },
        itemInCart(name) {
            for(let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].name === name) {
                    return i;
                }
            }
            return null;
        }
    },

    // computed: values that are updated and cached if dependencies change
    computed: {

    },

    //mounted:  called after the instance has been mounted,
    mounted: function () {
        if(localStorage.getItem('cartItems')){
            this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
        }
    },

    // watch:   calls the function if the value changes
    // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
    watch: {
        cartItems: {
            handler: function(newList) {
                localStorage.setItem('cartItems', JSON.stringify(newList));
            },
            deep: true,
        },
        selected: {
            handler: function(newSelection) {
                this.show(newSelection);
            },
            immediate: true,
        }
    }
})