(function() {

    let userService = new AdminUserServiceClient()
    var $userRowTemplate, $tbody;

    var $firstNameFld, $lastNameFld, $roleFld;
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn, $updateBtn, $searchBtn;
    var selectedUser



    let currentUserIndex = -1

    function findAllUsers() {
        userService
            .findAllUsers()
            .then(theusers => {
                users = theusers
                renderUsers(users)
            })
    }
    function renderUsers(users) {
        $tbody.empty()
        for(let u in users) {
            renderUser(u, users)

        }
    }

    function renderUser(u, users) {
        let user = users[u]
        let rowClone = $userRowTemplate.clone()
        rowClone.removeClass('wbdv-hidden')
        rowClone.find('.wbdv-username').html(user.username)
        rowClone.find('.wbdv-last-name').html(user.lastName)
        rowClone.find('.wbdv-first-name').html(user.firstName)
        rowClone.find('.wbdv-role').html(user.role)
        $removeBtn = rowClone.find('.wbdv-remove')
        $removeBtn.click(() => deleteUser(u))
        $editBtn = rowClone.find('.wbdv-edit')
        $editBtn.click(() => findUserById(u))

        $tbody.append(rowClone)
    }

    function deleteUser(index){
        let user = users[index]
        let userId = user._id
        userService.deleteUser(userId)
            .then(response => {
                users.splice(index, 1)
                //renderUsers()
                findAllUsers()
            })
    }

    function createUser() {
        const newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }
        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("FACULTY")

        userService.createUser(newUser)
            .then((actualUser) => {
                // users.push(actualUser)
                //renderUsers()
                findAllUsers()
            })
    }
    function findUserById(index) {
        currentUserIndex = index
        let user = users[index]
        let userId = user._id

        userService.findUserById(userId)
            .then(actualUser => {
                selectedUser = actualUser
                selectUser()
            })

    }
    function selectUser() {
        $updateBtn.removeClass('wbdv-hidden')
        $createBtn.addClass('wbdv-hidden')
        $usernameFld.val(selectedUser.username)
        $firstNameFld.val(selectedUser.firstName)
        $lastNameFld.val(selectedUser.lastName)
        $roleFld.val(selectedUser.role)
        //$passwordFld.val(selectedUser.password)
    }

    function updateUser() {
        const updatedUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }
        if(!updatedUser.password){
            updatedUser.password = selectedUser.password
        }
        if(!updatedUser.username){
            updatedUser.username = selectedUser.username
        }
        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("FACULTY")
        $updateBtn.addClass('wbdv-hidden')
        $createBtn.removeClass('wbdv-hidden')

        updatedUser._id = users[currentUserIndex]._id

        userService.updateUser(updatedUser._id, updatedUser)
            .then((actualUser) => {
                findAllUsers()
            })
    }
    function searchUser() {
        const userToSearch = {
            username: $usernameFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }

        var id_arr = []
        count = 0
        found_users = []

        for (elemnent in userToSearch){
            if(userToSearch[elemnent]){
                count+=1
            }
        }

        num_coincidence = 0


        for (let u in users){
            if (users[u].username === userToSearch.username && userToSearch.username){
                num_coincidence++
            }
            if (users[u].firstName === userToSearch.firstName && userToSearch.firstName){
                num_coincidence++
            }
            if (users[u].lastName === userToSearch.lastName && userToSearch.lastName) {
                num_coincidence++
            }
            if (users[u].role === userToSearch.role && userToSearch.role) {
                num_coincidence++
            }
            if (count == num_coincidence){
                id_arr.push(users[u]._id)
                found_users.push(users[u])
            }
            num_coincidence = 0
        }
        users = found_users
        renderUsers(users)
        // for(let i in id_arr ) {
        //     userService.findUserById(id_arr[i]).then(foundUser => {
        //         selectedUser = foundUser
        //         alert(selectedUser.username)
        //     })
        // }

    }


    function main(){
        $usernameFld = $('#usernameFld')
        $passwordFld = $('#passwordFld')
        $firstNameFld = $('#firstNameFld')
        $lastNameFld = $('#lastNameFld')
        $roleFld = $('#roleFld')

        $tbody = $("tbody")
        $userRowTemplate= $('.wbdv-template')

        $createBtn = $('.wbdv-create')
        $createBtn.click(createUser)
        $updateBtn = $('.wbdv-update')
        $updateBtn.click(updateUser)
        $searchBtn = $('.wbdv-search')
        $searchBtn.click(searchUser)

        $(findAllUsers())

    }
    $(main)

})()