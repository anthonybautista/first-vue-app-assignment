app.component('Cart', {
    props: {
        title: {
            type: String,
            default: "Cart",
        },
        items: {
            type: Array,
            required: true,
        },
    },

    methods: {
        removeItem(item) {
            this.$emit('remove-item', item);
        },
        getTotal() {
            let total = 0;
            this.items.forEach(item => {
                total += (item.price * item.qty);
            });
            return Number(total.toFixed(2));
        },
        closeDrawer() {
            this.$emit('close-drawer');
        },
        emptyCart() {
            this.$emit('empty-cart');
        }
    },

    template: `<div class="cart q-pa-md">
                <div>
                  <h4 class="q-my-sm">Your Cart</h4>
                </div>
                <table v-if="items.length" id="cartTable" class="q-pa-md">
                  <colgroup>
                    <col span="1" style="width: 30%;">
                    <col span="1" style="width: 20%;">
                    <col span="1" style="width: 10%;">
                    <col span="1" style="width: 15%;">
                    <col span="1" style="width: 15%;">
                    <col span="1" style="width: 10%;">
                  </colgroup>
                    <cart-item v-for="(item, i) in items" 
                    :item="item" 
                    :key="item.name"
                    @remove-item="removeItem"></cart-item>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-right">Total:</td>
                    <td>{{getTotal()}}</td>
                  </tr>
                  <tr>
                    <td class="text-secondary clickable text-center" @click="emptyCart">Empty Cart</td>
                  </tr>
                </table>
                <p v-else>No Items</p>
                <q-btn class="bg-secondary text-accent q-mt-md">Checkout</q-btn>
            </div>`,
})