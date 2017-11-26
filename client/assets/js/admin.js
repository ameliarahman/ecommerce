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
                <li data-toggle="modal" data-target="#edit-book"><a href="#">Edit</a></li>
            </ul>
        </td>
        <td>
            <a href="#" @click="deleteBook">Delete</a>
        </td>
        <edit-book :item="item" :key="index" :index="index"></edit-book>
    </tr>
    </tbody>
    </table>
    `,
    props: ['items'],
    methods: {
        deleteBook: function () {
            let idBook
            this.items.forEach((item) => {
                idBook = item._id
            })
            this.$emit('delete-book', {
                idBook: idBook
            })
        }
    }
})

Vue.component('edit-book', {
    template: `
    <div class="modal fade" id="edit-book" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center">Edit Buku</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="title">Title:</label>
                        <div class="col-sm-8">
                            <input type="text" name="title" :value=item.title class="form-control" id="title">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="author">Author:</label>
                        <div class="col-sm-8">
                            <input type="text" name="author" :value=item.author class="form-control" id="author">
                        </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="harga">Price:</label>
                    <div class="col-sm-8">
                        <input type="text" name="harga" :value=item.harga class="form-control" id="harga">
                    </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="image">Image:</label>
                        <div class="col-sm-8">
                            <input type="text" name="image_url" :value=item.image_url class="form-control" id="image_url">
                    </div>
                    </div>
               
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-8">
                            <button type="submit" class="btn btn-default" @click=updateBook>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`,
    props: ['item', 'index'],
    methods: {
        updateBook: function () {
            //console.log(document.getElementById('title').value)
            axios.put(`http://localhost:3000/api/books/${this.item._id}`, {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                harga: document.getElementById('harga').value,
                image_url: document.getElementById('image_url').value
            })
                .then((dataBook) => {
                    alert("Data successfully updated!")
                })
                .catch((reason) => {
                    console.log(reason)
                })
        }
    }


})

