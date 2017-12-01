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
        item: '',
        idUser: '',
        token: localStorage.getItem('token'),
        isAdmin: localStorage.getItem('admin')
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

            if (this.token == undefined) {
                alert("Please login first!")
            } else {
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
            }


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
                customer: this.idUser,
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
        getHistoryCart(id) {
            axios.get(`http://localhost:3000/api/transactions/${id}`)
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
                    setTimeout(5000)
                    alert("Successfully registered. Please login to start shopping!")
                    location.reload()
                })
                .catch((reason) => {
                    this.err = "Username is already used"
                })

        },
        login() {
            axios.post(`http://localhost:3000/api/users/signin`, {
                username: this.username,
                password: this.password
            })
                .then((dataUser) => {
                    localStorage.setItem('token', dataUser.data.token)
                    localStorage.setItem('id', dataUser.data.data._id)
                    localStorage.setItem('admin', dataUser.data.data.isAdmin)
                    setTimeout(5000)
                    alert("Halooo, " + dataUser.data.data.username)
                    location.reload()

                })
                .catch((reason) => {
                    console.log(reason)
                    alert("Username or password is invalid")
                })

            // console.log(document.getElementById("username").value)

        },
        deleteOneBook: function (book) {

            axios.delete(`http://localhost:3000/api/books/${book.idBook}`)
                .then((data) => {
                    alert("Deleted 1 book...")
                    location.reload()
                })
                .catch((reason) => {
                    console.log(reason)
                })
        },
        getDataEditBook: function (index) {

            this.item = this.items[index]
            console.log(this.item)
        },
        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            localStorage.removeItem('id')
            this.history = ''
            alert("Sampai jumpa")
            location.replace('http://127.0.0.1:8080/')
        }
    },
    created() {
        this.getDataBook()

    },
    mounted() {
        if (this.token != undefined) {
            this.idUser = localStorage.getItem('id')
            this.getHistoryCart(this.idUser)
        }

    }
})