Vue.component('data-book', {
    template: `
    <table class="table table-bordered">
    <thead class="text-center">
        <tr>
            <th>No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th colspan="2">Action</th>
        </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items">
        <td>
            {{index+1}}
        </td>
        <td>
            <img v-bind:src=item.image_url alt="Card image">
        </td>
        <td>
            {{item.title}}
        </td>
        <td>
            {{item.author}}
        </td>
        <td>
            {{item.harga}}
        </td>
        <td>
            <ul>
                <li data-toggle="modal" data-target="#edit-book" @click=editBook(item)><a href="#">Edit</a></li>
            </ul>
        </td>
        <td>
            <a href="#" @click="deleteBook(item._id)">Delete</a>
        </td>
       
    </tr>
    </tbody>
    </table>
    `,
    props: ['items'],
    methods: {
        deleteBook: function (id) {
            this.$emit('delete-book', {
                idBook: id
            })
        },
        editBook: function (book) {
            console.log(book)
        }
    }
})


Vue.component('add-book', {
    template:
    `<div class="modal fade" id="add-book" role="dialog"> 
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center">Add Buku</h4>
                </div>

                <div class="modal-body">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label class="control-label col-sm-2" for="title">Title:</label>
                                <div class="col-sm-8">
                                    <input type="text" name="title" class="form-control" id="title" placeholder="Enter title">
                                </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-2" for="title">Author:</label>
                                <div class="col-sm-8">
                                    <input type="text" name="author" class="form-control" id="author" placeholder="Enter Author">
                                </div>
                        </div>

                        <div class="form-group">
                        <label class="control-label col-sm-2" for="harga">Price :</label>
                            <div class="col-sm-8">
                                <input type="text" name="harga" class="form-control" id="harga" placeholder="Enter Price in Number ex: 30000">
                            </div>
                        </div>

                        <div class="form-group">
                        <label class="control-label col-sm-2" for="image_url">Image :</label>
                            <div class="col-sm-8">
                                <input type="text" name="image_url" class="form-control" id="image_url" placeholder="Enter image_url">
                            </div>
                        </div>

                        <div class="form-group">
                        <label class="control-label col-sm-2" for="category">Category :</label>
                            <div class="col-sm-8">
                                <select name="category" id="category">
                                    <option value="Literature">Literature</option>
                                    <option value="Science">Science</option>
                                    <option value="Religion">Religion</option>
                                    <option value="Social">Social</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-8">
                                <button type="submit" class="btn btn-default" @click=addBook>Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>`,
    methods: {
        addBook: function () {
            axios.post('http://localhost:3000/api/books/', {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                harga: document.getElementById('harga').value,
                category: document.getElementById('category').value,
                image_url: document.getElementById('image_url').value
            })
                .then((dataBook) => {
                    alert("Insert 1 data into database!")
                })
                .catch((reason) => {
                    console.log(reason)
                })
        }
    }
})

