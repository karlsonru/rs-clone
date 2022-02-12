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
/*
POST с авторизацией:
    login / email 
    passwod hash 

    Если есть такой пользователь - шлём 200 ОК и его id (пусть использует ID в дальнейших запросах)

    Если нет - шлём 403 Forbidden
*/
/*
PUT с созданием:
    {
    login 
    email 
    password
    }
*/
/*
Инстанс юзера
login / email / pwd
мне нравится: []
прошлые поездки: []
будущие поездки: []
*/
