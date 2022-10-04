app.component('CartItem', {
    data: function() {
        return {
            uid: "sli-" + Math.floor(Math.random() * 10e16), //generate random number
        }
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    methods: {
        add: function() {
            this.item.qty++;
        },

        subtract() {
            this.item.qty--;

            if(this.item.qty <= 0) {
                this.$emit('remove-item', this.item);
            }
        },
    },

    template: `<tr>
                   <td>
                        <small>{{ item.name }}</small>
                   </td>
                   <td class="text-center">
                        <small>Qty: {{ item.qty }}</small>
                   </td>
                   <td class="text-center">
                        <button class="btn btn-tiny bg-transparent no-border text-white" @click="add"><i class="fas fa-plus-circle"></i></button>
                   </td>
                   <td class="text-center">  
                        <button class="btn btn-tiny bg-transparent no-border text-white" @click="subtract"><i class="fas fa-minus-circle"></i></button>
                   </td>
                   <td class="text-right">
                        <small>Price: </small>
                   </td>
                   <td>
                        <small>{{ (item.price * item.qty).toFixed(2) }}</small>
                   </td>
               </tr>`,
});