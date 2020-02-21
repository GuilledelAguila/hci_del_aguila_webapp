function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/guille/users';
    var self = this;
    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }
    function findAllUsers() {
        return fetch(self.url)
            .then(response => response.json())
    }
    function findUserById(id) {
        return fetch(`${self.url}/${id}`)
            .then(response => response.json())
    }
    function updateUser(id, user) {
        return fetch(`${self.url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }
    function deleteUser(id) {
        return fetch(`${self.url}/${id}`, {
            method: 'DELETE'
        })
    }
}