var app = new Vue({
    el: '#app',
    data: {
        items: [],
        transaction: [],
        jumlahCart: 0,
        total: 0
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
            let status = false
            if (this.transaction.length > 0) {
                this.transaction.forEach((transaksi, index) => {
                    if (transaksi._id == data._id) {
                        status = true
                        data.quantity = transaksi.quantity + 1
                        data.total = data.quantity * transaksi.harga
                        this.transaction.splice(index, 1, data)
                    }
                    // console.log("Halooooooooooooooooooo masuk sini ya")
                    // console.log(transaksi._id, "====", data._id)
                })

                if (!status) {
                    data.quantity = 1
                    data.total = data.harga
                    this.transaction.push(data)
                }
            } else {
                data.quantity = 1
                data.total = data.harga
                this.transaction.push(data)
            }
            this.jumlahCart = this.transaction.length

        },
        totalPembayaran() {
            this.transaction.forEach((transaksi) => {
                this.total += transaksi.total
            })
        }
    },

    created() {
        this.getDataBook()
    }
})