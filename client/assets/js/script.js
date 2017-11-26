var app = new Vue({
    el: '#app',
    data: {
        items: [],
        transaction: [],
        jumlahCart: 0,
        total: 0,
        cart: [],
        history: '',
        name: '',
        username: '',
        password: '',
        err: ''
    },
    methods: {
        getDataBook() {
            axios.get("http://localhost:3000/api/books")
                .then(({ data }) => {
                    this.items = data
                    // console.log('udah masuk items belum ', this.items)
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
            this.cart.push(data._id)

        },
        totalPembayaran() {
            this.total = 0
            this.transaction.forEach((transaksi) => {
                this.total += transaksi.total
            })
        },
        removeItem(id) {
            this.transaction.forEach((transaksi, index) => {
                if (transaksi._id == id) {
                    this.transaction.splice(index, 1)
                    this.cart.splice(index, 1)
                    this.total -= transaksi.total
                }
                this.jumlahCart = this.transaction.length
            })

        },
        checkout() {
            // console.log(this.cart)
            axios.post('http://localhost:3000/api/transactions', {
                customer: "5a155567e2b6552086139e2f",
                book: this.cart,
                total: this.total
            })
                .then((response) => {
                    console.log(response)
                    this.cart = []
                    this.transaction = []
                    this.total = 0
                    alert("Thankyou for purchasing in our shop!")
                    this.getHistoryCart()
                    location.reload()
                })
                .catch((reason) => {
                    console.log(reason)
                })

        },
        getHistoryCart() {
            axios.get('http://localhost:3000/api/transactions')
                .then((dataHistory) => {
                    this.history = dataHistory.data
                    // console.log(this.history)
                })
                .catch((reason) => {
                    this.err = reason
                })
        },
        register() {
            axios.post('http://localhost:3000/api/users', {
                username: this.username,
                name: this.name,
                password: this.password,
                isAdmin: false
            })
                .then((response) => {
                    console.log(response)
                    alert("Successfully registered. Please login to start shopping!")
                    location.reload()
                })
                .catch((reason) => {
                    this.err = "Username is already used"
                })

        },
        deleteOneBook: function (book) {
            console.log(book)
            axios.delete(`http://localhost:3000/api/books/${book.idBook}`)
                .then((data) => {
                    alert("1 book deleted!")
                    location.reload()
                })
                .catch((reason) => {
                    console.log(reason)
                })
        }
    },


    created() {
        this.getDataBook()
        this.getHistoryCart()
    }
})