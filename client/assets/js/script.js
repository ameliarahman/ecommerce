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
        err: '',
        title: '',
        author: '',
        category: '',
        image_url: '',
        harga: '',
        id: '',
        stock: 0,
        item: ''
    },
    methods: {
        getDataBook() {
            axios.get("http://localhost:3000/api/books")
                .then(({ data }) => {
                    this.items = data
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
            this.jumlahCart += 1
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
        login() {

        },
        deleteOneBook: function (book) {
            axios.delete(`http://localhost:3000/api/books/${book.idBook}`)
                .then((data) => {
                    alert("Deleted 1 book!")
                    location.reload()
                })
                .catch((reason) => {
                    console.log(reason)
                })
        },
        getDataEditBook: function (index) {

            this.item = this.items[index]
            console.log(this.item)
        }
    },


    created() {
        this.getDataBook()
        this.getHistoryCart()
    }
})