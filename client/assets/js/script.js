var app = new Vue({
    el: '#app',
    data: {
        items: [],
        transaction: [],
        jumlahCart: 0
    },
    methods: {
        getDataBook() {
            axios.get("http://localhost:3000/api/books")
                .then(({ data }) => {
                    this.items = data
                    console.log('udah masuk items belum ', this.items)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        addToCartShopping: function (data) {
            // console.log("Halooooooooooooooooooooooooooo")
            const status = false
            this.transaction.forEach((transaksi, index) => {

                if (transaksi._id == data._id) {
                    status = true
                    data.quantity = transaksi.quantity + 1
                    this.transaction.splice(index, 1, data)

                }

            })
            if (!status) {
                this.transaction.push({
                    quantity: 1,
                    total: data.harga,
                    ...data
                })
            }


            // if (this.transaction.length < 1) {
            //     // console.log("Masukkkkk if")
            //     data.quantity = 1
            //     data.total = data.harga
            //     this.transaction.push(data)
            // } else {
            //     this.transaction.forEach(function (transaksi) {
            //         if (transaksi._id == data._id) {
            //             data.quantity += 1
            //             data.total = data.quantity * data.harga
            //         }
            //     });
            //     data.quantity = 1
            //     data.total = data.harga
            //     this.transaction.push(data)
            // }
            console.log(this.transaction)
            this.jumlahCart = this.transaction.length

        }
    },

    created() {
        this.getDataBook()
    }
})