class User {
    construstor(user: object) {
        this.login = user.login;
        this.email = user.email;
        this.pwd = user.password; 
    }

    createUser(user) {
        
    }

}

async function ask(address, uMethod, question) {
    let response = await fetch(address, {
        method: uMethod,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(question),
    });
    let result = await response.json();
    return result;
}